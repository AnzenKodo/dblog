import MarkdownIt from "https://jspm.dev/markdown-it@13.0.1";

import footnote from "https://jspm.dev/markdown-it-footnote@3.0.3";
import anchor from "https://jspm.dev/markdown-it-anchor@8.6.4";
import checkbox from "https://jspm.dev/markdown-it-checkbox@1.1.0";
import sub from "https://jspm.dev/markdown-it-sub@1.0.0";
import sup from "https://jspm.dev/markdown-it-sup@1.0.0";
import mark from "https://jspm.dev/markdown-it-mark@3.0.1";
import abbr from "https://jspm.dev/markdown-it-abbr@1.0.4";
import kbd from "https://jspm.dev/markdown-it-kbd@2.2.2";
import small from "https://jspm.dev/markdown-it-small@1.0.0";
import underline from "https://jspm.dev/markdown-it-underline@1.0.1";
import del from "https://jspm.dev/markdown-it-ins-del@0.1.1";
import deflist from "https://jspm.dev/markdown-it-deflist@2.1.0";
import attrs from "https://jspm.dev/markdown-it-attrs@4.1.4";
import toc from "https://jspm.dev/markdown-it-table-of-contents@0.6.0";
import imsize from "https://jspm.dev/markdown-it-imsize@1.0.0";
import sections from "https://jspm.dev/markdown-it-header-sections@1.0.0";
import highlightjs from "https://jspm.dev/markdown-it-highlightjs@4.0.1";
import fm from "https://jspm.dev/front-matter@4.0.2";

import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
} from "https://deno.land/x/imagemagick_deno@0.0.12/mod.ts";

import {
  ensureDirSync,
  walkSync,
} from "https://deno.land/std@0.139.0/fs/mod.ts";
import { serve } from "https://deno.land/std@0.148.0/http/mod.ts";

const md = new MarkdownIt({
  html: true,
  linkify: true,
})
  .use(footnote)
  .use(sections)
  .use(anchor, { permalink: anchor.permalink.headerLink() })
  .use(checkbox)
  .use(sub)
  .use(sup)
  .use(mark)
  .use(abbr)
  .use(kbd)
  .use(small)
  .use(underline)
  .use(del)
  .use(imsize)
  .use(highlightjs)
  .use(deflist)
  .use(toc)
  .use(attrs);

const readAccess = { name: "read", path: "./dlog.json" };
await Deno.permissions.request(readAccess);

const writeAccess = { name: "write", path: "/site" };
await Deno.permissions.request(writeAccess);

function location(path) {
  const post = [];

  for (const entry of walkSync(path)) {
    post.push(entry);
  }

  return post;
}

function nav(start_url, output) {
  let post = "";
  post += `<li><a href="${start_url}">home</a></li>`;

  for (const entry of location(`${output}/nav`)) {
    const entryParse = parse(entry);
    const url = `${start_url}nav/${entry.name}`;
    const title = entryParse.fileName;

    if (entryParse.dir === `${output}/nav`) {
      post += `<li><a href="${url}">${title}</a></li>`;
    }
  }

  return "<nav><ul>" + post + "</ul></nav>";
}

function html(data, meta, content, isPost) {
  const httpExist = /https:\/\/|http:\/\//.test(data.style);

  if (!httpExist) {
    data.style = `${data.start_url}${data.style}`;
  }

  const head = `<!DOCTYPE html>
  <html lang="${data.lang}">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${meta.title || meta} - ${data.name}</title>
  <meta name="author" content="${data.author}">
  <meta name="description" content="${data.description}">
  <meta property="og:url" content="${data.start_url}">
  <meta property="og:title" content="${data.name}">
  <meta property="og:description" content="${data.description}">
  <meta property="og:image" content="">
  <link rel="icon" type="image/svg+xml" href="${data.start_url}favicon.svg">
  <link rel="stylesheet" href="${data.style}">
  ${data.head || ``}
  </head>`;

  const header = `<header>
  <h1>${data.name}</h1>
  ${nav(data.start_url, data.output)}
  </header>`;

  const tags = meta.tags
    ? `<li>
      <span class="meta-name">Tags:</span>
      <a href="${data.start_url}nav/tags/${meta.tags}.html">${meta.tags}</a>
    </li>`
    : ``;

  const aside = isPost
    ? `<aside>
        <ul class="meta">
          <li>
            <span class="meta-name">Date:</span> <time datetime=${meta.date}>${meta.date}</time>
          </li>
          <li>
            <span class="meta-name">Reading Time:</span> ${meta.readingTime}
          </li>
          ${tags}
        </ul>
      </aside>`
    : ``;

  const main = `<main>
    <article>
      <section>
        <h1>${meta.title || meta}</h1>
        ${aside}
      </section>
      <section>
        ${content}
      </section>
    </article>
  </main>`;

  const footer = `<footer><p>${data.footer}</p></footer>`;

  const code = head + header + main + footer;

  return code;
}

