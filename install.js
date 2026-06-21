import { info } from "./src/args/text/text.js";

if (Deno.version.deno < "1.20.1") {
  console.log("----------------------------------------");
  console.error("Error installing " + info.name);
  console.log(`${info.name} needs Deno 1.20.1 or greater`);
  console.log(`Your current version is ${Deno.version.deno}`);
  console.log(`Run 'deno install' and try again`);
  console.log("----------------------------------------");
  Deno.exit(1);
}

const process = Deno.run({
  cmd: [
    Deno.execPath(),
    "install",
    "--unstable",
    "-Af",
    `--no-check`,
    `--name=${info.name}`,
    new URL("./mod.js", import.meta.url).href,
  ],
});

const status = await process.status();
process.close();

if (!status.success) {
  console.log();
  console.error("Error installing " + info.name);
  console.log("You can report an issue at " + info.issues);
  console.log();
  Deno.exit(1);
}
