import {
  inputWordsAtom,
  textInputAtom,
} from "@/routes/(frontend)/(_utils)/store.ts";
import { useAtom } from "jotai";

export function TextInput() {
  const [textInput, setTextInput] = useAtom(textInputAtom);
  const [inputWords] = useAtom(inputWordsAtom);

  return (
    <div>
      <input
        class="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
        value={textInput}
        onChange={(e) => setTextInput(e.currentTarget.value)}
      />

      {inputWords.join(", ")}
    </div>
  );
}
