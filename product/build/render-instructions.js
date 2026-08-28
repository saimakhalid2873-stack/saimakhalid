const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '..');

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: 8.5in 11in; margin: 0; }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{ font-family:'Source Sans 3', Georgia, serif; color:#232323; font-size:11.5px; line-height:1.55; }
  .page{ width:8.5in; height:11in; padding:0.75in; position:relative; }
  .corner{ position:absolute; top:0; right:0; width:1.5in; height:1.5in; background:#2A6B6E; border-radius:0 0 0 100%; opacity:0.92; }
  .brand{ font-family:'EB Garamond',serif; font-size:12px; letter-spacing:0.26em; color:#2A6B6E; font-weight:600; text-transform:uppercase; margin-bottom:6px; }
  h1{ font-family:'EB Garamond',serif; font-size:28px; font-weight:600; color:#1c1c1c; margin:0 0 6px; }
  .sub{ font-size:13px; color:#6b6b6b; margin:0 0 26px; max-width:5.6in; }
  h2{ font-family:'EB Garamond',serif; font-size:14.5px; font-weight:600; color:#2A6B6E; margin:20px 0 8px; padding-bottom:6px; border-bottom:1.5px solid #2A6B6E; }
  h2:first-of-type{ margin-top:0; }
  ol, ul{ margin:0 0 4px; padding-left:20px; }
  li{ margin-bottom:6px; }
  .step-num{ display:inline-block; width:20px; }
  .callout{ background:#E3EEEE; border-left:3px solid #2A6B6E; border-radius:4px; padding:12px 16px; margin:18px 0 0; font-size:11px; color:#1c1c1c; }
  .callout b{ color:#2A6B6E; }
  .footer{ position:absolute; bottom:0.75in; left:0.75in; right:0.75in; border-top:1px solid #eeece5; padding-top:12px; font-size:10.5px; color:#8a8a8a; display:flex; justify-content:space-between; }
  .cols{ display:flex; gap:0.5in; }
  .col{ flex:1; }
</style></head>
<body>
  <div class="page">
    <div class="corner"></div>
    <div class="brand">AleonPress</div>
    <h1>How to Use This Template</h1>
    <p class="sub">Everything you need to get from download to a finished, application-ready resume in a few minutes.</p>

    <div class="cols">
      <div class="col">
        <h2>1. Opening Your Files</h2>
        <ol>
          <li><b>Word files (.doc):</b> double-click to open in Microsoft Word. On a Mac, they open directly in Pages as well.</li>
          <li><b>Google Docs:</b> go to Google Drive → New → File upload, then right-click the file → Open with → Google Docs.</li>
          <li><b>PDF files:</b> open with any PDF reader to see exactly how the design should look — use these as your visual reference while editing the Word file.</li>
        </ol>

        <h2>2. Editing the Template</h2>
        <ol>
          <li>Click directly into any placeholder text (shown in <i>italics</i> or as <b>// PROMPTS</b>) and type over it with your own information.</li>
          <li>To add or remove a bullet point, place your cursor at the end of a line and press Enter for a new one, or select a full line and delete it.</li>
          <li>Keep formatting simple as you edit — avoid adding tables, text boxes, or columns, which can interfere with applicant tracking systems.</li>
        </ol>
      </div>
      <div class="col">
        <h2>3. Changing Colors &amp; Fonts</h2>
        <ol>
          <li><b>Accent color:</b> select a section heading, go to the Home tab → Font Color, and apply your chosen color to all headings for a consistent look.</li>
          <li><b>Font:</b> select all text (Ctrl/Cmd + A) and choose a new font from the Home tab. Keep one font throughout for a clean, professional result.</li>
        </ol>

        <h2>4. Saving &amp; Applying</h2>
        <ol>
          <li>When you're finished editing, go to File → Save As → and choose PDF as the file type — this is the safest format to submit to most employers.</li>
          <li>Name your file clearly: <i>FirstName_LastName_Resume.pdf</i></li>
          <li>Keep the original template file untouched so you always have a clean copy to start from for your next application.</li>
        </ol>

        <div class="callout"><b>Included in this bundle:</b> matching Cover Letter &amp; References templates, 4 bonus guides (resume writing, ATS formatting, interview prep, and job search strategy), and a Job Application Tracker spreadsheet.</div>
      </div>
    </div>

    <div class="footer">
      <span>Thank you for your purchase — I hope this template helps you land the role.</span>
      <span>AleonPress</span>
    </div>
  </div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: path.join(OUT, 'How-to-Use-This-Template.pdf'),
    width: '8.5in', height: '11in', printBackground: true,
  });
  await browser.close();
  console.log('Rendered How-to-Use-This-Template.pdf');
})();