function parse(entry, output, posts) {
  const fileName = entry.path.match(/[ \w-]+(?=\.)/);
  const fileNamePath = entry.path.match(/.*(?![^.]*$)/);
  const dir = entry.path.match(/.*(?![^\/]*$)/);
  const ext = entry.path.match(/\.[A-Za-z]+$/);

  const rePost = new RegExp(
    `^(${output}\/${posts})(?!\\.)|^(${posts})(?!\\.)`,
    "g",
  );
  const reOut = new RegExp(`^(${output})(?!\\.)`, "g");

  entry.isPost = rePost.test(entry.path);
  entry.isOutput = reOut.test(entry.path);

  entry.fileName = (fileName && entry.isFile) ? fileName.toString() : "";
  entry.fileNamePath = (fileNamePath && entry.isFile)
    ? fileNamePath.toString()
    : "";
  entry.ext = (ext && entry.isFile) ? ext.toString() : "";

  if (!entry.isDirectory && dir) {
    entry.dir = dir.toString();
  } else if (dir === null && entry.isFile) {
    entry.dir = "";
  } else {
    entry.dir = entry.path;
  }

  return entry;
}

function mdRegex(mdFile) {
  // Change [](*.md) to [](*.html) in Markdown file.
  const reMd = /(?!\[[^\]]*\]\((.+))\.(md)(?=\s*("(?:.*[^"])")?\s*\))/gm;
  const reImg =
    /(?!\!\[[^\]]*\]\((.+))\.(png|jpg|gif)(?=\s*("(?:.*[^"])")?\s*\))/gm;

  mdFile = mdFile.replaceAll(reMd, ".html");
  mdFile = mdFile.replaceAll(reImg, ".webp");

  return mdFile;
}

function dateParse(path) {
  const dateUTC = Deno.statSync(path).mtime.toUTCString("en-US");
  const date = new Date(dateUTC);

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Monts start at 0
  const dd = date.getDate();

  return yyyy + "-" + mm + "-" + dd;
}

function readingTime(text) {
  // get entire post content element
  const wordCount = `${text}`.match(/\b[-?(\w+)?]+\b/gi)?.length || 0;

  //calculate time in munites based on average reading time
  const timeInMinutes = wordCount / 225;

  //validation as we don't want it to show 0 if time is under 30 seconds
  let output;

  if (timeInMinutes <= 0.5) {
    output = 1;
  } else {
    //round to nearest minute
    output = Math.round(timeInMinutes);
  }

  return `${output}` + "min" + ``;
}

function mdParse(data, fileName, path, fileNamePath, output, isPost) {
  let mdFile = Deno.readTextFileSync(path);
  const entry = fm(mdFile);

  mdFile = mdRegex(mdFile);

  if (!entry.attributes) entry.attributes = new Object();

  entry.html = md.render(entry.body);

  const title = fileName.replace(/[-%]/g, " ");
  entry.attributes.title = entry.attributes.title || title;
  entry.attributes.date = entry.attributes.date || dateParse(path);
  entry.attributes.readingTime = readingTime(mdFile);

  Deno.writeTextFileSync(
    `${output}/${fileNamePath}.html`,
    html(data, entry.attributes, entry.html, isPost),
  );

  return entry;
}

function imageComp(path, fileNamePath, output) {
  const imgData = Deno.readFileSync(path);

  ImageMagick.read(imgData, (img) => {
    img.write((imgData) =>
      Deno.writeFile(
        `${output}/${fileNamePath}.webp`,
        imgData,
      ), MagickFormat.Webp);
  });
}

function index(entries, output, data) {
  let main = "";

  for (const entry of entries) {
    if (entry.ext !== ".md" || !entry.isPost) continue;

    const tags = entry.attributes?.tags || false;
    const date = entry.attributes.date;
    const readingTime = entry.attributes.readingTime;
    const title = entry.attributes.title;
    const url = `${data.posts}/${entry.fileName}`;

    main += `<li>
      <a class="list-name" href="${url}.html">${title}</a>
      <ul class="meta">
        <li><span class="meta-name">Reading Time:</span> ${readingTime}</li>
        <li><span class="meta-name">Date:</span> ${date}</li>
        ${
      tags
        ? `<li><span class="meta-name">Tags:</span>
              <a href="${data.start_url}nav/tags/${tags}.html">${tags}</a>
            </li>`
        : ""
    }
      </ul>
    </li>`;
  }

  Deno.writeTextFile(
    `${output}/index.html`,
    html(data, "home", '<ul class="list">' + main + "</ul>", false),
  );
}

