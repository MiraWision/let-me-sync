const cutPath = (path, commonPath) => {
  return path.slice(commonPath.length + 1);
};

module.exports.cutPath = cutPath;
