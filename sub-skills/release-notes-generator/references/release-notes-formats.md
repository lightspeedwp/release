# Release Notes Format Templates

This reference guide provides templates and guidelines for each release notes format supported by the release-notes-generator skill.

## Table of Contents

1. [GitHub Release Format](#github-release-format)
2. [Email Newsletter Format](#email-newsletter-format)
3. [Slack Announcement Format](#slack-announcement-format)
4. [Blog Post Format](#blog-post-format)
5. [Customization Options](#customization-options)

---

## GitHub Release Format

### Purpose

Professional markdown formatted for GitHub Release page publication. Direct copy-paste ready.

### Best For

- GitHub Release page content
- Official version announcements
- Technical audience (developers)
- Permanent release archive

### Structure

```
## [VERSION] - [DATE]

### Added
- Feature 1
- Feature 2

### Changed
- Change 1
- Change 2

### Deprecated
- Deprecated item 1

### Removed
- Removed item 1

### Fixed
- Bug fix 1
- Bug fix 2

### Security
- Security fix 1
- Security fix 2

---

**Contributors:** Credits

**Links:** Comparison and download links
```

### Template Variables

```handlebars
## {{version}} - {{release_date}}

{{#if features_added}}
### Added
{{#each features}}
- {{emoji}} **{{title}}** — {{description}}{{#if issue_id}} (#{{issue_id}}){{/if}}
{{/each}}
{{/if}}

{{#if features_changed}}
### Changed
{{#each changes}}
- {{emoji}} **{{title}}** — {{description}}
{{/each}}
{{/if}}

{{#if features_deprecated}}
### Deprecated
{{#each deprecated}}
- {{description}}
{{/each}}
{{/if}}

{{#if features_removed}}
### Removed
{{#each removed}}
- {{description}}
{{/each}}
{{/if}}

{{#if bugs_fixed}}
### Fixed
{{#each fixes}}
- {{emoji}} {{description}}{{#if issue_id}} (#{{issue_id}}){{/if}}
{{/each}}
{{/if}}

{{#if security_items}}
### Security
{{#each security}}
- {{emoji}} {{description}}{{#if issue_id}} (#{{issue_id}}){{/if}}
{{/each}}
{{/if}}

---

**Contributors:** Thanks to {{contributor_names}} for this release!

**Pull Requests:** {{pr_links}}

**Full Changelog:** [{{prev_version}}...{{version}}]({{comparison_url}})

[Download {{version}}]({{download_url}})
```

### Customization Options

```json
{
  "github_format": {
    "emoji_set": "standard",
    "include_issue_links": true,
    "include_pr_links": true,
    "include_comparison_link": true,
    "include_download_link": true,
    "contributor_format": "mentions",
    "max_contributors": 10,
    "sections": ["Added", "Changed", "Deprecated", "Removed", "Fixed", "Security"]
  }
}
```

### Example Output

```markdown
## 1.5.0 - October 30, 2026

### Added
- 🎨 **Gallery Inspector Panel** — Live preview of gallery changes (#234)
- 🏗️ **Multi-Column Layout** — Custom spacing and column control
- ⚡ **Image Lazy Loading** — Performance optimization for large galleries
- 🎯 **Preset System** — Quick setup with pre-built configurations

### Changed
- 📊 **Performance** — 35% faster rendering (#567)
- Enhanced block editor controls
- Updated documentation with video tutorials

### Fixed
- 🐛 Fixed gallery layout with 100+ images
- Resolved slow image loading (#890)
- Fixed inspector not updating during edit

### Security
- 🔒 Added rate limiting to AJAX endpoints
- Enhanced image upload validation

---

**Contributors:** Thanks to @alice, @bob, and @charlie for this release!

**Pull Requests:** [#234](url), [#567](url), [#890](url)

**Full Changelog:** [v1.4.0...v1.5.0](https://github.com/example/hero-gallery-pro/compare/v1.4.0...v1.5.0)

[Download v1.5.0](https://github.com/example/hero-gallery-pro/releases/download/v1.5.0/hero-gallery-pro.zip)
```

---

## Email Newsletter Format

### Purpose

HTML-formatted email newsletter announcing the release to subscribers. Professional and engaging.

### Best For

- Email newsletter subscribers
- General audience
- Promotional announcements
- Driving upgrades/downloads

### Structure

```
[Header with version and date]
[Greeting]
[Introduction paragraph]

[Key features section]
[Performance/improvements section]
[Bug fixes section]
[Security updates section]

[Call-to-action buttons]
[Thank you message]
[Links and footer]
```

### Template Variables

```handlebars
Subject: {{project_name}} {{version}} Released — {{tagline}}

<html>
<head>
  <style>
    /* Email CSS */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{emoji}} {{project_name}} {{version}} Released!</h1>
      <p>{{release_date}}</p>
    </div>
    
    <p>Hi {{recipient}},</p>
    <p>{{introduction_text}}</p>
    
    {{#if features_added}}
    <div class="section">
      <h2>✨ What's New</h2>
      <ul>
        {{#each features}}
        <li><strong>{{title}}</strong> — {{description}}</li>
        {{/each}}
      </ul>
    </div>
    {{/if}}
    
    {{#if performance_improvements}}
    <div class="section">
      <h2>📊 Performance Improvements</h2>
      <p>{{performance_summary}}</p>
    </div>
    {{/if}}
    
    {{#if bugs_fixed}}
    <div class="section">
      <h2>🔧 Bug Fixes & Improvements</h2>
      <ul>
        {{#each fixes}}
        <li>{{description}}</li>
        {{/each}}
      </ul>
    </div>
    {{/if}}
    
    {{#if security_items}}
    <div class="section">
      <h2>🔒 Security Updates</h2>
      <p>{{security_summary}}</p>
    </div>
    {{/if}}
    
    <div class="section">
      <a href="{{release_url}}" class="cta">View Full Release Notes</a>
      <a href="{{download_url}}" class="cta-primary">Update Now</a>
    </div>
    
    <p>Thanks to our amazing community!</p>
    <p>Best regards,<br>The {{team_name}} Team</p>
  </div>
</body>
</html>
```

### Customization Options

```json
{
  "email_format": {
    "subject_template": "{{project_name}} {{version}} Released — {{tagline}}",
    "greeting": "Hi {{recipient}},",
    "sections_included": ["Added", "Changed", "Performance", "Fixed", "Security"],
    "cta_buttons": ["View Release", "Download/Update"],
    "include_contributor_thanks": true,
    "css_template": "lightspeedwp", // or custom CSS
    "from_name": "LightSpeedWP Team",
    "reply_to": "support@example.com"
  }
}
```

### Example Output

```
Subject: My Gallery Plugin v1.2.1 Released

Hi there,

We're excited to announce v1.2.1 of My Gallery Plugin, featuring new layouts, performance improvements, and important bug fixes!

✨ What's New
• Justified Grid Layout — Beautiful new gallery layout option
• WebP Support — Modern image format for faster loading
• Custom Layout Filter — Extend with your own gallery layouts

📊 Performance Improvements
Gallery loading is now 25% faster, with improved responsive behavior on tablets.

🔧 Bug Fixes & Improvements
• Fixed gallery on Safari browsers
• Resolved lightbox z-index conflicts
• Fixed alt-text persistence in editor

🔒 Security Updates
• Added nonce verification to AJAX requests
• Improved image sanitization

[View Full Release Notes] [Update Now]

Thanks to our community for making this release possible!

Best regards,
The LightSpeedWP Team
```

---

## Slack Announcement Format

### Purpose

Concise, emoji-rich format for Slack channel announcements. Encourages engagement and discussion.

### Best For

- Slack announcement channel
- Internal team communications
- Real-time discussions
- Emoji reactions and engagement

### Structure

```
:rocket: **Version Released!**

:sparkles: **Key Features**
• Feature 1
• Feature 2

:zap: **Performance**
• Improvement 1

:bug: **Fixes**
• Fix 1
• Fix 2

:lock: **Security**
• Security update

[Link to release]
React with emoji if excited!
```

### Template Variables

```handlebars
:rocket: **{{version}} Released!** {{project_name}}

{{#if tagline}}
{{tagline}}
{{/if}}

{{#if features_added}}
:sparkles: **New Features**
{{#each features}}
• {{title}}{{#if description}} — {{description}}{{/if}}
{{/each}}
{{/if}}

{{#if performance_improvements}}
:zap: **Performance**
{{#each improvements}}
• {{description}}
{{/each}}
{{/if}}

{{#if bugs_fixed}}
:bug: **Fixes**
{{#each fixes}}
• {{description}}{{#if issue_id}} (#{{issue_id}}){{/if}}
{{/each}}
{{/if}}

{{#if security_items}}
:lock: **Security**
{{#each security}}
• {{description}}
{{/each}}
{{/if}}

Check it out: <{{release_url}}>
:point_right: [{{cta_text}} →]({{cta_url}})

React with :tada: or :rocket: if you're excited!
```

### Customization Options

```json
{
  "slack_format": {
    "emoji_set": "standard",
    "max_items_per_section": 5,
    "include_links": true,
    "include_call_to_action": true,
    "emoji_reaction_prompt": true,
    "thread_friendly": true
  }
}
```

### Example Output

```
:rocket: **v2.0.0 Released!** Hero Block Theme

A major release with new Hero template system and modernized block APIs.

:sparkles: **New Features**
• Hero Template Part with 5 variations
• Block style variations for Hero, Card, Button
• Landing Page template with hero section
• CTA pattern for quick setup

:zap: **Performance**
• Modernized block API v3
• Better responsive behavior

:bug: **Fixes**
• Fixed hero image scaling on mobile
• Resolved color conflicts
• Improved accessibility with ARIA labels

:lock: **Security**
• Enhanced CSS sanitization
• Improved escaping in templates

Check it out: <https://github.com/example/hero-block-theme/releases/tag/v2.0.0>
:point_right: [Get v2.0.0 →](https://example.com/download)

React with :tada: or :rocket: if you're excited!
```

---

## Blog Post Format

### Purpose

SEO-optimized, narrative-driven blog post format. Detailed and engaging for web publication.

### Best For

- Blog post publication
- SEO and organic search
- Long-form storytelling
- WordPress.org featured sections
- Community engagement

### Structure

```
[Headline]
[Date, Author, Read Time]
[Introduction with context]

[Section 1: Major Feature]
[Section 2: Feature/Improvement]
[Section 3: Performance/Enhancement]

[Why This Matters]
[Getting Started]
[FAQ or Common Questions]
[Call-to-action]
[Related Content]
[Author Bio]
```

### Template Variables

```handlebars
# {{title}}

**{{release_date}}** | By {{author}} | {{estimated_read_time}} min read

{{introduction_paragraph}}

{{#each major_features}}
## {{section_title}}

{{section_introduction}}

{{#if feature_details}}
- **{{detail_title}}** — {{description}}
{{/each}}

{{#if code_examples}}
\`\`\`
{{code}}
\`\`\`
{{/if}}

{{/each}}

## Getting Started

{{getting_started_text}}

[Download {{version}}]({{download_url}}) or update from your dashboard.

[View Full Release Notes →]({{release_notes_url}})

---

Built with love by {{team_name}}. [Thanks to our contributors →]({{contributors_url}})

**Questions?** Check out our [documentation]({{docs_url}}) or [open an issue]({{issues_url}}).
```

### Customization Options

```json
{
  "blog_format": {
    "headline_style": "feature_focused", // or "version_focused"
    "sections_included": ["Added", "Changed", "Performance", "Fixed", "Security"],
    "include_faq": true,
    "include_code_examples": true,
    "include_screenshots_placeholders": true,
    "seo_optimization": true,
    "estimated_read_time": true,
    "author_bio": true,
    "related_articles": true
  }
}
```

### Example Output

```markdown
# My Gallery Plugin v1.5.0 Released — Inspector Panel & 35% Performance Boost

**October 30, 2026** | By Alice Smith | 6 min read

We're thrilled to announce v1.5.0 of My Gallery Plugin, featuring a powerful new Inspector panel, significant performance improvements, and new customization tools!

## The Gallery Inspector Panel

The new Gallery Block Inspector panel brings live preview directly into WordPress. Edit gallery settings and watch your gallery update in real-time.

- **See changes instantly** — Real-time updates in the editor
- **Compare layouts** — Adjust columns and spacing with visual feedback
- **Customize with confidence** — Know exactly how it will look

## Multi-Column Layout with Custom Spacing

Galleries now support custom column counts (1-6) with pixel-perfect gap control. Choose exactly how you want your images arranged.

## Image Lazy Loading

A new lazy-loading option defers image loading until needed, dramatically reducing page load times for galleries with many images.

## Performance: 35% Faster

Gallery rendering is now 35% faster, with especially dramatic improvements for large galleries with 100+ images.

- **Before:** 1,200ms for 100 images
- **After:** 780ms for 100 images

## Upgrade Now

[Download v1.5.0](url) or update directly from your WordPress dashboard.

[View Full Release Notes →](url)

---

Built with love by LightSpeedWP. [Thanks to our contributors →](url)
```

---

## Customization Options

### Global Settings

```json
{
  "global_options": {
    "project_type": "plugin", // or "theme"
    "emoji_enabled": true,
    "emoji_set": "standard", // "tech", "nature", "minimal"
    "include_issue_links": true,
    "include_pr_links": true,
    "include_comparisons": true,
    "contributor_attribution": "mentions", // or "detailed", "minimal"
    "max_items_per_section": null,
    "date_format": "MMMM DD, YYYY",
    "link_style": "markdown" // or "html", "plaintext"
  }
}
```

### Emoji Sets

**Standard (default):**
```json
{
  "added": "✨",
  "changed": "📊",
  "fixed": "🐛",
  "security": "🔒",
  "performance": "⚡",
  "deprecated": "⚠️",
  "removed": "🗑️",
  "feature": "🎨",
  "documentation": "📚",
  "test": "✅"
}
```

**Tech:**
```json
{
  "added": "⚙️",
  "changed": "🔧",
  "fixed": "🛠️",
  "security": "🔐",
  "performance": "⚡",
  "deprecated": "⚠️",
  "removed": "❌",
  "feature": "🎯",
  "documentation": "📖",
  "test": "✔️"
}
```

**Minimal:**
```json
{
  "added": "→",
  "changed": "~",
  "fixed": "✓",
  "security": "◆",
  "performance": "*",
  "deprecated": "◇",
  "removed": "✕",
  "feature": "●",
  "documentation": "§",
  "test": "✔"
}
```

### Verbosity Levels

**Brief** — Bullet points, minimal descriptions
```
- New gallery inspector panel
- 35% performance improvement
- Bug fixes and security updates
```

**Detailed** — Comprehensive descriptions with context
```
- **Gallery Inspector Panel** — Live preview in block editor with real-time updates (#234)
- **Performance** — Gallery rendering improved by 35% for large galleries (#567)
- **Bug Fixes** — Resolved layout issues with 100+ images and lightbox z-index conflicts
```

**Technical** — Includes code examples and implementation details
```
- **Gallery Inspector Component** — React component with real-time preview
  - Uses React Context for state management
  - Implements debouncing for performance
  - Code: `import GalleryInspector from './components/GalleryInspector'`
```

---

## Output Quality Checklist

- [ ] Format matches intended audience
- [ ] All issue links are properly formatted
- [ ] Emojis are used consistently
- [ ] Contributor names are accurate
- [ ] Version numbers are consistent
- [ ] Tone matches channel/format
- [ ] Links are tested and working
- [ ] Grammar and spelling verified
- [ ] Formatting is clean and readable
- [ ] Call-to-action is clear

---

**Related Documentation:**
- [[wordpress-block-patterns.md]] — WordPress-specific formatting patterns
- [[contributor-credit-patterns.md]] — How to attribute contributors
