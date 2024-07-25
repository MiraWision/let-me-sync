const { glob } = require('glob');

const { cutPath } = require('./cut-path');

const findFiles = async (localDir, ignore) => {
  const files = await glob(`${localDir}/**/*`, { ignore });

  return files.map((file) => cutPath(file, localDir));
};

module.exports.findFiles = findFiles;
