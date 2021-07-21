/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Logger }   from "@cli/cli.logger";
import { Response } from "express";

export class RespWrap {
	private dataSent: boolean = false;

	constructor(private resp: Response, private id: string = "<NONAME>") {}

	public send(data: any): boolean {
		let result = false;

		if (!this.dataSent) {
			const sendJson = typeof data !== "string";

			if (typeof data === "object") {
				data = JSON.stringify(data);
			}

			if (sendJson) {
				this.resp.json(data);
			} else {
				this.resp.send(data);
			}

			this.dataSent = true;

		} else {
			Logger.logRed(`RespWrap :: ${this.id} :: data already sent`);
		}

		return result;
	}
}
