const lh = require('lighthouse');
const lighthouse = lh.default || lh;
const { launch } = require('chrome-launcher');
const { chromium } = require('@playwright/test');

const CHROME = process.env.CHROME_PATH || chromium.executablePath();
const PORT = process.env.LIGHTHOUSE_PORT || '4325';
const URLS = [
  `http://localhost:${PORT}/ar/`,
  `http://localhost:${PORT}/ar/join/`,
  `http://localhost:${PORT}/ar/docs/`,
];
const MIN_SCORE = 90;

(async () => {
  const chrome = await launch({
    chromePath: CHROME,
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });
  const opts = {
    port: chrome.port,
    output: 'json',
    logLevel: 'silent',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  };
  let failed = false;
  for (const url of URLS) {
    const result = await lighthouse(url, opts);
    const lhr = result && result.lhr;
    if (!lhr || lhr.runtimeError) {
      failed = true;
      console.log(url, 'ERROR', lhr && JSON.stringify(lhr.runtimeError));
      continue;
    }
    const cats = {};
    for (const k of Object.keys(lhr.categories)) cats[k] = Math.round(lhr.categories[k].score * 100);
    console.log(url, JSON.stringify(cats));
    for (const k of Object.keys(cats)) {
      if (cats[k] < MIN_SCORE) {
        failed = true;
        console.log(`  below ${MIN_SCORE}: ${k}`);
      }
    }
  }
  await chrome.kill();
  process.exit(failed ? 2 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
