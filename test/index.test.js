const {readFileSync} = require("fs");
const {equal}        = require("assert");
const {describe, it} = require("node:test");

const { readJson } = require("../index");

const encodings = ["ansi", "ut8", "utf8-bom", "utf16-be-bom", "utf16-le-bom"];

describe("Read JSON file", () => {
    for (const encoding of encodings) {
        it(encoding, () => {
            const filename = `./test/foo.${encoding}.json`;
            const json     = readJson(filename);
            
            equal(json.foo, 42);
            
            // log
            const fileContent = readFileSync(filename);
            console.log(`ok => Encoding: ${encoding.padEnd(12, " ")}, data: ${fileContent}`);
        })
    }
})
