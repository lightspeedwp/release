#!/usr/bin/env node

/**
 * Skill Structure Validation Script
 * Validates that the release skill has all required files and structure
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'README.md',
  'SKILL.md',
  'LICENSE',
  'agents/release-agent.md',
  'skills/github-release/SKILL.md',
  'skills/release-qa/SKILL.md',
  'skills/release-handoff-generator/SKILL.md',
  'prompts/release.prompt.md',
  'prompts/changelog.prompt.md',
];

const requiredDirectories = [
  'agents',
  'skills',
  'skills/github-release',
  'skills/release-qa',
  'skills/release-handoff-generator',
  'prompts',
];

let hasErrors = false;

console.log('🔍 Validating skill structure...\n');

// Check directories
console.log('📁 Checking directories:');
requiredDirectories.forEach((dir) => {
  const dirPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`✅ ${dir}/`);
  } else {
    console.error(`❌ Missing directory: ${dir}/`);
    hasErrors = true;
  }
});

console.log('');

// Check files
console.log('📄 Checking files:');
requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const stats = fs.statSync(filePath);
    const sizeKb = (stats.size / 1024).toFixed(1);
    console.log(`✅ ${file} (${sizeKb} KB)`);
  } else {
    console.error(`❌ Missing file: ${file}`);
    hasErrors = true;
  }
});

console.log('');

// Check file contents for key sections
console.log('📋 Checking content quality:');

const skillMd = path.join(__dirname, '..', 'SKILL.md');
if (fs.existsSync(skillMd)) {
  const content = fs.readFileSync(skillMd, 'utf8');
  const checks = [
    { name: 'Main skill purpose', pattern: /^## Purpose/m },
    { name: 'Supported project types', pattern: /^## Supported Project Types/m },
    { name: 'Pre-release workflow', pattern: /^### Phase 1:/m },
    { name: 'Quality gates', pattern: /Quality Gates/i },
  ];

  checks.forEach((check) => {
    if (check.pattern.test(content)) {
      console.log(`✅ SKILL.md contains "${check.name}"`);
    } else {
      console.error(`❌ SKILL.md missing "${check.name}"`);
      hasErrors = true;
    }
  });
}

console.log('');

// Check agent file
const agentMd = path.join(__dirname, '..', 'agents', 'release-agent.md');
if (fs.existsSync(agentMd)) {
  const content = fs.readFileSync(agentMd, 'utf8');
  const checks = [
    { name: 'Agent responsibilities', pattern: /^## Agent Role & Responsibilities/m },
    { name: 'Prerequisites', pattern: /^### Prerequisites/m },
    { name: 'Release workflow', pattern: /^## Release Workflow/m },
    { name: 'WordPress compliance', pattern: /^## WordPress\.org Compliance/m },
  ];

  checks.forEach((check) => {
    if (check.pattern.test(content)) {
      console.log(`✅ release-agent.md contains "${check.name}"`);
    } else {
      console.error(`❌ release-agent.md missing "${check.name}"`);
      hasErrors = true;
    }
  });
}

console.log('');

if (hasErrors) {
  console.error('❌ Skill structure validation failed');
  process.exit(1);
} else {
  console.log('✅ Skill structure is valid');
  process.exit(0);
}
