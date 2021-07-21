/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { SocketMessage } from '@core/networking/socket-message';

export interface IMessageHandler {
	requiresAuth: boolean;
	readonly messageSignature: Array<string>;
	readonly name: string;

	handleMessage(message: SocketMessage): void;
}
