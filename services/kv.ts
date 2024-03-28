import { Word } from "./index.ts";
import { IPAPronunciation } from "./ipa/index.ts";

const kvId = Deno.env.get("DENO_KV_ID");
const kvUrl = kvId && Deno.env.get("DENO_KV_ACCESS_TOKEN") ? `https://api.deno.com/databases/${kvId}/connect` : undefined;
const kv = await Deno.openKv(kvUrl);

export const NotInKV = Symbol("NotInKV");
export type NotInKV = typeof NotInKV;

const store = <V, K extends string = Word>(obj: Record<K, V>, language: string, key: [string, ...string[]]) => Promise
	.resolve()
	.then(() => console.log(`[KV] Storing "${Object.keys(obj).join(", ")}" words in ${language}`))
	.then(() => Object
		.entries(obj)
		.map(([word, value]) => kv.set([...key, language, word], value)))
	.then(p => Promise.allSettled(p))
	.then(_ => { });

const retrieve = <V, K extends string = Word>(words: K[], language: string, key: [string, ...string[]]) => Promise
	.resolve()
	.then(() => console.log(`[KV] Retrieving "${words.join(", ")}" words in ${language}`))
	.then(() => words.map(word => kv.get<V>([...key, language, word])))
	.then(p => Promise.allSettled(p))
	.then(results => results.map((result, i) => [words[i], result.status === "fulfilled" ? result.value.value ?? NotInKV : NotInKV]))
	.then(Object.fromEntries) as Promise<Record<K, V | NotInKV>>;

export const missing = <K extends string, V extends NotInKV | unknown>
	(a: Record<K, V>): { present: Record<K, Exclude<V, NotInKV>>; absent: K[]; } => {
	const presentTuples: [K, Exclude<V, NotInKV>][] = [];
	const absent: K[] = [];
	Object
		.entries(a)
		.map(([key, value]) => [key as K, value as V] as const)
		.forEach(([key, value]) => {
			if(value === NotInKV) absent.push(key);
			else presentTuples.push([key, value as Exclude<V, NotInKV>]);
		});
	const present = Object.fromEntries(presentTuples) as Record<K, Exclude<V, NotInKV>>;
	return { present, absent };
};

export const storeIPA = (ipaRecord: Record<Word, IPAPronunciation>, language: string) => Promise
	.resolve()
	.then(() => store(ipaRecord, language, ["ipa"]));

export const retrieveIPA = (words: Word[], language: string) => Promise
	.resolve()
	.then(() => retrieve<IPAPronunciation>(words, language, ["ipa"]));

export const storePronunciation = (pronunciationRecord: Record<string, ArrayBuffer>, language: string) =>
	store(pronunciationRecord, language, ["pronunciation"]);

export const retrievePronunciation = (words: Word[], language: string) =>
	retrieve<ArrayBuffer>(words, language, ["pronunciation"]);
