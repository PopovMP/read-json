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

## Example

Reading `{"foo": 42}` from various encodings:

```
Encoding: ansi        , data: {"foo": 42}             , json: {"foo":42}
Encoding: ut8         , data: {"foo": 42}             , json: {"foo":42}
Encoding: utf8-bom    , data: ???{"foo": 42}          , json: {"foo":42}
Encoding: utf16-be-bom, data: ?? { " f o o " :   4 2 }, json: {"foo":42}
Encoding: utf16-le-bom, data: ??{ " f o o " :   4 2 } , json: {"foo":42}
```
