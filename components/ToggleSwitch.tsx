/** @jsx h */

import { tw } from "@twind";
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

export const ToggleSwitch = ({ enabled, setEnabled }: ToggleSwitchProps) => {
	return (
		<label class={tw`relative inline-block w-10 h-4`}>
			<input class={tw`opacity-0 w-0 h-0`} type="checkbox" checked={enabled} />
			<span class={tw(
				`absolute cursor-pointer inset-0 bg-sky-500 rounded-full transition delay-400`,
				`before:absolute before:content-[''] before:h-3 before:w-3 before:left-1 before:bottom-1 before:bg-white before:transition before:delay-400`)}></span>
		</label>
	);
};

interface ToggleSwitchProps {
	enabled?: boolean;
	setEnabled: () => boolean;
}
