/**
 * Script to help log code changes
 * 
 * Usage: node log-changes.js
 * 
 * This script:
 * 1. Gets a list of changed files since the last commit
 * 2. Prompts the developer for information about each change
 * 3. Generates entries for the daily log and code change log
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get the current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Get the list of changed files
function getChangedFiles() {
  try {
    const output = execSync('git status --porcelain').toString();
    const changedFiles = output
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const status = line.substring(0, 2).trim();
        const filePath = line.substring(3).trim();
        return { status, filePath };
      });
    return changedFiles;
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    return [];
  }
}

// Prompt for information about each changed file
async function promptForChanges(changedFiles) {
  const changes = [];
  
  for (const file of changedFiles) {
    console.log(`\nFile: ${file.filePath} (${file.status})`);
    
    const description = await new Promise(resolve => {
      rl.question('Description of changes: ', answer => resolve(answer));
    });
    
    const reason = await new Promise(resolve => {
      rl.question('Reason for changes: ', answer => resolve(answer));
    });
    
    changes.push({
      file: file.filePath,
      description,
      reason
    });
  }
  
  return changes;
}

// Prompt for task information
async function promptForTaskInfo() {
  const taskId = await new Promise(resolve => {
    rl.question('Task ID (e.g., FE-001): ', answer => resolve(answer));
  });
  
  const taskDescription = await new Promise(resolve => {
    rl.question('Task description: ', answer => resolve(answer));
  });
  
  const taskStatus = await new Promise(resolve => {
    rl.question('Task status (In Progress, Completed, etc.): ', answer => resolve(answer));
  });
  
  const taskProgress = await new Promise(resolve => {
    rl.question('Task progress (0-100%): ', answer => resolve(answer));
  });
  
  return {
    taskId,
    taskDescription,
    taskStatus,
    taskProgress
  };
}

// Generate daily log entry
function generateDailyLogEntry(changes, taskInfo) {
  const developerName = execSync('git config user.name').toString().trim();
  
  let entry = `## ${today}\n\n`;
  entry += `### Developer: ${developerName}\n\n`;
  
  entry += `### 📝 Summary\nWorked on ${taskInfo.taskDescription}.\n\n`;
  
  entry += `### 🔄 Code Changes\n`;
  entry += `| File | Changes | Reason |\n`;
  entry += `|------|---------|--------|\n`;
  
  for (const change of changes) {
    entry += `| \`${change.file}\` | ${change.description} | ${change.reason} |\n`;
  }
  
  entry += `\n### 🏗️ Tasks Worked On\n`;
  entry += `| Task ID | Description | Status | Progress |\n`;
  entry += `|---------|-------------|--------|----------|\n`;
  entry += `| ${taskInfo.taskId} | ${taskInfo.taskDescription} | ${taskInfo.taskStatus} | ${taskInfo.taskProgress} |\n`;
  
  entry += `\n### 🔜 Next Steps\n`;
  entry += `- Continue working on ${taskInfo.taskId}\n`;
  
  return entry;
}

// Generate code change log entry
function generateCodeChangeLogEntry(changes, taskInfo) {
  const developerName = execSync('git config user.name').toString().trim();
  
  let entry = `### [${today}] - ${taskInfo.taskDescription}\n\n`;
  entry += `**Developer**: ${developerName}\n\n`;
  entry += `**Related Task(s)**: ${taskInfo.taskId}\n\n`;
  entry += `**Pull Request**: [PR #]\n\n`;
  
  entry += `**Changes**:\n`;
  entry += `| File | Changes | Reason |\n`;
  entry += `|------|---------|--------|\n`;
  
  for (const change of changes) {
    entry += `| \`${change.file}\` | ${change.description} | ${change.reason} |\n`;
  }
  
  entry += `\n**Description**:\n`;
  entry += `Worked on ${taskInfo.taskDescription}. Current progress: ${taskInfo.taskProgress}.\n\n`;
  
  entry += `**Testing**:\n`;
  entry += `[Testing details to be added]\n\n`;
  
  entry += `---\n\n`;
  
  return entry;
}

// Update the daily log
function updateDailyLog(entry) {
  const dailyLogPath = path.join(__dirname, '..', 'handyman-v2', 'Envato-template-files', 'WorkDirectory', 'HandymanServices', 'daily-log.md');
  
  try {
    let content = fs.readFileSync(dailyLogPath, 'utf8');
    
    // Check if today's entry already exists
    if (content.includes(`## ${today}`)) {
      console.log('Today\'s entry already exists in the daily log. Appending to it...');
      // Find the position to insert the new content
      const todayEntryIndex = content.indexOf(`## ${today}`);
      const nextEntryIndex = content.indexOf('## ', todayEntryIndex + 1);
      
      if (nextEntryIndex !== -1) {
        // Insert before the next entry
        content = content.substring(0, nextEntryIndex) + entry + '\n' + content.substring(nextEntryIndex);
      } else {
        // Append to the end
        content += '\n' + entry;
      }
    } else {
      // Add new entry at the beginning
      content = entry + '\n\n' + content;
    }
    
    fs.writeFileSync(dailyLogPath, content);
    console.log('Daily log updated successfully!');
  } catch (error) {
    console.error('Error updating daily log:', error.message);
  }
}

// Update the code change log
function updateCodeChangeLog(entry) {
  const codeChangeLogPath = path.join(__dirname, '..', 'documentation', 'code-change-log.md');
  
  try {
    let content = fs.readFileSync(codeChangeLogPath, 'utf8');
    
    // Find the position to insert the new entry
    const changeLogEntriesIndex = content.indexOf('## Change Log Entries');
    const insertPosition = content.indexOf('\n', changeLogEntriesIndex) + 1;
    
    // Insert the new entry
    content = content.substring(0, insertPosition) + entry + content.substring(insertPosition);
    
    fs.writeFileSync(codeChangeLogPath, content);
    console.log('Code change log updated successfully!');
  } catch (error) {
    console.error('Error updating code change log:', error.message);
  }
}

// Main function
async function main() {
  console.log('=== Code Change Logger ===');
  console.log('This script will help you log your code changes.\n');
  
  const changedFiles = getChangedFiles();
  
  if (changedFiles.length === 0) {
    console.log('No changed files detected. Make some changes first!');
    rl.close();
    return;
  }
  
  console.log(`Found ${changedFiles.length} changed files:`);
  changedFiles.forEach(file => console.log(`- ${file.filePath} (${file.status})`));
  
  const changes = await promptForChanges(changedFiles);
  const taskInfo = await promptForTaskInfo();
  
  const dailyLogEntry = generateDailyLogEntry(changes, taskInfo);
  const codeChangeLogEntry = generateCodeChangeLogEntry(changes, taskInfo);
  
  console.log('\nGenerated Daily Log Entry:');
  console.log('------------------------');
  console.log(dailyLogEntry);
  
  console.log('\nGenerated Code Change Log Entry:');
  console.log('------------------------------');
  console.log(codeChangeLogEntry);
  
  const updateLogs = await new Promise(resolve => {
    rl.question('\nDo you want to update the logs with these entries? (y/n): ', answer => resolve(answer.toLowerCase() === 'y'));
  });
  
  if (updateLogs) {
    updateDailyLog(dailyLogEntry);
    updateCodeChangeLog(codeChangeLogEntry);
    console.log('Logs updated successfully!');
  } else {
    console.log('Logs were not updated.');
  }
  
  rl.close();
}

main();
