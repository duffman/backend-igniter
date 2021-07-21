"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const config = require('config');
class App {
    constructor() {
        this.initConfig();
    }
    initConfig() {
        const dbConfig = config.get('Customer.dbConfig');
        console.log("dbConfig ::", dbConfig);
        if (config.has('optionalFeature.detail')) {
            const detail = config.get('optionalFeature.detail');
        }
    }
}
exports.App = App;
new App();
