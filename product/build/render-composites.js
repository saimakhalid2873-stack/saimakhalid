const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const COMPOSITES = path.join(__dirname, 'composites');
const OUT = path.join(__dirname, '..', 'listing-photos');
fs.mkdirSync(OUT, { recursive: true });

const FILES = [
  ['01-hero.html', '01-hero.png'],
  ['02-resume-closeup.html', '02-resume-closeup.png'],
  ['03-cover-references.html', '03-cover-and-references.png'],
  ['04-whats-included.html', '04-whats-included.png'],
  ['05-zoomed-details.html', '05-zoomed-details.png'],
  ['06-ats-callout.html', '06-ats-friendly.png'],
  ['07-format-compatibility.html', '07-format-compatibility.png'],
  ['08-bonus-guides.html', '08-bonus-guides.png'],
  ['09-two-designs.html', '09-two-designs.png'],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  for (const [src, dest] of FILES) {
    await page.goto('file://' + path.join(COMPOSITES, src));
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, dest) });
    console.log('Rendered', dest);
  }
  await browser.close();
})();
