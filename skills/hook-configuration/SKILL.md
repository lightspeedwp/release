---
name: hook-configuration
description: Configure and manage git hooks with lefthook for WordPress block projects
metadata:
  version: 1.0.0
  updated: 2026-10-30
  author: LightSpeedWP Release Team
  tags:
    - hooks
    - git
    - lefthook
    - wordpress
    - workflow
  tools:
    - Read
    - Edit
    - Write
    - Bash
  requires:
    - lefthook binary
    - Git
    - npm or Composer
---

# Git Hooks Configuration Skill

Configures and manages Git hooks using lefthook for WordPress block plugin and theme projects, enabling automated validation and quality checks on commit, push, and merge operations.

## Purpose

This sub-skill helps teams establish consistent Git hook workflows by:

- **Installing** lefthook and its dependency manager integration
- **Configuring** pre-commit, pre-push, commit-msg, and prepare-commit-msg hooks
- **Defining** WordPress-specific validation steps
- **Testing** hook behavior before deployment
- **Maintaining** hook configurations across team environments

## Why Lefthook?

Lefthook offers WordPress developers:

- **Language-agnostic** hook orchestration (works with npm, Composer, PHP, Node.js)
- **Parallel execution** for faster pre-commit checks
- **File globbing** to run only relevant validators (e.g., lint only changed .php files)
- **Staged file handling** to auto-fix and re-stage corrected files
- **Team-friendly** configuration in .lefthook.yml checked into git
- **No package lock** pollution (no separate lefthook version tracking)

## Installation & Setup

### Phase 1: Install Lefthook Binary

For npm-based WordPress projects:

```bash
npm install lefthook --save-dev
```

For Composer-based WordPress projects:

```bash
composer require --dev mightyphp/lefthook
```

Or install system-wide:

```bash
# macOS
brew install lefthook

# Ubuntu/Debian
apt-get install lefthook

# Windows
scoop install lefthook
```

### Phase 2: Initialize Git Hooks

After installation, run:

```bash
# Using npm
npx lefthook install

# Using Composer
./vendor/bin/lefthook install

# System-wide
lefthook install
```

This creates `.git/hooks/` scripts that call `lefthook run {hook-name}`.

### Phase 3: Configure .lefthook.yml

Create `.lefthook.yml` in repository root with your hook definitions:

```yaml
# .lefthook.yml
# Git hooks configuration for WordPress block projects

fail: exit_code

pre-commit:
  parallel: true
  skip:
    - merge
    - rebase
  commands:
    lint-php:
      glob: "*.php"
      run: npm run lint:php -- {staged_files}
      stage_fixed: true
      skip_output: summary

    lint-js:
      glob: "{*.js,*.jsx,*.ts,*.tsx}"
      run: npm run lint:js -- {staged_files}
      stage_fixed: true

    format-json:
      glob: "*.json"
      run: npm run format:json -- {staged_files}
      stage_fixed: true

pre-push:
  commands:
    test:
      run: npm test
    build:
      run: npm run build

commit-msg:
  commands:
    validate-msg:
      run: npm run validate:commit-message -- {1}

prepare-commit-msg:
  commands:
    insert-branch:
      run: npm run prepare:commit-message
```

## Pre-Commit Hook Patterns

### Pattern 1: PHP Linting & Formatting

For WordPress plugins and themes with PHP code:

```yaml
pre-commit:
  commands:
    phpcs:
      glob: "*.php"
      run: composer run phpcs -- {staged_files}
      stage_fixed: true
    
    phpcbf:
      glob: "*.php"
      run: composer run phpcbf -- {staged_files}
      stage_fixed: true
```

### Pattern 2: Block JSON Validation

For Gutenberg block plugins:

```yaml
pre-commit:
  commands:
    validate-blocks:
      glob: "blocks/**/block.json"
      run: npm run validate:blocks -- {staged_files}
```

### Pattern 3: Theme JSON Validation

For WordPress block themes:

```yaml
pre-commit:
  commands:
    validate-theme-json:
      glob: "theme.json"
      run: npm run validate:theme-json -- {staged_files}
```

### Pattern 4: README.txt Validation

For WordPress.org submissions:

