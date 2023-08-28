import { useEffect, useState } from "preact/hooks";

export interface FetchLoading {
	isLoading: true;
	error: null;
	data: null;
}

export interface FetchError {
	isLoading: false;
	error: Error;
	data: null;
}

export interface FetchData<T> {
	isLoading: false;
	error: null;
	data: T;
}

export type FetchStatus<T> =
	| FetchLoading
	| FetchError
	| FetchData<T>;

export const useFetch = <T>(text: string): FetchStatus<T> => {
	// isLoading to false to prevent loading animation on landing
	const [state, setState] = useState<FetchStatus<T>>({ isLoading: false, error: null, data: null } as unknown as FetchLoading);

	if(!text) return state;

	useEffect(() => {
		Promise
			.resolve()
			.then(() => setState({ isLoading: true, error: null, data: null }))
			.then(() => fetch("/api", {
				method: "POST",
				body: JSON.stringify({
					input: { lang: "nl", text, },
					ipa: {},
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
