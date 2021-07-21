/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { config }      from "@app/app-config";
import { PHttpClient } from "@utils/inet/phttp-client";
import { StrUtils }    from "@utils/str/string-utils";
import { injectable }  from "inversify";

const PTS_BASE_URL = "http://api.pts.se/PTSNumberService/Pts_Number_Service.svc/json/";

export interface IPTSNumberResult {
	d?: D;
}

export interface D {
	__type?: string;
	Name?:   string;
	Number?: string;
}

@injectable()
export class PTSClient {
	constructor() {}

	public httpGetAsJSON(url: string): Promise<any> {
		return new Promise((resolve, reject) => {

		});
	}

	public formatNumber(number: string): string {
		let tmpNumber = number;
		console.log("Format Number :: Start ::", tmpNumber);

		let countryCode = "";

		//
		// Of the number starts with + then extract and
		// remove the country code
		//
		if (tmpNumber.startsWith("+")) {
			console.log("Starts with +");
			tmpNumber = tmpNumber.substr(1);
			countryCode = tmpNumber.substr(1, 2);
		}

		console.log("Format Number :: After ::", tmpNumber);
		console.log("countryCode :: After ::", countryCode);
		return tmpNumber;
	}

	public searchByNumber(number: string): Promise<IPTSNumberResult> {
		let url = PTS_BASE_URL + "SearchNumberAllocation?number=";

		return new Promise((resolve, reject) => {
		});
	}
}
