"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModule = void 0;
var action_result_1 = require("@core/action-result");
var parent_file_finder_1 = require("@utils/parent-file-finder");
var path_utils_1 = require("@utils/path-utils");
var path = require("path");
var fs = require("fs");
var CreateModule = /** @class */ (function () {
    function CreateModule() {
    }
    CreateModule.prototype.generateKernelDI = function (igniterJsonObj) {
        var result = new action_result_1.ActionResult();
        var di = igniterJsonObj.kernel.imports;
        console.log("DI ::", di);
        return result;
    };
    CreateModule.prototype.createModule = function (name) {
        var result = true;
        console.log("CreateModule ::");
        var startPath = process.cwd();
        var res = parent_file_finder_1.ParentFileFinder.findFile(startPath, "igniter.json");
        if (res.fileFound) {
            var igniterFilename = path.resolve(res.path, res.result);
            var igniterJson = require(igniterFilename);
            var modulesPath = path.resolve(res.path, igniterJson.modules);
            this.generateKernelDI(igniterJson);
            console.log("IGNITER ::", igniterJson);
            console.log("IGNITER Modules ::", igniterJson.modules);
            console.log("IGNITER Module Path ::", modulesPath);
            modulesPath = path_utils_1.PathUtils.ensureTrailingPathDelimiter(modulesPath);
            var modulePath = modulesPath + name;
            fs.mkdirSync(modulePath, { recursive: true });
            var config = this.createConfig(name);
            var moduleJSONFilename = path_utils_1.PathUtils.ensureTrailingPathDelimiter(modulesPath) + "module.json";
            console.log("IGNITER moduleJSONFilename::", moduleJSONFilename);
            fs.writeFileSync(moduleJSONFilename, JSON.stringify(config, null, 4));
        }
        else {
            console.error("'igniter.json' not found");
            result = false;
        }
        console.log("Start Path ::", startPath);
        console.log("Result", res);
        return result;
    };
    CreateModule.prototype.createConfig = function (name) {
        var config = {
            name: name,
            version: 1.2
        };
        return config;
    };
    CreateModule.prototype.execute = function () {
        return Promise.resolve(false);
    };
    return CreateModule;
}());
exports.CreateModule = CreateModule;
