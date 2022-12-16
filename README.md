
# easier-fs

A library that wraps the default node.js file system, making file operations easier.

## Functions

### read

This function allows you to read a file of a specific file type (txt or json). By default, it will use the `readFileAsText` function for txt files and the `readJson` function for json files.

### write

This function allows you to write to a file of a specific file type (txt or json). By default, it will use the `writeFileAsText` function for txt files and the `writeJson` function for json files. There are also options for appending data to a txt file or merging data with an existing json file.

## Examples

Here are some examples of how to use these functions with the ES6 import syntax:
```js
import efs from 'easier-fs'
// Read a txt file
const txtFile = new efs({ name: 'my-file.txt', fileType: 'txt' })
.read(); // Reads the contents of 'my-file.txt' as a string

// Read a json file
const jsonFile = new efs({ name: 'my-file.json', fileType: 'json' })
.read(); // Reads the contents of 'my-file.json' as a JSON object

// Write to a txt file
const txtFile = new efs({ name: 'my-file.txt', fileType: 'txt' })
.write({ data: 'Hello, World!' }); // Overwrites 'my-file.txt' with the string 'Hello, World!'

// Append data to a txt file
const txtFile = new efs({ name: 'my-file.txt', fileType: 'txt' })
.write({ mode: 'append', data: 'Hello, World!' }); // Appends the string 'Hello, World!' to the end of 'my-file.txt'

// Write to a json file
const jsonFile = new efs({ name: 'my-file.json', fileType: 'json' })
.write({ data: { message: 'Hello, World!' } }); // Overwrites 'my-file.json' with the JSON object { message: 'Hello, World!' }

// Merge data with an existing json file
const jsonFile = new efs({ name: 'my-file.json', fileType: 'json' })
.write({ mode: 'merge', data: { message: 'Hello, World!' } }); // Merges the existing data in 'my-file.json' with the JSON object { message: 'Hello, World!' }

```
