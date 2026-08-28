const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.join(__dirname, 'resumegenerator.html');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'resume-data.json'), 'utf8'));

const WORD_OUT = path.join(__dirname, '..', '01-Templates-Word');
const PDF_OUT = path.join(__dirname, '..', '02-Templates-PDF');
fs.mkdirSync(WORD_OUT, { recursive: true });
fs.mkdirSync(PDF_OUT, { recursive: true });

// [docType, category, variant, pageSize, outBaseName]
const JOBS = [
  ['resume', 'healthcare', 'B', 'letter', 'Healthcare-Resume-Design1-USLetter'],
  ['resume', 'healthcare', 'B', 'a4', 'Healthcare-Resume-Design1-A4'],
  ['resume', 'healthcare', 'A', 'letter', 'Healthcare-Resume-Design2-USLetter'],
  ['cover', 'healthcare', 'B', 'letter', 'Healthcare-CoverLetter-Design1-USLetter'],
  ['cover', 'healthcare', 'B', 'a4', 'Healthcare-CoverLetter-Design1-A4'],
  ['references', 'healthcare', 'B', 'letter', 'Healthcare-References-Design1-USLetter'],
  ['references', 'healthcare', 'B', 'a4', 'Healthcare-References-Design1-A4'],
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });

  // Chromium silently drops automatic downloads past ~10 per tab without a
  // user gesture, so each job gets its own fresh page (the cap is per-tab).
  async function freshPage(docType, category, variant, pageSize) {
    const page = await context.newPage();
    page.on('pageerror', err => console.log('PAGE EXCEPTION:', err.message));
    await page.goto('file://' + HTML_PATH);
    await page.evaluate(({ d, docType, category, variant, pageSize }) => {
      state.data = d.data;
      state.coverData = d.coverData;
      state.referencesData = d.referencesData;
      state.parsed = true;
      enterWorkspace();
      setCategory(category);
      setVariant(variant);
      setPageSize(pageSize);
      setDocType(docType);
    }, { d: DATA, docType, category, variant, pageSize });
    return page;
  }

  for (const [docType, category, variant, pageSize, base] of JOBS) {
    const page = await freshPage(docType, category, variant, pageSize);
    await page.waitForTimeout(150);

    // PDF export
    {
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.evaluate(() => downloadPDF()),
      ]);
      const dest = path.join(PDF_OUT, base + '.pdf');
      await download.saveAs(dest);
      console.log('Saved', dest);
    }

    // Word export
    {
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.evaluate(() => downloadWord()),
      ]);
      const dest = path.join(WORD_OUT, base + '.doc');
      await download.saveAs(dest);
      console.log('Saved', dest);
    }

    await page.close();
  }

  await browser.close();
})();
