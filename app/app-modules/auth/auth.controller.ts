/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { injectable }         from "inversify";
import { Request }            from 'express';
import { Response }           from 'express';
import { Router }             from 'express';
import { IRestApiController } from "@core/rest/api-controller";

@injectable()
export class AuthController implements IRestApiController {
	debugMode: boolean = false;
	constructor() {
	}

	public initRoutes(routes: Router): void {
		routes.all("/putte", this.apiTest.bind(this));
	}

	private apiTest(req: Request, resp: Response): void {
		let testResp = {
			sessId: 22 //req.session.id
		};

		resp.json(testResp);
	}
}
