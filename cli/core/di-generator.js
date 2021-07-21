"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIGenerator = void 0;
var parent_file_finder_1 = require("@utils/parent-file-finder");
var DIGenerator = /** @class */ (function () {
    function DIGenerator() {
    }
    DIGenerator.prototype.execute = function () {
        var startPath = process.cwd();
        var res = parent_file_finder_1.ParentFileFinder.findFile(startPath, "igniter.json");
    };
    // Generate bindings like
    // "kernel.bind<IReviewModule>("IReviewModule").to(BinanceModule).inRequestScope();"
    DIGenerator.prototype.generate = function (jspnData) {
        var template = "kernel.bind<_INTERFACE_>(\"_SERVICE_IDENT_\").to(_CLASS_)._SCOPE_();";
        var fileData = new Array();
    };
    return DIGenerator;
}());
exports.DIGenerator = DIGenerator;
new DIGenerator();
