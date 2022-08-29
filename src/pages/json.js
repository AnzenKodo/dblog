export default function json(data, buildPath) {
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
    "items": data.entries.map((entry, index) => ({
      "id": `${index + 1}`,
      "content_html": entry.html,
      "url": `${data.start_url}${entry.fileNamePath}.html`,
      // "summary": entry.attributes.description,
      // "title": entry.attributes.title,
      // "date_published": entry.attributes.date,
      // "tags": entry.attributes.tags,
    })),
  };

  Deno.writeTextFileSync(buildPath, JSON.stringify(json));
}
