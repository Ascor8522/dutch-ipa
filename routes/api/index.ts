import { HandlerContext } from "$fresh/server.ts";
import { z } from "zod";

import { Word } from "../../services/index.ts";
import { getIPA } from "../../services/ipa/index.ts";
import { clean, Json } from "../../utils/json.ts";

const inputLanguages = z.enum(["nl"]);
export type InputLanguages = z.infer<typeof inputLanguages>;

const translationLanguages = z.enum(["en", "fr", "de", "es", "it", "pt", "ru", "zh", "ja", "ko"]);
export type TranslationLanguages = z.infer<typeof translationLanguages>;

const inputSchema = z.object({
	input: z.object({
		lang: inputLanguages,
		text: z.string(),
	}),
	ipa: z.object({})
		.optional(),
	translation: z.object({
		lang: translationLanguages,
	})
		.optional(),
});

export const handler = (req: Request, _ctx: HandlerContext): Promise<Response> => req
	.json()
	.then(jsonReq => inputSchema.parse(jsonReq, { errorMap: () => ({ message: "Request does not meet schema." }) }))
	.then(jsonReq => Promise.all([
		jsonReq.ipa ? getIPA(jsonReq.input.text.split(" ") as Word[], jsonReq.input.lang) : undefined,
		// jsonReq.translation ? translate(jsonReq.input.text, jsonReq.input.lang, jsonReq.translation.lang) : undefined,
	]))
	.then(clean)
	.then(res => Response.json(Object.assign({}, ...res as Json[])))
	.catch(err => Response.json({ error: err.message }, { status: 500 }));
