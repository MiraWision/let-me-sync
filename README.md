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

### Setting Up

To mark a file for synchronization, add a comment at the top of the file with the following format:

```typescript
// ORIGIN PATH: path/to/file/in/global
```

### Synchronizing Files

#### Sync to Global

Synchronize files from your local project to the global directory:

```bash
lms to /path/to/global
```

or, if you have set the `GLOBAL_DIR` environment variable:

```bash
export GLOBAL_DIR=/path/to/global
lms to
```

#### Sync from Global

Synchronize files from the global directory to your local project:

```bash
lms from /path/to/global
```

or, if you have set the `GLOBAL_DIR` environment variable:

```bash
export GLOBAL_DIR=/path/to/global
lms from
```

## Example

### Directory Structure

```
/my-project
  /src
    /components
      Button.js
  /global
    /components
      Button.js
```

### Button.js

```javascript
// ORIGIN PATH: components/Button.js

const Button = () => {
  return <button>Click me</button>;
};

export default Button;
```

### Running the Sync

```bash
# Sync from local project to global directory
lms to /path/to/global

# Sync from global directory to local project
lms from /path/to/global
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
