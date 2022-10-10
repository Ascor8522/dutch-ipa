import googleTranslate from "@vitalets/google-translate-api";

export const translate = (text: string, from: string, to: string): Promise<{ translation: string }> =>
	googleTranslate(text, { from, to, autoCorrect: false })
		.then(res => ({ translation: res.text }));
