import type { PageProps } from "$fresh/server.ts";

const isProduction = !!Deno.env.get("DENO_DEPLOYMENT_ID");

export default function App({ Component }: PageProps) {
	const title = "Dutch IPA - IPA, pronunciation, translation, and more";
	const description = "Get the IPA (International Phonetic Alphabet) transcription and the pronunciation of a whole sentence in Dutch.";
	const keywords = "Dutch, IPA, sentence, pronunciation, International Phonetic Alphabet";
	const icon = "/favicon.png";
	const iconDescription = "The logo of the Dutch IPA website - A cheese with a thinking face";
	const url = "https://dutch-ipa.deno.dev/";

	const GA_ID = Deno.env.get("GA_ID") ?? "";

	const gtagJs = `\
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', {});
  `;
	const gtag = (
		<>
			<link rel="canonical" href={url} />
			<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
			<script dangerouslySetInnerHTML={{ __html: gtagJs }} />
		</>
	);

	const jsonLD = `\
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
  }`;

	return (
		<html class="w-full h-full">
			<head>
				<link rel="preload" href="/styles.css" as="style" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />

				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />

				<link rel="stylesheet" href="/styles.css" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet"
				/>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="apple-touch-icon" href={icon} />
				<link rel="manifest" href="/manifest.json" />

				<title>{title}</title>

				{isProduction && gtag}

				<meta property="og:title" content={title} />
				<meta property="og:site_name" content={title} />
				<meta property="og:url" content={url} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={icon} />
				<meta property="og:image:alt" content={iconDescription} />
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLD }} />
			</head>
			<body class="w-full h-full font-[Roboto] bg-[--page-bg] text-neutral-200">
				<Component />
			</body>
		</html>
	);
}
