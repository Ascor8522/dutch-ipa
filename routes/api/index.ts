import { HandlerContext } from "$fresh/server.ts";
import { z } from "zod";

import { getIPAs } from "../../services/ipa/index.ts";
import { translate } from "../../services/translate/index.ts";
import { parse } from "../../utils/function.ts";

export const handler = (req: Request, _ctx: HandlerContext): Promise<Response> => req
	.json()
	.then(jsonReq => {
		if(!parse(inputSchema, jsonReq)) throw new Error("Invalid input");
		return jsonReq;
	})
	.then(jsonReq => Promise.all([
		jsonReq.ipa ? getIPAs(jsonReq.input.text, jsonReq.input.lang) : undefined,
		jsonReq.translation ? translate(jsonReq.input.text, jsonReq.input.lang, jsonReq.translation.lang) : undefined,
	]))
	.then(res => Response.json(Object.assign({}, ...res)))
	.catch(err => Response.json({ error: err.message }, { status: 500 }));

const inputLanguages = z.enum(["nl"]);
export type InputLanguages = z.infer<typeof inputLanguages>;
const translationLanguages = z.enum(["en", "fr", "de", "es", "it", "pt", "ru", "zh", "ja", "ko"]);
export type TranslationLanguages = z.infer<typeof translationLanguages>;

const inputSchema = z.object({
	input: z.object({
		lang: inputLanguages,
		text: z.string(),
	}),
	ipa: z.boolean().optional(),
	translation: z.union([
		z.literal(false),
		z.object({
			lang: translationLanguages,
		}),
	]).optional(),
});
