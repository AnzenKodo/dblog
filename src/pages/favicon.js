export default function favicon(data) {
  if (data.favicon !== "favicon.svg") return data.favicon;
  const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 144 144" width="144" height="144" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      text {
        fill: ${data.theme};
        font-family: Arial, sans-serif;
        font-size: 28px;
      }
      rect {
        fill: ${data.background};
        stroke-width: 0px;
      }
      @media (prefers-color-scheme: dark) {
        rect {
          fill: ${data.foreground};
        }
      }
    </style>
  </defs>
  <rect width="144" height="144" rx="250" ry="250"/>
  <text transform="matrix(3.212015, 0, 0, 3.485372, 41.922158, 106.036356)" style="white-space: pre;">${
    data.name[0]
  }</text>
</svg>`;

  Deno.writeTextFile(`${data.output}/favicon.svg`, svg);
}
