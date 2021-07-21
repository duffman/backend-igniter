/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-05-28
 */

import { injectable }    from "inversify";
import { IActionResult } from "@models/action-result";
import { ActionResult }  from "@models/action-result";

export interface ILogService {
	clear(): Promise<IActionResult>
}

@injectable()
export class LogService implements ILogService {
	tableName: string = "log";

	constructor() {}

	public clear(): Promise<IActionResult> {
		return new Promise((resolve, reject) => {
			resolve(new ActionResult());
		});
	}
}
