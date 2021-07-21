/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Database } from "sqlite3";

const sqlite3 = require('sqlite3').verbose();
const dbName = "telness.db";

export class TelnessDao {
	db: Database; /// any; // = new sqlite3.Database(':memory:');

	constructor() {}

	public open() {
		this.db = new sqlite3.Database(':memory:', (err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Connected to the in-memory SQlite database.');
		});
	}

	public close() {
		// close the database connection
		this.db.close((err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Close the database connection.');
		});
	}

}
