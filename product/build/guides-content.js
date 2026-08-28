const GUIDES = [
  {
    file: 'Resume-Writing-Guide',
    kicker: 'Bonus Guide 1 of 4',
    title: 'The Resume Writing Guide',
    subtitle: 'How to turn your template into a resume that actually gets read — structure, summaries, and bullets that land interviews.',
    docLabel: 'Resume Writing Guide',
    sections: [
      {
        title: 'Before You Start',
        blocks: [
          { p: 'A resume has one job: get you the interview. It doesn\'t need to tell your whole story — it needs to prove, in under 30 seconds of skimming, that you can do the job in front of a hiring manager.' },
          { p: 'Before you fill in a single field, gather three things:' },
          { ul: [
            'The job posting you\'re applying to, with the key requirements highlighted',
            'A rough list of your last 5–10 years of roles, with dates',
            'Two or three numbers that show your impact (revenue, time saved, people managed, error rate reduced — anything measurable)'
          ]},
          { callout: 'If you only remember one rule from this guide: every resume should be tailored to the job posting in front of you. A resume tuned for one role beats a generic one every time.' }
        ]
      },
      {
        title: 'Structuring the Page',
        blocks: [
          { p: 'Your template is already ordered the way hiring managers expect to read it: contact info, professional summary, experience, education, and supporting sections. Keep that order — don\'t reinvent the layout.' },
          { h3: 'Length' },
          { ul: [
            'Under 10 years of experience: one page, no exceptions',
            '10+ years or senior/executive roles: two pages maximum',
            'Cut older roles (15+ years back) down to a single line — title, company, dates'
          ]},
          { h3: 'What to cut first' },
          { p: 'If you\'re over the page limit, cut in this order: bullets that don\'t relate to the job you want, your oldest role\'s detail, and any skill or software you haven\'t touched in five years.' }
        ]
      },
      {
        title: 'Writing the Professional Summary',
        blocks: [
          { p: 'Three to four sentences, no more. Open with your title and years of experience, then the scope of what you handle, then one proof point.' },
          { example: 'Healthcare professional with 7+ years across clinical and administrative roles. Oversees a caseload/team of 200+ while leading intake process improvements that cut average wait time by 25%. Known for calm, clear communication under pressure and a track record of mentoring staff — equally at home leading a care team or a department.' },
          { p: 'Skip the objective statement ("Seeking a challenging role where I can grow…"). Hiring managers want to know what you offer, not what you\'re hoping to get out of it.' }
        ]
      },
      {
        title: 'Writing Bullets That Get Read',
        blocks: [
          { p: 'Every bullet should follow the same shape: action verb, what you did, and the result — with a number whenever you can find one.' },
          { example: '"Responsible for onboarding new hires" becomes "Redesigned the onboarding program, cutting new-hire ramp-up time from 6 weeks to 3."' },
          { h3: 'Strong opening verbs' },
          { p: 'Led, built, launched, reduced, increased, redesigned, negotiated, streamlined, trained, resolved.' },
          { h3: 'Avoid' },
          { ul: [
            '"Responsible for…" — describes the job, not your impact',
            'Vague adjectives with no evidence ("hard-working," "team player") unless backed by a specific example',
            'Listing duties instead of outcomes'
          ]},
          { callout: 'Aim for at least one quantified bullet per role. If you genuinely can\'t find a number, quantify scope instead — team size, budget, caseload, ticket volume.' }
        ]
      },
      {
        title: 'Final Checklist',
        blocks: [
          { ul: [
            'Every bullet ties back to a skill or requirement in the job posting',
            'Dates are consistent in format throughout (Month Year – Month Year)',
            'No first-person pronouns ("I," "my")',
            'Spell-checked, and read once out loud — typos hide from silent reading',
            'Saved as a PDF for applying, with your name in the file name (e.g., AnnaWilliams_Resume.pdf)',
            'A second person has read it, if possible'
          ]}
        ]
      }
    ]
  },
  {
    file: 'ATS-Resume-Guide',
    kicker: 'Bonus Guide 2 of 4',
    title: 'The ATS Resume Guide',
    subtitle: 'How applicant tracking systems actually read your resume — and how to format so you never get filtered out before a human sees it.',
    docLabel: 'ATS Resume Guide',
    sections: [
      {
        title: 'What an ATS Actually Does',
        blocks: [
          { p: 'An Applicant Tracking System (ATS) is software that most mid-size and large employers use to collect, sort, and search resumes. When you apply online, your resume is almost never read by a person first — it\'s parsed into a database record: name, contact info, work history, education, and skills, each dropped into a field.' },
          { p: 'The problem: that parsing step is dumb. It reads left to right, top to bottom, and has no idea what a table, text box, or header/footer is supposed to mean. If your layout confuses it, your information lands in the wrong field — or gets dropped entirely — and a recruiter searching for "5 years project management" never finds you, even though you have exactly that.' }
        ]
      },
      {
        title: 'What Breaks ATS Parsing',
        blocks: [
          { ul: [
            'Multi-column layouts and sidebars — text gets read out of order or merged together',
            'Tables and text boxes — many ATS platforms skip their contents entirely',
            'Text inside images or icons — never read at all',
            'Headers and footers — some systems ignore this content completely',
            'Unusual fonts or heavy graphics — can cause garbled text extraction',
            'Non-standard section titles — "Where I\'ve Made an Impact" instead of "Experience" may not get recognized'
          ]},
          { callout: 'This is exactly why this template is built the way it is: single column, real selectable text, standard section headers, no tables. It\'s designed to parse cleanly first, and look sharp to a human second.' }
        ]
      },
      {
        title: 'Keyword Matching',
        blocks: [
          { p: 'Beyond parsing, most ATS platforms also rank or filter resumes by keyword match against the job posting. This is the single highest-leverage thing you can do per application.' },
          { h3: 'How to do it' },
          { ul: [
            'Paste the job posting into a doc and highlight every skill, tool, certification, and qualification mentioned',
            'Check your resume for each one — use the exact phrasing from the posting where it\'s true of you (e.g., "electronic health records (EHR)" not just "medical software")',
            'Work the closest, most relevant terms into your summary and your most recent role\'s bullets — that\'s where ATS ranking weighs most heavily',
            'Never add a skill or credential you don\'t actually have just to match — it will surface in the interview'
          ]}
        ]
      },
      {
        title: 'Tailoring Per Application',
        blocks: [
          { p: 'You do not need a different resume for every job — you need the same strong resume with 5–10 minutes of targeted edits per application: swap in the posting\'s terminology, reorder bullets so the most relevant ones lead, and adjust your summary\'s first line to mirror the job title.' },
          { example: 'Applying to a role with a specific job title in the posting — "Family Nurse Practitioner," "Clinical Director," "Practice Administrator"? Match their exact wording in your summary line — many ATS platforms weight exact title matches heavily, whether you\'re in a clinical role or a healthcare leadership one.' }
        ]
      },
      {
        title: 'ATS-Safe Formatting Checklist',
        blocks: [
          { ul: [
            'Single column, top to bottom — no side-by-side sections',
            'Standard section headers: Experience, Education, Skills, Certifications',
            'No tables, text boxes, headers, or footers',
            'Dates and job titles as plain text, not inside graphics',
            'Standard fonts (avoid anything highly decorative)',
            'File saved as .docx or PDF with selectable (not scanned/image) text',
            'File named clearly: FirstName_LastName_Resume'
          ]},
          { callout: 'When in doubt, copy your resume text and paste it into a blank document. If it reads in a sensible order with nothing jumbled, an ATS will read it the same way.' }
        ]
      }
    ]
  },
  {
    file: 'Interview-Preparation-Guide',
    kicker: 'Bonus Guide 3 of 4',
    title: 'The Interview Preparation Guide',
    subtitle: 'What to do before, during, and after the interview — including a simple framework for answering almost any behavioral question.',
    docLabel: 'Interview Preparation Guide',
    sections: [
      {
        title: 'Before the Interview',
        blocks: [
          { h3: 'Research (30–45 minutes)' },
          { ul: [
            'The company: what they do, recent news, mission/values page',
            'The role: re-read the posting and note every requirement you can speak to directly',
            'Your interviewer, if you know their name: their role and background on LinkedIn',
          ]},
          { h3: 'Logistics' },
          { ul: [
            'Confirm the format (phone, video, in person) and log in or arrive 10 minutes early',
            'For video calls: test your camera, mic, and lighting the day before',
            'Print or have your resume open — interviewers often reference it directly'
          ]},
          { callout: 'Prepare 3–4 specific stories from your work history before you walk in. You will reuse them across multiple questions — this is the highest-leverage prep you can do.' }
        ]
      },
      {
        title: 'The STAR Method',
        blocks: [
          { p: 'Most behavioral questions ("Tell me about a time when…") are best answered with the STAR structure — it keeps your answer concrete instead of vague.' },
          { ul: [
            '**Situation** — briefly set the scene',
            '**Task** — what you were responsible for',
            '**Action** — what you specifically did (not what the team did)',
            '**Result** — the outcome, with a number if you have one'
          ]},
          { example: '"Our department was seeing a 30% no-show rate for appointments (Situation). I was asked to find a fix (Task). I proposed and built an automated reminder system with a 48-hour and 2-hour text alert (Action). No-shows dropped to 12% within two months (Result)."' }
        ]
      },
      {
        title: 'Common Questions to Prepare For',
        blocks: [
          { ul: [
            '"Tell me about yourself" — a 60–90 second walkthrough of your background, ending at why you want this role',
            '"Why do you want to work here?" — reference something specific from your research, not generic praise',
            '"What\'s a challenge you\'ve faced at work?" — use STAR, and pick something you actually resolved',
            '"Where do you see yourself in 5 years?" — show ambition that\'s realistic and aligned with this role',
            '"Do you have any questions for us?" — always say yes (see below)'
          ]}
        ]
      },
      {
        title: 'Questions to Ask Them',
        blocks: [
          { p: 'Asking good questions signals genuine interest and helps you evaluate the role right back. Have 3–4 ready:' },
          { ul: [
            '"What does success look like in this role in the first 90 days?"',
            '"What\'s the biggest challenge facing the team right now?"',
            '"How would you describe the team\'s working style?"',
            '"What made you decide to join this company?" (great for the interviewer personally)'
          ]}
        ]
      },
      {
        title: 'After the Interview',
        blocks: [
          { p: 'Send a thank-you email within 24 hours — short, specific, and genuine.' },
          { example: 'Subject: Thank you — [Role Title]\n\nHi [Name], thank you for taking the time to speak with me today about the [Role Title] position. I especially enjoyed hearing about [specific detail from the conversation] — it reinforced how excited I am about the opportunity. Please let me know if there\'s anything else I can provide. Looking forward to hearing from you.\n\nBest, [Your Name]' },
          { p: 'If you haven\'t heard back within the timeline they gave you, one polite follow-up is appropriate — after that, let it go and keep applying elsewhere.' }
        ]
      }
    ]
  },
  {
    file: 'Job-Search-Playbook',
    kicker: 'Bonus Guide 4 of 4',
    title: 'The Job Search Playbook',
    subtitle: 'A practical system for running your search like a project — where to look, how to stay organized, and how to keep momentum.',
    docLabel: 'Job Search Playbook',
    sections: [
      {
        title: 'Set Your Target Before You Start',
        blocks: [
          { p: 'A job search without a target turns into applying to everything and hearing back from nothing. Before your first application, write down:' },
          { ul: [
            '2–3 job titles you\'re realistically qualified for right now',
            'Your must-haves (salary floor, location/remote, schedule) vs. nice-to-haves',
            'A short list of 10–15 companies you\'d genuinely want to work for'
          ]},
          { callout: 'A focused search of 5–10 well-tailored applications a week beats 50 generic ones. Quality of application matters more than volume.' }
        ]
      },
      {
        title: 'Where to Actually Look',
        blocks: [
          { ul: [
            '**Company career pages** — apply directly when possible; some companies deprioritize job-board applicants',
            '**Job boards** — Indeed, LinkedIn Jobs, and industry-specific boards for your field',
            '**Your network** — tell people you\'re looking; a referral dramatically increases your odds of a first interview',
            '**Recruiters** — worth connecting with 2–3 in your field even if you\'re not actively searching yet'
          ]},
          { h3: 'The 40/40/20 rule' },
          { p: 'Roughly: 40% of your search time on tailored applications, 40% on networking and outreach, 20% on interview prep and skill-building. Most people spend 90% of their time on applications alone and wonder why nothing lands.' }
        ]
      },
      {
        title: 'Staying Organized',
        blocks: [
          { p: 'Use the included Job Application Tracker to log every application: company, role, date applied, status, and next action. A messy search — forgetting who you applied to, missing a follow-up — costs you interviews you\'d have otherwise gotten.' },
          { ul: [
            'Update the tracker the moment you apply, not "later"',
            'Set a follow-up reminder for 7–10 days after each application with no response',
            'Review the tracker weekly to see what\'s stalling and where to focus next'
          ]}
        ]
      },
      {
        title: 'Networking Outreach Templates',
        blocks: [
          { h3: 'Cold outreach to someone at a target company' },
          { example: 'Hi [Name], I came across your profile while researching [Company] — I\'m currently exploring [role type] opportunities and was really drawn to [specific thing about the company/team]. Would you be open to a quick 15-minute chat about your experience there? Happy to work around your schedule.' },
          { h3: 'Asking a former colleague for a referral' },
          { example: 'Hi [Name], hope you\'re doing well! I saw [Company] has an opening for [Role] and I\'d love to apply — would you be comfortable referring me, or connecting me with the hiring manager? Happy to send my resume over.' }
        ]
      },
      {
        title: 'Staying Motivated Through Rejection',
        blocks: [
          { p: 'Rejection — or silence — is the default outcome of most applications, even for strong candidates. That\'s a function of volume, not a verdict on your worth.' },
          { ul: [
            'Set a weekly application target you can hit consistently, not a daily one that burns you out',
            'Batch your hardest tasks (cold outreach, tailoring) into one or two focused sessions a week',
            'Celebrate process wins — an application sent, a conversation booked — not just offers',
            'Take a full day off from the search each week; a rested search outperforms a constant one'
          ]}
        ]
      },
      {
        title: 'A Simple 30-Day Plan',
        blocks: [
          { h3: 'Week 1' },
          { p: 'Finalize your resume, cover letter, and target list. Update LinkedIn. Begin applying to your top 5 companies.' },
          { h3: 'Week 2' },
          { p: 'Continue applying (5–10/week). Start networking outreach — aim for 3 conversations.' },
          { h3: 'Week 3' },
          { p: 'Follow up on Week 1 applications. Keep applying and networking. Begin interview prep for any responses.' },
          { h3: 'Week 4' },
          { p: 'Review your tracker: what\'s working, what isn\'t. Adjust your target list or resume if response rates are low. Keep the pipeline moving.' }
        ]
      }
    ]
  }
];

module.exports = { GUIDES };
