---
name: pre-commit-validation
description: Validate markdown, JSON, YAML, PHP, and JavaScript files before commit in WordPress block projects
metadata:
  version: 1.0.0
  updated: 2026-10-30
  author: LightSpeedWP Release Team
  tags:
    - validation
    - commit
    - linting
    - wordpress
    - quality-assurance
  tools:
    - Read
    - Bash
    - Grep
  requires:
    - ESLint, Prettier (for JavaScript)
    - PHP CodeSniffer, PHPCS (for PHP)
    - yamllint (for YAML)
    - jsonlint (for JSON)
    - lefthook (for hook integration)
---

# Pre-Commit Validation Skill

Validates code, configuration, and documentation files before commit to catch issues early and maintain consistent WordPress block project quality standards.

## Purpose

This sub-skill provides comprehensive pre-commit validation by:

- **Linting** JavaScript/TypeScript, PHP, YAML, and JSON files
- **Validating** WordPress plugin headers and theme metadata
- **Checking** markdown formatting and link integrity
- **Enforcing** code style consistency
- **Preventing** commits with errors or incomplete changes
- **Auto-fixing** correctable issues and re-staging files

## Validation Rules by File Type

### PHP Validation (Plugins & Themes)

**What it checks:**

1. **WordPress Coding Standards (PHPCS)**
   - Proper escaping and sanitization
   - No deprecated WordPress functions
   - Correct filter/action hook formatting
   - Class and function naming conventions
   - Proper use of nonces for forms

2. **Plugin Header Validation**
   ```php
   <?php
   /**
    * Plugin Name: My Block Plugin
    * Plugin URI: https://github.com/lightspeedwp/my-plugin
    * Description: Short description
    * Version: 1.2.4
    * Author: LightSpeedWP
    * License: GPL v2 or later
    * Text Domain: my-plugin
    * Requires at least: 5.8
    * Requires PHP: 7.4
    */
   ```

3. **Theme Header Validation**
   ```css
   /*
   Theme Name: My Block Theme
   Theme URI: https://github.com/lightspeedwp/my-theme
   Version: 1.2.4
   Author: LightSpeedWP
   License: GPL v2 or later
   Requires at least: 6.0
   Requires PHP: 7.4
   */
   ```

**Commands to run:**

```bash
# Check PHP files
composer run phpcs -- {staged_php_files}

# Auto-fix with phpcbf
composer run phpcbf -- {staged_php_files}

# Run specific standard
phpcs --standard=WordPress {staged_php_files}
```

**Output:**

```
✅ PHP CodeSniffer: 0 violations
✅ Plugin headers: Valid
✅ Theme headers: Valid
✅ No deprecated functions used
✅ Proper escaping detected
```

### JavaScript/TypeScript Validation

**What it checks:**

1. **ESLint Rules**
   - No unused variables
   - Proper import/export syntax
   - No console statements in production code
   - Correct async/await usage
   - React Hook Rules (for React-based blocks)

2. **Prettier Formatting**
   - Consistent indentation (2 spaces)
   - Line length (default: 80)
   - Quote consistency
   - Semicolon placement

3. **Block Validation**
   - block.json structure is valid
   - Required fields present: name, title, category
   - Attributes match edit/save signatures
   - No conflicting attribute definitions

**Commands to run:**

```bash
# Lint JavaScript
npm run lint:js -- {staged_files}

# Auto-fix with Prettier
npm run format:js -- {staged_files}

# Validate block.json
npm run validate:blocks
```

**Output:**

```
✅ ESLint: 0 errors
✅ Prettier: All files formatted
✅ block.json: Valid (5 blocks checked)
✅ React Hooks: Correct usage detected
```

### JSON Validation (Plugin Config, theme.json)

**What it checks:**

1. **JSON Structure**
   - Valid JSON syntax
   - No trailing commas
   - Proper quote escaping

2. **block.json Requirements**
   - $schema specified
   - name field follows namespace pattern (my-plugin/my-block)
   - title field is user-friendly
   - category is valid (text, media, widgets, etc.)
   - attributes are properly defined

