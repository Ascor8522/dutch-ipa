import { serverSideEvents } from "@/routes/api/(_utils)/response.ts";
import { ipaService } from "@/routes/api/ipa/(_service)/service.ts";
import { define } from "../../../utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    const lang = ctx.params.lang;
    const words = ctx.url.searchParams.get("words")?.split(",") ?? [];

    const gen = ipaService.get(lang, words);

    // return streaming(gen, ctx);
    return serverSideEvents(gen);
  },
});
