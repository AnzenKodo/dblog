export default function nav(data) {
  // if (!data.nav) data.nav = {};

  // data.nav = Object.assign({
  //   "home": data.start_url,
  //   "tags": data.start_url + "tags.html",
  //   "feed": data.start_url + "feed.xml",
  // }, data.nav);

  let post = "";
  post += `<li><a href="${data.start_url}">home</a></li>

    <li><a href="${data.start_url}tags.html">tags</a></li><li><a href="${data.start_url}feed.html">feed</a></li><li><a href="${data.start_url}search.html">search</a></li>`;

  if (data.nav) {
    for (const [name, path] of Object.entries(data.nav)) {
      const httpExist = /https:\/\/|http:\/\//.test(path);
      let url = path;

      if (!httpExist) {
        const mdToHtml = path.replace(/\.md$/, ".html");
        url = `${data.start_url}${mdToHtml}`;
      }

      post += `<li><a href="${url}">${name}</a></li>`;
    }
  }

  return `<nav><ul>${post}</ul></nav>`;
}
