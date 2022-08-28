import { ensureDirSync } from "https://deno.land/std@0.139.0/fs/mod.ts";

export default function backup() {
  const data = JSON.parse(Deno.readTextFileSync("backup.json"));

  for (const entry of data.entries) {
    if (entry.name !== "." && !entry.isOutput) {
      ensureDirSync(entry.dir);
    }

    if (!entry.isOutput && entry.ext === ".md") {
      Deno.writeTextFileSync(entry.path, entry.md);
      console.log("Created " + entry.path);
    }
  }

  delete data.entries;
  Deno.writeTextFileSync("config.json", JSON.stringify(data, null, 2));
}
