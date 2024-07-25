const copyFile = (source, destination) => {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  
  fs.copyFileSync(source, destination);
};

module.exports.copyFile = copyFile;
