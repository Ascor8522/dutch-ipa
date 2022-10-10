export default ({ errorMessage }: ErrorProps) => {
	return (
		<div class="error">
			{errorMessage}
		</div>
	);
};

interface ErrorProps {
	errorMessage: string;
}
