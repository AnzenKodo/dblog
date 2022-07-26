const punk = `/* From https://github.com/AnzenKodo/punk/tree/v0.11 */

  :root {
  color-scheme: light;
  --bg: var(--background);
  --fg: var(--foreground);
  --border: 1px solid var(--fg);
}

*:focus {
  outline: var(--border);
  outline-style: dashed;
  outline-offset: 2px;
}

::selection {
  color: #fefbfe;
  background: #0583f2;
}
::-webkit-scrollbar {
  border: var(--border);
  width: 1rem;
}
::-webkit-scrollar-track {
  background: var(--fg);
}
::-webkit-scrollbar-thumb {
  background: var(--fg);
}

body {
  background: var(--bg);
  color: var(--fg);
  accent-color: var(--theme);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "PT Sans", "Open Sans", "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-variant-ligatures: normal;
  font-size:100%;
  line-height: 1.5em;
  margin: 1em;
  word-spacing: .2em;
}

body header,
body main,
body footer,
body article{
  max-width: 40rem;
  margin: 0 auto;
}

body > header{
  margin-bottom: 2em;
}
body > header p{
  margin:0;
  font-size:0.85em;
}
body > header h1 {
  margin:0;
  font-size:1.5em;
}

nav ul{
  list-style:none;
  margin:0;
  padding:0;
}
nav li{
  display:inline-block;
  margin-right:.5em;
}
nav li:last-child, nav li:first-child {
  margin-right:0;
}

body > footer p {
  text-align: center;
  font-size: .9em;
}

/* Head style */

h1, h2, h3, h4, h5, h6{
  margin: 1em 0 0;
  line-height:1.2;
}

h1 {
  font-size:2.5em;
}
h2 {
  font-size:1.75em;
}
h3 {
  font-size:1.25em;
}
h4 {
  font-size:1.15em;
}
h5{
  font-size:1em;
}

h1:hover > a[href^="#"][id]:empty,
h1:focus > a[href^="#"][id]:empty,
h2:hover > a[href^="#"][id]:empty,
h3:focus > a[href^="#"][id]:empty,
h4:hover > a[href^="#"][id]:empty,
h4:focus > a[href^="#"][id]:empty,
h5:hover > a[href^="#"][id]:empty,
h5:focus > a[href^="#"][id]:empty,
h6:hover > a[href^="#"][id]:empty,
h6:focus > a[href^="#"][id]:empty {
  opacity:1;
}
h1 > a[href^="#"][id]:empty,
h2 > a[href^="#"][id]:empty,
h3 > a[href^="#"][id]:empty,
h4 > a[href^="#"][id]:empty,
h5 > a[href^="#"][id]:empty,
h6 > a[href^="#"][id]:empty{
  position:absolute;
  left:-0.65em;
  opacity:0;
  text-decoration:none;
  font-weight:400;
  line-height:1;
  color:#aaaaaa;
}

h1 + p,
h2 + p,
h3 + p,
h4 + p,
h5 + p,
h6 + p,
h1 + details,
h2 + details,
h3 + details,
h4 + details,
h5 + details,
h6 + details{
  margin-top:0.5em;
}

/* Paragraph style */

p{
  margin:1em 0;
}

p + ul, p + ol{
  margin-top:-0.75em;
}

p img, p picture{
  max-width: 100%;
}
p picture img{
  float:none;
  margin:0;
}
figure img {
  max-width: 100%;
}
figcaption {
  text-align: center;
  font-style: italic;
}

blockquote {
  font-style: italic;
}

/* Link Style */

a {
  color: var(--theme);
}

a:hover,
a:focus {
  text-decoration: none;
}

a:active {
  background: var(--theme);
  color: var(--bg);
}

/* List Style */

ul, ol{
  margin-top:0;
  padding-top:0;
  padding-left:2.5em;
}
ul li + li, ol li + li{
  margin-top:0.25em;
}

dd{
  margin-bottom:1em;
  margin-left:0;
  padding-left:2.5em;
}
dt{
  font-weight: bold;
}

/* Summary tags */

details {
  margin:1em 0;
  padding: .5em;
}
details[open] {
  padding-bottom:0.5em;
}

details summary > * {
  display: inline;
}

summary {
  font-weight: bold;
  cursor:pointer;
}

summary:focus {
  background: var(--theme);
}

/* Table tags */

table {
  border-collapse: collapse;
  overflow-x:auto;
  max-width:100%;
  margin-bottom: .8em;
}

table caption{
  font-size:.9em;
}

table th,
table td {
  border: var(--border);
  padding: 0.35em 0.75em;
}
table th {
  border: double var(--bg);
  font-weight: bold;
  background: var(--fg);
  color: var(--bg);
  text-align: center;
}


/* Demarcating edits */

del {
  background: #f20544;
}

ins {
  background: #01a252;
  text-decoration: none;
}

/* Form Elements */

form {
  margin: 0 auto;
  max-width: 80%;
}

form select, form label{
  display:block;
}
form label:not(:first-child){
  margin-top:1em;
}
form p label{
  display:inline;
}
form p label + label{
  margin-left:1em;
}
form legend:first-child + label{
  margin-top:0;
}
form select, form input[type], form textarea{
  margin-bottom:1em;
}
form input[type=checkbox], form input[type=radio]{
  margin-bottom:0;
}

legend {
  padding: .3em;
  font-weight: bold;
}

fieldset{
  margin:0;
  padding: 0.5em 1em;
  border: var(--border);
}

input {
  font-family: inherit;
  border: var(--border);
  margin: .5em 0;
}

input[disabled], button[disabled] {
  cursor: not-allowed;
}

input[type=text],
input[type=password],
input[type^=date],
input[type=email],
input[type=number],
input[type=search],
input[type=tel],
input[type=time],
input[type=month],
input[type=week],
input[type=url],
input[type=file] {
  width: 100%;
  font-size: 1em;
  margin: 0;
  width: 100%;
  display: block;
  padding: .2em;
  box-sizing: border-box;
}

input[type=range] {
  cursor: pointer;
}

button,
input[type=submit],
input[type=reset],
input[type=button]{
  font-family:inherit;
  font-size: 1em;
  border: var(--border);
  padding: .2em .5em;
  margin: .5em 0;
  cursor:pointer;
}

input[type=checkbox], input[type=radio]{
  cursor:pointer;
  margin: -.2em .3em 0 0;
  vertical-align:middle;
}

select {
  font-size: 1em;
  border: var(--border);
  padding: .2em;
  margin: 0;
  cursor: pointer;
}

textarea {
  font-family:inherit;
  font-size: 1em;
  border: var(--border);
  padding: .3em;
  width: 100%;
  box-sizing: border-box;
}

/* Code block */

code, kbd, var, samp{
  font-family:Consolas, "Lucida Console", Monaco, monospace;
  font-style:normal;
}

kbd {
  border: var(--border);
  border-radius: 10px;
  border-width: 1px 3px 3px 1px;
  padding: .1em .3em;
}

p code {
  border: var(--border);
  padding: .01em .3em;
  overflow-x: scroll;
}

pre{
  overflow-x:auto;
  font-size:0.8em;
  border: var(--border);
  padding: .5em;
}

pre > code {
  border: 0;
  padding: inherit;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: var(--foreground);
    --fg: var(--background);
      color-scheme: dark;
  }
}`;

