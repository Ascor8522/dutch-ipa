/** @jsx h */

import classnames from "classnames";
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

import ToggleSwitch from "../components/ToggleSwitch.tsx";

export default ({
	cannotBeDisabled, isError, isLoading, isClosed, isReadonly, onTextChange, placeholder, text, title,
	allowCopy, onCopy = () => { }, allowClear, onClear = () => { }, allowPronounce, onPronounce = () => { }, allowSwap, onSwap = () => { }
}: CardProps & Copyable & Clearable & Pronounceable & Swappable) => {

	const [isEnabled, setIsEnabled] = useState(!isClosed);
	const [displayedText, setDisplayedText] = useState(text);

	const textBox = useRef<HTMLDivElement>(null);

	const onCheckChanged = (checked: boolean) => setIsEnabled(checked);
	const onInput = () => onTextChange && getText()
		? onTextChange(getText())
		: onClear();
	const onPaste = (e: ClipboardEvent) => {
		e.preventDefault();
		const text = e.clipboardData?.getData("text/plain")?.trim() ?? "";
		document.execCommand("insertHTML", false, text);
	};

	const getText = () => textBox.current?.innerText ?? "";
	const toggleEnabled = () => setIsEnabled(isEnabled => cannotBeDisabled ?? !isEnabled);

	useEffect(() => {
		setDisplayedText(text ?? "");
		console.log("refresh");
	}, [text]);

	return (
		<section class="card">
			<nav>
				<ToggleSwitch isChecked={cannotBeDisabled ?? isEnabled} isDisabled={cannotBeDisabled} onCheckChanged={onCheckChanged} />
				<h2 onClick={toggleEnabled}>{title || ""}</h2>
			</nav>
			{
				isEnabled && (
					<div>
						<div class={classnames("text-input", { "is-loading": isLoading })} onInput={onInput} contentEditable={!isReadonly} autofocus={!isReadonly} onPaste={onPaste} ref={textBox} >{displayedText}</div>
						<nav>
							{
								([
									[allowCopy, () => onCopy(getText()), "Copy", "/icons/content_copy.svg"],
									[allowPronounce, () => onPronounce(getText()), "Pronounce", "/icons/volume_up.svg"],
									[allowSwap, onSwap, "Swap", "/icons/swap_vert.svg"],
									[allowClear, onClear, "Clear", "/icons/close.svg"],
								] as const)
									.map(([allow, func, title, icon]) => (
										allow && (
											<button onClick={func} title={title}>
												<img src={icon} alt={title} width="24px" height="24px" />
											</button>
										)
									))
							}
						</nav>
					</div>
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
