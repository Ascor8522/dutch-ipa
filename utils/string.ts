import { Word } from "../services/index.ts";

export const sentenceToWords = (sentence: string): Word[] => (sentence
	.normalize("NFKC")
	.toLowerCase()
	.match(/[\p{L}]+/gu) ?? []) as Word[];
