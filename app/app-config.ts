/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable } from "inversify";
import * as config from "config";

export interface IAppConfig {
}

@injectable()
export class AppConfig implements IAppConfig {
	constructor() {}

	public init() {
		const dbConfig = config.get('Customer.dbConfig');

		if (config.has('optionalFeature.detail')) {
			const detail = config.get('optionalFeature.detail');
		}
	}

	public getDatabaseConfig() {
	}
}

export { config }
