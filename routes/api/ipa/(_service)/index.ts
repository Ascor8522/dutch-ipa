export type WORD = string & { readonly brand: unique symbol };
export type LANG = string & { readonly brand: unique symbol };
export type AVAILABLE = string & { readonly brand: unique symbol };
export type NOT_AVAILABLE = -1 & { readonly brand: unique symbol };
export type NOT_IN_KV = -2 & { readonly brand: unique symbol };

export type IN_KV =
  | AVAILABLE
  | NOT_AVAILABLE;

export type IPA =
  | IN_KV
  | NOT_IN_KV;

export const NOT_AVAILABLE = -1 as NOT_AVAILABLE;
export const NOT_IN_KV = -2 as NOT_IN_KV;
