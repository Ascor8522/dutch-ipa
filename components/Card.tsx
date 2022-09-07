/** @jsx h */

import classnames from "classnames";
import { Fragment, h } from "preact";
import { useRef, useState } from "preact/hooks";

import { ToggleSwitch } from "./ToggleSwitch.tsx";

export const Card = ({
	cannotBeDisabled, isError, isLoading, isClosed, isReadonly, onTextChange, placeholder, text, title,
	allowCopy, onCopy = () => { }, allowClear, onClear = () => { }, allowPronounce, onPronounce = () => { }, allowSwap, onSwap = () => { }
}: CardProps & Copyable & Clearable & Pronounceable & Swappable) => {

	const [isEnabled, setIsEnabled] = useState(!isClosed);

	const textBox = useRef<HTMLDivElement>(null);
	const getText = () => textBox.current?.innerText ?? "";
	const onCheckChanged = (checked: boolean) => setIsEnabled(checked);
	const onInput = () => getText() && onTextChange?.(getText());

	return (
		<section class="card">
			<nav>
				<ToggleSwitch isChecked={isEnabled || cannotBeDisabled} isDisabled={cannotBeDisabled} onCheckChanged={onCheckChanged} />
				<h2>{title || ""}</h2>
			</nav>
			{
				isEnabled && (
					<Fragment>
						<div class={classnames({ "is-loading": isLoading })} onInput={onInput} contentEditable={!isReadonly} ref={textBox}>{text ?? ""}</div>
						<nav>
							{allowCopy && <button onClick={() => onCopy(getText())} ><img src="/icons/content_copy.svg" alt="Copy" /></button>}
							{allowPronounce && <button onClick={() => onPronounce(getText())} ><img src="/icons/volume_up.svg" alt="Pronounce" /></button>}
							{allowSwap && <button onClick={onSwap} ><img src="/icons/swap_vert.svg" alt="Swap" /></button>}
							{allowClear && <button onClick={onClear} ><img src="/icons/close.svg" alt="Close" /></button>}
						</nav>
					</Fragment>
				)
			}
		</section>
	);
};

export interface CardProps {
	cannotBeDisabled?: true;
	isError?: boolean;
	isLoading?: boolean;
	isClosed?: true;
	isReadonly?: true;
	onTextChange?: (text: string) => void;
	placeholder?: string;
	text?: string;
	title?: string;
}

export interface Copyable {
	allowCopy?: true;
	onCopy?: (text: string) => void;
}

export interface Clearable {
	allowClear?: true;
	onClear?: () => void;
}

export interface Pronounceable {
	allowPronounce?: true;
	onPronounce?: Function;
}

export interface Swappable {
	allowSwap?: true;
	onSwap?: () => void;
}
