/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ActionResult } from "@core/action-result";
import * as fs          from "fs";

export class FileUtils {
	constructor() {}

	/**
	 * Read a file
	 * @param {string} filename
	 * @returns {ActionResult}
	 */
	public static readFile(filename: string): ActionResult {
		let result = new ActionResult();

		try {
			result.data = fs.readFileSync(filename, 'utf8')
		} catch (err) {
			result.error = err;
		}

		return result;
	}

	/**
	 * Create new empty file
	 * @param {string} filename
	 * @returns {ActionResult}
	 */
	public static touchFile(filename: string): ActionResult {
		return new ActionResult();
	}
}
