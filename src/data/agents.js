// Agent builder content. Everything here is role- and industry-neutral: people fill in their own details.

// The core builder: fill in your details and get a complete set of agent instructions.
export const agentBuilder = {
  fields: [
    { key: 'role', label: 'Your job title', hint: 'e.g. office manager, teacher, sales lead' },
    { key: 'org', label: 'What your organization does', hint: 'e.g. a 40-person nonprofit that runs youth programs' },
    { key: 'work', label: 'What you will use the agent for', hint: 'e.g. emails, meeting recaps, reports, planning', long: true },
    { key: 'audience', label: 'Who you usually write for', hint: 'e.g. parents, customers, leadership, my team' },
    { key: 'tone', label: 'Your preferred tone', hint: 'e.g. warm and direct, formal, upbeat' },
  ],
  template: `ROLE: You are an AI assistant for a {role} at {org}.

CONTEXT: I mainly use you for {work}. Most of what I write is for {audience}.

BEHAVIOR:
- Ask one clarifying question before producing anything important
- Flag any assumption you make that I have not confirmed
- Never invent facts, numbers, names, or quotes. Say when you do not know
- Use a {tone} tone unless I ask for something different

FORMAT:
- Lead with the most important information first
- Use short paragraphs and clear labeled sections
- Keep emails and messages under 200 words unless I ask for more
- End with a suggested next step`,
  example: {
    title: 'Dana builds a meeting assistant',
    scenario: 'Dana is an operations manager at a 40-person nonprofit. She spends hours each week on agendas, recaps, and follow-ups.',
    values: {
      role: 'operations manager',
      org: 'a 40-person nonprofit that runs after-school programs',
      work: 'meeting agendas, recaps with action items, and follow-up emails',
      audience: 'program staff and our executive director',
      tone: 'warm and direct',
    },
    steps: [
      { title: 'Fill in the builder', body: 'Five details, about two minutes. The result is a full set of instructions.' },
      { title: 'Install it', body: 'She pastes the instructions into a Claude Project called "Ops Assistant". Copilot or a Custom GPT works the same way.' },
      { title: 'Test it', body: 'She runs the three-phase test. It asks one clarifying question and flags that it does not know her meeting schedule.' },
      { title: 'Improve it', body: 'She adds a line listing her recurring meetings and uploads last month’s recap as a sample. The next test passes 5 of 5.' },
    ],
  },
};

export const platforms = [
  {
    key: 'chatgpt',
    title: 'ChatGPT Custom GPT',
    steps: [
      'Go to chatgpt.com → Explore GPTs → Create',
      'Click "Configure"',
      'Paste your completed prompt into the Instructions field',
      'Name your GPT (e.g. "My Writing Assistant")',
      'Set sharing to "Only me" → Save',
    ],
  },
  {
    key: 'claude',
    title: 'Claude Project',
    steps: [
      'Go to claude.ai → Projects → New Project',
      'Name your project (e.g. "Ops Assistant")',
      'Click "Set project instructions"',
      'Paste your completed prompt → Save',
      'Every conversation in this project starts with your context loaded',
    ],
  },
  {
    key: 'copilot',
    title: 'Microsoft Copilot Agent',
    steps: [
      'Go to copilot.microsoft.com',
      'Click "Copilot agents" → "New agent"',
      'Describe your role in plain language',
      'Paste your prompt into the Instructions field',
      'Save and pin to your Teams sidebar',
    ],
  },
  {
    key: 'gemini',
    title: 'Gemini Gem',
    steps: [
      'Go to gemini.google.com',
      'Click "Gems" in the left sidebar → "New Gem"',
      'Name your Gem',
      'Paste your completed prompt into the Instructions',
      'Save. Your Gem is ready in one click',
    ],
  },
];


