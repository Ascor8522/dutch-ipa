export const sentenceToWords = (sentence: string): string[] =>
	sentence
	.normalize("NFKC")
	.toLowerCase()
	.match(/[\p{L}]+/gu) || [];
