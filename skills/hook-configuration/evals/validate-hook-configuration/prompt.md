# Verify Git Hooks Are Properly Installed and Working

We've set up git hooks with lefthook across our plugin projects, but need to verify:

1. All developers have hooks installed correctly
2. Pre-commit hooks are actually running on attempted commits
3. Pre-push hooks are preventing bad pushes
4. Hook configuration is consistent across the team
5. Hooks execute with correct timeout and error handling

The team reports inconsistent behavior:
- Some developers say hooks aren't running
- Different error messages on different machines
- Unclear if hooks are actually preventing bad commits

Create a validation script that:
- Checks if lefthook is installed
- Verifies all configured hooks are present
- Tests pre-commit and pre-push hook execution
- Reports any configuration issues
- Provides team troubleshooting guide
