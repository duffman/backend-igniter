/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

const config = require('config');

export class App {
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

new App();
