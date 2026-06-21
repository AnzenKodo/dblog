import { ensureDirSync } from "https://deno.land/std@0.139.0/fs/mod.ts";

import { data } from "./text/text.js";
import { docs } from "./text/docs.js";
import { post, template } from "./text/post.js";
import { workflow } from "./text/workflow.js";

const gitignore = `site/`;
export default function setup() {
  ensureDirSync("./posts/");
  ensureDirSync("./.github/workflows");
  Deno.writeTextFileSync("./.gitignore", gitignore);
  Deno.writeTextFileSync("./config.json", JSON.stringify(data, null, 2));
  Deno.writeTextFileSync("./posts/dblog-Docs.md", docs);
  Deno.writeTextFileSync("./posts/_template.md", template);
  Deno.writeTextFileSync("./posts/First-Post.md", post);
  Deno.writeTextFileSync("./.github/workflows/build.yml", workflow);
}
