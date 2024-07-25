# @mirawision/let-me-sync (lms)

`@mirawision/let-me-sync` is a tool to synchronize shared files between multiple projects. It allows you to keep specific files in sync with a global directory, making it easy to manage shared code and resources across different parts of your project.

## Installation

Install `@mirawision/let-me-sync` globally:

```bash
npm install -g @mirawision/let-me-sync
```

Or, install it as a dev dependency in your project:

```bash
npm install --save-dev @mirawision/let-me-sync
```

## Usage

### Set Up Configuration File

Create a configuration file named `lms.config.json` in the root of your project to customize the behavior of the synchronization tool.

#### Configuration Options

- `globalDir`: The global directory for synchronization.
- `syncRules`: An array of rules defining what should be synchronized and how.
  - `local`: The local path of the file or directory.
  - `global`: The global path where the file or directory should be synchronized.
- `ignore`: An array of glob patterns to exclude files or directories from synchronization.

### Synchronizing Files

These scripts can be run manually or attach to certain event like deploys or 

#### Sync to Global

Synchronize files from your local project to the global directory:

```bash
lms to
```

#### Sync from Global

Synchronize files from the global directory to your local project:

```bash
lms from
```

## Usage Example

### Initial Directory Structure

```
/global
  /api
    users.ts
  /components
    avatar.tsx
  /assets
    logo.png
/web
  lms.config.json
  package.json
```

#### Configuration File

```json
{
  "globalDir": "../global",
  "syncRules": [
    {
      "global": "api",
      "local": "src/api"
    },
    {
      "global": "components",
      "local": "src/components/common",
    },
    {
      "global": "assets/logo.png",
      "local": "assets/logo/default_logo.png"
    }
  ],
  "ignore": ["node_modules/**", "dist/**"]
}
```

### Running the Sync

Sync from global directory to local project

```bash
lms from
```

### Directory Structure After Sync

```
/global
  /api
    users.ts
  /components
    avatar.tsx
  /assets
    logo.png
/web
  /assets
    /logo
      default_logo.png
  /src
    /api
      users.ts
    /components
      /common
        avatar.tsx
  lms.config.json
  package.json
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
