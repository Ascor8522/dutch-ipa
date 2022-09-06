/** @jsx h */

import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import { h } from "preact";

import App from "../islands/App.tsx";

export default () => {
	return (
		<div class={tw`md:w-3/5 sm:w-screen m-auto h-screen flex flex-col gap-4 items-center items-justify justify-center drop-shadow-lg`}>
			<Head>
				<title>Dutch IPA</title>
			</Head>
			<App />
		</div>
	);
}
