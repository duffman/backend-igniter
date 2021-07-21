/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export module Global {
	export enum DebugReportingLevel {
		None,
		Low,
		Medium,
		High
	}

	export module Debug {
		export const DebugLevel: DebugReportingLevel = DebugReportingLevel.Low;
		export function Verbose(): boolean {
			return this.DebugLevel == DebugReportingLevel.High;
		}
	}

	export module Networking {
		//export const webServerPort             = 80;
		//export const socketIOPort              = process.env.PORT || 5000;
		export const socketIOPort                = 9090;
		export const webSocketPort               = 6060;
		export const tcpPort                     = 1681;
		export const adminPort                   = 3000;
	}

	export module SocketEvents {
		export const newConnection               = 'newConnection';
		export const dataAvailable               = 'dataAvailable';
		export const error                       = 'error';
		export const closed                      = 'closed';
	}

	/**
	 *	The current state of the application
	 */
	export enum AppState {
		Idle,
		Loading,
		Ready,
		Error
	}

	export module Core {
		export const SERVER_VERSION              = "Backend Igniter 1.3.5-DEV";
		export const CUSTOMER_BRANCH             = "";
	}

	/**
	 *	Public ServerService Settings
	 */
	export module Settings {
		export let publicWebDirectory            = "core";
		export let appDirectory                  = "app";
		export let debug                         = true;
		export let terminateOnError: boolean     = false;

		export module SQLDatabase_Test {
			export const dbName                  = "clear_vision2";
			export const dbHost                  = "localhost";
			export const dbUser                  = "duffman";
			export const dbPass                  = "bjoe7151212";
		}

		export module SQLDatabase {
			export const dbName                  = "clear_vision";
			export const dbHost                  = "localhost";
			export const dbPort                  = 3306;
			export const dbUser                  = "duffman";
			export const dbPass                  = "bjoe7151212";
			export const useTransactions         = false;
		}
	}

	export enum ServerMode {
		Debug,
		Test,
		Production
	}

	export let Mode = ServerMode.Debug;
	export let DebugMode = (Mode == ServerMode.Debug);
}
