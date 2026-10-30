# WordPress.org Theme SVN Repository Structure

Complete reference for block theme SVN structure, file organization, and publishing requirements.

## Repository Overview

- **URL Pattern:** `https://themes.svn.wordpress.org/{slug}/`
- **Type:** Apache Subversion (SVN)
- **Structure:** trunk/, tags/, branches/
- **Initial Setup:** After theme approval at WordPress.org
- **Focus:** Block themes (full-site editing compatible)

## Complete Directory Structure

```
editorial/                          (repository root)
├── trunk/                          (development version)
│   ├── style.css                  (theme metadata, required)
│   ├── theme.json                 (block theme config, required)
│   ├── readme.txt                 (WP.org format, required)
│   ├── screenshot.png             (theme preview, 1200×900)
│   │
│   ├── templates/                 (block templates)
│   │   ├── index.html             (fallback template)
│   │   ├── front-page.html
│   │   ├── single.html            (single post template)
│   │   ├── archive.html           (archive template)
│   │   ├── 404.html               (not found template)
│   │   ├── page.html              (single page template)
│   │   └── search.html            (search results template)
│   │
│   ├── template-parts/            (reusable block template parts)
│   │   ├── header.html            (site header)
│   │   ├── footer.html            (site footer)
│   │   ├── sidebar.html           (optional: sidebar)
│   │   ├── post-meta.html         (post metadata)
│   │   ├── navigation.html        (main navigation)
│   │   └── query.html             (posts query loop)
│   │
│   ├── patterns/                  (block patterns)
│   │   ├── hero.php               (hero section pattern)
│   │   ├── testimonial.php        (testimonial pattern)
│   │   ├── cta.php                (call-to-action pattern)
│   │   ├── footer-default.php     (default footer pattern)
│   │   └── feature-grid.php       (feature grid pattern)
│   │
│   ├── assets/                    (theme assets)
│   │   ├── images/
│   │   │   └── placeholder.png
│   │   ├── fonts/
│   │   │   └── custom-font.woff2  (optional: custom fonts)
│   │   ├── screenshot.png         (alternate screenshot)
│   │   ├── banner-772x250.jpg     (optional: directory banner)
│   │   └── css/                   (optional: additional CSS)
│   │       └── custom.css
│   │
│   ├── includes/                  (optional: PHP includes)
│   │   └── custom-functions.php   (if needed, block themes prefer JSON)
│   │
│   └── languages/                 (i18n translations)
│       ├── editorial.pot          (source template)
│       ├── editorial-de_DE.po
│       └── editorial-de_DE.mo
│
├── tags/                          (release versions)
│   ├── 1.0.0/
│   │   ├── style.css
│   │   ├── theme.json
│   │   ├── readme.txt
│   │   ├── screenshot.png
│   │   ├── templates/
│   │   ├── template-parts/
│   │   ├── patterns/
│   │   └── assets/
│   │
│   ├── 1.1.0/
│   │   └── (full copy of theme at that version)
│   │
│   ├── 1.2.0/
│   └── 1.4.0/                    (latest version for users)
│
└── branches/                      (optional: development branches)
    └── experimental-dark-mode/   (long-running feature branch)
        └── (full copy with experimental features)
```

## Required Files

### style.css (Theme Metadata)

Every theme requires a `style.css` file at the root with theme header:

```css
/*
Theme Name: Editorial
Theme URI: https://wordpress.org/themes/editorial/
Author: LightSpeedWP
Author URI: https://github.com/lightspeedwp/
Description: A modern block theme for editorial content with typography focus
Version: 1.4.0
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: editorial
Domain Path: /languages
Requires at least: 6.0
Requires PHP: 7.4
Tested up to: 6.5
Requires Plugins: (optional: dependencies)

Additional CSS:
- Heading font: "Lora" (serif)
- Body font: "Inter" (sans-serif)
- Responsive design with mobile-first approach
*/
```

### theme.json (Block Theme Configuration)

The `theme.json` file defines block editor settings and design tokens:

