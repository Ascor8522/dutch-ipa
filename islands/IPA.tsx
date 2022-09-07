/** @jsx h */

import { h } from "preact";

import { Card, CardProps, Copyable } from "../components/Card.tsx";

export default ({ text, isError, isLoading, isClosed, onCopy }: IPAProp) => {
	return (
		<Card
			title="IPA"
			text={text}
			isError={isError}
			isLoading={isLoading}
			isClosed={isClosed}
			isReadonly
			allowCopy onCopy={onCopy}
		/>
	);
};

interface IPAProp extends CardProps, Copyable {

}
