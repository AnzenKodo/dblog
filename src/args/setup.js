import { ensureDirSync } from "https://deno.land/std@0.139.0/fs/mod.ts";

import { config, dlogDocs, template } from "./text.js";

export default function setup() {
  ensureDirSync("./posts/");
  Deno.writeTextFileSync("./config.json", JSON.stringify(config, null, 2));
  Deno.writeTextFileSync("./posts/Dlog-Docs.md", dlogDocs);
  Deno.writeTextFileSync("./posts/_template.md", template);
}
