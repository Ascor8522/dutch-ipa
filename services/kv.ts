const kvId = Deno.env.get("DENO_KV_ID");
const kvUrl = kvId && Deno.env.get("DENO_KV_ACCESS_TOKEN") ? `https://api.deno.com/databases/${kvId}/connect` : undefined;
const kv = await Deno.openKv(kvUrl);

export const NotInKV = Symbol("NotInKV");
export type NotInKV = typeof NotInKV;

export const missing = <K extends string, V extends NotInKV | unknown>(
	a: Record<K, V>,
): { present: Record<K, Exclude<V, NotInKV>>; absent: K[] } => {
	const presentTuples: [K, Exclude<V, NotInKV>][] = [];
	const absent: K[] = [];
	Object
		.entries(a)
		.map(([key, value]) => [key as K, value as V] as const)
		.forEach(([key, value]) => {
			if (value === NotInKV) absent.push(key);
			else presentTuples.push([key, value as Exclude<V, NotInKV>]);
		});
	const present = Object.fromEntries(presentTuples) as Record<K, Exclude<V, NotInKV>>;
	return { present, absent };
};

export const getFromKV = <T>(keys: Deno.KvKey[]) =>
	Promise
		.resolve()
		.then(() => keys.map((key) => kv.get<T>(key)))
		.then((p) => Promise.allSettled(p))
		.then((results) => results.map((result) => result.status === "fulfilled" ? result.value.value ?? NotInKV : NotInKV));

export const storeInKV = <T>(tuple: [Deno.KvKey, T][]) =>
	Promise
		.resolve()
		.then(() => tuple.map(([key, value]) => kv.set(key, value)))
		.then((p) => Promise.all(p))
		.catch((err) => {
			console.error("[KV] Failed to store in KV", err);
			throw err;
		});
