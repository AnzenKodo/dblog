import config from "../../utils/data.js";

export const data = config(false);

const infos = {};
infos.name = "dblog";
infos.website = "https://anzenkodo.github.io/" + infos.name;
infos.docs = infos.website + "/posts/dblog-Docs.html";
infos.license = infos.website + "/LICENSE.html";
infos.markdown = infos.docs + "#markdown-guide";
infos.repo = "https://github.com/AnzenKodo/" + infos.name;
infos.issues = `${infos.repo}/issues/new`;
infos.package = "https://deno.land/x/" + infos.name;
infos.install = `deno run ${infos.package}/install.js`;
infos.run = `deno run -A ${infos.package}/mod.js`;
infos.meta = `---
title: If title is empty dblog will use filename as title.
description: If empty the first paragraph of the post will be used.
tags: [ "tag1", "tag2" ]
date: 20/08/2020
canonical:
---`;
infos.help = `${data.description}

Website: ${infos.website}
Package: ${infos.package}
Repo: ${infos.repo}
Docs: ${infos.docs}

USAGE:
  ${infos.name} [OPTIONS]

OPTIONS:
  --serve   Build blog and Start localhost.
    --noopen  Don't open browser, when starting localhost.
  --build   Build blog without starting localhost.
  --setup   Setup new blog.
  --backup  Restore blog if 'backup.json' file available.
  --readme  Generate 'README.md' file.
  --help    Print help information.
`;

export const info = infos;
