import Card, { CardProps, Copyable } from "../islands/Card.tsx";

export default (props: IPAProp) => {
	return (
		<Card
			{...props}
			title="IPA"
			isReadonly
			allowCopy
		/>
	);
};

interface IPAProp extends CardProps, Copyable {

}
