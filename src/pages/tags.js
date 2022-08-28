import html from "./components/html.js";

export default function tags(data, buildPath) {
  const tags = data.entries
    .filter((value) => value.attributes?.tags)
    .map((value) => value.attributes.tags)
    .flat()
    .filter((item, index, arr) => arr.indexOf(item) === index);

  let tagsName = "";

  for (const tag of tags) {
    let items = "";
    const itemsData = data.entries.filter((value) =>
      value.attributes?.tags.includes(tag)
    );

    for (const itemData of itemsData) {
      const title = itemData.attributes.title;
      items += `<li>
        <a class="list-name" href="../../${itemData.fileNamePath}.html">${title}</a>
        </li>`;
    }

    const meta = {
      title: tag,
      description: `Pages that contents ${tag} tags`,
      fileNamePath: `${buildPath}/${tag}.html`,
    };

    Deno.writeTextFile(
      meta.fileNamePath,
      html(data, meta, "<ul class='list'>" + items + "</ul>", false),
    );

    tagsName +=
      `<li><a class="list-name" href="tags/${tag}.html">${tag}</a></li>`;
  }

  const meta = {
    title: "tags",
    description: `${data.name} tags`,
    url: `tags.html`,
  };

  Deno.writeTextFile(
    `${data.output}/tags.html`,
    html(data, meta, "<ul class='list'>" + tagsName + "</ul>", false),
  );
}
