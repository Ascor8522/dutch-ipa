import { Word } from "../index.ts";
import { getUnique, mapToObject } from './../../utils/array.ts';
import { missing, retrieveIPA, storeIPA } from "./../kv.ts";
import { default as dutchIPA } from "./dutch.ts";

export const IPAUnavailable = Symbol("IPA_UNAVAILABLE");

export type IPAAvailable = string & { readonly _brand: unique symbol; };
export type IPAUnavailable = typeof IPAUnavailable;

export type IPAPronunciation =
	| IPAAvailable
	| IPAUnavailable;

export const getIPA = async (words: Word[], language: string): Promise<{ ipa: Record<Word, IPAPronunciation>; }> => {
	words = getUnique(words);

	console.log("[IPA] Words", words);

	const dbRetrieved = await retrieveIPA(words, language);
	const { present, absent } = missing(dbRetrieved);

	console.log("[IPA] Present in db", present);
	console.log("[IPA] Absent from db", absent);

	let fetchIPA: (words: Word) => Promise<IPAPronunciation>;
	switch(language) {
		case "nl": fetchIPA = dutchIPA; break;
		default: throw new Error("Language not supported");
	}

	const retrieved = await mapToObject(absent, fetchIPA);

	if(Object.keys(retrieved).length) console.log("[IPA] Retrieved from service", retrieved);

	await storeIPA(retrieved, language);

	return { ipa: { ...present, ...retrieved } };
};
