import { promiseArrayToAsyncGenerator } from "@/routes/api/(_utils)/generator.ts";
import {
  IPA,
  IPA_IN_KV,
  IPA_NOT_AVAILABLE,
  IPA_NOT_IN_KV,
} from "@/routes/api/ipa/(_service)/index.ts";
import pThrottle from "p-throttle";
import nl from "./lang/dutch.ts";
import test from "./lang/test.ts";

class IpaService {
  protected kv!: Deno.Kv;

  protected readonly throttle = pThrottle({
    limit: 3,
    interval: 1000,
  });

  protected readonly getters = {
    nl: this.throttle(nl),
    test: this.throttle(test),
  };

  public static init() {
    return new this().init();
  }

  private async init() {
    this.kv = await Deno.openKv();
    return this;
  }

  public get(
    lang: string,
    words: string[],
  ) {
    if (!(lang in this.getters)) throw new Error("Language not supported");
    words = this.cleanupWords(words);

    const requests = words.map(async (word) =>
      `data: ` + JSON.stringify({
        word,
        ipa: await this
          .retrieveOrFetchAndStore(lang, word)
          .then((ipa) => ipa === IPA_NOT_AVAILABLE ? null : ipa),
      }) + `\n\n`
    );
    return promiseArrayToAsyncGenerator(requests);
  }

  protected cleanupWords(words: string[]) {
    const cleaned = words
      .map((word) => word.toLowerCase())
      .map((word) => word.trim())
      .filter((word) => !!word);
    return new Set(cleaned)
      .values()
      .toArray();
  }

  protected async retrieveOrFetchAndStore(
    lang: string,
    word: string,
  ): Promise<IPA_IN_KV> {
    let ipa = await this.retrieve(lang, word);
    if (ipa === IPA_NOT_IN_KV) {
      const fetched = await this.fetch(lang, word);
      //   this.store(lang, word, fetched);
      ipa = fetched;
    } else {
      console.log(word, "served from cache");
    }

    return ipa;
  }

  protected async retrieve(lang: string, word: string): Promise<IPA> {
    const res = await this.kv.get(["ipa", lang, word]);
    if (res.value === null && res.versionstamp === null) return IPA_NOT_IN_KV;
    return res.value as IPA_IN_KV;
  }

  protected fetch(lang: string, word: string): Promise<IPA_IN_KV> {
    console.log("fetching ipa for", word, "in", lang);
    return this.getters[lang as keyof typeof this.getters](word);
  }

  protected async store(
    lang: string,
    word: string,
    ipa: IPA_IN_KV,
  ): Promise<void> {
    return void await this.kv.set(["ipa", lang, word], ipa);
  }
}

export const ipaService = await IpaService.init();
