# Auto-Generate Release Notes from Git Commits and PRs

We're preparing for a major release (3.0.0) and want to automatically generate comprehensive release notes from our git history.

The release has:
- 47 commits since last release
- 12 merged PRs
- 8 issues closed
- 3 breaking changes
- 5 new features
- 9 bug fixes

I need to:
1. Parse git commits since the last release tag
2. Extract meaningful information from commit messages
3. Group commits by type (features, bugfixes, breaking changes, etc.)
4. Link to related GitHub PRs and issues
5. Generate human-friendly release notes
6. Highlight breaking changes prominently
7. Include upgrade instructions
8. Add migration guide for major changes

The auto-generated notes should:
- Be ready for publishing to GitHub Releases
- Include all significant changes
- Be formatted clearly with sections
- Have proper emphasis on critical items (breaking changes)
- Link to documentation where relevant

Generate release notes for version 3.0.0 from the git history and show me the final output.
