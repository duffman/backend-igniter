/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { inject, injectable } from 'inversify';
import { config }             from "@app/app-config";
import { IAppConfig }         from "@app/app-config";
import { AppConfig }          from "@app/app-config";
import { AppConst }           from "@app/app-const";
import { kernel, ModuleTag }  from '@core/kernel.config';
import { Logger }             from "@cli/cli.logger";
import { Interface }          from "@core/interfaces";
import { IMessageHandler }    from "@core/messaging/message-handler";
import { IMessageHub }        from "@core/messaging/message-hub";
import { IRestApiController } from '@core/rest/api-controller';
import { IRealtimeServer }    from "@core/realtime/realtime-server";
import * as bodyParser        from "body-parser";
import * as cors              from "cors";
import * as express           from "express";
import { Router }             from "express";
import * as expressSession    from "express-session";

export interface IApp {
	debugMode: boolean;
	initApp(settings: IAppConfig): void;
}

@injectable()
export class App implements IApp {
	debugMode: boolean;
	version: string;
	app: express.Application;
	server: any;
	restControllers: IRestApiController[];
	webRoutes: Router = Router();
	settings: IAppConfig;

	public static getFullIdent(): string {
		return AppConst.Info.SERVER_NAME
			   + "\n" + "Server version: "
			   + AppConst.Info.SERVER_VERSION
			   + "\n\n"
			   + AppConst.Info.PRODUCT_NAME
			   + "\n"
			   + AppConst.Info.PRODUCT_DESC;
	}

	constructor(
		@inject(Interface.IMessageHub) public messageHub: IMessageHub,
		//@inject(Interface.IRealtimeServer) public realtimeServer: IRealtimeServer,
	) {
		let messageHandlers: Array<IMessageHandler> = kernel.getAllTagged<IMessageHandler>(
			Interface.IMessageHandler,
			ModuleTag.Handler,
			ModuleTag.MessageHandler
		);

		for (const handler of messageHandlers) {
			Logger.logGreen("Registering Message Handler ::", handler.name);
			messageHub.registerHandler(handler);
		}

		Logger.logCyan("Message Handlers ::", messageHandlers);
	}

	private configureSession() {}

	/**
	 * Initialize Application
	 * @param {IServerModeSettings} settings
	 */
	public initApp(): void {
		let scope = this;

		//this.controllers     = new Array<IController>();
		this.restControllers = new Array<IRestApiController>();

		this.app = express();

		let listenHost = config.webServer.listenHost;
		let listenPort = config.webServer.listenPort;

		//
		// Configure Express Session
		//
		let expDate       = new Date(Date.now() + 9000000);
		let sessionCookie = {
			maxAge:  18000 * 10000,
			expires: expDate
		}

		// store: redisStore,
		let sessionSettings = {
			secret:            config.webServer.sessionSecret,
			cookie:            sessionCookie,
			saveUninitialized: true, // <- Create new session even if the request does not "touch" the session
			resave:            true  // <- Update the session even if the request does not "touch" the session
		}

		this.webRoutes.use(expressSession(sessionSettings));

		let corsOptions = {
			credentials: config.webServer.cors.credentials,
			origin:      config.webServer.cors.origin
		};

		this.app.use(cors(corsOptions));
		this.webRoutes.use(bodyParser.json());
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));

		this.webRoutes.all('*', (req: any, resp: any, next: any) => {
			Logger.logCyan('Request With Session ID ::', req.session.id);

			// IMPORTANT!
			// Setting a property will automatically cause a Set-Cookie response,
			// so touch the header so the session cookie will be set on the client
			//
			const PROP_HEADER = "X-Igniter";

			if (req.session.touched) {
				resp.setHeader(PROP_HEADER, true);

			}
			else {
				req.session.touched = true;
				resp.setHeader(PROP_HEADER, false);
			}

			next();
		});

		this.app.use(this.webRoutes);

		//
		// Initialize API Controllers
		//
		this.initRestControllers();

		try {
			this.server = this.app.listen(listenPort, listenHost, () => {
				Logger.logPurple("Web Server is listening on port ::", listenPort);
			});
		}
		catch (err) {
			Logger.logError('App Listen :: error ::', err);
		}
	}

	/**
	 * Terminare running Node process
	 * @param {number} code
	 */
	private static haltProcess(code: number = 200) {
		process.exit(code);
	}

	/**
	 * Initialize Rest Api Controllers
	 */
	private initRestControllers() {
		const routes                            = this.webRoutes;
		const controllers: IRestApiController[] = this.restControllers;

		let injectedControllers = kernel.getAllTagged<IRestApiController>(
			Interface.IRestApiController,
			ModuleTag.Handler,
			ModuleTag.RestApiController
		);

		Logger.logPurple("initRestControllers :: INJECTED ::", injectedControllers.length);

		for (let controller of injectedControllers) {
			controllers.push(controller);
			controller.initRoutes(routes);
		}
	}
}
