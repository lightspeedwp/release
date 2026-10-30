---
name: changelog-wp-block
description: Changelog entry guidelines for WordPress block plugins and themes
metadata:
  version: 1.0.0
  updated: 2026-10-30
  applies_to:
    - wordpress-block-plugin
    - wordpress-block-theme
---

# Changelog Entry Guidelines

## Purpose

Changelog entries document user-facing changes in a format that's clear and actionable for:
- **End users** — understanding what changed and if they need to take action
- **Developers** — finding relevant API changes and deprecations
- **Release managers** — compiling release notes and identifying breaking changes

## Format

Each changelog entry should be a **single line** (or occasionally 2-3 lines for complex changes) that:
1. Describes WHAT changed from a user perspective
2. Includes WHO is affected (if not obvious)
3. Notes MIGRATION required (if any)

### Template

```markdown
### [Section]
- [Impacted Area]: [Change Description] (optional migration)
```

## Sections

Use these categories to organize entries:

### Added
New features, capabilities, or functionality available to users.

**Examples:**
- Support for custom block variations in theme builder
- New filter hook `wp_block_plugin_custom_settings`
- Dark mode support for block editor interface
- Internationalization support with 12 new translations
- Performance monitoring dashboard for block usage

### Changed
Modifications to existing features, improvements, or behavior changes.

**Examples:**
- Improved block registration performance by 40%
- Updated block UI to use WordPress 6.4 design system
- Changed breakpoint detection logic for better accuracy
- Reorganized block category structure for clarity

### Deprecated
Features marked for future removal or no longer recommended.

**Examples:**
- Deprecated `hook_old_function()` in favor of `hook_new_function()` (use new hook until v2.0)
- Deprecated `$legacy_option` theme JSON setting (will be removed in v2.0)
- Legacy block component `OldButton` deprecated, use `Button` instead

### Removed
Features that were previously deprecated and are now deleted.

**Examples:**
- Removed deprecated `register_block_style()` function (use register_block_styles())
- Removed IE11 support — minimum now Firefox 88+
- Removed legacy theme.json format support

### Fixed
Bug fixes and corrections.

**Examples:**
- Fixed block rendering issue on mobile devices with viewport widths < 360px
- Fixed memory leak in block registration system
- Fixed incorrect color palette merging in nested themes
- Fixed PHP deprecation warning in WordPress 6.4+

### Security
Security patches, vulnerability fixes, and safety improvements.

**Examples:**
- Fixed XSS vulnerability in block attribute escaping (CVE-2024-1234)
- Improved sanitization of user input in custom block fields
- Added capability checks to prevent unauthorized block access

## Writing Guidelines

### For Users

Write entries as if explaining to a WordPress site owner:

✅ **Good:** "Fixed issue where custom block colors didn't save on mobile devices"  
❌ **Bad:** "Refactored mobile viewport handling in block state management"

✅ **Good:** "Added support for theme variations, allowing users to switch themes without leaving the editor"  
❌ **Bad:** "Implemented theme variation registry and persistence layer"

✅ **Good:** "Improved page load performance by 30% through optimized block parsing"  
❌ **Bad:** "Implemented lazy-load pattern for block tree traversal"

### Include Affected Area

Prefix entries with the area/component affected:

- **Block-specific:** "Block Name: Change description"
- **Theme-wide:** "Theme: Change description"
- **API:** "Hook/Filter name: Change description"
- **Admin:** "Editor: Change description"
- **General:** "Change description" (if affects multiple areas)

**Examples:**
- "Button Block: Fixed alignment issue on mobile"
- "Dark Mode: Added support for custom color palettes"
- "wp_block_plugin_filter: New filter for extensibility"
- "Performance: Reduced initial load time by 25%"

### Highlight Breaking Changes

For MAJOR releases only, clearly mark breaking changes:

```markdown
### Changed
- **BREAKING:** Removed support for legacy block formats (see [Migration Guide](link))
- **BREAKING:** Renamed hook from `filter_old` to `filter_new`
- **BREAKING:** Changed `Block.register()` API signature (before/after examples)
```

For security fixes:

```markdown
### Security
- **CRITICAL:** Fixed XSS vulnerability in block attributes ([CVE-2024-1234](link))
```

### Provide Context When Needed

Add details in parentheses only if they aid understanding:

✅ "Fixed block rendering on iOS Safari 14-15 (mobile breakpoint calculation issue)"  
✅ "Added RTL (right-to-left) support for Arabic and Hebrew themes"  
✅ "Improved compatibility with PHP 8.2+ (removed deprecated mb_string usage)"

❌ "Updated dependencies" (too vague)  
❌ "Fixed stuff" (not descriptive)

### Migration Guidance

When users must take action, note it clearly:

```markdown
### Deprecated
- `register_block_style()` function deprecated in favor of `register_block_styles()` 
  (update your code before v2.0: change `register_block_style()` to `register_block_styles()`)

### Removed
- Removed IE11 support. If you need IE11 compatibility, stay on v1.x

### Changed
- Block registration now requires `block.json` (previously optional)
  To migrate: add `block.json` to your block directories or use scaffolding tool
```

## Keep a Changelog Format

When entries are compiled into `CHANGELOG.md`:

