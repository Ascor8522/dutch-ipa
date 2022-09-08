/** @jsx h */

import { h } from "preact";

export default ({ error }: ErrorProps) => {
	return (
		<div class="error">
			{error}
		</div>
	);
};

interface ErrorProps {
	error: string;
}
