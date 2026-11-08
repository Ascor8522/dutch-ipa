import { load } from 'cheerio';

export async function fetchIpaFromWoorden(word: string): Promise<string | null> {
	const response = await fetch(`https://www.woorden.org/woord/${encodeURIComponent(word)}`, {
		signal: AbortSignal.timeout(2_000),
	});
	if(!response.ok) return null;

	const html = await response.text();
	const tableText = load(html)('table').first().text();
	const pronunciation = tableText.match(/Uitspraak:\s*\[([^\]]+)\]/i)?.[1]?.trim();

	return pronunciation || null;
}
