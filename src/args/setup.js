import { ensureDirSync } from "https://deno.land/std@0.139.0/fs/mod.ts";

import { config, dblogDocs, template } from "./text.js";

export default function setup() {
  ensureDirSync("./posts/");
  Deno.writeTextFileSync("./config.json", JSON.stringify(config, null, 2));
  Deno.writeTextFileSync("./posts/dblog-Docs.md", dblogDocs);
  Deno.writeTextFileSync("./posts/_template.md", template);
}
