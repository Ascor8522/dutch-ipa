/** @jsx h */

import "preact/debug";

import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import Input from "../components/Input.tsx";
import IPA from "../components/IPA.tsx";
import Translation from "../components/Translation.tsx";
import { debounce } from "../utils/function.ts";

export default () => {
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
		<div class="app">
			<Input isError={isError} isLoading={isLoading} onCopy={onCopy} onPronounce={onPronounce} onSwap={onSwap} onClear={onClear} onTextChange={onTextChange} text={input} />
			<IPA isError={isError} isLoading={isLoading} text={ipa} onCopy={onCopy} />
			<Translation isError={isError} isLoading={isLoading} text={translation} onCopy={onCopy} onPronounce={onPronounce} onSwap={onSwap} />
		</div>
	);
};
