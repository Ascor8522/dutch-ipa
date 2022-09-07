import { HandlerContext } from "$fresh/server.ts";

import { redisFlush } from "../../../services/database/index.ts";

export const handler = (req: Request, _ctx: HandlerContext): Promise<Response> => req
	.formData()
	.then(form => form.get("password"))
	.then(password => {
		if(password === Deno.env.get("FLUSH_DATABASE_PASSWORD")) return password;
		throw new Error("Invalid password");
	})
	.then(redisFlush)
	.then(() => new Response(`
		<html>
			<head>
				<meta http-equiv="Refresh" content="2; URL=/">
			</head>
			<body>OK</body>
		</html>
	`, {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
		},
		status: 200,
	}))
	.catch(err => new Response(err.message, { status: 401 }));
