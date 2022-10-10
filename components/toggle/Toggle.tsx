import classnames from "classnames";
import { useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export default ({ className, isDisabled, isChecked, onCheckChanged, children }: ToggleProps & UniqueToggleProps) => {
	const input = useRef<HTMLInputElement>(null);

	return (
		<label class={classnames("toggle", className, { "disabled": isDisabled })}>
			<input type="checkbox" checked={isChecked} disabled={isDisabled} ref={input} onChange={() => onCheckChanged?.(input.current?.checked || false)} />
			{children}
		</label>
	);
};

export interface ToggleProps {
	isDisabled?: true;
	isChecked?: boolean;
	onCheckChanged?: (checked: boolean) => void;
}

interface UniqueToggleProps {
	className: string;
	children?: JSX.Element | JSX.Element[];
}