```json
{
  "$schema": "https://schemas.wp.org/wp/6.5/theme.json",
  "version": 2,
  "title": "Editorial",
  "settings": {
    "layout": {
      "type": "default",
      "contentSize": "800px",
      "wideSize": "1200px"
    },
    "color": {
      "palette": [
        {
          "color": "#000000",
          "name": "Black",
          "slug": "black"
        },
        {
          "color": "#ffffff",
          "name": "White",
          "slug": "white"
        },
        {
          "color": "#e8573a",
          "name": "Primary Red",
          "slug": "primary"
        }
      ],
      "custom": true
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "\"Lora\", serif",
          "name": "Lora",
          "slug": "serif-lora"
        },
        {
          "fontFamily": "\"Inter\", sans-serif",
          "name": "Inter",
          "slug": "sans-inter"
        }
      ],
      "fontSize": [
        {
          "size": "0.875rem",
          "name": "Small",
          "slug": "small"
        },
        {
          "size": "1rem",
          "name": "Normal",
          "slug": "normal"
        },
        {
          "size": "2.25rem",
          "name": "Large",
          "slug": "large"
        }
      ]
    },
    "spacing": {
      "spacingSizes": [
        {
          "size": "0.25rem",
          "name": "Extra small",
          "slug": "xs"
        },
        {
          "size": "1rem",
          "name": "Small",
          "slug": "sm"
        },
        {
          "size": "2rem",
          "name": "Medium",
          "slug": "md"
        }
      ]
    }
  },
  "styles": {
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--sans-inter)",
      "fontSize": "1rem",
      "lineHeight": 1.6
    },
    "elements": {
      "heading": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--serif-lora)",
          "fontWeight": "700"
        }
      }
    }
  }
}
```

### readme.txt (WordPress.org Format)

Theme listing information:

```
=== Editorial ===
Contributors: lightspeedwp, coauthor
Tags: block-theme, full-site-editing, editorial, wordpress, gutenberg
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Requires at least: 6.0
Requires PHP: 7.4
Tested up to: 6.5

A modern block theme for editorial websites and magazines.

== Description ==

Editorial is a beautiful, typography-focused block theme perfect for:
- News and magazine websites
- Blog platforms
- Publishing platforms
- Content-heavy websites

Features:
- Full-site editing with WordPress blocks
- Beautiful typography with Lora and Inter fonts
- Responsive design (mobile, tablet, desktop)
- Customizable color palette
- Pattern library with pre-built content blocks
- Accessibility-first approach (WCAG 2.1)
- Translation-ready (i18n)

No coding required—customize everything in the WordPress editor.

== Installation ==

1. Go to Appearance > Themes
2. Click "Add New"
3. Search for "Editorial"
4. Click "Install"
5. Click "Activate"
6. Go to Appearance > Editor to customize

== Frequently Asked Questions ==

= Can I customize colors and fonts? =

Yes! Go to Appearance > Editor (Full Site Editor). Click the design tool icon to access:
- Color Palette
- Typography Settings
- Spacing Settings
- Layout Settings

= Will this theme work on my site? =

Editorial requires WordPress 6.0 or later with a MySQL/MariaDB database or SQLite support. It's compatible with all plugins and classic themes can coexist.

= How do I use block patterns? =

In the block editor, click the "+" button, go to "Patterns", and select from available patterns. Patterns include hero sections, testimonials, CTAs, and more.

= Is this theme mobile-friendly? =

Absolutely! Editorial is built mobile-first and responsive on all devices.

== Screenshots ==

1. Homepage with hero section and featured articles
2. Blog post template with sidebar
3. Full-site editor showing typography controls
4. Color customization options

== Changelog ==

= 1.4.0 =
* Added 5 new block patterns
* Improved mobile navigation experience
* Enhanced typography settings
* Updated to WordPress 6.5 compatibility
* Fixed color contrast in dark mode

= 1.3.0 =
* Added sidebar template part
* New testimonial pattern
* Improved spacing scale
* Translation updates (de_DE, fr_FR, es_ES)

= 1.2.0 =
* Mobile optimization improvements
* Enhanced footer template
* Added custom fonts support

= 1.1.0 =
* Added pattern library
* Improved full-site editor experience
* New color palette options

= 1.0.0 =
* Initial release

== Support ==

Support available at:
- GitHub: https://github.com/lightspeedwp/editorial-theme/issues
- WordPress Forums: https://wordpress.org/support/theme/editorial/

== Credits ==

Developed by [LightSpeedWP](https://github.com/lightspeedwp/)

Based on WordPress block theme standards and best practices.

== License ==

Editorial is licensed under the GNU General Public License v2 or later.
See LICENSE file for details.
```

## Asset Files

### Screenshot (Required)

