import config from "../utils/data.js";

export const data = config(false);

const command =
  "deno run --allow-write --allow-read --allow-net --allow-run https://deno.land/x/dblog/mod.js";

const fileOptions = `---
title: If empty the file name will be used
description: If empty the first paragraph will be used.
tags: [ "tag1", "tag2" ]
date: 20/08/2020
canonical:
---`;

export const helpText = `${data.description}

Website: https://anzenkodo.github.io/dblog
Repo: https://github.com/AnzenKodo/dblog

USAGE:
  ${command} [OPTIONS]

OPTIONS:
            If no options are given the localhost will run normally.
  --noopen  Don't open browser, when starting localhost.
  --help    Print help information.
  --build   Build blog without starting localhost.
  --setup   Setup new blog.
  --backup  Restore blog if 'backup.json' file available.
  --readme  Generate dblog 'README.md' file.
`;

export const dblogDocs = `# dblog

[![License: MIT](https://img.shields.io/github/license/AnzenKodo/dblog?style=for-the-badge)](https://anzenkodo.github.io/dblog/LICENSE)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/AnzenKodo/dblog/dblog%20setup/main?logo=github&style=for-the-badge)](https://github.com/AnzenKodo/dblog/actions/workflows/setup.yml)

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
- Auto generate:
  - RSS Feed
  - Github Pages Actions file
  - Favicon
  - Sitemap
  - 404 page
  - CSS
- No Client side JavaScript
- Minified HTML & Inline CSS
- Lightweight

## Getting Started
- Download deno from https://deno.land/ and install it.
- After installing deno run following commands.
\`\`\`sh
# See all the options that are available
${command} --help

# Setup the your blog (Skip this if already your blog setup)
${command} --setup

# Make your blog and Run on localhost
${command}
\`\`\`

## Live Demo & Folder
- [Live Demo](https://AnzenKodo.github.io/dblog)
- [Generated Files](https://github.com/AnzenKodo/dblog/tree/gh-pages)

## Configuration
Place \`config.json\` in root folder to edit default configuration. The \`config.json\` is optional.

**The \`config.json\` with default configuration:**
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`

**Note:** Every option is optional.
- **name** - Name of your blog.
- **start_url** - Start url of your site. *Example:* 'https://example.com/', 'https://blog.example.com/', 'https://example.com/blog/'
- **email** - Your email address. This will enable 'Reply with Email' button in posts.
- **author** - Your name or username.
- **posts** - Path of posts.
- **output** - Folder where your blog build will be placed. *Example:* './blog', '../site/blog', 'site/blog'.
- **favicon** - Favicon location. *If empty generated favicon will be used*. *Example:* './favicon.png', './static/favicon.icon', '../favicon.jpg'.
- **lang** - You blog language in 'RFC 5646' format. Example: 'ja' for Japanese, 'sv' for Swedish, 'it' for Italian. See [List of common primary language subtags in Wikipedia](https://wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags)
- **footer** - Footer of your website. *Supports Commonmark Markdown format*. *Example:* \`Made by [AnzenKodo](https://anzenkodo.github.io/AnzenKodo) uder [MIT License](https://github.com/dblog/LICENSE.html)\`.
- **port** - Port of your blog on localhost. *Example*: '8080', '8300', '8400'.
- **background** - Background color in light mode. Becomes foreground color in light mode. *Example:* '#000000', "#ffffff', '##FEFBFE'.
- **foreground** - Foreground color in light mode. Becomes background color in light mode. *Example:* '#000000', "#ffffff', '##FEFBFE'.
- **theme** - Blog theme color. *Example:* '#0583f2', '#f20544', '#f2b705'.
- **page404** - 404 page message. *Supports Commonmark Markdown format*. *Example:* 'Sorry page not found :('.
- **backup** - Backup file location. *Example:* \`false\` to don't generat \`backup.json\` file, './backup.json', './site/backup.json', '../backup.json'.
- **exclude** - Exclude file or folder. *Example:*
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

## Cli Options

\`\`\`sh
${helpText}
\`\`\`

## File Options
\`\`\`
${fileOptions}
\`\`\`
- **date** - If empty the file date will be used. *Note:* The file \`date\` might not always right. So always give you own date.
- **canonical** - Share content between multiple sites without impacting SEO. Just put canonical URL. Know more about [canonical url](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls).

### If file name start with underscore "_" it will be consider as draft.
**Example:** \`posts/_This is draf.md\`

## Markdown Guide

### [Commonmark](https://commonmark.org/help/) Syntex

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
[dblog website](https://anzenkodo.github.io/dblog)
![Jurassic Deno by Samip Poudel](https://deno.land/images/artwork/jurassicDeno.jpg)
\`\`\`
[dblog website](https://anzenkodo.github.io/dblog)
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
![Deno](https://deno.land/images/artwork/deno_matrix.png "Matrix by bramaudi")

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

export const template = `${fileOptions}

# See [Markdown Guide](https://anzenkodo.github.io/dblog/posts/dblog-Docs.html#markdown-guide) to get started
`;

export const workflow =
  `# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

# This workflow will install Deno then run Deno lint and test.
# For more information see: https://github.com/denoland/setup-deno

name: dblog setup

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Setup repo
        uses: actions/checkout@v3

      - name: Setup Deno
        # uses: denoland/setup-deno@v1
        uses: denoland/setup-deno@004814556e37c54a2f6e31384c9e18e983317366
        with:
          deno-version: v1.x

      - name: Run Build
        run: ${command} --build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site`;
