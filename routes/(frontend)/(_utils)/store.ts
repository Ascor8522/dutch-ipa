import { atom } from "jotai";

export const textInputAtom = atom("hallo");

export const inputWordsAtom = atom((get) =>
  get(textInputAtom)
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, " ")
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => !!word)
);
