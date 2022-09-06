import { zip } from "../../utils/array.ts";

export abstract class DutchIPAService {
	public static getIPAs = (words: string[]): Promise<Record<string, string | null>> => Promise
		.all([
			words,
			Promise
				.allSettled(words
					.map(DutchIPAService.getIPA))
				.then(results => results.map(result => result.status === "fulfilled" ? result.value : null)),
		])
		.then(([words, results]) => zip(words, results))
		.then(Object.fromEntries);

	public static getIPA = (word: string): Promise<string | null> =>
		fetch(`https://www.woorden.org/woord/${word}`)
			.then(response => {
				if(!response.ok) throw new Error(response.statusText);
				return response.text();
			})
			.then(text => "" as string | null);
}
