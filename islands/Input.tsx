/** @jsx h */

import { h } from "preact";

import { Card, CardProps, Clearable, Copyable, Pronounceable, Swappable } from "../components/Card.tsx";

export default ({ onCopy, onClear, onPronounce, onSwap, onTextChange }: InputProps) => {
	return (
		<Card
			title="Input"
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
