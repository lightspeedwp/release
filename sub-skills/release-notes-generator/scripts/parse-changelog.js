#!/usr/bin/env node

/**
 * Parse CHANGELOG.md file to extract release notes
 *
 * Supports Keep a Changelog format (https://keepachangelog.com/)
 * Extracts version, release date, and categorized changes
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse changelog file and extract version information
 * @param {string} changelogPath - Path to CHANGELOG.md file
 * @param {string} version - Version to extract (optional, defaults to first version)
 * @returns {object} Parsed changelog entry
 */
function parseChangelog(changelogPath, version = null) {
  try {
    if (!fs.existsSync(changelogPath)) {
      throw new Error(`CHANGELOG.md not found at ${changelogPath}`);
    }

    const content = fs.readFileSync(changelogPath, 'utf8');
    const lines = content.split('\n');

    // Find the section headers and versions
    const sections = {};
    let currentVersion = null;
    let currentSection = null;
    let currentSectionContent = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Match version headers: ## [X.Y.Z] - YYYY-MM-DD
      const versionMatch = line.match(/^##\s+\[?([^\]]+)\]?\s*-?\s*(.*)?$/);
      if (versionMatch) {
        // Save previous section
        if (currentVersion && currentSection) {
          if (!sections[currentVersion]) sections[currentVersion] = {};
          sections[currentVersion][currentSection] = currentSectionContent.join('\n').trim();
        }

        currentVersion = versionMatch[1];
        const date = versionMatch[2] || null;

        if (!sections[currentVersion]) {
          sections[currentVersion] = {
            _date: date,
            _raw_version: versionMatch[1]
          };
        } else {
          sections[currentVersion]._date = date;
        }

        currentSection = null;
        currentSectionContent = [];
        continue;
      }

      // Match section headers: ### Added, ### Fixed, etc.
      const sectionMatch = line.match(/^###\s+(.+)$/);
      if (sectionMatch && currentVersion) {
        // Save previous section
        if (currentSection) {
          sections[currentVersion][currentSection] = currentSectionContent.join('\n').trim();
        }

        currentSection = sectionMatch[1];
        currentSectionContent = [];
        continue;
      }

      // Collect section content
      if (currentVersion && currentSection) {
        if (line.trim()) {
          currentSectionContent.push(line);
        }
      }
    }

    // Save last section
    if (currentVersion && currentSection) {
      sections[currentVersion][currentSection] = currentSectionContent.join('\n').trim();
    }

    // If version specified, return that, otherwise return first
    const targetVersion = version || Object.keys(sections)[0];

    if (!sections[targetVersion]) {
      throw new Error(`Version ${targetVersion} not found in changelog`);
    }

    return normalizeChangelog(targetVersion, sections[targetVersion]);
  } catch (error) {
    console.error(`Error parsing changelog: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Normalize changelog data to structured format
 * @param {string} version - Version number
 * @param {object} versionData - Raw version data
 * @returns {object} Normalized changelog entry
 */
function normalizeChangelog(version, versionData) {
  const result = {
    version: version.replace(/^v/, ''), // Remove 'v' prefix if present
    date: versionData._date || new Date().toISOString().split('T')[0],
    sections: {}
  };

  // Standard section names
  const sectionMap = {
    'added': 'Added',
    'changed': 'Changed',
    'deprecated': 'Deprecated',
    'removed': 'Removed',
    'fixed': 'Fixed',
    'security': 'Security'
  };

  // Process each section
  Object.keys(versionData).forEach(key => {
    if (key.startsWith('_')) return; // Skip metadata

    const normalizedKey = Object.keys(sectionMap).find(
      k => key.toLowerCase().includes(k)
    );

    if (normalizedKey) {
      const content = versionData[key];
      result.sections[sectionMap[normalizedKey]] = parseItems(content);
    }
  });

  return result;
}

/**
 * Parse list items from changelog section
 * @param {string} content - Section content
 * @returns {array} Array of parsed items
 */
function parseItems(content) {
  const items = [];
  const lines = content.split('\n');
  let currentItem = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Match bullet points: -, *, +
    if (/^[-*+]\s+/.test(trimmed)) {
      if (currentItem) items.push(currentItem);

      // Extract item text
      const text = trimmed.replace(/^[-*+]\s+/, '');
      currentItem = {
        text: text,
        raw: trimmed,
        issueLinks: extractIssueLinks(text),
        hasCode: text.includes('`')
      };
    } else if (trimmed && currentItem) {
      // Continuation of previous item
      currentItem.text += ' ' + trimmed;
    }
  }

  if (currentItem) items.push(currentItem);

  return items;
}

/**
 * Extract issue links from item text
 * @param {string} text - Item text
 * @returns {array} Array of issue numbers
 */
function extractIssueLinks(text) {
  const issuePattern = /#(\d+)/g;
  const matches = [];
  let match;

  while ((match = issuePattern.exec(text)) !== null) {
    matches.push(parseInt(match[1]));
  }

  return matches;
}

/**
 * Format changelog output as JSON
 * @param {object} changelog - Parsed changelog
 * @returns {string} JSON string
 */
function formatOutput(changelog) {
  return JSON.stringify(changelog, null, 2);
}

/**
 * Main CLI interface
 */
function main() {
  const args = process.argv.slice(2);
  let changelogPath = 'CHANGELOG.md';
  let version = null;
  let format = 'json';

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' || args[i] === '-f') {
      changelogPath = args[++i];
    } else if (args[i] === '--version' || args[i] === '-v') {
      version = args[++i];
    } else if (args[i] === '--format') {
      format = args[++i];
    } else if (!args[i].startsWith('-')) {
      changelogPath = args[i];
    }
  }

  // Ensure changelog path is absolute
  if (!path.isAbsolute(changelogPath)) {
    changelogPath = path.join(process.cwd(), changelogPath);
  }

  try {
    const changelog = parseChangelog(changelogPath, version);

    if (format === 'json') {
      console.log(formatOutput(changelog));
    } else if (format === 'text') {
      console.log(`Version: ${changelog.version}`);
      console.log(`Date: ${changelog.date}`);
      console.log('');

      Object.entries(changelog.sections).forEach(([section, items]) => {
        console.log(`${section}:`);
        items.forEach(item => {
          console.log(`  - ${item.text}`);
        });
        console.log('');
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Export for use as module
module.exports = {
  parseChangelog,
  normalizeChangelog,
  parseItems,
  extractIssueLinks,
  formatOutput
};

// Run CLI if this is the main module
if (require.main === module) {
  main();
}
