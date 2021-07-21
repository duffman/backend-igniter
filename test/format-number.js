"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatNumber = void 0;
class FormatNumber {
    constructor() {
        this.formatNumber("+46708633007");
    }
    /**
     *
     * @param {string} number
     * @returns {string}
     */
    formatNumber(number) {
        let tmpNumber = number;
        console.log("Format Number :: Start ::", tmpNumber);
        let countryCode = "";
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
    }
}
exports.FormatNumber = FormatNumber;
new FormatNumber();
