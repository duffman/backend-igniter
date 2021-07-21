/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Logger }           from "@utils/logger";
import { ParentFileFinder } from "@utils/parent-file-finder";
import * as path            from "path";

export interface IDIImportData {
	imports?: IDImport[];
}

export interface IDImport {
	name?:         string;
	className?:    string;
	class?:        string;
	bind?:         string;
	serviceIdent?: string;
	to?:           string;
	scope?:        string;
}

export class DIGenerator {
	constructor() {
		this.execute();
	}

	execute(): void {
		let startPath = process.cwd();
		let res       = ParentFileFinder.findFile(startPath, "igniter.json");

		if (res.fileFound) {
			let igniterFilename = path.resolve(res.path, res.result);
			let igniterJson     = require(igniterFilename);

			// DI Import Section in igniter.json
			let importSection: IDIImportData = igniterJson.kernel;
			this.generate(importSection);
		}
	}

	/**
	 * Generate bindings like
	 * "kernel.bind<IReviewModule>("IReviewModule").to(BinanceModule).inRequestScope();"
	 * @param {IDIImportData} importData
	 */
	generate(importData: IDIImportData) {
		const template = `kernel.bind<_INTERFACE_>("_SERVICE_IDENT_").to(_CLASS_)._SCOPE_();`;

		let fileData = new Array<string>();

		for (let entry of importData.imports) {
			if (!entry.bind || !entry.serviceIdent || !entry.to || !entry.scope) {
				Logger.logError("Incomplete DI Bind Entry ::", entry);
				continue;
			}

			let importEntry = template.replace("_INTERFACE_", entry.bind);
			importEntry = importEntry.replace("_SERVICE_IDENT_", entry.serviceIdent);
			importEntry = importEntry.replace("_CLASS_", entry.to);
			importEntry = importEntry.replace("_SCOPE_", entry.scope);

			fileData.push(importEntry);
		}

		console.log("File Data ::", fileData);
	}
}

new DIGenerator();
