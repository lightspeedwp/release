# Test Case: Validate WordPress.org Sync Completion

## Scenario

A plugin or theme sync to WordPress.org has completed and you need to verify it was successful:

- **Plugin:** block-hero v2.3.1 OR **Theme:** editorial v1.4.0
- **Sync Status:** Claimed to be complete
- **Task:** Validate all aspects of the sync on WordPress.org

## Task

Run comprehensive validation to confirm the WordPress.org sync succeeded:

1. **Verify SVN repository state** (commits appear, versions correct)
2. **Check WordPress.org directory** (version is live, metadata displays)
3. **Validate plugin/theme headers** (match WordPress.org requirements)
4. **Verify assets** (icons, banners, screenshots visible)
5. **Check installation & download** (links work, file available)
6. **Validate changelog** (updates display on listing page)
7. **Generate validation report** with PASS/FAIL for each check

## Validation Checklist

### SVN Repository Checks

For **Plugin (block-hero)**:
- [x] SVN log shows 2 recent commits
  - Most recent: "Tagging version 2.3.1"
  - Previous: "Version 2.3.1: {release title}"
- [x] tags/2.3.1/ exists and contains plugin files
- [x] trunk/ contains 2.3.1 files
- [x] readme.txt shows: "Stable tag: 2.3.1"
- [x] No uncommitted changes in SVN

For **Theme (editorial)**:
- [x] SVN log shows 2 recent commits
  - Most recent: "Tagging version 1.4.0"
  - Previous: "Version 1.4.0: {release title}"
- [x] tags/1.4.0/ exists and contains all theme files
- [x] trunk/ updated with all templates, patterns
- [x] readme.txt shows: "Stable tag: 1.4.0"

### WordPress.org Directory Checks

For **Plugin**:
- [x] Plugin page loads: https://wordpress.org/plugins/block-hero/
- [x] Version displays: "Version 2.3.1"
- [x] Author shows: "LightSpeedWP"
- [x] Description displays correctly
- [x] "Download" button available and works
- [x] Download file has correct version
- [x] Installation instructions are clear

For **Theme**:
- [x] Theme page loads: https://wordpress.org/themes/editorial/
- [x] Version displays: "Version 1.4.0"
- [x] Author shows: "LightSpeedWP"
- [x] Screenshot displays (1200×900 or similar)
- [x] "Preview" button works
- [x] "Install" button available

### Asset Validation

For **Plugin Assets**:
- [x] Icon displays (128×128 or 256×256)
- [x] Banner displays at top (772×250)
- [x] All screenshots display (3+ images)
- [x] Assets are clear and professional quality

For **Theme Assets**:
- [x] Screenshot displays (1200×900 or 1200×800)
- [x] Screenshot represents actual theme
- [x] Banner present (if applicable, 772×250)

### Changelog Validation

For **Plugin**:
- [x] Changelog section visible on listing page
- [x] Version 2.3.1 entry displays
- [x] Changelog entries are readable and formatted
- [x] No broken links in changelog
- [x] Previous versions (2.3.0, 2.2.x) also listed

For **Theme**:
- [x] Changelog section displays
- [x] Version 1.4.0 entry visible
- [x] Release notes are clear
- [x] Previous versions listed

### Installation & Compatibility

For **Plugin**:
- [x] "Install" from WordPress.org works
- [x] Plugin can be activated
- [x] No PHP errors on activation
- [x] Gutenberg blocks are registered (if applicable)
- [x] Works on tested WordPress version

For **Theme**:
- [x] "Install" from WordPress.org works
- [x] Theme can be activated
- [x] Theme templates display correctly
- [x] No CSS errors or warnings
- [x] Compatible with WordPress version

### Metadata & SEO

For **Plugin**:
- [x] Plugin slug is correct: "block-hero" (URL matches)
- [x] Contributors field shows: "lightspeedwp"
- [x] License shows: "GPL v2 or later"
- [x] Support forum/link accessible
- [x] Meta description is appropriate

For **Theme**:
- [x] Theme slug is correct: "editorial" (URL matches)
- [x] Contributors field shows: "lightspeedwp"
- [x] License shows: "GPL v2 or later"
- [x] Tags display (e.g., "block-theme", "wordpress")

