import { InputLanguages } from "../../routes/api/index.ts";
import { getUnique, zip } from "../../utils/array.ts";
import { sentenceToWords } from "../../utils/string.ts";
import { redisGet, redisSet } from "./../database/index.ts";
import { DutchIPAService } from "./lang/dutch.ts";

export const IPANotInDB: unique symbol = Symbol("IPA_NO_IN_DB");
export const IPAAlreadyInDBButNull: unique symbol = Symbol("IPA_ALREADY_IN_DB_BUT_NULL");
export const IPANotCouldNotScrape: unique symbol = Symbol("IPA_COULD_NOT_SCRAPE");

export const getIPAs = async (sentence: string, lang: InputLanguages): Promise<{ ipa: (string | null)[]; }> => {
	const words = sentenceToWords(sentence);
	const results = await redisGet(getUnique(words));
	const missing = Object
		.entries(results)
		.filter(([_key, value]) => value === IPANotInDB)
		.map(([key, _value]) => key);
	const scraped = await Promise
		.all([
			missing,
			Promise
				.allSettled(missing.map(services[lang]))
				.then(results => results.map(result => result.status === "fulfilled" ? result.value : IPANotCouldNotScrape)),
		])
		.then(([words, results]) => zip(words, results))
		.then(Object.fromEntries) as Record<string, string | typeof IPANotCouldNotScrape>;
	await redisSet(scraped);
	console.log("words", words, "results", results, "missing", missing, "scraped", scraped, "combined", { ...results, ...scraped });
	const all = { ...results, ...scraped };
	return {
		ipa: words
			.map(word => all[word]!)
			.map(word => {
				switch(word) {
					case IPANotInDB: return null;
					case IPAAlreadyInDBButNull: return null;
					case IPANotCouldNotScrape: return null;
					default: return word;
				}
			}),
	};
};

const services: Record<InputLanguages, (word: string) => Promise<string | typeof IPANotCouldNotScrape>> = {
	"nl": DutchIPAService.getIPA,
};
