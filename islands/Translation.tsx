/** @jsx h */

import { h } from "preact";

import { Card, CardProps, Copyable, Pronounceable, Swappable } from "../components/Card.tsx";

export default ({ text, isError, isLoading, onCopy, onPronounce, onSwap }: TranslationProps) => {
	return (
		<Card
			title="Translation"
			text={text}
			isError={isError}
			isLoading={true}
			isReadonly
			isClosed
			allowCopy onCopy={onCopy}
			allowPronounce onPronounce={onPronounce}
			allowSwap onSwap={onSwap}
		/>
	);
};

interface TranslationProps extends CardProps, Copyable, Pronounceable, Swappable {

}