```yaml
pre-commit:
  commands:
    validate-readme:
      glob: "readme.txt"
      run: npm run validate:readme-txt -- {staged_files}
```

## Pre-Push Hook Patterns

### Pattern 1: Full Test Suite

```yaml
pre-push:
  commands:
    tests:
      run: npm test
      fail: exit_code
      print_output: on_failure
```

### Pattern 2: Build & Lint

```yaml
pre-push:
  commands:
    lint:
      run: npm run lint
    build:
      run: npm run build
```

### Pattern 3: WordPress Compliance Check

```yaml
pre-push:
  commands:
    wp-compliance:
      run: npm run check:wordpress-compliance
      fail: exit_code
```

## Commit Message Hook Patterns

### Pattern 1: Conventional Commits Validation

```yaml
commit-msg:
  commands:
    validate-conventional:
      run: npx commitlint --edit {1}
```

### Pattern 2: Scope Enforcement

```yaml
commit-msg:
  commands:
    enforce-scope:
      run: npm run validate:commit-scope -- {1}
```

### Pattern 3: WordPress Plugin Versioning

```yaml
commit-msg:
  commands:
    check-version-bump:
      run: npm run validate:version-bump -- {1}
```

## Testing Hook Configuration

### Verify Hooks Are Installed

```bash
ls -la .git/hooks/
# Should show: pre-commit, pre-push, commit-msg, etc.
```

### Dry-Run Pre-Commit Checks

```bash
# Check what would run on current staged files
lefthook run pre-commit --verbose
```

### Test Against Specific Files

```bash
# Stage a file and test
git add src/my-file.php
lefthook run pre-commit --verbose
```

### Simulate Push Hook Locally

```bash
lefthook run pre-push --verbose
```

## Troubleshooting Common Issues

### "Command not found: lefthook"

```bash
# For npm project
npm install lefthook --save-dev
npx lefthook install

# For Composer project
composer require --dev mightyphp/lefthook
./vendor/bin/lefthook install
```

### Hooks Not Running After Git Clone

```bash
# Reinstall hooks after clone
lefthook install

# Or add to .lefthook-local.yml to skip for this user
echo "# Hooks disabled locally" > .lefthook-local.yml
```

### Bypass Hooks Temporarily

```bash
# For a single commit
git commit --no-verify -m "WIP: needs manual testing"

# For a single push
git push --no-verify
```

**Note:** Use `--no-verify` sparingly. It should only bypass hooks for WIP commits.

### Hook Failures Not Showing Output

```yaml
# In .lefthook.yml, add print_output
commands:
  my-command:
    run: some-script
    print_output: always  # or on_failure
```

## Integration with Pre-Commit Validation Skill

This skill works alongside [[pre-commit-validation]] to ensure:

- Hooks are properly configured
- Validation scripts are executed
- Fixed files are re-staged
- Clear failure messages are shown

Call this skill first to setup hooks, then [[pre-commit-validation]] to configure the validation logic.

## Integration with Pre-Push Validation Skill

This skill coordinates with [[pre-push-validation]] to:

- Define pre-push hook structure
- Ensure tests run before push
- Block pushes on lint/test failures
- Provide clear error messaging

## Configuration Best Practices

1. **Keep Hooks Fast** — Pre-commit hooks should run in < 5 seconds. Use glob patterns to run only relevant checks.

2. **Use Parallel Execution** — Set `parallel: true` in pre-commit for speed.

3. **Stage Fixed Files** — Add `stage_fixed: true` to auto-correct and re-stage files (e.g., formatting).

4. **Skip on Merge/Rebase** — Add `skip: [merge, rebase]` to avoid running during automated operations.

5. **Clear Error Messages** — Use `print_output: on_failure` to show errors when hooks fail.

6. **Version-Control Configuration** — Commit `.lefthook.yml` to git so all team members use the same hooks.

7. **Allow Local Overrides** — Use `.lefthook-local.yml` for per-user customizations (not committed).

## See Also

- [[pre-commit-validation]] — validation rules and running checks
- [[pre-push-validation]] — complete push validation workflow
- [[release]] — main release skill
- [Lefthook Documentation](https://lefthook.dev)
- [WordPress Block Documentation](https://developer.wordpress.org/block-editor/)
