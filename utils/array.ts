export const getUnique = <T>(elements: T[]): T[] => [...new Set(elements)];

export const getMissing = <T, U>(elements: T[], predicate: (e: T) => U) =>
	elements.filter(e => predicate(e) === null);

export const zip = <T, U>(arr1: T[], arr2: U[]): [T, U][] => {
	if(arr1.length !== arr2.length) throw new Error("Arrays must be of equal length");
	return arr1.map((v, i) => [v, arr2[i]!]);
};

export const mapToObject = async <T extends string, U>(arr: T[], fn: (value: T, index: number, array: T[]) => U) => {
	const mapped = await Promise.all(arr.map(fn));
	return Object.fromEntries(zip(arr, mapped)) as Record<T, Awaited<U>>;
};

export const rearrange = <T extends string, U>(arr: T[], rec: Record<T, U>) => arr.map(e => rec[e] ?? null);
