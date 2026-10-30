---
name: pre-push-validation
description: Run full validation suite before push including tests, lint, and WordPress compliance checks
metadata:
  version: 1.0.0
  updated: 2026-10-30
  author: LightSpeedWP Release Team
  tags:
    - validation
    - push
    - testing
    - wordpress
    - quality-gates
  tools:
    - Bash
    - Read
    - Grep
  requires:
    - npm test or composer test
    - npm run lint or phpcs
    - WordPress compliance tooling
    - lefthook
---

# Pre-Push Validation Skill

Validates code quality, tests, and WordPress compliance before pushing to ensure only production-ready code reaches remote branches.

## Purpose

This sub-skill provides comprehensive pre-push validation by:

- **Running** full test suite (unit, integration, E2E)
- **Executing** complete lint and code-quality checks
- **Validating** WordPress compliance across plugin/theme headers
- **Checking** version alignment and changelog completeness
- **Blocking** pushes with failing tests, lint errors, or compliance issues
- **Providing** clear guidance on fixing issues

## Pre-Push Quality Gates

### Gate 1: Unit & Integration Tests

**What it checks:**

1. **Test Execution**
   - All unit tests pass
   - All integration tests pass
   - No skipped tests (except documented exceptions)
   - Tests complete within reasonable time (< 30 seconds)

2. **Test Coverage**
   - New code meets minimum coverage threshold (70%)
   - Overall coverage doesn't decrease
   - Critical paths have > 80% coverage
   - WordPress hooks/filters are tested

**For WordPress Block Projects:**
- Block registration tests pass
- Custom post type tests pass (if applicable)
- Meta and option tests pass
- Database migration tests pass (if applicable)
- Block rendering tests (frontend)
- Block editor tests (edit screen)

**Commands to run:**

```bash
# Run all tests
npm test

# Or specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# With coverage
npm test -- --coverage
```

**Output:**

```
✅ Jest Tests: PASSED
   Unit: 34 tests, 2.1s
   Integration: 8 tests, 1.2s
   Coverage: 82%

✅ Block Registration: PASSED (5 blocks)
✅ Custom Post Type Tests: PASSED (3 types)
✅ Database Migrations: PASSED (2 migrations)

All tests passed. Ready to push!
```

### Gate 2: Code Quality & Lint

**What it checks:**

1. **JavaScript/TypeScript Linting**
   - No ESLint errors
   - No critical warnings
   - Code style consistency
   - No console.log in production code
   - Proper async/await handling

2. **PHP Linting**
   - No PHP CodeSniffer violations
   - WordPress coding standards compliance
   - No deprecated function usage
   - Proper nonce handling
   - Escaping and sanitization correct

3. **CSS Linting**
   - No stylelint errors
   - Proper BEM naming (if used)
   - Color consistency
   - No unused styles

4. **Security Analysis**
   - No known vulnerabilities in dependencies
   - No hardcoded secrets or API keys
   - No SQL injection risks
   - No XSS vulnerabilities detected

**Commands to run:**

```bash
# Run all lint checks
npm run lint

# Or specific linters
npm run lint:js
npm run lint:php
npm run lint:css

# Security scan
npm audit
composer audit
```

**Output:**

```
✅ ESLint: 0 errors, 0 warnings (234 files)
✅ PHP CodeSniffer: 0 violations (45 files)
✅ Stylelint: 0 errors
✅ npm audit: 0 vulnerabilities
✅ composer audit: 0 vulnerabilities

Code quality: PASS
```

### Gate 3: WordPress Compliance

**What it checks:**

1. **Plugin Header Validation**
   ```php
   <?php
   /**
    * Plugin Name: My Block Plugin ✅
    * Version: 1.2.4 ✅
    * Author: LightSpeedWP ✅
    * License: GPL v2 or later ✅
    * Requires at least: 5.8 ✅
    * Requires PHP: 7.4 ✅
    */
   ```

2. **Theme Compliance** (for block themes)
   ```css
   /*
   Theme Name: My Block Theme ✅
   Version: 1.2.4 ✅
   License: GPL v2 or later ✅
   Requires at least: 6.0 ✅
   Requires PHP: 7.4 ✅
   */
   ```

3. **readme.txt Structure**
   - Valid wordpress.org format
   - Description section present
   - Installation section clear
   - Changelog formatted correctly
   - Stable tag matches version

4. **Block Validation**
   - block.json files are valid
   - No conflicting block names
   - Namespace follows convention (plugin-name/block-name)
   - Required attributes present

5. **Theme JSON Validation** (block themes)
   - Valid JSON structure
   - Proper version (2+)
   - Templates and template parts accessible
   - Settings are valid

**Commands to run:**

