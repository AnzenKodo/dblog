export default function ogType(meta, author, isPost) {
  if (isPost) {
    let tags = "";

    if (meta.tags) {
      tags += meta.tags
        .map((tag) => `<meta property="article:tag" content="${tag}">`)
        .join("");
    }

    return `<meta property="og:type" content="article">
    <meta property="article:published_time" content="${meta.date}">
    <meta property="article:author" content="${author}">
    ${tags}`;
  } else {
    return `<meta property="og:type" content="website">`;
  }
}
