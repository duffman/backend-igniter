/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { SqlIgniter } from "@database/sql-igniter";
import { Global }     from "@app/global.settings";

import dbName = Global.Settings.SQLDatabase_Test.dbName;

const sqlite3 = require("sqlite3").verbose();;

export class CreateDb {
	constructor() {}

	public execute() {
		let query = new SqlIgniter();
		let db = new sqlite3.Database(`./${dbName}`, (err) => {
			if (err) {
				console.log('Error when creating the database', err)
			} else {
				console.log('Database created!');
			}
		});
	}

	createTables(): void {
		let sql = `CREATE TABLE IF NOT EXISTS ${dbName} (
			id INTEGER AUTOINCREMENT PRIMARY KEY,
			msisdn TEXT
			activate_at TEXT
			expires_at TEXT
			reserved_at TEXT
			type TEXT
			status TEXT
			grade TEXT
		)`;
	}
}
