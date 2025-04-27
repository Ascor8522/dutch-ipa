import Card from "@islands/Card.tsx";
import { copyIPA, copyText } from "@islands/store.ts";

export default () => {
	return (
		<>
			<Card
				type="input"
				title="Input"
				placeholder="Write a sentence here..."
				onCopy={copyText}
			/>
			<Card
				type="ipa"
				title="IPA"
				placeholder="IPA will appear here..."
				onCopy={copyIPA}
			/>
		</>
	);
};
