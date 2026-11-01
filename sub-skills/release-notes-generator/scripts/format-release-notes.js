#!/usr/bin/env node

/**
 * Format parsed changelog into multiple release notes formats
 *
 * Supports:
 * - GitHub Release (markdown)
 * - Email Newsletter (HTML/text)
 * - Slack Announcement (formatted text)
 * - Blog Post (markdown with metadata)
 */

const fs = require('fs');
const path = require('path');

/**
 * Default emoji set for formatting
 */
const EMOJI_SETS = {
  standard: {
    added: '✨',
    changed: '📊',
    fixed: '🐛',
    security: '🔒',
    performance: '⚡',
    deprecated: '⚠️',
    removed: '🗑️',
    feature: '🎨',
    documentation: '📚',
    test: '✅'
  },
  tech: {
    added: '⚙️',
    changed: '🔧',
    fixed: '🛠️',
    security: '🔐',
    performance: '⚡',
    deprecated: '⚠️',
    removed: '❌',
    feature: '🎯',
    documentation: '📖',
    test: '✔️'
  },
  minimal: {
    added: '→',
    changed: '~',
    fixed: '✓',
    security: '◆',
    performance: '*',
    deprecated: '◇',
    removed: '✕',
    feature: '●',
    documentation: '§',
    test: '✔'
  }
};

/**
 * Format changelog as GitHub Release markdown
 * @param {object} changelog - Parsed changelog
 * @param {object} options - Formatting options
 * @returns {string} Formatted markdown
 */
function formatGitHubRelease(changelog, options = {}) {
  const {
    emojiSet = 'standard',
    includeIssueLinks = true,
    includePRLinks = true,
    contributors = [],
    previousVersion = null,
    repositoryUrl = 'https://github.com/example/repo'
  } = options;

  const emojis = EMOJI_SETS[emojiSet] || EMOJI_SETS.standard;
  const lines = [];

  // Header
  lines.push(`## ${changelog.version} - ${changelog.date}`);
  lines.push('');

  // Sections
  Object.entries(changelog.sections).forEach(([section, items]) => {
    if (items.length === 0) return;

    const emoji = emojis[section.toLowerCase()] || '';
    lines.push(`### ${section}`);

    items.forEach(item => {
      const prefix = emoji ? `- ${emoji} ` : '- ';
      let text = item.text;

      // Format issue links
      if (includeIssueLinks && item.issueLinks.length > 0) {
        item.issueLinks.forEach(issueId => {
          text = text.replace(
            new RegExp(`#${issueId}`, 'g'),
            `[#${issueId}](${repositoryUrl}/issues/${issueId})`
          );
        });
      }

      lines.push(`${prefix}${text}`);
    });

    lines.push('');
  });

  // Footer section
  lines.push('---');
  lines.push('');

  // Contributors
  if (contributors.length > 0) {
    const contributorList = contributors
      .map(c => `@${c.username || c}`)
      .slice(0, 10)
      .join(', ');

    lines.push(`**Contributors:** Thanks to ${contributorList} for this release!`);
    lines.push('');
  }

  // Comparison link
  if (previousVersion && repositoryUrl) {
    const compareUrl = `${repositoryUrl}/compare/${previousVersion}...${changelog.version}`;
    lines.push(`**Full Changelog:** [${previousVersion}...${changelog.version}](${compareUrl})`);
  }

  return lines.join('\n');
}

/**
 * Format changelog as email newsletter
 * @param {object} changelog - Parsed changelog
 * @param {object} options - Formatting options
 * @returns {string} Formatted email (HTML)
 */
