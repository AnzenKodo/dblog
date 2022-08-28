export default function feed(data, buildPath) {
  const dateUTC = data.entries
    .filter((val) => val.isPost && !val.isDirectory)
    .map((val) => val.dateUTC);

  let xml = `<rss version="2.0"
  xmlns:access="http://www.bloglines.com/about/specs/fac-1.0"
  xmlns:admin="http://webns.net/mvcb/"
  xmlns:ag="http://purl.org/rss/1.0/modules/aggregation/"
  xmlns:annotate="http://purl.org/rss/1.0/modules/annotate/"
  xmlns:app="http://www.w3.org/2007/app"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:audio="http://media.tangent.org/rss/1.0/"
  xmlns:blogChannel="http://backend.userland.com/blogChannelModule"
  xmlns:cc="http://web.resource.org/cc/"
  xmlns:cf="http://www.microsoft.com/schemas/rss/core/2005"
  xmlns:company="http://purl.org/rss/1.0/modules/company"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:conversationsNetwork="http://conversationsnetwork.org/rssNamespace-1.0/"
  xmlns:cp="http://my.theinfo.org/changed/1.0/rss/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:email="http://purl.org/rss/1.0/modules/email/"
  xmlns:ev="http://purl.org/rss/1.0/modules/event/"
  xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0"
  xmlns:fh="http://purl.org/syndication/history/1.0"
  xmlns:foaf="http://xmlns.com/foaf/0.1"
  xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
  xmlns:georss="http://www.georss.org/georss"
  xmlns:geourl="http://geourl.org/rss/module/"
  xmlns:g="http://base.google.com/ns/1.0"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:icbm="http://postneo.com/icbm"
  xmlns:image="http://purl.org/rss/1.0/modules/image/"
  xmlns:indexing="urn:atom-extension:indexing"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:kml20="http://earth.google.com/kml/2.0"
  xmlns:kml21="http://earth.google.com/kml/2.1"
  xmlns:kml22="http://www.opengis.net/kml/2.2"
  xmlns:l="http://purl.org/rss/1.0/modules/link/"
  xmlns:mathml="http://www.w3.org/1998/Math/MathML"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:openid="http://openid.net/xmlns/1.0"
  xmlns:opensearch10="http://a9.com/-/spec/opensearchrss/1.0/"
  xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/"
  xmlns:opml="http://www.opml.org/spec2"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
  xmlns:ref="http://purl.org/rss/1.0/modules/reference/"
  xmlns:reqv="http://purl.org/rss/1.0/modules/richequiv/"
  xmlns:rss090="http://my.netscape.com/rdf/simple/0.9/"
  xmlns:rss091="http://purl.org/rss/1.0/modules/rss091#"
  xmlns:rss1="http://purl.org/rss/1.0/"
  xmlns:rss11="http://purl.org/net/rss1.1#"
  xmlns:search="http://purl.org/rss/1.0/modules/search/"
  xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
  xmlns:ss="http://purl.org/rss/1.0/modules/servicestatus/"
  xmlns:str="http://hacks.benhammersley.com/rss/streaming/"
  xmlns:sub="http://purl.org/rss/1.0/modules/subscription/"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns:sx="http://feedsync.org/2007/feedsync"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:taxo="http://purl.org/rss/1.0/modules/taxonomy/"
  xmlns:thr="http://purl.org/rss/1.0/modules/threading/"
  xmlns:trackback="http://madskills.com/public/xml/rss/module/trackback/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:wiki="http://purl.org/rss/1.0/modules/wiki/"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:xrd="xri://$xrd*($v*2.0)"
  xmlns:xrds="xri://$xrds">`;

  xml += `<channel>
  <title>${data.name}</title>
  <link>${data.start_url}</link>
  <description>${data.description}</description>
  <language>${data.lang}</language>
  <lastBuildDate>${dateUTC[0]}</lastBuildDate>
  <image>
    <url>${data.favicon}</url>
    <title>${data.name}</title>
    <link>${data.start_url}</link>
    <width>144</width>
    <height>144</height>
  </image>
  <atom:link href="${data.start_url}feed.xml" type="application/rss+xml"/>`;

  for (const entry of data.entries) {
    if (!entry.isPost || entry.ext !== ".md" || entry.isDraft) continue;

    xml += `<item>
    <title>${entry.attributes.title}</title>
    <link>${data.start_url}${entry.fileNamePath}.html</link>
    <pubDate>${entry.dateUTC}</pubDate>
    <description>${entry.html}</description>
    </item>`;
  }

  xml += "</channel></rss>";

  Deno.writeTextFile(buildPath, xml);
}
