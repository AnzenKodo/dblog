export default function manifest(data, buildPath) {
  Deno.writeTextFileSync(
    buildPath,
    JSON.stringify(
      {
        "$schema": "https://json.schemastore.org/web-manifest-combined.json",
        "name": data.name,
        "short_name": data.name,
        "start_url": data.start_url,
        "display": "standalone",
        "background_color": data.background,
        "description": data.description,
        "icons": [{
          "src": `${data.start_url}${data.favicon}`,
          "sizes": "500x500",
          "type": "image/svg+xml",
        }],
        "orientation": "portrait",
        "shortcuts": [{
          "name": "Tags",
          "url": `${data.start_url}tags`,
          "description": `${data.name} tags`,
        }],
        "theme_color": data.theme,
      },
      null,
      2,
    ),
  );
}
