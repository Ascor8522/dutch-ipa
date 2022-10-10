import Toggle, { ToggleProps } from "./Toggle.tsx";

export default (props: ToggleSwitchProps) => {
	return (
		<Toggle className="switch" { ...props }>
			<span></span>
		</Toggle>
	);
};

interface ToggleSwitchProps extends ToggleProps {

}
