// The Learn path. Order matters: each framework builds on the one before it.
// Plain data only (no image imports) so scripts/render-guides.mjs can reuse it to draw the infographics.
// `example` is the worked use case shown on each lesson. `sheet` is the fill-in block printed on the infographic.

export const frameworks = [
  {
    slug: 'anatomy',
    name: 'Anatomy of a Prompt',
    minutes: 4,
    tagline: 'The six building blocks behind every strong prompt.',
    intro:
      'Most weak AI answers come from weak instructions. These six components give you control over what the AI does, how it thinks, and when it stops. Learn them once and every other framework makes sense.',
    useWhen: 'You want structured help on any task and need a reliable checklist for what to include.',
    partsTitle: 'The six components',
    parts: [
      { key: 'Role', desc: 'Who the AI should act as. Be specific about expertise and experience level.' },
      { key: 'Task', desc: 'The exact deliverable plus success criteria. What does done look like?' },
      { key: 'Context', desc: 'Audience, background, goal, requirements, constraints, tone, and style.' },
      { key: 'Reasoning', desc: 'Think step by step, check facts, and show only brief reasoning.' },
      { key: 'Output format', desc: 'Bullets, numbered list, table, or narrative. Spell out the structure.' },
      { key: 'Stop conditions', desc: 'Word or bullet limits, exclusions, and how to end the response.' },
    ],
    insight: {
      title: 'Most overlooked component',
      body: 'Stop conditions. Telling the AI exactly when and how to end prevents bloated, over-explained answers and keeps the output actionable.',
    },
    sheet: `ROLE: [who the AI should act as]
TASK: [exact deliverable + what success looks like]
CONTEXT: [audience, background, constraints, tone]
REASONING: Think step by step. Flag anything you are unsure of.
OUTPUT FORMAT: [bullets / numbered list / table / narrative]
STOP CONDITIONS: [length limit, what to leave out, how to end]`,
    example: {
      title: 'Building a new-hire checklist',
      scenario: 'A new team member starts Monday and you need a first-week onboarding checklist.',
      before: 'Make an onboarding checklist for a new employee.',
      after: `ROLE: You are an experienced operations manager who has onboarded dozens of new hires.
TASK: Create a first-week onboarding checklist that gets a new coordinator productive by Friday.
CONTEXT: 25-person organization, hybrid schedule, new hire starts Monday. They need system access, team introductions, and one small real project by end of week.
REASONING: Think about what blocks a new hire most in week one and put those items first.
OUTPUT FORMAT: A table with Day, Task, Owner, and Done columns.
STOP CONDITIONS: Maximum 15 tasks. No company history or culture essays. End with the single most important thing to get right.`,
      why: [
        'The role sets the level of expertise instead of a generic answer.',
        'Context (size, schedule, start date) makes the checklist realistic.',
        'The table format and 15-task limit keep it usable on day one.',
      ],
    },
  },
  {
    slug: 'craft',
    name: 'C.R.A.F.T.',
    minutes: 5,
    tagline: 'The everyday five-part structure for outputs that need little editing.',
    intro:
      'C.R.A.F.T. packs the essentials into an easy acronym. Fill in all five elements and you give the AI enough context, direction, and clarity to get it right the first time.',
    useWhen: 'You are writing emails, updates, reports, or anything you plan to send with minimal edits.',
    partsTitle: 'The five elements',
    parts: [
      { key: 'Context', desc: 'What is going on. The situation or background the AI needs before acting.' },
      { key: 'Role', desc: 'Who the AI should act as. Be specific about expertise and experience.' },
      { key: 'Action', desc: 'The exact task and what success looks like. Not just "write an email" but what kind and to what end.' },
      { key: 'Format', desc: 'How the output should look: length, structure, tone, and bullets or prose.' },
      { key: 'Target audience', desc: 'Who the output is for. This shapes vocabulary, depth, and assumptions.' },
    ],
    insight: {
      title: 'The key insight',
      body: 'Most bad AI outputs happen because the Role or Target audience was vague. Get specific on both and you will see an immediate improvement.',
    },
    sheet: `CONTEXT: [the situation and background]
ROLE: Act as [specific expert with relevant experience]
ACTION: [exactly what to produce and the goal]
FORMAT: [length, structure, tone]
TARGET AUDIENCE: [who will read it and what they care about]`,
    example: {
      title: 'Apologizing for a late delivery',
      scenario: 'A customer’s order arrived a week late and they emailed to complain. You need to reply today.',
      before: 'Write an apology email to a customer whose order was late.',
      after: `CONTEXT: A long-time customer's order arrived 7 days late because of a supplier delay. They emailed to say they are frustrated and considering other options.
ROLE: Act as a customer experience lead known for calm, honest communication.
ACTION: Write a reply that apologizes without excuses, explains what happened in one sentence, offers a 15% credit on their next order, and explains what we changed to prevent it.
FORMAT: Email under 150 words with a subject line. Warm but professional. End with a direct line they can call.
TARGET AUDIENCE: A busy small-business owner who values reliability and plain language.`,
      why: [
        'Context explains the stakes: a loyal customer who might leave.',
        'The action spells out every element the reply must include.',
        'Format and audience keep it short, warm, and free of jargon.',
      ],
    },
  },
  {
    slug: 'socratic',
    name: 'Socratic Prompting',
    minutes: 4,
    tagline: 'Make the AI reason first, then generate.',
    intro:
      'Instead of asking for the answer straight away, you walk the AI through three phases. It defines what good looks like, pulls in the right frameworks, and only then applies them to your task.',
    useWhen: 'The stakes are high: policies, proposals, process documents, and plans where quality really matters.',
    partsTitle: 'The three phases',
    parts: [
      { key: 'Theoretical', quote: 'What makes a high-quality version of this output?', desc: 'The AI defines purpose, what separates average from exceptional, and common mistakes.' },
      { key: 'Framework', quote: 'What principles and structures apply here?', desc: 'The AI surfaces established frameworks, structure, sequencing, and success measures.' },
      { key: 'Application', quote: 'Now apply all of that to my specific task.', desc: 'Only after the first two phases does the AI produce the final output.' },
    ],
    insight: {
      title: 'Why it works',
      body: 'You get genuine expertise instead of pattern matching. The extra reasoning step costs seconds and routinely produces a noticeably stronger first draft.',
    },
    sheet: `Before you write anything, work through three phases.

PHASE 1: What makes an excellent [type of output]? What separates average from exceptional?
PHASE 2: What frameworks, structures, and principles apply?
PHASE 3: Apply all of that to my task: [describe your task, audience, and limits]`,
    example: {
      title: 'Writing a hybrid work policy',
      scenario: 'Leadership asked you to draft the organization’s first hybrid work policy.',
      before: 'Write a hybrid work policy for my organization.',
      after: `Before you write anything, work through three phases.

PHASE 1: What makes an excellent workplace policy? What separates one people follow from one they ignore?
PHASE 2: What frameworks and structures apply to policy writing (scope, eligibility, expectations, exceptions, review)?
PHASE 3: Apply all of that to my task: a hybrid work policy for a 60-person organization where most roles can work remotely 2 days a week. Audience is all staff. Plain language, under 2 pages, with a short FAQ.`,
      why: [
        'Phase 1 makes the AI define quality before drafting.',
        'Phase 2 brings in the structure real policies use.',
        'Phase 3 applies it to your size, rules, and audience.',
      ],
    },
  },
  {
    slug: 'synapse',
    name: 'Professor Synapse',
    minutes: 3,
    tagline: 'One master prompt that turns your AI into a conductor of experts.',
    intro:
      'Professor Synapse clarifies your goal by asking questions, then summons an expert agent built for exactly that task. It turns your AI from a search box into a thinking partner.',
    useWhen: 'You are not sure where to start, or the task needs a specialist you do not have on hand.',
    partsTitle: 'How it works',
    parts: [
      { key: 'Install', desc: 'Copy the master prompt and paste it into a new chat.' },
      { key: 'Clarify', desc: 'Professor Synapse asks clarifying questions one at a time.' },
      { key: 'Summon', desc: 'Once your goal is clear, it creates a specialized expert agent.' },
      { key: 'Work', desc: 'Collaborate with the agent until your goal is accomplished.' },
    ],
    commands: [
      { cmd: '/start', desc: 'Introduce itself and begin goal clarification' },
      { cmd: '/save', desc: 'Restate the goal, summarize progress, and suggest a next step' },
      { cmd: '/reason', desc: 'Reason step by step with the agent and recommend a path' },
      { cmd: '/settings', desc: 'Update the goal or the agent' },
      { cmd: '/new', desc: 'Forget previous input and start fresh' },
    ],
    insight: {
      title: 'Pro tip',
      body: 'After installing the master prompt, type /start and let Professor Synapse guide you from the very beginning.',
    },
    sheet: `1. Paste the master prompt into a new chat.
2. Type /start and answer its questions.
3. Confirm the goal. It summons an expert.
4. Work with the expert. Use /save to check progress.`,
    example: {
      title: 'Planning a team offsite from scratch',
      scenario: 'You have been asked to plan a one-day team offsite and do not know where to begin.',
      dialogue: [
        { who: 'You', text: '/start' },
        { who: 'Synapse', text: 'Hi, I am Professor Synapse. What would you like to accomplish? Who is it for and what does success look like?' },
        { who: 'You', text: 'A one-day offsite for 18 people to reset priorities for next year. Budget is about $3,000.' },
        { who: 'Synapse', text: 'Thanks. Is the main goal planning, team building, or both? And do you have a date and location in mind?' },
        { who: 'You', text: 'Mostly planning, some team building. Late January, within an hour of the office.' },
        { who: 'Expert', text: 'I am an expert in facilitating strategy offsites. I will build your agenda, venue checklist, and pre-work. First question: who needs to approve the final priorities?' },
      ],
      why: [
        'You did not need to know what to ask. Synapse asked for you.',
        'The expert it summoned fits the goal: facilitation, not event logistics alone.',
        'Every reply ends with a question or next step, so you keep moving.',
      ],
    },
  },
  {
    slug: 'power',
    name: 'Power Moves',
    minutes: 3,
    tagline: 'Short prompts that sharpen goals, test plans, and check the AI’s work.',
    intro:
      'These are the moves experienced users reach for between frameworks. Each one is small, but together they keep you in control: clarify the goal, borrow expertise, build a process, find blind spots, and verify the output.',
    useWhen: 'You want more precision and control, or you need to trust an output before you send it.',
    partsTitle: 'The moves',
    parts: [
      { key: 'Goal alignment', desc: 'Get the AI to question you until your objective is clear and actionable.' },
      { key: 'Agent creation', desc: 'Borrow a domain expert for a specific task.' },
      { key: 'Workflow builder', desc: 'Turn a fuzzy task into numbered, repeatable steps.' },
      { key: 'Stress test', desc: 'Let a skeptical critic probe your plan one question at a time.' },
      { key: 'Self-check', desc: 'Make the AI review its own work before you use it.' },
    ],
    insight: {
      title: 'Most underused move',
      body: 'The Self-Check prompt. Paste it after any important answer and the AI will name its own assumptions, gaps, and claims to verify.',
    },
    sheet: `GOAL: Ask me questions one at a time until my goal is clear.
EXPERT: Act as an expert in [field]. Guide me step by step.
WORKFLOW: Break [task] into numbered steps. Flag decisions.
STRESS TEST: Act as a skeptical critic. Challenge my plan.
SELF-CHECK: Review your answer. List assumptions, gaps, and
claims to verify. Then improve it.`,
    example: {
      title: 'Pressure-testing a budget request',
      scenario: 'You drafted a request for new software and want it airtight before it goes to leadership.',
      steps: [
        { move: 'Goal alignment', prompt: 'Help me define a clear goal for this budget request. Ask me one question at a time.' },
        { move: 'Stress test', prompt: 'Act as a skeptical finance director. Challenge this request one question at a time: [paste draft]' },
        { move: 'Self-check', prompt: 'Review your revised version. List any assumptions you made, anything missing, and claims I should verify. Then improve it.' },
      ],
      why: [
        'Goal alignment makes sure you are asking for the right thing.',
        'The stress test surfaces objections before leadership does.',
        'Self-check catches invented numbers and gaps before you hit send.',
      ],
    },
  },
];

