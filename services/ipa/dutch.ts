import { domParser, type Word } from "@services/index.ts";
import { type IPAPronunciation, IPAUnavailable } from "@services/ipa.ts";

// &from= in case of a plural
// &noredirect=1 in case of a redirect
export default (word: Word): Promise<IPAPronunciation> =>
	Promise
		.resolve()
		.then(() => console.log("[IPA Dutch] Fetching IPA", word))
		.then(() => fetch(`https://www.woorden.org/woord/${word}`, { signal: AbortSignal.timeout(2000) }))
		.then((response) => {
			if (!response.ok) throw new Error(response.statusText);
			return response.text();
		})
		.then((text) => domParser.parseFromString(text, "text/html"))
		.then((document) => {
			if (!document) console.error("[IPA Dutch] Error in document", word);
			return document;
		})
		.then((document) =>
			document
				?.querySelector("table")
				?.innerText
				?.match(/Uitspraak:\s+\t?\[(.*?)\]/)
				?.[1] as IPAPronunciation ??
				IPAUnavailable
		);
