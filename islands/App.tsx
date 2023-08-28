import "preact/debug";

import { debounce } from "async/debounce.ts";
import { Fragment } from "preact";
import { Ref, useState } from "preact/hooks";

import Error from "../components/Error.tsx";
import IPA from "../components/IPA.tsx";
import Input from "../components/Input.tsx";
import Translation from "../components/Translation.tsx";
import { useFetch } from "../hooks/useFetch.ts";
import { Word } from "../services/index.ts";
import { rearrange } from "../utils/array.ts";
import { sentenceToWords } from "./../utils/string.ts";

export default ({ }: AppProps) => {
	const [input, setInput] = useState("");

	const { isLoading, error, data } = useFetch<{ ipa: Record<Word, string | null>, translation?: string; }>(input);
	const ipa = rearrange(sentenceToWords(input), data?.ipa ?? {}).map(word => word ?? "🤔").join(" ") ?? "";
	const translation = data?.translation ?? "";

	const onCopy = (text: string) => navigator
		.clipboard
		.writeText(text)
		.then(() => alert("Copied!"))
		.catch(() => alert("Failed to copy!"));
	const onPronounce = () => { };
	const onSwap = () => setInput(translation);
	const onClear = (d: Ref<HTMLDivElement>) => d.current && (d.current.innerHTML = "");
	const onTextChange = debounce((text: string) => {
		setInput(text);
		const url = new URL(window.location.toString());
		url.hash = encodeURIComponent(text);
		history.pushState({ text }, "", window.location.href);
	}, 800);
	window.onpopstate = (event: PopStateEvent) => setInput(event.state.text);

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
					<Error errorMessage="You need to have JavaScript enabled to use the website properly." />
				</noscript>
				<Input
					placeholder="Write a sentence here..."
					onCopy={onCopy}
					onPronounce={onPronounce}
					onSwap={onSwap}
					onClear={onClear}
					onTextChange={onTextChange} />
				<IPA
					text={ipa}
					error={error}
					isLoading={isLoading}
					onCopy={onCopy} />
				<Translation
					text={translation}
					error={error}
					isLoading={isLoading}
					onCopy={onCopy}
					onPronounce={onPronounce}
					onSwap={onSwap} />
			</div>
		</Fragment>
	);
};

interface AppProps {

}
