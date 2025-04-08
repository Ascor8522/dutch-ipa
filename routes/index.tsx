import Error from "@components/Error.tsx";
import App from "@islands/App.tsx";

export default () => {
	return (
		<div class="w-4/5 min-h-[calc(100%-4rem)] py-8 m-auto flex flex-col justify-center gap-16">
			<div class="flex flex-row gap-4">
				<img
					src="/logo.svg"
					width="38px"
					height="38px"
					alt="Dutch IPA Logo"
				/>
				<h1 class="grow text-4xl">Dutch IPA</h1>
				<a
					href="https://github.com/Ascor8522/dutch-ipa"
					target="_blank"
					title="Dutch IPA GitHub repository"
				>
					<img
						src="/icons/github.svg"
						width="38px"
						height="38px"
						alt="GitHub Logo"
						class="invert contrast-50"
					/>
				</a>
			</div>
			<noscript>
				<Error message="You need to have JavaScript enabled to use the website properly." />
			</noscript>
			<App />
		</div>
	);
};
