#!/usr/bin/env node

/**
 * check-cross-dependencies.js
 *
 * Deep dependency analysis for multi-package releases.
 * Checks package.json, composer.json, plugin headers, theme headers for dependencies.
 * Validates that dependencies are satisfied and reports compatibility.
 *
 * Usage:
 *   node check-cross-dependencies.js [--group <groupId>] [--config <path>] [--matrix]
 *
 * Output:
 *   - Dependency compatibility report
 *   - Breaking change analysis
 *   - Feature support matrix
 *   - Version lock verification
 */

const fs = require('fs');
const path = require('path');
const semver = require('semver');

class CrossDependencyChecker {
  constructor(options = {}) {
    this.configPath = options.configPath || '.lightspeed/release-groups.json';
    this.groupId = options.groupId;
    this.showMatrix = options.matrix || false;

    this.config = null;
    this.group = null;
    this.packages = new Map(); // id -> package with metadata
    this.dependencies = [];
    this.issues = [];
    this.matrix = [];
  }

  /**
   * Run complete dependency check
   */
  check() {
    try {
      this.loadConfig();
      this.resolveGroup();
      this.loadPackageMetadata();
      this.resolveDeclaredDependencies();
      this.validateDependencies();
      this.buildCompatibilityMatrix();
      this.detectBreakingChanges();
      this.reportResults();
      return this.issues.filter(i => i.level === 'error').length === 0;
    } catch (err) {
      console.error(`Fatal error: ${err.message}`);
      return false;
    }
  }

  /**
   * Load configuration
   */
  loadConfig() {
    if (!fs.existsSync(this.configPath)) {
      throw new Error(`Config not found: ${this.configPath}`);
    }

    const content = fs.readFileSync(this.configPath, 'utf8');
    this.config = JSON.parse(content);
  }

  /**
   * Resolve target group
   */
  resolveGroup() {
    if (!this.groupId && this.config.groups.length === 1) {
      this.group = this.config.groups[0];
      this.groupId = this.group.id;
      return;
    }

    if (!this.groupId) {
      throw new Error('Must specify --group or have single group in config');
    }

    this.group = this.config.groups.find(g => g.id === this.groupId);
    if (!this.group) {
      throw new Error(`Group not found: ${this.groupId}`);
    }
  }

  /**
   * Load metadata from all packages in group
   */
  loadPackageMetadata() {
    for (const pkg of this.group.packages) {
      const metadata = {
        id: pkg.id,
        repo: pkg.repo,
        type: pkg.type,
        path: pkg.path || '.',
        version: this.readVersion(pkg),
        peerDependencies: {},
        dependencies: {},
        features: [],
        capabilities: {}
      };

      // Load package.json if exists
      const pkgJsonPath = path.join(metadata.path, 'package.json');
      if (fs.existsSync(pkgJsonPath)) {
        try {
          const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
          metadata.peerDependencies = pkgJson.peerDependencies || {};
          metadata.dependencies = pkgJson.dependencies || {};
          metadata.features = pkgJson.keywords || [];
        } catch (err) {
          this.addIssue('warn', `${pkg.id}: could not parse package.json`);
        }
      }

      // Load composer.json if exists
      const composerPath = path.join(metadata.path, 'composer.json');
      if (fs.existsSync(composerPath)) {
        try {
          const composer = JSON.parse(fs.readFileSync(composerPath, 'utf8'));
          metadata.dependencies = { ...metadata.dependencies, ...composer.require || {} };
        } catch (err) {
          this.addIssue('warn', `${pkg.id}: could not parse composer.json`);
        }
      }

      // Extract WordPress requirements
      if (metadata.type === 'plugin') {
        metadata.capabilities.wordpress = this.readPluginHeader(pkg, 'Requires at least');
        metadata.capabilities.php = this.readPluginHeader(pkg, 'Requires PHP');
      }

      if (metadata.type === 'theme') {
        metadata.capabilities.wordpress = this.readThemeHeader(pkg, 'Requires at least');
        metadata.capabilities.php = this.readThemeHeader(pkg, 'Requires PHP');
      }

      this.packages.set(pkg.id, metadata);
    }
  }

  /**
   * Read version from package
   */
  readVersion(pkg) {
    const versionPath = path.join(pkg.path || '.', pkg.versionFile);
    if (!fs.existsSync(versionPath)) {
      return null;
    }

    const content = fs.readFileSync(versionPath, 'utf8');
    const match = content.match(/[\d]+\.[\d]+\.[\d]+/);
    return match ? match[0] : null;
  }

