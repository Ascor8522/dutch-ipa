import {promiseArrayToAsyncGenerator} from "@/routes/api/(_utils)/generator.ts";
import * as IPA from "@/routes/api/ipa/(_service)/index.ts";
import pThrottle from "p-throttle";
import nl from "@/routes/api/ipa/(_service)/lang/dutch.ts";
import test from "@/routes/api/ipa/(_service)/lang/test.ts";

class IpaService {
  public static readonly IPA_EXPIRATION_DELAY = 1000 * 60 * 60 * 24 * 7;
  public static readonly DEFAULT_FETCH_THROTTLE = { limit: 3, interval: 1000 };

  protected kv!: Deno.Kv;
  protected readonly throttle = pThrottle(IpaService.DEFAULT_FETCH_THROTTLE);

  protected readonly getters = {
    nl: this.throttle(nl),
    test: this.throttle(test),
  };

  public static init() {
    return new this().init();
  }

  public get(
    lang: string,
    words: string[],
  ) {
    this.ensureLang(lang);

    const requests = this
      .cleanupWords(words)
      .map((word) =>
        this
          .retrieveOrFetchAndStore(lang, word)
          .then((ipa) => ({ word, ipa }))
      );

    return promiseArrayToAsyncGenerator(requests);
  }

  protected ensureLang(lang: string): asserts lang is IPA.LANG {
    if (!(lang in this.getters)) throw new Error("Language not supported");
  }

  protected cleanupWords(words: string[]) {
    const cleaned = words
      .map((word) => word.toLowerCase())
      .map((word) => word.trim())
      .filter((word): word is IPA.WORD => !!word);
    return new Set(cleaned)
      .values()
      .toArray();
  }

  protected async retrieveOrFetchAndStore(
    lang: IPA.LANG,
    word: IPA.WORD,
  ) {
    const retrieved = await this.retrieve(lang, word);

    if (retrieved === IPA.NOT_IN_KV) {
      const fetched = await this.fetch(lang, word);
      await this.store(lang, word, fetched);
      return fetched;
    }

    console.log("%o served from cache", word);
    return retrieved as IPA.IN_KV;
  }

  protected async retrieve(lang: IPA.LANG, word: IPA.WORD) {
    const retrieved = await this.kv.get<IPA.IPA>(["ipa", lang, word]);
    if (retrieved.value === null) return IPA.NOT_IN_KV;
    return retrieved.value as IPA.IN_KV;
  }

  protected fetch(lang: IPA.LANG, word: IPA.WORD) {
    console.log("fetching ipa for %o in lang %o", word, lang);
    return this.getters[lang as keyof typeof this.getters](word);
  }

  protected async store(
    lang: IPA.LANG,
    word: IPA.WORD,
    ipa: IPA.IN_KV,
  ) {
    const expireIn = ipa === IPA.NOT_AVAILABLE
      ? IpaService.IPA_EXPIRATION_DELAY
      : undefined;
    return void await this.kv.set(["ipa", lang, word], ipa, { expireIn });
  }

  private async init() {
    this.kv = await Deno.openKv();
    return this;
  }
}

export const ipaService = await IpaService.init();
