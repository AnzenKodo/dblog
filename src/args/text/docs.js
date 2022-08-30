import { data, info } from "./text.js";

export const docs = `# ${info.name}

[![License: MIT](https://img.shields.io/github/license/${data.author}/${info.name}?style=for-the-badge)](${info.license})
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/${data.author}/${info.name}/setup/main?logo=github&style=for-the-badge)](https://github.com/${data.author}/${info.name}/actions/workflows/setup.yml)

${data.description}

## Features
- Easy to:
  - Setup
  - Configure
  - Write
- Supports:
  - Tags
  - Canonical
  - [Open Graph](https://ogp.me)
  - Analytics
  - [GitHub Pages](https://pages.github.com/)
- Auto generate:
  - GitHub Pages Actions file
  - Favicon
  - Sitemap
  - 404 page
  - CSS
  - \`mainfest.json\` file
  - Feeds
    - RSS
    - JSON
    - Atom
- No Client side JavaScript
- Minified HTML & Inline CSS
- Lightweight

## Getting Started

### Installing
- Download deno from https://deno.land/ and install it.
- After installing deno run following commands.
\`\`\`sh
# Install the ${info.name}
${info.install} # Add deno to path, if you didn't already.

# See all the options that are available
${info.name} --help

# Setup the your blog (Skip this if already your blog setup)
${info.name} --setup

# Make your blog and Run on localhost
${info.name} --serve
\`\`\`

### Update
To update ${info.name}, rerun the installation command.
\`\`\`sh
${info.install}
\`\`\`

### Run ${info.name} without installing ${info.name}
\`\`\`sh
${info.run} --help
\`\`\`

## Live Demo & Folder
- [Live Demo](${info.website})
- [Generated Files](${info.repo}/tree/gh-pages)

## Configuration
Place \`config.json\` in root folder to edit default configuration. The \`config.json\` is optional.

**The \`config.json\` with default configuration:**
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`

