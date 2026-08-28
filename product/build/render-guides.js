const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { buildGuideHTML } = require('./pdf-template');
const { GUIDES } = require('./guides-content');

const OUT = path.join(__dirname, '..', '03-Bonus-Guides');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  for (const guide of GUIDES) {
    const html = buildGuideHTML(guide);
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.pdf({
      path: path.join(OUT, guide.file + '.pdf'),
      width: '8.5in',
      height: '11in',
      printBackground: true,
    });
    console.log('Rendered', guide.file + '.pdf');
    await page.close();
  }
  await browser.close();
})();
