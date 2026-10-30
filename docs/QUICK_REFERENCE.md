---
name: Release Skill Quick Reference
description: One-page cheat sheet for the release skill
version: 1.0.0
updated: 2026-10-30
---

# Release Skill Quick Reference

One-page guide for the LightSpeedWP Release Skill.

## Installation (First Time)

```bash
cd your-block-plugin-or-theme
npm install              # One time, sets up git hooks
```

## Release Process (3 Steps)

```bash
# 1. Preview (always do this first!)
/release --dry-run

# 2. Review the checklist and fixes suggested

# 3. Execute (if everything looks good)
/release --scope=patch   # Bug fixes
/release --scope=minor   # New features
/release --scope=major   # Breaking changes
```

## Version Bump Guide

| Change Type | Example | Command |
|-------------|---------|---------|
| **Patch** (bug fix) | 1.0.0 → 1.0.1 | `/release --scope=patch` |
| **Minor** (new feature) | 1.0.0 → 1.1.0 | `/release --scope=minor` |
| **Major** (breaking) | 1.0.0 → 2.0.0 | `/release --scope=major` |

## Before You Release

✅ Tests pass: `npm test`  
✅ Lint passes: `npm run lint`  
✅ VERSION file updated  
✅ CHANGELOG.md has entries  
✅ Plugin/theme headers updated  
✅ Documentation current  
✅ Git working tree clean  

## Changelog Entry Examples

### Block Plugin

```markdown
### Added
- New Button Block with gradient support
- wp_block_plugin_before_render filter hook

### Fixed
- Block rendering issue on mobile devices (#42)

### Security
- Improved input sanitization in block attributes
```

### Block Theme

```markdown
### Added
- Dark mode support
- Mobile navigation template part

### Changed
- Improved responsive breakpoints

### Fixed
- Header sticky positioning on mobile
```

## Commit Message Format

```
type(scope): description

Valid types:
  feat     — New feature or block
  fix      — Bug fix
  docs     — Documentation
  chore    — Build, dependencies
  refactor — Code reorganization

Valid examples:
  ✅ feat(blocks): Add new hero block
  ✅ fix: Resolve mobile rendering issue
  ✅ docs: Update README with examples

Invalid examples:
  ❌ updated stuff
  ❌ feat: :bug: Fix things
  ❌ add feature (lowercase)
```

## WordPress Compliance Checklist

### Plugin Header (plugin.php)

```php
<?php
/**
 * Plugin Name:       Your Name
 * Description:       What it does
 * Version:           1.0.0
 * Author:            Your Name
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       your-plugin-slug
 * Domain Path:       /languages
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Tested up to:      6.4
 */
```

### Theme Header (style.css)

```css
/*
Theme Name:        Your Name
Description:       What it does
Version:           1.0.0
Author:            Your Name
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:       your-theme-slug
Domain Path:       /languages
Requires at least: 6.0
Requires PHP:      7.4
Tested up to:      6.4
*/
```

### readme.txt (Both)

```
=== Your Project Name ===
Contributors: your-name
Requires at least: 5.8 (plugins) or 6.0 (themes)
Requires PHP: 7.4
Tested up to: 6.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Stable tag: 1.0.0

Short description here.

== Description ==
Longer description.

== Installation ==
Installation steps.

== FAQ ==
Q: Question?
A: Answer.

== Changelog ==
= 1.0.0 =
* First release
```

## File Locations

| File | Purpose |
|------|---------|
| `VERSION` | Source of truth for version (e.g., "1.0.0") |
| `CHANGELOG.md` | Keep a Changelog format |
| `package.json` | npm configuration and scripts |
| `.lefthook.yml` | Git hooks configuration |
| `.github/workflows/release.yml` | CI/CD release automation |
| `docs/DEVELOPMENT.md` | Detailed development guide |
| `docs/WORDPRESS_BLOCK_ONBOARDING.md` | WordPress-specific guide |

## Scripts for Validation

```bash
npm run lint              # Check markdown, JSON, YAML
npm run lint:fix          # Auto-fix markdown formatting
npm run validate:structure # Check skill file structure
npm run validate:links    # Check internal links
npm run docs:validate     # Full documentation validation
npm test                  # Run tests
```

