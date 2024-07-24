#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const [,, globalDirArg] = process.argv;
const localDir = process.cwd();
const globalDir = globalDirArg || process.env.GLOBAL_DIR;

if (!globalDir) {
  console.error('Usage: lms from <globalDir> or set the GLOBAL_DIR environment variable');
  process.exit(1);
}

const findCommand = `find ${localDir} -path "${localDir}/node_modules" -prune -o -type f -print`;

exec(findCommand, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error finding files: ${stderr}`);
    return;
  }

  stdout.split('\n').forEach((file) => {
    if (file) {
      const content = fs.readFileSync(file, 'utf8').split('\n');

      const originPathMatch = content[0].match(/ORIGIN PATH: (.*)/);

      if (originPathMatch) {
        const globalPath = path.join(globalDir, originPathMatch[1]);
      
        if (fs.existsSync(globalPath)) {
          fs.mkdirSync(path.dirname(file), { recursive: true });

          fs.copyFileSync(globalPath, file);
          
          console.log(`Copied ${globalPath} to ${file}`);
        } else {
          console.error(`Global file not found: ${globalPath}`);
        }
      }
    }
  });
});
