import classnames from "classnames";
import { Ref, useEffect, useRef, useState } from "preact/hooks";

import ToggleSwitch from "../components/toggle/ToggleSwitch.tsx";

export default ({ ...props }: CardProps & Copyable & Clearable & Pronounceable & Swappable) => {
	const [isEnabled, setIsEnabled] = useState(!props.isClosed);

	const displayedText =
		props.error?.message ??
		(props.isLoading ? "" : undefined) ??
		props.text ??
		"";
	const textBox = useRef<HTMLDivElement>(null);

	const onCheckChanged = (checked: boolean) => setIsEnabled(checked);
	const onInput = () => props.onTextChange?.(getText());
	const onPaste = (e: ClipboardEvent) => {
		e.preventDefault();
		const text = e.clipboardData?.getData("text/plain")?.trim() ?? "";
		document.execCommand("insertHTML", false, text);
	};

	const getText = () => textBox.current?.innerText ?? "";
	const toggleEnabled = () => setIsEnabled(isEnabled => props.cannotBeDisabled ?? !isEnabled);

	return (
		<section class="card">
			<nav>
				<ToggleSwitch isChecked={props.cannotBeDisabled ?? isEnabled} isDisabled={props.cannotBeDisabled} onCheckChanged={onCheckChanged} />
				<h2 onClick={toggleEnabled}>{props.title || ""}</h2>
			</nav>
			{
				isEnabled && (
					<div>
						<div class={classnames("text-input", { "is-loading": props.isLoading, "error": props.error })} onInput={onInput} contentEditable={!props.isReadonly} autofocus={!props.isReadonly} onPaste={onPaste} ref={textBox} >{displayedText}</div>
						<nav>
							{
								([
									[props.allowCopy, () => props.onCopy?.(getText()), "Copy", "/icons/content_copy.svg"],
									[props.allowPronounce, () => props.onPronounce?.(getText()), "Pronounce", "/icons/volume_up.svg", true],
									[props.allowSwap, () => props.onSwap?.(), "Swap", "/icons/swap_vert.svg", true],
									[props.allowClear, () => props.onClear?.(textBox), "Clear", "/icons/close.svg"],
								] as const)
									.map(([allow, func, title, icon, disabled]) => (
										allow && (
											<button onClick={func} title={title} disabled={disabled}>
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
	error?: Error | null;
	isLoading?: boolean;
	isClosed?: true;
	isReadonly?: true;
	onTextChange?: (text: string) => void;
	text?: string;
	title?: string;
}

export interface Copyable {
	allowCopy?: true;
	onCopy?: (text: string) => void;
}

export interface Clearable {
	allowClear?: true;
	onClear?: (div: Ref<HTMLDivElement>) => void;
}

export interface Pronounceable {
	allowPronounce?: true;
	onPronounce?: Function;
}

export interface Swappable {
	allowSwap?: true;
	onSwap?: () => void;
}
