import MarkdownIt from "https://jspm.dev/markdown-it@13.0.1";

const mdParse = new MarkdownIt({
  html: true,
  linkify: true,
});

export default function config(data) {
  if (data !== false) {
    data = JSON.parse(Deno.readTextFileSync(data));
  } else {
    data = {};
  }
  data.name = data.name || "dblog";
  data.start_url = data.start_url || "https://AnzenKodo.github.io/dblog/";
  data.description = data.description ||
    "dblog blog generator, that generates blog from Markdown and JSON file.\ndblog handles technical parts, so you can focus on hard part writing.";
  data.email = data.email || "";
  data.author = data.author || "AnzenKodo";
  data.posts = data.posts || "./posts";
  data.output = data.output || "./site";
  data.favicon = data.favicon || "favicon.svg";
  data.lang = data.lang || "en-US";
  data.port = data.port || 8000;
  data.background = data.background || "#ffffff";
  data.foreground = data.foreground || "#000000";
  data.theme = data.theme || "#01a252";
  data.footer = mdParse.render(
    data.footer ||
      "Made by [AnzenKodo](https://AnzenKodo.github.io/AnzenKodo) under [MIT](https://anzenkodo.github.io/dblog/LICENSE)",
  );
  data.page404 = mdParse.render(
    data.page404 ||
      "404 Page Not Found, Sorry :(",
  );
  data.backup = data.backup !== false ? false : "./backup.json";
  data.exclude = data.exclude
    ? ["config.json", "backup.json", ...data.exclude]
    : ["config.json", "backup.json"];
  data.nav = data.nav || {};
  data.head = data.head || "";

  return data;
}
