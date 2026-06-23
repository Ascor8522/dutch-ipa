export const IPA_NOT_AVAILABLE = Symbol("IPA_UNAVAILABLE");
export const IPA_NOT_IN_KV = Symbol("NotInKV");

export type IPA_AVAILABLE = string & { readonly brand: unique symbol };
export type IPA_NOT_AVAILABLE = typeof IPA_NOT_AVAILABLE;
export type IPA_NOT_IN_KV = typeof IPA_NOT_IN_KV;

export type IPA_IN_KV =
  | IPA_AVAILABLE
  | IPA_NOT_AVAILABLE;

export type IPA =
  | IPA_IN_KV
  | IPA_NOT_IN_KV;