export const ultimatePrompt = `CONTEXT: We are going to create one of the best AI prompts ever written. The best prompts include comprehensive details to fully inform the AI of the prompt's goals, required areas of expertise, domain knowledge, preferred format, target audience, references, examples, and the best approach to accomplish the objective. Based on this and the following information, you will be able to write this exceptional prompt.

ROLE: You are an expert in writing prompts for AI assistants. You are known for creating extremely detailed prompts that produce outputs far better than typical responses. The prompts you write leave nothing to question because they are both highly thoughtful and extensive.

ACTION:
1) Before you begin writing this prompt, ask me for the prompt topic or theme if I have not provided it.
2) Once you are clear about the topic or theme, review the Format below.
3) If useful, include "fill in the blank" elements for me to complete based on my needs.
4) Work through it one step at a time.
5) Once you have all of the information, write the best prompt you can.

FORMAT: Organize the prompt using "C.R.A.F.T.", where each letter is a section:
- Context: The situation and what knowledge the AI should draw on.
- Role: The AI's expertise, always an industry-leading expert with 20+ years of experience.
- Action: A numbered list of sequential steps the AI should follow.
- Format: The structure of the output: essay, table, list, and so on.
- Target Audience: Who will use the output, including their background, reading level, and preferences.

TARGET AUDIENCE: The prompt will be used with a modern AI assistant such as UnifiedAI, ChatGPT, Claude, Gemini, or Copilot.`;

export const selfCheckPrompt = `Review what you just produced. Identify:

1. Any assumptions you made that I did not confirm
2. Anything missing that would make this stronger
3. Any claims that should be verified before use

Then give me an improved version based on that review.`;
