# Maintain Keep a Changelog Format Across Releases

Our CHANGELOG.md has grown over 15 releases, but we notice:
- Some entries don't follow Keep a Changelog 1.1.0 format consistently
- Version headers sometimes use different formats
- Some unreleased changes haven't been dated
- Release dates are in different formats (some YYYY-MM-DD, some just dates)
- Some entries are missing links to related issues

I need to:
1. Audit the entire CHANGELOG.md for format consistency
2. Standardize all version headers to [version] - YYYY-MM-DD format
3. Ensure all sections (Added, Changed, Deprecated, Removed, Fixed, Security) are properly categorized
4. Move any "Unreleased" changes to a specific version section with proper date
5. Add/standardize links to issues and PRs
6. Fix any formatting issues (bullet points, indentation)
7. Validate against Keep a Changelog 1.1.0 schema

Provide:
- A report of all formatting issues found
- The corrected CHANGELOG.md
- Instructions for maintaining format going forward
