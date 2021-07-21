/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { inject, injectable } from "inversify";
import * as Collections       from "typescript-collections";
import { Logger }             from "@cli/cli.logger";
import { IUserSession }       from "@core/user-hub/user-session";
import { Interface }          from "@core/interfaces";
import { MessageEmitter }     from "@core/messaging/message-emitter";
import { IConnection }        from "@networking/connection";
import { ConnectionHub }      from "@networking/connection-hub";
import { SocketMessage }      from "@networking/socket-message";

export interface IUserHub {
	getSessionEntry(message: SocketMessage): SessionEntry;
	sessionExists(message: SocketMessage): boolean;
	registerSession(message: SocketMessage, data: IUserSession);
	getUserId(message: SocketMessage, required: boolean): number;
	registerSession(message: SocketMessage, data: IUserSession);
	clearHub(): void;
}

export class SessionEntry {
	constructor(
		public connection: IConnection,
		public userSession: IUserSession
	) {}
}

/**
 * TODO: Revamp Garbage Collection Functionality
 */
@injectable()
export class UserHub implements IUserHub {
	public sessions     = Array<SessionEntry>();
	public userSessions = new Collections.Dictionary<number, IUserSession>();

	constructor(
		@inject(Interface.IConnectionHub) private connHub: ConnectionHub,
		@inject("IMessageEmitter") private messageEmitter: MessageEmitter,
	) {
		this.userSessions = new Collections.Dictionary<number, IUserSession>();
	}

	public getSessionEntry(message: SocketMessage): SessionEntry {
		let session: SessionEntry = null;
		let id: string            = message.connection.socketId;

		let i = 0;
		while (i < this.sessions.length) {
			let tmpSession = this.sessions[i];
			let tmpConnId  = tmpSession.connection.socketId;

			if (id == tmpConnId) {
				session = tmpSession;
				break;
			}

			i++;
		}

		return session;
	}

	public sessionExists(message: SocketMessage): boolean {
		return ( this.getSessionEntry(message) != null );
	}

	public sendMessage(toPlayerId: number, data: any): Promise<boolean> {
		return new Promise((resolve, reject) => {

			resolve(true);
		});
	}

	/**
	 * //TODO Implement...
	 * @param data
	 */
	public broadcast(data: any): void {
		for (let i = 0; i < this.sessions.length; i++) {
			let session = this.sessions[i];
		}
	}

	/**
	 * Retrieves the current player id from the hub, if
	 * @param message
	 * @param required - if set the connection will terminate if no user id is found
	 * @returns {number}
	 */
	public getUserId(message: SocketMessage, required: boolean = true): number {
		let scope        = this;
		let userId       = -1;
		let sessionEntry = this.getSessionEntry(message);
		userId           = sessionEntry.userSession.userId;

		Logger.log("sessionEntry.userSession", sessionEntry.userSession);

		function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		async function terminateConnection() {
			await delay(500);
			scope.connHub.terminateConnection(message.connection);
		}

		if (required && userId == -1) {
			message.actionResult(false, "USER_ID_MISSING");
			terminateConnection();

			return -1;
		}

		return userId;
	}

	/**
	 * Returns a session by a given user id
	 * @returns - user session
	 * @param userId
	 */
	public getSessionByUid(userId: number): Promise<SessionEntry> {

		return new Promise((resolve, reject) => {
			for (let i = 0; i < this.sessions.length; i++) {
				let session = this.sessions[i] as SessionEntry;

				if (session.userSession.userId === userId) {
					resolve(session);
					break;
				}
			}

			resolve(null);
		});
	}

	/**
	 * Checks if given userId exits
	 * @param userId
	 * @returns {number}
	 */
	public haveUserSession(userId: number): boolean {
		return false;
	}

	/**
	 * Registers a new session
	 * @param message
	 * @param data
	 */
	public registerSession(message: SocketMessage, data: IUserSession) {
		console.log("Register Session: ", data);

		if (this.sessionExists(message)) {
			return;
		}

		let entry = new SessionEntry(message.connection, data);
		this.sessions.push(entry);
	}

	/**
	 * Clears all player sessions
	 */
	public clearHub(): void {
		this.sessions.length = 0;
	}
}
