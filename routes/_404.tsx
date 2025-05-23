import { Head } from "$fresh/runtime.ts";

export default function Error404() {
	return (
		<>
			<Head>
				<title>404 - Page not found</title>
			</Head>
			<h1>404: Not found</h1>
			<a href="/">Back to the home page</a>
		</>
	);
}
