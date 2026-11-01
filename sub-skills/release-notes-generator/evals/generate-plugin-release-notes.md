---
name: generate-plugin-release-notes
description: Create professional release notes for WordPress plugin v1.2.1
tags:
  - release-notes
  - plugin
  - github-release
  - email
---

# Test Case: Generate Plugin Release Notes

## Setup

Create a test WordPress plugin with the following structure:

### Plugin File (my-gallery-plugin.php)

```php
<?php
/**
 * Plugin Name: My Gallery Plugin
 * Plugin URI: https://github.com/example/my-gallery-plugin
 * Description: Display beautiful image galleries in WordPress
 * Version: 1.2.1
 * Author: Example Team
 * License: GPL-2.0+
 * Requires: 5.8
 * Requires PHP: 7.4
 */
```

### VERSION File

```
1.2.1
```

### CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.2.1] - 2026-10-30

### Added
- New gallery layout option: Justified Grid
- New filter: `my_gallery_layout_options` for custom layouts
- Support for webp image format

### Changed
- Improved gallery loading performance by 25%
- Updated block editor UI for better usability
- Enhanced responsive behavior on tablets

### Fixed
- Fixed gallery images not showing on Safari (#456)
- Resolved lightbox overlay z-index issue (#234)
- Fixed alt-text not persisting in block attributes (#567)

### Security
- Added nonce verification to gallery AJAX requests (#789)
- Improved image sanitization for security

## [1.2.0] - 2026-10-15

### Added
- New Image Gallery block
- Gallery carousel layout option
```

### Git History

```bash
git log --oneline v1.2.0..v1.2.1:

a1b2c3d fix: resolve gallery lightbox z-index on safari (#234)
d4e5f6g feat: add justified grid layout option (#456)
h7i8j9k perf: improve gallery loading performance (#789)
k0l1m2n feat(gallery): add webp image format support
n3o4p5q fix: preserve alt-text in block attributes
```

## Test Execution

### Command

```bash
/release-notes-generator \
  --version=1.2.1 \
  --all-formats \
  --project-type=plugin
```

## Expected Outputs

### GitHub Release Format

Should generate markdown like:

```markdown
## 1.2.1 - October 30, 2026

### Added
- 🎨 **Justified Grid Layout** — New gallery layout option for flexible image arrangement (#456)
- 🪝 New `my_gallery_layout_options` filter for developers to add custom layouts
- 🖼️ WebP image format support for modern browsers

### Changed
- 📊 **Performance** — Gallery loading improved by 25% (#789)
- Enhanced block editor UI for better usability
- Improved responsive design on tablets

### Fixed
- 🐛 Fixed gallery images not displaying on Safari (#234)
- Resolved lightbox overlay z-index conflicts
- Fixed alt-text not persisting in block attributes (#567)

### Security
- 🔒 Added nonce verification to gallery AJAX requests (#789)
- Improved image sanitization for enhanced security

---

**Contributors:** Thanks to our amazing contributors!

**Compare Versions:** [v1.2.0...v1.2.1](https://github.com/example/my-gallery-plugin/compare/v1.2.0...v1.2.1)
```

### Email Newsletter Format

Should include:

- Subject line: "My Gallery Plugin v1.2.1 Released"
- Greeting and introduction
- Key features highlighted (Justified Grid, performance improvements)
- Issue links and PR references
- Call-to-action button
- Contributor thank you
- Footer with links

### Slack Announcement Format

Should include:

- Emoji-prefixed sections
- Bullet-point format
- Links formatted for Slack
- Mention of key fixes
- Call-to-action button

### Blog Post Format

Should generate:

- Engaging headline: "Gallery Plugin v1.2.1 Released — Better Performance & New Layouts"
- Introduction paragraph
- Detailed sections for each category
- Image placeholder suggestions
- Author byline
- Call-to-action
- Related links

## Validation Checklist

- [ ] GitHub format includes all 5 categories (Added, Changed, Fixed, Security, plus Version)
- [ ] Issue numbers are converted to GitHub issue links (#456 → [#456](url))
- [ ] Emoji icons are applied to major features
- [ ] Contributor attribution is present
- [ ] Version comparison link is correct
- [ ] Email format has proper subject line and call-to-action
- [ ] Slack format uses appropriate emoji reactions
- [ ] Blog post has SEO-friendly title and structure
- [ ] All generated content is copy-paste ready
- [ ] Links are tested and working

## Success Criteria

1. All four formats (GitHub, Email, Slack, Blog) are generated successfully
2. Changelog entries are parsed correctly
3. Issue numbers are linked properly
4. Contributor names are extracted and attributed
5. WordPress-specific details (block name, filters) are formatted appropriately
6. Output is professionally formatted and ready for publication
7. No information is lost or incorrectly reformatted
