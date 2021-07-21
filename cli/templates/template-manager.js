"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateManager = void 0;
var file_utils_1 = require("@utils/file-utils");
var cli_logger_1 = require("../../core/terminal/cli.logger");
var template_1 = require("./template");
var TemplateManager = /** @class */ (function () {
    function TemplateManager() {
    }
    TemplateManager.prototype.generateTemplate = function (srcFilename) {
        var result = new template_1.Template();
        var fileResult = file_utils_1.FileUtils.readFile(srcFilename);
        if (fileResult.success) {
            result.src = srcFilename;
            result.data = fileResult.data;
        }
        else {
            cli_logger_1.Logger.logError("");
        }
        return result;
    };
    return TemplateManager;
}());
exports.TemplateManager = TemplateManager;
