import Card, { CardProps, Clearable, Copyable, Pronounceable, Swappable } from "../islands/Card.tsx";

export default (props: InputProps) => {
	return (
		<Card
			{...props}
			title="Input"
			cannotBeDisabled
			allowCopy
			allowClear
			allowPronounce
			allowSwap
		/>
	);
};

interface InputProps extends CardProps, Copyable, Clearable, Pronounceable, Swappable {

}
