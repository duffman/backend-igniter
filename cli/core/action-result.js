"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionResult = void 0;
var ActionResult = /** @class */ (function () {
    function ActionResult(success, data, error) {
        if (success === void 0) { success = true; }
        this.success = success;
        this.data = data;
        this.error = error;
    }
    return ActionResult;
}());
exports.ActionResult = ActionResult;
