import html from "./components/html.js";

export default function posts(data, entry, buildPath) {
  Deno.writeTextFileSync(
    buildPath,
    html(data, entry.attributes, entry.html, entry.isPost),
  );
}
