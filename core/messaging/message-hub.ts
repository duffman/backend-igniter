/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable }         from "inversify";
import { Logger }             from '@cli/cli.logger';
import { MessageEnvelope }    from '@core/messaging/message-envelope';
import { ServerMessageTypes } from '@core/messaging/server-message-types';
import { SocketMessage }      from '@core/networking/socket-message';
import { ArrayUtils }         from '@core/utils/array/array-utils';
import { DataUtils }          from '@core/utils/data-utils';
import { IMessageHandler }    from '@core/messaging/message-handler';
import { IConnection }        from '@core/networking/connection';

export interface IMessageHub {
	registerHandler(handler: IMessageHandler): boolean;
	tryDeliverMessage(connection: IConnection, handler: IMessageHandler, message: any);
	addMessage(connection: IConnection, message: any);
	sendMessage(connection: IConnection, messageType: string, messageData: any): void;
}

@injectable()
export class MessageHub implements IMessageHub {
	private handlers = new Array<IMessageHandler>();

	constructor() {}

	public registerHandler(handler: IMessageHandler): boolean {
		try {
			Logger.logGreen("Registering Message Handler:", handler.constructor.name);

			if (this.handlers.lastIndexOf(handler) > -1) {
				console.log('Handler for "' + ArrayUtils.ArrayToString(handler.messageSignature) + '"');
				return false;
			}

			Logger.logGreen("Registering Message Handler: step 1 ::", handler.name);

			this.handlers.push(handler);

			Logger.logGreen("Registering Message Handler: step 2 ::", handler.name);

			if (!handler.messageSignature || handler.messageSignature.length === 0) {
				Logger.logError("No Message Signatures for handler ::", handler.name);
			}
			else {
				Logger.logYellow("Handler for '" + ArrayUtils.ArrayToString(handler.messageSignature) + "' added");
			}

		}
		catch (exception) {
			Logger.logErrorMessage("Error 106: failed to register message handler", exception);
		}
	}

	///TODO: Implement
	public unRegisterHandler(handler: IMessageHandler) {
	}

	/**
	 * Tests a handler for the correct message signature
	 * @param connection
	 * @param handler
	 * @param message
	 */
	public tryDeliverMessage(connection: IConnection, handler: IMessageHandler, message: any): boolean {
		let result: boolean = false;

		try {
			if (DataUtils.isNullOrUndefined(handler) || DataUtils.isNullOrUndefined(handler.messageSignature)) {
				Logger.logErrorMessage("EMPTY EXIT IN tryDeliverMessage");
				return;
			}

			if (handler.messageSignature.indexOf(message.type) > -1) {
				console.log("*** message.fieldType:", message.type);
				console.log("*** message:", message.data);

				Logger.logCyan("handler.requiresAuth", handler.requiresAuth);
				Logger.logCyan("connection.connectionId ", connection.connectionId);

				//TODO: Clean this up
				if (handler.requiresAuth && connection.connectionId == "") {
					// TODO: FIX FIX FIX
					let dataObject = {
						"type":    ServerMessageTypes.Error.msgMissingId,
						"message": "IConnection id is missing"
					};

					connection.socket.emit("message", JSON.stringify(dataObject));

					setTimeout(function () {
						connection.closeConnection();

					}, 1500);

					return;
				}

				let socketMessage = new SocketMessage(connection, message.type, message);

				// If a tag is present, attach that to the message, tags play an important part
				// in the C# SDK´s Promise Resolving
				if (!DataUtils.isNullOrUndefined(message.tag)) {
					socketMessage.messageTag = message.tag;
				}

				handler.handleMessage(socketMessage);
				result = true;

			}
		}
		catch (exception) {
			console.log("Exception in tryDeliverMessage", exception);
		}

		return result;
	}

	public addMessage(connection: IConnection, message: any) {
		Logger.logGreen("AddMessage", "socket id: " + connection.socketId);
		Logger.logGreen("         +", message);

		let deliverSuccess = false;

		for (let i = 0; i < this.handlers.length; i++) {
			let handler = this.handlers[i];

			if (!DataUtils.isNullOrUndefined(handler)) {
				if (this.tryDeliverMessage(connection, handler, message)) {
					deliverSuccess = true;
				}
			}
		}

		if (!deliverSuccess) {
			console.log("COULD NOT DELIVER MESSAGE");
		}
	}

	public sendMessage(connection: IConnection, messageType: string, messageData: any): void {
		let envelope = new MessageEnvelope(messageType, messageData);
		connection.socket.emit("message", JSON.stringify(envelope));
	}

	public broadcastMessage(messageType: string, messageData: any) {
		for (let handler of this.handlers) {
			if (!DataUtils.isNullOrUndefined(handler)) {
				let message = new MessageEnvelope(messageType, messageData);

				return new Error("NOT IMPLEMENTED");
				/*
				if (this.tryDeliverMessage(connection, handler, message)) {
					deliverSuccess = true;
				}*/
			}
		}
	}
}
