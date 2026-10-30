# Assets

This directory contains sample files, templates, and example configurations for WordPress block plugins and themes.

## Purpose

The assets folder provides reference materials and starter files to help with:

- Plugin header templates
- Theme configuration samples
- readme.txt wordpress.org format examples
- Block configuration examples
- SVN repository structure templates

## Contents

### Plugin Templates

**plugin-example.php** (planned)
- Complete plugin header with all WordPress fields
- Block registration example
- Enqueue scripts and styles
- WordPress-specific hooks and filters

**plugin-header-template.php** (planned)
- Plugin Name, Description, Version fields
- License and URI fields
- Requires and Tested up to information
- Text domain and domain path

### Theme Templates

**theme-example-style.css** (planned)
- Block theme header format
- All required theme fields
- WordPress and PHP version requirements
- License information

**theme.json-example.json** (planned)
- Block theme configuration
- Settings for spacing, colors, typography
- Template structure
- Template parts organization

### WordPress.org Files

**readme-txt-template.txt** (planned)
- wordpress.org plugin format
- Description, Installation, FAQ sections
- Changelog format
- Contributors and stable tag

**readme-txt-theme-template.txt** (planned)
- wordpress.org theme format
- Description section
- Installation instructions
- Changelog section

### Asset Files

**assets-directory-structure.md** (planned)
- Icon requirements (128x128, 256x256)
- Banner specifications (772x250)
- Screenshot dimensions (540x400)
- Theme screenshot (1200x900)

### Configuration Examples

**lefthook.yml-example** (planned)
- Pre-commit hooks configuration
- Pre-push hooks configuration
- Commit message validation
- File globbing examples

**.github/workflows-example/** (planned)
- GitHub Actions workflow examples
- Test workflow
- Lint workflow
- Release workflow

## Using These Assets

### Starting a New Plugin

```bash
cp assets/plugin-example.php my-plugin.php
# Edit with your plugin details
```

### Starting a New Theme

```bash
cp assets/theme-example-style.css style.css
cp assets/theme.json-example.json theme.json
# Edit with your theme details
```

### Creating readme.txt for wordpress.org

```bash
cp assets/readme-txt-template.txt readme.txt
# Edit with your plugin/theme information
```

### Setting Up Git Hooks

```bash
cp assets/lefthook.yml-example.yml .lefthook.yml
# Customize for your project
```

### Setting Up GitHub Actions

```bash
mkdir -p .github/workflows
cp assets/.github/workflows-example/* .github/workflows/
# Customize workflow files
```

## Validation

Use the [[pre-commit-validation]] skill to validate:

```bash
/pre-commit-validation
```

Or the [[release-qa]] skill for comprehensive checks:

```bash
/release-qa --verbose
```

## WordPress Block Focus

All templates follow WordPress block plugin and theme standards:

- **Blocks:** Proper block registration with block.json
- **Headers:** Complete metadata for wordpress.org
- **Standards:** WordPress coding standards compliance
- **Validation:** Proper escaping and sanitization

## Reference Materials

These templates reference:

- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Theme Development](https://developer.wordpress.org/themes/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)

## Contributing

To add new templates:

1. Create the file in this directory
2. Add example or minimal working code
3. Include comments explaining fields
4. Update this README with description
5. Reference in related skills where applicable

## See Also

- [[release]] — Main release skill
- [[pre-commit-validation]] — Validates your files
- [[pre-push-validation]] — Full validation before push
- [[hook-configuration]] — Git hooks setup
- [[wordpress-org-sync]] — WordPress.org publishing
