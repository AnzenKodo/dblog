import { info } from "./text.js";

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
        run: ${info.run} --build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site`;
