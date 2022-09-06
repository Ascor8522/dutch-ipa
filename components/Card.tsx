/** @jsx h */

import { tw } from "@twind";
import { Fragment, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

import { ToggleSwitch } from "./ToggleSwitch.tsx";

export const Card = ({ cannotBeDisabled, disabled, title, text, onTextChange, readonly, allowCopy, copy = () => {}, allowClear, clear = () => {}, allowPronounce, pronounce = () => {}, allowSwap, swap = () => {} }: CardProps) => {
	const [isDisabled, setIsDisabled] = useState(!!disabled);

	const textBox = useRef<HTMLDivElement>(null);
	const getText = () => {
		console.log(textBox.current);
		return textBox.current?.innerText ?? "";
	};

	return (
		<section class={tw`container flex flex-col p-4 gap-4 md:rounded-lg`}>
			<nav class={tw`flex flex-row gap-4`}>
				<ToggleSwitch enabled={isDisabled} setEnabled={setIsDisabled as () => boolean} />
				<h2 class={tw`text-lg`}>{title}</h2>
			</nav>
			{
				!isDisabled && (
					<Fragment>
						<div class={tw(`p-4 min-h-0`, { "empty:hidden": readonly })} contentEditable={!readonly} value={text} ref={textBox} />
						<nav class={tw`flex flex-row gap-4 justify-end`}>
							{allowCopy && <button onClick={() => copy(getText())} ><img class={tw`aspect-square w-6`} src="/icons/content_copy.svg" /></button>}
							{allowPronounce && <button onClick={() => pronounce(getText())} ><img class={tw`aspect-square w-6`} src="/icons/volume_up.svg" /></button>}
							{allowSwap && <button onClick={swap} ><img class={tw`aspect-square w-6`} src="/icons/swap_vert.svg" /></button>}
							{allowClear && <button onClick={clear} ><img class={tw`aspect-square w-6`} src="/icons/close.svg" /></button>}
						</nav>
					</Fragment>
				)
			}
		</section>
	);
};

type Allow<T extends string> = { [K in keyof T as `allow${Capitalize<K & string>}`]: true; } & { [K in keyof T as Lowercase<K & string>]: Function; };

export type CardProps = {
	cannotBeDisabled?: true;
	disabled?: true;
	title: string;
	text?: string;
	onTextChange?: (text: string) => void;
	readonly?: true;

	allowCopy?: true;
	copy?: (text: string) => void;

	allowClear?: true;
	clear?: () => void;

	allowPronounce?: true;
	pronounce?: Function;

	allowSwap?: true;
	swap?: () => void;
};
