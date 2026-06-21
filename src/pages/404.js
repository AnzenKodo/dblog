import html from "./components/html.js";

export default function notFound(data, buildPath) {
  const meta = {
    title: data.page404,
    description: data.name + " 404 page not found.",
    fileNamePath: buildPath,
  };

  Deno.writeTextFile(
    meta.fileNamePath,
    html(
      data,
      meta,
      `<p>Go back to <a href="${data.start_url}">Home</a> page.</p>`,
      false,
    ),
  );
}
