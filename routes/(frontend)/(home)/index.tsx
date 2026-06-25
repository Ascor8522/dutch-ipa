import {TextInput} from "@/routes/(frontend)/(home)/(_islands)/text-input.tsx";
import {define} from "@/utils.ts";

export default define.page(function Home() {
  return (
    <div class="min-h-screen bg-gray-950 px-4 py-10">
      <div class="mx-auto flex max-w-screen-md flex-col items-center justify-center gap-6">
        <h1 class="text-center text-4xl font-bold text-white">
          Dutch IPA Transcriber
        </h1>
        <p class="text-center text-gray-300">
          Enter a Dutch sentence and get the IPA transcription for the full
          sentence.
        </p>
        <TextInput />
      </div>
    </div>
  );
});
