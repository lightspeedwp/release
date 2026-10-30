# Enable and Configure Git Hooks in an Existing Theme Project

Our theme "Modern Agency" has been in development for 6 months without git hooks. The repo is active with 3 developers and multiple feature branches.

We need to:
1. Retrofit git hooks without disrupting current workflow
2. Make hook installation optional but recommended for new developers
3. Set up pre-commit validation for theme.json and styles
4. Configure pre-push checks that don't break existing commits
5. Document the hook setup for the team

Current state:
- 47 commits on develop branch
- 2 open feature branches
- Some commits with inconsistent version numbers
- No lefthook configuration yet

Help me add git hooks to this existing project safely, and create documentation for team onboarding.
