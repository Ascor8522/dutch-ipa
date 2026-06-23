import { State } from "@/utils.ts";
import { Context } from "fresh";

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
