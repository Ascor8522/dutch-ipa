/** @jsx h */

import { h } from "preact";

import Card, { CardProps, Clearable, Copyable, Pronounceable, Swappable } from "../islands/Card.tsx";

export default ({ onCopy, onClear, onPronounce, onSwap, onTextChange, text }: InputProps) => {
	return (
		<Card
			title="Input"
			text={text}
			cannotBeDisabled
			onTextChange={onTextChange}
			allowCopy onCopy={onCopy}
			allowClear onClear={onClear}
			allowPronounce onPronounce={onPronounce}
			allowSwap onSwap={onSwap}
		/>
	);
};

interface InputProps extends CardProps, Copyable, Clearable, Pronounceable, Swappable {

}
