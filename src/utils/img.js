import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
} from "https://deno.land/x/imagemagick_deno@0.0.12/mod.ts";

export default function imageComp(entry, imgExt, buildPath) {
  if (!imgExt.includes(entry.ext)) return;

  const imgData = Deno.readFileSync(path);

  ImageMagick.read(imgData, (img) => {
    img.write((imgData) =>
      Deno.writeFile(
        buildPath,
        imgData,
      ), MagickFormat.Webp);
  });
}

export const initImg = await initializeImageMagick();
