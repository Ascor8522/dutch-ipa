import { getUnique, zip } from "../utils/array.ts";
import { sentenceToWords } from "../utils/string.ts";
import { redisGet, redisSet } from "./database.ts";
import { DutchIPAService } from "./ipa/dutch.ts";

export const getIPAs = async (sentence: string): Promise<Record<string, string | null>> => {
	const words = getUnique(sentenceToWords(sentence));
	const results = await redisGet(words);
	const missing = Object.entries(results).filter(([_key, value]) => value === null || value === undefined).map(([key, _value]) => key);
	const scraped = await Promise
		.all([
			missing,
			Promise
				.allSettled(missing.map(DutchIPAService.getIPA))
				.then(results => results.map(result => result.status === "fulfilled" ? result.value : null)),
		])
		.then(([words, results]) => zip(words, results))
		.then(Object.fromEntries) as Record<string, string |  null>;
	await redisSet(scraped);
	const found = Object.fromEntries(Object.entries(scraped).filter(([_key, value]) => value !== null));
	console.log("words", words, "results", results, "missing", missing, "scraped", scraped, "found", found, "combined", { ...results, ...found });
	return {
		...results,
		...found,
	};
};