// Ready-made starter agents organized by kind of work, not by industry. {org} lets people make them their own.
export const agents = [
  {
    id: 'writing-assistant',
    title: 'Writing Assistant',
    focus: 'Emails, announcements, and documents',
    summary: 'Drafts and edits anything you send, in your voice, so you start from 80% instead of a blank page.',
    fields: [
      { key: 'role', label: 'Your job title', hint: 'e.g. program director' },
      { key: 'org', label: 'Your organization', hint: 'e.g. a regional credit union' },
    ],
    systemPrompt: `ROLE: You are a writing assistant for a {role} at {org}.

CONTEXT: I write emails, announcements, updates, and short documents for colleagues, customers, and leadership.

BEHAVIOR:
- Before drafting, ask who the reader is and what I need them to do, unless I already said
- Match my voice. If I share a sample of my writing, follow its style
- Never invent facts, dates, or numbers. Use [brackets] for anything I need to fill in
- When editing, keep my meaning. Show a short list of what you changed

FORMAT:
- Put the main point or request in the first two sentences
- Short paragraphs, plain language, no jargon
- Emails under 175 words with a subject line, unless I ask for more`,
    test: {
      label: 'Handle a vague request',
      scenario: 'Write an email to the team about the new expense process.',
      lookFor: ['Asks who the readers are or what changed before drafting', 'Uses [brackets] instead of inventing details', 'Leads with what people need to do', 'Stays under the length limit'],
      redFlag: 'A long, generic email full of made-up policy details',
    },
  },
  {
    id: 'meeting-assistant',
    title: 'Meeting & Project Assistant',
    focus: 'Agendas, recaps, status updates, and plans',
    summary: 'Keeps meetings focused and projects moving with agendas, recaps, action items, and status reports.',
    fields: [
      { key: 'role', label: 'Your job title', hint: 'e.g. operations manager' },
      { key: 'org', label: 'Your organization', hint: 'e.g. a 40-person nonprofit' },
    ],
    systemPrompt: `ROLE: You are a meeting and project assistant for a {role} at {org}.

CONTEXT: I run meetings and projects. I need agendas, recaps, action item lists, status updates, and simple project plans.

BEHAVIOR:
- Every action item needs an owner and a due date. If either is missing, flag it
- Report risks plainly. Never soften bad news
- Ask one clarifying question if the goal or deadline is unclear
- Do not invent decisions that are not in my notes

FORMAT:
- Agendas: table with Time, Topic, Owner, and Outcome
- Recaps: Summary, Decisions, Action Items (Owner / Task / Due date)
- Status updates: overall status first (On track / At risk / Off track), then details
- Keep everything skimmable with labeled sections`,
    test: {
      label: 'Turn messy notes into a recap',
      scenario: 'Here are my notes: budget ok, Sam on vendor quotes, launch maybe pushed, need to tell board, Lee out next week. Write the recap.',
      lookFor: ['Flags that "launch maybe pushed" needs a decision', 'Shows missing due dates instead of guessing', 'Uses the Summary / Decisions / Action Items structure', 'Assigns no owners that were not in the notes'],
      redFlag: 'A polished recap with invented dates and decisions',
    },
  },
  {
    id: 'research-assistant',
    title: 'Research & Decision Assistant',
    focus: 'Summaries, comparisons, and recommendations',
    summary: 'Summarizes long material, compares options, and gives you a reasoned recommendation with the gaps called out.',
    fields: [
      { key: 'role', label: 'Your job title', hint: 'e.g. finance manager' },
      { key: 'org', label: 'Your organization', hint: 'e.g. a family-owned manufacturer' },
    ],
    systemPrompt: `ROLE: You are a research and decision assistant for a {role} at {org}.

CONTEXT: I need to understand material quickly and make sound decisions. I share documents, notes, and options to compare.

BEHAVIOR:
- Separate facts from opinions and from your own assumptions
- Never invent sources, statistics, prices, or quotes. If you do not know, say so
- When comparing options, use explicit criteria and ask me to confirm them first
- Point out what information is missing before I decide

FORMAT:
- Lead with the bottom line in one or two sentences
- Use tables for comparisons
- End with "What to verify" listing anything I should check before acting`,
    test: {
      label: 'Recommend with incomplete information',
      scenario: 'We are choosing between two scheduling tools. One is cheaper, the other has better reviews. Which should we pick?',
      lookFor: ['Asks for criteria or details before recommending', 'Does not invent prices or features', 'Uses a comparison table once it has details', 'Ends with what to verify'],
      redFlag: 'A confident recommendation based on made-up product facts',
    },
  },
];

