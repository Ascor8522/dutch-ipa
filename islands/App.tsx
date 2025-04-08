import Card from "@islands/Card.tsx";
import { copyIPA, copyText, error, ipa, isLoading, setText, text } from "@islands/store.ts";

export default () => {
	return (
		<>
			<Card
				type="input"
				title="Input"
				placeholder="Write a sentence here..."
				onCopy={copyText}
				text={text}
				onTextChange={setText}
				onClear={() => setText("")}
			/>
			<Card
				type="ipa"
				title="IPA"
				placeholder="IPA will appear here..."
				onCopy={copyIPA}
				isLoading={isLoading}
				ipa={ipa}
				error={error}
			/>
		</>
	);
};
