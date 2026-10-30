---
name: WordPress Block Plugin & Theme Release Onboarding
description: Team guide for using the release skill with WordPress block projects
version: 1.0.0
updated: 2026-10-30
audience: LightSpeedWP development team
---

# WordPress Block Plugin & Theme Release Onboarding

Complete guide for using the LightSpeedWP Release Skill with WordPress block plugins and block themes.

## Quick Start (5 Minutes)

### For Block Plugins

```bash
cd lightspeedwp/block-plugin-scaffold
npm install                     # Install dependencies (first time only)
/release --dry-run             # Preview what will happen
/release --scope=patch         # Execute patch release
```

### For Block Themes

```bash
cd lightspeedwp/block-theme-scaffold
npm install
/release --dry-run
/release --scope=patch
```

## What Is The Release Skill?

The release skill automates the entire release process for WordPress block plugins and themes:

✅ **Validates everything** — Tests, linting, versions, changelog, WordPress compliance  
✅ **Updates versions consistently** — VERSION file, plugin headers, theme headers, readme.txt  
✅ **Manages changelog** — Enforces Keep a Changelog format, dates versions automatically  
✅ **Creates git tags** — Annotated tags in vX.Y.Z format  
✅ **Publishes on GitHub** — Creates GitHub Releases with notes and assets  
✅ **Prepares WordPress.org** — Generates SVN-ready packages for plugin/theme directories  
✅ **Generates documentation** — Audit logs, handoff notes, next-cycle planning  

## Project Setup

### First-Time Setup (One Person Per Project)

```bash
# Clone the plugin or theme
git clone https://github.com/lightspeedwp/block-plugin-scaffold.git my-plugin
cd my-plugin

# Create initial files if they don't exist
touch VERSION          # Create with: echo "1.0.0" > VERSION
touch CHANGELOG.md     # See template below

# Install development dependencies
npm install           # Installs lefthook and sets up git hooks
```

### CHANGELOG.md Template

Create `CHANGELOG.md` in your plugin/theme root:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- New block component features

### Changed
- Improved block performance

### Fixed
- Bug fixes for editor rendering

## [1.0.0] - 2026-10-30
### Added
- Initial public release
```

### VERSION File

Create `VERSION` in your plugin/theme root containing only the version:

```
1.0.0
```

**Important:** This file is the single source of truth for all version management.

## WordPress-Specific File Checklist

### ✅ Block Plugin Requirements

**Main Plugin File** (e.g., `plugin.php` or `my-plugin.php`)

```php
<?php
/**
 * My Custom Block Plugin
 *
 * @package           my-plugin
 * @author            LightSpeedWP
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       My Custom Block Plugin
 * Plugin URI:        https://github.com/lightspeedwp/my-plugin
 * Description:       A WordPress block plugin for custom blocks
 * Version:           1.0.0
 * Author:            LightSpeedWP
 * Author URI:        https://lightspeedwp.agency
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       my-plugin
 * Domain Path:       /languages
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Tested up to:      6.4
 */
```

**readme.txt** Example

```
=== My Custom Block Plugin ===
Contributors: lightspeedwp
Tags: blocks, gutenberg, custom
Requires at least: 5.8
Tested up to: 6.4
Requires PHP: 7.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Stable tag: 1.0.0

A WordPress block plugin for creating custom blocks in the editor.

== Description ==
This plugin adds custom block types to the WordPress block editor (Gutenberg).

== Installation ==
1. Upload the plugin to your plugins directory
2. Activate the plugin through the WordPress admin
3. Blocks will appear in the block inserter

== FAQ ==
Q: Where do the blocks appear?
A: In the block inserter, under "Custom Blocks" category

