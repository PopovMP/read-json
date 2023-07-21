# Read Json

Reads and parses a JSON file.

No dependencies.

## Supported formats

* Encoding: ANSI, UTF8, UTF16 LE, UTF16 BE
* BOM - supports files with an UTF BOM record

## Usage

```JavaScript
const {readJson} = require("@popovmp/read-json);

const obj = readJson("path/to/file.json");
```
