function dateParse(dateUTC) {
  const date = new Date(dateUTC);

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Monts start at 0
  const dd = date.getDate();

  return yyyy + "-" + mm + "-" + dd;
}

function readingTime(text) {
  // get entire post content element
  const wordCount = `${text}`.match(/\b[-?(\w+)?]+\b/gi)?.length || 0;

  //calculate time in munites based on average reading time
  const timeInMinutes = wordCount / 225;

  //validation as we don't want it to show 0 if time is under 30 seconds
  let output;

  if (timeInMinutes <= 0.5) {
    output = 1;
  } else {
    //round to nearest minute
    output = Math.round(timeInMinutes);
  }

  return `${output}` + "min" + ``;
}

export default function meta(data, entry) {
  if (!entry.attributes) entry.attributes = new Object();

  const title = entry.fileName.replace(/[-%]/g, " ");
  entry.attributes.title = entry.attributes.title || title;

  // const firstPara = entry.html.match(/(?<=<p>).*(?=<\/p>)/g)[0];
  entry.attributes.date = entry.attributes.date || dateParse(entry.dateUTC);
  entry.attributes.readingTime = readingTime(entry.body);
  entry.attributes.tags = entry.attributes.tags || [];
  entry.attributes.canonical = entry.attributes.canonical || false;

  let description = entry.attributes.description;
  const firstPara = entry.html.match(/(?<=<p>)[\w\d\s,.]*(?=<\/p>)/);
  if (description) {
    description = entry.attributes.description;
  } else if (firstPara) {
    description = firstPara[0];
  } else {
    description = data.description;
  }
  entry.attributes.description = description.replaceAll('"', "'");

  return entry;
}