== Changelog ==
= 1.0.0 =
* Initial release
* Added custom block types
```

### ✅ Block Theme Requirements

**style.css** Header

```css
/*
Theme Name: My Custom Block Theme
Theme URI: https://github.com/lightspeedwp/my-theme
Author: LightSpeedWP
Author URI: https://lightspeedwp.agency
Description: A modern block theme for WordPress
Version: 1.0.0
Requires at least: 6.0
Requires PHP: 7.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: my-theme
Domain Path: /languages
Tags: blocks, theme, dark-mode

My Custom Block Theme, (C) 2026 LightSpeedWP
My Custom Block Theme is distributed under the terms of the GNU GPL.
*/

/*
 * Theme styles
 */
```

**theme.json** (Block Theme Required)

```json
{
  "$schema": "https://schemas.wp.org/wp/6.4/theme.json",
  "version": 1,
  "title": "My Custom Block Theme",
  "settings": {
    "color": {
      "palette": [
        {
          "color": "#ffffff",
          "name": "White",
          "slug": "white"
        }
      ]
    },
    "typography": {
      "fontSizes": [
        {
          "name": "Small",
          "size": "0.875rem",
          "slug": "small"
        }
      ]
    }
  },
  "styles": {},
  "templateParts": [
    {
      "name": "header",
      "title": "Header",
      "area": "header"
    }
  ]
}
```

**readme.txt** (Similar to plugin, but theme-focused)

```
=== My Custom Block Theme ===
Contributors: lightspeedwp
Requires at least: 6.0
Tested up to: 6.4
Requires PHP: 7.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A modern block theme for WordPress with beautiful design.

== Description ==
A flexible, modern WordPress block theme designed for content creators.

== Installation ==
1. Upload to wp-content/themes/
2. Activate in WordPress admin
3. Customize via the site editor

== Features ==
* Full block theme support
* Dark mode ready
* Responsive design
* WCAG accessible

== Changelog ==
= 1.0.0 =
* Initial release
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/add-new-block develop
# or for bug fixes:
git checkout -b fix/block-rendering-issue develop
```

### 2. Add Changelog Entry as You Work

**For Block Plugins:**

```markdown
## [Unreleased]
### Added
- New Button Block: Custom button component with gradient support
- New filter hook `wp_block_plugin_before_render` for extending blocks

