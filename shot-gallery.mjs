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
  await page.evaluate(() => {
    const el = document.querySelector("#inside");
    if (el) el.scrollIntoView({ block: "center", behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1100));
  const el = await page.$("#inside");
  if (el) await el.screenshot({ path: `${OUT}/${label}.png` });
  else await page.screenshot({ path: `${OUT}/${label}.png` });
  await page.close();
}
await shot("light", 1440, 900, "gallery-light");
await shot("dark", 1440, 900, "gallery-dark");
await shot("light", 390, 844, "gallery-mobile");
await browser.close();
console.log("done");
