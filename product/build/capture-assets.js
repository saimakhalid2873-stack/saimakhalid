const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const HTML_PATH = path.join(__dirname, 'resumegenerator.html');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'resume-data.json'), 'utf8'));

const ASSETS = path.join(__dirname, 'assets');
fs.mkdirSync(ASSETS, { recursive: true });

async function setup(page, docType, variant) {
  await page.goto('file://' + HTML_PATH);
  await page.evaluate(({ d, docType, variant }) => {
    state.data = d.data; state.coverData = d.coverData; state.referencesData = d.referencesData;
    state.parsed = true; enterWorkspace();
    setCategory('healthcare'); setVariant(variant); setPageSize('letter'); setDocType(docType);
  }, { d: DATA, docType, variant });
  await page.addStyleTag({ content: '.export-bar{ display:none !important; }' });
  await page.waitForTimeout(250);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1500 }, deviceScaleFactor: 2 });

  await setup(page, 'resume', 'B');
  await page.locator('#previewPage').screenshot({ path: path.join(ASSETS, 'resume-design1.png') });
  await page.locator('.res-header-block').screenshot({ path: path.join(ASSETS, 'crop-header.png') });
  await page.locator('.res-skills-line').screenshot({ path: path.join(ASSETS, 'crop-skills.png') });
  const experienceEntries = page.locator('.res-entry');
  await experienceEntries.nth(0).screenshot({ path: path.join(ASSETS, 'crop-experience.png') });
  // Licenses & Certifications is a custom section -> find by heading text
  const sections = page.locator('.res-section-title');
  const count = await sections.count();
  for (let i = 0; i < count; i++) {
    const t = await sections.nth(i).innerText();
    if (t.trim().toLowerCase() === 'licenses & certifications') {
      // grab the following sibling block (until next section title) by bounding box
      const box = await sections.nth(i).boundingBox();
      const nextBox = i + 1 < count ? await sections.nth(i + 1).boundingBox() : null;
      const pageBox = await page.locator('#previewPage').boundingBox();
      const clip = {
        x: pageBox.x, y: box.y,
        width: pageBox.width,
        height: (nextBox ? nextBox.y : pageBox.y + pageBox.height) - box.y,
      };
      await page.screenshot({ path: path.join(ASSETS, 'crop-licenses.png'), clip });
    }
  }

  await setup(page, 'resume', 'A');
  await page.locator('#previewPage').screenshot({ path: path.join(ASSETS, 'resume-design2.png') });

  await setup(page, 'cover', 'B');
  await page.locator('#previewPage').screenshot({ path: path.join(ASSETS, 'cover-letter.png') });

  await setup(page, 'references', 'B');
  await page.locator('#previewPage').screenshot({ path: path.join(ASSETS, 'references.png') });

  await browser.close();
  console.log('Assets captured');
})();
