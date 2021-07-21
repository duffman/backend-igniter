"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var Template = /** @class */ (function () {
    function Template(success, src, data, className) {
        if (success === void 0) { success = true; }
        if (src === void 0) { src = ''; }
        if (data === void 0) { data = ''; }
        this.success = success;
        this.src = src;
        this.data = data;
        this.className = className;
    }
    return Template;
}());
exports.Template = Template;
