import css from "./css.js";
import nav from "./nav.js";
import ogType from "./og.js";

export default function html(data, meta, content, isPost) {
  const tags = meta.tags
    ? meta.tags
      .map((tag) => `<a href="${data.start_url}tags/${tag}.html">${tag}</a>`)
      .join(" ")
    : ``;
  const canonical = meta.canonical
    ? `<link rel="canonical" href="${meta.canonical}">`
    : "";

  const head = `<!DOCTYPE html>
  <html lang="${data.lang}">
  <head>
  <title>${meta.title} - ${data.name}</title>
  <link rel="icon" type="image/svg+xml" href="${data.start_url}${data.favicon}">
  <link rel="manifest" href="${data.start_url}manifest.json">
  <link rel="alternate" type="application/rss+xml" title="${data.name} RSS Feed" href="${data.start_url}feed.xml">
  <link rel="alternate" type="application/json" title="${data.name} JSON Feed" href="${data.start_url}feed.json">
  <link rel="alternate" type="application/atom+xml" title="${data.name} Atom Feed" href="${data.start_url}feed.atom">
  <link rel="sitemap" type="application/xml" title="${data.name} Sitemap" href="${data.start_url}sitemap.xml">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="author" content="${data.author}">
  <meta name="description" content="${meta.description}">
  <meta name="theme-color" content="${data.theme}"/>
  <meta property="og:image" content="${data.start_url}${data.favicon}">
  <meta property="og:image:width" content="500">
  <meta property="og:image:height" content="500">
  <meta property="og:image:alt" content="${data.name} logo">
  <meta property="og:url" content="${data.start_url}${meta.url}.html">
  <meta property="og:title" content="${meta.title} - ${data.name}">
  <meta property="og:description" content="${meta.description}">
  ${canonical}
  ${ogType(meta, data.author, isPost)}
  ${css(data)}
  ${data.head}
  </head>`;

  const header = `<header>
  <h1>${data.name}</h1>
  ${nav(data)}
  </header>`;

  const aside = isPost
    ? `<aside>
        <ul class="meta">
          <li>
            <span class="meta-name">Date:</span> <time datetime=${meta.date}>${meta.date}</time>
          </li>
          <li>
            <span class="meta-name">Reading Time:</span> ${meta.readingTime}
          </li>
          <li>
            <span class="meta-name">Tags:</span>
            ${tags}
          </li>
        </ul>
      </aside>`
    : ``;

  let email = "";
  if (isPost && data.email) {
    email =
      `<p class="email"><a  href="mailto:${data.email}">Reply by Email</a></p>`;
  }

  const main = `<main>
    <article>
      <section id="header">
        <h1>${meta.title || meta}</h1>
        ${aside}
      </section>
      <section id="main">
        ${content}
      </section>
      <section id="footer">
        ${email}
      </section>
    </article>
  </main>`;

  const footer = `<footer><p>${data.footer}</p></footer>`;
  const skipToMain =
    '<a class="skip-to-content-link" href="#main">Skip to content</a>';

  const body = "<body>" + skipToMain + header.replace(/[\n]/gm, "") +
    main + footer.replace(/[\n]/gm, "") + "</body>";

  return head.replace(/[\n]/gm, "") + body;
}
