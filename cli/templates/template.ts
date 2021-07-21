/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class Template {
	constructor(
		public success: boolean = true,
		public src: string = '',
		public data: string = '',
		public className?: string
	) {}
}
