import type { FreshContext } from "$fresh/server.ts";
import { z } from "zod";

import type { Word } from "@services/index.ts";
import ipa, { SupportedIPALanguages } from "@services/ipa.ts";

const bodySchema = z.object({
	words: z.array(z.string().transform((word) => word as Word)),
	lang: z.nativeEnum(SupportedIPALanguages),
});

export const handler = (req: Request, _ctx: FreshContext): Promise<Response> =>
	req
		.json()
		.then(bodySchema.parse)
		.then((req) => ipa(req.words, req.lang))
		.then(Response.json)
		.catch((err) => {
			console.error(err);
			return Response.json({ error: err.message }, { status: 500 });
		});
