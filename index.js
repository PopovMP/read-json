"use strict";

const {readFileSync} = require("node:fs");

/**
 * Reads and parses a JSON file.
 * Supported encodings: ASCII, UTF-8, UTF-16-LE
 *
 * @param {string} filePath
 *
 * @return {*}
 */
function readJson(filePath) {
    return JSON.parse(bufferToString(removeBom(readFileSync(filePath))));
}

/**
 * Removes the BOM record from a JSON file.
 *
 * @param {Buffer} buffer
 *
 * @return {Buffer}
 */
function removeBom(buffer) {
    const asciiStart =  32; // The "space" (ASCII  32) - the first printable character
    const asciiEnd   = 126; // The "~"     (ASCII 126) - the last printable character

    let index = 0;
    while (index < 3 && (buffer[index] < asciiStart ||
                         buffer[index] > asciiEnd)) {
        index += 1;
    }

    // The index points to the first ASCII character of the buffer
    return index === 0 ? buffer : buffer.subarray(index);
}

/**
 * Converts a buffer to string.
 *
 * @param {Buffer} buffer
 *
 * @return {string}
 */
function bufferToString(buffer) {
    const encoding = buffer[1] > 0 ? "utf8" : "utf16le";

    return buffer.toString(encoding);
}

module.exports = {
    readJson,
}
