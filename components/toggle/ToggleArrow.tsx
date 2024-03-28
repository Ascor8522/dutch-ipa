import Toggle, { ToggleProps } from "./Toggle.tsx";

export default (props: ToggleArrowProps) => {
	return (
		<Toggle className="arrow" {...props}>
			<img src="/icons/expand.svg" />
		</Toggle>
	);
};

interface ToggleArrowProps extends ToggleProps {

}
