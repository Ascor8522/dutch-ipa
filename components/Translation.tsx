import Card, { CardProps, Copyable, Pronounceable, Swappable } from "../islands/Card.tsx";

export default (props: TranslationProps) => {
	return (
		<Card
			{...props}
			title="Translation"
			isReadonly
			isClosed
			allowCopy
			allowPronounce
			allowSwap
		/>
	);
};

interface TranslationProps extends CardProps, Copyable, Pronounceable, Swappable {

}
