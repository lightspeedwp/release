# Validate Plugin Files and Structure Before Commit

I'm committing updates to a WordPress plugin with changes in:
- Main plugin file (advanced-testimonials.php)
- Multiple class files in /includes/
- Block definitions in /blocks/
- Language files for translations

The pre-commit validation should ensure:
1. Main plugin file has correct plugin headers (name, version, author, license)
2. Version number is consistent across all files
3. No PHP syntax errors in any .php files
4. Block definitions are valid JSON and follow block spec
5. Plugin slug is consistent everywhere
6. Text domain matches plugin slug
7. Author and license information are present

If any validation fails, show me exactly what's wrong and where to fix it before allowing the commit.
