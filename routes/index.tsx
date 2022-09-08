/** @jsx h */

import { Head } from "$fresh/runtime.ts";
import { Fragment, h } from "preact";

import App from "../islands/App.tsx";
import { isProduction } from "../utils/env.ts";

export default () => {

	const title = "Dutch IPA - IPA, pronunciation, translation, and more";
	const description = "Get the IPA transcription, the pronunciation, and the translation for a whole sentence in Dutch.";
	const icon = "/favicon.png";
	const url = "https://dutch-ipa.deno.dev/";
	const GA_ID = isProduction() ? Deno.env.get("GA_ID") ?? "" : "";

	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content="Dutch, IPA, sentence, translation, pronunciation" />
				<link rel="preload" href="/style.css" as="style" />
				<link rel="stylesheet" href="/style.css" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="apple-touch-icon" href={icon} />
				<link rel="manifest" href="/manifest.json" />
				{isProduction() && (
					<Fragment>
						<link rel="canonical" href={url} />
						<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
						<script dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${GA_ID}');
							`,
						}} />
					</Fragment>
				)}
				<meta property="og:title" content={title} />
				<meta property="og:site_name" content={title} />
				<meta property="og:url" content={url} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={icon} />
				<meta property="og:image:alt" content={`The logo of the Dutch IPA website - A cheese with a thinking face`} />
				<script type="application/ld+json" dangerouslySetInnerHTML={{
					__html: `
						{
							"@context": "https://schema.org/",
							"@type": "WebSite",
							"name": "${title}",
							"url": "${url}",
							"potentialAction": {
								"@type": "SearchAction",
								"target": "${url}#{search_term_string}",
								"query-input": "required name=search_term_string"
							}
						}
					`,
				}} />
			</Head>
			<App />
		</Fragment>
	);
};
