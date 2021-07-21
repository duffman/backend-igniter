/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { FileUtils } from "@utils/file-utils";
import { Logger }    from "@utils/logger";
import { Template }  from "./template";

export class TemplateManager {
	constructor() {}

	public generateTemplate(srcFilename: string): Template {
		let result = new Template();
		let fileResult = FileUtils.readFile(srcFilename);

		if (fileResult.success) {
			result.src = srcFilename;
			result.data = fileResult.data;
		} else {
			Logger.logError("", "");
		}

		return result;
	}
}
