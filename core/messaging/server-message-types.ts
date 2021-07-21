/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export namespace ServerMessageTypes {
	export module Socket {
		export let message            : string = "message";
		export let stream             : string = "stream";
	}

	export module Error {
		export let msgMissingId       : string = "msgMissingId";
	}

	export module Event {
		export let msgHello           : string = "msgHello";
		export let msgNewConnection   : string = "msgNewConnection";
	}
}
