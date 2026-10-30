# Validate That a Release Branch Is Ready to Push

We're preparing to push a release branch (release/2.5.3) to ensure the plugin version is production-ready. Before pushing to the release branch, verify:

Pre-push checks for release readiness:
1. Branch name follows release branch naming convention (release/x.y.z)
2. Version number matches branch name
3. Changelog has been updated with all changes in this version
4. All breaking changes are documented
5. All deprecated functions are marked and documented
6. Git history is clean (no accidental commits)
7. Release notes are prepared
8. All dependencies are up-to-date
9. Security vulnerabilities have been checked
10. README files are current

The push should verify this is truly a release-ready state, not just a random branch. If anything is missing or inconsistent, provide specific guidance on what needs to be done before pushing to production.

Example failure scenarios:
- Branch name is "release-2.5.3" instead of "release/2.5.3"
- Version in plugin file is still 2.5.2
- Changelog hasn't been updated yet
- Breaking changes aren't documented
