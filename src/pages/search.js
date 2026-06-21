import html from "./components/html.js";

export default function search(data, buildPath) {
  const main =
    `<form class="search" action="https://duckduckgo.com/" method="get">
      <input type="hidden" name="sites" value="${data.start_url}" />
      <p>
      <input type="search" name="q" autocomplete="on" placeholder="Search Posts in ${data.name}, Power by DuckDuckGo." required>
      <input type="submit" value="search">
      </p>
    </form>`;

  const meta = {
    title: "search",
    description: `${data.name} search`,
    url: "search.html",
  };

  Deno.writeTextFile(
    buildPath,
    html(data, meta, main, false),
  );
}
