# Catch PHP Syntax Errors Before Committing

We've had several instances where broken PHP code got committed, causing production issues. I need a pre-commit validation that catches PHP syntax errors before they make it into the repository.

The validation should:
1. Check all modified .php files for syntax errors using PHP's built-in linter
2. Report the exact line and nature of each syntax error
3. Prevent commit if any syntax errors are found
4. Suggest fixes where possible (missing semicolon, unmatched bracket, etc.)
5. Work for both standard PHP and WordPress-specific code patterns

Example issues that should be caught:
- Missing semicolons on statements
- Unmatched brackets or parentheses
- Unclosed strings or array definitions
- Invalid function syntax
- Incorrect class or namespace declarations

Make this validation non-negotiable: no broken PHP code should ever enter the repository.
