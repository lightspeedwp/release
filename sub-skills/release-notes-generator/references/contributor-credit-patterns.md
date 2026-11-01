# Contributor Credit Patterns

Comprehensive guide for identifying, attributing, and crediting contributors in release notes across different formats and contexts.

## Table of Contents

1. [Contributor Sources](#contributor-sources)
2. [Credit Formats](#credit-formats)
3. [WordPress-Specific Patterns](#wordpress-specific-patterns)
4. [Integration Examples](#integration-examples)
5. [Best Practices](#best-practices)

---

## Contributor Sources

### 1. Git Commit Authors

The primary source of contributor identification. Extracted from commit metadata.

```bash
# Command to extract contributors
git log v1.2.0..v1.2.1 --pretty=format:"%an <%ae>"

# Output
Alice Smith <alice@example.com>
Bob Johnson <bob@example.com>
Charlie Davis <charlie@example.com>
Alice Smith <alice@example.com>
```

**Usage:**
- Extract unique author names and emails
- Count commits per author
- Match with GitHub usernames when possible
- Handle duplicate authors (different emails, same person)

### 2. PR/Merge Commits

GitHub-specific contributor identification from pull request metadata.

```bash
# Command to extract PR merge commits
git log v1.2.0..v1.2.1 --merges --pretty=format:"%ae: %s"

# Output
alice@github.com: Merge pull request #234 from alice/lightbox-fix
bob@example.com: Merge pull request #567 from bob/performance
```

**Usage:**
- Identify PR authors from merge commit messages
- Extract PR numbers for linking
- Match committer vs author (who merged vs who wrote)

### 3. GitHub Issue Comments

When tracking who participated in discussion/review of a feature:

```json
{
  "issue_id": 456,
  "title": "Gallery layout issues on mobile",
  "author": "alice",
  "comments": [
    { "author": "bob", "body": "I can reproduce this..." },
    { "author": "charlie", "body": "Found the root cause..." },
    { "author": "david", "body": "Great fix!" }
  ],
  "contributors": ["alice", "bob", "charlie", "david"]
}
```

**Usage:**
- Identify reviewers and collaborators
- Track code reviewers and QA testers
- Acknowledge community feedback

### 4. Issue Reporters

Track who reported bugs that were fixed in the release:

```json
{
  "fixed_issues": [
    { "id": 456, "reporter": "alice", "title": "Gallery broken on Safari" },
    { "id": 567, "reporter": "bob", "title": "Z-index conflict" },
    { "id": 789, "reporter": "community_member", "title": "Alt-text not saving" }
  ]
}
```

**Usage:**
- Acknowledge bug reporters
- Distinguish from fixers
- Optional: highlight community contributions

### 5. Documented Contributors

Contributors explicitly mentioned in documentation or contributor files:

```markdown
# Contributors

- Alice Smith (@alice) - Core Development
- Bob Johnson (@bob) - QA & Testing
- Charlie Davis (@charlie) - Documentation
- David Wilson (@david) - Community Support
```

**Usage:**
- Match against git data
- Reconcile duplicate identities
- Use role information for credit format

---

## Credit Formats

### Format 1: Mentions Only (Simple)

Simplest format, just GitHub usernames:

```
Thanks to @alice, @bob, and @charlie for this release!
```

**Best for:**
- Brief release notes
- Social media
- Quick announcements
- Slack messages

**Template:**
```handlebars
Thanks to {{#join ', ' ', and ' contributors}}@{{name}}{{/join}} for this release!
```

**Code Example:**
```javascript
const contributors = ['alice', 'bob', 'charlie'];
const formatted = contributors
  .map(c => `@${c}`)
  .join(', ')
  .replace(/, ([^,]*)$/, ', and $1');
return `Thanks to ${formatted} for this release!`;
```

### Format 2: Mentions with Commit Count (Detailed)

Shows contribution volume:

```
Thanks to @alice (4 commits), @bob (3 commits), and @charlie (2 commits) for this release!
```

**Best for:**
- GitHub Releases
- Blog posts
- Detailed release notes
- Recognizing top contributors

**Template:**
```handlebars
Thanks to {{#each contributors}}@{{github_username}} ({{commit_count}} {{#if commit_count > 1}}commits{{else}}commit{{/if}}){{#if @last}}{{else}}, {{/if}}{{/each}} for this release!
```

**Code Example:**
```javascript
const contributors = [
  { github_username: 'alice', commit_count: 4 },
  { github_username: 'bob', commit_count: 3 },
  { github_username: 'charlie', commit_count: 2 }
];

const formatted = contributors
  .map(c => `@${c.github_username} (${c.commit_count} commit${c.commit_count > 1 ? 's' : ''})`)
  .join(', ')
  .replace(/, ([^,]*)$/, ', and $1');

return `Thanks to ${formatted} for this release!`;
```

### Format 3: Mentions with Roles (Professional)

Shows contributor roles:

```
**Contributors:**
- @alice — Core Development
- @bob — QA & Testing  
- @charlie — Documentation
```

**Best for:**
- Professional releases
- Blog posts
- Team recognition
- Company communications

**Template:**
```handlebars
**Contributors:**
{{#each contributors}}
- @{{github_username}} — {{role}}
{{/each}}
```

**Code Example:**
```javascript
const contributors = [
  { github_username: 'alice', role: 'Core Development' },
  { github_username: 'bob', role: 'QA & Testing' },
  { github_username: 'charlie', role: 'Documentation' }
];

const formatted = contributors
  .map(c => `- @${c.github_username} — ${c.role}`)
  .join('\n');

return `**Contributors:**\n${formatted}`;
```

### Format 4: Full Names with Links (Premium)

Most detailed, links to profiles:

```
**Built by the community:**
- [Alice Smith](https://github.com/alice) (alice@example.com)
- [Bob Johnson](https://github.com/bob) (bob@example.com)
- [Charlie Davis](https://github.com/charlie) (charlie@example.com)
```

**Best for:**
- Blog posts with bios
- Official announcements
- Marketing materials
- Team pages

**Template:**
```handlebars
**Built by the community:**
{{#each contributors}}
- [{{full_name}}](https://github.com/{{github_username}}){{#if email}} ({{email}}){{/if}}
{{/each}}
```

**Code Example:**
```javascript
const contributors = [
  { 
    github_username: 'alice',
    full_name: 'Alice Smith',
    email: 'alice@example.com'
  },
  {
    github_username: 'bob',
    full_name: 'Bob Johnson',
    email: 'bob@example.com'
  }
];

const formatted = contributors
  .map(c => {
    const link = `[${c.full_name}](https://github.com/${c.github_username})`;
    const email = c.email ? ` (${c.email})` : '';
    return `- ${link}${email}`;
  })
  .join('\n');

return `**Built by the community:**\n${formatted}`;
```

### Format 5: Minimal (ASCII-Only)

For plain text or restricted environments:

```
Contributors: alice, bob, charlie
Commit counts: alice (4), bob (3), charlie (2)
```

**Best for:**
- Plain text emails
- Terminal output
- Accessibility
- Email limitations

**Template:**
```handlebars
Contributors: {{#join ', ' contributors}}{{github_username}}{{/join}}
Commit counts: {{#join ', ' contributors}}{{github_username}} ({{commit_count}}){{/join}}
```

---

## WordPress-Specific Patterns

### Block Development Contributors

```markdown
**Hero Block Contributors:**
- @alice — Block component and styling
- @bob — Editor functionality and settings
- @charlie — Frontend rendering and performance
- @david — Testing and documentation
```

### Plugin Development Roles

```json
{
  "contributors": [
    {
      "github_username": "alice",
      "role": "Lead Development",
      "responsibilities": ["Block architecture", "Performance optimization"]
    },
    {
      "github_username": "bob",
      "role": "QA Engineer",
      "responsibilities": ["Testing", "Browser compatibility"]
    },
    {
      "github_username": "charlie",
      "role": "Documentation",
      "responsibilities": ["Code comments", "README", "Examples"]
    }
  ]
}
```

### Theme Development Recognition

```markdown
## Credits

This theme was built with contributions from:

- **Alice Smith** — Design and Theme Architecture
- **Bob Johnson** — Block Variations and Theme Options
- **Charlie Davis** — Performance Optimization
- **David Wilson** — Accessibility and Testing

Special thanks to the WordPress community for feedback and bug reports!
```

---

## Integration Examples

### Example 1: GitHub Release

```markdown
## 1.2.1 - October 30, 2026

### Added
- New gallery layout option: Justified Grid
- Support for WebP image format

### Fixed
- Fixed gallery images not showing on Safari (#456)
- Resolved lightbox overlay z-index issue (#234)

---

**Contributors:** Thanks to @alice (4 commits), @bob (2 commits), and @charlie (1 commit) for this release!

**Full Changelog:** [v1.2.0...v1.2.1](https://github.com/example/repo/compare/v1.2.0...v1.2.1)
```

### Example 2: Email Newsletter

```html
<p>Thanks to our amazing contributors who made this release possible:</p>

<ul>
  <li><strong>Alice Smith</strong> — Core development and performance optimization</li>
  <li><strong>Bob Johnson</strong> — QA testing and bug fixes</li>
  <li><strong>Charlie Davis</strong> — Documentation and examples</li>
</ul>

<p>Want to contribute? Check out our <a href="https://github.com/example/repo/blob/main/CONTRIBUTING.md">Contributing Guide</a>!</p>
```

### Example 3: Blog Post

```markdown
## Special Thanks

We couldn't have released v1.2.1 without the amazing work of our contributors:

- **Alice Smith** (@alice) led the charge on performance optimization, reducing gallery load times by 25%.
- **Bob Johnson** (@bob) caught multiple edge cases in testing and fixed complex layout issues.
- **Charlie Davis** (@charlie) improved our documentation and created helpful code examples.

Thank you all for your dedication to making WordPress better!

Want to contribute to future releases? We'd love to have you! Check out our [Contributing Guide](CONTRIBUTING.md) to get started.
```

### Example 4: Slack Announcement

```
:tada: v1.2.1 Released!

Thanks to @alice, @bob, and @charlie for their amazing work on this release!

Checkout the full release notes: <https://github.com/example/releases/tag/v1.2.1>

:point_right: [Download Now →](https://wordpress.org/plugins/example/)
```

---

## Mapping Strategies

### Email Reconciliation

Often contributors have multiple email addresses (work, personal, GitHub):

```javascript
const emailMap = {
  'alice@example.com': 'alice@github.com',
  'alice.smith@company.com': 'alice@github.com',
  'bob@corporate.net': 'bob@example.com'
};

function normalizeEmail(email) {
  return emailMap[email] || email;
}
```

### GitHub Username Discovery

Map various identifiers to GitHub usernames:

```javascript
const usernameMap = {
  'alice@github.com': 'alice',
  'Alice Smith': 'alice',
  'alice.smith@example.com': 'alice',
  'alice (Developer)': 'alice'
};

function getGitHubUsername(identifier) {
  return usernameMap[identifier] || null;
}
```

### Duplicate Detection

Handle the same person with different identities:

```javascript
const contributorSimilarity = (a, b) => {
  // Check for similar names, emails, or usernames
  if (a.toLowerCase() === b.toLowerCase()) return true;
  if (a.split(' ')[0] === b.split(' ')[0]) return true; // Same first name
  if (a.includes(b) || b.includes(a)) return true; // One is substring of other
  return false;
};

function mergeContributors(contributors) {
  const merged = {};
  contributors.forEach(c => {
    const existing = Object.keys(merged).find(k => 
      contributorSimilarity(k, c)
    );
    if (existing) {
      merged[existing].aliases.push(c);
      merged[existing].commits++;
    } else {
      merged[c] = { aliases: [c], commits: 1 };
    }
  });
  return merged;
}
```

---

## Best Practices

### 1. Consistent Attribution

Use the same format across all release communications:

- GitHub Release: Mentions with commit counts
- Email: Full names with roles
- Slack: Simple mentions
- Blog: Detailed bios

### 2. Credit Timing

Include credits in:
- Primary announcement (GitHub Release)
- Secondary channels (email, Slack, blog)
- Long-term sources (website, README)

### 3. Accuracy

- Verify GitHub usernames are correct
- Confirm email addresses
- Get permission before publishing
- Update contributor files/documentation

### 4. Recognition

Beyond release notes:
- Add to CONTRIBUTORS file
- Update website contributors page
- Mention in monthly/annual reviews
- Acknowledge in team communications

### 5. Consistency

- Same naming conventions
- Consistent link formats
- Uniform role descriptions
- Regular updates to contributor lists

### 6. Inclusivity

- Credit all types of contributions (code, QA, docs, design)
- Acknowledge community feedback
- Include external contributors
- Respect privacy preferences

---

## Common Formats by Context

| Context | Format | Example |
|---------|--------|---------|
| GitHub Release | Mentions + counts | @alice (4), @bob (2) |
| Email Newsletter | Full names + roles | Alice (Dev), Bob (QA) |
| Slack Channel | Simple mentions | @alice, @bob, @charlie |
| Blog Post | Names + links | [Alice Smith](github.com/alice) |
| README | List with emails | Alice <alice@example.com> |
| Website | Cards with bios | Alice - Lead Developer |
| Certificate/Swag | Full legal names | Alice M. Smith |
| Terminal/CLI | ASCII only | alice, bob, charlie |

---

## Related Documentation

- Release Notes Formats: [[release-notes-formats.md]]
- WordPress Block Patterns: [[wordpress-block-patterns.md]]
- Keep a Changelog: https://keepachangelog.com/
- Conventional Commits: https://www.conventionalcommits.org/

