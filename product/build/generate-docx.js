const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, BorderStyle, ShadingType,
  AlignmentType, LevelFormat, TabStopType, HeadingLevel,
} = require('docx');
const { STYLES, PAGE_SIZES, MARGIN, BODY_FONT, HEAD_FONT } = require('./docx-styles');

const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'resume-data.json'), 'utf8'));

const NUMBERING = {
  config: [
    {
      reference: 'bullet-list',
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: '•',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 260 } } },
        },
      ],
    },
  ],
};

function contactLine(contact) {
  return [contact.phone, contact.email, contact.location, contact.linkedin, contact.website].filter(Boolean).join('   |   ');
}

function nameAndHeader(s, name, contactBits) {
  const align = s.nameAlign === 'left' ? AlignmentType.LEFT : AlignmentType.CENTER;
  return [
    new Paragraph({
      alignment: align,
      spacing: { after: 40 },
      children: [new TextRun({ text: (name || 'Your Name').toUpperCase(), bold: true, size: 40, font: HEAD_FONT })],
    }),
    new Paragraph({
      alignment: align,
      spacing: { after: 160 },
      children: [new TextRun({ text: contactBits, size: 19, font: BODY_FONT, color: '444444' })],
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 8 } },
    }),
  ];
}

function sectionHeading(s, label) {
  if (s.headerMode === 'banner') {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      shading: { type: ShadingType.CLEAR, fill: s.tint, color: 'auto' },
      spacing: { before: 220, after: 120 },
      children: [new TextRun({ text: label.toUpperCase(), bold: true, size: 22, font: HEAD_FONT, color: s.accent })],
    });
  }
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 220, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: s.accent, space: 4 } },
    children: [new TextRun({ text: label.toUpperCase(), bold: true, size: 22, font: HEAD_FONT, color: s.accent })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullet-list', level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 20, font: BODY_FONT })],
  });
}

function plain(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 60 },
    alignment: opts.align,
    children: [new TextRun({ text, size: opts.size ?? 20, font: BODY_FONT, italics: opts.italics, bold: opts.bold, color: opts.color })],
  });
}

function entryHeadLine(contentWidth, title, dateText) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: contentWidth }],
    spacing: { after: 20 },
    children: [
      new TextRun({ text: title, bold: true, size: 21, font: BODY_FONT }),
      new TextRun({ text: '\t' + (dateText || ''), bold: true, size: 19, font: BODY_FONT }),
    ],
  });
}

function buildResumeDoc(styleKey, pageSizeKey) {
  const s = STYLES[styleKey];
  const ps = PAGE_SIZES[pageSizeKey];
  const contentWidth = ps.width - MARGIN * 2;
  const d = DATA.data;
  const children = [];

  children.push(...nameAndHeader(s, d.name, contactLine(d.contact)));

  children.push(sectionHeading(s, 'Professional Summary'));
  (d.summary.bullets || []).forEach(b => children.push(bullet(b)));
  if (d.summary.skills && d.summary.skills.length) {
    children.push(plain(d.summary.skills.join('  -  '), { align: AlignmentType.CENTER, after: 100 }));
  }

  children.push(sectionHeading(s, 'Experience'));
  d.experience.forEach(exp => {
    children.push(entryHeadLine(contentWidth, exp.title || 'Position Title', [exp.start, exp.end].filter(Boolean).join(' – ')));
    children.push(plain([exp.company, exp.location].filter(Boolean).join(', '), { italics: true, size: 19, color: '3D3D3D', after: 40 }));
    if (exp.summary) children.push(plain(exp.summary, { after: 40 }));
    (exp.bullets || []).forEach(b => children.push(bullet(b)));
  });

  children.push(sectionHeading(s, 'Education & Certifications'));
  d.education.forEach(ed => {
    children.push(entryHeadLine(contentWidth, [ed.degree, ed.school].filter(Boolean).join(' / '), ed.date || ''));
    if (ed.honors) children.push(plain(ed.honors, { italics: true, size: 19, after: 60 }));
  });
  (d.certifications || []).forEach(c => {
    children.push(entryHeadLine(contentWidth, [c.name, c.org].filter(Boolean).join(' / '), c.date || ''));
  });

  if (d.projects && d.projects.length) {
    children.push(sectionHeading(s, 'Additional Experience'));
    d.projects.forEach(pr => {
      children.push(plain(pr.name || '', { bold: true, after: 20 }));
      if (pr.description) children.push(plain(pr.description, { after: 40 }));
      (pr.bullets || []).forEach(b => children.push(bullet(b)));
    });
  }

  if (d.awards && d.awards.length) {
    children.push(sectionHeading(s, 'Awards & Honors'));
    d.awards.forEach(a => children.push(bullet(a)));
  }

  (d.customSections || []).forEach(cs => {
    if (!cs.label && (!cs.bullets || !cs.bullets.length)) return;
    children.push(sectionHeading(s, cs.label || 'Additional'));
    (cs.bullets || []).forEach(b => children.push(bullet(b)));
  });

  return new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: ps, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
      children,
    }],
  });
}

