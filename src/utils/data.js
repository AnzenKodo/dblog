import MarkdownIt from "https://jspm.dev/markdown-it@13.0.1";
import { description } from "../args/text.js";

const mdParse = new MarkdownIt({
  html: true,
  linkify: true,
});

export function config(data) {
  if (data.name === undefined) {
    data = JSON.parse(Deno.readTextFileSync(data));
  }

  data.name = data.name || "dblog";
  data.description = data.description || description;
  data.author = data.author || "AnzenKodo";
  data.posts = data.posts || "./posts";
  data.output = data.output || "./site";
  data.favicon = data.favicon || "favicon.svg";
  data.lang = data.lang || "en-US";
  data.port = data.port || 8000;
  data.background = data.background || "#ffffff";
  data.foreground = data.foreground || "#000000";
  data.theme = data.theme || "#01a252";
  data.output = data.output || "site";
  data.footer = mdParse.render(
    data.footer ||
      "Made by [AnzenKodo](https://AnzenKodo.github.io/AnzenKodo) under [MIT](https://anzenkodo.github.io/AnzenKodo/LICENSE)",
  );
  data.page404 = mdParse.render(
    data.page404 ||
      "404 Page Not Found, Sorry :(",
  );
  data.backup = data.backup !== false ? false : "./backup.json";
  data.exclude = data.exclude
    ? ["config.json", "backup.json", ...data.exclude]
    : ["config.json", "backup.json"];

  data.head = data.head || "";

  return data;
}
