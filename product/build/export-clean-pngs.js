const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const HTML_PATH = path.join(__dirname, 'resumegenerator.html');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'resume-data.json'), 'utf8'));

const OUT = path.join(__dirname, '..', '05-PNG-Images');
fs.mkdirSync(OUT, { recursive: true });

// [docType, variant, pageSize, outName]
const JOBS = [
  ['resume', 'B', 'letter', 'Healthcare-Resume-Design1-USLetter'],
  ['resume', 'B', 'a4', 'Healthcare-Resume-Design1-A4'],
  ['resume', 'A', 'letter', 'Healthcare-Resume-Design2-USLetter'],
  ['resume', 'A', 'a4', 'Healthcare-Resume-Design2-A4'],
  ['cover', 'B', 'letter', 'Healthcare-CoverLetter-Design1-USLetter'],
  ['cover', 'B', 'a4', 'Healthcare-CoverLetter-Design1-A4'],
  ['cover', 'A', 'letter', 'Healthcare-CoverLetter-Design2-USLetter'],
  ['cover', 'A', 'a4', 'Healthcare-CoverLetter-Design2-A4'],
  ['references', 'B', 'letter', 'Healthcare-References-Design1-USLetter'],
  ['references', 'B', 'a4', 'Healthcare-References-Design1-A4'],
  ['references', 'A', 'letter', 'Healthcare-References-Design2-USLetter'],
  ['references', 'A', 'a4', 'Healthcare-References-Design2-A4'],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1700 }, deviceScaleFactor: 2 });

  for (const [docType, variant, pageSize, outName] of JOBS) {
    await page.goto('file://' + HTML_PATH);
    await page.evaluate(({ d, docType, variant, pageSize }) => {
      state.data = d.data; state.coverData = d.coverData; state.referencesData = d.referencesData;
      state.parsed = true; enterWorkspace();
      setCategory('healthcare'); setVariant(variant); setPageSize(pageSize); setDocType(docType);
    }, { d: DATA, docType, variant, pageSize });
    await page.addStyleTag({ content: '.export-bar{ display:none !important; }' });
    await page.waitForTimeout(200);
    await page.locator('#previewPage').screenshot({ path: path.join(OUT, outName + '.png') });
    console.log('Saved', outName + '.png');
  }

  await browser.close();
})();