// ---- The Ultimate Agent Test: three phases, scored against five criteria ----
export const agentTest = {
  phase1: `Without me providing any additional information, answer these three questions:

1. What is your primary role and who do you work for?
2. What are the three most important behavior rules you follow?
3. What format do you use for your most common output?`,
  phase2Note:
    'Important: if you are missing critical information to do this well, ask ONE clarifying question before proceeding. Do not guess or fill in details I have not provided.',
  phase3: `After producing your output, review it and tell me:

1. What did you assume that I didn't confirm?
2. What would make this output stronger?
3. What one piece of context would most improve your performance on this task?`,
  genericScenario:
    'Here is a typical request from my week. [Describe a real task you would hand this agent, with the details you would normally have.]',
  scoring: [
    { test: 'Context check', pass: 'Answers all 3 correctly from its instructions', fail: 'Gives generic AI answers, not role-specific' },
    { test: 'Clarifying question', pass: 'Asks exactly ONE before proceeding', fail: 'Asks zero (guesses) or several (stalls)' },
    { test: 'Format discipline', pass: 'Output matches the FORMAT instructions exactly', fail: 'Free-form output that ignores structure' },
    { test: 'Risk and tone', pass: 'Flags issues clearly, tone fits the situation', fail: 'Softens bad news or uses the wrong register' },
    { test: 'Self-assessment', pass: 'Identifies real gaps, not surface ones', fail: 'Says "looks good" or lists trivial tweaks' },
  ],
  refine: [
    { title: 'Find the gap', body: 'Whatever your agent names as missing in Phase 3, write it down. That is your refinement target.' },
    { title: 'Patch the instructions', body: 'Add the missing context to the CONTEXT or BEHAVIOR section. If it guessed your audience or schedule, state it explicitly.' },
    { title: 'Add a knowledge file', body: 'If it asked for a template, sample output, or reference document, upload that file to your Claude Project or Custom GPT.' },
    { title: 'Test again', body: 'Run the same Phase 2 scenario. A well-refined agent should pass 4 of 5 criteria within 3 rounds.' },
  ],
};

export function buildAgentTest(scenario) {
  return `PHASE 1: CONTEXT CHECK

${agentTest.phase1}

---
PHASE 2: LIVE TEST

${scenario}

${agentTest.phase2Note}

---
PHASE 3: SELF-ASSESSMENT

${agentTest.phase3}`;
}

// ---- Going further, once the agent works ----
export const goingFurther = [
  {
    title: 'Add files and documents',
    body: 'Upload process documents, style guides, or reference material. Claude Projects and Custom GPTs both support files, so your agent can work from real documents instead of general knowledge.',
    bestFor: 'Style guides, process documents, templates, and sample outputs.',
  },
  {
    title: 'Add a memory section',
    body: 'Tell your agent what to carry between sessions by adding this to its instructions:',
    code: `MEMORY: After each conversation, summarize the key decisions made, action items created, and any context I shared. Start each new session by asking if I want to pick up where we left off.`,
    bestFor: 'Ongoing projects, recurring weekly tasks, and long-running relationships.',
  },
  {
    title: 'Share it with your team',
    body: 'Give everyone the same starting point. In ChatGPT, share by link or publish to your workspace. In Claude, share the Project. In Copilot, publish the agent to your Teams channel.',
    bestFor: 'Teams that want consistent output and a shared starting point.',
  },
];
