import { DOMParser } from "deno-dom";

export const domParser = new DOMParser();

export type Word = string & { readonly _brand: unique symbol };