function buildCoverDoc(styleKey, pageSizeKey) {
  const s = STYLES[styleKey];
  const ps = PAGE_SIZES[pageSizeKey];
  const d = DATA.data;
  const c = DATA.coverData;
  const children = [];

  children.push(...nameAndHeader(s, d.name, contactLine(d.contact)));

  if (c.date) children.push(plain(c.date, { after: 100 }));
  [c.recipientName, c.recipientTitle, c.company, c.recipientAddress].filter(Boolean).forEach(line => {
    children.push(plain(line, { after: 40 }));
  });
  children.push(plain(c.greeting || 'Dear Hiring Manager,', { after: 140 }));
  (c.body || []).forEach(p => { if (p) children.push(plain(p, { after: 140 })); });
  children.push(plain(c.closing || 'Sincerely,', { after: 300 }));
  children.push(plain(d.name || 'Your Name', { bold: true }));

  return new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: ps, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
      children,
    }],
  });
}

function buildReferencesDoc(styleKey, pageSizeKey) {
  const s = STYLES[styleKey];
  const ps = PAGE_SIZES[pageSizeKey];
  const contentWidth = ps.width - MARGIN * 2;
  const d = DATA.data;
  const r = DATA.referencesData;
  const children = [];

  children.push(...nameAndHeader(s, d.name, contactLine(d.contact)));
  children.push(sectionHeading(s, 'References'));
  if (r.note) children.push(plain(r.note, { italics: true, align: AlignmentType.CENTER, after: 160 }));

  r.list.forEach(ref => {
    children.push(entryHeadLine(contentWidth, ref.name || 'Reference Name', ref.relationship || ''));
    children.push(plain([ref.title, ref.company].filter(Boolean).join(', '), { italics: true, size: 19, color: '3D3D3D', after: 20 }));
    children.push(plain([ref.phone, ref.email].filter(Boolean).join('   |   '), { after: 160 }));
  });

  return new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: ps, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
      children,
    }],
  });
}

const OUT = path.join(__dirname, '..', '01-Templates-Word');
fs.mkdirSync(OUT, { recursive: true });

const JOBS = [
  ['resume', 'design1', 'letter', 'Healthcare-Resume-Design1-USLetter'],
  ['resume', 'design1', 'a4', 'Healthcare-Resume-Design1-A4'],
  ['resume', 'design2', 'letter', 'Healthcare-Resume-Design2-USLetter'],
  ['cover', 'design1', 'letter', 'Healthcare-CoverLetter-Design1-USLetter'],
  ['cover', 'design1', 'a4', 'Healthcare-CoverLetter-Design1-A4'],
  ['references', 'design1', 'letter', 'Healthcare-References-Design1-USLetter'],
  ['references', 'design1', 'a4', 'Healthcare-References-Design1-A4'],
];

(async () => {
  for (const [docType, styleKey, pageSizeKey, outName] of JOBS) {
    let doc;
    if (docType === 'resume') doc = buildResumeDoc(styleKey, pageSizeKey);
    else if (docType === 'cover') doc = buildCoverDoc(styleKey, pageSizeKey);
    else doc = buildReferencesDoc(styleKey, pageSizeKey);

    const buf = await Packer.toBuffer(doc);
    const dest = path.join(OUT, outName + '.docx');
    fs.writeFileSync(dest, buf);
    console.log('Saved', dest);
  }
})();
