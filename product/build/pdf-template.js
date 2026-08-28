function esc(s) {
  return (s || '').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Very small markdown-ish inline renderer: **bold**
function inline(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function renderBlock(b) {
  if (b.h2) return `<h2>${inline(b.h2)}</h2>`;
  if (b.h3) return `<h3>${inline(b.h3)}</h3>`;
  if (b.p) return `<p>${inline(b.p)}</p>`;
  if (b.ul) return `<ul>${b.ul.map(li => `<li>${inline(li)}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol>${b.ol.map(li => `<li>${inline(li)}</li>`).join('')}</ol>`;
  if (b.callout) return `<div class="callout"><div class="callout-label">${esc(b.calloutLabel || 'Tip')}</div><p>${inline(b.callout)}</p></div>`;
  if (b.example) return `<div class="example"><div class="example-label">Example</div><p>${inline(b.example)}</p></div>`;
  if (b.spacer) return `<div style="height:${b.spacer}px"></div>`;
  return '';
}

function buildGuideHTML({ kicker, title, subtitle, sections, docLabel }) {
  const sectionsHTML = sections.map((sec, idx) => {
    const blocks = sec.blocks.map(renderBlock).join('\n');
    return `<section class="content-section">
      <div class="section-number">${String(idx + 1).padStart(2, '0')}</div>
      <h1>${esc(sec.title)}</h1>
      ${blocks}
    </section>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: 8.5in 11in; margin: 0; }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    font-family:'Source Sans 3', Georgia, serif;
    color:#232323;
    font-size:11.5px;
    line-height:1.6;
  }
  .page{
    width:8.5in; min-height:11in; padding:0.85in 0.9in 0.9in;
    position:relative; page-break-after:always;
  }
  .page:last-child{ page-break-after:auto; }

  /* ---- cover ---- */
  .cover{ display:flex; flex-direction:column; justify-content:center; align-items:flex-start; height:11in; padding:0 0.95in; }
  .cover .corner{ position:absolute; top:0; right:0; width:2.6in; height:2.6in; background:#2A6B6E; border-radius:0 0 0 100%; opacity:0.92; }
  .cover .corner2{ position:absolute; top:0; right:0; width:1.5in; height:1.5in; background:#E3EEEE; border-radius:0 0 0 100%; }
  .cover .brand{ font-family:'EB Garamond',serif; font-size:13px; letter-spacing:0.28em; color:#2A6B6E; font-weight:600; margin-bottom:0.55in; text-transform:uppercase; }
  .cover .kicker{ font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#6B7f5c; color:#2A6B6E; font-weight:700; margin-bottom:14px; }
  .cover h1{ font-family:'EB Garamond',serif; font-size:44px; font-weight:600; margin:0 0 18px; line-height:1.12; max-width:5.6in; color:#1c1c1c; }
  .cover .subtitle{ font-size:15px; color:#585858; max-width:4.6in; line-height:1.55; }
  .cover .footer-line{ position:absolute; bottom:0.85in; left:0.95in; right:0.95in; border-top:1px solid #dcdcd4; padding-top:14px; display:flex; justify-content:space-between; font-size:10.5px; color:#8a8a8a; letter-spacing:0.04em; }

  /* ---- content pages ---- */
  .content-section{ margin-bottom:6px; }
  .section-number{ font-family:'EB Garamond',serif; font-size:13px; color:#2A6B6E; font-weight:600; letter-spacing:0.12em; margin-bottom:2px; }
  h1{ font-family:'EB Garamond',serif; font-size:23px; font-weight:600; color:#1c1c1c; margin:0 0 14px; padding-bottom:10px; border-bottom:2px solid #2A6B6E; }
  h2{ font-family:'EB Garamond',serif; font-size:15px; font-weight:600; color:#2A6B6E; margin:20px 0 8px; }
  h3{ font-size:12.5px; font-weight:700; color:#1c1c1c; margin:14px 0 6px; text-transform:uppercase; letter-spacing:0.04em; }
  p{ margin:0 0 10px; color:#333; }
  ul, ol{ margin:0 0 12px; padding-left:20px; }
  li{ margin-bottom:6px; color:#333; }
  strong{ color:#1c1c1c; }
  .callout{ background:#E3EEEE; border-left:3px solid #2A6B6E; border-radius:4px; padding:12px 16px; margin:14px 0; }
  .callout-label{ font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#2A6B6E; margin-bottom:4px; }
  .callout p{ margin:0; }
  .example{ background:#faf9f6; border:1px solid #e3e0d8; border-radius:4px; padding:12px 16px; margin:14px 0; }
  .example-label{ font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#8a8a8a; margin-bottom:4px; }
  .example p{ margin:0; font-style:italic; color:#4a4a4a; }
  .pagehead{ display:flex; justify-content:space-between; align-items:baseline; font-size:9.5px; letter-spacing:0.08em; text-transform:uppercase; color:#a8a49a; margin-bottom:26px; padding-bottom:8px; border-bottom:1px solid #eeece5; }
  .pagehead .brand{ font-weight:700; color:#2A6B6E; }
</style></head>
<body>
  <div class="page cover">
    <div class="corner"></div><div class="corner2"></div>
    <div class="brand">AleonPress</div>
    <div class="kicker">${esc(kicker)}</div>
    <h1>${esc(title)}</h1>
    <div class="subtitle">${esc(subtitle)}</div>
    <div class="footer-line"><span>Bonus guide included with your resume template</span><span>aleonpress</span></div>
  </div>
  <div class="page">
    <div class="pagehead"><span class="brand">AleonPress</span><span>${esc(docLabel)}</span></div>
    ${sectionsHTML}
  </div>
</body></html>`;
}

module.exports = { buildGuideHTML, esc, inline };
