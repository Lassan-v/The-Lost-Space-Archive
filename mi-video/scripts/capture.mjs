// Captures real screens of the live site (English UI) for the promo video.
// Usage: node scripts/capture.mjs <chromeExecutable>
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://thelostspacearchive.vercel.app/?_vercel_share=VLKuEYAZcLvkyiUpMJCQRXauz7wc2cLP";
const OUT = path.resolve("public/screens");
fs.mkdirSync(OUT, { recursive: true });

const exe = process.argv[2];
const browser = await puppeteer.launch({
  executablePath: exe,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const fullProgress = {
  completedDossiers: ["sojourner-mpf", "mars_mer_rovers", "ingenuity-mh", "surveyor-3", "apollo17-lrv-3"],
  visitedDossiers: ["sojourner-mpf", "mars_mer_rovers", "ingenuity-mh", "surveyor-3", "apollo17-lrv-3"],
  collectedFragments: [
    "sojourner-wheel-track",
    "spirit-silica-shard",
    "opportunity-hematite-blueberry",
    "ingenuity-rotor-blade",
    "surveyor3-scoop-tip",
    "orange-soil-vial",
  ],
  currentLocation: "constellation",
  challengeProgress: {},
};
const partialProgress = {
  ...fullProgress,
  completedDossiers: ["sojourner-mpf", "ingenuity-mh"],
  collectedFragments: ["sojourner-wheel-track", "ingenuity-rotor-blade", "spirit-silica-shard"],
};

async function newPage(progress) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.evaluateOnNewDocument((p) => {
    try {
      localStorage.setItem("lost-space-archive-language", "en");
      if (p) localStorage.setItem("lost-space-archive-progress", JSON.stringify(p));
      else localStorage.removeItem("lost-space-archive-progress");
    } catch {}
  }, progress);
  // Reduced motion shows final (fully revealed) state, so full-page shots have no hidden sections.
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  return page;
}

async function shot(page, route, name, { full = false, before } = {}) {
  await page.goto(BASE + "#" + route, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1800));
  if (before) {
    await before(page);
    await new Promise((r) => setTimeout(r, 1200));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  try { await page.screenshot({ path: path.join(OUT, name + ".png"), fullPage: full }); }
  catch (e) {
    const h = await page.evaluate(() => Math.min(document.documentElement.scrollHeight, 2600));
    await page.setViewport({ width: 390, height: h, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUT, name + ".png") });
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  }
  console.log("saved", name);
}

const ONLY_LATE = process.env.ONLY_LATE === "1";
const p0 = await newPage(null);
if (!ONLY_LATE) {
await shot(p0, "/", "welcome");
await shot(p0, "/", "welcome-full", { full: true });
await shot(p0, "/station", "station");
await shot(p0, "/station", "station-full", { full: true });
await shot(p0, "/mars", "mars");
await shot(p0, "/mars", "mars-full", { full: true });
await shot(p0, "/moon", "moon-full", { full: true });
await shot(p0, "/mars", "mars-selected-full", {
  full: true,
  before: async (pg) => {
    for (const el of await pg.$$("button")) {
      const l = await el.evaluate((e) => e.getAttribute("aria-label") || "");
      if (l.startsWith("Sojourner")) {
        await el.click();
        break;
      }
    }
  },
});
await shot(p0, "/dossier/sojourner-mpf?object=mars_sojourner", "dossier-sojourner-full", { full: true });
await shot(p0, "/dossier/mars_mer_rovers?object=mars_spirit", "dossier-spirit-full", { full: true });
await shot(p0, "/dossier/ingenuity-mh?object=mars_ingenuity", "dossier-ingenuity-full", { full: true });
await shot(p0, "/challenge/sojourner-mpf", "challenge-sojourner-full", { full: true });
await shot(p0, "/challenge/ingenuity-mh?object=mars_ingenuity", "challenge-ingenuity-full", { full: true });
await shot(p0, "/challenge/surveyor-3?object=moon_surveyor3", "challenge-surveyor-full", { full: true });
await shot(p0, "/challenge/apollo17-lrv-3?object=moon_apollo17_lrv", "challenge-apollo17-full", { full: true });

}
const p1 = await newPage(partialProgress);
await shot(p1, "/fragment/sojourner-mpf", "fragment-sojourner-full", { full: true });
await shot(p1, "/constellation", "constellation-partial-full", { full: true });

const p2 = await newPage(fullProgress);
await shot(p2, "/constellation", "constellation-full", { full: true });
await shot(p2, "/station", "station-complete");

await browser.close();
