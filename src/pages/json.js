export default function json(data, buildPath) {
  const items = [];
  let count = 0;
  for (const entry of data.entries) {
    if (!entry.isPost || entry.ext !== ".md") continue;

    items[count] = {
      "id": `${++count}`,
      "content_html": entry.html,
      "url": `${data.start_url}${entry.fileNamePath}.html`,
      "summary": entry.attributes.description,
      "title": entry.attributes.title,
      "date_published": entry.attributes.date,
      "tags": entry.attributes.tags,
    };
  }

  const json = {
    "version": "https://jsonfeed.org/version/1",
    "title": data.name,
    "home_page_url": data.start_url,
    "feed_url": `${data.start_url}feed/feed.json`,
    "favicon": `${data.start_url}${data.favicon}`,
    "icon": `${data.start_url}${data.favicon}`,
    "author": {
      "name": data.author,
    },
    items,
  };

  Deno.writeTextFileSync(buildPath, JSON.stringify(json, null, 2));
}
