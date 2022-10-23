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
import sitemap from "./src/pages/sitemap.js";
import favicon from "./src/pages/favicon.js";
import index from "./src/pages/index.js";
import posts from "./src/pages/posts.js";
import notFound from "./src/pages/404.js";
import manifest from "./src/pages/manifest.js";
import search from "./src/pages/search.js";

import feed from "./src/pages/feed.js";
import rss from "./src/pages/rss.js";
import json from "./src/pages/json.js";
import atom from "./src/pages/atom.js";

import help from "./src/args/help.js";
import setup from "./src/args/setup.js";
import backup from "./src/args/backup.js";
import readme from "./src/args/readme.js";

function main(data) {
  data.entries = [];

  ensureDirSync(`${data.output}/tags`);

  for (let entry of [...walkSync(".")]) {
    entry = parse(entry, data.output, data.posts);

    // // Ignore draft posts on build time
    if (entry.isDraft && Deno.args.includes("--build")) continue;

    if (entry.name !== "." && !entry.isOutput) {
      ensureDirSync(`${data.output}/${entry.dir}`);

      if (
        !entry.isDirectory && entry.ext !== ".md" &&
        !data.exclude.includes(entry.path)
      ) {
        Deno.copyFileSync(entry.path, `${data.output}/${entry.path}`);
      }
    }

    if (!entry.isOutput && entry.ext === ".md") {
      entry = md(entry);
      entry = meta(data, entry);
      posts(data, entry, `${data.output}/${entry.fileNamePath}.html`);
    }

    data.entries.push(entry);
  }

  feed(data, `${data.output}/feed.html`);
  rss(data, `${data.output}/feed.xml`);
  json(data, `${data.output}/feed.json`);
  atom(data, `${data.output}/feed.atom`);

  sitemap(data, parse, `${data.output}/sitemap.xml`);
  manifest(data, `${data.output}/manifest.json`);

  favicon(data);

  tags(data, `${data.output}/tags`);
  index(data, data.entries, `${data.output}/index.html`);
  notFound(data, `${data.output}/404.html`);
  search(data, `${data.output}/search.html`);

  if (data.backup) {
    Deno.writeTextFileSync(data.backup, JSON.stringify(data, null, 2));
  }
}

if (Deno.args.includes("--backup")) backup();
else if (Deno.args.includes("--setup")) setup();
else if (Deno.args.includes("--readme")) readme();
else {
  if (Deno.args.includes("--serve") || Deno.args.includes("--build")) {
    const data = config("./config.json");
    if (Deno.args.includes("--serve")) server(data, main);
    else if (Deno.args.includes("--build")) main(data);
  } else help();
}
