const loadConfig = () => {
  const configPath = path.resolve(process.cwd(), 'lms.config.json');

  if (!fs.existsSync(configPath)) {
    console.error('Configuration file (lms.config.json) not found.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  const { globalDir, syncRules = [], ignore = [] } = config;

  if (!globalDir) {
    console.error('Global directory (globalDir) not specified in the configuration.');
    process.exit(1);
  }

  if (!syncRules.length) {
    console.error('No synchronization rules specified in the configuration.');
    process.exit(1);
  }

  return { globalDir, syncRules, ignore };
};

module.exports.loadConfig = loadConfig;
