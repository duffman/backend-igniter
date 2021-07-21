/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Interface }  from "@core/interfaces";
import { kernel }     from "@core/kernel.config";
import { UserHub }    from "@core/user-hub/user-hub";
import { IUserHub }   from "@core/user-hub/user-hub";
import { injectable } from "inversify";

console.log("BINDINGS!!");

export interface IKernelBindings {}

@injectable()
export class KernelBindings implements IKernelBindings {
	constructor() {}

	public setupBindings(): void {
		console.log(":::::::: Setup Bindings ::::::::");
		//kernel.bind<IUserHub>(Interface.IUserHub).to(UserHub).inSingletonScope();

	}
}
