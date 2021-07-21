/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable }             from "inversify";
import { IMessage }               from '@core/messaging/message';

@injectable()
export class MessageFactory {
	constructor() {
	}

	public compileMessage(messageType: string, messageData: any): IMessage {
		return;
	}

	public sayHello(): string {
		return "Hello";
	}
}
