export class Formatted {
	static fromArrayToString(array: string[], separator: string = ', '): string {
		return array.join(separator);
	}

	static fromStringToArray(text: string): any[] {
		if (!text) return [];
		return JSON.parse(text);
	}

	static isArrayAsString(text: string): boolean {
		if (!text) return false;

		return text.startsWith('[') && text.endsWith(']');
	}

	static isArrayOfStrings(array: string[]): boolean {
		return array.some(el => typeof el !== 'string');
	}

	static validateArrayElements(
		arrayToValidate: any[],
		validElements: any[],
	): boolean {
		return arrayToValidate.every(element => validElements.includes(element));
	}
}
