import type { JSX } from "preact";

export default ({ title, iconSrc, ...props }: ActionButtonProps) => {
	return (
		<button
			{...props}
			type="button"
			class="bg-[--button-bg] hover:bg-[--button-hover] active:bg-[--button-active] disabled:bg-[--button-disabled] relative cursor-pointer disabled:cursor-default rounded-lg m-auto p-2 transition-colors flex-shrink-0"
			title={title}
		>
			<img
				src={iconSrc}
				alt={title}
				width="24px"
				height="24px"
				class="invert w-6 h-auto"
			/>
		</button>
	);
};

interface ActionButtonProps extends JSX.ButtonHTMLAttributes {
	iconSrc: string;
}