  /**
   * Read plugin header value
   */
  readPluginHeader(pkg, header) {
    const pluginPath = path.join(pkg.path || '.', pkg.versionFile);
    if (!fs.existsSync(pluginPath)) {
      return null;
    }

    const content = fs.readFileSync(pluginPath, 'utf8');
    const match = content.match(new RegExp(`\\*\\s*${header}[:\\s]*(.+)`));
    return match ? match[1].trim() : null;
  }

  /**
   * Read theme header value
   */
  readThemeHeader(pkg, header) {
    const themePath = path.join(pkg.path || '.', pkg.versionFile);
    if (!fs.existsSync(themePath)) {
      return null;
    }

    const content = fs.readFileSync(themePath, 'utf8');
    const match = content.match(new RegExp(`${header}[:\\s]*(.+)`));
    return match ? match[1].trim() : null;
  }

  /**
   * Resolve declared dependencies from config and packages
   */
  resolveDeclaredDependencies() {
    // From config
    if (this.group.dependencies) {
      this.dependencies.push(...this.group.dependencies);
    }

    // From package.json peerDependencies
    for (const [pkgId, metadata] of this.packages) {
      for (const [depName, constraint] of Object.entries(metadata.peerDependencies)) {
        // Try to map npm package name to local package
        const depPkgId = this.findPackageByNpmName(depName);
        if (depPkgId) {
          const existingDep = this.dependencies.find(
            d => d.from === pkgId && d.to === depPkgId
          );
          if (!existingDep) {
            this.dependencies.push({
              from: pkgId,
              to: depPkgId,
              type: 'peer',
              constraint: constraint,
              constraintType: 'semver',
              source: 'package.json'
            });
          }
        }
      }
    }
  }

  /**
   * Try to find package by npm name
   */
  findPackageByNpmName(npmName) {
    // Common patterns
    const patterns = [
      npmName.split('/')[1], // @scope/name -> name
      npmName.replace('@', '').replace('/', '-'), // Convert to kebab case
      npmName.toLowerCase()
    ];

    for (const pattern of patterns) {
      for (const [pkgId, metadata] of this.packages) {
        if (metadata.id.includes(pattern) || metadata.repo.includes(pattern)) {
          return pkgId;
        }
      }
    }

    return null;
  }

  /**
   * Validate all dependencies
   */
  validateDependencies() {
    for (const dep of this.dependencies) {
      const fromPkg = this.packages.get(dep.from);
      const toPkg = this.packages.get(dep.to);

      if (!fromPkg) {
        this.addIssue('error', `Unknown package: ${dep.from}`);
        continue;
      }

      if (!toPkg) {
        this.addIssue('error', `Unknown package: ${dep.to}`);
        continue;
      }

      // Check if constraint is satisfied
      if (toPkg.version && !this.isSatisfied(toPkg.version, dep.constraint)) {
        this.addIssue('error',
          `${dep.from} requires ${dep.to} ${dep.constraint}, ` +
          `but ${dep.to} is v${toPkg.version}`
        );
      } else if (toPkg.version) {
        this.addIssue('info',
          `✓ ${dep.from} requires ${dep.to} ${dep.constraint} ` +
          `(satisfied by v${toPkg.version})`
        );
      }
    }
  }

  /**
   * Check if version satisfies constraint
   */
  isSatisfied(version, constraint) {
    try {
      if (constraint.match(/^\^|^~|^>=|^<=/)) {
        return semver.satisfies(version, constraint);
      }
      // Simple min version check
      return semver.gte(version, constraint);
    } catch (err) {
      return false;
    }
  }

  /**
   * Build compatibility matrix
   */
  buildCompatibilityMatrix() {
    const pkgIds = Array.from(this.packages.keys());

    for (const fromId of pkgIds) {
      for (const toId of pkgIds) {
        if (fromId === toId) continue;

        const dep = this.dependencies.find(
          d => d.from === fromId && d.to === toId
        );

        if (!dep) continue;

        const toPkg = this.packages.get(toId);
        const satisfied = toPkg.version && this.isSatisfied(toPkg.version, dep.constraint);

        this.matrix.push({
          from: fromId,
          to: toId,
          constraint: dep.constraint,
          version: toPkg.version,
          satisfied: satisfied ? 'yes' : 'no',
          reason: satisfied ? 'Version satisfies constraint' : 'Version mismatch'
        });
      }
    }
  }