3. **theme.json Requirements** (Block Themes)
   - Valid JSON
   - Proper version (should be 2 or higher)
   - Settings structure is valid
   - Patterns and templateParts are accessible
   - Color palette defined
   - Typography settings present

**Commands to run:**

```bash
# Validate JSON syntax
npm run validate:json -- {staged_files}

# Validate block.json specifically
npm run validate:blocks

# Validate theme.json (block themes)
npm run validate:theme-json
```

**Output:**

```
✅ JSON syntax: Valid
✅ block.json files: 5 validated
   - my-plugin/hero-block ✅
   - my-plugin/card-block ✅
✅ theme.json: Valid block theme structure
```

### YAML Validation (.lefthook.yml, GitHub Actions)

**What it checks:**

1. **YAML Syntax**
   - No tab indentation (spaces only)
   - Proper key-value structure
   - Valid list formatting

2. **GitHub Workflow Files** (if present)
   - Valid action references
   - Proper event triggers
   - Environment variable syntax

**Commands to run:**

```bash
# Validate YAML files
npm run validate:yaml -- {staged_yaml_files}

# Or use yamllint
yamllint .lefthook.yml
```

**Output:**

```
✅ YAML syntax: Valid (.lefthook.yml)
✅ GitHub workflows: Valid (3 files)
✅ Environment variables: Properly formatted
```

### Markdown Validation (README, CHANGELOG)

**What it checks:**

1. **Markdown Format**
   - Proper heading hierarchy (no skipped levels)
   - Code blocks have language specified
   - Links are properly formatted
   - No trailing whitespace

2. **CHANGELOG.md Specific**
   - Follows Keep a Changelog format
   - [Unreleased] section present
   - Valid subsections (Added, Changed, Fixed, etc.)
   - Proper date format (YYYY-MM-DD)

3. **README.md Specific**
   - Main heading (H1) present
   - Installation section exists
   - Usage examples are clear
   - Links to documentation are valid

**Commands to run:**

```bash
# Validate markdown
npm run validate:markdown -- {staged_markdown_files}

# Lint markdown
npm run lint:markdown

# Check changelog format
npm run validate:changelog
```

**Output:**

```
✅ Markdown format: Valid
✅ Heading hierarchy: Correct
✅ Code blocks: All have language specified
✅ Links: All valid (15 checked)
✅ CHANGELOG.md: Keep a Changelog format ✅
```

### readme.txt Validation (WordPress.org)

**What it checks:**

1. **wordpress.org Format**
   - Contributor list follows format
   - Version matches plugin/theme version
   - License is GPL v2 or compatible
   - Tested up to is current
   - Requires at least is reasonable

2. **Structure Requirements**
   - === Plugin Name === header
   - Description section
   - Installation section
   - FAQ section
   - Changelog section

3. **Asset References**
   - Screenshots referenced correctly
   - Asset paths are valid

**Commands to run:**

```bash
# Validate readme.txt
npm run validate:readme-txt

# Check wordpress.org compliance
npm run check:wordpress-compliance
```

**Output:**

```
✅ readme.txt format: Valid
✅ Plugin Name header: Present
✅ License: GPL v2 or later ✅
✅ Tested up to: 6.4 (current)
✅ Changelog: Properly formatted
✅ Requires at least: 5.8 ✅
```

## Integrated Pre-Commit Workflow

### Full Validation Run

```bash
# Run all pre-commit validations (via lefthook)
npm run validate:pre-commit

# Or manually trigger lefthook
lefthook run pre-commit --verbose
```

### What Gets Validated Automatically

1. **On staged PHP files**: PHPCS, plugin/theme headers
2. **On staged JS/TS files**: ESLint, Prettier, block.json
3. **On staged JSON files**: JSON syntax, block.json/theme.json schema
4. **On staged YAML files**: YAML syntax, GitHub workflows
5. **On staged Markdown files**: Markdown format, CHANGELOG structure
6. **On readme.txt**: wordpress.org format compliance
7. **On all staged files**: No trailing whitespace, LF line endings

### Auto-Fix and Re-Stage Flow

For fixable issues (formatting, whitespace):