```bash
# Run WordPress compliance checks
npm run check:wordpress-compliance

# Or individual checks
npm run validate:plugin-header
npm run validate:theme-header
npm run validate:blocks
npm run validate:theme-json
npm run validate:readme-txt
```

**Output:**

```
✅ Plugin Type: WordPress Block Plugin

✅ Plugin Headers:
   ✅ Plugin Name: My Block Plugin
   ✅ Version: 1.2.4
   ✅ License: GPL v2 or later
   ✅ Requires at least: 5.8
   ✅ Requires PHP: 7.4

✅ readme.txt:
   ✅ Format: WordPress.org compliant
   ✅ Stable tag: 1.2.4 (matches version)
   ✅ Contributors: Listed correctly

✅ Blocks: 5 blocks validated
   ✅ my-plugin/hero-block
   ✅ my-plugin/card-block
   ✅ my-plugin/testimonial-block

WordPress Compliance: PASS ✅
```

### Gate 4: Version Alignment

**What it checks:**

- `VERSION` file contains valid SemVer
- Plugin/theme header `Version:` matches VERSION file
- `readme.txt` `Stable tag:` matches VERSION file
- `package.json` `version` matches (if present)
- `composer.json` `version` matches (if present)
- theme.json `version` matches (block themes)

**Commands to run:**

```bash
npm run check:versions
```

**Output:**

```
✅ VERSION file: 1.2.4
✅ plugin.php Version: 1.2.4 ✅
✅ style.css Version: 1.2.4 ✅
✅ readme.txt Stable tag: 1.2.4 ✅
✅ package.json version: 1.2.4 ✅

All versions aligned! ✅
```

### Gate 5: Changelog Completeness

**What it checks:**

1. **CHANGELOG.md Format**
   - Follows Keep a Changelog 1.1.0
   - `[Unreleased]` section present
   - Unreleased section is not empty
   - Valid subsections (Added, Changed, Deprecated, Removed, Fixed, Security)
   - Proper date format for released versions

2. **Changelog Content**
   - At least one entry for current development
   - Entries describe what changed (not "version bump")
   - No duplicates between versions
   - Proper markdown formatting

**Commands to run:**

```bash
npm run check:changelog
```

**Output:**

```
✅ CHANGELOG.md format: Keep a Changelog 1.1.0
✅ [Unreleased] section: Present and valid
✅ Entries: 5 in current development
   - Added: 2
   - Changed: 1
   - Fixed: 2
✅ Format validation: Pass

Changelog ready for release ✅
```

### Gate 6: Build Verification

**What it checks:**

- Production build completes successfully
- No build warnings or errors
- Built assets are correct size
- Source maps generated (if applicable)
- Bundle analysis shows no significant bloat

**For WordPress Blocks:**
- Block scripts transpile correctly
- Block styles compile without errors
- PHP files are valid
- Translation strings are properly marked

**Commands to run:**

```bash
npm run build
npm run build:prod
```

**Output:**

```
✅ Build completed successfully
   Time: 4.2s
   
✅ Block assets generated:
   - blocks/hero-block/index.js: 24KB
   - blocks/hero-block/index.css: 3KB
   
✅ No build warnings
✅ Translation strings: 42 marked

Build verification: PASS ✅
```

### Gate 7: Security Audit

**What it checks:**

1. **Dependency Vulnerabilities**
   - npm packages scanned for known vulnerabilities
   - Composer packages scanned
   - No high-severity vulns blocking push

2. **Code Security**
   - No hardcoded credentials/API keys
   - No SQL injection risks in queries
   - Proper escaping in output
   - Proper sanitization of input

3. **WordPress Security**
   - Nonces used for form submissions
   - CSRF protection in place
   - Capabilities checked before operations
   - Data properly escaped for context

**Commands to run:**

```bash
npm audit
composer audit
npm run check:security
```

**Output:**

```
✅ npm audit: 0 vulnerabilities
✅ composer audit: 0 vulnerabilities
✅ Code security: No issues detected
   - Hardcoded secrets: 0
   - SQL injection risks: 0
   - XSS vulnerabilities: 0

Security audit: PASS ✅
```

## Pre-Push Workflow

### Standard Pre-Push Run

```bash
# Automatically runs on push
git push origin feature-branch

# Output:
Lefthook running pre-push
✅ Tests passed
✅ Lint passed
✅ WordPress compliance: PASS
✅ Version aligned
✅ Changelog complete
✅ Build successful
✅ Security audit: PASS

Ready to push!
```

### Manual Pre-Push Check

```bash
# Test pre-push without actually pushing
lefthook run pre-push --verbose

# Or run individual checks
npm test
npm run lint
npm run check:wordpress-compliance
```

### Blocked Push Example

