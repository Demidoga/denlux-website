import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
const URL = "http://localhost:3210";
const OUT = "/tmp/denlux-shots";
mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-color-profile=srgb"],
});
async function shot(theme, width, height, label) {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument((t) => { try { localStorage.setItem("denlux-theme", t); } catch {} }, theme);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 850));
  await page.screenshot({ path: `${OUT}/${label}.png` });
  await page.close();
}
await shot("light", 1440, 900, "hero-light");
await shot("dark", 1440, 900, "hero-dark");
await shot("light", 1920, 1000, "hero-light-wide");
await shot("light", 390, 844, "hero-light-mobile");
await browser.close();
console.log("done");
