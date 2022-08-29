export default function atom(data, buildPath) {
  const dateUTC = data.entries
    .filter((val) => val.isPost && !val.isDirectory)
    .map((val) => val.dateUTC);

  let xml = `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <id>${data.start_url}</id>
      <title>${data.name}</title>
      <updated>${dateUTC[0]}</updated>
      <author>
        <name>${data.author}</name>
        <email>${data.email || ``}</email>
      </author>
      <link href="${data.start_url}" rel="self"/>
      <link href="${data.start_url}" rel="alternate"/>
      <generator uri="https://deno.land/x/dlog" version="2.4.0">dlog</generator>`;

  for (const entry of data.entries) {
    if (!entry.isPost || entry.ext !== ".md" || entry.isDraft) continue;

    xml += `<entry>
      <title>${entry.attributes.title}</title>
      <id>${data.start_url}${entry.fileNamePath}.html</id>
      <link href="${data.start_url}${entry.fileNamePath}.html" rel="alternate"/>
      <published>${entry.dateUTC}</published>
      <updated>${entry.dateUTC}</updated>
      <content type="html"><![CDATA[${entry.html}]]></content>
    </entry>`;
  }

  xml += "</feed>";

  Deno.writeTextFile(buildPath, xml);
}
