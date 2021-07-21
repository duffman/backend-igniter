/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class ActionResult {
	constructor(
		public success: boolean = true,
		public data?: any,
		public error?: Error
	) {}
}
