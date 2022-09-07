import { z } from "zod";

export function debounce<Fun extends (...args: any) => void, Args extends Parameters<Fun>>(fn: Fun, delay = 1000): Fun {
	let timer = null as number | null;
	return function(this: Function) {
		const args = arguments as IArguments & Args[];
		if(timer) clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			return fn.apply(this, args);
		}, delay);
	} as Fun;
}
export function parse<T extends z.ZodSchema<any>>(schema: T, data: any): data is z.infer<T> {
	return schema.safeParse(data).success;
}
