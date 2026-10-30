---
name: generate-multi-format-notes
description: Create GitHub, email, and Slack release note variants in one run
tags:
  - release-notes
  - multi-format
  - automation
---

# Test Case: Generate Multi-Format Release Notes

## Setup

Create a test project with release v1.5.0 for a WordPress plugin:

### Project Structure

**Package:** Hero Gallery Pro v1.5.0

**Files:**
- hero-gallery-pro.php (plugin file)
- VERSION: 1.5.0
- CHANGELOG.md with [1.5.0] section
- Git tags: v1.4.0, v1.5.0

### CHANGELOG.md (Key Section)

```markdown
## [1.5.0] - 2026-10-30

### Added
- New Gallery Block Inspector panel with live preview
- Multi-column layout with custom gap control
- Image lazy-loading option (performance)
- Gallery block preset system for quick setup

### Changed
- Improved gallery rendering performance by 35%
- Updated block editor controls for better UX
- Enhanced documentation with video tutorials

### Fixed
- Fixed gallery layout breaking with 100+ images (#234)
- Resolved image loading issues on slow connections (#567)
- Fixed block inspector panel not updating on edit (#890)

### Security
- Added rate limiting to gallery AJAX endpoints
- Improved image upload validation
```

### Commit History (v1.4.0...v1.5.0)

```
feat(inspector-panel): add live preview to gallery inspector (#234)
feat(gallery-block): implement multi-column layout with gap control
perf(gallery-block): optimize rendering for large galleries (#567)
feat(presets): add preset system for quick gallery setup
docs: add video tutorials to documentation
fix: resolve gallery layout issues with 100+ images
fix: improve image loading on slow connections (#890)
feat(lazy-loading): add image lazy-loading option
chore: update block.json schema
refactor: reorganize gallery rendering logic
test: add integration tests for multi-column layout
```

## Test Execution: Single Command Multi-Format

### Command

```bash
/release-notes-generator \
  --version=1.5.0 \
  --all-formats \
  --output-dir=./release-notes \
  --include-contributor-avatars \
  --verbose
```

### Alternative: Individual Formats

```bash
# GitHub Release
/release-notes-generator --version=1.5.0 --format=github --output=release-notes/github.md

# Email Newsletter
/release-notes-generator --version=1.5.0 --format=email --output=release-notes/email.html

# Slack Announcement
/release-notes-generator --version=1.5.0 --format=slack --output=release-notes/slack.txt

# Blog Post
/release-notes-generator --version=1.5.0 --format=blog --output=release-notes/blog.md
```

## Expected Outputs

### Output File Structure

```
release-notes/
├── github.md           # Markdown for GitHub Release page
├── email.html          # HTML formatted email
├── slack.txt           # Slack-formatted text
├── blog.md             # Markdown blog post
├── manifest.json       # Metadata about all generated formats
└── README.md           # Quick reference guide
```

### Output 1: GitHub Release (github.md)

```markdown
## 1.5.0 - October 30, 2026

### Added
- 🎨 **Gallery Inspector Panel** — Live preview in block editor with real-time updates (#234)
- 🏗️ **Multi-Column Layout** — Custom column count and gap control for flexible design
- ⚡ **Image Lazy Loading** — Performance option to defer off-screen images
- 🎯 **Preset System** — Quick gallery setup with pre-built configurations

### Changed
- 📊 **Performance** — Gallery rendering improved by 35% for large galleries (#567)
- Enhanced block editor controls with improved user experience
- Documentation updated with video tutorials

### Fixed
- 🐛 Fixed gallery layout breaking with 100+ images
- Resolved image loading issues on slow connections (#890)
- Fixed block inspector panel not updating on edit

### Security
- 🔒 Added rate limiting to gallery AJAX endpoints
- Enhanced image upload validation

---

**Contributors:** Thanks to @alice, @bob, and @charlie for this release!

**Pull Requests:** [#234](https://github.com/example/hero-gallery-pro/pull/234), [#567](https://github.com/example/hero-gallery-pro/pull/567), [#890](https://github.com/example/hero-gallery-pro/pull/890)

**Full Changelog:** [v1.4.0...v1.5.0](https://github.com/example/hero-gallery-pro/compare/v1.4.0...v1.5.0)

[Download v1.5.0](https://github.com/example/hero-gallery-pro/releases/download/v1.5.0/hero-gallery-pro.zip)
```

