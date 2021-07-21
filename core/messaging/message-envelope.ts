/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface IMessageEnvelope {
	type: string;
	data: any;
	tag: any;
}

export class MessageEnvelope implements IMessageEnvelope {
	type: string;
	data: any;
	tag: any;

	/**
	 *
	 * @param messageType
	 * @param messageData
	 * @param tag The tag allows clients to pass along a custom "tag" to help identify responses.
	 */
	constructor(messageType: string, messageData: any, tag: any = null) {
		this.type = messageType;
		this.data = messageData;
		this.tag = messageData;
	}
}
