---
name: Team Communication Templates
description: Ready-to-use announcements and guides for sharing with the team
version: 1.0.0
updated: 2026-10-30
---

# Team Communication Templates

Ready-to-use messages and guides for introducing the release skill to your team.

## 📢 Slack Announcement

```
🎉 Introducing: LightSpeedWP Release Skill

We've automated releases for our WordPress block plugins and themes! 🚀

✨ What it does:
• Validates tests, linting, and version alignment before release
• Updates VERSION, plugin/theme headers, and readme.txt automatically
• Manages CHANGELOG.md in Keep a Changelog format
• Creates git tags and publishes GitHub Releases
• Prepares WordPress.org ready packages

⚡ Quick start:
$ cd your-block-plugin-or-theme
$ npm install
$ /release --dry-run      # Preview
$ /release --scope=patch  # Release!

📚 Docs:
• Quick reference: https://github.com/lightspeedwp/release/blob/main/docs/QUICK_REFERENCE.md
• Full WordPress guide: https://github.com/lightspeedwp/release/blob/main/docs/WORDPRESS_BLOCK_ONBOARDING.md
• Development guide: https://github.com/lightspeedwp/release/blob/main/docs/DEVELOPMENT.md

💡 Questions? #release-skill channel or check the docs above
```

## 📧 Email to Team

**Subject:** LightSpeedWP Release Skill - New Automation Available

---

Hi Team,

We've launched an automated release system for our WordPress block plugins and themes. Here's what you need to know:

### What Changed

✅ Releases are now automated with:
- Automatic version management across all files
- Changelog enforcement and dating
- Git tagging and GitHub Release publishing
- WordPress.org package preparation
- Pre-release quality validation

### Before (Manual)
1. Manually update VERSION file
2. Manually update plugin/theme headers
3. Manually update readme.txt
4. Manually date changelog
5. Manually create git tag
6. Manually publish GitHub Release
7. Manually prepare WordPress.org package

### After (Automated)
```bash
/release --scope=patch  # One command!
```

### For Block Plugin Developers

1. **Setup** (first time only):
   ```bash
   cd your-plugin
   npm install
   ```

2. **As you work:**
   ```
   Update CHANGELOG.md with entries
   Commit changes with proper messages
   ```

3. **When ready to release:**
   ```bash
   /release --dry-run      # Preview
   /release --scope=patch  # Release!
   ```

4. **Done!** Your release is:
   - Tagged on GitHub (v1.0.1)
   - Published as GitHub Release
   - Ready for wordpress.org sync
   - Documented with audit trail

### For Block Theme Developers

Same process! The skill handles:
- style.css version updates
- theme.json version updates
- readme.txt stable tag updates
- Block theme specific validation
- WordPress.org theme directory package

### Git Hooks (Automatic Validation)

As you commit and push, the system validates:
- ✅ Markdown formatting
- ✅ JSON syntax
- ✅ YAML structure
- ✅ Tests pass before push
- ✅ Commit message format

### Commit Message Format

```
feat(blocks): Add new button block
fix: Resolve mobile rendering issue
docs: Update README with examples
chore: Update dependencies
```

(Not: "updated stuff" or random text)

### Version Bumping Rules

| Change | Example | Command |
|--------|---------|---------|
| Bug fix | 1.0.0 → 1.0.1 | `/release --scope=patch` |
| New feature | 1.0.0 → 1.1.0 | `/release --scope=minor` |
| Breaking change | 1.0.0 → 2.0.0 | `/release --scope=major` |

### Resources

📄 **Quick Reference** (1-page cheat sheet)
https://github.com/lightspeedwp/release/blob/main/docs/QUICK_REFERENCE.md

📚 **WordPress Block Guide** (detailed for plugins & themes)
https://github.com/lightspeedwp/release/blob/main/docs/WORDPRESS_BLOCK_ONBOARDING.md

🛠️ **Development Guide** (setup, git hooks, validation)
https://github.com/lightspeedwp/release/blob/main/docs/DEVELOPMENT.md

### FAQ

**Q: Do I need to do anything manually?**
A: No! Just update CHANGELOG.md as you work and commit with proper messages.

**Q: What if release validation fails?**
A: The skill shows exactly what needs to be fixed. Follow the suggestions and retry.

**Q: Can I skip the checks?**
A: Yes, but not recommended. Validation prevents broken releases.

**Q: How do I sync to wordpress.org?**
A: The skill generates an SVN-ready package. Details in the docs.

**Q: What if I make a mistake?**
A: There's a rollback procedure in the handoff documentation.

### Next Steps

1. **Everyone:** Read the Quick Reference (5 minutes)
   https://github.com/lightspeedwp/release/blob/main/docs/QUICK_REFERENCE.md

2. **Plugin/Theme Leads:** Setup VERSION and CHANGELOG.md files
   ```bash
   echo "1.0.0" > VERSION
   # Create CHANGELOG.md using template from onboarding guide
   ```

3. **Optional:** Read the full WordPress guide if you want more details
   https://github.com/lightspeedwp/release/blob/main/docs/WORDPRESS_BLOCK_ONBOARDING.md

4. **Your first release:** Use `--dry-run` to preview before executing
   ```bash
   /release --dry-run
   /release --scope=patch
   ```

### Questions?

- Check the Quick Reference first
- See #release-skill channel
- Read the docs linked above
- Reach out to [Release Coordinator Name]

### What's Next?

This is phase one. We're planning:
- Automated WordPress.org syncing
- Release notes auto-generation from issues
- Multi-package releases (plugin + theme)