function formatEmailNewsletter(changelog, options = {}) {
  const {
    projectName = 'Plugin',
    teamName = 'LightSpeedWP',
    releaseUrl = '#',
    downloadUrl = '#',
    includeHTMLWrapper = true
  } = options;

  const sections = formatSectionsForEmail(changelog.sections);

  const html = `
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 5px; }
    .section { margin: 20px 0; }
    .section h2 { color: #2c3e50; margin: 10px 0; }
    .cta { background: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; display: inline-block; margin: 5px; }
    .cta-primary { background: #28a745; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ ${projectName} ${changelog.version} Released!</h1>
      <p>${changelog.date}</p>
    </div>

    <p>Hi there,</p>
    <p>We're excited to announce v${changelog.version} of ${projectName}, featuring ${getHighlights(changelog.sections).join(', ')}!</p>

    ${sections}

    <div class="section">
      <a href="${releaseUrl}" class="cta">View Full Release Notes</a>
      <a href="${downloadUrl}" class="cta cta-primary">Update Now</a>
    </div>

    <p>Thanks to our amazing community for making this release possible!</p>
    <p>Best regards,<br><strong>The ${teamName} Team</strong></p>
  </div>
</body>
</html>
  `;

  return includeHTMLWrapper ? html : html.replace(/<html[^>]*>|<\/html>|<head[^>]*>.*?<\/head>/gs, '');
}

/**
 * Format changelog as Slack announcement
 * @param {object} changelog - Parsed changelog
 * @param {object} options - Formatting options
 * @returns {string} Slack-formatted text
 */
function formatSlackAnnouncement(changelog, options = {}) {
  const {
    projectName = 'Plugin',
    releaseUrl = '#',
    downloadUrl = '#',
    maxItemsPerSection = 5
  } = options;

  const lines = [];

  lines.push(`:rocket: *${changelog.version} Released!* ${projectName}`);
  lines.push('');

  // Map sections to Slack emojis
  const sectionEmojis = {
    'Added': ':sparkles:',
    'Changed': ':zap:',
    'Fixed': ':bug:',
    'Security': ':lock:',
    'Performance': ':chart_with_upwards_trend:',
    'Deprecated': ':warning:',
    'Removed': ':wastebasket:'
  };

  Object.entries(changelog.sections).forEach(([section, items]) => {
    if (items.length === 0) return;

    const emoji = sectionEmojis[section] || ':point_right:';
    lines.push(`${emoji} *${section}*`);

    items.slice(0, maxItemsPerSection).forEach(item => {
      lines.push(`• ${item.text}`);
    });

    if (items.length > maxItemsPerSection) {
      lines.push(`• ... and ${items.length - maxItemsPerSection} more`);
    }

    lines.push('');
  });

  lines.push(`Check it out: <${releaseUrl}>`);
  lines.push(`:point_right: <${downloadUrl}|Download ${changelog.version} →>`);
  lines.push('');
  lines.push('React with :tada: or :rocket: if you\'re excited!');

  return lines.join('\n');
}

/**
 * Format changelog as blog post
 * @param {object} changelog - Parsed changelog
 * @param {object} options - Formatting options
 * @returns {string} Formatted markdown with frontmatter
 */
function formatBlogPost(changelog, options = {}) {
  const {
    title = `${options.projectName || 'Plugin'} ${changelog.version} Released`,
    author = 'LightSpeedWP Team',
    slug = `release-${changelog.version}`.toLowerCase(),
    releaseUrl = '#',
    contributorsUrl = '#'
  } = options;

  const lines = [];

  // Frontmatter
  lines.push('---');
  lines.push(`title: "${title}"`);
  lines.push(`date: ${changelog.date}`);
  lines.push(`author: "${author}"`);
  lines.push(`slug: "${slug}"`);
  lines.push(`categories: ["releases"]`);
  lines.push(`tags: ["v${changelog.version}", "release", "announcement"]`);
  lines.push('---');
  lines.push('');

  // Content
  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`**${changelog.date}** | By ${author} | ${estimateReadTime(changelog.sections)} min read`);
  lines.push('');

  lines.push(`We're thrilled to announce v${changelog.version}, featuring exciting new features, performance improvements, and important bug fixes!`);
  lines.push('');

  // Sections
  Object.entries(changelog.sections).forEach(([section, items]) => {
    if (items.length === 0) return;

    lines.push(`## What's ${section.toLowerCase() === 'added' ? 'New' : section}?`);
    lines.push('');

    items.forEach(item => {
      lines.push(`- ${item.text}`);
    });

    lines.push('');
  });

  // Getting Started
  lines.push('## Getting Started');
  lines.push('');
  lines.push(`Ready to upgrade? Visit our [GitHub releases page](${releaseUrl}) or update directly from your dashboard.`);
  lines.push('');
  lines.push(`[View Full Release Notes →](${releaseUrl})`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`Built with love by our community. [Thanks to our contributors →](${contributorsUrl})`);

  return lines.join('\n');
}

