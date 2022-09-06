/** @jsx h */

import { tw } from "@twind";
import { h } from "preact";
import { useState } from "preact/hooks";

import { Card, CardProps } from "../components/Card.tsx";

export default ({ copy, pronounce, swap }: TranslationProps) => {
	return (
		<Card
			title="Translation"
			readonly
			allowCopy copy={copy}
			allowPronounce pronounce={pronounce}
			allowSwap swap={swap}
		/>
	);
};

type TranslationProps = Pick<CardProps, "copy" | "pronounce" | "swap">;
