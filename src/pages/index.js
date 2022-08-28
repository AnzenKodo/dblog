import html from "./components/html.js";

export default function index(data, entries, buildPath) {
  let main = "";

  for (const entry of entries) {
    if (entry.ext !== ".md" || !entry.isPost || entry.isDraft) continue;

    const date = entry.attributes.date;
    const readingTime = entry.attributes.readingTime;
    const title = entry.attributes.title;
    const url = `${data.posts}/${entry.fileName}`;

    const tags = entry.attributes?.tags
      ? entry.attributes?.tags
        .map((tag) => `<a href="${data.start_url}tags/${tag}.html">${tag}</a>`)
        .join(" ")
      : ``;

    main += `<li>
      <a class="list-name" href="${url}.html">${title}</a>
      <ul class="meta">
        <li><span class="meta-name">Reading Time:</span> ${readingTime}</li>
        <li><span class="meta-name">Date:</span> ${date}</li>
        ${
      tags
        ? `<li><span class="meta-name">Tags:</span>
              ${tags}
            </li>`
        : ""
    }
      </ul>
    </li>`;
  }

  const meta = {
    title: "home",
    description: data.description,
    url: "index.html",
  };

  Deno.writeTextFile(
    buildPath,
    html(data, meta, '<ul class="list">' + main + "</ul>", false),
  );
}
