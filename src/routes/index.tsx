import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import IpaChip from '../components/IpaChip';
import ThemeToggle from '../components/ThemeToggle';
import { getIpaForWords } from "../server/get-ipa";

export const Route = createFileRoute('/')({ component: App });

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
}

type SentenceToken =
	| { type: 'word'; text: string; }
	| { type: 'separator'; text: string; };

function tokenizeSentence(sentence: string): SentenceToken[] {
	const parts = sentence.match(/[\p{L}\p{M}\p{N}]+(?:['’][\p{L}\p{M}\p{N}]+)*|[^\p{L}\p{M}\p{N}]+/gu) ?? [];
	return parts.map((text) => ({
		type: /^[\p{L}\p{M}\p{N}]/u.test(text) ? 'word' : 'separator',
		text,
	}));
}

function normalizeWord(word: string) {
	return word.toLocaleLowerCase('nl');
}

function App() {
	const [sentence, setSentence] = useState<string>("");
	const [ipaStore, setIpaStore] = useState<Record<string, string | null>>({});
	const tokens = useMemo(() => tokenizeSentence(sentence), [sentence]);
	const words = useMemo(
		() => tokens
			.filter((token) => token.type === 'word')
			.map((token) => normalizeWord(token.text)),
		[tokens],
	);

	const foo = useCallback(async () => {
		const unknownWords = [...new Set(words.filter((word) => ipaStore[word] === undefined))];
		if(!unknownWords.length) return;
		const res = await getIpaForWords({ data: unknownWords });
		for await(const val of res.values()) {
			setIpaStore((current) => ({ ...current, [normalizeWord(val.word)]: val.value }));
		}
	}, [words, ipaStore]);

	const debouncedSetSentence = debounce(setSentence, 1000);

	useEffect(() => {
		foo();
	}, [foo]);

	const clearSentence = () => {
		setSentence('');
		(document.getElementById("dutch-text") as HTMLTextAreaElement).value = "";
	};

	const copyIpa = async () => {
		const transcription = tokens
			.map((token) => token.type === 'word'
				? ipaStore[normalizeWord(token.text)] ?? '🤔'
				: token.text)
			.join('');
		await navigator.clipboard.writeText(transcription);
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-8 font-sans text-zinc-950 [color-scheme:light] dark:bg-zinc-950 dark:text-zinc-100 dark:[color-scheme:dark] sm:px-6 sm:py-12">
			<div className="mx-auto w-full max-w-4xl">
				<header className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
					<div className="flex items-center gap-3">
						<img className="size-10" src="/logo.svg" alt="" />
						<h1 className="m-0 text-2xl font-semibold tracking-tight sm:text-3xl">
							Dutch IPA
						</h1>
					</div>
					<div className="flex items-center gap-4">
						<a
							className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500 dark:text-zinc-300 dark:hover:text-white dark:focus-visible:outline-zinc-300"
							href="https://github.com/Ascor8522/dutch-ipa"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img className="size-4 dark:invert" src="/github.svg" alt="" />
							<span>GitHub project</span>
						</a>
						<ThemeToggle />
					</div>
				</header>

				<section
					className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-950 shadow-xl shadow-zinc-900/10 sm:p-8 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-black/50"
					aria-label="Dutch IPA converter"
				>
					<div className="mb-3 flex items-center justify-between gap-4">
						<label className="text-sm font-medium" htmlFor="dutch-text">
							Dutch sentence
						</label>
						<button
							className="cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white dark:focus-visible:outline-zinc-300"
							type="button"
							onClick={clearSentence}
						>
							Clear
						</button>
					</div>

					<textarea
						className="mb-8 block min-h-32 w-full resize-none rounded-lg border border-zinc-300 bg-white p-4 text-base leading-7 text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 [field-sizing:content] dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-700"
						id="dutch-text"
						onChange={(event) => debouncedSetSentence(event.currentTarget.value)}
						placeholder="Type a Dutch sentence…"
						rows={3}
					/>

					<div className="mb-3 flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<h2 className="m-0 text-sm font-medium">IPA transcription</h2>
							<button
								className="ipa-info-button inline-flex size-5 cursor-pointer items-center justify-center rounded-full border border-zinc-400 text-xs font-medium text-zinc-600 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-300"
								type="button"
								aria-label="About IPA transcription"
								aria-controls="ipa-info-tooltip"
								popoverTarget="ipa-info-tooltip"
								popoverTargetAction="toggle"
							>
								?
							</button>
							<div
								id="ipa-info-tooltip"
								className="ipa-info-tooltip max-w-xs rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-sans text-xs leading-5 text-white shadow-lg dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
								popover="auto"
								role="tooltip"
							>
								IPA (International Phonetic Alphabet) shows how each Dutch word is
								pronounced.
								<br />
								Hover over a chip to see its original word.
								<br />
								For more help
								with Dutch IPA and phonology, see{' '}
								<a
									href="https://simple.wikipedia.org/wiki/Help:IPA/Dutch"
									target="_blank"
									rel="noopener noreferrer"
									className="underline underline-offset-2 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
								>
									this Dutch IPA and phonology guide
								</a>.
							</div>
						</div>
						<button
							className="cursor-pointer rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus-visible:outline-zinc-300"
							type="button"
							onClick={copyIpa}
						>
							Copy IPA
						</button>
					</div>

					<div
						className="min-h-20 whitespace-pre-wrap break-words rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-lg leading-10 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
						aria-live="polite"
					>
						{!!tokens.filter(token => token.type === 'word').length ? (
				tokens.map((token, index) => token.type === 'word' ? (
					<IpaChip
						key={`${index}-${token.text}`}
						ipa={ipaStore[normalizeWord(token.text)] ?? null}
									word={token.text}
								/>
							) : (
								<span key={`${index}-${token.text}`}>{token.text}</span>
							))
						) : (
							<span className="font-sans text-sm text-zinc-500 dark:text-zinc-400">
								Your transcription will appear here
							</span>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}
