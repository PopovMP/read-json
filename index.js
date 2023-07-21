"use strict";

const {readFileSync} = require("fs");

/**
 * Reads and parses a JSON file.
 * Supported encodings: ANSI, UTF-8, UTF-16-BE, UTF-16-LE
 *
 * @param {string} filePath
 *
 * @return {*}
 */
function readJson(filePath) {
    return JSON.parse(bufferToAnsiString(removeBom(readFileSync(filePath))));
}

/**
 * Removes the BOM record from a JSON file.
 *
 * @param {Buffer} buffer
 *
 * @return {Buffer}
 */
function removeBom(buffer) {
    const asciiStart =  32; // The "space" (ascii 32) is the first printable character
    const asciiEnd   = 127; // The last printable character

    let index = 0;
    while (index < 3 && (buffer[index] < asciiStart ||
                         buffer[index] > asciiEnd)) {
        index += 1;
    }

    // The index points to the first ASCII character of the buffer
    return index === 0 ? buffer : buffer.subarray(index);
}

/**
 * Converts a buffer to an ASCII string.
 *
 * @param {Buffer} buffer
 *
 * @return {string}
 */
function bufferToAnsiString(buffer) {
    if (buffer[0] > 0 && buffer[1] > 0) {
        return buffer.toString(); // ANSI and UTF-8
    }

    // Removes the 0 bytes.
    return buffer.filter((val) => val > 0).toString(); // UTF-16 LE or BE
}

module.exports = {
    readJson,
}
