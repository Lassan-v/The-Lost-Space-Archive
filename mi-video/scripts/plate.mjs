// Render plate previews: MP4 + keyframe stills + contact sheet.
// Usage: node scripts/plate.mjs <CompositionId> [everyN=20] [--no-video] [--out=dir] [--crf=18]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const ids = args.filter((a) => !a.startsWith("--") && isNaN(Number(a)));
const every = Number(args.find((a) => !isNaN(Number(a))) ?? 20);
const noVideo = args.includes("--no-video");
const outArg = args.find((a) => a.startsWith("--out="));
const outFile = outArg ? outArg.slice(6) : null;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const chrome = path.join(root, "node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe");

for (const id of ids) {
  const composition = await selectComposition({ serveUrl, id });
  const dir = path.join(root, "previews", id);
  fs.mkdirSync(dir, { recursive: true });
  const frames = [];
  for (let f = 0; f < composition.durationInFrames; f += every) frames.push(f);
  if (frames[frames.length - 1] !== composition.durationInFrames - 1) frames.push(composition.durationInFrames - 1);
  const stills = [];
  for (const f of frames) {
    const out = path.join(dir, `f${String(f).padStart(3, "0")}.jpg`);
    await renderStill({ serveUrl, composition, frame: f, output: out, imageFormat: "jpeg", jpegQuality: 85, scale: 0.4 });
    stills.push(out);
  }
  execFileSync("node", ["scripts/contact.mjs", chrome, path.join("previews", `${id}-frames.png`), "200", ...stills], { stdio: "inherit" });
  if (!noVideo) {
    const output = outFile ?? path.join(root, "previews", `${id}.mp4`);
    execFileSync("npx", ["remotion", "render", id, output, "--codec=h264", "--crf=18", "--log=error"], { stdio: "inherit", shell: true });
    if (!fs.existsSync(output)) throw new Error("render missing: " + output);
    console.log("video", output, (fs.statSync(output).size / 1e6).toFixed(1) + " MB");
  }
}