Thanks for using the new release system! This will save us hours per release. 🚀

---

Best regards,
LightSpeedWP Release Team
```

## 👥 Video Script (3 Minutes)

```
[0:00-0:15] Introduction
Hi team! Today I'm showing you the new LightSpeedWP Release Skill 
that automates releases for our WordPress block plugins and themes.

[0:15-0:45] The Old Way
Before, releasing meant:
- Manually updating VERSION
- Manually editing plugin headers
- Manually dating changelog
- Manually creating git tags
- Manually publishing releases
It took 15-20 minutes per release and was error-prone.

[0:45-1:30] The New Way
Now, it's just three steps:

Step 1: Preview
/release --dry-run
This shows you everything that will change.

Step 2: Review
Check the pre-release checklist.

Step 3: Release
/release --scope=patch
One command! The system handles everything.

[1:30-2:15] What Gets Automated
The release skill automatically:
- Updates VERSION in one place
- Syncs that to plugin headers, theme files, and readme.txt
- Manages the CHANGELOG in proper format
- Creates git tags
- Publishes GitHub Release with notes
- Prepares WordPress.org packages
- Generates audit logs and handoff docs

[2:15-2:45] Git Hooks
As you work, git hooks automatically validate:
- Your commit message format (feat, fix, docs, chore)
- Markdown formatting
- JSON syntax
- Your tests pass before pushing

[2:45-3:00] Getting Started
1. Read the Quick Reference (1 page)
2. Setup VERSION and CHANGELOG.md (first time)
3. Use /release --dry-run for your first time
4. Questions? Check the docs or ask in #release-skill

Questions?
```

## 📋 Checklist for Team Lead

Use this when introducing the skill to your team:

### Phase 1: Setup (Week 1)
- [ ] Share Slack announcement with team
- [ ] Share email/video with team
- [ ] Post Quick Reference in team Slack
- [ ] Create #release-skill channel
- [ ] Identify plugin/theme leads

### Phase 2: Project Setup (Week 2)
- [ ] Each plugin/theme: Create VERSION file
- [ ] Each plugin/theme: Create CHANGELOG.md
- [ ] Each plugin/theme: Run `npm install`
- [ ] Each plugin/theme: Verify git hooks installed
  ```bash
  lefthook status
  ```

### Phase 3: Training (Week 2-3)
- [ ] Hold 30-min walkthrough for plugin leads
- [ ] Hold 30-min walkthrough for theme leads
- [ ] Everyone does `/release --dry-run` as practice
- [ ] Record common questions in FAQ

### Phase 4: First Real Release (Week 3-4)
- [ ] Lead through first release with a plugin/theme
- [ ] Document any issues or questions
- [ ] Gather feedback from team
- [ ] Update docs based on feedback

### Ongoing
- [ ] Monitor #release-skill for questions
- [ ] Update Quick Reference if needed
- [ ] Celebrate successful releases!

## 🎓 Training Session Outline (30 Minutes)

**Agenda:**
1. Why we built this (2 min)
2. What it does (3 min)
3. How to use it (10 min)
4. Common mistakes (5 min)
5. Q&A (10 min)

**Setup:**
- Have Quick Reference printed
- Have demo plugin/theme ready
- Have browser open to GitHub

**Slides:**
1. Title: "Automating WordPress Releases"
2. Before: Manual steps (show checklist)
3. After: One command (show `/release`)
4. What gets updated automatically
5. Workflow diagram
6. Git hooks (automatic validation)
7. Commit message format
8. Demo: `/release --dry-run`
9. Demo: Following suggestions
10. Demo: Actual release
11. Post-release: What happens
12. Quick Reference: Keep this handy
13. Q&A

## 🔔 Weekly Standup Mention

```
Release System Update:

This week we released:
• my-plugin v1.2.1 (patch)
• my-theme v2.0.0 (major)

Time saved: ~30 minutes per release

Next:
• my-component v1.0.0 planned for Friday
• Documentation generation working as expected

No issues or blockers to report.
```

## 📢 Release Announcement Template

Use this for each release:

```
🎉 Release: My Block Plugin v1.1.0

✨ Highlights:
• New Hero Block component
• Improved button styling
• Dark mode support

🔧 What's Fixed:
• Mobile rendering issue (#42)
• Color palette inheritance

📊 Metrics:
• 5 commits from 3 contributors
• 100% test coverage
• Zero linting issues

📦 Download:
https://github.com/lightspeedwp/my-plugin/releases/tag/v1.1.0

🙏 Thanks to @john, @jane, @team

Next release planned for [date]
```

## ✅ Feedback Survey

After first month of using the skill, ask the team:

```
Release Skill Feedback Survey

1. How easy was it to learn? (1-5)
   ☐ 1 - Very hard
   ☐ 2 - Hard
   ☐ 3 - Neutral
   ☐ 4 - Easy
   ☐ 5 - Very easy

2. How much time did it save? (estimate)
   ☐ 0-5 minutes
   ☐ 5-10 minutes
   ☐ 10-15 minutes
   ☐ 15+ minutes

3. What part was most helpful?
   [Open response]

4. What could be improved?
   [Open response]

5. Would you recommend it to other teams?
   ☐ Yes
   ☐ No
   ☐ Maybe

6. What's one thing you'd add?
   [Open response]
```

---

**Need more materials?** Ask the release team to customize these templates for your org.

**Version:** 1.0.0  
**Last Updated:** 2026-10-30
