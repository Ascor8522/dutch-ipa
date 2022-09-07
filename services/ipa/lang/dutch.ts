import { domParser } from "../../../main.ts";
import { IPANotCouldNotScrape } from "../index.ts";

export abstract class DutchIPAService {
	public static getIPA = (word: string): Promise<string | typeof IPANotCouldNotScrape> =>
		fetch(`https://www.woorden.org/woord/${word}`) // &from= in case of a plural // &noredirect=1 in case of a redirect
			.then(response => {
				if(!response.ok) throw new Error(response.statusText);
				return response.text();
			})
			.then(text => domParser.parseFromString(text, "text/html"))
			.then(document => {
				if(!document) console.error(`No document for word ${word}`);
				return document;
			})
			.then(document => document
				?.querySelector("table")
				?.innerText
				?.match(/Uitspraak:\s+\t?\[(.*?)\]/)
				?.[1]
				?? IPANotCouldNotScrape);
}
