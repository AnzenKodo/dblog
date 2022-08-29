import {
  ensureDirSync,
  walkSync,
} from "https://deno.land/std@0.139.0/fs/mod.ts";

import md from "./src/utils/md.js";
import meta from "./src/utils/meta.js";
import parse from "./src/utils/parse.js";
import server from "./src/utils/server.js";
import config from "./src/utils/data.js";

import tags from "./src/pages/tags.js";
import feed from "./src/pages/feed.js";
import sitemap from "./src/pages/sitemap.js";
import favicon from "./src/pages/favicon.js";
import index from "./src/pages/index.js";
import posts from "./src/pages/posts.js";
import notFound from "./src/pages/404.js";
import manifest from "./src/pages/manifest.js";

import help from "./src/args/help.js";
import setup from "./src/args/setup.js";
import backup from "./src/args/backup.js";
import readme from "./src/args/readme.js";

function main(data) {
  data.entries = [];

  ensureDirSync(`${data.output}/tags`);

  for (let entry of [...walkSync(".")]) {
    entry = parse(entry, data.output, data.posts);

    if (entry.name !== "." && !entry.isOutput) {
      ensureDirSync(`${data.output}/${entry.dir}`);

      if (
        !entry.isDirectory && entry.ext !== ".md" &&
        !data.exclude.includes(entry.path)
      ) {
        Deno.copyFileSync(entry.path, `${data.output}/${entry.path}`);
      }
    }

    const draftPost = /^_/.test(entry.name);
    if (!entry.isOutput && entry.ext === ".md" && !draftPost) {
      entry = md(entry);
      entry = meta(data, entry);
      posts(data, entry, `${data.output}/${entry.fileNamePath}.html`);
    }

    data.entries.push(entry);

    feed(data, `${data.output}/feed.xml`);
  }

  tags(data, `${data.output}/tags`);
  sitemap(data, parse, `${data.output}/sitemap.xml`);
  index(data, data.entries, `${data.output}/index.html`);
  favicon(data);
  notFound(data, `${data.output}/404.html`);
  manifest(data, `${data.output}/manifest.json`);

  if (data.backup) {
    Deno.writeTextFileSync(data.backup, JSON.stringify(data, null, 2));
  }
}

if (Deno.args.includes("--help")) help();
else if (Deno.args.includes("--backup")) backup();
else if (Deno.args.includes("--setup")) setup();
else if (Deno.args.includes("--readme")) readme();
else {
  const data = config("config.json");

  if (Deno.args.includes("--build")) {
    main(data);
  } else {
    server(data, main);
  }
}
