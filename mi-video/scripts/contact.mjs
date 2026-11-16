// Builds a contact sheet PNG of images for quick review.
// Usage: node scripts/contact.mjs <chromeExe> <out.png> <colWidth> <img1> <img2> ...
import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const [exe, out, colW, ...imgs] = process.argv.slice(2);
const w = Number(colW);
const html = `<html><body style="margin:0;background:#222;display:flex;align-items:flex-start;gap:8px;padding:8px;font:12px sans-serif;color:#fff">
${imgs
  .map(
    (i) =>
      `<div style="width:${w}px"><div>${path.basename(i)}</div><img src="${pathToFileURL(path.resolve(i)).href}" style="width:${w}px;display:block"></div>`,
  )
  .join("")}</body></html>`;
const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: (w + 8) * imgs.length + 16, height: 600 });
const tmp = path.resolve(out + ".html");
fs.writeFileSync(tmp, html);
await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
fs.unlinkSync(tmp);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("ok", out);