## What Gets Updated Automatically

When you run `/release --scope=patch`:

| File | Changes |
|------|---------|
| `VERSION` | 1.0.0 → 1.0.1 |
| `plugin.php` or `style.css` | Version: 1.0.1 |
| `theme.json` | "version": "1.0.1" (if present) |
| `readme.txt` | Stable tag: 1.0.1 |
| `package.json` | "version": "1.0.1" (if present) |
| `CHANGELOG.md` | Dated [1.0.1] - 2026-10-30 section |
| Git | Tag: v1.0.1 created |
| GitHub | Release page created with notes |

## Troubleshooting

### Tests Failing

```bash
npm test -- --watch      # Watch mode to debug
npm test                 # Verify all pass
git commit -m "fix: Failing tests"
git push origin develop
/release --dry-run
```

### Version Mismatch

```bash
# Update all files to match VERSION
# Edit: plugin.php, style.css, theme.json, readme.txt
# Then:
git add .
git commit -m "chore: Sync versions to 1.0.1"
git push origin develop
/release --dry-run
```

### Changelog Invalid

```markdown
# Must be exactly:
## [Unreleased]    (capital U, R, square brackets)

# Valid sections:
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
```

### Commit Rejected

```bash
# Message must be:
type(scope): description

# Try:
git commit -m "feat(blocks): Add new component"
# Not:
git commit -m "updated stuff"
```

## WordPress.org After Release

### Plugins

```bash
# SVN package ready in GitHub Release
# Or sync manually:
svn co https://plugins.svn.wordpress.org/your-slug/trunk .
# Copy files from release zip
svn commit -m "Version 1.0.1"
```

Updates on wordpress.org within 24-48 hours.

### Themes

```bash
svn co https://themes.svn.wordpress.org/your-slug/trunk .
# Copy theme files
svn commit -m "Version 1.0.1"
```

Updates on wordpress.org within 24-48 hours.

## Release Checklist

```markdown
Before /release:
☐ Changes committed and pushed
☐ Tests pass (npm test)
☐ Lint passes (npm run lint)
☐ CHANGELOG.md updated with entries
☐ VERSION file updated
☐ Plugin/theme headers updated
☐ Documentation is current
☐ No uncommitted changes (git status clean)

After /release:
☐ Check GitHub Release page
☐ Download and test the release zip
☐ Monitor GitHub Issues for problems
☐ Plan next release if needed
☐ Update wordpress.org if applicable
```

## Resources

| Resource | Link |
|----------|------|
| **Main Docs** | [README.md](../README.md) |
| **Development** | [docs/DEVELOPMENT.md](./DEVELOPMENT.md) |
| **WordPress Guide** | [docs/WORDPRESS_BLOCK_ONBOARDING.md](./WORDPRESS_BLOCK_ONBOARDING.md) |
| **SemVer** | https://semver.org/ |
| **Keep a Changelog** | https://keepachangelog.com/ |
| **Plugin Guidelines** | https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/ |
| **Theme Guidelines** | https://developer.wordpress.org/themes/releasing-your-theme/ |

## Common Commands

```bash
# Initial setup
npm install
lefthook install

# Check status
git status
npm run lint
npm test

# Before release
/release --dry-run
/release --dry-run --scope=minor

# Execute release
/release --scope=patch    # Bug fix
/release --scope=minor    # New feature
/release --scope=major    # Breaking change

# Troubleshoot
npm run docs:validate
npm run validate:links
npm run validate:structure
```

## Need Help?

1. **Quick answer?** → Check this file again
2. **Setup issue?** → Read [docs/DEVELOPMENT.md](./DEVELOPMENT.md)
3. **WordPress-specific?** → Read [docs/WORDPRESS_BLOCK_ONBOARDING.md](./WORDPRESS_BLOCK_ONBOARDING.md)
4. **Still stuck?** → Check [SKILL.md](../SKILL.md) or [README.md](../README.md)

---

**Print this!** Keep this quick reference at your desk.

**Version:** 1.0.0  
**Last Updated:** 2026-10-30  
**For:** LightSpeedWP WordPress block plugins & themes