  /**
   * Detect breaking changes between versions
   */
  detectBreakingChanges() {
    for (const [pkgId, metadata] of this.packages) {
      const changelogPath = path.join(
        metadata.path,
        this.group.packages.find(p => p.id === pkgId).changelog || 'CHANGELOG.md'
      );

      if (!fs.existsSync(changelogPath)) {
        continue;
      }

      try {
        const content = fs.readFileSync(changelogPath, 'utf8');

        if (content.match(/BREAKING\s*CHANGE|###\s*Breaking/i)) {
          this.addIssue('warn',
            `${pkgId}: changelog contains breaking changes in current version`
          );

          // Alert dependent packages
          const dependents = this.dependencies.filter(d => d.to === pkgId);
          if (dependents.length > 0) {
            const depList = dependents.map(d => d.from).join(', ');
            this.addIssue('warn',
              `Breaking changes in ${pkgId} affect: ${depList}`
            );
          }
        }
      } catch (err) {
        // Ignore read errors
      }
    }
  }

  /**
   * Add issue to report
   */
  addIssue(level, message) {
    this.issues.push({ level, message });
  }

  /**
   * Generate report
   */
  reportResults() {
    console.log('\n' + '='.repeat(70));
    console.log(`Cross-Dependency Analysis: ${this.groupId}`);
    console.log('='.repeat(70) + '\n');

    // Package summary
    console.log('📦 Packages:');
    for (const [pkgId, metadata] of this.packages) {
      console.log(`  ${pkgId}:`);
      console.log(`    - Version: ${metadata.version || 'unknown'}`);
      console.log(`    - Type: ${metadata.type}`);
      if (metadata.capabilities.wordpress) {
        console.log(`    - WordPress: ${metadata.capabilities.wordpress}+`);
      }
      if (metadata.capabilities.php) {
        console.log(`    - PHP: ${metadata.capabilities.php}+`);
      }
    }
    console.log();

    // Dependencies
    if (this.dependencies.length > 0) {
      console.log('🔗 Dependencies:');
      for (const dep of this.dependencies) {
        console.log(`  ${dep.from} → ${dep.to} (${dep.constraint})`);
      }
      console.log();
    }

    // Issues
    const errors = this.issues.filter(i => i.level === 'error');
    const warnings = this.issues.filter(i => i.level === 'warn');
    const infos = this.issues.filter(i => i.level === 'info');

    if (errors.length > 0) {
      console.log('❌ Errors:');
      errors.forEach(i => console.log(`  ${i.message}`));
      console.log();
    }

    if (warnings.length > 0) {
      console.log('⚠️  Warnings:');
      warnings.forEach(i => console.log(`  ${i.message}`));
      console.log();
    }

    if (infos.length > 0) {
      console.log('ℹ️  Info:');
      infos.forEach(i => console.log(`  ${i.message}`));
      console.log();
    }

    // Matrix view
    if (this.showMatrix && this.matrix.length > 0) {
      console.log('📊 Compatibility Matrix:');
      console.log('');

      const table = [
        ['From', 'To', 'Constraint', 'Version', 'Satisfied', 'Notes'],
        ['---', '---', '---', '---', '---', '---']
      ];

      for (const row of this.matrix) {
        table.push([
          row.from,
          row.to,
          row.constraint,
          row.version || 'unknown',
          row.satisfied,
          row.reason
        ]);
      }

      for (const row of table) {
        console.log(`  ${row.map(c => c.padEnd(15)).join('')}`);
      }
      console.log();
    }

    // Summary
    console.log('='.repeat(70));
    console.log(`Summary: ${errors.length} errors, ${warnings.length} warnings, ${infos.length} info`);
    if (errors.length === 0) {
      console.log('✅ All cross-package dependencies validated!');
    }
    console.log('='.repeat(70) + '\n');
  }
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    configPath: '.lightspeed/release-groups.json',
    groupId: null,
    matrix: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--group' && args[i + 1]) {
      options.groupId = args[++i];
    } else if (args[i] === '--config' && args[i + 1]) {
      options.configPath = args[++i];
    } else if (args[i] === '--matrix') {
      options.matrix = true;
    }
  }

  const checker = new CrossDependencyChecker(options);
  const success = checker.check();

  process.exit(success ? 0 : 1);
}

module.exports = CrossDependencyChecker;
