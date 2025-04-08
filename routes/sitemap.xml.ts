import { RouteConfig } from "$fresh/server.ts";
import process from "node:process";

export const config: RouteConfig = {
	skipInheritedLayouts: true,
	skipAppWrapper: true,
};

export const handler = (): Response => {
	const uptime = process.uptime();
	const now = new Date();
	const lastmod = new Date(now.getTime() - uptime * 1000);

	return new Response(`\
<urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	<url>
		<loc>https://dutch-ipa.deno.dev/</loc>
		<lastmod>${lastmod.toISOString()}</lastmod>
	</url>
</urlset>`);
};