**Note:** Every option is optional.
- **name** - Name of your blog.
- **start_url** - Start URL of your site. *Example:* 'https://example.com/', 'https://blog.example.com/', 'https://example.com/blog/'
- **email** - Your email address. This will enable 'Reply with Email' button in posts.
- **author** - Your name or username.
- **posts** - Path of posts.
- **output** - Folder where your blog build will be placed. *Example:* './blog', '../site/blog', 'site/blog'.
- **favicon** - ***Recommended 500x500px***. Favicon location. *If empty, generated favicon will be used*. *Example:* './favicon.png', './static/favicon.icon', '../favicon.jpg'.
- **lang** - Blog language in 'RFC 5646' format. Example: 'ja' for Japanese, 'sv' for Swedish, 'it' for Italian. See [List of common primary language subtags in Wikipedia](https://wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags)
- **footer** - Footer of your website. *Supports CommonMark Markdown format*. *Example:* \`Made by [${data.author}](https://${data.author}.github.io/${data.author}) uder [MIT License](${info.license})\`.
- **port** - Port of your blog on localhost. *Example*: '8080', '8300', '8400'.
- **background** - Background color in light mode. Becomes foreground color in light mode. *Example:* '#000000', "#ffffff', '##FEFBFE'.
- **foreground** - Foreground color in light mode. Becomes background color in light mode. *Example:* '#000000', "#ffffff', '##FEFBFE'.
- **theme** - Blog theme color. *Example:* '#0583f2', '#f20544', '#f2b705'.
- **page404** - 404 page message. *Example:* 'Sorry, page not found :('.
- **backup** - Backup file location. *Example:* \`false\` to don't generate \`backup.json\` file, './backup.json', './site/backup.json', '../backup.json'.
- **exclude** - Exclude files or folder. *Example:*
  \`\`\`json
  "exclude": [ ".env", "todo.md", "drafts" ],
  \`\`\`
- **nav** - Nav bar item list. Example:
  \`\`\`json
  "nav": {
    "about": "./about.md",
    "stie": "https://anzenkodo.github.io/AnzenKodo"
  }
  \`\`\`
- **head** - If you analytics or any other tags you want to put on head tag. *Example:* \`<link rel="preconnect" href="//www.google-analytics.com" crossorigin="">\`.

## CLI Options

\`\`\`sh
${info.help}
\`\`\`

## File Options
\`\`\`
${info.meta}
\`\`\`
- **date** - If empty, the file date will be used. *Note:* The file \`date\` might not always right. So always give you own date.
- **canonical** - Share content between multiple sites without impacting SEO. Just put canonical URL. Know more about [canonical url](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls).

### If file name start with underscore "_" it will be consider as draft.
**Example:** \`posts/_This is draft.md\`

## Markdown Guide

### [CommonMark](https://commonmark.org/help/) Syntex

#### Heading

\`\`\`md
# H1
## H2
### H3
#### H4
##### H5
###### H6
\`\`\`
# H1
## H2
### H3
#### H4
##### H5
###### H6

#### Inline style
\`\`\`md
**Bold** *Italic* ~~Strikethrough~~
\`\`\`
**Bold** *Italic* ~~Strikethrough~~

#### Link and Image
\`\`\`md
[website](${info.website})
![Jurassic Deno by Samip Poudel](https://deno.land/images/artwork/jurassicDeno.jpg)
\`\`\`
[website](${info.website})
![Jurassic Deno by Samip Poudel](https://deno.land/images/artwork/jurassicDeno.jpg)

#### Blockquote
\`\`\`md
> 'The road to hell is paved with good intentions' by Abbot Bernard
\`\`\`
> 'The road to hell is paved with good intentions' by Abbot Bernard

#### List
\`\`\`md
* List
  * List
* List

1. One
2. Two
3. Three
\`\`\`
* List
  * List
* List

1. One
2. Two
3. Three

#### Horizontal rule
\`\`\`md
---
\`\`\`
---


#### Code block
<div class="highlight highlight-source-lisp notranslate position-relative overflow-auto">
<pre>
\`Inline code\` with backticks
\`\`\`js
  console.log("Code Blog in JavaScript");
\`\`\`
</pre>
</div>

\`Inline code\` with backticks
\`\`\`js
console.log("Code Blog in JavaScript");
\`\`\`

### Additional Markdown syntax

#### Checkbox
\`\`\`md
- [ ] Checkbox
- [x] Checkbox with tick
\`\`\`
- [ ] Checkbox
- [x] Checkbox with tick


#### Image with caption
\`\`\`md
![Deno](https://deno.land/images/artwork/deno_matrix.png "Matrix by bramaudi")
\`\`\`
<figure data-type="image"><img src="https://deno.land/images/artwork/deno_matrix.png" alt="Deno" loading="lazy" decoding="async"><figcaption>Matrix by bramaudi</figcaption></figure>

#### Footer
\`\`\`md
Here is a footnote reference[^1].
[^1]: Here is the footnote.
\`\`\`
Here is a footnote reference[^1].
[^1]: Here is the footnote.

#### Additional inline syntax
\`\`\`md
~sub~
^sup^
==mark==
[[kbd]]
_underline_
++insert++
~~delete~~
\`\`\`
<sub>sub</sub>
<sup>sup</sup>
<mark>mark</mark>
<kbd>kbd</kbd>
<u>underline</u>
<ins>insert</ins>
<del>delete</del>

#### Description list
\`\`\`md
: Definition 1
Term 2 with *inline markup*
: Definition 2
Third paragraph of definition 2.
\`\`\`
<dl>
  <dt>Definition 1</dt>
  <dd>Term 2 with inline.</dd>
  <dt>Definition 2</dt>
  <dd>Third paragraph of definition 2.</dd>
</dl>

#### Abbreviation
\`\`\`md
*[abbr]: Abbreviation
\`\`\`
<abbr title="Abbreviation">abbr</abbr>

#### Table

##### Normal
\`\`\`md
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
\`\`\`
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

##### Multiline
\`\`\`md
|   Markdown   | Rendered HTML |
|--------------|---------------|
|    *Italic*  | *Italic*      | \\
|              |               |
|    - Item 1  | - Item 1      | \\
|    - Item 2  | - Item 2      |
|    \`\`\`python | \`\`\`python       \\
|    .1 + .2   | .1 + .2         \
|    \`\`\`       | \`\`\`           |
\`\`\`
<table><thead><tr><th>Markdown</th><th>Rendered HTML</th></tr></thead> <tbody>
  <tr> <td> <pre><code>*Italic* </code></pre> </td> <td> <p><em>Italic</em></p>
  </td> </tr> <tr> <td> <pre><code>- Item 1 - Item 2</code></pre> </td> <td>
  <ul> <li>Item 1</li> <li>Item 2</li> </ul> </td> </tr> <tr> <td>
<pre><code>
\`\`\`python
.1 + .2
\`\`\`
</code></pre> </td> <td> <pre><code class="language-python">.1 + .2
  </code></pre> </td> </tr> </tbody> </table>

##### Rowspan
\`\`\`md
Stage | Direct Products | ATP Yields
----: | --------------: | ---------:
Glycolysis | 2 ATP ||
^^ | 2 NADH | 3--5 ATP |
Pyruvaye oxidation | 2 NADH | 5 ATP |
Citric acid cycle | 2 ATP ||
^^ | 6 NADH | 15 ATP |
^^ | 2 FADH2 | 3 ATP |
**30--32** ATP |||
[Net ATP yields per hexose]
\`\`\`
<table> <caption id="netatpyieldsperhexose">Net ATP yields per hexose</caption>
  <thead> <tr> <th align="right">Stage</th> <th align="right">Direct
Products</th> <th align="right">ATP Yields</th> </tr> </thead> <tbody> <tr> <td
align="right" rowspan="2">Glycolysis</td> <td align="right" colspan="2">2
ATP</td> </tr> <tr> <td align="right">2 NADH</td> <td align="right">3–5
ATP</td> </tr> <tr> <td align="right">Pyruvaye oxidation</td> <td
align="right">2 NADH</td> <td align="right">5 ATP</td> </tr> <tr> <td
align="right" rowspan="3">Citric acid cycle</td> <td align="right"
colspan="2">2 ATP</td> </tr> <tr> <td align="right">6 NADH</td> <td
align="right">15 ATP</td> </tr> <tr> <td align="right">2 FADH2</td> <td
align="right">3 ATP</td> </tr> <tr> <td align="right"
colspan="3"><strong>30–32</strong> ATP</td> </tr> </tbody> </table>

#### Headerless
\`\`\`md
|--|--|--|--|--|--|--|--|
|♜|  |♝|♛|♚|♝|♞|♜|
|  |♟|♟|♟|  |♟|♟|♟|
|♟|  |♞|  |  |  |  |  |
|  |♗|  |  |♟|  |  |  |
|  |  |  |  |♙|  |  |  |
|  |  |  |  |  |♘|  |  |
|♙|♙|♙|♙|  |♙|♙|♙|
|♖|♘|♗|♕|♔|  |  |♖|
\`\`\`
<table> <tbody> <tr> <td>♜</td> <td></td> <td>♝</td> <td>♛</td> <td>♚</td>
  <td>♝</td> <td>♞</td> <td>♜</td> </tr> <tr> <td></td> <td>♟</td> <td>♟</td>
  <td>♟</td> <td></td> <td>♟</td> <td>♟</td> <td>♟</td> </tr> <tr> <td>♟</td>
  <td></td> <td>♞</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td>♗</td> <td></td> <td></td> <td>♟</td> <td></td> <td></td>
  <td></td> </tr> <tr> <td></td> <td></td> <td></td> <td></td> <td>♙</td>
  <td></td> <td></td> <td></td> </tr> <tr> <td></td> <td></td> <td></td>
  <td></td> <td></td> <td>♘</td> <td></td> <td></td> </tr> <tr> <td>♙</td>
  <td>♙</td> <td>♙</td> <td>♙</td> <td></td> <td>♙</td> <td>♙</td> <td>♙</td>
  </tr> <tr> <td>♖</td> <td>♘</td> <td>♗</td> <td>♕</td> <td>♔</td> <td></td>
  <td></td> <td>♖</td> </tr> </tbody> </table>`;
