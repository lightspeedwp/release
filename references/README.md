# References

This directory contains reference materials, documentation links, and external resources for WordPress block plugin and theme release management.

## Purpose

The references folder provides links to and summaries of:

- Lefthook documentation and configuration reference
- WordPress.org guidelines and requirements
- WordPress block development standards
- GitHub Actions and CI/CD best practices
- Keep a Changelog specification
- Semantic versioning guidelines

## External References

### Lefthook

- **[Lefthook Main Docs](https://lefthook.dev/)**
- **[Lefthook Installation](https://lefthook.dev/install/)**
- **[Lefthook Configuration](https://lefthook.dev/docs/cli/)**

Lefthook is the Git hooks manager used for:
- Pre-commit validation
- Pre-push quality gates
- Commit message validation

### WordPress.org

#### Plugins

- **[Plugin Development Handbook](https://developer.wordpress.org/plugins/)**
- **[Plugin Submission Guidelines](https://developer.wordpress.org/plugins/wordpress-org/)**
- **[Detailed Plugin Guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/)**
- **[SVN and Git Clients](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/)**

#### Themes

- **[Theme Development](https://developer.wordpress.org/themes/)**
- **[Releasing Your Theme](https://developer.wordpress.org/themes/releasing-your-theme/)**
- **[Theme Guidelines](https://developer.wordpress.org/themes/release/)**
- **[Theme Repository](https://wordpress.org/themes/)**

#### Block Themes

- **[Block Theme Documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/create-block-theme/)**
- **[theme.json Schema](https://schemas.wp.org/)**
- **[Block Template API](https://developer.wordpress.org/block-editor/reference-guides/block-api/)**

### Block Development

- **[Block Editor Handbook](https://developer.wordpress.org/block-editor/)**
- **[Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)**
- **[block.json Schema](https://schemas.wp.org/)**
- **[Getting Started with Block Development](https://developer.wordpress.org/block-editor/getting-started/)**

### WordPress Standards

- **[Coding Standards](https://developer.wordpress.org/coding-standards/)**
- **[Plugin Security](https://developer.wordpress.org/plugins/security/)**
- **[Plugin Data Handling](https://developer.wordpress.org/plugins/security/data-validation/)**
- **[Internationalization](https://developer.wordpress.org/plugins/internationalization/)**

### Release Management

#### Keep a Changelog

- **[Keep a Changelog](https://keepachangelog.com/)**
- **[Changelog Format](https://keepachangelog.com/en/1.1.0/)**

Keep a Changelog provides:
- Structured changelog format
- Clear versioning conventions
- User-focused change descriptions

#### Semantic Versioning

- **[Semantic Versioning](https://semver.org/)**
- **[SemVer Spec](https://semver.org/spec/v2.0.0.html)**

Semantic Versioning provides:
- Major.Minor.Patch versioning
- Clear communication of breaking changes
- Compatibility signaling

### Version Control

- **[GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/)**
- **[Creating Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)**
- **[GitHub CLI](https://cli.github.com/)**

### CI/CD

- **[GitHub Actions Documentation](https://docs.github.com/en/actions)**
- **[GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)**
- **[Publishing Actions](https://docs.github.com/en/actions/creating-actions/publishing-actions-in-github-marketplace)**

## Quick Links by Skill

### Hook Configuration

- [Lefthook Installation](https://lefthook.dev/install/)
- [Lefthook Configuration](https://lefthook.dev/docs/cli/)
- Pre-commit hook specifications

### Pre-Commit Validation

- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [Plugin Security](https://developer.wordpress.org/plugins/security/)
- [block.json Schema](https://schemas.wp.org/)

### Pre-Push Validation

- [Testing in WordPress](https://developer.wordpress.org/plugins/testing/)
- [GitHub Workflows](https://docs.github.com/en/actions)
- [WordPress Compliance](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/)

### Changelog Management

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Release Notes](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)

### WordPress.org Sync

- [Plugin Submission](https://developer.wordpress.org/plugins/wordpress-org/)
- [SVN Guide](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/)
- [Theme Publishing](https://developer.wordpress.org/themes/releasing-your-theme/)
- [Plugin Guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/)

## Documentation Files (Local)

When created, these local reference files will be added:

- **lefthook-quick-reference.md** — Common lefthook configurations
- **wordpress-org-plugin-checklist.md** — Plugin submission checklist
- **wordpress-org-theme-checklist.md** — Theme submission checklist
- **block-json-schema.md** — block.json field reference
- **theme-json-schema.md** — theme.json field reference
- **wordpress-coding-standards-summary.md** — Quick coding standards guide

## Using References

### For Hook Setup

→ See [[hook-configuration]] skill
→ Reference: [Lefthook Docs](https://lefthook.dev/)

### For Validation

→ See [[pre-commit-validation]] and [[pre-push-validation]] skills
→ Reference: [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)

### For Changelog

→ See [[changelog-management]] skill
→ Reference: [Keep a Changelog](https://keepachangelog.com/)

### For Release

→ See [[release]] skill and [[github-release]] skill
→ Reference: [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/)

### For WordPress.org

→ See [[wordpress-org-sync]] skill
→ Reference: [Plugin Submission](https://developer.wordpress.org/plugins/wordpress-org/)

## WordPress Block Standards

Key requirements across all reference materials:

1. **Plugin Headers** — Must include all required fields
2. **Theme Headers** — Complete metadata in style.css
3. **block.json** — Valid schema for block registration
4. **theme.json** — Proper block theme configuration
5. **readme.txt** — WordPress.org format compliance
6. **Coding Standards** — PHPCS and ESLint compliance
7. **Nonces & Escaping** — Security best practices
8. **Internationalization** — Proper text domain usage

## Learning Path

1. **New to WordPress Plugins?** → [Plugin Handbook](https://developer.wordpress.org/plugins/)
2. **New to Gutenberg Blocks?** → [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
3. **Ready to Release?** → [[release]] skill
4. **Publishing to wordpress.org?** → [[wordpress-org-sync]] skill

## Contributing

To add new references:

1. Add the resource to the appropriate section
2. Include a brief description
3. Add a link (http/https preferred)
4. Update the "Quick Links by Skill" section if relevant
5. Mention the resource in related skills

## See Also

- [[release]] — Main release skill
- [[hook-configuration]] — Git hooks setup
- [[pre-commit-validation]] — Validation rules
- [[pre-push-validation]] — Full push validation
- [[changelog-management]] — Changelog standards
- [[wordpress-org-sync]] — WordPress.org publishing
