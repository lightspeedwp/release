# Test Case: Sync Block Theme to WordPress.org

## Scenario

A new version of a block theme (LightSpeed Editorial) has been released on GitHub:
- **Repository:** lightspeedwp/editorial-theme
- **Release Version:** v1.4.0
- **Type:** WordPress Block Theme
- **GitHub Release:** Published with all files and changelog
- **WordPress.org Status:** Already approved and published at https://wordpress.org/themes/editorial/

## Task

Use the wordpress-org-auto-sync skill to automatically sync the v1.4.0 release to WordPress.org SVN:

1. **Detect the block theme** from repository structure (theme.json + style.css)
2. **Clone/update SVN repository** for themes.svn.wordpress.org
3. **Sync theme files** to SVN trunk/ (templates, template-parts, patterns, theme.json)
4. **Verify screenshot** is present and correct dimensions (1200×900px)
5. **Create version tag** (tags/1.4.0/)
6. **Commit to WordPress.org SVN**
7. **Verify on WordPress.org** theme directory
8. **Report completion** with status

## Expected Behavior

### Phase 1: Detection & Init
- [x] Detects THEME type (theme.json + style.css found)
- [x] Resolves SVN URL: https://themes.svn.wordpress.org/editorial/
- [x] Clones or updates local SVN working copy
- [x] Verifies SVN authentication and connection
- [x] Checks theme.json and style.css headers for version

### Phase 2: File Sync
- [x] Identifies theme structure:
  - Core: theme.json, style.css, readme.txt
  - Templates: 8 files in /templates/
  - Template parts: 6 files in /template-parts/
  - Patterns: 12 files in /patterns/
  - Assets: screenshot.png (1200×900), banner-772x250.jpg
- [x] Skips excluded patterns (.git, node_modules, build)
- [x] Compares trunk/ with release files
- [x] Copies all files to trunk/
- [x] Shows file manifest: 89 files total (+8 new templates, -2 deprecated patterns)

### Phase 3: Tag & Commit
- [x] Verifies version in style.css matches tag: "Version: 1.4.0"
- [x] Verifies version in theme.json matches: "1.4.0"
- [x] Updates readme.txt stable tag: "Stable tag: 1.4.0"
- [x] Creates SVN tag by copying trunk/ → tags/1.4.0/
- [x] Commits trunk/ with changelog summary
- [x] Commits tag creation

### Phase 4: Verification
- [x] Confirms SVN commits succeeded
- [x] Polls WordPress.org theme API
- [x] Verifies version 1.4.0 appears in themes directory
- [x] Checks theme screenshot displays correctly (1200×900)
- [x] Verifies theme can be installed from directory
- [x] Confirms download link works

### Phase 5: Report & Completion
- [x] Generates sync report with:
  - Status: ✓ SUCCESS
  - Theme: editorial v1.4.0
  - Files synced: 89
  - Templates: 8 updated
  - Template parts: 6 updated
  - Patterns: 12 updated
  - SVN commits: 2
  - WordPress.org URL: https://wordpress.org/themes/editorial/
- [x] Report saved to: /releases/1.4.0/wordpress-org-sync-report.md

## Validation Criteria

**Success:** All phases complete:
1. SVN commits visible at themes.svn.wordpress.org/editorial/
2. Version 1.4.0 is live on https://wordpress.org/themes/editorial/
3. Theme screenshot displays (1200×900px)
4. Theme installation works from directory
5. theme.json structure is valid
6. All template and pattern files are accessible

**Failure Conditions:**
- SVN auth fails
- Version mismatch in style.css, theme.json, or tag
- Screenshot missing or wrong dimensions
- theme.json syntax error
- Uncommitted changes block sync
- WordPress.org API timeout

## Screenshot Validation

Required checks:
- [x] Screenshot exists at: trunk/screenshot.png
- [x] Dimensions: 1200×900px (or 1200×800px minimum)
- [x] Format: PNG or JPG
- [x] File size: reasonable (not >5MB)
- [x] Representative of theme appearance

## Rollback Scenario

If verification fails:
- [x] Revert SVN commits
- [x] Delete tags/1.4.0/
- [x] Report error and rollback status
- [x] Suggest manual steps for theme directory update
