export default ({ message }: ErrorProps) => {
	return (
		<div class="border p-6 rounded-lg text-center font-bold">
			{message}
		</div>
	);
};

interface ErrorProps {
	message: string;
}
