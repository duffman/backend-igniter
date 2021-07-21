/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ActionResult }     from "@core/action-result";
import { ParentFileFinder } from "@utils/parent-file-finder";
import { PathUtils }        from "@utils/path-utils";
import { ICommand }         from "./command";
import * as path            from "path";
import * as fs              from "fs";

export class CreateModule implements ICommand {
	constructor() {
	}

	public generateKernelDI(igniterJsonObj: any): ActionResult {
		let result = new ActionResult();
		let di     = igniterJsonObj.kernel.imports;
		console.log("DI ::", di);
		return result;
	}

	public createModule(name: string): boolean {
		let result = true;
		console.log("CreateModule ::");

		let startPath = process.cwd();
		let res       = ParentFileFinder.findFile(startPath, "igniter.json");

		if (res.fileFound) {
			let igniterFilename = path.resolve(res.path, res.result);
			let igniterJson     = require(igniterFilename);
			let modulesPath     = path.resolve(res.path, igniterJson.modules);

			this.generateKernelDI(igniterJson);

			console.log("IGNITER ::", igniterJson);
			console.log("IGNITER Modules ::", igniterJson.modules);
			console.log("IGNITER Module Path ::", modulesPath);

			modulesPath = PathUtils.ensureTrailingPathDelimiter(modulesPath);

			let modulePath = modulesPath + name;
			fs.mkdirSync(modulePath, { recursive: true });
			let config = this.createConfig(name);

			let moduleJSONFilename = PathUtils.ensureTrailingPathDelimiter(modulesPath) + "module.json";
			console.log("IGNITER moduleJSONFilename::", moduleJSONFilename);

			fs.writeFileSync(
				moduleJSONFilename,
				JSON.stringify(config, null, 4)
			);
		}
		else {
			console.error("'igniter.json' not found");
			result = false;
		}

		console.log("Start Path ::", startPath);
		console.log("Result", res);
		return result;
	}

	public createConfig(name: string): any {
		let config = {
			name:    name,
			version: 1.2
		};

		return config;
	}

	public execute(): Promise<boolean> {
		return Promise.resolve(false);
	}
}
