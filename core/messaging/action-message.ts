/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IMessage } from '@core/messaging/message';

export class ActionMessage implements IMessage {
	constructor(
		public success: boolean = true,
		public errorMessage: string = ""
	) {}
}
