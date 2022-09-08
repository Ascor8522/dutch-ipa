/** @jsx h */

import classnames from "classnames";
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

export default ({ isDisabled, isChecked, onCheckChanged }: ToggleSwitchProps) => {
	const input = useRef<HTMLInputElement>(null);

	useEffect(() => { }, [isChecked]);

	return (
		<label class={classnames("toggle-switch", { "disabled": isDisabled })}>
			<input type="checkbox" checked={isChecked} disabled={isDisabled} ref={input} onChange={() => onCheckChanged?.(input.current?.checked || false)} />
			<span></span>
		</label>
	);
};

interface ToggleSwitchProps {
	isDisabled?: true;
	isChecked?: boolean;
	onCheckChanged?: (checked: boolean) => void;
}