```bash
# 1. Pre-commit hook detects issue
❌ ESLint: 2 formatting errors in src/block.js

# 2. Auto-fix runs
✅ Prettier auto-fixed and re-staged

# 3. Hook passes
✅ Pre-commit validation passed

# 4. Files ready to commit
git commit -m "feat: add new block"
```

## Common Pre-Commit Failures & Fixes

### PHP CodeSniffer Violation

**Error:**
```
ERROR: Missing nonce verification. Are you sanitizing and escaping user input?
FILE: my-plugin.php:45
```

**Fix:**
```php
// Before
$data = $_POST['data'];

// After
$data = isset($_POST['nonce'], $_POST['data']) 
  && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])))
  ? sanitize_text_field(wp_unslash($_POST['data']))
  : '';
```

### ESLint Error: Unused Variable

**Error:**
```
src/blocks/hero/edit.js:12:5 - error: 'backgroundColor' is assigned a value but never used
```

**Fix:**
```javascript
// Before
const { backgroundColor, text } = props.attributes;

// After
const { text } = props.attributes;
```

### block.json Invalid

**Error:**
```
✅ Error in blocks/my-block/block.json:
   - "name" must follow namespace pattern (e.g., "my-plugin/my-block")
```

**Fix:**
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "name": "my-plugin/hero-block",
  "title": "Hero Block",
  "category": "media"
}
```

### CHANGELOG Format Error

**Error:**
```
ERROR: CHANGELOG.md has invalid format
- Missing [Unreleased] section
- Invalid subsection: "Features" (should be "Added")
```

**Fix:**
```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New hero block component

### Fixed
- Block attribute validation issue

## [1.0.0] - 2026-10-30

### Added
- Initial release
```

## Handling Failing Pre-Commit Checks

### Option 1: Fix the Issue

```bash
# 1. Make the code change
# 2. Stage the file
git add src/my-file.php

# 3. Try to commit again (hooks run automatically)
git commit -m "feat: add feature"
```

### Option 2: Allow Auto-Fix

For files that support auto-fixing (PHP, JS formatting):

```bash
# Prettier and phpcbf auto-fix
git add src/my-file.php
git commit -m "feat: add feature"
# Hook runs auto-fix, re-stages, commit succeeds
```

### Option 3: Bypass Temporarily (Last Resort)

```bash
# Skip hooks for this commit (not recommended)
git commit --no-verify -m "WIP: manual testing needed"
```

## Configuration in lefthook.yml

Pre-commit validation is configured in `.lefthook.yml`:

```yaml
pre-commit:
  parallel: true
  skip:
    - merge
    - rebase
  commands:
    php-lint:
      glob: "*.php"
      run: composer run phpcs -- {staged_files}
      stage_fixed: true
    
    js-lint:
      glob: "{*.js,*.jsx,*.ts,*.tsx}"
      run: npm run lint:js -- {staged_files}
      stage_fixed: true
    
    json-validate:
      glob: "*.json"
      run: npm run validate:json -- {staged_files}
    
    markdown-lint:
      glob: "*.md"
      run: npm run validate:markdown -- {staged_files}
```

## Integration with Hook Configuration Skill

This skill works with [[hook-configuration]] to:

- Define hook commands in .lefthook.yml
- Configure file globs for efficient validation
- Enable auto-fix and re-staging
- Provide clear failure messages

## Integration with Release Skill

Pre-commit validation is a first phase of [[release]]:

```bash
/release --dry-run  # Includes pre-commit validation
```

## Best Practices

1. **Commit Often** — Run validations frequently to catch issues early
2. **Stage Strategically** — Only stage files you're ready to validate
3. **Review Auto-Fixes** — Check what Prettier/phpcbf changed before committing
4. **Use IDE Integrations** — Enable real-time linting in VS Code/PhpStorm
5. **Fix Root Causes** — Don't just bypass hooks; address the underlying issues
6. **Keep Hooks Fast** — Pre-commit should complete in < 5 seconds

## See Also

- [[hook-configuration]] — git hook setup and configuration
- [[pre-push-validation]] — complete push validation workflow
- [[changelog-management]] — changelog entry management
- [[release]] — main release skill
