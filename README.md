# Read Json

Reads and parses a JSON file.

No dependencies.

## Supported formats

* Encoding: ANSI, UTF8, UTF16 LE
* BOM - supports files with a UTF BOM record

## Usage

```JavaScript
const {readJson} = require("@popovmp/read-json);

const obj = readJson("path/to/file.json");
```

## Examples

Reading `{"foo": 42}` from various encodings:

```
Encoding: ansi        , data: {"foo": 42}            , json: {"foo":42}
Encoding: utf8        , data: {"foo": 42}            , json: {"foo":42}
Encoding: utf8-bom    , data: ???{"foo": 42}         , json: {"foo":42}
Encoding: utf16-le-bom, data: ??{ " f o o " :   4 2 }, json: {"foo":42}
```

Reading `{"hello":"Свят"}` from various encodings:

```
Encoding: utf8        , data: {"hello": "????????"}               , json: {"hello":"Свят"}
Encoding: utf16-le-bom, data: ??{ " h e l l o " :   " !?2?O?B?" } , json: {"hello":"Свят"}
```
