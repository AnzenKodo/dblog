import { docs } from "./text/docs.js";

export default function readme() {
  Deno.writeTextFileSync("./README.md", docs);
}
