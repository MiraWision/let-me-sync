#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { loadConfig } = require('./utils/load-config');
const { getCommonAndRelativePaths } = require('./utils/get-common-and-relative-paths');
const { cutPath } = require('./utils/cut-path');
const { findFiles } = require('./utils/find-files');
const { copyFile } = require('./utils/copy-file');

const { globalDir, syncRules, ignore } = loadConfig();

const localDirAbs = process.cwd();
const globalDirAbs = path.resolve(globalDir);

const { commonPath, localShortPath, globalShortPath } = getCommonAndRelativePaths(localDirAbs, globalDirAbs);

const sync = async () => {
  console.log(`Starting synchronization from "${globalShortPath}" (global) to "${localShortPath}" (local)...`);

  const syncList = [];

  for (const rule of syncRules) {
    const localPath = path.resolve(localDirAbs, rule.local);
    const globalPath = path.resolve(globalDir, rule.global);
  
    if (!fs.existsSync(globalPath)) {
      console.warn(`Warning: Source file ${cutPath(globalPath, commonPath)} does not exist. Skipping.`);
      continue;
    }

    if (fs.statSync(globalPath).isFile()) {
      syncList.push({ 
        source: globalPath, 
        destination: localPath,
      });
    } else {
      const files = await findFiles(globalPath, ignore);

      files.forEach((file) => {
        syncList.push({ 
          source: path.resolve(globalPath, file),
          destination: path.resolve(localPath, file),
        });
      });
    }
  }

  console.log(`Files to be synchronized: ${syncList.length}`);

  for (const { source, destination } of syncList) {
    copyFile(source, destination);

    console.log(`Synchronized: ${cutPath(source, commonPath)} -> ${cutPath(destination, commonPath)}.`);
  }

  console.log('Synchronization completed.');
}

sync();
