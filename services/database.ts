import { connect } from "redis";

import { getUnique, zip } from "../utils/array.ts";

export const redis = await connect({
	hostname: Deno.env.get("DATABASE_HOSTNAME") ?? "localhost",
	port: parseInt(Deno.env.get("DATABASE_PORT") ?? "6379"),
	name: Deno.env.get("DATABASE_NAME") ?? "name",
	username: Deno.env.get("DATABASE_USERNAME") ?? "username",
	password: Deno.env.get("DATABASE_PASSWORD") ?? "password",
});

export const redisGet = (keys: string[]): Promise<Record<string, string | null>> => Promise
	.resolve(keys)
	.then(getUnique)
	.then(keys => Promise.all([keys.length ? redis.mget(...keys) : [], keys]))
	.then(([res, keys]) => zip(keys, res))
	.then(Object.fromEntries);

export const redisSet = (values: Record<string, string | null>): Promise<void> => Promise
	.resolve(values)
	.then(values => Object.entries(values))
	.then(entries => entries.map(([k, v]) => [k, v ?? ""] as [string, string]))
	.then(entries => entries.length ? redis.mset(...entries) : null)
	.then();
