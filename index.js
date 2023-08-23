"use strict";

const {readFileSync} = require("node:fs");

/**
 * Reads and parses a JSON file.
 * Supported encodings: ASCII, UTF-8, UTF-16-LE
 *
 * @param {string} filePath
 *
 * @returns {*}
 */
function readJson(filePath) {
    /** @type {Buffer} */
    const buf = readFileSync(filePath);
    const b0  = buf.at(0);
    const b1  = buf.at(1);
    const b2  = buf.at(2);

    // UTF-8
    if (b0 === 239 && b1 === 187 && b2 === 191) {
        return JSON.parse(buf.subarray(3).toString("utf8"));
    }

    // UTF-16-LE
    if (b0 === 255 && b1 === 254) {
        return JSON.parse(buf.subarray(2).toString("utf16le"));
    }

    // ASCII, UTF-8 no BOM, UTF-16-LE no BOM
    return JSON.parse(buf.toString(b1 > 0 ? "utf8" : "utf16le"));
}

module.exports = {
    readJson,
};
