/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IRestApiController } from "@core/rest/api-controller";
import { Logger }             from "@cli/cli.logger";
import { Router }             from "express";
import { Request }            from "express";
import { Response }           from "express";
import { injectable }         from "inversify";

@injectable()
export class SessionApiController implements IRestApiController {
	debugMode: boolean = false;

	constructor() {}

	public initRoutes(routes: Router): void {
		if (this.debugMode) Logger.logBlue("SessionApiController :: initRoutes");
		routes.all("/session", this.getRoot.bind(this));
	}

	private getRoot(req: Request, resp: Response): void {
		let count = (req.session['count']) ? req.session['count'] : 0;
		count++;

		req.session['count'] = count;
		resp.setHeader("x-powered-by", "Backend Igniter");
		resp.json({ rootKey: count });
	}
}