/**
 * Format sections for email display
 * @param {object} sections - Changelog sections
 * @returns {string} HTML for email sections
 */
function formatSectionsForEmail(sections) {
  const sectionTitles = {
    'Added': '✨ What\'s New',
    'Changed': '📊 Improvements',
    'Fixed': '🔧 Bug Fixes',
    'Security': '🔒 Security Updates'
  };

  let html = '';

  Object.entries(sections).forEach(([section, items]) => {
    if (items.length === 0) return;

    const title = sectionTitles[section] || section;
    html += `
    <div class="section">
      <h2>${title}</h2>
      <ul>`;

    items.forEach(item => {
      html += `\n        <li>${item.text}</li>`;
    });

    html += `
      </ul>
    </div>`;
  });

  return html;
}

/**
 * Get highlights from sections
 * @param {object} sections - Changelog sections
 * @returns {array} Array of highlight strings
 */
function getHighlights(sections) {
  const highlights = [];

  if (sections.Added && sections.Added.length > 0) {
    highlights.push('new features');
  }
  if (sections.Changed && sections.Changed.length > 0) {
    highlights.push('improvements');
  }
  if (sections.Fixed && sections.Fixed.length > 0) {
    highlights.push('bug fixes');
  }
  if (sections.Security && sections.Security.length > 0) {
    highlights.push('security updates');
  }

  return highlights;
}

/**
 * Estimate read time in minutes
 * @param {object} sections - Changelog sections
 * @returns {number} Estimated read time
 */
function estimateReadTime(sections) {
  let itemCount = 0;
  Object.values(sections).forEach(items => {
    itemCount += items.length;
  });
  return Math.max(2, Math.ceil(itemCount / 3));
}

/**
 * Main CLI interface
 */
function main() {
  const args = process.argv.slice(2);
  let changelogJson = null;
  let format = 'github';
  let options = {};

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--changelog') {
      changelogJson = args[++i];
    } else if (args[i] === '--format' || args[i] === '-f') {
      format = args[++i];
    } else if (args[i] === '--project-name') {
      options.projectName = args[++i];
    } else if (args[i] === '--repository') {
      options.repositoryUrl = args[++i];
    } else if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const value = args[++i];
      options[key] = value;
    }
  }

  try {
    if (!changelogJson) {
      throw new Error('No changelog JSON provided');
    }

    const changelog = typeof changelogJson === 'string'
      ? JSON.parse(changelogJson)
      : changelogJson;

    let output;

    switch (format) {
      case 'github':
        output = formatGitHubRelease(changelog, options);
        break;
      case 'email':
        output = formatEmailNewsletter(changelog, options);
        break;
      case 'slack':
        output = formatSlackAnnouncement(changelog, options);
        break;
      case 'blog':
        output = formatBlogPost(changelog, options);
        break;
      default:
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
  formatGitHubRelease,
  formatEmailNewsletter,
  formatSlackAnnouncement,
  formatBlogPost,
  EMOJI_SETS
};

// Run CLI if this is the main module
if (require.main === module) {
  main();
}