```
trunk/screenshot.png

Dimensions:
- Primary: 1200×900 pixels (displayed as 900×675 in directory)
- Minimum: 1200×800 pixels
- DO NOT use: 4:3 aspect ratio alone

Format:
- PNG or JPG
- High quality, representative of theme
- Should show actual theme design (not mockup)
- File size: < 5 MB

Purpose:
- Theme directory listing
- Search results preview
- Theme installation screen
```

### Optional Banner

```
trunk/assets/banner-772x250.jpg

Dimensions: 772×250 pixels
Format: JPG or PNG
Purpose: Theme directory header (optional)
File size: < 2 MB
```

### Alternative Screenshot

```
trunk/assets/screenshot.png

Optional if screenshot.png in root is used.
```

## Template Structure

### Root Templates (templates/)

Each template is a `.html` file (not `.php`) using block markup:

```html
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
  <!-- wp:post-content /-->
</div>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer"} /-->
```

### Available Templates

| File | Purpose | Required |
|------|---------|----------|
| index.html | Fallback/home template | Yes |
| front-page.html | Homepage (if static) | No |
| single.html | Single post display | No |
| page.html | Single page display | No |
| archive.html | Post archive/blog | No |
| search.html | Search results | No |
| 404.html | Not found page | No |
| taxonomy-category.html | Category archive | No |
| taxonomy-post_tag.html | Tag archive | No |

### Template Parts (template-parts/)

Reusable template components with `.html` extension:

```html
<!-- wp:group {"layout":{"type":"flex"}} -->
<header class="wp-block-group">
  <!-- wp:site-logo /-->
  <!-- wp:navigation /-->
</header>
<!-- /wp:group -->
```

## Block Patterns (patterns/)

Patterns are `.php` files registering block markup:

```php
<?php
/**
 * Title: Hero Section
 * Slug: editorial/hero
 * Description: Large hero banner with headline and CTA button
 * Categories: editorial, hero
 * Keywords: hero, banner, cta
 */
?>
<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"120px","bottom":"120px"}}}} -->
<div class="wp-block-group">
  <!-- wp:heading {"level":1,"fontSize":"large"} -->
  <h1 class="wp-block-heading">Welcome to Editorial</h1>
  <!-- /wp:heading -->

  <!-- wp:paragraph -->
  <p>Read our latest stories and insights.</p>
  <!-- /wp:paragraph -->

  <!-- wp:buttons -->
  <div class="wp-block-buttons">
    <!-- wp:button -->
    <div class="wp-block-button">
      <a class="wp-block-button__link">Read More</a>
    </div>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->
</div>
<!-- /wp:group -->
```

## Block Theme Headers

### style.css Header Fields

| Field | Purpose | Example | Required |
|-------|---------|---------|----------|
| Theme Name | Display name | "Editorial" | Yes |
| Theme URI | Theme page | "https://wordpress.org/themes/..." | Yes |
| Description | Brief description | "A modern editorial block theme" | Yes |
| Version | Semantic version | "1.4.0" | Yes |
| Author | Author name | "LightSpeedWP" | Yes |
| Author URI | Author website | "https://github.com/lightspeedwp/" | Optional |
| License | License type | "GPL v2 or later" | Yes |
| License URI | License URL | "https://www.gnu.org/licenses/gpl-2.0.html" | Yes |
| Text Domain | i18n domain | "editorial" | Yes (if translatable) |
| Domain Path | Translations folder | "/languages" | Yes (if i18n) |
| Requires at least | Min WordPress | "6.0" | Recommended |
| Requires PHP | Min PHP version | "7.4" | Recommended |
| Tested up to | Max tested WP | "6.5" | Recommended |

### theme.json Version

Always use the latest schema:

```json
{
  "$schema": "https://schemas.wp.org/wp/6.5/theme.json",
  "version": 2
}
```

Check latest: https://schemas.wp.org/wp/

## Excluded Files

Files that must NOT be in trunk/:

```
.git/
.github/
.gitignore
node_modules/
build/
dist/
src/                    (source files only, not compiled)
.env
.env.local
.DS_Store
Thumbs.db
*.map
package-lock.json       (usually)
composer.lock           (usually)
vendor/                 (regenerated from composer.json)
.phpcs.cache
wp-cli.yml
local.json
*.swp, *.swo
coverage/
```

## Stable Tag Concept

Same as plugins:

