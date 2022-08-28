import MarkdownIt from "https://jspm.dev/markdown-it@13.0.1";

import footnote from "https://jspm.dev/markdown-it-footnote@3.0.3";
import sub from "https://jspm.dev/markdown-it-sub@1.0.0";
import sup from "https://jspm.dev/markdown-it-sup@1.0.0";
import mark from "https://jspm.dev/markdown-it-mark@3.0.1";
import abbr from "https://jspm.dev/markdown-it-abbr@1.0.4";
import kbd from "https://jspm.dev/markdown-it-kbd@2.2.2";
import small from "https://jspm.dev/markdown-it-small@1.0.0";
import underline from "https://jspm.dev/markdown-it-underline@1.0.1";
import del from "https://jspm.dev/markdown-it-ins-del@0.1.1";
import deflist from "https://jspm.dev/markdown-it-deflist@2.1.0";
import sections from "https://jspm.dev/markdown-it-header-sections@1.0.0";
import checkbox from "https://jspm.dev/markdown-it-task-lists@2.1.1";
import highlightjs from "https://cdn.skypack.dev/markdown-it-highlightjs@4.0.1";
import implicitFigures from "https://jspm.dev/markdown-it-image-figures@2.1.0";
import multimd from "https://cdn.skypack.dev/markdown-it-multimd-table@4.2.0";
import markdownItAnchor from "https://cdn.skypack.dev/markdown-it-anchor@v8.6.4";

import fm from "https://jspm.dev/front-matter@4.0.2";

const mdParse = new MarkdownIt({
  html: true,
  xhtmlOut: false,
  linkify: true,
})
  .use(footnote)
  .use(sections)
  .use(sub)
  .use(sup)
  .use(mark)
  .use(abbr)
  .use(kbd)
  .use(small)
  .use(underline)
  .use(del)
  .use(deflist)
  .use(checkbox, { enabled: false })
  .use(highlightjs, { inline: true })
  .use(implicitFigures, {
    lazy: true,
    async: true,
    dataType: true,
    figcaption: true,
  })
  .use(multimd, {
    multiline: true,
    rowspan: true,
    headerless: true,
    multibody: true,
    aotolabel: true,
  })
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "before",
      class: "direct-link",
      symbol: "#",
      level: [1, 2, 3, 4],
    }),
  });

function extRegex(mdFile) {
  // Change [](*.md) to [](*.html) in Markdown file.
  const reMd = /(?!\[[^\]]*\]\((.+))\.(md)(?=\s*("(?:.*[^"])")?\s*\))/gm;
  // const reImg =
  //   /(?!\!\[[^\]]*\]\((.+))\.(png|jpg|gif)(?=\s*("(?:.*[^"])")?\s*\))/gm;
  // mdFile = mdFile.replaceAll(reImg, ".webp");

  mdFile = mdFile.replaceAll(reMd, ".html");
  mdFile = mdFile.replace(/^---(.|\n)*?---/, "");

  return mdFile;
}

export default function md(entry) {
  let mdFile = Deno.readTextFileSync(entry.path);

  entry.md = mdFile;
  Object.assign(entry, fm(mdFile));
  mdFile = extRegex(mdFile);
  entry.html = mdParse.render(mdFile);

  return entry;
}
