/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable }  from "inversify";
import { IConnection } from '@core/networking/connection';

export interface IMessageEmitter {
}

@injectable()
export class MessageEmitter {
	constructor() {}

	public emitMessage(connection: IConnection, messageType: string, messageData, anny) {

	}
}
