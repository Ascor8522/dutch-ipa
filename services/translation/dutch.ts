import googleTranslate from "@vitalets/google-translate-api";

const getTranslation = (text: string, to: string) => googleTranslate(text, { from: "nl", to, autoCorrect: false })
	.then(res => ({ translation: res.text }));

export default getTranslation;
