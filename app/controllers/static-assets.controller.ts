/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { config }      from "@app/app-config";
import { AppConfig }   from "@app/app-config";
import { Interface }   from "@core/interfaces";
import { inject }      from 'inversify';
import { injectable }  from 'inversify';
import { IController } from '@core/rest/api-controller';
import { Logger }      from '@cli/cli.logger';
import { Router }      from 'express';
import { Request }     from 'express';
import { Response }    from 'express';
import * as path       from "path";

@injectable()
export class StaticAssetsController implements IController {
	constructor(
		@inject(Interface.IAppConfig) private appSettings: AppConfig,
		public debugMode: boolean = false
	) {}

	public initRoutes(routes: Router): void {
		routes.all("/", this.getRoot.bind(this));
		routes.all("/img", this.getImg.bind(this));
	}

	private getRoot(req: Request, resp: Response): void {
		resp.json({ 'ROOT': 666 });
	}

	private sendFile(resp: Response, filename: any, options: any): void {
		let reqFile: string = ( typeof filename === 'string' ) ? filename : null;

		if (reqFile) {
			resp.sendFile(reqFile, options, (err) => {
				Logger.logError("sendFile :: error ::", err);
			});

		}
		else {
			Logger.logError("sendFile :: error ::", reqFile);
		}
	}

	private getImg(req: Request, resp: Response): void {
		console.log('ID:: ', req.query.id);
		console.log('IMAGE:: ', req.query.image);

		let webRoot = config.webServer.wwwRoot;

		if (this.debugMode) Logger.logPurple("StaticAssetsController ::", webRoot);

		let imagePath = path.join(webRoot, 'restaurants/id_' + req.query.id);
		this.sendFile(resp, req.query.image, { root: imagePath });
	}
}
