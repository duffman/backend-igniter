"use strict";
/*=--------------------------------------------------------------=

 TSPath - Typescript Path Resolver

 Author : Patrik Forsberg
 Email  : patrik.forsberg@coldmind.com
 GitHub : https://github.com/duffman

 I hope this piece of software brings joy into your life, makes
 you sleep better knowing that you are no longer in path hell!

 Use this software free of charge, the only thing I ask is that
 you obey to the terms stated in the license, i would also like
 you to keep the file header intact.

 Also, I would love to see you getting involved in the project!

 Enjoy!

 This software is subject to the LGPL v2 License, please find
 the full license attached in LICENCE.md

 =----------------------------------------------------------------= */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathUtils = void 0;
var path = require("path");
//let path = require("path");
var PathUtils = /** @class */ (function () {
    function PathUtils() {
    }
    /**
     * Cross platform method that verifies that the given path ends
     * with a path delimiter, NOTE that this method does no effort
     * in verifying that your path string is correct.
     * @param searchPath
     * @returns {string}
     */
    PathUtils.ensureTrailingPathDelimiter = function (searchPath) {
        if (PathUtils.isEmpty(searchPath)) {
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
    PathUtils.appendToPath = function (path, part, trailingDelim) {
        if (trailingDelim === void 0) { trailingDelim = true; }
        PathUtils.ensureTrailingPathDelimiter(path);
        path += part;
        if (trailingDelim) {
            PathUtils.ensureTrailingPathDelimiter(path);
        }
    };
    /**
     * Checks for unset input string
     * @param input
     * @returns {boolean}
     */
    PathUtils.isEmpty = function (input) {
        return (input === undefined || input === null || input === '');
    };
    /**
     * Removes the trailing "*" from a string (if any)
     * @param path
     * @returns {string}
     */
    PathUtils.stripWildcard = function (path) {
        if (path.endsWith("/*")) {
            path = path.substr(0, path.length - 2);
        }
        return path;
    };
    /**
     * Replaces double slashes "//" (if any)
     * @param filePath
     */
    PathUtils.replaceDoubleSlashes = function (filePath) {
        filePath = path.normalize(filePath);
    };
    /**
     * Converts EFBBBF (UTF-8 BOM) to FEFF (UTF-16 BOM)
     * @param data
     */
    PathUtils.stripByteOrderMark = function (data) {
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
    PathUtils.fileHavePath = function (filename) {
        return (filename !== path.basename(filename));
    };
    return PathUtils;
}());
exports.PathUtils = PathUtils;
