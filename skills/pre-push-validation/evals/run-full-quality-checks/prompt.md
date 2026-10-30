# Run Full Quality Checks Before Pushing a Patch Release

I'm about to push a patch release (version 2.5.3) of our testimonials plugin to a release branch. Before the push, I need comprehensive validation:

Quality checks needed:
1. All unit tests pass
2. PHP code meets WordPress coding standards
3. JavaScript/CSS linting passes
4. No security vulnerabilities detected
5. Documentation is up-to-date
6. Changelog has been updated
7. Version numbers are consistent
8. README.md is in sync with readme.txt

The push should only proceed if ALL checks pass. If any check fails:
- Show me the specific failure
- Provide guidance on how to fix it
- Prevent the push until resolved

Current state:
- 15 unit tests defined
- Full test suite runs in ~30 seconds
- Static analysis tools are configured

Help me set up a pre-push validation that ensures we never push broken code to release branches.
