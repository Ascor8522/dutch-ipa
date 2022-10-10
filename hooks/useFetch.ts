import { useEffect, useState } from "preact/hooks";

interface FetchStatus<T> {
	isLoading: boolean;
	error: Error | null;
	data: T | null;
}

export const useFetch = <T>(text: string): FetchStatus<T> => {
	const [state, setState] = useState<FetchStatus<T>>({ isLoading: false, error: null, data: null });
	if(!text) return state;
	useEffect(() => {
		Promise
			.resolve()
			.then(() => setState({ isLoading: true, error: null, data: null }))
			.then(() => fetch("/api", {
				method: "POST",
				body: JSON.stringify({
					input: { lang: "nl", text, },
					ipa: true,
					translation: { lang: "en", }
				}),
			}))
			.then(res => {
				if(!res.ok) throw new Error(res.statusText);
				return res;
			})
			.then(res => res.json())
			.then(data => setState({ isLoading: false, error: null, data }))
			.catch((error: Error) => setState({ isLoading: false, error, data: null }));
	}, [text]);
	return state;
};
