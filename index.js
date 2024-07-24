#!/usr/bin/env node

const { spawn } = require('child_process');

const [,, command, ...args] = process.argv;

switch (command) {
  case 'from':
    spawn('node', [require.resolve('./scripts/from.js'), ...args], { stdio: 'inherit' });
    break;
  case 'to':
    spawn('node', [require.resolve('./scripts/to.js'), ...args], { stdio: 'inherit' });
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error('Usage: lms <to|from> <globalDir> or set the GLOBAL_DIR environment variable');
    process.exit(1);
}
