export function debounce<Args, Ret>(fn: (...a: Args[]) => Ret, delay = 1000) {
	let timer: number | null = null;
	return function(this: Function) {
		const args = arguments as IArguments & Args[];
		if(timer) clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			return fn.apply(this, args);
		}, delay);
	};
}
