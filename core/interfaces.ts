import { IKernelBindings } from "@app/kernel.bindings";
import { IUserHub }        from "@core/user-hub/user-hub";

/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

export const Interface = {
	IConnectionHub:     "IConnectionHub",
	IMessageHandler:    "IMessageHandler",
	IMessageHub:        "IMessageHub",
	INetworkHub:        "INetworkHub",
	IAppConfig:         "IAppConfig",
	IServerService:     "IServerService",
	IClientService:     "IClientService",
	IApp:               "IApp",
	IBaseController:    "IBaseController",
	IDbClient:          "IDbClient",
	IMysqlClient:       "IMySqlClient",
	IDBPool:            "IDBPool",
	IController:        "IController",
	IRestApiController: "IRestApiController",
	IServiceRegistry:   "IServiceRegistry",
	ILogService:        "ILogService",
	IUserDb:            "IUserDb",
	IUserHub:           "IUserHub",
	IRealtimeServer:    "IRealtimeServer",
	INetworkConnector:  "INetworkConnector",
	IKernelBindings:    "IKernelBindings"
}
