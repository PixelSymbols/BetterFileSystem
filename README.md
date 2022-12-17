
# easier-fs

A library that wraps the default node.js file system, making file operations easier.

## Functions

### read

This function allows you to read a file of a specific file type (txt or json).

### write

This function allows you to write to a file of a specific file type (txt or json). There are also options for appending data to a txt file or merging data with an existing json file.

## Examples
Here are some examples of how to use these functions with the ES6 import syntax
### basic usage:
```js
import efs from 'easier-fs'
// Read a txt file
const txtFile = new efs({ name: 'my-file.txt'})
.read(); // Reads the contents of 'my-file.txt' as a string

// Read a json file
const jsonFile = new efs({ name: 'my-file.json'})
.read(); // Reads the contents of 'my-file.json' as a JSON object

// Write to a txt file
const txtFile = new efs({ name: 'my-file.txt'})
.write({ data: 'Hello, World!' }); // Overwrites 'my-file.txt' with the string 'Hello, World!'

// Append data to a txt file
const txtFile = new efs({ name: 'my-file.txt'})
.write({ mode: 'append', data: 'Hello, World!' }); // Appends the string 'Hello, World!' to the end of 'my-file.txt'

// Write to a json file
const jsonFile = new efs({ name: 'my-file.json'})
.write({ data: { message: 'Hello, World!' } }); // Overwrites 'my-file.json' with the JSON object { message: 'Hello, World!' }

// Merge data with an existing json file
const jsonFile = new efs({ name: 'my-file.json'})
.write({ mode: 'merge', data: { message: 'Hello, World!' } }); // Merges the existing data in 'my-file.json' with the JSON object { message: 'Hello, World!' }

```
## Filename without filetype
if you pass filename , that does not have a filetype , you can specify it as the second argument:
```js
const txtFile = new efs({ name: 'my-file', fileType: 'txt' })
```
## Chaining
You can make use a chain when you use `write`:
```js
const txtFile = new efs({ name: 'my-file.txt' })
.write({data:"Test 1"})
.write({mode: 'append', data:"Test 2"})
```
## mode
you can specify mode in the beginning, and it will be applied to all next actions:
```js
const txtFile = new efs({ name: 'my-file.txt',mode: 'append' })
.write({data:"Test 1"})
.write({data:"Test 2"})
.write({data:"Test 3"})
.read(); //will return "Test 1Test 2Test 3"
```
or for a single time
```js
const txtFile = new efs({ name: 'my-file.txt'})
.write({data:"Test 1"})
.write({data:"Test 2"})
.write({data:"Test 3",mode: 'append'})
.read();//will return Test 2Test 3
```
## filename
You can change the file you are working on at any function, but for a single time
```js
const txtFile = new efs({ name: 'file1.txt',mode: 'append' })
.write({data:"Test 1"})//saves to file1.txt
.write({name:'file2.txt',data:"Test 2"})//saves to file2.txt
.read();//will return Test 1 from file1.txt
```
```js
const txtFile = new efs({ name: 'file1.txt',mode: 'append' })
.write({data:"Test 1"})//saves to file1.txt
.write({name:'file2.txt',data:"Test 2"})//saves to file2.txt
.read({name:'file2.txt'});//will return Test 2 from file2.txt
```
## additional
you can provide additional arguments for `append` mode:
```js
const txtFile = new efs({ name: 'file1.txt',mode: 'append',args=[false] })
.write({data:"Test 1"})
```
true - data will append to the end of the file
false - data will append to the beginning of the file, before file data