import { clsx } from "clsx";

import ActionButton from "@components/ActionButton.tsx";
import { copy, error, ipa, isLoading, text } from "@islands/store.ts";

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
						class="block min-h-4 p-4 cursor-text bg-[--card-input-bg] rounded-lg focus-visible:outline-[2px_solid] flex-grow flex-shrink text-xl min-w-0"
						onInput={(e) => text.value = e.currentTarget.value}
						autofocus
						value={text}
					/>
				)}
				{isIPA(props) && (
					<div
						class={clsx(
							"block min-h-4 p-4 cursor-text bg-[--card-input-bg] rounded-lg flex-grow text-xl",
							{ "animate-pulse": isLoading.value },
							{ "text-red-500": error.value },
						)}
					>
						{!ipa.value && (
							<>
								<span class="text-[#9ca3af]">{placeholder}</span>
							</>
						)}
						{ipa.value?.map((ipa, i) => (
							<span
								key={(ipa ?? "🤔") + i}
								title={ipa ?? "Unknown IPA"}
								class="p-1 hover:bg-[--word-hover] active:bg-[--word-active] rounded-md cursor-pointer"
								onClick={() => ipa && copy(ipa)}
							>
								{ipa ?? "🤔"}
							</span>
						))}
					</div>
				)}
				<nav class="contents">
					<ActionButton
						onClick={onCopy}
						title="Copy"
						iconSrc="/icons/content_copy.svg"
						disabled={isInput(props) ? !text.value : !ipa.value}
					/>
					{isInput(props) && (
						<ActionButton
							onClick={() => text.value = ""}
							title="Clear"
							iconSrc="/icons/close.svg"
							disabled={isInput(props) ? !text.value : !ipa.value}
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
}

interface IPACardProps extends BaseCardProps {
	type: "ipa";
}

type CardProps =
	| InputCardProps
	| IPACardProps;
