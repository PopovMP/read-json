"use strict";

const {readFileSync}        = require("fs");
const {equal}               = require("assert");
const {describe, it, after} = require("node:test");

const { readJson } = require("../index");

const encodings = ["ansi", "ut8", "utf8-bom", "utf16-be-bom", "utf16-le-bom"];

describe("Read JSON file", () => {
    const output = [];

    for (const encoding of encodings) {
        it(encoding, () => {
            const filename = `./test/foo.${encoding}.json`;

            /** @type {{foo: number}} */
            const json = readJson(filename);

            equal(json.foo, 42);

            // Log details
            output.push({
                encoding,
                data: readFileSync(filename)
                    .map((byte) => byte === 0 ? 32 : byte > 127 || byte < 32 ? 63 : byte)
                    .toString(),
                text: JSON.stringify(json),
            });
        })
    }

    after(() => {
        // Print output
        const encMaxLen  = output.reduce((res, item) => item.encoding.length > res ? item.encoding.length : res, 0);
        const dataMaxLen = output.reduce((res, item) => item.data.length > res ? item.data.length : res, 0);
        for (const rec of output) {
            const enc  = rec.encoding.padEnd(encMaxLen);
            const data = rec.data.padEnd(dataMaxLen);
            console.log(`Encoding: ${enc}, data: ${data}, json: ${rec.text}`);
        }
    })
})
