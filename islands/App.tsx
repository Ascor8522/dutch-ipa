/** @jsx h */

import "preact/debug";

import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

import Error from "../components/Error.tsx";
import Input from "../components/Input.tsx";
import IPA from "../components/IPA.tsx";
import Translation from "../components/Translation.tsx";
import { debounce } from "../utils/function.ts";

export default ({ }: AppProps) => {
	const [input, setInput] = useState("");
	const [ipa, setIPA] = useState("");
	const [translation, setTranslation] = useState("");

	const getIPA = (text: string) => fetch("/api", {
		method: "POST",
		body: JSON.stringify({
			input: {
				lang: "nl",
				text,
			},
			ipa: true,
		}),
	})
		.then(res => res.json() as Promise<{ ipa: (string | null)[], translation?: string; }>)
		.then(({ ipa, translation }) => {
			setIPA(ipa.map(word => word ?? "🤔").join(" "));
			setTranslation(translation ?? "");
		});

	const isError = false;
	const isLoading = false;

	const onCopy = (text: string) =>
		navigator.clipboard.writeText(text)
			.then(() => alert("Copied!"))
			.catch(() => alert("Failed to copy!"));
	const onPronounce = () => { };
	const onSwap = () => {
		const tmp = input;
		setInput(translation);
		setTranslation(tmp);
	};
	const onClear = () => setInput("");
	const onTextChange = debounce(getIPA, 1000);

	return (
		<Fragment>
			<div class="app">
				<div>
					<h1>Dutch IPA</h1>
					<a href="https://github.com/Ascor8522/dutch-ipa" target="_blank" title="Dutch IPA GitHub repository">
						<img src="/icons/github.svg" width="38px" height="38px" alt="GitHub Logo" />
					</a>
				</div>
				<noscript>
					<Error error="You need to have JavaScript enabled to use the website properly." />
				</noscript>
				<Input isError={isError} isLoading={isLoading} onCopy={onCopy} onPronounce={onPronounce} onSwap={onSwap} onClear={onClear} onTextChange={onTextChange} text={input} />
				<IPA isError={isError} isLoading={isLoading} text={ipa} onCopy={onCopy} />
				<Translation isError={isError} isLoading={isLoading} text={translation} onCopy={onCopy} onPronounce={onPronounce} onSwap={onSwap} />
			</div>
		</Fragment>
	);
};

interface AppProps {

}
