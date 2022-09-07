/** @jsx h */

import { Head } from "$fresh/runtime.ts";
import { Fragment, h } from "preact";

import App from "../islands/App.tsx";

export default () => {

	const title = "Dutch IPA";
	const description = "Get the IPA for a complete sentence in Dutch";
	const icon = "/favicon.png";

	return (
		<Fragment>
			<Head>
				<title>Dutch IPA</title>
				<link rel="stylesheet" href="/style.css" />
				<meta name="description" content={description} />
				<meta property="og:title" content={title} />
				<meta property="og:image" content={icon} />
				<script type="application/ld+json">
					{
						`{
							"@context" : "http://schema.org",
							"@type" : "Article",
							"headline" : "${title} - ${description}",
							"author" : {
								"@type" : "Person",
								"name" : "Andrei Prakharevich"
							},
							"datePublished" : "2021-11-16",
							"image" : "${icon}"
						}`
					}
				</script>
			</Head>
			<App />
		</Fragment>
	);
};
