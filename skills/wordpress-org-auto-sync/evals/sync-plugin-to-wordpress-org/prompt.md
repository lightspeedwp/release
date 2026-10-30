# Test Case: Sync Block Plugin to WordPress.org

## Scenario

A new version of a block plugin (LightSpeed Hero Block) has been released on GitHub:
- **Repository:** lightspeedwp/block-hero
- **Release Version:** v2.3.1
- **Type:** WordPress Plugin (block-based)
- **GitHub Release:** Published with all files and changelog
- **WordPress.org Status:** Already approved and published at https://wordpress.org/plugins/block-hero/

## Task

Use the wordpress-org-auto-sync skill to automatically sync the v2.3.1 release to WordPress.org SVN:

1. **Detect the plugin type** from repository structure
2. **Clone/update SVN repository** for plugins.svn.wordpress.org
3. **Sync files from GitHub release** to SVN trunk/
4. **Create version tag** (tags/2.3.1/)
5. **Commit to WordPress.org SVN** with proper message
6. **Verify sync succeeded** on WordPress.org
7. **Report completion** with status and URLs

## Expected Behavior

### Phase 1: Detection & Init
- [x] Detects PLUGIN type (block-hero.php found in root)
- [x] Resolves SVN URL: https://plugins.svn.wordpress.org/block-hero/
- [x] Clones or updates local SVN working copy
- [x] Verifies SVN authentication works
- [x] Checks for uncommitted changes in SVN working copy

### Phase 2: File Sync
- [x] Identifies files to sync (block-hero.php, /blocks, /includes, readme.txt, /assets)
- [x] Skips excluded patterns (.git, node_modules, build)
- [x] Compares trunk/ with release files
- [x] Identifies new files (adds) and deleted files (deletes)
- [x] Copies all files to trunk/
- [x] Shows file manifest: 34 files changed (+12, -3 from previous version)

### Phase 3: Tag & Commit
- [x] Verifies version in block-hero.php header matches tag: "Version: 2.3.1"
- [x] Updates readme.txt stable tag: "Stable tag: 2.3.1"
- [x] Creates SVN tag by copying trunk/ → tags/2.3.1/
- [x] Commits trunk/ with message including changelog summary
- [x] Commits tag creation with metadata

### Phase 4: Verification
- [x] Confirms SVN commits succeeded (no errors)
- [x] Polls WordPress.org plugin API
- [x] Verifies version 2.3.1 appears in WordPress.org directory
- [x] Checks assets (icon, banner, 3 screenshots) are displaying
- [x] Verifies changelog is readable on plugin page
- [x] Confirms download link works

### Phase 5: Report & Completion
- [x] Generates sync report with:
  - Status: ✓ SUCCESS
  - Plugin: block-hero v2.3.1
  - Files synced: 34
  - SVN commits: 2 (trunk + tag)
  - WordPress.org URL: https://wordpress.org/plugins/block-hero/
  - Verification: All checks passed
- [x] Report saved to: /releases/2.3.1/wordpress-org-sync-report.md

## Validation Criteria

**Success:** All phases complete without errors:
1. SVN commits appear in https://plugins.svn.wordpress.org/block-hero/
2. Version 2.3.1 is live on https://wordpress.org/plugins/block-hero/
3. Changelog from readme.txt displays on listing page
4. Assets (banner, icon, screenshots) are visible
5. Download link points to v2.3.1
6. No files contain secrets or excluded patterns

**Failure Conditions:**
- SVN auth fails (prompt for credentials or use stored auth)
- Version mismatch between header and tag name
- Assets missing or wrong dimensions
- Uncommitted changes block sync
- WordPress.org API unreachable for 30min+ (warn but complete)

## Rollback Scenario

If verification fails in Phase 4:
- [x] Revert SVN commits in reverse order
- [x] Delete tags/2.3.1/ from SVN
- [x] Report what was rolled back and error details
- [x] Provide link to troubleshooting guide
