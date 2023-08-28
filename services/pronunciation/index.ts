export const PronunciationUnavailable = Symbol("PRONUNCIATION_UNAVAILABLE");

export type PronunciationAvailable = ArrayBuffer & { readonly _brand: unique symbol; };
export type PronunciationUnavailable = typeof PronunciationUnavailable;

export type Pronunciation =
	| PronunciationAvailable
	| PronunciationUnavailable;
