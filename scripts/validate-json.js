#!/usr/bin/env node

/**
 * JSON Validation Script
 * Validates all JSON files in the project for syntax errors
 */

const fs = require('fs');
const path = require('path');

const jsonFiles = [
  '.markdownlint.json',
  'package.json',
];

let hasErrors = false;

console.log('🔍 Validating JSON files...\n');

jsonFiles.forEach((file) => {
  const filePath = path.join(__dirname, '..', file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log(`✅ ${file}`);
  } catch (error) {
    console.error(`❌ ${file}`);
    console.error(`   Error: ${error.message}`);
    hasErrors = true;
  }
});

console.log('');

if (hasErrors) {
  console.error('❌ JSON validation failed');
  process.exit(1);
} else {
  console.log('✅ All JSON files are valid');
  process.exit(0);
}
