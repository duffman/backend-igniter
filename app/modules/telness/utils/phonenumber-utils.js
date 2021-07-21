"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
exports.__esModule = true;
exports.PhonenumberUtils = void 0;
var PhonenumberUtils = /** @class */ (function () {
    function PhonenumberUtils() {
        this.formatNumber("+46708633007");
    }
    /**
     *
     * @param {string} number
     * @returns {string}
     */
    PhonenumberUtils.prototype.formatNumber = function (number) {
        var tmpNumber = number;
        console.log("Format Number :: Start ::", tmpNumber);
        var countryCode = "";
        //
        // Of the number starts with + then extract and
        // remove the country code
        //
        if (tmpNumber.startsWith("+")) {
            console.log("Starts with +");
            tmpNumber = tmpNumber.substr(1);
        }
        console.log("Format Number :: After ::", tmpNumber);
        return tmpNumber;
    };
    return PhonenumberUtils;
}());
exports.PhonenumberUtils = PhonenumberUtils;
new PhonenumberUtils();
