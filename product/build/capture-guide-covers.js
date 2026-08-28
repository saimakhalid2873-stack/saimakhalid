const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { buildGuideHTML } = require('./pdf-template');
const { GUIDES } = require('./guides-content');

const ASSETS = path.join(__dirname, 'assets');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
  for (const guide of GUIDES) {
    const html = buildGuideHTML(guide);
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.locator('.page.cover').screenshot({ path: path.join(ASSETS, 'cover-' + guide.file + '.png') });
    console.log('Captured cover for', guide.file);
  }
  await browser.close();
})();
