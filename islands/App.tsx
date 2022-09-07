/** @jsx h */

import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import Input from "../islands/Input.tsx";
import IPA from "../islands/IPA.tsx";
import Translation from "../islands/Translation.tsx";
import { debounce } from "../utils/function.ts";

export default () => {
	const [input, setInput] = useState("");
	const [ipa, setIPA] = useState("");
	const [translation, setTranslation] = useState("");

	useEffect(() => {
		fetch("/api/ipa", { method: "POST", body: input })
			.then((res) => res.json())
			.then((res) => {
				setIPA(JSON.stringify(res));
				setTranslation(JSON.stringify(res));
			});
	}, [input]);

	const isError = false;
	const isLoading = false;

	const onCopy = async (text: string) => await navigator.clipboard.writeText(text);
	const onPronounce = () => { };
	const onSwap = () => { };
	const onClear = () => { };
	const onTextChange = debounce(setInput, 1000);

	return (
		<div class="app">
			<Input isError={isError} isLoading={isLoading} onCopy={onCopy} onPronounce={onPronounce} onSwap={onSwap} onClear={onClear} onTextChange={onTextChange} />
			<IPA isError={isError} isLoading={isLoading} text={ipa} onCopy={onCopy} />
			<Translation isError={isError} isLoading={isLoading} text={translation} onCopy={onCopy} onPronounce={onPronounce} onSwap={onSwap} />
		</div>
	);
};
