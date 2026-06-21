import { walkSync } from "https://deno.land/std@0.139.0/fs/mod.ts";

export default function sitemap(data, parse, buildPath) {
  let xml = `<?xml version="1.0" encoding="utf-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (let entry of [...walkSync(data.output)]) {
    entry = parse(entry, data.output, data.posts);

    if (entry.ext === ".html" && !entry.isDirectory) {
      const regex = new RegExp(`^${data.output}\\/`);
      const url = entry.fileNamePath.replace(regex, data.start_url);

      xml += `<url>
      <loc>${url}.html</loc>
      <lastmod>${entry.dateUTC}</lastmod>
    </url>`;
    }
  }

  xml += "</urlset>";

  Deno.writeTextFile(buildPath, xml);
}
