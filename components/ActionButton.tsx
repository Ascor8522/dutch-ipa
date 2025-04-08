export default ({ action, title, iconSrc }: ActionButtonProps) => {
	return (
		<button
			type="button"
			onClick={action}
			title={title}
			class="bg-[--button-bg] hover:bg-[--button-hover] relative cursor-pointer rounded-lg m-auto p-2 transition-colors"
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

interface ActionButtonProps {
	action: () => void;
	title: string;
	iconSrc: string;
}
