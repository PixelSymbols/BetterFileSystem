
# easier-fs

A library that wraps the default node.js file system, making file operations easier.
## Advantages

Some advantages of using easier-fs over the native `fs` module include:

-   **Easier file manipulation**: easier-fs provides methods for reading and writing to files as text or JSON, as well as for appending data to a file or merging data with an existing JSON file. These methods abstract away much of the complexity of working with the `fs` module and make it easier to perform common file manipulation tasks.
    
-   **Improved error handling**: easier-fs provides more informative error messages than the `fs` module in cases where a file does not exist or cannot be accessed. This can make it easier to identify and fix issues when working with files.
    
-   **Consistent API**: easier-fs provides a consistent API for working with different file types, making it easier to switch between file types without having to learn new method names or syntax.
    
-   **Customizability**: easier-fs allows users to customize the library's behavior through the `config` parameter in the constructor. This can be used to add support for additional file types or to override the default behavior of certain methods. (WILL BE ADDED LATER)
    

## Usage
To use easier-fs, import the library and create a new instance of the `easier-fs` class, passing in the name of the file you want to work with and any additional configuration options.
```js
import efs from 'easier-fs';

const fileSystem = new efs({ name: 'example.txt' });
```
You can then use the provided methods to read from or write to the file. For example, to read the contents of a file as text:
```js
const fileContents = fileSystem.read();
```
Or to write some data:
```js
fileSystem.write({ data: "Hello World" });
```
For a full list of available methods and their usage, see the documentation below.
# Documentation
## Constructor

#### `new efs({ name, mode='default', fileType, args=[], config })`

Creates a new instance of easier-fs.

##### Parameters

-   `name` (string): The name of the file to work with.
-   `mode` (string, optional): The mode in which to open the file. Possible values are `'default'`, `'read'`, and `'write'`. Default is `'default'`.
-   `fileType` (string, optional): The type of the file. Possible values are `'txt'` and `'json'`. Default is `'txt'`.
-   `args` (array, optional): An array of arguments to pass to the chosen file action.
-   `config` (object, optional): An object containing custom configuration options for the library.

##### Returns
A new instance of easier-fs.
## write
#### `write({ name, data = '', fileType=this.fileConfig.type, mode ,args}={})`

Writes data to the file.

##### Parameters
-   `name` (string): You can change file that you are working on (only for a single time)
-   `data` (string or object): The data to write to the file.
-   `fileType` (string, optional): The file type to use for writing. If not provided, the `fileType` property of the `fileConfig` object or from the filename ("name.**txt**") itself will be used.
-   `mode` (string, optional): The action to perform when writing to the file. Possible values are `'default'` and `'merge'` (for JSON files only) and `'default'` and `'append'` (for txt files only) . Default is `'default'`.
- `args` (array, optional): An array of arguments to pass to the chosen file action (for example works only with `append` to choose way).

##### Returns
The current instance of easier-fs.
## read
#### `read({ name, fileType=this.fileConfig.type }={})`

read data from the file.

##### Parameters
-   `name` (string): You can change file that you are working on (only for a single time)
-   `data` (string or object): The data to write to the file.
-   `fileType` (string, optional): The file type to use for writing. If not provided, the `fileType` property of the `fileConfig` object or from the filename ("name.**txt**") itself will be used.

##### Returns
The current instance of easier-fs.
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
# Advanced usage:
## Filename without filetype
if you pass filename , that does not have a filetype , you can specify it as the second argument:
```js
const txtFile = new efs({ name: 'my-file', fileType: 'txt' })
```
## Chaining
You can make use a chain when you use `write` or other methods that does not return value (example: you cannot use it with `read`, because it returns file data):
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