```bash
git push origin feature-branch

✅ Tests: PASS
❌ ESLint: 2 errors in src/blocks/hero/edit.js
   - Line 45: 'unused' is assigned but never used
   - Line 62: Missing semicolon

Push blocked due to lint errors.

Fix with:
  npm run lint:js -- --fix src/blocks/hero/edit.js
  git add src/blocks/hero/edit.js
  git commit --amend --no-edit
  git push origin feature-branch
```

## Configuration in lefthook.yml

Pre-push validation is configured in `.lefthook.yml`:

```yaml
pre-push:
  commands:
    test:
      run: npm test
      fail: exit_code
      print_output: on_failure
    
    lint:
      run: npm run lint
      fail: exit_code
    
    wordpress-compliance:
      run: npm run check:wordpress-compliance
      fail: exit_code
    
    version-alignment:
      run: npm run check:versions
      fail: exit_code
    
    changelog:
      run: npm run check:changelog
      fail: exit_code
    
    build:
      run: npm run build
      fail: exit_code
    
    security:
      run: npm audit --audit-level=moderate
      fail: exit_code
```

## Handling Pre-Push Failures

### Tests Failing

```bash
# 1. Run tests locally to reproduce
npm test

# 2. Fix the failing test
# (edit test file or code)

# 3. Re-run tests to confirm fix
npm test

# 4. Stage and amend commit
git add .
git commit --amend --no-edit

# 5. Try push again
git push origin feature-branch
```

### Lint Errors

```bash
# 1. Run lint to see errors
npm run lint

# 2. Auto-fix what's possible
npm run lint -- --fix

# 3. Manually fix remaining issues
# (edit files)

# 4. Stage and commit
git add .
git commit -m "chore: fix lint errors"

# 5. Try push again
git push origin feature-branch
```

### Version Mismatch

```bash
# 1. Check what doesn't match
npm run check:versions

# Error: Version mismatch
# - VERSION: 1.2.4
# - plugin.php: 1.2.3
# - readme.txt: 1.2.3

# 2. Fix misaligned versions
# Edit plugin.php and readme.txt to 1.2.4

# 3. Stage and commit
git add plugin.php readme.txt
git commit -m "chore: sync versions to 1.2.4"

# 4. Try push again
git push origin feature-branch
```

### WordPress Compliance Issue

```bash
# 1. Check compliance
npm run check:wordpress-compliance

# Error: Plugin header missing License URI

# 2. Add missing header
// plugin.php
/**
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

# 3. Stage and commit
git add plugin.php
git commit -m "chore: add missing plugin header"

# 4. Try push again
git push origin feature-branch
```

### Bypass Pre-Push (Last Resort)

```bash
# Only for WIP that needs manual testing
git push origin feature-branch --no-verify
```

## Integration with Pre-Commit Validation

Pre-commit and pre-push work together:

- **Pre-Commit** catches local issues early (formatting, basic linting)
- **Pre-Push** ensures comprehensive quality before remote push

Order of validation:

```
1. Developer edits code
2. Git add (stage files)
3. Git commit (pre-commit hook runs)
   - Lint & format check
   - Auto-fix & re-stage if needed
4. Git push (pre-push hook runs)
   - Full test suite
   - Complete lint
   - WordPress compliance
   - Version alignment
   - Changelog validation
5. Code reaches remote branch
```

## Integration with Hook Configuration Skill

Pre-push validation relies on [[hook-configuration]] to:

- Define pre-push commands in .lefthook.yml
- Configure hook execution
- Provide clear output and failure messages

## Integration with Release Skill

Pre-push validation is part of [[release]] workflow:

```bash
# Runs all push validations
/release --dry-run
```

## Best Practices

1. **Understand Before Pushing** — Review what pre-push will check
2. **Run Locally First** — Execute `lefthook run pre-push` before actual push
3. **Fix All Issues** — Don't bypass; address root causes
4. **Keep Tests Fast** — Pre-push should complete in < 30 seconds
5. **Commit Incrementally** — Don't wait until the end to check
6. **Review Error Messages** — They point to exact fixes needed

## Troubleshooting

### Pre-Push Hangs

```bash
# Check what's running
lefthook run pre-push --verbose

# If tests hang
npm test -- --forceExit

# If build hangs
npm run build -- --timeout=60000
```

### Pre-Push Always Fails on Specific Check

```bash
# Debug the failing command
npm run check:wordpress-compliance -- --verbose

# If it's a false positive, document why in .lefthook-local.yml
echo "# Skip WordPress compliance for local testing" > .lefthook-local.yml
```

## See Also

- [[hook-configuration]] — git hook setup and configuration
- [[pre-commit-validation]] — early local validation
- [[changelog-management]] — changelog entry management
- [[release]] — main release skill
