/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import * as path from "path";

export class MiscUtils {
	/**
	 * Helper method used to safely get the value of an AST node
	 * @param node
	 * @returns {string}
	 */
	public static safeGetAstNodeValue(node: any): string {
		if (MiscUtils.isEmpty(node) || MiscUtils.isEmpty(node.value)) {
			return "";
		}
		else {
			return node.value;
		}
	}

	/**
	 * Cross platform method that verifies that the given path ends
	 * with a path delimiter, NOTE that this method does no effort
	 * in verifying that your path string is correct.
	 * @param searchPath
	 * @returns {string}
	 */
	public static ensureTrailingPathDelimiter(searchPath: string) {
		if (MiscUtils.isEmpty(searchPath)) {
			return;
		}

		let pathSep = path.sep;
		if (searchPath.endsWith(pathSep) == false) {
			searchPath = searchPath + pathSep;
		}
		return searchPath;
	}

	/**
	 * Appends given value to a given path
	 * @param path
	 * @param part
	 * @param trailingDelim
	 */
	public static appendToPath(path: string, part: string, trailingDelim: boolean = true) {
		MiscUtils.ensureTrailingPathDelimiter(path);
		path += part;

		if (trailingDelim) {
			MiscUtils.ensureTrailingPathDelimiter(path)
		}
	}

	/**
	 * Checks for unset input string
	 * @param input
	 * @returns {boolean}
	 */
	public static isEmpty(input): boolean {
		return (input === undefined || input === null || input === '');
	}

	/**
	 * Removes the trailing "*" from a string (if any)
	 * @param path
	 * @returns {string}
	 */
	public static stripWildcard(path: string): string {
		if (path.endsWith("/*")) {
			path = path.substr(0, path.length-2);
		}

		return path;
	}

	/**
	 * Replaces double slashes "//" (if any)
	 * @param filePath
	 */
	static replaceDoubleSlashes(filePath: string) {
		filePath = path.normalize(filePath);
	}
	/**
	 * Converts EFBBBF (UTF-8 BOM) to FEFF (UTF-16 BOM)
	 * @param data
	 */
	public static stripByteOrderMark(data: string) {
		if (data.charCodeAt(0) === 0xFEFF) {
			data = data.slice(1);
		}

		return data;
	}

	/**
	 * Checks if a given filename contains a search path
	 * @param filename
	 * @returns {boolean}
	 */
	public static fileHavePath(filename: string): boolean {
		return (filename !== path.basename(filename));
	}
}
