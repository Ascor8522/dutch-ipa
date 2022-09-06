/** @jsx h */

import { tw } from "@twind";
import { h } from "preact";
import { useState } from "preact/hooks";

import { Card, CardProps } from "../components/Card.tsx";

export default ({ copy, clear, pronounce, swap }: InputProps) => {
	return (
		<Card
			title="Input"
			allowCopy copy={copy}
			allowClear clear={clear}
			allowPronounce pronounce={pronounce}
			allowSwap swap={swap}
		/>
	);
};

type InputProps = Pick<CardProps, "copy" | "clear" | "pronounce" | "swap">;
