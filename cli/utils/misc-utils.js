"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscUtils = void 0;
var path = require("path");
var MiscUtils = /** @class */ (function () {
    function MiscUtils() {
    }
    /**
     * Helper method used to safely get the value of an AST node
     * @param node
     * @returns {string}
     */
    MiscUtils.safeGetAstNodeValue = function (node) {
        if (MiscUtils.isEmpty(node) || MiscUtils.isEmpty(node.value)) {
            return "";
        }
        else {
            return node.value;
        }
    };
    /**
     * Cross platform method that verifies that the given path ends
     * with a path delimiter, NOTE that this method does no effort
     * in verifying that your path string is correct.
     * @param searchPath
     * @returns {string}
     */
    MiscUtils.ensureTrailingPathDelimiter = function (searchPath) {
        if (MiscUtils.isEmpty(searchPath)) {
            return;
        }
        var pathSep = path.sep;
        if (searchPath.endsWith(pathSep) == false) {
            searchPath = searchPath + pathSep;
        }
        return searchPath;
    };
    /**
     * Appends given value to a given path
     * @param path
     * @param part
     * @param trailingDelim
     */
    MiscUtils.appendToPath = function (path, part, trailingDelim) {
        if (trailingDelim === void 0) { trailingDelim = true; }
        MiscUtils.ensureTrailingPathDelimiter(path);
        path += part;
        if (trailingDelim) {
            MiscUtils.ensureTrailingPathDelimiter(path);
        }
    };
    /**
     * Checks for unset input string
     * @param input
     * @returns {boolean}
     */
    MiscUtils.isEmpty = function (input) {
        return (input === undefined || input === null || input === '');
    };
    /**
     * Removes the trailing "*" from a string (if any)
     * @param path
     * @returns {string}
     */
    MiscUtils.stripWildcard = function (path) {
        if (path.endsWith("/*")) {
            path = path.substr(0, path.length - 2);
        }
        return path;
    };
    /**
     * Replaces double slashes "//" (if any)
     * @param filePath
     */
    MiscUtils.replaceDoubleSlashes = function (filePath) {
        filePath = path.normalize(filePath);
    };
    /**
     * Converts EFBBBF (UTF-8 BOM) to FEFF (UTF-16 BOM)
     * @param data
     */
    MiscUtils.stripByteOrderMark = function (data) {
        if (data.charCodeAt(0) === 0xFEFF) {
            data = data.slice(1);
        }
        return data;
    };
    /**
     * Checks if a given filename contains a search path
     * @param filename
     * @returns {boolean}
     */
    MiscUtils.fileHavePath = function (filename) {
        return (filename !== path.basename(filename));
    };
    return MiscUtils;
}());
exports.MiscUtils = MiscUtils;
