import type { Word } from "@services/index.ts";
import { default as dutchIPA } from "@services/ipa/dutch.ts";
import { getFromKV, NotInKV, storeInKV } from "@services/kv.ts";

export enum SupportedIPALanguages {
	DUTCH = "nl",
}

export const IPAUnavailable = Symbol("IPA_UNAVAILABLE");

export type IPAAvailable = string & { readonly _brand: unique symbol };
export type IPAUnavailable = typeof IPAUnavailable;

export type IPAPronunciation =
	| IPAAvailable
	| IPAUnavailable;

export default async (words: Word[], language: SupportedIPALanguages) => {
	words = words.map((word) => word.toLowerCase().trim() as Word);
	words = [...new Set(words)];

	console.log("[IPA] Words", words);

	const keys = words.map((word) => ["ipa", language, word]);
	type KVResult = { present: [Word, IPAPronunciation][]; absent: [Word, NotInKV][] };
	let { present, absent } = await (getFromKV<IPAPronunciation>(keys)
		.then((values) => values.map((value, i) => [words[i], value] as [Word, IPAPronunciation | NotInKV]))
		.then((values) => Object.groupBy(values, ([_, value]) => value === NotInKV ? "absent" : "present")) as Promise<
			Partial<KVResult>
		>);

	present ??= [];
	absent ??= [];

	present.length && console.log("[IPA] Present in db", present);
	absent.length && console.log("[IPA] Absent from db", absent);

	const fetched = absent ? await fetchNewIPAs(absent.map(([word]) => word), language) : [];

	fetched.length && console.log("[IPA] Fetched new IPAs", fetched);

	const toStore = fetched
		.filter(([_, value]) => value !== IPAUnavailable)
		.map(([word, value]) => [["ipa", language, word] as Deno.KvKey, value] as [Deno.KvKey, IPAPronunciation]);
	await storeInKV(toStore);

	toStore.length && console.log("[IPA] Stored new IPAs", toStore);

	const results = ([] as [Word, IPAPronunciation][])
		.concat(present, fetched)
		.map(([word, value]) => [word, value === IPAUnavailable ? null : value] as [Word, IPAAvailable | null]);
	return Object.fromEntries(results) as Record<Word, IPAAvailable | null>;
};

const fetchNewIPAs = (words: Word[], language: SupportedIPALanguages) =>
	Promise
		.resolve()
		.then(() => console.log("[IPA] Fetching new IPAs", words))
		.then(() =>
			words.map(async (word) =>
				[
					word,
					await fetchNewIPA(word, language).catch((err) => {
						console.error("[IPA] Error fetching IPA", word, err);
						return IPAUnavailable;
					}),
				] as [Word, IPAPronunciation]
			)
		)
		.then((promises) => Promise.all(promises));

const fetchByLang: Record<SupportedIPALanguages, (words: Word) => Promise<IPAPronunciation>> = {
	[SupportedIPALanguages.DUTCH]: dutchIPA,
};
const fetchNewIPA = (word: Word, language: SupportedIPALanguages) => fetchByLang[language](word);
