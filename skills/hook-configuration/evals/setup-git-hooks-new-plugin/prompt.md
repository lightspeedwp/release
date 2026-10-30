# Set Up Git Hooks for a New WordPress Plugin Project

I'm starting a new WordPress plugin called "Advanced Testimonials" (slug: `advanced-testimonials`). 

I need to:
1. Initialize git hooks for pre-commit and pre-push validation
2. Ensure the hooks will validate theme.json/readme.txt, PHP syntax, and version consistency
3. Configure hooks to run linting and security checks before push
4. Set up hook configuration that works for the team without forcing individual installation

The plugin has:
- Custom post type for testimonials
- Block editor support
- Package.json for frontend build tools
- README.md and readme.txt

Show me the hook configuration needed and verify it's properly set up.
