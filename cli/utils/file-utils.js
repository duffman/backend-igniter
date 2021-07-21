"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
var action_result_1 = require("@core/action-result");
var fs = require("fs");
var FileUtils = /** @class */ (function () {
    function FileUtils() {
    }
    /**
     * Read a file
     * @param {string} filename
     * @returns {ActionResult}
     */
    FileUtils.readFile = function (filename) {
        var result = new action_result_1.ActionResult();
        try {
            result.data = fs.readFileSync(filename, 'utf8');
        }
        catch (err) {
            result.error = err;
        }
        return result;
    };
    /**
     * Create new empty file
     * @param {string} filename
     * @returns {ActionResult}
     */
    FileUtils.touchFile = function (filename) {
        return new action_result_1.ActionResult();
    };
    return FileUtils;
}());
exports.FileUtils = FileUtils;
