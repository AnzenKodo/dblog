import html from "./components/html.js";

export default function feed(data, buildPath) {
  const main =
    `<li><a class="list-name" href="${data.start_url}feed.xml">RSS Feed</a></li>
    <li><a class="list-name" href="${data.start_url}feed.json">JSON Feed</a></li>
    <li><a class="list-name" href="${data.start_url}feed.atom">Atom Feed</a></li>`;

  const meta = {
    title: "feeds",
    description: `${data.name} feeds`,
    url: "feeds.html",
  };

  Deno.writeTextFile(
    buildPath,
    html(data, meta, '<ul class="list">' + main + "</ul>", false),
  );
}
