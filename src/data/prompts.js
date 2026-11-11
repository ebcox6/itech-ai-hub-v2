// Every prompt in the hub. Written to work in any industry or role.
// group:     'everyday' (ready-made tasks) | 'template' (blank framework templates) | 'power' (Power Moves)
// framework: slug from learn.js, shown as "Built with ..."
// fields:    { key, label, hint?, long? }. Templates use {key}. hint is example text inside the empty input.
// example:   a worked use case. `values` fill the form when someone clicks "Fill with example".

export const groups = [
  { key: 'everyday', title: 'Everyday prompts', blurb: 'Ready-made prompts for the tasks that fill most work weeks.' },
  { key: 'template', title: 'Framework templates', blurb: 'Blank versions of each framework. Use them for anything the everyday prompts do not cover.' },
  { key: 'power', title: 'Power moves', blurb: 'Short follow-ups that sharpen goals, test plans, and check the AI’s work.' },
];

export const prompts = [
  // ───────── Everyday ─────────
  {
    id: 'professional-email',
    group: 'everyday',
    task: 'Writing',
    framework: 'craft',
    title: 'Professional Email',
    summary: 'Draft a clear email that gets the response you need, without the back and forth.',
    fields: [
      { key: 'situation', label: 'The situation', hint: 'e.g. a vendor missed a deadline that affects our launch', long: true },
      { key: 'recipient', label: 'Who it is going to', hint: 'e.g. our account manager at the vendor' },
      { key: 'goal', label: 'What you need from them', hint: 'e.g. a firm new date by Friday' },
      { key: 'tone', label: 'Tone', hint: 'e.g. firm but friendly' },
    ],
    template: `CONTEXT: {situation}

ROLE: Act as an experienced communications professional who writes clear, respectful emails that get results.

ACTION: Write an email to {recipient}. The goal is: {goal}. State the purpose in the first sentence, give only the background they need, and end with one clear request and a deadline.

FORMAT: Subject line plus an email under 175 words. Tone: {tone}. Short paragraphs, no jargon.

TARGET AUDIENCE: {recipient}, who is busy and will skim.`,
    example: {
      scenario: 'Following up with a vendor whose delay puts a launch at risk.',
      values: {
        situation: 'Our print vendor has missed two delivery dates for brochures we need at a conference on the 18th.',
        recipient: 'Our account manager at the print vendor',
        goal: 'A confirmed delivery date no later than the 15th, in writing, by Thursday',
        tone: 'Firm but friendly',
      },
    },
  },
  {
    id: 'difficult-message',
    group: 'everyday',
    task: 'Writing',
    framework: 'craft',
    title: 'Difficult Conversation Message',
    summary: 'Handle a complaint, a missed commitment, or bad news without sounding defensive.',
    fields: [
      { key: 'situation', label: 'What happened', hint: 'e.g. we missed a promised deadline', long: true },
      { key: 'recipient', label: 'Who it is for', hint: 'e.g. a long-time customer' },
      { key: 'relationship', label: 'State of the relationship', hint: 'e.g. strong, new, or already tense' },
      { key: 'outcome', label: 'The outcome you want', hint: 'e.g. keep their trust and agree on next steps' },
    ],
    template: `CONTEXT: {situation}. The relationship is {relationship}.

ROLE: Act as a calm, experienced professional who is known for honest, constructive communication.

ACTION: Write a message to {recipient}. Acknowledge the issue directly, take responsibility where appropriate without over-apologizing, explain what happens next, and work toward this outcome: {outcome}.

FORMAT: Under 200 words. Empathetic but confident, not defensive and not groveling. End with one concrete next step.

TARGET AUDIENCE: {recipient}, who is frustrated and wants to know it will be handled.`,
    example: {
      scenario: 'A customer is upset that a promised callback never happened.',
      values: {
        situation: 'We promised a customer a callback within 24 hours about a billing error and nobody called for four days',
        recipient: 'The customer',
        relationship: 'strong until now, three years as a customer',
        outcome: 'Fix the billing error, rebuild trust, and schedule a short call this week',
      },
    },
  },
  {
    id: 'summarize',
    group: 'everyday',
    task: 'Writing',
    framework: 'anatomy',
    title: 'Summarize Anything',
    summary: 'Turn long documents, threads, or notes into a summary someone can act on.',
    fields: [
      { key: 'content', label: 'What to summarize', hint: 'paste the text, or describe the attached file', long: true },
      { key: 'audience', label: 'Who will read the summary', hint: 'e.g. my manager, who has 2 minutes' },
      { key: 'format', label: 'Format', hint: 'e.g. 5 bullets, a short paragraph, or a table' },
    ],
    template: `ROLE: You are an expert analyst who writes sharp, accurate summaries.

TASK: Summarize the content below so the reader understands what matters and what to do next.

CONTEXT: The reader is {audience}.

REASONING: Separate facts from opinions. Do not add anything that is not in the source. If something important is unclear, say so.

OUTPUT FORMAT: {format}. Start with the single most important point. End with any decisions or actions needed.

STOP CONDITIONS: Keep it to what the reader needs. No introduction or sign-off.

CONTENT:
{content}`,
    example: {
      scenario: 'Catching your manager up on a long email thread before a meeting.',
      values: {
        content: '[Paste the 30-message email thread about the office move here]',
        audience: 'My manager, who has two minutes before a leadership meeting',
        format: '5 bullets plus a "Decisions needed" line',
      },
    },
  },
  {
    id: 'meeting-agenda',
    group: 'everyday',
    task: 'Meetings',
    framework: 'anatomy',
    title: 'Meeting Agenda',
    summary: 'Build a focused, time-boxed agenda so the meeting ends with decisions.',
    fields: [
      { key: 'purpose', label: 'Meeting purpose', hint: 'e.g. decide next quarter’s top 3 priorities' },
      { key: 'duration', label: 'Length', hint: 'e.g. 45 minutes' },
      { key: 'attendees', label: 'Who is attending', hint: 'e.g. 6 team leads' },
      { key: 'topics', label: 'Topics to cover', hint: 'list them, rough is fine', long: true },
    ],
    template: `ROLE: You are an experienced facilitator who runs meetings that end on time with clear decisions.

TASK: Create an agenda for a {duration} meeting. Purpose: {purpose}.

CONTEXT: Attendees: {attendees}. Topics to cover: {topics}

REASONING: Put decisions before updates. Cut or defer anything that does not serve the purpose.

OUTPUT FORMAT: A table with Time, Topic, Owner, and Outcome columns, then a list of any pre-work.

STOP CONDITIONS: Leave 5 minutes at the end to confirm decisions and owners. No more than 6 agenda items.`,
    example: {
      scenario: 'Running a quarterly planning meeting that usually runs long.',
      values: {
        purpose: 'Agree on the top 3 priorities for next quarter',
        duration: '45 minutes',
        attendees: '6 team leads and the director',
        topics: 'Last quarter results, budget changes, two new requests from leadership, hiring plan, team feedback survey',
      },
    },
  },
  {
    id: 'meeting-recap',
    group: 'everyday',
    task: 'Meetings',
    framework: 'craft',
    title: 'Meeting Recap & Action Items',
    summary: 'Turn rough notes into a clean recap so nothing falls through the cracks.',
    fields: [
      { key: 'notes', label: 'Your notes or transcript', hint: 'paste notes, a transcript, or bullet points', long: true },
      { key: 'audience', label: 'Who receives the recap', hint: 'e.g. all attendees plus my manager' },
    ],
    template: `CONTEXT: Here are my notes from a meeting:
{notes}

ROLE: Act as a precise executive assistant.

ACTION: Write a recap that captures what was decided and who owes what by when. If an action has no owner or date, flag it.

FORMAT: Short email with three labeled sections: Summary (2 to 3 sentences), Decisions, and Action Items (Owner / Task / Due date). Under 250 words. Neutral and factual.

TARGET AUDIENCE: {audience}.`,
    example: {
      scenario: 'Sending a recap right after a project kickoff.',
      values: {
        notes: 'Kickoff for website refresh. Sam owns content audit, due 3/14. Budget approved at $12k. Still need decision on agency vs in-house design. Priya to get 2 agency quotes. Next check-in in two weeks.',
        audience: 'All attendees plus the project sponsor',
      },
    },
  },
  {
    id: 'status-update',
    group: 'everyday',
    task: 'Planning',
    framework: 'craft',
    title: 'Project Status Update',
    summary: 'Report progress, risks, and next steps in a format leaders can skim.',
    fields: [
      { key: 'project', label: 'Project', hint: 'e.g. new scheduling system rollout' },
      { key: 'progress', label: 'Progress since last update', long: true },
      { key: 'risks', label: 'Risks or blockers', hint: 'or "none"', long: true },
      { key: 'audience', label: 'Who reads it', hint: 'e.g. leadership team' },
    ],
    template: `CONTEXT: Project: {project}. Progress since the last update: {progress}. Risks or blockers: {risks}.

ROLE: Act as an experienced project manager known for honest, clear reporting.

ACTION: Write a status update with an overall status (On track / At risk / Off track), what was done, what is next, and any risks with a recommended action. Do not soften bad news.

FORMAT: Labeled sections, bullets, under 250 words. Next steps in Owner / Task / Date format.

TARGET AUDIENCE: {audience}. They want the bottom line first.`,
    example: {
      scenario: 'A weekly update on a project that slipped.',
      values: {
        project: 'New scheduling system rollout',
        progress: 'Staff training 80% complete. Data import finished. Integration with payroll still in testing.',
        risks: 'Payroll integration found two errors; go-live may slip one week',
        audience: 'Leadership team',
      },
    },
  },
  {
    id: 'decision-brief',
    group: 'everyday',
    task: 'Analysis',
    framework: 'anatomy',
    title: 'Compare Options & Recommend',
    summary: 'Weigh two or more options against clear criteria and get a recommendation.',
    fields: [
      { key: 'decision', label: 'The decision', hint: 'e.g. which project management tool to adopt' },
      { key: 'options', label: 'Options', hint: 'list each option with what you know', long: true },
      { key: 'criteria', label: 'What matters most', hint: 'e.g. cost, ease of use, support' },
      { key: 'audience', label: 'Who decides', hint: 'e.g. our finance director' },
    ],
    template: `ROLE: You are an objective analyst who helps leaders make sound decisions.

TASK: Compare the options for this decision and recommend one: {decision}

CONTEXT: Options: {options}. Criteria, in order of importance: {criteria}. The decision maker is {audience}.

REASONING: Score each option against each criterion. Call out any information that is missing or that I should verify before deciding.

OUTPUT FORMAT: A comparison table, then a recommendation in 3 sentences, then the top risk of that choice.

STOP CONDITIONS: Under 300 words. Do not invent prices or features. If unknown, say so.`,
    example: {
      scenario: 'Choosing between two tools before a budget meeting.',
      values: {
        decision: 'Which online form tool to use for event registration',
        options: 'Option A: free, basic, no payments. Option B: $20/month, takes payments, has reminders. Option C: our current website plugin, clunky but already paid for.',
        criteria: 'Ease of use for attendees, cost, payment support',
        audience: 'Our operations director',
      },
    },
  },
  {
    id: 'process-doc',
    group: 'everyday',
    task: 'Planning',
    framework: 'socratic',
    title: 'Process Document (SOP)',
    summary: 'Document how a task gets done so anyone can follow it.',
    fields: [
      { key: 'process', label: 'The process', hint: 'e.g. how we approve and pay invoices', long: true },
      { key: 'audience', label: 'Who will follow it', hint: 'e.g. new team members' },
      { key: 'goal', label: 'Main goal', hint: 'e.g. consistency, fewer errors, faster onboarding' },
    ],
    template: `Guide this task in three phases. Do not write the final document until phases 1 and 2 are complete.

PHASE 1: What makes an excellent process document? What separates one people actually follow from one they ignore?

PHASE 2: What structures apply to process documentation (purpose, scope, roles, steps, exceptions, review)?

PHASE 3: Apply this to my task.
Process: {process}
Audience: {audience}
Goal: {goal}

Write the final document with numbered steps, a roles table, and a short "what to do if" section for common exceptions. Then give a 3-point checklist I can use to test it with a new person.`,
    example: {
      scenario: 'Documenting a process that only one person knows.',
      values: {
        process: 'How we process a new customer order: confirm details, check inventory, schedule delivery, send confirmation, and update the tracker',
        audience: 'New team members and anyone covering during vacations',
        goal: 'Anyone can complete it correctly on their first try',
      },
    },
  },

  // ───────── Framework templates ─────────
  {
    id: 'anatomy-template',
    group: 'template',
    task: 'Template',
    framework: 'anatomy',
    title: 'Anatomy of a Prompt Template',
    summary: 'All six components in one fill-in prompt for full control.',
    fields: [
      { key: 'role', label: 'Role', hint: 'who should the AI act as? Be specific' },
      { key: 'task', label: 'Task', hint: 'exact deliverable and what success looks like', long: true },
      { key: 'context', label: 'Context', hint: 'audience, background, constraints, tone', long: true },
      { key: 'format', label: 'Output format', hint: 'bullets, numbered list, table, or narrative' },
      { key: 'stop', label: 'Stop conditions', hint: 'length limit, what to leave out, how to end' },
    ],
    template: `ROLE: {role}

TASK: {task}

CONTEXT: {context}

REASONING: Think step by step. Check key claims and flag anything you are unsure of. Show only brief reasoning.

OUTPUT FORMAT: {format}

STOP CONDITIONS: {stop}`,
    example: {
      scenario: 'Creating a first-week onboarding checklist.',
      values: {
        role: 'An experienced operations manager who has onboarded dozens of new hires',
        task: 'A first-week onboarding checklist that gets a new coordinator productive by Friday',
        context: '25-person organization, hybrid schedule, starts Monday. Needs system access, introductions, and one small real project.',
        format: 'Table with Day, Task, Owner, and Done columns',
        stop: 'Maximum 15 tasks. End with the single most important thing to get right.',
      },
    },
  },
  {
    id: 'craft-template',
    group: 'template',
    task: 'Template',
    framework: 'craft',
    title: 'C.R.A.F.T. Template',
    summary: 'The five-part structure for anything you plan to send with minimal edits.',
    fields: [
      { key: 'context', label: 'Context', hint: 'the situation and background', long: true },
      { key: 'role', label: 'Role', hint: 'e.g. an experienced HR manager' },
      { key: 'action', label: 'Action', hint: 'exactly what to produce and the goal', long: true },
      { key: 'format', label: 'Format', hint: 'length, structure, tone' },
      { key: 'audience', label: 'Target audience', hint: 'who will read it and what they care about' },
    ],
    template: `CONTEXT: {context}

ROLE: Act as {role}.

ACTION: {action}

FORMAT: {format}

TARGET AUDIENCE: {audience}`,
    example: {
      scenario: 'Replying to a customer whose order arrived late.',
      values: {
        context: 'A long-time customer’s order arrived 7 days late because of a supplier delay. They are frustrated and considering other options.',
        role: 'a customer experience lead known for calm, honest communication',
        action: 'Write a reply that apologizes without excuses, explains what happened in one sentence, offers a 15% credit, and explains what we changed.',
        format: 'Email under 150 words with a subject line. Warm but professional.',
        audience: 'A busy small-business owner who values reliability and plain language',
      },
    },
  },
  {
    id: 'socratic-template',
    group: 'template',
    task: 'Template',
    framework: 'socratic',
    title: 'Socratic Prompt Template',
    summary: 'Make the AI reason through quality and structure before it writes.',
    fields: [
      { key: 'output', label: 'Type of output', hint: 'e.g. policy, proposal, plan, process document' },
      { key: 'task', label: 'Your specific task', long: true },
      { key: 'audience', label: 'Audience' },
      { key: 'limits', label: 'Limits or requirements', hint: 'e.g. under 2 pages, plain language' },
    ],
    template: `Guide this task using three phases. Do not skip steps. Do not write the final output until all three phases are complete.

PHASE 1: What makes a high-quality {output}? Analyze purpose, what separates average from exceptional, common mistakes, and how to judge quality.

PHASE 2: What frameworks and principles apply? Analyze established structures, sequencing, and success measures.

PHASE 3: Apply all of that to my task.
Task: {task}
Audience: {audience}
Limits: {limits}

Write the final output. Then give a brief self-evaluation checklist.`,
    example: {
      scenario: 'Drafting a first hybrid work policy.',
      values: {
        output: 'workplace policy',
        task: 'A hybrid work policy for a 60-person organization where most roles can work remotely 2 days a week',
        audience: 'All staff',
        limits: 'Plain language, under 2 pages, with a short FAQ',
      },
    },
  },
  {
    id: 'synapse-master',
    group: 'template',
    task: 'Template',
    framework: 'synapse',
    title: 'Professor Synapse Master Prompt',
    summary: 'Paste once, type /start, and let it ask the questions and summon the right expert.',
    fields: [],
    template: `Act as Professor Synapse🧙🏾‍♂️, a conductor of expert agents. Your job is to support the user in accomplishing their goals by aligning with their goals and preference, then calling upon an expert agent perfectly suited to the task by initializing "Synapse_COR" = "\${emoji}: I am an expert in \${role}. I know \${context}. I will reason step-by-step to determine the best course of action to achieve \${goal}. I can use \${tools} to help in this process

I will help you accomplish your goal by following these steps:

\${reasoned steps}

My task ends when \${completion}.

\${first step, question}."

Follow these steps:
1. 🧙🏾‍♂️, Start each interaction by gathering context, relevant information and clarifying the user's goals by asking them questions
2. Once user has confirmed, initialize "Synapse_CoR"
3. 🧙🏾‍♂️ and the expert agent, support the user until the goal is accomplished

Commands:
/start - introduce yourself and begin with step one
/save - restate SMART goal, summarize progress so far, and recommend a next step
/reason - Professor Synapse and Agent reason step by step together and make a recommendation for how the user should proceed
/settings - update goal or agent
/new - Forget previous input

Rules:
* End every output with a question or a recommended next step
* List your commands in your first output or if the user asks
* 🧙🏾‍♂️, ask before generating a new agent`,
  },

  // ───────── Power moves ─────────
  {
    id: 'goal-alignment',
    group: 'power',
    task: 'Power move',
    framework: 'power',
    title: 'Goal Alignment',
    summary: 'Get clear on what you actually need before the AI starts producing.',
    fields: [{ key: 'task', label: 'What you are working on', long: true }],
    template: `Help me define a clear and specific goal for the following task: {task}

Ask me clarifying questions one at a time until the goal is well defined and actionable. Then restate the goal in one sentence.`,
    example: { scenario: 'Starting a vague request from your boss.', values: { task: 'My manager asked me to "improve our customer feedback process"' } },
  },
  {
    id: 'agent-creation',
    group: 'power',
    task: 'Power move',
    framework: 'power',
    title: 'Borrow an Expert',
    summary: 'Have the AI act as a specialist and guide you step by step.',
    fields: [
      { key: 'domain', label: 'Expert in', hint: 'e.g. nonprofit grant writing' },
      { key: 'goal', label: 'Your goal', long: true },
    ],
    template: `Act as an expert in {domain} with 20 years of experience.

Give me step-by-step guidance to accomplish this goal: {goal}

Ask me one clarifying question at a time before you start.`,
    example: { scenario: 'Tackling something outside your expertise.', values: { domain: 'grant writing for small nonprofits', goal: 'Write my first grant application for a $25,000 community program' } },
  },
  {
    id: 'workflow-builder',
    group: 'power',
    task: 'Power move',
    framework: 'power',
    title: 'Workflow Builder',
    summary: 'Turn a fuzzy task into numbered steps anyone can follow.',
    fields: [{ key: 'task', label: 'The task or process', long: true }],
    template: `Break this task into clear, step-by-step actions that can be followed to completion:

Task: {task}

Format: Numbered steps with brief descriptions. Flag any decision points, dependencies, or steps that need approval.`,
    example: { scenario: 'Planning something you have never done.', values: { task: 'Move our team’s shared files from email attachments to a shared drive' } },
  },
  {
    id: 'stress-test',
    group: 'power',
    task: 'Power move',
    framework: 'power',
    title: 'Stress Test',
    summary: 'Let a skeptical critic find the holes before your audience does.',
    fields: [
      { key: 'critic', label: 'Who should critique it', hint: 'e.g. a skeptical finance director' },
      { key: 'plan', label: 'Your plan, proposal, or idea', hint: 'paste it here', long: true },
    ],
    template: `Act as {critic}.

Review the following and challenge it by asking me one probing question at a time. After five questions, summarize the biggest weaknesses and how to fix them.

{plan}`,
    example: { scenario: 'Before presenting a budget request.', values: { critic: 'a skeptical finance director', plan: '[Paste your budget request here]' } },
  },
  {
    id: 'self-check',
    group: 'power',
    task: 'Power move',
    framework: 'power',
    title: 'Self-Check',
    summary: 'The most underused move: make the AI review its own work before you use it.',
    fields: [],
    template: `Review what you just produced. Identify:

1. Any assumptions you made that I did not confirm
2. Anything missing that would make this stronger
3. Any claims that should be verified before use

Then give me an improved version based on that review.`,
  },
];