```markdown
## [Unreleased]
### Added
- Support for custom theme variations
- New filter hook for block attributes

### Changed
- Improved mobile responsive breakpoints
- Updated UI components to WordPress 6.4 design

### Deprecated
- Deprecated `legacy_filter()` (use `new_filter()` instead)

### Removed
- Removed IE11 support

### Fixed
- Fixed color palette saving issue on mobile
- Fixed memory leak in block registration

### Security
- Fixed XSS vulnerability in block escaping

## [1.2.4] - 2026-10-30
### Added
- Initial support for theme variations

### Fixed
- Resolved mobile rendering issue
- Fixed incorrect breakpoint calculation

---

## [1.2.3] - 2026-09-15
(older entries...)
```

## WordPress.org Formatting

When published to wordpress.org, entries should remain clear:

**Plugin Directory Changelog Tab:**
```
= 1.2.4 =
* Added: Support for theme variations
* Fixed: Mobile rendering issue
* Fixed: Incorrect breakpoint calculation
```

**Theme Directory Updates:**
```
Version 1.2.4:
- Added support for theme variations
- Fixed mobile rendering issue
- Fixed incorrect breakpoint calculation
```

## Examples for WordPress Block Projects

### WordPress Block Plugin Examples

```markdown
### Added
- Support for dynamic block rendering with custom attributes
- New `wp_block_plugin_before_render` filter for extending blocks
- Admin notice for blocks with validation errors
- Automated block version management in theme.json

### Changed
- Optimized block registration to reduce initial load time by 35%
- Updated block icon styles to match WordPress 6.4 design system
- Improved accessibility for color picker in block inspector
- Changed default breakpoint values to match modern viewport sizes

### Deprecated
- Deprecated `register_block_style()` for new code; use `register_block_styles()` instead
  (will be removed in v2.0)

### Removed
- Removed deprecated `wp_block_legacy_filter()` hook

### Fixed
- Fixed block not appearing in editor for users with limited capabilities
- Fixed color palette not merging correctly in nested themes
- Fixed PHP 8.2 deprecated function warning in block registration

### Security
- Fixed XSS vulnerability in block attribute sanitization (affects blocks with custom HTML)
```

### WordPress Block Theme Examples

```markdown
### Added
- Full dark mode support with automatic color mode switching
- New `wp-theme-variations` support for multiple theme styles
- Theme JSON presets for custom icon sets
- Support for wp:query block with custom post types

### Changed
- Improved template loading performance by 40%
- Updated typography scale to follow WCAG guidelines
- Changed spacing tokens to use new CSS variables system
- Reorganized template parts for better maintainability

### Deprecated
- Deprecated `get_theme_layout()` function (use `get_block_template()` instead)

### Removed
- Removed support for legacy theme.json v1 format

### Fixed
- Fixed template not rendering correctly on mobile devices
- Fixed incorrect responsive text sizing on tablets
- Fixed dark mode not applying to user-added content

### Security
- Improved sanitization of custom HTML blocks to prevent XSS attacks
```

## Common Patterns by Change Type

### Bug Fix
```markdown
- Fixed [What was broken]: [Brief description of impact]
- Fixed [Area]: [What the issue was affecting] (fixes #123)
```

**Examples:**
- Fixed block editor: color picker not opening on touch devices
- Fixed theme rendering on low-bandwidth connections
- Fixed incorrect text sizing on mobile (fixes #456)

### Performance Improvement
```markdown
- Improved [Area]: [X]% faster / reduced by [Y]%
```

**Examples:**
- Improved page load time: 35% faster initial block parsing
- Improved memory usage: reduced theme initialization by 20%
- Improved editor performance: faster block registration

### New Feature
```markdown
- Added [Feature]: [What users can now do]
```

**Examples:**
- Added theme variations: users can now switch themes without reloading
- Added support for: custom block categories in theme builder
- Added new block: [Block Name] for [Purpose]

### Breaking Change (Major Release)
```markdown
- **BREAKING:** [What changed]: [Migration path] (see [docs](link))
```

**Examples:**
- **BREAKING:** Removed IE11 support: upgrade to modern browser
- **BREAKING:** Renamed hook `old_hook` to `new_hook`: update custom code
- **BREAKING:** Changed block.json format: migrate using `migrate-block-json` tool

## Reviewing Changelog Entries

Before release, verify each entry:

- [ ] Is it user-facing? (Not internal refactoring jargon)
- [ ] Is it clear what changed? (A non-developer can understand)
- [ ] Is the impact obvious? (Who does this affect?)
- [ ] Is migration path clear? (If breaking change)
- [ ] Is it in the correct section? (Added/Changed/Fixed/etc)
- [ ] Does it have the affected area prefix? (Block Name, Theme, etc)
- [ ] No special characters that break markdown? (`, *, _, etc)
- [ ] Is it a single line or 2-3 lines max?

## References

- [Keep a Changelog Standard](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [WordPress Plugin Guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/)
- [WordPress Theme Guidelines](https://developer.wordpress.org/themes/releasing-your-theme/)
- [WordPress Plugin Changelog Format](https://developer.wordpress.org/plugins/wordpress-org/how-your-readme-txt-works/#changelog)