## Automated Validation Script

```bash
# Run validation checks programmatically:
./scripts/svn-sync-validator.js --plugin block-hero --version 2.3.1
# OR
./scripts/svn-sync-validator.js --theme editorial --version 1.4.0

# Output:
# ✓ SVN tags/2.3.1/ exists
# ✓ readme.txt Stable tag: 2.3.1
# ✓ WordPress.org page loads
# ✓ Version displays: 2.3.1
# ✓ Assets visible: icon, banner, 3 screenshots
# ✓ Download link works
# ✓ Changelog displays
#
# VALIDATION: ✅ PASS (15/15 checks)
# Report: ./reports/sync-validation-2.3.1.json
```

## Expected Output

### Success Report

```markdown
# WordPress.org Sync Validation Report

**Status:** ✅ VALIDATION PASSED

**Plugin/Theme:** block-hero (Plugin) | editorial (Theme)  
**Version:** 2.3.1 | 1.4.0  
**Date:** 2026-10-30  
**Timestamp:** 12:34:56 UTC

## SVN Repository
- [x] Commits appear in log
- [x] Tag created: tags/X.Y.Z/
- [x] Stable tag updated in readme.txt
- [x] No uncommitted changes

## WordPress.org Directory
- [x] Version displays correctly
- [x] Metadata complete and accurate
- [x] Description renders properly
- [x] Installation instructions clear

## Assets
- [x] Icon/Screenshot displays
- [x] Banner present (if applicable)
- [x] All assets loading correctly
- [x] Dimensions verified

## Changelog
- [x] Visible on listing page
- [x] Formatted correctly
- [x] Readable and professional

## Installation & Testing
- [x] Download/Install works
- [x] No activation errors
- [x] Features function correctly
- [x] Compatible with WordPress version

## Summary

All validation checks passed. The sync to WordPress.org was successful.

**Download:** https://wordpress.org/plugins/block-hero/  
**SVN:** https://plugins.svn.wordpress.org/block-hero/  
**Direct Link:** https://downloads.wordpress.org/plugin/block-hero.2.3.1.zip

**Next Steps:** 
- Release announcement can proceed
- Update social media and documentation with new version
- Monitor support channels for user feedback
```

### Failure Report

```markdown
# WordPress.org Sync Validation Report

**Status:** ⚠️ VALIDATION FAILED

**Failed Checks:**
1. ❌ SVN tag not found: tags/2.3.1/
   - Cause: Tag creation commit may have failed
   - Action: Check SVN logs, retry tagging
   
2. ❌ WordPress.org version not updated
   - Cause: May take up to 30 minutes to propagate
   - Action: Wait and retry validation

3. ⚠️ Plugin banner not displaying
   - Cause: Asset may need regeneration (1+ hour)
   - Action: Verify file exists in SVN, wait for cache

**Recommendations:**
1. Rerun validation in 5-10 minutes (may still be propagating)
2. Check SVN logs: `svn log https://plugins.svn.wordpress.org/block-hero/`
3. If tag missing, create it: `svn cp trunk tags/2.3.1/`
4. If WordPress.org unchanged after 30min, check support forum
```

## Failure Scenarios to Handle

| Scenario | Detection | Resolution |
|----------|-----------|-----------|
| SVN tag not created | Tag missing in SVN log | Retry tag creation via SVN command |
| WordPress.org not updated | Version still shows old number | Wait up to 30 minutes (cache), retry validation |
| Assets not displaying | Asset files in SVN but not visible | Wait up to 1 hour for WordPress.org regeneration |
| Version mismatch | Plugin header ≠ WordPress.org version | Check SVN revision, may need SVN update and recommit |
| Changelog not showing | Readme.txt format error | Validate readme.txt syntax, recommit |
| Download broken | Install button works but download fails | Check file permissions in SVN, verify stable tag |

## Validation Frequency

- **Immediate:** After sync completes (Phase 5)
- **Follow-up:** 5 minutes after initial validation
- **Final:** 30 minutes after sync (for full propagation)

If any check fails at 30-minute mark, escalate to manual troubleshooting.