```
readme.txt (trunk/)
Stable tag: 1.4.0

Result:
- Users download: /tags/1.4.0/ version
- trunk/ is development (not downloaded)
- Updates within 1 minute of commit
```

## Version Numbering

Follow semantic versioning:

```
1.0.0      First stable release
1.1.0      New features, patterns, templates
1.1.1      Bug fixes
1.2.0      Major feature addition
2.0.0      Breaking changes, major redesign
```

## File Size Limits

- **Single file:** No limit, but keep reasonable (< 5 MB for images)
- **Total theme:** 50-200 MB typical
- **SVN repository:** Grows 10-50 MB per major version

## First Release Workflow

```bash
# 1. Theme approved on WordPress.org
# Get URL: https://wordpress.org/themes/editorial/

# 2. Clone SVN repository
svn checkout https://themes.svn.wordpress.org/editorial/ editorial-svn
cd editorial-svn
ls -la
# Should show: trunk/ tags/ branches/

# 3. Copy theme files to trunk/
cp -r ../editorial-github/* trunk/

# 4. Add screenshot
cp ../artwork/screenshot.png trunk/

# 5. Add optional banner
mkdir -p trunk/assets
cp ../artwork/banner-772x250.jpg trunk/assets/

# 6. Verify required files
ls trunk/{style.css,theme.json,readme.txt}

# 7. Stage all files
svn add trunk/

# 8. Verify readme.txt
cat trunk/readme.txt | grep "Stable tag"
# Should show: Stable tag: 1.0.0

# 9. Commit trunk
svn commit -m "Version 1.0.0: Initial release"

# 10. Create tag
svn cp trunk tags/1.0.0
svn commit -m "Tagging version 1.0.0"

# 11. Verify on WordPress.org
# Visit: https://wordpress.org/themes/editorial/
```

## Ongoing Release Workflow

```bash
cd editorial-svn

# 1. Update SVN copy
svn update

# 2. Clear trunk and copy new version
rm -rf trunk/*
cp -r ../editorial-github/* trunk/

# 3. Update readme.txt stable tag
sed -i '' 's/Stable tag: .*/Stable tag: 1.4.0/' trunk/readme.txt

# 4. Handle files
svn add trunk/*
svn status | grep "^!" | cut -c 9- | xargs svn delete

# 5. Review changes
svn diff trunk/ | head -100

# 6. Commit trunk
svn commit -m "Version 1.4.0: New patterns, typography improvements"

# 7. Create tag
svn cp trunk tags/1.4.0
svn commit -m "Tagging version 1.4.0"

# 8. Verify on WordPress.org (within 1-5 minutes)
```

## Block Theme Best Practices

1. **Use blocks, not PHP:** Prefer block markup in templates/patterns
2. **Responsive design:** Test on mobile, tablet, desktop
3. **Accessibility:** Use semantic HTML, proper headings, alt text
4. **Performance:** Minimize HTTP requests, optimize images
5. **Theme.json:** Keep settings organized and documented
6. **Patterns:** Provide 5-10 commonly-used patterns
7. **Documentation:** Include setup instructions in readme.txt
8. **Backwards compatibility:** Bump MAJOR version for breaking changes

## Integration with Auto-Sync Skill

The wordpress-org-auto-sync skill automates:

```bash
/wordpress-org-auto-sync --theme editorial --version 1.4.0

# Automatically:
# 1. Detects theme structure
# 2. Clones/updates SVN
# 3. Syncs all files
# 4. Creates tag
# 5. Commits to WordPress.org
# 6. Verifies on WordPress.org
# 7. Generates report
```

## Common Issues

### "Screenshot not showing"
- Must be exactly 1200×900 or at least 1200×800
- Filename: `screenshot.png` in root (not jpg, not assets/)
- Wait up to 1 hour for WordPress.org cache

### "theme.json errors"
- Validate JSON syntax (check for missing quotes, commas)
- Ensure `"version": 2` is present
- Verify `$schema` URL is valid

### "Templates not loading"
- Template files must be `.html` not `.php`
- Must use valid block markup (<!-- wp:block -->)
- Check template slugs match template-part includes

### "Version mismatch"
- Ensure match across all three:
  - style.css header: `Version: 1.4.0`
  - theme.json: `version` field (optional but good)
  - SVN tag name: `tags/1.4.0/`
  - readme.txt: `Stable tag: 1.4.0`

See main SKILL.md for complete troubleshooting.