const highlight = `:root {
  --punk-bg: #fefbfe;
  --punk-fg: #170327;
  --punk-bg-color: var(--punk-bg);
  --punk-fg-color: var(--punk-fg);
  --punk-red-color: #f20544;
  --punk-blue-color: #0583f2;
  --punk-brown-color: #b35c5d;
  --punk-green-color: #01a252;
  --punk-yellow-color: #f2b705;
  --punk-magenta-color: #36a598;
}
pre::selection {
  color: #fefbfe;
  background: #0583f2;
}
pre::-webkit-scrollbar {
  border: 1px solid var(--punk-fg-color);
  width: 1rem;
}
pre::-webkit-scrollar-track {
  background: var(--punk-fg-color);
}
pre::-webkit-scrollbar-thumb {
  background: var(--punk-fg-color);
}

pre {
  color: var(--punk-fg-color);
  font-size: 1rem;
}
code:not([class*="language-"]) {
  font-family: "Courier New", "Courier", monospace;
  background: var(--punk-bg-color);
  padding: 0.2em;
  border: 1px solid var(--punk-fg-color);
}
pre[class*="language-"] {
  border: 1px solid var(--punk-fg-color);
}

pre code.hljs {
  font-family: "Courier New", "Courier", monospace;
  display: block;
  overflow-x: auto;
  padding: .5em;
}
code.hljs {
  padding: 3px 5px;
}
.hljs {
  background: var(--punk-bg-color);
  color: var(--punk-fg-color);
}
.hljs-keyword,
.hljs-literal,
.hljs-name,
.hljs-selector-tag,
.hljs-strong,
.hljs-tag {
  color: var(--punk-red-color);
}
.hljs-code {
  color: var(--punk-blue-color);
}
.hljs-attribute,
.hljs-link,
.hljs-regexp,
.hljs-symbol {
  color: var(--punk-magenta-color);
}
.hljs-addition,
.hljs-built_in,
.hljs-bullet,
.hljs-emphasis,
.hljs-section,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-string,
.hljs-subst,
.hljs-template-tag,
.hljs-template-variable,
.hljs-title,
.hljs-type,
.hljs-variable {
  color: var(--punk-green-color);
}
.hljs-class .hljs-title,
.hljs-title.class_ {
  color: var(--punk-yellow-color);
}
.hljs-comment,
.hljs-deletion,
.hljs-meta,
.hljs-quote {
  color: var(--punk-brown-color);
}
.hljs-doctag,
.hljs-keyword,
.hljs-literal,
.hljs-section,
.hljs-selector-id,
.hljs-selector-tag,
.hljs-title,
.hljs-type {
  font-weight: 700;
}

@media (prefers-color-scheme: dark) {
  :root {
    --punk-bg-color: #000000;
    --punk-fg-color: #fefbfe;
  }
}`;

