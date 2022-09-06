import { getUnique } from "../utils/array.ts";
import { redisGet, redisSet } from "./database.ts";
import { DutchIPAService } from "./ipa/dutch.ts";

export const getIPAs = async (sentence: string): Promise<Record<string, string | null>> => {
	const words = getUnique(sentence.toLowerCase().match(/\w+/g) || []);
	const results = await redisGet(words);
	const missing = Object.entries(results).filter(([_key, value]) => value !== null).map(([key, _value]) => key);
	const scraped = await DutchIPAService.getIPAs(missing);
	await redisSet(scraped);
	const found = Object.fromEntries(Object.entries(scraped).filter(([_key, value]) => value !== null));
	return {
		...results,
		...found,
	};
};
