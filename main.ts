/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { kernel }        from '@core/kernel.config';
import { CliCommander }  from "@cli/cli.commander";
import { Logger }        from "@cli/cli.logger";
import { Interface }     from "@core/interfaces";
import { ServerService } from '@app/server.service';
import { IgniterApp }    from '@core/igniter-app';

export class Bootstrap implements IgniterApp {
	debugMode: boolean = true;

	constructor() {
		kernel.get<ServerService>(Interface.IServerService);
	}
}

let bootstrap = new Bootstrap();

if (CliCommander.first("clientMode")) {
	Logger.logYellow("Running Client Mode");
}
else {
	Logger.logYellow("Running Server Mode");
}
