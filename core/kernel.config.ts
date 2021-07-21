/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import "reflect-metadata";
import { IKernelBindings }        from "@app/kernel.bindings";
import { KernelBindings }         from "@app/kernel.bindings";
import { IController }            from "@core/rest/api-controller";
//
import { IRestApiController }     from '@core/rest/api-controller';
import { IBaseController }        from "@api/base.controller";
import { BaseController }         from "@api/base.controller";
import { ServiceApiController }   from '@api/service-api.controller';
import { SessionApiController }   from "@api/session-api.controller";
import { StaticAssetsController } from '@api/static-assets.controller';
import { AppConfig, IAppConfig }  from '@app/app-config';
import { TestMessageHandler }     from "@app/message-handlers/test-message.handler";
import { RealtimeServer }         from "@core/realtime/realtime-server";
import { IRealtimeServer }          from "@core/realtime/realtime-server";
import { IServerService }           from "@app/server.service";
import { ServerService }            from "@app/server.service";
import { LogService }               from "@app/services/log.service";
import { ILogService }              from "@app/services/log.service";
import { IApp }                     from "@app/app";
import { App }                      from "@app/app";
import { Interface }                from "@core/interfaces";
import { IMessageHandler }          from "@core/messaging/message-handler";
import { IMessageHub, MessageHub }  from "@core/messaging/message-hub";
import { INetworkConnector }        from "@networking/network-connector";
import { UserHub }                  from "@core/user-hub/user-hub";
import { IUserHub }                 from "@core/user-hub/user-hub";
import { ConnectionHub }            from "@networking/connection-hub";
import { IConnectionHub }           from "@networking/connection-hub";
import { SocketIONetworkConnector } from "@networking/connectors/socket.io/socket.io-network-connector";
import { NetworkingHub }            from "@networking/networking-hub";
import { INetworkHub }              from "@networking/networking-hub";
import { DbClient, IDbClient }      from '@database/db-client';
import { IUserDb }                  from "@modules/user/user-db";
import { UserDb }                   from "@modules/user/user-db";
import { DBPool }                   from "@database/db-pool";
import { IDBPool }                  from "@database/db-pool";
import { Container }                from "inversify";
import { Symbol }                   from "typescript";
import { Bootstrap }                from "../main";

let ModuleTag = {
	Handler:           "handler",
	Message:           "message",
	DataModule:        "data_module",
	ProtocolManager:   "protocol_manager",
	MessageHandler:    "messageHandler",
	Controller:        "controller",
	RestApiController: "rest_api_controller",
	NetworkConnector:  "network_connector"
};

/*
const Types = {
	IAppConfig:Symbol.for("IAppConfig"),
	IApp:Symbol.for("IApp"),
	IBaseController:Symbol.for("IBaseController"),
	IServerService:Symbol.for("IServerService"),
	INetworkHub:Symbol.for("INetworkHub"),

	IMessageHandler:Symbol.for("IMessageHandler"),
	IRestApiController:Symbol.for("IRestApiController")
}

export { Types }
*/

let kernel = new Container();

kernel.bind<IAppConfig>(Interface.IAppConfig).to(AppConfig).inSingletonScope();
kernel.bind<IApp>(Interface.IApp).to(App).inSingletonScope();

//kernel.bind<IController>(Interface.IController).to(Controller).inRequestScope();

kernel.bind<IBaseController>(Interface.IBaseController).to(BaseController).inRequestScope();
kernel.bind<IServerService>(Interface.IServerService).to(ServerService).inSingletonScope();
kernel.bind<ILogService>(Interface.ILogService).to(LogService).inRequestScope();
kernel.bind<IKernelBindings>(Interface.IKernelBindings).to(KernelBindings).inRequestScope();

kernel.bind<IMessageHub>(Interface.IMessageHub).to(MessageHub).inSingletonScope();

kernel.bind<IDbClient>(Interface.IDbClient).to(DbClient).inSingletonScope();
kernel.bind<INetworkHub>(Interface.INetworkHub).to(NetworkingHub).inSingletonScope();
kernel.bind<IConnectionHub>(Interface.IConnectionHub).to(ConnectionHub).inSingletonScope();
kernel.bind<IRealtimeServer>(Interface.IRealtimeServer).to(RealtimeServer).inSingletonScope();

kernel.bind<IMessageHandler>(Interface.IMessageHandler)
	  .to(TestMessageHandler).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.MessageHandler);

// Socket.IO
kernel.bind<INetworkConnector>(Interface.INetworkConnector)
	  .to(SocketIONetworkConnector).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.ProtocolManager);

//
// API Controllers
//
kernel.bind<IRestApiController>(Interface.IRestApiController)
	  .to(ServiceApiController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

//
//    Rest API Controllers
//
kernel.bind<IRestApiController>(Interface.IRestApiController)
	  .to(SessionApiController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);


// Static Assets
kernel.bind<IRestApiController>(Interface.IRestApiController)
	  .to(StaticAssetsController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// DB Pool
kernel.bind<IDBPool>(Interface.IDBPool).to(DBPool).inRequestScope();
kernel.bind<IUserDb>(Interface.IUserDb).to(UserDb).inRequestScope();

export { kernel, ModuleTag };
