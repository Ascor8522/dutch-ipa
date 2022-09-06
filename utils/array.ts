export const getUnique = <T>(elements: T[]): T[] => [...new Set(elements)];
export const getMissing = <T, U>(elements: T[], f: (e: T) => U) => elements.filter(e => f(e) === null);
export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
	if(a.length !== b.length) throw new Error("Arrays must be of equal length");
	return a.map((v, i) => [v, b[i]]);
};
