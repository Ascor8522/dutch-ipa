/** @jsx h */

import { tw } from "@twind";
import { h } from "preact";
import { useState } from "preact/hooks";

import { Card, CardProps } from "../components/Card.tsx";

export default ({ copy }: IPAProp) => {
	return (
		<Card
			title="IPA"
			readonly
			allowCopy copy={copy}
			/>
	);
};

type IPAProp = Pick<CardProps, "copy">;