### Fixed
- Fixed block rendering issue on mobile devices (fixes #42)
- Fixed incorrect color palette inheritance in nested blocks
```

**For Block Themes:**

```markdown
## [Unreleased]
### Added
- Dark mode toggle for site editor
- New template part: Sidebar with navigation

### Changed
- Improved responsive breakpoints for mobile/tablet
- Updated typography scale to match WCAG guidelines

### Fixed
- Fixed header alignment on mobile
- Fixed spacing issue in theme.json preset values
```

### 3. Commit Your Work

**Use Conventional Commits format:**

```bash
# For block plugin features
git commit -m "feat(blocks): Add new button block with gradient support

- Implements custom button block component
- Supports gradient backgrounds
- Includes accessibility features
- Adds wp_block_plugin_before_render hook"

# For block theme changes
git commit -m "feat(theme): Add dark mode support

- Implements dark mode toggle in editor
- Updates color palette for dark theme
- Tests accessibility in both modes"

# For bug fixes
git commit -m "fix(blocks): Resolve rendering issue on mobile devices

Fixes #42 - Block was not respecting viewport width on devices < 360px"

# For documentation
git commit -m "docs: Add block registration examples"
```

**Format:** `type(scope): description`

Types:
- `feat` — New block, theme feature, or capability
- `fix` — Bug fix in block or theme
- `docs` — Documentation or examples
- `chore` — Build, dependencies, configuration

### 4. Push and Create Pull Request

```bash
git push origin feature/add-new-block
# Then create PR on GitHub
```

### 5. When Ready to Release

```bash
# Preview what will happen
/release --dry-run

# Review the pre-release checklist:
# ✅ Tests pass (npm test)
# ✅ Lint passes (npm run lint)
# ✅ Changelog has entries
# ✅ VERSION is correct
# ✅ Plugin/theme headers are up to date
# ✅ Documentation is current
```

## Release Scenarios

### Scenario 1: Release a Bug Fix (Patch)

**For Block Plugin:**

```bash
# Bug: Button block not rendering correctly on mobile

# 1. Fix the bug (edit src/blocks/button/index.js, etc)
# 2. Update CHANGELOG.md:
#    ### Fixed
#    - Fixed button block rendering on mobile devices

# 3. Commit
git add .
git commit -m "fix(blocks): Resolve button rendering on mobile"
git push origin develop

# 4. Release
/release --dry-run --scope=patch
# Review output...
/release --scope=patch
# Version: 1.0.0 → 1.0.1
```

**What Gets Updated Automatically:**
- VERSION → 1.0.1
- plugin.php → Version: 1.0.1
- readme.txt → Stable tag: 1.0.1
- CHANGELOG.md → [1.0.1] - 2026-10-30
- Git tag → v1.0.1
- GitHub Release created with changelog

### Scenario 2: Release a New Feature (Minor)

**For Block Theme:**

```bash
# Feature: Add dark mode toggle

# 1. Add feature (edit theme.json, templates, etc)
# 2. Update CHANGELOG.md:
#    ### Added
#    - Dark mode toggle for site editor
#    - New template part for dark mode styles
#
#    ### Changed
#    - Improved color palette organization

# 3. Commit
git add .
git commit -m "feat(theme): Add dark mode support

- Implements color-scheme toggle
- Updates templates for dark mode
- Tests accessibility"
git push origin develop

# 4. Release
/release --dry-run --scope=minor
/release --scope=minor
# Version: 1.0.0 → 1.1.0
```

### Scenario 3: Release Breaking Changes (Major)

**For Block Plugin:**

```bash
# Breaking: Change block registration API

# 1. Update code
# 2. Update CHANGELOG.md with BREAKING CHANGE callout:
#    ### Changed
#    - **BREAKING:** Changed block registration format
#      Old: registerBlockType('my-block', {...})
#      New: const MyBlock = registerBlock({...})
#      See MIGRATION_GUIDE.md for upgrade instructions

# 3. Commit
git commit -m "feat!: Refactor block registration API

BREAKING CHANGE: Block registration format has changed.
See MIGRATION_GUIDE.md for upgrade instructions."

git push origin develop

# 4. Release
/release --dry-run --scope=major
/release --scope=major
# Version: 1.0.0 → 2.0.0
```

## Changelog Entry Examples

### Block Plugin Examples

```markdown
### Added
- Hero Block: New full-width hero section block with image and overlay
- Image Block: Support for image captions and alt text in block settings
- New hook `wp_block_plugin_load`: Fires after all blocks are registered
- Documentation: Block attributes reference guide in docs/BLOCKS.md

### Changed
- Button Block: Improved color picker UX with preset colors
- Improved block registration performance by 25%
- Updated WordPress tested version to 6.4

### Deprecated
- `register_block_style()` function deprecated in favor of `register_block_styles()`
  (use new function until v2.0)

### Removed
- Removed IE11 support from block scripts

### Fixed
- Fixed block editor crashing when using custom font sizes
- Fixed button block margin calculation on mobile devices
- Fixed missing translation strings in block labels

### Security
- Fixed XSS vulnerability in block attribute sanitization
- Improved escaping of user input in block controls
```

### Block Theme Examples

```markdown
### Added
- Dark mode support with automatic color-scheme toggle
- New template part: Mobile navigation drawer
- Block patterns: Hero section, testimonial, CTA patterns
- WCAG 2.1 AAA accessibility certification

### Changed
- Improved responsive breakpoints (now 3 breakpoints instead of 2)
- Updated typography scale to follow modern web standards
- Reorganized theme.json settings for better maintainability

### Deprecated
- Deprecated custom-fonts setting (use theme.json font family instead)

### Fixed
- Fixed header sticky positioning on mobile
- Fixed spacing inconsistencies in template parts
- Fixed color contrast issues in dark mode
- Fixed image block sizing on tablet viewports

### Security
- Improved sanitization of user-generated content in blocks
```

## Quality Checks Before Release

The skill automatically validates:

### ✅ Tests Pass
```bash
npm test
# All unit tests for blocks must pass
```

### ✅ Code Lint
```bash
npm run lint
# ESLint for JavaScript/TypeScript in blocks
# PHP CodeSniffer if PHP code present
```

### ✅ Versions Aligned
- VERSION file
- plugin.php or style.css Version field
- theme.json version (if present)
- readme.txt Stable tag
- package.json version (if present)

### ✅ Changelog Valid
- CHANGELOG.md exists
- `## [Unreleased]` section present
- Has at least one entry
- Valid sections: Added, Changed, Deprecated, Removed, Fixed, Security

### ✅ WordPress Compliance
- Plugin/theme headers complete
- readme.txt follows wordpress.org format
- Minimum WordPress version declared
- Minimum PHP version declared
- Tested up to: current WordPress version

### ✅ Documentation
- README.md exists and is current
- License file present
- Contributing guidelines (if open source)
- Block documentation for plugins
- Setup instructions clear

## Post-Release: What Happens

After you run `/release --scope=patch` (or minor/major), the skill automatically:

1. **Publishes GitHub Release** at `https://github.com/lightspeedwp/your-project/releases/tag/vX.Y.Z`
   - Contains changelog excerpt
   - Lists all contributors
   - Includes download assets (zip file)

2. **Generates Audit Log** (`.github/RELEASE_AUDIT_LOG.json`)
   - Timestamp of release
   - Who released it
   - Version and scope
   - Test metrics
   - Contributors

3. **Creates Handoff Doc** (`docs/HANDOFF_vX.Y.Z.md`)
   - Release summary
   - What to monitor after release
   - Rollback procedure if needed
   - Next cycle recommendations

4. **WordPress.org Package** (SVN-ready)
   - Ready for manual SVN sync to wordpress.org
   - Includes plugin/theme files at correct structure
   - Checksums for verification

## WordPress.org Submission

### After Plugin Release

Your GitHub Release includes an SVN-ready package:

```bash
# Download the wordpress-org-sync.tar.gz from GitHub Release
# Or prepare manually:
svn co https://plugins.svn.wordpress.org/your-plugin-slug/trunk .
# Copy files from GitHub release
svn add new-files
svn commit -m "Version 1.0.1"
```

Your plugin will be updated on [wordpress.org/plugins/your-plugin-slug](https://wordpress.org/plugins/your-plugin-slug) within 24-48 hours.

### After Theme Release

Similar process for themes:

```bash
# Themes use different SVN structure
svn co https://themes.svn.wordpress.org/your-theme-slug/trunk .
# Copy theme files
svn commit -m "Version 1.0.1"
```

Theme will update on [wordpress.org/themes/your-theme-slug](https://wordpress.org/themes/your-theme-slug) within 24-48 hours.

## Troubleshooting

### "Tests Failing"

```bash
npm test -- --watch
# Fix failing tests
npm test                # Verify all pass
git add .
git commit -m "fix: Failing tests"
git push origin develop
/release --dry-run
```

### "Version Mismatch"

```
Error: VERSION file (1.0.1) doesn't match plugin.php (1.0.0)
```

Fix by updating all files to match VERSION:

```bash
# Edit plugin.php or style.css
vim plugin.php          # Change Version: 1.0.1

git add .
git commit -m "chore: Sync versions to 1.0.1"
git push origin develop
/release --dry-run
```

### "Changelog Invalid"

```
Error: CHANGELOG.md missing "## [Unreleased]" section
```

Fix the markdown:

```bash
vim CHANGELOG.md
# Ensure exactly: ## [Unreleased]
# (capital U, capital R)
```

### "WordPress Compliance Failed"

```
Error: Plugin header missing "Requires PHP" field
```

Add missing header to plugin file:

```php
/**
 * Plugin Name:       My Plugin
 * Description:       Description here
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4        ← Add this
 * Tested up to:      6.4
 */
```

## Git Hooks Explained

When you `git commit` or `git push`, the system automatically:

### Before Commit
- ✅ Validates markdown formatting
- ✅ Validates JSON syntax
- ✅ Validates YAML structure

### Before Push
- ✅ Runs `npm test`
- ✅ Runs `npm run lint`
- ✅ Checks documentation files exist

### Commit Message
- ✅ Enforces format: `type(scope): description`

If any check fails, the commit/push is blocked. Fix the issue and retry.

## Common Mistakes (And How to Avoid Them)

### ❌ Forgetting to Update CHANGELOG.md

**Problem:** Changelog doesn't reflect your changes

**Solution:** Update CHANGELOG.md as you work:

```markdown
## [Unreleased]
### Added
- Your new feature here
```

### ❌ Wrong Plugin Header Format

**Problem:** Plugin won't show up on wordpress.org

**Solution:** Use exact field names:

```php
Plugin Name:       (not: Name, Plugin-Name, etc)
Plugin URI:        (not: Homepage, URL, etc)
Version:           (not: Ver, Release, etc)
Requires at least: (WordPress minimum)
Requires PHP:      (PHP minimum)
Tested up to:      (Latest tested version)
License:           GPL-2.0-or-later (exact format)
```

### ❌ Inconsistent Changelog Sections

**Problem:** Release fails validation

**Solution:** Use only these sections:

```
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
```

(Case-sensitive, must be `###` not `##`)

### ❌ Git Commit with "updated stuff"

**Problem:** Commit message rejected by pre-commit hook

**Solution:** Use Conventional Commits:

```bash
git commit -m "feat(blocks): Add new button block"
git commit -m "fix: Resolve mobile rendering issue"
git commit -m "docs: Update README with examples"
```

(Not: `git commit -m "updated stuff"`)

## Team Communication

### Slack Announcement Template

```
🎉 New Release: My Block Plugin v1.1.0

✨ What's new:
• New Hero Block component
• Improved button block styling
• Dark mode support

🔧 What's fixed:
• Mobile rendering issue
• Color palette inheritance

📦 Get it:
https://github.com/lightspeedwp/my-plugin/releases/tag/v1.1.0

🙏 Contributors: @john @jane @team
```

### GitHub Release Notes (Auto-Generated)

The skill automatically creates this for you:

```markdown
## Release v1.1.0

### What's New
- New Hero Block with image and overlay
- Dark mode support
- Improved button styling

### Fixed
- Mobile rendering issue (#42)
- Color palette inheritance in nested blocks

### Contributors
Thanks to @john, @jane, and the team for this release!

[Download plugin-name-v1.1.0.zip](link)
```

## Next Steps for Your Team

1. **Everyone:** Clone the release repo and run `npm install`
   ```bash
   git clone https://github.com/lightspeedwp/release.git
   cd release
   npm install
   ```

2. **Everyone:** Read `docs/DEVELOPMENT.md` for detailed setup
   ```bash
   cat docs/DEVELOPMENT.md
   ```

3. **Plugin/Theme Leads:** Set up VERSION file and CHANGELOG.md
   ```bash
   echo "1.0.0" > VERSION
   # Create CHANGELOG.md from template above
   ```

4. **First Release:** Practice with `--dry-run`
   ```bash
   /release --dry-run
   /release --dry-run --scope=minor
   /release --dry-run --scope=major
   ```

5. **Questions?** Check:
   - README.md — Quick start
   - docs/DEVELOPMENT.md — Detailed guide
   - docs/WORDPRESS_BLOCK_ONBOARDING.md — This file!

## Resources

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [WordPress Plugin Guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/)
- [WordPress Theme Guidelines](https://developer.wordpress.org/themes/releasing-your-theme/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block Theme Handbook](https://developer.wordpress.org/themes/block-themes/)

---

**Questions?** Reach out to the LightSpeedWP release team.

**Version:** 1.0.0  
**Updated:** 2026-10-30  
**For:** WordPress block plugins & themes
