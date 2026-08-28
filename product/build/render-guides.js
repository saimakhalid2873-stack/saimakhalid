const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { buildGuideHTML } = require('./pdf-template');
const { GUIDES } = require('./guides-content');

const OUT = path.join(__dirname, '..', '03-Bonus-Guides');
fs.mkdirSync(OUT, { recursive: true });

// Repaginate the single, unbounded content page into as many page-sized
// divs as needed, each carrying the same CSS padding — so every physical
// PDF page gets consistent margins instead of relying on the browser's
// print engine to fragment one overflowing div (which only keeps
// top/bottom padding on the first/last fragment, leaving continuation
// pages flush against the paper edge).
async function repaginate(page) {
  await page.evaluate(() => {
    const PAGE_HEIGHT_PX = 1056; // 11in at 96 CSS px/in, matching page.pdf() height:'11in'
    const pages = Array.from(document.querySelectorAll('.page:not(.cover)'));
    const original = pages[0];
    if (!original) return;

    const cs = getComputedStyle(original);
    const padTop = parseFloat(cs.paddingTop);
    const padBottom = parseFloat(cs.paddingBottom);
    const available = PAGE_HEIGHT_PX - padTop - padBottom;

    const pageheadEl = original.querySelector('.pagehead');
    const sections = Array.from(original.querySelectorAll(':scope > .content-section'));

    function newPageDiv() {
      const div = document.createElement('div');
      div.className = original.className; // "page"
      if (pageheadEl) div.appendChild(pageheadEl.cloneNode(true));
      return div;
    }

    const outPages = [newPageDiv()];
    let used = pageheadEl ? pageheadEl.getBoundingClientRect().height + 26 : 0; // + its own margin-bottom

    sections.forEach(sec => {
      const h = sec.getBoundingClientRect().height + 6; // + margin-bottom
      if (used + h > available && used > 0) {
        outPages.push(newPageDiv());
        used = pageheadEl ? pageheadEl.getBoundingClientRect().height + 26 : 0;
      }
      outPages[outPages.length - 1].appendChild(sec);
      used += h;
    });

    original.replaceWith(...outPages);
  });
}

(async () => {
  const browser = await chromium.launch();
  for (const guide of GUIDES) {
    const html = buildGuideHTML(guide);
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await repaginate(page);
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
