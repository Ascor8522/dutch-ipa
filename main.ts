/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import "dotenv";

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import { DOMParser } from "deno_dom";

import manifest from "./fresh.gen.ts";

export const domParser = new DOMParser();


function render(ctx: RenderContext, render: InnerRenderFunction) {
	render();
}
await start(manifest, { render });
