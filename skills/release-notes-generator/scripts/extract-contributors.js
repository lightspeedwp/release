#!/usr/bin/env node

/**
 * Extract contributors from git history
 *
 * Identifies unique contributors by:
 * - Git commit authors
 * - Merge commits (PR authors)
 * - GitHub contributor metadata (when available)
 */

const { execSync } = require('child_process');
const path = require('path');

/**
 * Get git contributors between two refs
 * @param {string} fromRef - Starting reference (e.g., 'v1.0.0')
 * @param {string} toRef - Ending reference (e.g., 'v1.1.0' or 'HEAD')
 * @returns {array} Array of contributor objects
 */
function getGitContributors(fromRef, toRef = 'HEAD') {
  try {
    const format = '%an|%ae|%s';
    const command = `git log ${fromRef}..${toRef} --pretty=format:"${format}" --reverse`;

    const output = execSync(command, { encoding: 'utf8', cwd: process.cwd() });

    if (!output.trim()) {
      return [];
    }

    const contributors = {};
    const lines = output.trim().split('\n');

    for (const line of lines) {
      if (!line.trim()) continue;

      const parts = line.split('|');
      if (parts.length < 3) continue;

      const [name, email, message] = parts;
      const normalizedEmail = normalizeEmail(email);
      const username = extractGitHubUsername(message) || normalizeUsername(name);

      if (!contributors[username]) {
        contributors[username] = {
          username: username,
          email: normalizedEmail,
          name: name,
          commits: 0,
          messages: []
        };
      }

      contributors[username].commits++;
      contributors[username].messages.push(message);
    }

    return Object.values(contributors).sort((a, b) => b.commits - a.commits);
  } catch (error) {
    console.error(`Error getting git contributors: ${error.message}`);
    return [];
  }
}

/**
 * Extract PR authors from merge commits
 * @param {string} fromRef - Starting reference
 * @param {string} toRef - Ending reference
 * @returns {array} Array of PR contributor objects
 */
function getPRContributors(fromRef, toRef = 'HEAD') {
  try {
    const format = '%an|%ae|%s';
    const command = `git log ${fromRef}..${toRef} --merges --pretty=format:"${format}"`;

    const output = execSync(command, { encoding: 'utf8', cwd: process.cwd() });

    if (!output.trim()) {
      return [];
    }

    const contributors = {};
    const lines = output.trim().split('\n');

    for (const line of lines) {
      if (!line.trim()) continue;

      const parts = line.split('|');
      if (parts.length < 3) continue;

      const [mergerName, mergerEmail, message] = parts;

      // Extract PR author from merge message
      // Pattern: "Merge pull request #123 from username/branch"
      const prAuthorMatch = message.match(/from ([^\s/]+)\/([^\s]+)/);

      if (prAuthorMatch) {
        const username = prAuthorMatch[1];
        const prNumber = message.match(/#(\d+)/)?.[1];

        if (!contributors[username]) {
          contributors[username] = {
            username: username,
            email: null,
            name: username,
            commits: 0,
            prs: [],
            merger: { name: mergerName, email: mergerEmail }
          };
        }

        if (prNumber) {
          contributors[username].prs.push(parseInt(prNumber));
        }
        contributors[username].commits++;
      }
    }

    return Object.values(contributors).sort((a, b) => b.commits - a.commits);
  } catch (error) {
    console.error(`Error getting PR contributors: ${error.message}`);
    return [];
  }
}

/**
 * Get all contributors, merging git and PR data
 * @param {string} fromRef - Starting reference
 * @param {string} toRef - Ending reference
 * @param {boolean} includeMetadata - Include detailed metadata
 * @returns {array} Array of merged contributor objects
 */
function getAllContributors(fromRef, toRef = 'HEAD', includeMetadata = false) {
  const gitContributors = getGitContributors(fromRef, toRef);
  const prContributors = getPRContributors(fromRef, toRef);

  // Merge data from both sources
  const merged = {};

  gitContributors.forEach(contributor => {
    merged[contributor.username] = contributor;
  });

  prContributors.forEach(prContributor => {
    if (merged[prContributor.username]) {
      merged[prContributor.username].prs = prContributor.prs;
    } else {
      merged[prContributor.username] = prContributor;
    }
  });

  const result = Object.values(merged).sort((a, b) => {
    // Sort by commits (including PRs)
    const aTotal = (a.commits || 0);
    const bTotal = (b.commits || 0);
    return bTotal - aTotal;
  });

  // Remove message details if not requested
  if (!includeMetadata) {
    result.forEach(contributor => {
      delete contributor.messages;
    });
  }

  return result;
}

/**
 * Normalize email addresses
 * @param {string} email - Email to normalize
 * @returns {string} Normalized email
 */
function normalizeEmail(email) {
  return email ? email.toLowerCase().trim() : '';
}

/**
 * Normalize username from name
 * @param {string} name - Full name
 * @returns {string} Normalized username
 */
function normalizeUsername(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9-._]/g, '')
    .substring(0, 39); // GitHub username length limit
}

