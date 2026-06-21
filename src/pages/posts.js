import html from "./components/html.js";

export default function posts(data, entry, buildPath) {
  entry.attributes.url = entry.fileNamePath;
  Deno.writeTextFileSync(
    buildPath,
    html(data, entry.attributes, entry.html, entry.isPost),
  );
}
