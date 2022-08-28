import { config, dlogDocs, template } from "./text.js";

export default function readme() {
  Deno.writeTextFileSync("./README.md", dlogDocs);
}