function tags(entries, output) {
  ensureDirSync(`${output}/nav/tags`);

  const tags = entries
    .filter((value) => value.attributes?.tags)
    .map((value) => value.attributes.tags)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  let tagsName = "";

  for (const tag of tags) {
    let items = "";
    const itemsData = entries.filter((value) => value.attributes?.tags === tag);

    for (const itemData of itemsData) {
      const title = itemData.attributes.title;
      items += `<li>
        <a class="list-name" href="../../${itemData.fileNamePath}.html">${title}</a>
        </li>`;
    }

    Deno.writeTextFile(
      `${output}/nav/tags/${tag}.html`,
      html(data, tag, "<ul class='list'>" + items + "</ul>", false),
    );

    tagsName +=
      `<li><a class="list-name" href="tags/${tag}.html">${tag}</a></li>`;
  }

  Deno.writeTextFile(
    `${output}/nav/tags.html`,
    html(data, "tags", "<ul class='list'>" + tagsName + "</ul>", false),
  );
}

function feed(entries) {
  let xml = `<rss xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
  <title>${data.name}</title>
  <link>${data.start_url}</link>
  <description>${data.description}</description>
  <language>${data.lang}</language>
  <lastBuildDate></lastBuildDate>
  <atom:link href="${data.start_url}feed.xml" rel="self" type="application/rss+xml"/>`;

  for (const entry of entries) {
    if (!entry.isPost || entry.ext !== ".md" || entry.isDirectory) continue;

    xml += `
    <item>
    <title>${entry.attributes.title}</title>
    <link>${data.start_url}${entry.fileNamePath}.html</link>
    <pubDate>${entry.attributes?.date}</pubDate>
    <guid></guid>
    <description>${entry.html}</description>
    </item>`;
  }

  xml += "</channel></rss>";

  Deno.writeTextFile(`${data.output}/nav/feed.xml`, xml);
}

function favicon(background, foreground, theme, name, output) {
  const svg = `<?xml version="1.0" encoding="utf-8"?>
  <svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg">
    <style>
      text {
        fill: ${theme};
        font-family: Arial, sans-serif;
        font-size: 28px;
      }
      rect {
        fill: ${foreground};
        stroke-width: 0px;
      }
      @media (prefers-color-scheme: dark) {
        rect {
          fill: ${background};
        }
      }
    </style>
    <rect
      width="500" height="500"
      rx="250" ry="250"
    />
    <text
      transform="matrix(15.035396, 0, 0, 16.314976, 108.576167, 408.322061)"
    >${name[0]}</text>
  </svg>`;

  Deno.writeTextFile(`${output}/favicon.svg`, svg);
}

function main(data) {
  const entries = [];

  for (let entry of location(".")) {
    entry = parse(entry, data.output, data.posts);
    const itImgFile = [".png", ".jpg", ".webp", ".gif"].includes(entry.ext);

    if (entry.name !== "." && !entry.isOutput) {
      ensureDirSync(`${data.output}/${entry.dir}`);
      ensureDirSync(`${data.output}/nav`);

      if (!entry.isDirectory && !itImgFile && entry.ext !== ".md") {
        Deno.copyFileSync(entry.path, `${data.output}/${entry.path}`);
      }
    }

    tags(entries, data.output);
    feed(entries);

    if (!entry.isOutput && entry.ext === ".md") {
      Object.assign(
        entry,
        mdParse(
          data,
          entry.fileName,
          entry.path,
          entry.fileNamePath,
          data.output,
          entry.isPost,
        ),
      );
    }

    if (itImgFile && !entry.isOutput) {
      imageComp(entry.path, entry.fileNamePath, data.output);
    }

    entries.push(entry);
  }

  index(entries, data.output, data);
  favicon(data.background, data.foreground, data.theme, data.name, data.output);
}

await initializeImageMagick();
function dataParse() {
  const data = JSON.parse(Deno.readTextFileSync("config.json"));

  data.background = data.background || "#000000";
  data.foreground = data.foreground || "#ffffff";
  data.theme = data.theme || "#0583f2";
  data.port = data.port || 8080;
  data.lang = data.lang || "en-US";
  data.output = data.output || "site";
  data.name = data.name || "Site";
  data.description = data.description || "Site description";

  return data;
}
const data = dataParse();

const reqHandler = async (req) => {
  const { pathname } = new URL(req.url);

  const filePath = data.output + pathname;
  let body;

  try {
    body = (await Deno.open(filePath)).readable;
  } catch (_e) {
    body = await Deno.readFile(data.output + "/404.html");
  }

  if (pathname === "/") {
    body = await Deno.readFile(data.output + "/index.html");
  }

  return new Response(body);
};

// async function watch(output, main) {
//   const watcher = Deno.watchFs(".");
//   for await (const event of watcher) {
//     const regex = new RegExp(`\/\.\/${output}.*$`);
//     const isOutput = regex.test(event.paths[0]);
//     const isAccess = event.kind === "access";

//     if (isOutput || !isAccess) continue;

//     main;
//   }
// }

const args = Deno.args[0];
if (args === "-p") {
  main(data, true);
} else {
  data.start_url = `http://localhost:${data.port}/`;

  main(data);

  serve(reqHandler, { port: data.port });
}
