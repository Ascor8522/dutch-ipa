import {
  fetchTranscriptionAtom,
  inputWordsAtom,
  ipaCacheReducerAtom,
  sentenceIpaAtom,
  textInputAtom,
  transcriptionRequestAtom,
} from "@/routes/(frontend)/(_utils)/store.ts";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "preact/hooks";

export function TextInput() {
  const [textInput, setTextInput] = useAtom(textInputAtom);
  const inputWords = useAtomValue(inputWordsAtom);
  const sentenceIpa = useAtomValue(sentenceIpaAtom);
  const request = useAtomValue(transcriptionRequestAtom);
  const fetchTranscription = useSetAtom(fetchTranscriptionAtom);
  const clearCache = useSetAtom(ipaCacheReducerAtom);

  useEffect(() => {
    void fetchTranscription();
  }, [fetchTranscription, inputWords.join("|")]);

  return (
    <div class="w-full rounded-lg bg-gray-900/70 p-6 text-white shadow-lg">
      <label
        for="sentence"
        class="mb-2 block text-sm font-medium text-gray-200"
      >
        Dutch sentence
      </label>
      <input
        id="sentence"
        class="block w-full rounded-md bg-gray-800 px-3 py-2 text-base text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
        placeholder="Bijvoorbeeld: hallo wereld"
        value={textInput}
        onChange={(e) => setTextInput(e.currentTarget.value)}
      />

      <div class="mt-4 flex items-center justify-between gap-3">
        <p class="text-xs text-gray-400">
          Words: {inputWords.length > 0 ? inputWords.join(", ") : "-"}
        </p>
        <button
          type="button"
          class="rounded bg-gray-700 px-3 py-1 text-xs text-gray-100 hover:bg-gray-600"
          onClick={() => clearCache({ type: "clear" })}
        >
          Clear local cache
        </button>
      </div>

      <div class="mt-6 rounded-md bg-gray-800 p-4">
        <h2 class="text-sm font-semibold text-lime-400">IPA transcription</h2>
        <p class="mt-2 text-lg leading-relaxed">
          {sentenceIpa || "Type a Dutch sentence to see IPA."}
        </p>
        {request.loading && (
          <p class="mt-2 text-xs text-gray-300">Transcribing…</p>
        )}
        {request.error && (
          <p class="mt-2 text-xs text-red-300">{request.error}</p>
        )}
      </div>
    </div>
  );
}