const blog = `body {
  letter-spacing: .05em;
}

.list {
  list-style: disc;
  padding: 1em;
}
.list > li {
  margin: 1em;
}
.list-name {
  font-size: 2em;
  line-height: 1.3em;
}
.list .meta {
  margin-bottom: 0;
}

.meta {
  margin:0;
  margin-bottom: 3em;
  padding:0;
  font-size: .8em;
}
.meta li {
  display: inline-block;
}
.meta li::before {
  content: '•';
  font-size: 1.5em;
  vertical-align: middle;
  margin-right: .2em;
}
.meta li:first-child::before {
  content: '';
  margin-right: 0em;
}
.meta-name {
  font-weight: bold;
}

.footnotes-sep {
  margin-top: 2em;
}

.email {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  margin: 2em 0;
}

.email a {
  color: var(--fg);
  text-decoration: none;
  background: var(--theme);
  padding: .5em 1em;
}
.email a:hover {
  background: var(--fg);
  color: var(--theme);
}

.skip-to-content-link {
  background: var(--theme);
  color: var(--fg);
  padding: .3em;
  position: absolute;
  transform: translateY(-200%);
}
.skip-to-content-link:focus {
  transform: translateY(0%);
}

.direct-link {
  text-decoration: none;
}

.search {
  max-width: 100%;
  margin: 3em 0;
  font-size: 1.2em;
}
.search input[type=submit] {
  margin: auto;
  display: block;
  padding-left: 1em;
  padding-right: 1em;
}
`;

export default function css(data) {
  const httpExist = /https:\/\/|http:\/\//.test(data.style);
  let style = "";

  if (data.style) {
    style = httpExist
      ? `<link rel="stylesheet" href="${data.style}">`
      : `<link rel="stylesheet" href="${data.start_url}${data.style}">`;
  } else {
    const root = `@charset "UTF-8";
      :root {
        --background: ${data.background};
        --foreground: ${data.foreground};
        --theme: ${data.theme};
      }`;

    style = "<style>" + root + punk + highlight + blog + "</style>";
  }

  return style;
}
