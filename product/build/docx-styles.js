// Style presets mirroring the resumegenerator.html tool's "healthcare" category variants.
const STYLES = {
  design1: { // "The Educator" — left-aligned name, rule-style section headers
    accent: '2A6B6E',
    tint: 'E3EEEE',
    headerMode: 'rule',
    nameAlign: 'left',
  },
  design2: { // "The Practitioner" — centered name, banner-style section headers
    accent: '2A6B6E',
    tint: 'E3EEEE',
    headerMode: 'banner',
    nameAlign: 'center',
  },
};

const PAGE_SIZES = {
  letter: { width: 12240, height: 15840 }, // 8.5in x 11in in DXA
  a4: { width: 11906, height: 16838 },     // 210mm x 297mm in DXA
};

const MARGIN = 1080; // 0.75in in DXA
const BODY_FONT = 'Georgia';
const HEAD_FONT = 'Georgia';

module.exports = { STYLES, PAGE_SIZES, MARGIN, BODY_FONT, HEAD_FONT };