### Output 2: Email Newsletter (email.html)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007cba; color: white; padding: 20px; border-radius: 5px; }
        .section { margin: 20px 0; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .cta { background: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Hero Gallery Pro v1.5.0 Released!</h1>
        </div>
        
        <p>Hi there,</p>
        <p>We're excited to announce v1.5.0 of Hero Gallery Pro, featuring a brand-new inspector panel, performance improvements, and new customization options!</p>
        
        <div class="section">
            <h2>✨ What's New</h2>
            <ul>
                <li><strong>Gallery Inspector Panel</strong> — Live preview of gallery changes in the editor</li>
                <li><strong>Multi-Column Layout</strong> — Full control over columns and spacing</li>
                <li><strong>Image Lazy Loading</strong> — Improve performance with on-demand image loading</li>
                <li><strong>Preset System</strong> — Quick gallery setup with pre-built configurations</li>
            </ul>
        </div>
        
        <div class="section">
            <h2>📊 Performance Improvements</h2>
            <p>Gallery rendering is now <strong>35% faster</strong>, especially for large galleries with 100+ images.</p>
        </div>
        
        <div class="section">
            <h2>🔧 Enhancements</h2>
            <ul>
                <li>Improved block editor controls</li>
                <li>New video tutorials in documentation</li>
                <li>Security improvements with rate limiting</li>
            </ul>
        </div>
        
        <div class="section">
            <a href="https://github.com/example/hero-gallery-pro/releases/tag/v1.5.0" class="cta">View Full Release Notes</a>
            <br><br>
            <a href="https://wordpress.org/plugins/hero-gallery-pro/" class="cta">Update Now</a>
        </div>
        
        <p>Thanks to our amazing community for making this release possible!</p>
        <p>Best regards,<br>The LightSpeedWP Team</p>
    </div>
</body>
</html>
```

### Output 3: Slack Announcement (slack.txt)

```
:rocket: **v1.5.0 Released!** Hero Gallery Pro

A new release with gallery inspector panel, performance improvements, and new customization options.

:sparkles: **New Features**
• Gallery Inspector Panel with live preview
• Multi-column layout with custom gap control
• Image lazy-loading option
• Preset system for quick setup

:zap: **Performance**
• 35% faster gallery rendering
• Better handling of 100+ image galleries

:bug: **Fixes**
• Fixed layout issues with large galleries (#234)
• Resolved image loading on slow connections (#890)
• Fixed inspector not updating during edit

:lock: **Security**
• Rate limiting on AJAX endpoints
• Enhanced image upload validation

Check it out: <https://github.com/example/hero-gallery-pro/releases/tag/v1.5.0>
:point_right: [Update Now →](https://wordpress.org/plugins/hero-gallery-pro/)

React with :tada: or :rocket: if you're excited!
```

### Output 4: Blog Post (blog.md)

```markdown
# Hero Gallery Pro v1.5.0 Released — Inspector Panel & 35% Performance Boost

**October 30, 2026** | By Alice Smith | 6 min read

We're thrilled to announce v1.5.0 of Hero Gallery Pro, our biggest update since launch! This release introduces a powerful new Inspector panel, significant performance improvements, and new customization tools that give you more control over your galleries.

## What's New in v1.5.0

### The Gallery Inspector Panel

The new Gallery Block Inspector panel brings live preview directly into the WordPress block editor. You can now:

- **See changes instantly** — Edit gallery settings and watch your gallery update in real-time
- **Compare layouts side-by-side** — Adjust columns and spacing with immediate visual feedback
- **Customize with confidence** — Know exactly how your gallery will look before publishing

This new inspector panel is available for all gallery layouts, including our multi-column option.

### Multi-Column Layout with Custom Spacing

Galleries now support custom column counts with pixel-perfect spacing control. Choose from 1 to 6 columns, and customize the gap between images for a perfectly tailored layout.

```
1 Column:  ▓
2 Columns: ▓ ▓
3 Columns: ▓ ▓ ▓
4 Columns: ▓ ▓ ▓ ▓
```

### Image Lazy Loading

A new lazy-loading option defers image loading until they're needed, dramatically reducing page load times for galleries with many images.

### Gallery Presets

Get started faster with our new preset system. Choose from pre-built gallery configurations:

- Grid Layout
- Masonry Layout
- Carousel Layout
- Lightbox Gallery

## Performance: 35% Faster

This release brings a significant performance improvement. Gallery rendering is now 35% faster, with especially dramatic improvements for large galleries with 100+ images.

**Before:** 1,200ms rendering time for 100-image gallery
**After:** 780ms rendering time for 100-image gallery

### How We Did It

- Optimized image rendering pipeline
- Implemented virtual image loading
- Reduced JavaScript bundle size

## Bug Fixes

- Fixed gallery layout breaking with 100+ images
- Resolved image loading issues on slow connections
- Fixed block inspector not updating during edit

## Security Updates

We've also improved security with rate limiting on gallery AJAX endpoints and enhanced image upload validation.

## Upgrade Now

Ready to get the new features? [Download v1.5.0](https://github.com/example/hero-gallery-pro/releases/tag/v1.5.0) or update directly from your WordPress dashboard.

[View on WordPress.org →](https://wordpress.org/plugins/hero-gallery-pro/)

---

Built with love by the LightSpeedWP community. [Thanks to our contributors →](https://github.com/example/hero-gallery-pro/graphs/contributors)

**Questions?** Check out our [documentation](https://docs.example.com/) or [open an issue](https://github.com/example/hero-gallery-pro/issues).
```

### Output 5: Manifest (manifest.json)

```json
{
  "version": "1.5.0",
  "release_date": "2026-10-30",
  "generated_at": "2026-10-30T15:30:00Z",
  "project_type": "plugin",
  "formats_generated": {
    "github": {
      "file": "github.md",
      "format": "markdown",
      "word_count": 287,
      "ready": true
    },
    "email": {
      "file": "email.html",
      "format": "html",
      "word_count": 312,
      "ready": true
    },
    "slack": {
      "file": "slack.txt",
      "format": "plaintext",
      "word_count": 156,
      "ready": true
    },
    "blog": {
      "file": "blog.md",
      "format": "markdown",
      "word_count": 892,
      "ready": true
    }
  },
  "statistics": {
    "total_commits": 11,
    "total_issues_mentioned": 3,
    "total_contributors": 3,
    "features_added": 4,
    "bugs_fixed": 3,
    "security_items": 2
  },
  "contributors": [
    "alice",
    "bob",
    "charlie"
  ],
  "issues_referenced": [
    234,
    567,
    890
  ]
}
```

### Output 6: Quick Reference (README.md)

```markdown
# Release Notes for v1.5.0

Generated: October 30, 2026

## 📋 Files Generated

- **github.md** — Copy to GitHub Release page
- **email.html** — Send via email newsletter
- **slack.txt** — Paste into Slack announcement
- **blog.md** — Publish as blog post

## ✅ Quality Checks

All formats have been generated and are ready for use:

- ✅ All sections formatted correctly
- ✅ Issue links verified
- ✅ Contributor names extracted
- ✅ Word counts and readability optimized
- ✅ Emojis applied consistently
- ✅ Links tested

## 📊 Statistics

- **Commits:** 11
- **Contributors:** 3
- **Issues Mentioned:** 3 (#234, #567, #890)
- **Features Added:** 4
- **Bugs Fixed:** 3

## 🚀 Next Steps

1. Review each format for accuracy
2. Customize if needed (add images, adjust tone)
3. Publish to GitHub Release
4. Send email newsletter
5. Post to Slack announcement channel
6. Publish blog post
7. Update WordPress.org readme changelog

## 📝 Tips

- GitHub format is copy-paste ready for Release page
- Email can be sent directly or customized further
- Slack format works in threads for discussion
- Blog post provides SEO-friendly format for publishing

---

All formats generated successfully!
```

## Validation Checklist

- [ ] All four formats generated in single command
- [ ] Output directory created with organized files
- [ ] GitHub format is markdown and copy-paste ready
- [ ] Email format is HTML-formatted and ready to send
- [ ] Slack format follows Slack-friendly conventions
- [ ] Blog post is SEO-optimized with proper structure
- [ ] Manifest JSON includes metadata and statistics
- [ ] README provides quick reference for next steps
- [ ] All issue numbers are converted to proper links
- [ ] Contributor names are extracted and mentioned
- [ ] Word counts are appropriate for each format
- [ ] Emoji usage is consistent across all formats
- [ ] Version numbers match across all outputs

## Success Criteria

1. All four formats generated simultaneously in one command
2. Output files are organized in structured directory
3. Each format follows its specific convention perfectly
4. Manifest provides useful metadata and statistics
5. Quick reference guide aids in next steps
6. All outputs are immediately usable without further editing
7. Links are all functional and properly formatted
8. Contributor attribution is consistent across formats
9. Version comparison links are correct
10. Total generation time is under 5 seconds
