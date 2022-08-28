export default function parse(entry, output, posts) {
  const fileName = entry.path.match(/[ \w-]+(?=\.)/);
  const fileNamePath = entry.path.match(/.*(?![^.]*$)/);
  const dir = entry.path.match(/.*(?![^\/]*$)/);
  const ext = entry.path.match(/\.[A-Za-z]+$/);

  posts = posts.replace("./", "");
  output = output.replace("./", "");
  const rePost = new RegExp(
    `^(${output}\/${posts})(?!\\.)|^(${posts})(?!\\.)`,
    "g",
  );
  const reOut = new RegExp(`^(${output})(?!\\.)`, "g");
  const reDraft = new RegExp("^_");

  entry.isOutput = reOut.test(entry.path);
  entry.isDraft = reDraft.test(entry.name);
  entry.fileName = (fileName && entry.isFile) ? fileName.toString() : "";
  entry.fileNamePath = (fileNamePath && entry.isFile)
    ? fileNamePath.toString()
    : "";
  entry.ext = (ext && entry.isFile) ? ext.toString() : "";
  entry.dateUTC = Deno.statSync(entry.path).mtime.toUTCString("en-US");

  if (!entry.isDirectory && dir) {
    entry.dir = dir.toString();
  } else if (dir === null && entry.isFile) {
    entry.dir = "";
  } else {
    entry.dir = entry.path;
  }

  entry.isPost = rePost.test(entry.dir);

  return entry;
}
