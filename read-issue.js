#!/usr/bin/env node
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function readIssue(issueNumber) {
  try {
    const { data } = await octokit.issues.get({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      issue_number: issueNumber,
    });

    console.log(`\n=== Issue #${data.number}: ${data.title} ===`);
    console.log(`State: ${data.state}`);
    console.log(`Labels: ${data.labels.map((l) => l.name).join(', ')}`);
    console.log(`\n--- Description ---`);
    console.log(data.body || 'No description provided');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

const issueNumber = parseInt(process.argv[2]);

if (!issueNumber) {
  console.log('Usage: node read-issue.js <issue-number>');
  process.exit(1);
}

readIssue(issueNumber);