/**
 * Extract GitHub username from commit message
 * Matches patterns like: "@username", "github.com/username"
 * @param {string} message - Commit message
 * @returns {string|null} GitHub username or null
 */
function extractGitHubUsername(message) {
  // Try to extract from various patterns
  const patterns = [
    /@([a-zA-Z0-9-]+)/,                    // @username
    /github\.com\/([a-zA-Z0-9-]+)/,        // github.com/username
    /\/([a-zA-Z0-9-]+)[\s#]/                // /username followed by space or #
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return normalizeUsername(match[1]);
    }
  }

  return null;
}

/**
 * Format contributors as markdown list
 * @param {array} contributors - Array of contributors
 * @param {string} format - Format style ('mentions', 'detailed', 'names')
 * @returns {string} Formatted markdown
 */
function formatContributors(contributors, format = 'mentions') {
  if (contributors.length === 0) {
    return 'Thanks to our community for this release!';
  }

  switch (format) {
    case 'mentions': {
      // Simple @mentions: @alice, @bob, and @charlie
      const names = contributors
        .map(c => `@${c.username}`)
        .slice(0, 10);

      if (names.length === 0) return '';
      if (names.length === 1) return `Thanks to ${names[0]} for this release!`;
      if (names.length === 2) return `Thanks to ${names[0]} and ${names[1]} for this release!`;

      return `Thanks to ${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]} for this release!`;
    }

    case 'detailed': {
      // Mentions with commit counts
      const details = contributors
        .map(c => `@${c.username} (${c.commits} commit${c.commits > 1 ? 's' : ''})`)
        .slice(0, 10);

      if (details.length === 0) return '';
      if (details.length === 1) return `Thanks to ${details[0]} for this release!`;

      return `Thanks to ${details.slice(0, -1).join(', ')}, and ${details[details.length - 1]} for this release!`;
    }

    case 'names': {
      // Full names as list
      const lines = ['**Contributors:**'];
      contributors.slice(0, 10).forEach(c => {
        lines.push(`- ${c.name || c.username}`);
      });
      return lines.join('\n');
    }

    case 'links': {
      // Full names with GitHub links
      const lines = ['**Contributors:**'];
      contributors.slice(0, 10).forEach(c => {
        lines.push(`- [@${c.username}](https://github.com/${c.username})`);
      });
      return lines.join('\n');
    }

    default:
      return '';
  }
}

/**
 * Export contributors as JSON
 * @param {array} contributors - Array of contributors
 * @returns {string} JSON string
 */
function exportJSON(contributors) {
  return JSON.stringify(contributors, null, 2);
}

/**
 * Main CLI interface
 */
function main() {
  const args = process.argv.slice(2);
  let fromRef = null;
  let toRef = 'HEAD';
  let format = 'json';
  let outputFormat = 'mentions';
  let limit = 0;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--from' || args[i] === '-f') {
      fromRef = args[++i];
    } else if (args[i] === '--to' || args[i] === '-t') {
      toRef = args[++i];
    } else if (args[i] === '--format') {
      format = args[++i];
    } else if (args[i] === '--output-format') {
      outputFormat = args[++i];
    } else if (args[i] === '--limit' || args[i] === '-l') {
      limit = parseInt(args[++i]);
    } else if (!args[i].startsWith('-')) {
      fromRef = args[i];
    }
  }

  try {
    if (!fromRef) {
      throw new Error('No starting reference provided (use --from)');
    }

    let contributors = getAllContributors(fromRef, toRef);

    if (limit > 0) {
      contributors = contributors.slice(0, limit);
    }

    let output;

    if (format === 'json') {
      output = exportJSON(contributors);
    } else if (format === 'text') {
      output = formatContributors(contributors, outputFormat);
    } else {
      throw new Error(`Unknown format: ${format}`);
    }

    console.log(output);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Export for use as module
module.exports = {
  getGitContributors,
  getPRContributors,
  getAllContributors,
  formatContributors,
  exportJSON,
  normalizeEmail,
  normalizeUsername,
  extractGitHubUsername
};

// Run CLI if this is the main module
if (require.main === module) {
  main();
}
