const getCommonAndRelativePaths = (localPath, globalPath) => {
  const splitLocalPath = localPath.split(path.sep);

  const splitGlobalPath = globalPath.split(path.sep);

  let commonLength = 0;

  while (commonLength < splitLocalPath.length && commonLength < splitGlobalPath.length && splitLocalPath[commonLength] === splitGlobalPath[commonLength]) {
    commonLength++;
  }

  const localShortPath = splitLocalPath.slice(commonLength).join(path.sep);

  const globalShortPath = splitGlobalPath.slice(commonLength).join(path.sep);

  return { localShortPath, globalShortPath, commonPath: splitLocalPath.slice(0, commonLength).join(path.sep) };
};

module.exports.getCommonAndRelativePaths = getCommonAndRelativePaths;
