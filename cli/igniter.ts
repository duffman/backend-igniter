/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as path        from "path";
import * as chalk       from "chalk";
import { CreateModule } from "./commands/create-module";

const yargs = require("yargs");
const List = require('prompt-list');
const prompts = require('prompts');



const argv = yargs.options(
	{
		env:        {
			alias:       'e',
			choices:     ['dev', 'prod'],
			//demandOption: true,
			description: 'app environment'
		},
		genDbModel: {
			alias:       'gdb',
			description: 'Generate Database Model'
		},
		port:       {
			alias:       'p',
			default:     80,
			description: 'port'
		}
	}).argv;

export class Igniter {
	appPath: string;
	public static DebugMode = true;

	showList1(): Promise<any> {
		return new Promise((resolve, reject) => {
			let list = new List(
				{
					name:    'Module Type',
					message: 'Create new module',
					choices: [
						'Coke',
						'Diet Coke',
						'Cherry Coke',
						// { name: 'Sprite', disabled: 'Temporarily unavailable' },
						'Water'
					]
				});

			list.ask(answer => {
				resolve(answer);
			});
		});
	}

	showList2(): Promise<any> {
		return new Promise((resolve, reject) => {
			let list = new List(
				{
					name:    'Scope',
					message: 'Select module scope',
					choices: [
						'Request Scope',
						'Diet Coke',
						'Cherry Coke',
						'Water'
					]
				});

			list.ask(answer => {
				resolve(answer);
			});
		});
	}

	public async showList(): Promise<void> {
		let answer1 = await this.showList1();
		let answer2 = await this.showList2();

		console.log("Answer 1 ::", answer1);
		console.log("Answer 2 ::", answer2);

		let cmd = new CreateModule();
		cmd.createModule("balle");
	}

	constructor(argv: any) {
		console.log(argv);

		this.appPath = path.join(process.cwd(), '../../');
		console.log(chalk("path ::"), this.appPath);
		this.showList();
	}
}

//new Igniter(argv);

