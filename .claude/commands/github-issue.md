---
description: Read GitHub issue and implement the required functionality
argument-hint: issue-number
---

# Read GitHub Issue and Implement

Read GitHub issue #$ARGUMENTS from the clothing-shop-frontend repository and automatically implement the required functionality.

## Step 1: Fetch Issue Details
First, read the issue content:
```bash
node read-issue.js $ARGUMENTS
```

## Step 2: Analyze Requirements
Based on the issue content, identify:
- What type of feature/fix is requested
- Technical requirements
- Design specifications (if any)
- Acceptance criteria

## Step 3: Create Implementation Plan
Create a detailed plan in plan.md with:
- Summary of the issue
- Implementation steps
- File structure changes
- Technical approach

## Step 4: Implement Solution
Start implementing the solution step by step:
1. Create necessary files and folders
2. Write the code following the project's conventions
3. Add TypeScript types where applicable
4. Follow existing patterns in the codebase

## Step 5: Verify Implementation
After implementation:
1. Run linting: `npm run lint:fix`
2. Check for TypeScript errors
3. Test the functionality
4. Ensure code follows project standards

## Important Notes
- Always use TodoWrite to track progress
- Follow existing code patterns and conventions
- Ask for clarification if requirements are unclear
- Commit changes only when explicitly requested