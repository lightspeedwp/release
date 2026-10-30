# Release Skills

This directory contains sub-skills for the main `release` skill, each focusing on a specific aspect of the WordPress block plugin and theme release workflow.

## Available Skills

### 1. [hook-configuration](./hook-configuration/)
**Configure and manage Git hooks with lefthook for WordPress block projects**

- Install and configure lefthook
- Define pre-commit, pre-push, commit-msg hooks
- Enable auto-fix and re-staging
- Test hook behavior

Learn more: `./hook-configuration/SKILL.md`

### 2. [pre-commit-validation](./pre-commit-validation/)
**Validate markdown, JSON, YAML, PHP, and JavaScript files before commit**

- Lint PHP (PHPCS, WordPress standards)
- Lint JavaScript/TypeScript (ESLint, Prettier)
- Validate JSON (block.json, theme.json)
- Validate markdown and CHANGELOG.md format
- Validate WordPress plugin/theme headers

Learn more: `./pre-commit-validation/SKILL.md`

### 3. [pre-push-validation](./pre-push-validation/)
**Run full validation suite before push**

- Execute all unit and integration tests
- Run complete lint suite
- Validate WordPress compliance
- Check version alignment
- Verify changelog completeness
- Build verification
- Security audit

Learn more: `./pre-push-validation/SKILL.md`

### 4. [changelog-management](./changelog-management/)
**Manage changelog entries and automatic versioning**

- Create properly formatted entries
- Validate Keep a Changelog format
- Organize entries into standard sections
- Automate version numbering and dating
- Generate release notes from changelog

Learn more: `./changelog-management/SKILL.md`

### 5. [wordpress-org-sync](./wordpress-org-sync/)
**Prepare and sync packages to WordPress.org directory**

- Validate WordPress.org compliance
- Prepare SVN repository structure
- Manage asset uploads (icon, banner, screenshots)
- Sync releases to WordPress.org
- Verify successful publication

Learn more: `./wordpress-org-sync/SKILL.md`

## Existing Skills

- **[github-release](./github-release/)** — GitHub tag, release, and asset publication
- **[release-qa](./release-qa/)** — Pre-release quality gates and validation
- **[release-handoff-generator](./release-handoff-generator/)** — Post-release documentation and audit trail

## Release Workflow

These skills are used together in the main `[[release]]` skill workflow:

```
1. hook-configuration
   ↓ (setup git hooks)
   
2. pre-commit-validation
   ↓ (runs on every commit)
   
3. pre-push-validation
   ↓ (runs on every push)
   
4. release-qa
   ↓ (comprehensive pre-release validation)
   
5. changelog-management
   ↓ (version & changelog updates)
   
6. github-release
   ↓ (GitHub publication)
   
7. wordpress-org-sync
   ↓ (WordPress.org publication)
   
8. release-handoff-generator
   ↓ (audit trail & documentation)
```

## Skill Integration Points

- **[[release]]** — Orchestrates the complete release workflow
- **[[hook-configuration]]** → [[pre-commit-validation]] → [[pre-push-validation]]
- **[[pre-push-validation]]** → [[release-qa]] (blocker if validation fails)
- **[[changelog-management]]** → [[github-release]] (provides release notes)
- **[[github-release]]** → [[wordpress-org-sync]] (coordinates publishing)
- **[[wordpress-org-sync]]** → [[release-handoff-generator]] (audit trail)

## WordPress Block Focus

All skills focus on WordPress block plugins and block themes:

- **Blocks:** Gutenberg block registration, attributes, rendering
- **Themes:** Block theme configuration, template parts, patterns
- **Headers:** Plugin and theme metadata in WordPress format
- **Standards:** WordPress coding standards, ESLint, PHPCS
- **Publishing:** GitHub releases and WordPress.org directory

## Using These Skills

### For Setting Up Hooks

```bash
/hook-configuration
```

### For Pre-Release Validation

```bash
/release-qa --verbose
```

### For Complete Release

```bash
/release --scope=minor
```

### For WordPress.org Publishing

```bash
/wordpress-org-sync --version=1.2.4
```

## Key References

- [WordPress Plugin Development](https://developer.wordpress.org/plugins/)
- [WordPress Theme Development](https://developer.wordpress.org/themes/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Lefthook Documentation](https://lefthook.dev/)

## Contributing

To add or modify a sub-skill:

1. Create new folder: `skills/my-skill/`
2. Add SKILL.md with proper frontmatter
3. Update this README with description and link
4. Update cross-references in related skills

See main `[[release]]` skill for conventions and integration points.
