import type { Signal } from "@preact/signals";
import { clsx } from "clsx";

import ActionButton from "@components/ActionButton.tsx";

export default (props: CardProps) => {
	const { title, placeholder, onCopy } = props;

	const isIPA = (props: CardProps): props is IPACardProps => props.type === "ipa";
	const isInput = (props: CardProps): props is InputCardProps => props.type === "input";

	return (
		<section class="flex flex-col gap-4 [box-shadow:black_0_0_20px_0] p-6 rounded-lg">
			<nav class="flex flex-row flex-wrap items-center justify-end gap-4">
				<h2 class="flex-grow text-2xl">{title}</h2>
			</nav>
			<div class="flex flex-row gap-4">
				{isInput(props) && (
					<input
						type="text"
						placeholder={placeholder}
						class="block min-h-4 p-4 cursor-text bg-[--card-input-bg] rounded-lg focus-visible:outline-[2px_solid] flex-grow text-xl"
						onInput={(e) => props.onTextChange(e.currentTarget.value)}
						autofocus
						value={props.text}
					/>
				)}
				{isIPA(props) && (
					<div
						class={clsx(
							"block min-h-4 p-4 cursor-text bg-[--card-input-bg] rounded-lg flex-grow text-xl",
							{ "animate-pulse": props.isLoading.value },
							{ "text-red-500": props.error.value },
						)}
					>
						{!props.ipa.value && (
							<>
								<span class="text-[#9ca3af]">{props.placeholder}</span>
							</>
						)}
						{props.ipa.value?.map((ipa) => (
							<span
								key={ipa}
								title={ipa ?? "🤔"}
								class="p-1"
							>
								{ipa ?? "🤔"}
							</span>
						))}
					</div>
				)}
				<nav class="contents">
					<ActionButton
						action={onCopy}
						title="Copy"
						iconSrc="/icons/content_copy.svg"
					/>
					{isInput(props) && (
						<ActionButton
							action={props.onClear}
							title="Clear"
							iconSrc="/icons/close.svg"
						/>
					)}
				</nav>
			</div>
		</section>
	);
};

interface BaseCardProps {
	title: string;
	placeholder: string;
	onCopy: () => void;
}

interface InputCardProps extends BaseCardProps {
	type: "input";
	text: Signal<string>;
	onTextChange: (text: string) => void;
	onClear: () => void;
}

interface IPACardProps extends BaseCardProps {
	type: "ipa";
	isLoading: Signal<boolean>;
	ipa: Signal<(string | null)[] | null>;
	error: Signal<Error | null>;
}

type CardProps =
	| InputCardProps
	| IPACardProps;
