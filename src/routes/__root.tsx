import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import NotFound from '../components/NotFound';
import themeInitScript from '../scripts/theme-init.js?raw';
import appCss from '../styles.css?url';

const title = "Dutch IPA - IPA, pronunciation, translation, and more";
const description = 'Get the IPA (International Phonetic Alphabet) transcription and the pronunciation of a whole sentence in Dutch.';
const url = "https://dutch-ipa.ascor8522.workers.dev";
const iconDescription = "The logo of the Dutch IPA website - A cheese with a thinking face";
const author = "Ascor8522";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: title },
			{ name: 'description', content: description },
			{ name: 'keywords', content: 'Dutch, IPA, sentence, pronunciation, International Phonetic Alphabet' },
			{ name: 'author', content: author },
			{ property: 'og:title', content: title },
			{ property: 'og:site_name', content: title },
			{ property: 'og:url', content: url },
			{ property: 'og:description', content: description },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:image', content: '/favicon.png' },
			{ property: 'og:image:alt', content: iconDescription },

		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
			{ rel: 'apple-touch-icon', href: '/favicon.png', type: 'image/png' },
			{ rel: 'manifest', href: '/manifest.json', type: 'application/manifest+json' }
		],
		scripts: [
			{
				type: 'application/ld+json', dangerouslySetInnerHTML: {
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebSite",
						"url": url,
						"name": title,
						"description": description,
						"publisher": {
							"@type": "Organization",
							"name": author
						},
						"potentialAction": {
							"@type": "SearchAction",
							"target": `${url}/?q={search_term_string}`,
							"query-input": "required name=search_term_string"
						}
					})
				}
			}
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode; }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
