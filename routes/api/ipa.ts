import { HandlerContext } from "$fresh/server.ts";

import { getIPAs } from "../../services/ipa.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> =>
	Response.json(await getIPAs(await req.text()));
