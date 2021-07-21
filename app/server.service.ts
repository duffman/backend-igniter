/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { KernelBindings } from "@app/kernel.bindings";
import { Interface }      from "@core/interfaces";
import { inject }         from "inversify";
import { injectable }     from "inversify";
import { AppConfig }      from '@app/app-config';
import { LogService }     from '@app/services/log.service';
import { App }            from '@app/app';
import { CliCommander }   from '@cli/cli.commander';
import { Logger }         from '@cli/cli.logger';
import { IMessageHub }    from "@core/messaging/message-hub";
import { DbClient }       from '@database/db-client';
//import { IConnectionHub } from "@networking/connection-hub";
import { INetworkHub }  from "@networking/networking-hub";

export interface IServerService {
}

@injectable()
export class ServerService implements IServerService {
	constructor(
		@inject(Interface.IAppConfig) private appConfig: AppConfig,
		//	@inject(Inf.INetworkHub) public protocolManager: INetworkHub,
		//	@inject(Inf.IConnectionHub) public connectionHub: IConnectionHub,
		//	@inject(Inf.IMessageHub) public messageHub: IMessageHub,
		//	@inject(Inf.IDbClient) private dbClient: DbClient,
		@inject(Interface.IApp) private app: App,
		@inject(Interface.ILogService) private loggingService: LogService,
		@inject(Interface.IKernelBindings) private kernelBindings: KernelBindings,
	) {
		kernelBindings.setupBindings();
		Logger.logCyan(`Process pid :: ${ process.pid }`);
		loggingService.clear();

		// Configure DB Client
		// dbClient.configure(modeSettings.database)

		// Init Web App
		app.initApp();
	}
}
