import { Head } from "$fresh/runtime.ts";

export default function Error500() {
	return (
		<>
			<Head>
				<title>500 - Internal Server Error</title>
			</Head>
			<h1>500: Internal Server Error</h1>
			<a href="/">Back to the home page</a>
		</>
	);
}
