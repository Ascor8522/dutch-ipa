/** @jsx h */

import { tw } from "@twind";
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

import Input from "../islands/Input.tsx";
import IPA from "../islands/IPA.tsx";
import Translation from "../islands/Translation.tsx";

export default () => {
	const [ipa, setIPA] = useState("");
	const [translation, setTranslation] = useState("");

	const onTextChange = (text: string) => { };
	const copy = async (text: string) => await navigator.clipboard.writeText(text);
	const clear = () => { };

	return (
		<Fragment>
			<Input copy={copy} />
			<IPA copy={copy} />
			<Translation copy={copy} />
		</Fragment>
	);
};
