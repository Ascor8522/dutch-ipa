import { IPA_AVAILABLE } from "@/routes/api/ipa/(_service)/index.ts";

const getIpa = (word: string) =>
  wait(0)
    .then(() => console.log("ok", word))
    .then(() => word as IPA_AVAILABLE);

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export default getIpa;
