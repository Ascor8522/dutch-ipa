import {domParser} from "@/routes/api/(_utils)/dom.ts";
import * as IPA from "@/routes/api/ipa/(_service)/index.ts";

const getIpa = (word: string) =>
  fetch(`https://www.woorden.org/woord/${word}`, {
    signal: AbortSignal.timeout(2000),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.text();
    })
    .then((text) => domParser.parseFromString(text, "text/html"))
    .then((document) =>
      (document.querySelector("table") ?? document.body)
        .innerText
        .match(/Uitspraak:\s+\t?\[(.*?)]/)
        ?.[1] as IPA.AVAILABLE | undefined
    )
    .then((document) => document ?? IPA.NOT_AVAILABLE);

export default getIpa;
