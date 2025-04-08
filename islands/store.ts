import { batch, effect, signal } from "@preact/signals";
import { debounce } from "async";

export const text = signal("");
export const setText = (newText: string) => {
	if (newText === text.value) return;
	text.value = newText;
};
export const copyText = () => {
	navigator.clipboard.writeText(text.value);
	alert("Text copied to clipboard");
};
export const isLoading = signal(false);
export const ipa = signal<(string | null)[] | null>(null);
export const copyIPA = () => {
	navigator.clipboard.writeText((ipa.value ?? []).join(" "));
	alert("IPA copied to clipboard");
};
export const error = signal<Error | null>(null);

const sentenceToWords = (sentence: string): string[] =>
	sentence
		.normalize("NFKC")
		.toLowerCase()
		.match(/[\p{L}]+/gu) ??
		[];

const fetchIPA = async () => {
	const words = sentenceToWords(text.value);

	if (!words.length) {
		ipa.value = null;
		isLoading.value = false;
		error.value = null;
		return;
	}

	const value = await Promise
		.resolve()
		.then(() => isLoading.value = true)
		.then(() =>
			fetch("/api/ipa", {
				method: "POST",
				body: JSON.stringify({
					words: [...new Set(words)],
					lang: "nl",
				}),
				signal: AbortSignal.timeout(2000),
			})
		)
		.then((response) => {
			if (!response.ok) throw new Error("Failed to fetch IPA", { cause: response.statusText });
			return response.json();
		})
		.then((data) => words.map((word) => data[word]))
		.catch((err) => {
			error.value = err.message;
			console.error(err);
		})
		.finally(() => isLoading.value = false);
	ipa.value = value ?? null;
};

const batched = () => batch(fetchIPA);

const debounced = debounce(batched, 500);

effect(() => {
	if (!text.value) return void (ipa.value = null);
	debounced();
});
