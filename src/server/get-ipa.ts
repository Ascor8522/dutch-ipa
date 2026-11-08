import { createServerFn } from '@tanstack/react-start';
import { env } from 'cloudflare:workers';
import { fetchIpaFromWoorden } from './ipa-sources/woorden-org';

export type IpaWordEntry = {
	word: string;
	value: string | null;
};

function validateWords(data: unknown) {
	if(!Array.isArray(data)) throw new Error("Expected an array");
	if(data.some((word) => typeof word !== 'string')) throw new Error("Expected an array of strings");

	return (data as string[])
		.map(word => word.trim())
		.map(word => word.toLowerCase())
		.filter(word => word.length > 0);
}

export const getIpaForWords = createServerFn({ method: 'POST' })
	.validator(validateWords)
	.handler(({ data }) => new ReadableStream<IpaWordEntry>({
		start: (controller) => Promise
			.allSettled(data.map(word => Promise
				.resolve()
				.then(() => retrieveIpa(word))
				.then(entry => {
					if(entry) controller.enqueue(entry);
				})
				.catch(err => console.error(err))
			))
			.then(() => controller.close()),
	}));

async function retrieveIpa(word: string): Promise<IpaWordEntry | null> {
	const key = `.ipa.nl.${word}`;

	let value = await env.KV.get(key);
	if(value === null) {
		value = await fetchIpaFromWoorden(word).catch(() => null);
		if(value !== null) await env.KV.put(key, value);
	}

	return { word, value };
}
