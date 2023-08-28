export type Json =
	| string
	| number
	| boolean
	| null
	| Json[]
	| { [key: string]: Json; };

export const clean = (u: unknown): Json => {
	switch(true) {
		case typeof u === "string":
		case typeof u === "number":
		case typeof u === "boolean":
		case u === null:
			return u as Json;
		case Array.isArray(u):
			return (u as unknown[]).map(clean);
		case typeof u === "object":
			return Object.fromEntries(Object
				.entries(u as {})
				.map(([k, v]) => [k, clean(v)]));
		default:
			return null;
	}
};
