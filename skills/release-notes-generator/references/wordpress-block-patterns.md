# WordPress-Specific Release Notes Patterns

Reference guide for recognizing and formatting WordPress-specific content in release notes, including block names, hooks, filters, theme features, and plugin-specific patterns.

## Table of Contents

1. [Block Patterns](#block-patterns)
2. [Hook & Filter Patterns](#hook--filter-patterns)
3. [Theme Feature Patterns](#theme-feature-patterns)
4. [Plugin-Specific Patterns](#plugin-specific-patterns)
5. [Formatting Examples](#formatting-examples)
6. [Integration Examples](#integration-examples)

---

## Block Patterns

### Recognizing Block References

Block names typically appear in commit messages and changelogs in several formats:

**Patterns to recognize:**
- `feat(hero-block): add layout variations`
- `fix(gallery): resolve z-index issue`
- `updated: Hero Block with new styles`
- `new: Image Gallery Block component`

### Standardizing Block Names

The skill converts various block name formats to consistent, readable format:

| Input Format | Standardized Output |
|---|---|
| `hero-block` | Hero Block |
| `gallery-block` | Gallery Block |
| `card-block` | Card Block |
| `testimonial_gallery` | Testimonial Gallery |
| `cta-section` | CTA Section |
| `HeroBlock` | Hero Block |

### Examples

#### Input
```
feat(hero-block): add layout variations
feat(card-block): new badge and icon support
fix(gallery-block): resolve lightbox z-index
```

#### Output
```markdown
- New Hero Block layout variations
- Card Block now supports badges and icons  
- Fixed Gallery Block lightbox z-index issue
```

---

## Hook & Filter Patterns

### Recognizing WordPress Hooks

WordPress hooks follow specific naming conventions that should be highlighted:

**Patterns to recognize:**
- Action hooks: `do_action('my_plugin_action')`
- Filter hooks: `apply_filters('my_plugin_filter', $value)`
- In commit messages: `add my_plugin_gallery_filter`
- In changelogs: `New `gallery_lightbox` filter`

### Standardizing Hook References

Format: `` `hook_name` `` (backticks for code formatting)

**Conversion patterns:**
- `my_gallery_lightbox_enabled` → `` `my_gallery_lightbox_enabled` ``
- `hero_section_background` → `` `hero_section_background` ``
- `testimonial_gallery_autoplay` → `` `testimonial_gallery_autoplay` ``

### Type Identification

Include hook type for clarity:

```markdown
- New `my_gallery_lightbox` filter for customization
- New `hero_section_initialized` action hook
- Enhanced `gallery_images_loaded` filter with additional parameters
```

### Examples

#### Input
```
feat: add my_plugin_gallery_lightbox filter
feat: add hero_section_background action
feat: add testimonial_gallery_autoplay_interval filter
```

#### Output
```markdown
### Added
- New `my_plugin_gallery_lightbox` filter for customization
- New `hero_section_background` action hook
- New `testimonial_gallery_autoplay_interval` filter for controlling carousel timing
```

---

## Theme Feature Patterns

### Recognizing Theme Features

Theme-specific features include:

- **Template parts** — Header, footer, sidebar templates
- **Block styles** — Style variations for blocks
- **Theme options** — theme.json settings
- **Patterns** — Reusable block patterns
- **Block templates** — Full-page templates
- **Color palettes** — Theme color schemes

### Standardizing Theme Feature Names

| Feature Type | Pattern | Example Output |
|---|---|---|
| Template Parts | `feat(hero-template): ...` | **Hero Template Part** |
| Block Styles | `feat(hero-styles): ...` | **Hero Block Style Variations** |
| Theme Options | `feat(theme): add block options` | **New theme options for Hero Block** |
| Patterns | `feat(pattern): add cta pattern` | **New CTA Pattern** |
| Block Templates | `feat(template): add landing page` | **New Landing Page Template** |

### Examples

#### Input (CHANGELOG.md)
```markdown
### Added
- New Hero section template part
- Block style variations for Hero, Card, Button
- New theme.json settings for hero customization
- New pattern: "CTA Section with Hero"
- New page template: "Landing Page with Hero"
```

#### Output (GitHub Release)
```markdown
### Added
- 🎨 **Hero Template Part** — Reusable section template with 5 pre-built variations
- 🎨 **Block Style Variations** — New styles for Hero, Card, Button, and other core blocks
- ⚙️ **Theme Configuration** — Enhanced theme.json settings for hero customization
- 📄 **CTA Section Pattern** — Ready-to-use call-to-action block pattern
- 📋 **Landing Page Template** — Full-page template featuring hero section and CTA
```

---

## Plugin-Specific Patterns

### Plugin Header Recognition

WordPress plugins include standardized headers that indicate version and requirements:

```php
<?php
/**
 * Plugin Name: My Gallery Plugin
 * Version: 1.2.1
 * Requires: 5.8          // Minimum WordPress version
 * Requires PHP: 7.4      // Minimum PHP version
 */
```

### Version Compatibility Notes

Recognize and format version requirements:

**Input:**
```
Changed: Updated minimum WordPress to 5.9
Changed: Updated minimum PHP to 7.4
Changed: Now requires WordPress 6.0+
```

**Output:**
```markdown
### Changed
- Updated minimum WordPress version to 5.9
- Requires PHP 7.4 or higher
- Now requires WordPress 6.0 or later (increased from 5.9)
```

### Plugin-Specific Terminology

Recognize common plugin patterns:

| Term | Context | Format |
|---|---|---|
| `Gutenberg block` | Editor | **Block Name** (use proper name) |
| `WP-CLI command` | CLI | `` `command-name` `` (code format) |
| `Shortcode` | Content | `` [shortcode-name] `` |
| `Custom post type` | Data | **Post Type Name** |
| `Taxonomy` | Organization | **Taxonomy Name** |

---

## Formatting Examples

### Example 1: Block Plugin

#### Input (Commit messages)
```
feat(gallery-block): add lightbox support
fix(gallery-block): resolve z-index conflict
perf(gallery-block): optimize image rendering
feat: add my_gallery_lightbox_enabled filter
fix: updated minimum WordPress to 5.9
```

#### Output (GitHub Release)
```markdown
## 2.0.0 - October 30, 2026

### Added
- 🎨 **Gallery Block Lightbox** — Beautiful image viewing experience with customizable overlay
- 🪝 New `my_gallery_lightbox_enabled` filter for developers

### Changed
- 📊 **Performance** — Gallery rendering optimized for faster loading
- Updated minimum WordPress version to 5.9

### Fixed
- 🐛 Resolved Gallery Block lightbox z-index conflicts
```

### Example 2: Block Theme

#### Input (CHANGELOG.md)
```markdown
## [2.0.0] - 2026-10-30

### Added
- New Hero section template part with variations
- Block style variations for Hero and Button
- New theme.json settings for customization
- New pattern: "CTA Section"

### Changed
- Updated to modern block API v3
```

#### Output (Blog Post)
```markdown
## What's New in v2.0.0

### The Hero Template Part System

The new Hero template part brings flexible hero section configuration directly into theme.json.

- **5 Pre-built Variations** — Different hero layouts to choose from
- **Full Customization** — Control colors, spacing, typography via theme.json
- **Reusable Component** — Use across multiple templates and pages

### Enhanced Block Styles

New block style variations for Hero and Button blocks give you more design flexibility without writing code.

### Improved Block APIs

Theme now uses modern block API v3 for better performance and stability.
```

### Example 3: Multi-Purpose Plugin

#### Input (Multiple sources)
```
Plugin features:
- New Testimonial Gallery block
- New testimonial_gallery_settings filter
- WP-CLI command: wp testimonial-gallery
- Custom post type: 'testimonial'
- Taxonomy: 'testimonial_category'
```

#### Output (Release Notes)
```markdown
### Added
- 🎨 **Testimonial Gallery Block** — Display customer testimonials in customizable gallery layouts
- 🪝 New `testimonial_gallery_settings` filter for developers
- 💻 New WP-CLI command: `` `wp testimonial-gallery` `` for batch operations
- 📋 New custom post type for managing testimonials
- 🏷️ New taxonomy for organizing testimonial categories
```

---

## Integration Examples

### Complete Plugin Release

**Commit History:**
```
feat(gallery-block): add lightbox support (#123)
feat: add my_gallery_performance_enabled filter (#456)
fix(gallery-block): resolve mobile layout issue (#789)
perf: optimize image rendering
chore: update minimum WordPress to 5.9
```

**CHANGELOG Entry:**
```markdown
## [2.1.0] - 2026-10-30

### Added
- New Gallery Block lightbox feature
- New `my_gallery_performance_enabled` filter
- Support for WebP images

### Changed
- Updated minimum WordPress version to 5.9
- Gallery performance improvements

### Fixed
- Fixed Gallery Block layout on mobile devices
```

**Generated Release Notes:**
```markdown
## 2.1.0 - October 30, 2026

### Added
- 🎨 **Gallery Block Lightbox** — New lightbox feature with smooth animations and responsive design (#123)
- 🪝 New `my_gallery_performance_enabled` filter for developers to customize performance features
- 🖼️ WebP image format support for modern browsers

### Changed
- Updated minimum WordPress version to 5.9
- 📊 Improved Gallery Block performance across all layouts

### Fixed
- 🐛 Fixed Gallery Block layout issues on mobile devices (#789)

---

**Contributors:** Thanks to @alice, @bob, and @charlie for this release!
```

### Complete Theme Release

**Features:**
- Hero section template part
- Block style variations
- theme.json configuration
- Reusable patterns
- Modern block APIs

**Generated Release Notes:**
```markdown
## 2.0.0 - October 30, 2026

### Added
- 🎨 **Hero Template Part** — New reusable template with 5 pre-built variations
- 🎨 **Block Style Variations** — Enhanced styles for Hero, Button, and other core blocks
- ⚙️ **Theme Configuration** — Expanded theme.json settings for complete customization
- 📄 **CTA Pattern** — Ready-to-use call-to-action block pattern
- 📋 **Landing Page Template** — Full-page template with hero section

### Changed
- 📊 **Modern Block APIs** — Updated to block API v3 for better performance
- Redesigned header with improved responsive behavior
- Enhanced footer with flexible block structure

### Fixed
- 🐛 Fixed hero image scaling on mobile devices (#123)
- Resolved color conflicts between sections

---

**Migration Guide:** See [Upgrading to v2.0.0](./docs/UPGRADE.md)
```

---

## Block Name Reference

### Common WordPress Blocks

**Core Blocks:**
- Hero Block → **Hero Block**
- Gallery Block → **Gallery Block**
- Image Block → **Image Block**
- Button Block → **Button Block**
- Card Block → **Card Block**
- Testimonial Block → **Testimonial Block**

**Custom Plugin Blocks (examples):**
- `my-gallery-block` → **Gallery Block**
- `hero-block` → **Hero Block**
- `cta-button` → **CTA Button Block**
- `testimonial-carousel` → **Testimonial Carousel Block**

### Common Hook Names

**Popular Action Hooks:**
- `my_plugin_init` → `my_plugin_init` action hook
- `gallery_block_render` → `gallery_block_render` action hook
- `theme_footer` → `theme_footer` action hook

**Popular Filter Hooks:**
- `my_gallery_lightbox` → `my_gallery_lightbox` filter
- `theme_hero_settings` → `theme_hero_settings` filter
- `plugin_output` → `plugin_output` filter

---

## Template Part Names

**Header Templates:**
- `header` → **Header Template Part**
- `header-mobile` → **Mobile Header Template Part**
- `site-header` → **Site Header Template Part**

**Footer Templates:**
- `footer` → **Footer Template Part**
- `footer-widgets` → **Footer with Widgets Template Part**
- `site-footer` → **Site Footer Template Part**

**Content Templates:**
- `hero-section` → **Hero Section Template Part**
- `cta-section` → **CTA Section Template Part**
- `featured-posts` → **Featured Posts Section Template Part**

---

## Pattern Names

**Common Patterns:**
- `cta-section` → **CTA Section Pattern**
- `hero-with-image` → **Hero with Image Pattern**
- `testimonial-block` → **Testimonial Block Pattern**
- `featured-posts-carousel` → **Featured Posts Carousel Pattern**

---

## Best Practices

1. **Recognize WordPress conventions** — Block names use hyphens, hook names use underscores
2. **Use proper terminology** — "Block" not "block", "Template Part" not "template"
3. **Format consistently** — Backticks for code (`` `hook_name` ``), bold for feature names
4. **Include context** — Mention if it's a filter, action, block, or template
5. **Maintain readability** — Don't over-format; balance technical accuracy with clarity
6. **Link to documentation** — When possible, link to WordPress.org docs for hooks and blocks
7. **Highlight developer features** — Make filters and hooks prominent for developer audience

---

## Related Documentation

- Release Notes Formats: [[release-notes-formats.md]]
- Contributor Credit Patterns: [[contributor-credit-patterns.md]]
- WordPress Codex: https://developer.wordpress.org/
- Block Editor Handbook: https://developer.wordpress.org/block-editor/
- Plugin Handbook: https://developer.wordpress.org/plugins/

