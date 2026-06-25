import {State} from "@/utils.ts";
import {Context} from "fresh";

export async function jsonl<T>(gen: AsyncGenerator<T, void, undefined>) {
  const arr = await Array.fromAsync(gen);
  const lines = arr.map((item) => JSON.stringify(item)).join("\n");
  return new Response(lines, {
    headers: {
      "content-type": "application/jsonl",
      "cache-control": "no-cache",
    },
  });
}

export async function json<T, U extends string, V>(
  gen: AsyncGenerator<T, void, undefined>,
  key: (item: T) => U,
  value: (item: T) => V,
) {
  const arr = await Array.fromAsync(gen);
  const tuples = arr.map((item) => [key(item), value(item)] as const);
  const obj = Object.fromEntries(tuples);
  return new Response(JSON.stringify(obj), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  });
}

export function streaming<T extends string | Uint8Array<ArrayBufferLike>>(
  gen: AsyncGenerator<T, void, undefined>,
  ctx: Context<State>,
) {
  return ctx.stream(gen);
}

export function serverSideEvents<T>(gen: AsyncGenerator<T, void, undefined>) {
  //   const body = ReadableStream.from(gen);
  const body = new ReadableStream({
    async start(controller) {
      for await (const chunk of gen) {
        controller.enqueue(`data: ${chunk}\n\n`);
      }
      controller.close();
    },
  });
  return new Response(body, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
    },
  });
}
