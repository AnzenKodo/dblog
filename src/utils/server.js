import { serve } from "https://deno.land/std@0.148.0/http/mod.ts";
import { open } from "https://deno.land/x/open@v0.0.5/index.ts";

export default async function server(data, main) {
  data.start_url = `http://localhost:${data.port}/`;

  const reqHandler = async (req) => {
    try {
      main(data);
    } catch (e) {
      throw e;
    }

    const { pathname } = new URL(req.url);

    const filePath = data.output + pathname;
    let body;

    try {
      body = (await Deno.open(filePath)).readable;
    } catch (_e) {
      body = await Deno.readFile(data.output + "/404.html");
    }

    if (pathname === "/") {
      body = await Deno.readFile(data.output + "/index.html");
    }

    return new Response(body);
  };

  console.log('%cTo exit use "Ctrl + c".\n', `font-weight: bold;`);

  const style = `font-weight: bold; color: ${data.theme};`;

  if (Deno.args.includes("--noopen")) {
    console.log(
      '%cBrowser will not open because you are using "--noopen" option. To open Browser run without "--noopen" option.\n',
      style,
    );
  } else {
    await open("http://localhost:" + data.port);
    console.log(
      '%cOpening browser... (If you don\'t want to open Browser, run with "--noopen" option.)\n',
      style,
    );
  }

  serve(reqHandler, { port: data.port });
}
