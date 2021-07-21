/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class FormatNumber {
	constructor() {
		this.formatNumber("+46708633007");
	}

	/**
	 *
	 * @param {string} number
	 * @returns {string}
	 */
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
		}

		console.log("Format Number :: After ::", tmpNumber);
		return tmpNumber;
	}
}

new FormatNumber();
