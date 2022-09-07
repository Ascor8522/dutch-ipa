import googleTranslate from "google-translate-open-api";

export const translate = (text: string, from: string, to: string): Promise<{ translation: string }> =>
	googleTranslate(text, { tld: "com", from, to })
		.then(res => res.data[0])
		.then(translation => ({ translation }));
