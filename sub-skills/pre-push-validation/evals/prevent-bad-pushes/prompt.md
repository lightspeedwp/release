# Prevent Pushing Code That Fails Tests or Linting

Team members have accidentally pushed code with:
- Failing unit tests
- Linting errors
- Unmet WordPress coding standards
- Poor code quality issues

This has resulted in:
- Broken CI/CD pipelines
- Rollbacks needed
- Wasted time debugging
- Client-facing stability issues

I need a pre-push validation hook that:
1. Runs all test suites and blocks push on failure
2. Runs linting checks (PHP, JavaScript, CSS)
3. Enforces WordPress coding standards
4. Checks for common quality issues (unused variables, overly complex functions)
5. Provides clear error messages about what failed
6. Suggests how to fix the issues
7. Offers a --force flag for emergency overrides

The validation should be fast (< 2 minutes) and give developers immediate feedback on quality issues before they attempt to push.
