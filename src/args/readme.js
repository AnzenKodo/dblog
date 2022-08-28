import { dblogDocs } from "./text.js";

export default function readme() {
  Deno.writeTextFileSync("./README.md", dblogDocs);
}
