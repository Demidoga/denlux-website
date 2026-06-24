import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-color-profile=srgb"],
});
const page = await browser.newPage();
const errors = [];
page.on("console", m => { if (m.type()==="error") errors.push(m.text()); });
page.on("pageerror", e => errors.push(e.message));
await page.evaluateOnNewDocument(()=>{try{localStorage.setItem("denlux-theme","light")}catch{}});
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3210", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise(r=>setTimeout(r,500));
console.log("ERRORS:", JSON.stringify(errors, null, 2));
await page.screenshot({ path: "/tmp/denlux-shots/debug-full.png", fullPage: true });
await browser.close();
