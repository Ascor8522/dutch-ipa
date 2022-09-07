import { connect } from "redis";

import { getUnique, zip } from "../../utils/array.ts";
import { IPAAlreadyInDBButNull, IPANotCouldNotScrape, IPANotInDB } from "../ipa/index.ts";

export const redis = await connect({
	hostname: Deno.env.get("DATABASE_HOSTNAME") ?? "localhost",
	port: parseInt(Deno.env.get("DATABASE_PORT") ?? "6379"),
	name: Deno.env.get("DATABASE_NAME") ?? "name",
	username: Deno.env.get("DATABASE_USERNAME") ?? "username",
	password: Deno.env.get("DATABASE_PASSWORD") ?? "password",
});

export const redisGet = (keys: string[]): Promise<Record<string, string | typeof IPANotInDB | typeof IPAAlreadyInDBButNull>> => Promise
	.resolve(keys)
	.then(getUnique)
	.then(keys => Promise.all([keys.length
		? redis.mget(...keys).then(res => res.map(s => {
			switch(s) {
				case null:
				case undefined:
					return IPANotInDB;
				case "": return IPAAlreadyInDBButNull;
				default: return s as string;
			}
		}))
		: [] as string[], keys]))
	.then(([res, keys]) => zip(keys, res))
	.then(Object.fromEntries);

export const redisSet = (values: Record<string, string | typeof IPANotCouldNotScrape>): Promise<void> => Promise
	.resolve(values)
	.then(values => Object.entries(values))
	.then(entries => entries.map(([k, v]) => {
		switch(v) {
			case IPANotCouldNotScrape: return [k, ""] as [string, string];
			default: return [k, v] as [string, string];
		}
	}))
	.then(entries => entries.length ? redis.mset(...entries) : null)
	.then();

export const redisFlush = (): Promise<void> => redis
	.flushdb()
	.then();
