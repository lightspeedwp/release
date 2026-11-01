# Validate a Theme's theme.json and readme.txt Before Committing

I'm working on a WordPress theme update with changes to:
- theme.json (added new block styles, color palettes, typography settings)
- readme.txt (updated features list, new screenshots)
- Several .php template files

Before committing, I need to validate:
1. theme.json is valid JSON and follows WordPress theme.json schema
2. readme.txt has correct headers and valid section structure
3. readme.txt Stable tag matches expected version format
4. No broken image references in readme.txt
5. theme.json doesn't have deprecated properties
6. Block definitions are properly structured

The commit should only proceed if all validations pass. If there are errors, provide specific, actionable feedback about what's wrong and how to fix it.
