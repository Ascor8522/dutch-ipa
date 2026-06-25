import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type IpaCache = Record<string, string | null>;

type CacheAction =
  | { type: "merge"; payload: IpaCache }
  | { type: "clear" };

type RequestState = {
  loading: boolean;
  error: string | null;
};

export const textInputAtom = atom("hallo wereld");

export const inputWordsAtom = atom((get) =>
  get(textInputAtom)
    .toLowerCase()
    .replace(/[^\p{L} ]/gu, " ")
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => !!word)
);

export const ipaCacheAtom = atomWithStorage<IpaCache>("ipa-cache-v1", {});

export const ipaCacheReducerAtom = atom(
  null,
  (get, set, action: CacheAction) => {
    const current = get(ipaCacheAtom);
    if (action.type === "clear") {
      set(ipaCacheAtom, {});
      return;
    }

    set(ipaCacheAtom, { ...current, ...action.payload });
  },
);

export const transcriptionRequestAtom = atom<RequestState>({
  loading: false,
  error: null,
});

export const missingWordsAtom = atom((get) => {
  const cache = get(ipaCacheAtom);
  return [...new Set(get(inputWordsAtom))]
    .filter((word) => cache[word] === undefined);
});

function extractPayload(block: string): string | null {
  const data = block
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .join("\n")
    .trim();

  if (!data) return null;
  return data.replace(/^data:\s*/g, "");
}

export const fetchTranscriptionAtom = atom(
  null,
  async (get, set) => {
    const missingWords = get(missingWordsAtom);

    if (missingWords.length === 0) {
      set(transcriptionRequestAtom, { loading: false, error: null });
      return;
    }

    set(transcriptionRequestAtom, { loading: true, error: null });

    try {
      const response = await fetch(
        `/api/ipa/nl?words=${encodeURIComponent(missingWords.join(","))}`,
      );

      if (!response.ok || !response.body) {
        throw new Error("Could not fetch IPA transcription");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });

        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          const payload = extractPayload(block);
          if (!payload) continue;

          const parsed = JSON.parse(payload) as {
            word: string;
            ipa: string | null;
          };
          set(ipaCacheReducerAtom, {
            type: "merge",
            payload: { [parsed.word]: parsed.ipa },
          });
        }

        if (done) break;
      }

      set(transcriptionRequestAtom, { loading: false, error: null });
    } catch {
      set(transcriptionRequestAtom, {
        loading: false,
        error: "Could not transcribe the sentence right now.",
      });
    }
  },
);

export const sentenceIpaAtom = atom((get) => {
  const words = get(inputWordsAtom);
  const cache = get(ipaCacheAtom);
  return words
    .map((word) => {
      const ipa = cache[word];
      if (ipa === undefined) return "…";
      if (ipa === null) return `(${word})`;
      return ipa;
    })
    .join(" ");
});
