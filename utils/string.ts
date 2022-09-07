export const sentenceToWords = (sentence: string): string[] => sentence.toLowerCase().match(/\w+/g) || [];
