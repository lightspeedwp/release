---
name: generate-theme-release-notes
description: Create professional release notes for WordPress block theme v2.0.0
tags:
  - release-notes
  - theme
  - block-theme
  - major-release
---

# Test Case: Generate Theme Release Notes

## Setup

Create a test WordPress block theme with the following structure:

### Theme Files (style.css)

```css
/*
Theme Name: Hero Block Theme
Theme URI: https://github.com/example/hero-block-theme
Description: Modern block theme with hero sections and advanced customization
Version: 2.0.0
Author: Example Team
Author URI: https://example.com
License: GPL-2.0+
Text Domain: hero-theme
Domain Path: /languages
Requires: 5.9
Requires PHP: 7.4
*/
```

### VERSION File

```
2.0.0
```

### theme.json (excerpt)

```json
{
  "version": 2,
  "title": "Hero Block Theme",
  "settings": {
    "color": {
      "palette": []
    }
  }
}
```

### CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [2.0.0] - 2026-10-30

### Added
- New Hero section template part with 5 pre-built variations
- Block style variations for Hero, Card, and Button blocks
- New theme.json settings for advanced hero customization
- New `hero_theme_hero_settings` filter for custom hero configuration
- New page template: "Landing Page with Hero"
- New pattern: "CTA Section with Hero"

### Changed
- Updated theme to use modern block APIs (v3)
- Redesigned site header with improved responsive behavior
- Enhanced color palette with expanded options
- Improved typography hierarchy and spacing
- Modernized footer with flexible block-based structure

### Deprecated
- `hero_theme_legacy_header()` function (use new header template instead)
- Old color palette format (will be removed in 3.0.0)

### Removed
- Classic editor support (block editor only)
- Legacy widget areas (use block areas instead)

### Fixed
- Fixed hero image not scaling on mobile devices (#123)
- Resolved color conflicts between hero and footer sections (#456)
- Fixed spacing issues in hero text overlay on tablets (#789)
- Improved accessibility: added proper ARIA labels to hero buttons

### Security
- Updated sanitization of user-provided CSS in customizer
- Added escaping to all dynamic template parts

## [1.9.0] - 2026-09-15

### Added
- Initial theme release
```

### Git History

```bash
git log --oneline v1.9.0..v2.0.0:

z9y8x7w feat(hero-template): add 5 hero template variations (#123)
w8v7u6t feat(theme): add block style variations (#456)
t7s6r5q perf(theme): modernize block API usage (#789)
q6p5o4n feat(hero-template): add CTA pattern (#234)
n5m4l3k fix: resolve hero image scaling on mobile (#567)
m4l3k2j fix: improve header responsive behavior
k3j2i1h feat(customizer): add theme.json hero settings
```

## Test Execution

### Command

```bash
/release-notes-generator \
  --version=2.0.0 \
  --all-formats \
  --project-type=theme \
  --verbosity=detailed
```

## Expected Outputs

### GitHub Release Format

Should generate markdown like:

```markdown
## 2.0.0 - October 30, 2026

Major release with new Hero template part system, block style variations, and modernized block API support.

### Added
- 🎨 **Hero Template Part System** — New Hero section with 5 pre-built variations for maximum flexibility (#123)
  - Includes gradient overlays, image backgrounds, and text animations
  - Full customization via theme.json settings
- 🎨 **Block Style Variations** — New styles for Hero, Card, Button, and other blocks
- 📄 **Landing Page Template** — Pre-built template with hero section and CTA blocks
- 🎯 **CTA Pattern** — Ready-to-use Call-to-Action section pattern
- 🪝 New `hero_theme_hero_settings` filter for custom configuration

### Changed
- 📊 **Modernized Block APIs** — Updated to block API v3 for better performance and stability
- 🎯 **Redesigned Header** — Improved responsive behavior and mobile experience
- 🎨 **Enhanced Color Palette** — Expanded options with better contrast and accessibility
- ✨ **Typography Improvements** — Better hierarchy and spacing throughout
- 🦶 **Modern Footer** — Flexible block-based structure for easier customization

### Deprecated
- `hero_theme_legacy_header()` function (will be removed in v3.0.0)
- Old color palette format (use new theme.json format instead)

### Removed
- Classic editor support
- Legacy widget areas

### Fixed
- 🐛 Fixed hero image scaling on mobile devices (#456)
- Resolved color conflicts between hero and footer (#789)
- Fixed spacing issues in text overlays on tablets (#234)
- Improved accessibility with proper ARIA labels (#567)

### Security
- 🔒 Enhanced customizer CSS sanitization
- Added escaping to dynamic template parts

---

**Migration Guide:** [Upgrading from v1.9.0 →](./docs/UPGRADE.md)

**Contributors:** Thanks to the community for feedback and contributions!

**Compare Versions:** [v1.9.0...v2.0.0](https://github.com/example/hero-block-theme/compare/v1.9.0...v2.0.0)
```

### Email Newsletter Format

Should include:

- Subject: "Hero Block Theme v2.0.0 — Major Update with Hero Templates"
- Introduction emphasizing major release and key improvements
- Organized sections for Added/Changed/Fixed
- Migration guide link for users upgrading from v1.9.0
- New features highlighted with emojis
- Call-to-action: "Download v2.0.0"
- Thank you to community
- Support links

### Slack Announcement Format

Should include:

- Emoji-prefixed major sections
- Clear distinction that this is a major release
- Key breaking changes (removed classic editor support)
- Migration notes
- Download link
- Thread for questions/discussion

### Blog Post Format

Should generate:

- Headline: "Hero Block Theme v2.0.0 — Major Release with New Template System"
- Engaging introduction about the redesign
- Detailed sections with context and examples
- Screenshots/image placeholders for templates
- Migration guide section
- FAQ for common upgrade questions
- Author byline
- "Get Started" call-to-action
- Related articles section

## Validation Checklist

- [ ] Version is correctly identified as 2.0.0 (major release)
- [ ] All categories are present: Added, Changed, Deprecated, Removed, Fixed, Security
- [ ] Template parts and patterns are identified as WordPress-specific features
- [ ] Block API version upgrade is highlighted in Changed section
- [ ] Breaking changes are clearly identified (removed classic editor, widgets)
- [ ] Migration guide is mentioned in important releases
- [ ] Issue links are properly formatted
- [ ] Emojis distinguish feature importance
- [ ] Contributor attribution is present
- [ ] All output formats emphasize this is a major release

## Success Criteria

1. All four formats generated successfully
2. Major release significance is clear (breaking changes highlighted)
3. Theme-specific features (templates, patterns, block styles) are properly formatted
4. WordPress minimum version requirements are included
5. Deprecated features are clearly marked
6. Migration guidance is appropriate for major version
7. Newsletter includes urgency for users to update
8. Blog post provides enough context for WordPress.org featured section
9. All links are tested and working
10. Output is ready for immediate publication
