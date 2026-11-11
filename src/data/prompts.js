// Every prompt in the hub lives here. Fields use {key} placeholders in the template.
// audiences: any of 'msp' | 'erp' | 'business'
// fields: { key, label, hint?, long? }. hint is example text shown inside the empty input.
// framework: 'anatomy' | 'craft' | 'socratic' | 'synapse' | 'power' | null
export const prompts = [
  {
    id: 'synapse-master',
    title: 'Professor Synapse Master Prompt',
    subtitle: 'Copy once, install, and let it summon experts',
    summary: 'You want to activate the full Professor Synapse framework: a conductor of expert agents who clarifies your goals, then summons a specialist to accomplish them.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Thinking Tools',
    framework: 'synapse',
    level: 'advanced',
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
  {
    id: 'uc-general',
    title: 'General Information & Summary',
    summary: 'You need to get up to speed on a topic, compare viewpoints, or prepare a summary for others.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Research & Analysis',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Topic',
      },
      {
        key: 'f2',
        label: 'Audience',
      },
      {
        key: 'f3',
        label: 'Output format',
        hint: 'bullet points / paragraph / table',
      },
    ],
    template: `Summarize the most important information about {f1} for {f2}.

Include: key points, recent developments, and why it matters.
Format: {f3}`,
  },
  {
    id: 'uc-market',
    title: 'Market Research',
    summary: 'You need vendor comparisons, trend analysis, or early-stage market insight.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Research & Analysis',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Number',
      },
      {
        key: 'f2',
        label: 'Market or industry',
      },
      {
        key: 'f3',
        label: 'Price, support, innovation',
      },
      {
        key: 'f4',
        label: 'Use case',
      },
    ],
    template: `Compare {f1} leading providers in {f2} based on {f3}.

Summarize current trends and identify key risks for {f4}.`,
  },
  {
    id: 'uc-content',
    title: 'Content Creation',
    summary: 'You need to draft emails, announcements, social posts, or content for a specific audience.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Content & Writing',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Content type',
        hint: 'email / post / announcement',
      },
      {
        key: 'f2',
        label: 'Topic',
      },
      {
        key: 'f3',
        label: 'Audience',
      },
      {
        key: 'f4',
        label: 'Tone',
        hint: 'professional / friendly / confident',
      },
    ],
    template: `Draft a {f1} about {f2} for {f3}.

Tone: {f4}
Length: under 150 words
Include a clear call to action.`,
  },
  {
    id: 'uc-project',
    title: 'Project Management',
    summary: 'You need to plan a project, generate a checklist, create a timeline, or avoid common mistakes.',
    audiences: ['msp'],
    role: 'Any role',
    task: 'Planning',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Project name',
      },
      {
        key: 'f2',
        label: 'Project phase',
        hint: 'planning / execution / evaluation',
      },
      {
        key: 'f3',
        label: 'Deliverable',
        hint: 'checklist / timeline / template',
      },
      {
        key: 'f4',
        label: 'Background details',
        long: true,
      },
    ],
    template: `Create a project plan for {f1} with phases, risks, and next steps.

Stage: {f2}
Format: {f3}
Additional context: {f4}`,
  },
  {
    id: 'uc-learning',
    title: 'Learning & Development',
    summary: 'You need a learning plan, want to explain a concept to your team, or are exploring a new skill.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Learning & Training',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Topic or skill',
      },
      {
        key: 'f2',
        label: 'Current level',
        hint: 'beginner / intermediate / advanced',
      },
      {
        key: 'f3',
        label: 'Role or team context',
      },
      {
        key: 'f4',
        label: 'Output format',
        hint: 'structured plan / resource list / explanation',
      },
    ],
    template: `Create a learning plan for {f1} for someone at the {f2} level.

Job context: {f3}
Format: {f4}`,
  },
  {
    id: 'uc-competitive',
    title: 'Competitive Analysis',
    summary: 'You need to compare competitors, analyze their messaging, or prepare a strategic briefing.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Research & Analysis',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Competitor or company',
      },
      {
        key: 'f2',
        label: 'Our company or approach',
      },
      {
        key: 'f3',
        label: 'Areas to compare',
        hint: 'products / pricing / messaging',
      },
      {
        key: 'f4',
        label: 'Audience',
        hint: 'leadership / sales / client',
      },
      {
        key: 'f5',
        label: 'Depth',
        hint: 'brief snapshot / detailed analysis',
      },
    ],
    template: `Compare {f1} with {f2} across {f3}.

Audience: {f4}
Format: {f5}`,
  },
  {
    id: 'adv-goal',
    title: 'Goal Alignment Prompt',
    summary: 'Your objective is unclear or needs refinement before you start.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Thinking Tools',
    framework: 'power',
    level: 'advanced',
    fields: [
      {
        key: 'f1',
        label: 'Describe your task',
        long: true,
      },
    ],
    template: `Help me define a clear and specific goal for the following task: {f1}

Ask me clarifying questions one at a time until the goal is well-defined and actionable.`,
  },
  {
    id: 'adv-agent',
    title: 'Agent Creation Prompt',
    summary: 'You need specialized expertise: someone to act as a domain expert for a specific task.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Thinking Tools',
    framework: 'power',
    level: 'advanced',
    fields: [
      {
        key: 'f1',
        label: 'Role or domain',
      },
      {
        key: 'f2',
        label: 'Your specific goal',
      },
    ],
    template: `Act as an expert in {f1}.

Provide step-by-step guidance to accomplish the following goal: {f2}

Ask me one clarifying question at a time before proceeding.`,
  },
  {
    id: 'adv-workflow',
    title: 'Workflow Builder',
    summary: 'You need to build a repeatable system, process, or plan that someone else can follow.',
    audiences: ['msp'],
    role: 'Operations',
    task: 'Thinking Tools',
    framework: 'power',
    level: 'advanced',
    fields: [
      {
        key: 'f1',
        label: 'Describe the task or process',
        long: true,
      },
    ],
    template: `Break this task into clear, step-by-step actions that can be followed to completion:

Task: {f1}

Format: Numbered steps with brief descriptions. Flag any decision points or dependencies.`,
  },
  {
    id: 'adv-stress',
    title: 'Stress Test Prompt',
    summary: 'You want to find blind spots in your plan, proposal, or idea before sharing it.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Thinking Tools',
    framework: 'power',
    level: 'advanced',
    fields: [
      {
        key: 'f1',
        label: 'Relevant domain',
      },
      {
        key: 'f2',
        label: 'Your plan, proposal, or idea',
        hint: 'paste your plan, proposal, or idea here',
        long: true,
      },
    ],
    template: `Act as a skeptical critic with expertise in {f1}.

Review the following and challenge it by asking one probing question at a time:

{f2}`,
  },
  {
    id: 'adv-selfcheck',
    title: 'Self-Check Prompt',
    summary: 'You want AI to review its own output before you use it: the most underused move in prompting.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Thinking Tools',
    framework: 'power',
    level: 'advanced',
    fields: [],
    template: `Review what you just produced. Identify:

1. Any assumptions you made that I did not confirm
2. Anything missing that would make this stronger
3. Any claims that should be verified before use

Then give me an improved version based on that review.`,
  },
  {
    id: 'craft-email',
    title: 'C.R.A.F.T. Client Email',
    summary: 'You need a professional email that represents your company well and requires minimal editing.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Client Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'The situation',
        hint: 'describe the situation',
        long: true,
      },
      {
        key: 'f2',
        label: 'Role the AI plays',
        hint: 'senior account manager / client success lead',
      },
      {
        key: 'f3',
        label: 'Industry',
        hint: 'managed services / technology',
      },
      {
        key: 'f4',
        label: 'The action',
        hint: 'write a follow-up / draft a proposal / summarize the review',
      },
      {
        key: 'f5',
        label: 'Professional email',
      },
      {
        key: 'f6',
        label: 'Under 200 words',
      },
      {
        key: 'f7',
        label: 'Empathetic and confident',
      },
      {
        key: 'f8',
        label: 'Target audience',
        hint: 'non-technical business owner / C-level contact',
      },
    ],
    template: `Context: {f1}

Role: Act as a {f2} with expertise in {f3}.

Action: {f4}

Format: {f5}, {f6}, {f7} tone. Include a clear next step.

Target Audience: {f8}`,
  },
  {
    id: 'craft-internal',
    title: 'C.R.A.F.T. Internal Communication',
    summary: 'You need to communicate a policy update or announcement to your internal team clearly.',
    audiences: ['msp'],
    role: 'Operations',
    task: 'Documentation',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'What is changing or being announced',
        hint: 'describe what is changing or being announced',
        long: true,
      },
      {
        key: 'f2',
        label: 'Role the AI plays',
        hint: 'internal comms lead / operations manager',
      },
      {
        key: 'f3',
        label: 'Format',
        hint: 'announcement / memo / update',
      },
      {
        key: 'f4',
        label: 'Key message',
        hint: 'what is changing and what the team needs to do',
        long: true,
      },
      {
        key: 'f5',
        label: 'Target audience',
        hint: 'internal support team / all staff',
      },
    ],
    template: `Context: {f1}

Role: Act as an {f2} at a technology services company.

Action: Write an internal {f3} explaining {f4}.

Format: short memo, under 200 words, clear and direct with action items.

Target Audience: {f5}`,
  },
  {
    id: 'craft-summary',
    title: 'C.R.A.F.T. Monthly Service Summary',
    summary: 'You need a professional client-facing report summarizing services, issues resolved, and recommendations.',
    audiences: ['msp'],
    role: 'Operations',
    task: 'Documentation',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Client name',
      },
      {
        key: 'f2',
        label: 'Month or period',
      },
      {
        key: 'f3',
        label: '300',
      },
      {
        key: 'f4',
        label: 'Non-technical business owner',
      },
    ],
    template: `Context: Providing {f1} with a monthly summary for {f2}.

Role: Act as a senior technical account manager at a managed services company.

Action: Write a professional monthly service summary with key metrics, resolved issues, and next-month recommendations.

Format: Short report with clear sections, under {f3} words, professional tone.

Target Audience: {f4}`,
  },
  {
    id: 'socratic-main',
    title: 'Socratic Prompt Template',
    subtitle: 'The full three-phase version',
    summary: 'The task is complex, quality matters, and you want the AI to reason before it generates.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Documentation',
    framework: 'socratic',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Type of output',
        hint: 'sOP / proposal / email / policy / plan',
      },
      {
        key: 'f2',
        label: 'Your specific task',
        hint: 'describe your specific task',
        long: true,
      },
      {
        key: 'f3',
        label: 'Who this is for',
      },
      {
        key: 'f4',
        label: 'Desired outcome',
      },
      {
        key: 'f5',
        label: 'Limits or requirements',
        hint: 'any limits or requirements',
      },
    ],
    template: `You must guide this task using a three-part Socratic structure. Do not skip steps. Do not generate the final output until all three phases are complete.

Output type: {f1}

PHASE 1: What makes a high-quality version of this output?
Analyze: purpose, what separates average from exceptional, common mistakes, evaluation criteria.
→ Pause. Do not proceed until complete.

PHASE 2: What frameworks and principles apply?
Analyze: established frameworks, structural patterns, sequencing logic, success metrics.
→ Pause. Do not proceed until complete.

PHASE 3: Apply to my specific task:
Task: {f2}
Audience: {f3}
Goal: {f4}
Constraints: {f5}

Generate the final output. Then provide a brief self-evaluation checklist.`,
  },
  {
    id: 'socratic-ops',
    title: 'Socratic Prompt: Ops / MSP Example',
    summary: 'You need a solid SOP, process document, or internal procedure your team can actually follow.',
    audiences: ['msp'],
    role: 'Operations',
    task: 'Documentation',
    framework: 'socratic',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Process to document',
        hint: 'describe the process to document',
        long: true,
      },
      {
        key: 'f2',
        label: 'Audience',
        hint: 'internal team / department',
      },
      {
        key: 'f3',
        label: 'Main goal',
        hint: 'consistency / accountability / onboarding',
      },
      {
        key: 'f4',
        label: 'Requirements',
        hint: 'length, tone, format requirements',
      },
    ],
    template: `Use the Socratic three-phase structure. Do not generate output until all phases are complete.

Output type: Standard Operating Procedure

PHASE 1: What makes an excellent SOP?
PHASE 2: What frameworks apply to process documentation?

PHASE 3: Apply to my task:
Task: {f1}
Audience: {f2}
Goal: {f3}
Constraints: {f4}`,
  },
  {
    id: 'socratic-client',
    title: 'Socratic Prompt: Client-Facing Example',
    summary: 'You need a proposal, upgrade pitch, or client recommendation that is well-reasoned and persuasive.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Client Communication',
    framework: 'socratic',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Type of output',
        hint: 'service proposal / upgrade pitch / recommendation',
      },
      {
        key: 'f2',
        label: 'What you are proposing',
        hint: 'describe what you are proposing',
        long: true,
      },
      {
        key: 'f3',
        label: 'Audience',
        hint: 'non-technical business owner / decision-maker',
      },
      {
        key: 'f4',
        label: 'Goal',
        hint: 'communicate value / make the decision easy',
      },
      {
        key: 'f5',
        label: 'Length, tone, format',
      },
    ],
    template: `Use the Socratic three-phase structure. Do not generate output until all phases are complete.

Output type: {f1}

PHASE 1: What makes an exceptional proposal in this context?
PHASE 2: What persuasion and communication frameworks apply?

PHASE 3: Apply to my task:
Task: {f2}
Audience: {f3}
Goal: {f4}
Constraints: {f5}`,
  },
  {
    id: 'anatomy-main',
    title: 'Anatomy of a Prompt Template',
    subtitle: 'Fill in all six components',
    summary: 'You need precise control over how the AI reasons, structures its answer, and knows when to stop.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Documentation',
    framework: 'anatomy',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Role',
        hint: 'who should the AI act as: be specific',
        long: true,
      },
      {
        key: 'f2',
        label: 'Task',
        hint: 'exact deliverable and success criteria',
        long: true,
      },
      {
        key: 'f3',
        label: 'Who this is for',
      },
      {
        key: 'f4',
        label: 'Desired outcome',
      },
      {
        key: 'f5',
        label: 'Tone',
        hint: 'professional / empathetic / direct',
      },
      {
        key: 'f6',
        label: 'Output format',
        hint: 'bullets / numbered list / table / narrative',
      },
      {
        key: 'f7',
        label: 'Stop conditions',
        hint: 'word limit, exclusions, how to end the response',
        long: true,
      },
    ],
    template: `ROLE: {f1}

TASK: {f2}

CONTEXT: Audience: {f3} | Goal: {f4} | Tone: {f5}

REASONING: Think step-by-step. Cross-check key claims. Show only concise reasoning.

OUTPUT FORMAT: {f6}

STOP CONDITIONS: {f7}`,
  },
  {
    id: 'anatomy-ops',
    title: 'Anatomy of a Prompt: Ops / MSP Example',
    summary: 'You need a precise, structured output for an internal process, ticket, or operations document.',
    audiences: ['msp'],
    role: 'Operations',
    task: 'Documentation',
    framework: 'anatomy',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Task',
        hint: 'create an escalation SOP / write a ticket response / draft a process doc',
      },
      {
        key: 'f2',
        label: 'Internal support team',
      },
      {
        key: 'f3',
        label: 'Output format',
        hint: 'numbered steps with role assignments',
        long: true,
      },
      {
        key: 'f4',
        label: '400',
      },
    ],
    template: `ROLE: Act as a senior IT operations manager with 10+ years of MSP experience.

TASK: {f1}

CONTEXT: Audience: {f2} | Goal: consistency and accountability | Tone: clear and direct

REASONING: Think step-by-step. Identify edge cases and dependencies.

OUTPUT FORMAT: {f3}

STOP CONDITIONS: Under {f4} words. No jargon. End with a summary line.`,
  },
  {
    id: 'anatomy-client',
    title: 'Anatomy of a Prompt: Client-Facing Example',
    summary: 'You need a polished, precise client-facing document where tone, structure, and completeness all matter.',
    audiences: ['msp', 'erp', 'business'],
    role: 'Any role',
    task: 'Client Communication',
    framework: 'anatomy',
    level: 'starter',
    fields: [
      {
        key: 'f1',
        label: 'Task',
        hint: 'write a QBR follow-up / draft a proposal / create a service summary',
      },
      {
        key: 'f2',
        label: 'C-level, non-technical client',
      },
      {
        key: 'f3',
        label: 'Goal',
        hint: 'reinforce confidence and outline next steps',
        long: true,
      },
      {
        key: 'f4',
        label: 'Output format',
        hint: 'professional email with bullet action items',
        long: true,
      },
      {
        key: 'f5',
        label: '250',
      },
    ],
    template: `ROLE: Act as a senior client success manager at a managed services company.

TASK: {f1}

CONTEXT: Audience: {f2} | Goal: {f3} | Tone: professional and empathetic

REASONING: Lead with what matters most to the client. Be concise.

OUTPUT FORMAT: {f4}

STOP CONDITIONS: Under {f5} words. No jargon. End with one clear call to action.`,
  },
  {
    id: 'msp-escalation-summary',
    title: 'Escalation Summary',
    subtitle: 'Escalate a ticket with full context',
    summary: 'You need to escalate a support ticket to Tier 2 or a senior engineer and want to hand off all relevant context clearly.',
    audiences: ['msp'],
    role: 'Service Desk',
    task: 'Documentation',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'issue',
        label: 'The issue',
        hint: 'describe the issue',
        long: true,
      },
      {
        key: 'steps',
        label: 'Troubleshooting steps taken',
        hint: 'list troubleshooting steps taken',
        long: true,
      },
      {
        key: 'impact',
        label: 'Business impact and urgency',
        hint: 'business impact / urgency level',
      },
    ],
    template: `You are an expert IT support documentation specialist. Write a professional ticket escalation summary for the following situation.

CLIENT: {client}
ISSUE DESCRIPTION: {issue}
TROUBLESHOOTING STEPS ALREADY TAKEN: {steps}
BUSINESS IMPACT / URGENCY: {impact}

Structure your escalation summary with these sections:
1. Situation Overview (2–3 sentences)
2. Steps Already Taken (bulleted)
3. Current Status & What Is Still Unknown
4. Recommended Next Steps for the receiving engineer
5. Urgency Classification with justification

Keep the tone professional and precise. The output will be read by a senior engineer who needs to act immediately.`,
  },
  {
    id: 'msp-client-update-email',
    title: 'Incident Update Email',
    subtitle: 'Keep clients informed during outages',
    summary: 'An incident is ongoing or has just been resolved and you need to send a clear, calm update to a client without alarming them.',
    audiences: ['msp'],
    role: 'Account Manager',
    task: 'Client Communication',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'incident',
        label: 'Brief description of the incident',
      },
      {
        key: 'status',
        label: 'Current status',
        hint: 'current status (ongoing / resolved)',
      },
      {
        key: 'eta',
        label: 'Estimated resolution',
        hint: 'estimated resolution time or "resolved at [time]"',
        long: true,
      },
    ],
    template: `You are a seasoned MSP account manager known for clear, reassuring client communication. Draft a professional incident update email for the following:

CLIENT: {client}
INCIDENT: {incident}
CURRENT STATUS: {status}
ETA / RESOLUTION: {eta}

The email should:
- Open with a brief, empathetic acknowledgment of the disruption
- Clearly explain what happened in plain language (no jargon)
- State what has been done or is being done
- Give a realistic timeline or confirm resolution
- Close with next steps and a direct point of contact

Tone: calm, transparent, and confident. Length: 150–200 words.`,
  },
  {
    id: 'msp-qbr-agenda',
    title: 'QBR Agenda & Talking Points',
    summary: 'You need to prepare for a Quarterly Business Review and want a structured agenda with talking points tailored to the client relationship.',
    audiences: ['msp'],
    role: 'Account Manager',
    task: 'Client Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'bizType',
        label: 'Business type',
        hint: 'describe business type',
      },
      {
        key: 'tenure',
        label: 'Length of time as a client',
      },
      {
        key: 'topics',
        label: 'Key topics',
        hint: 'e.g. service performance, upcoming renewal, new service recommendation',
        long: true,
      },
      {
        key: 'relationship',
        label: 'Relationship status',
        hint: 'new / growing / at-risk / long-term stable',
      },
    ],
    template: `CONTEXT: I am preparing for a Quarterly Business Review with {client}. They are a {bizType} client who has been with us for {tenure}. Key topics I need to cover: {topics}.

ROLE: Act as a senior vCIO and client success strategist with expertise in managed IT services and executive-level business reviews.

TASK: Build a QBR agenda with talking points for each section. Include: service performance summary, open issues and resolutions, strategic recommendations, upcoming projects or renewals, and next steps with owners and target dates.

FORMAT: Structured agenda with time allocations (60-minute meeting). Bullet talking points under each section. Professional, confident tone. Executive-ready: no technical jargon unless the client is technical.

TARGET AUDIENCE: Business owner or C-level client contact. Relationship priority: {relationship}.`,
    tailorFor: [
      'New client vs. long-term relationship',
      'at-risk client who needs confidence rebuilt',
      'renewal conversation vs. standard review',
    ],
  },
  {
    id: 'msp-difficult-client-email',
    title: 'Difficult Client Conversation Email',
    summary: 'You need to respond to a client situation that requires careful handling: a missed SLA, recurring issue, complaint, or billing dispute.',
    audiences: ['msp'],
    role: 'Customer Success',
    task: 'Client Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'situation',
        label: 'The situation',
        hint: 'e.g. missed SLA, recurring issue, billing dispute',
        long: true,
      },
      {
        key: 'relStatus',
        label: 'Relationship status',
        hint: 'e.g. long-term, recent onboarding, at-risk',
        long: true,
      },
      {
        key: 'contactRole',
        label: 'Their role',
      },
      {
        key: 'tone',
        label: 'Tone',
        hint: 'empathetic / solution-focused / relationship-rebuilding',
      },
    ],
    template: `CONTEXT: I need to respond to a client situation that requires careful handling. Client name: {client}. The situation is: {situation}. Our relationship with this client is: {relStatus}.

ROLE: Act as a senior client success manager with expertise in difficult client communication, relationship recovery, and managed services.

TASK: Draft a professional, empathetic email that acknowledges the situation without over-apologizing, explains what happened and what we are doing about it, and reestablishes confidence in the relationship. Do not make promises we cannot keep.

FORMAT: Professional email. Empathetic but confident tone: not defensive, not groveling. Under 250 words. End with one clear next step or call to action.

TARGET AUDIENCE: {client}, {contactRole}. Tone priority: {tone}.`,
    tailorFor: [
      'SLA miss vs. billing issue vs. recurring technical problem',
      'executive contact vs. day-to-day contact',
      'first incident vs. pattern of issues',
    ],
  },
  {
    id: 'msp-renewal-proposal',
    title: 'Service Renewal Proposal Email',
    summary: 'A client agreement is approaching expiration and you want to frame the renewal conversation around the value delivered.',
    audiences: ['msp'],
    role: 'Account Manager',
    task: 'Client Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'expiry',
        label: 'Agreement expiry date or timeframe',
      },
      {
        key: 'value',
        label: 'Value delivered',
        hint: 'e.g. uptime achieved, issues resolved, projects completed',
        long: true,
      },
      {
        key: 'upsell',
        label: 'New service to introduce',
        hint: 'describe new service or write "none at this time"',
        long: true,
      },
      {
        key: 'contactRole',
        label: 'Their role',
      },
      {
        key: 'tenure',
        label: 'Time as a client',
        hint: 'x years/months',
      },
      {
        key: 'priority',
        label: 'Goal',
        hint: 'retention only / retention + upsell',
      },
    ],
    template: `CONTEXT: I am preparing a renewal communication for {client}. Their current agreement expires {expiry}. Key value we have delivered: {value}. New services or upgrades to propose: {upsell}.

ROLE: Act as a senior account manager at a managed services company with expertise in client retention and value-based communication.

TASK: Draft a renewal email that reinforces the value we have delivered, frames the renewal as a natural next step, and, if applicable, introduces the new service or upgrade as an enhancement to what is already working.

FORMAT: Professional email. Warm but confident tone: this is a conversation, not a sales pitch. Under 200 words. Subject line included. End with a soft ask for a call or meeting to discuss.

TARGET AUDIENCE: {client}, {contactRole}. Relationship length: {tenure}. Priority: {priority}.`,
    tailorFor: [
      'Straight renewal vs. renewal with upsell',
      'long-term loyal client vs. newer client',
      'email only vs. email ahead of a renewal call',
    ],
  },
  {
    id: 'msp-new-service-announcement',
    title: 'New Service Offering Announcement',
    summary: 'You need to introduce a new service or product to an existing client in a way that feels like a trusted recommendation, not a mass marketing email.',
    audiences: ['msp'],
    role: 'Account Manager',
    task: 'Client Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'service',
        label: 'New service',
        hint: 'service name and one-sentence description',
        long: true,
      },
      {
        key: 'benefit',
        label: 'Why it matters to this client',
        hint: 'why this matters specifically to this client',
        long: true,
      },
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'existing',
        label: 'Their current services',
        hint: 'brief description of their current services with us',
        long: true,
      },
      {
        key: 'contactRole',
        label: 'Their role',
      },
      {
        key: 'techLevel',
        label: 'Contact’s technical level',
        hint: 'technical / non-technical / mixed',
      },
    ],
    template: `CONTEXT: I need to communicate a new service to an existing client. The service is: {service}. The primary benefit for this client is: {benefit}. Client name: {client}. Their current services: {existing}.

ROLE: Act as a senior account manager with expertise in client communication and managed services: someone who leads with value, not features.

TASK: Draft a personalized announcement email that introduces the new service, connects it to this client's specific situation, and invites them to learn more. It should feel like a relevant recommendation from a trusted advisor, not a mass marketing email.

FORMAT: Professional email. Consultative tone: advisory, not promotional. Under 180 words. Subject line included. One clear call to action at the end.

TARGET AUDIENCE: {client}, {contactRole}. Familiarity with technology: {techLevel}.`,
    tailorFor: [
      'Security service vs. cloud vs. Microsoft 365',
      'technical decision-maker vs. business owner',
      'proactive outreach vs. follow-up to a conversation',
    ],
  },
  {
    id: 'msp-shift-handoff',
    title: 'NOC / Shift Handoff Summary',
    summary: 'You are ending a shift and need to give the incoming team a clean, complete picture of everything open, resolved, and priority.',
    audiences: ['msp'],
    role: 'Service Desk',
    task: 'Documentation',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'shift',
        label: 'Shift',
        hint: 'date and hours (e.g. Mon 04/28, 22:00–06:00)',
        long: true,
      },
      {
        key: 'openItems',
        label: 'Open issues',
        hint: 'list open issues with client name and brief description',
        long: true,
      },
      {
        key: 'resolved',
        label: 'Resolved this shift',
        hint: 'list what was closed this shift',
        long: true,
      },
      {
        key: 'priority',
        label: 'Act on first',
        hint: 'list anything the incoming team needs to act on first',
        long: true,
      },
      {
        key: 'comms',
        label: 'Client comms sent',
        hint: 'client comms sent this shift, or "none"',
        long: true,
      },
    ],
    template: `CONTEXT: I am writing an end-of-shift handoff summary for the incoming team. Shift period: {shift}. Active alerts or open issues: {openItems}. Items resolved this shift: {resolved}. Items requiring immediate attention: {priority}. Client communications sent this shift: {comms}.

ROLE: Act as a senior NOC analyst with expertise in shift documentation and internal technical communication.

TASK: Write a clean, structured shift handoff summary that gives the incoming team everything they need to hit the ground running. No context should be lost between shifts.

FORMAT: Structured internal document with labeled sections: Active Issues, Resolved This Shift, Priority Items for Incoming Team, Client Comms Sent, Notes. Concise, technical, no fluff. Bullet points throughout.

TARGET AUDIENCE: Incoming NOC or Service Desk team. Assume technical knowledge: no need to explain basic concepts.`,
    tailorFor: [
      'Overnight handoff vs. day shift',
      'high-volume incident shift vs. quiet shift',
      'single site vs. multi-client environment',
    ],
  },
  {
    id: 'erp-change-request-doc',
    title: 'Change Request Document',
    subtitle: 'Draft a formal ERP change request',
    summary: 'A client wants to modify their ERP configuration, workflow, or integration and you need a formal change request document for approval.',
    audiences: ['erp'],
    role: 'Functional Consulting',
    task: 'Documentation',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client',
        hint: 'client / organization name',
      },
      {
        key: 'module',
        label: 'ERP module or area',
        hint: 'eRP module or area (e.g. Accounts Payable, Inventory)',
        long: true,
      },
      {
        key: 'change',
        label: 'Requested change',
        hint: 'describe the requested change',
        long: true,
      },
      {
        key: 'reason',
        label: 'Business reason for the change',
      },
    ],
    template: `You are a senior ERP implementation consultant with 20+ years of experience in enterprise change management. Draft a formal Change Request document for the following:

CLIENT: {client}
ERP MODULE / AREA: {module}
REQUESTED CHANGE: {change}
BUSINESS JUSTIFICATION: {reason}

Structure the document with these sections:
1. Change Request Summary
2. Business Justification
3. Scope of Change (what IS and IS NOT included)
4. Risk Assessment (Low / Medium / High with explanation)
5. Testing & Validation Plan
6. Rollback Plan
7. Approval Sign-Off Block (placeholder names and roles)

Use formal business language appropriate for executive review. Be specific about scope to prevent scope creep.`,
  },
  {
    id: 'erp-weekly-status-report',
    title: 'Weekly Project Status Report',
    summary: 'You need to send a structured weekly update to the client sponsor and want it to be clear, professional, and honest about risks.',
    audiences: ['erp'],
    role: 'Project Management',
    task: 'Internal Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'phase',
        label: 'Current phase name',
      },
      {
        key: 'done',
        label: 'Accomplishments this week',
        hint: 'list accomplishments this week',
        long: true,
      },
      {
        key: 'risks',
        label: 'Risks or blockers',
        hint: 'describe any risks or blockers, or "none"',
        long: true,
      },
      {
        key: 'budget',
        label: 'Budget status',
        hint: 'on track / minor variance / flag needed',
      },
      {
        key: 'goLive',
        label: 'Go-live target date',
      },
    ],
    template: `CONTEXT: I am managing an ERP implementation project for {client}. Current phase: {phase}. This week we completed: {done}. Current risks or blockers: {risks}. Budget status: {budget}. Go-live target: {goLive}.

ROLE: Act as a senior ERP project manager with expertise in client communication, risk management, and implementation reporting.

TASK: Write a weekly project status report that covers: accomplishments this week, planned work next week, risks and mitigations, budget status, and action items with owners and due dates.

FORMAT: Structured report with labeled sections. Professional tone. Under 350 words. Use bullet points for action items in owner / task / due date format. Flag any at-risk items clearly: do not soften risks.

TARGET AUDIENCE: Client project sponsor or steering committee. May be non-technical: frame everything in business impact terms, not technical detail.`,
    tailorFor: [
      'On-track project vs. delayed project',
      'technical sponsor vs. business sponsor',
      'early phase vs. approaching go-live',
    ],
  },
  {
    id: 'erp-discovery-questions',
    title: 'Discovery Question Framework',
    summary: 'You are preparing for a requirements gathering session and want a structured set of questions that uncover what the client actually needs.',
    audiences: ['erp'],
    role: 'Functional Consulting',
    task: 'Planning',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'industry',
        label: 'Client industry',
      },
      {
        key: 'modules',
        label: 'Modules in scope',
        hint: 'e.g. Finance, Purchasing, Inventory',
        long: true,
      },
      {
        key: 'knownPains',
        label: 'Known pain points',
        hint: 'known pain points, or "none confirmed yet"',
        long: true,
      },
    ],
    template: `CONTEXT: I am preparing for a discovery session with {client}. Their industry is {industry}. The modules or business areas we are covering in this session: {modules}. Known pain points or priorities the client has mentioned: {knownPains}.

ROLE: Act as a senior ERP functional consultant with expertise in requirements gathering, business process analysis, and solution design.

TASK: Build a structured discovery question framework for this session. Organize questions by business process area. Include questions that uncover current-state pain points, volume and complexity, integration requirements, reporting needs, and user roles. Flag any questions that are particularly important to ask early.

FORMAT: Numbered questions grouped by category. 10-15 questions per module area. Include a brief note after each high-priority question explaining why it matters. Plain language: avoid ERP jargon that the client may not know.

TARGET AUDIENCE: Client operations, finance, or IT leaders. Assume they know their business well but may not know ERP terminology.`,
    tailorFor: [
      'Finance vs. distribution vs. manufacturing',
      'first discovery session vs. follow-up deep dive',
      'technical IT contact vs. business process owner',
    ],
  },
  {
    id: 'erp-golive-readiness',
    title: 'Go-Live Readiness Summary',
    summary: 'You are approaching go-live and need to give the client a clear, honest picture of readiness status and a formal recommendation.',
    audiences: ['erp'],
    role: 'Project Management',
    task: 'Client Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'goLiveDate',
        label: 'Go-live date',
      },
      {
        key: 'training',
        label: 'Training status',
        hint: 'complete / in progress / at risk',
      },
      {
        key: 'dataMig',
        label: 'Data migration status',
        hint: 'complete / in progress / at risk',
      },
      {
        key: 'uat',
        label: 'UAT sign-off status',
        hint: 'complete / in progress / at risk',
      },
      {
        key: 'techSetup',
        label: 'Technical setup status',
        hint: 'complete / in progress / at risk',
      },
      {
        key: 'openIssues',
        label: 'Open issues',
        hint: 'list unresolved items, or "none"',
        long: true,
      },
      {
        key: 'confidence',
        label: 'Overall confidence',
        hint: 'high / medium / needs discussion',
      },
    ],
    template: `CONTEXT: We are approaching go-live for {client}. Go-live date: {goLiveDate}. Current readiness status: Training: {training}. Data migration: {dataMig}. UAT sign-off: {uat}. Technical setup: {techSetup}. Open issues: {openIssues}. Overall confidence level: {confidence}.

ROLE: Act as a senior ERP project manager with expertise in go-live planning, risk assessment, and executive communication.

TASK: Write a go-live readiness summary that gives the client a clear, honest picture of where things stand. Confirm what is ready, flag what is not, state the recommendation clearly (proceed, delay, or proceed with conditions), and outline next steps with owners and dates.

FORMAT: Structured executive summary. Professional, direct tone: do not sugarcoat risks. Under 400 words. Status indicators (Ready / In Progress / At Risk) for each area. End with a clear recommendation and next steps.

TARGET AUDIENCE: Client CFO, COO, or executive sponsor. Non-technical: business impact language only.`,
    tailorFor: [
      'Clean go-live vs. go-live with known risks',
      'full confidence vs. recommending delay',
      'first go-live vs. phased rollout',
    ],
  },
  {
    id: 'erp-change-management',
    title: 'Change Management Announcement',
    summary: 'You need to communicate an upcoming system or process change to client staff in a way that prepares them without creating anxiety.',
    audiences: ['erp'],
    role: 'Training & Adoption',
    task: 'Internal Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'client',
        label: 'Client name',
      },
      {
        key: 'change',
        label: 'What is changing',
        hint: 'e.g. new ERP system going live, new process for purchase orders',
        long: true,
      },
      {
        key: 'effectiveDate',
        label: 'Go-live or effective date',
      },
      {
        key: 'affected',
        label: 'Affected teams or roles',
        hint: 'describe affected teams or roles',
        long: true,
      },
      {
        key: 'actions',
        label: 'What staff need to do',
        hint: 'e.g. attend training, update their process, stop using the old system',
        long: true,
      },
    ],
    template: `CONTEXT: We need to communicate an upcoming system change to {client}'s staff. The change is: {change}. Go-live or effective date: {effectiveDate}. Who is affected: {affected}. Key actions staff need to take: {actions}.

ROLE: Act as a change management and internal communications specialist with expertise in ERP adoption and organizational change.

TASK: Write an internal announcement that prepares staff for the change, explains what is happening and why, tells them exactly what they need to do, and reduces anxiety by framing the change positively without being dismissive of the disruption.

FORMAT: Internal announcement email or memo. Empathetic, clear, benefit-first tone. Under 250 words. Include a clear timeline and 2-3 specific action items for staff. Avoid technical jargon completely.

TARGET AUDIENCE: End users such as warehouse staff, the finance team, and operations. Assume no prior ERP experience. Reading level: clear and plain.`,
    tailorFor: [
      'Major system go-live vs. process change vs. training announcement',
      'anxious workforce vs. change-ready culture',
      'advance notice vs. last-minute communication',
    ],
  },
  {
    id: 'erp-client-escalation',
    title: 'Client Escalation Email',
    summary: 'You need to formally escalate a risk or blocker to the client sponsor and want to create appropriate urgency without damaging the relationship.',
    audiences: ['erp'],
    role: 'Project Management',
    task: 'Client Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'issue',
        label: 'The issue',
        hint: 'e.g. data files not delivered, key resource unavailable, scope creep',
        long: true,
      },
      {
        key: 'impact',
        label: 'Impact',
        hint: 'describe timeline, budget, or go-live risk',
        long: true,
      },
      {
        key: 'ask',
        label: 'Your ask',
        hint: 'specific ask: decision, resource, or action needed',
        long: true,
      },
      {
        key: 'deadline',
        label: 'Response deadline',
        hint: 'deadline date or timeframe for response',
        long: true,
      },
    ],
    template: `CONTEXT: I need to escalate a risk or issue formally to the client sponsor. The issue is: {issue}. Impact on the project: {impact}. What we need from the client: {ask}. Deadline for response: {deadline}.

ROLE: Act as a senior ERP project manager with expertise in client escalation, risk communication, and executive relationship management.

TASK: Draft a formal escalation email that describes the issue clearly, states the business impact without exaggerating, makes a specific ask with a clear deadline, and maintains the professional relationship while creating appropriate urgency.

FORMAT: Professional email. Firm but collaborative tone: this is a partnership communication, not a blame email. Under 250 words. Subject line included. One clear ask with a deadline. Offer to discuss on a call.

TARGET AUDIENCE: Client executive sponsor or CFO. Frame in business terms: timeline and budget impact, not technical detail.`,
    tailorFor: [
      'Client-caused delay vs. external blocker vs. scope change',
      'first escalation vs. repeated issue',
      'strong relationship vs. already tense dynamic',
    ],
  },
  {
    id: 'corp-meeting-agenda',
    title: 'Meeting Agenda Builder',
    subtitle: 'Create a focused, time-blocked agenda',
    summary: 'You are planning a team meeting and want a structured, time-blocked agenda that keeps participants focused and respects everyone\'s time.',
    audiences: ['business'],
    role: 'Operations',
    task: 'Planning',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'meeting',
        label: 'Meeting name or purpose',
        hint: 'meeting name / purpose',
      },
      {
        key: 'duration',
        label: 'Duration',
        hint: 'total meeting duration (e.g. 60 minutes)',
        long: true,
      },
      {
        key: 'topics',
        label: 'Topics to cover',
        hint: 'list of topics to cover',
        long: true,
      },
      {
        key: 'attendees',
        label: 'Attendee roles',
        hint: 'attendee roles (e.g. team leads, client, exec)',
        long: true,
      },
    ],
    template: `You are an expert facilitator and operations manager. Build a professional, time-blocked meeting agenda for the following:

MEETING NAME / PURPOSE: {meeting}
TOTAL DURATION: {duration}
TOPICS TO COVER: {topics}
ATTENDEES: {attendees}

Format the agenda as a table with columns: Time Block | Agenda Item | Owner | Notes/Action.

Also include:
- A 2-sentence meeting objective statement at the top
- Pre-read or prep items attendees should complete beforehand
- A designated "parking lot" item at the end for unresolved items
- A 5-minute buffer before the close for action item review

Keep the language direct. Every agenda item should have a clear owner and time limit.`,
  },
  {
    id: 'corp-performance-review-narrative',
    title: 'Performance Review Narrative',
    subtitle: 'Write a balanced review summary',
    summary: 'You need to write or refine a performance review narrative for a direct report and want it to be balanced, specific, and development-focused.',
    audiences: ['business'],
    role: 'Human Resources',
    task: 'Documentation',
    framework: null,
    level: 'starter',
    fields: [
      {
        key: 'role',
        label: 'Employee job title',
      },
      {
        key: 'strengths',
        label: 'Key strengths demonstrated this period',
        long: true,
      },
      {
        key: 'areas',
        label: 'Areas for development',
        long: true,
      },
      {
        key: 'goal',
        label: 'Primary development goal for next period',
        long: true,
      },
    ],
    template: `You are a senior HR manager and organizational development expert. Write a professional performance review narrative based on the following:

EMPLOYEE ROLE: {role}
KEY STRENGTHS THIS PERIOD: {strengths}
AREAS FOR DEVELOPMENT: {areas}
PRIMARY DEVELOPMENT GOAL FOR NEXT PERIOD: {goal}

The narrative should:
1. Open with a balanced, specific summary of the employee's overall performance (3–4 sentences)
2. Highlight 2–3 specific strengths with examples of their impact on the team or business
3. Address 1–2 development areas constructively. Frame them as growth opportunities, not deficiencies
4. Close with a forward-looking development goal and how the manager will support it

Tone: professional, encouraging, and direct. Avoid vague language like "good team player." Length: 250–350 words.`,
  },
  {
    id: 'corp-job-posting',
    title: 'Job Posting',
    subtitle: 'Technical or Operational Role',
    summary: 'You need to write a job posting that attracts the right candidates and makes i-Tech sound like a company people genuinely want to work for.',
    audiences: ['business'],
    role: 'Human Resources',
    task: 'Documentation',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'jobTitle',
        label: 'Job title',
      },
      {
        key: 'responsibilities',
        label: 'Key responsibilities',
        hint: 'list 3-4 key responsibilities',
        long: true,
      },
      {
        key: 'requirements',
        label: 'Required skills and experience',
        hint: 'list required skills and experience',
        long: true,
      },
      {
        key: 'workType',
        label: 'Work arrangement',
        hint: 'full-time / part-time / remote / hybrid / on-site',
      },
      {
        key: 'salary',
        label: 'Salary range',
        hint: 'salary range or "not disclosing"',
      },
      {
        key: 'candidateType',
        label: 'Ideal candidate',
        hint: 'e.g. experienced MSP technician, entry-level ERP consultant',
        long: true,
      },
      {
        key: 'level',
        label: 'Seniority',
        hint: 'entry / mid / senior',
      },
    ],
    template: `CONTEXT: I need to write a job posting for a {jobTitle} position at i-Tech Support. Key responsibilities include: {responsibilities}. Required skills and experience: {requirements}. This is a {workType} role. Salary range: {salary}. The type of candidate we want to attract: {candidateType}.

ROLE: Act as a senior HR specialist and technical recruiter with expertise in technology services hiring and employer branding.

TASK: Write a compelling job posting that includes: role summary, key responsibilities, required qualifications, preferred qualifications, what makes i-Tech a great place to work, and a call to apply. Make it sound like a company people genuinely want to work for: specific, not generic.

FORMAT: Standard job posting structure. Engaging but professional tone. Under 450 words. Use bullet points for responsibilities and qualifications. Opening paragraph must hook the right candidate immediately.

TARGET AUDIENCE: Technology professionals actively or passively looking. Experience level: {level}.`,
    tailorFor: [
      'Technical role vs. client-facing role vs. administrative role',
      'active job seekers vs. passive candidates',
      'emphasize culture vs. emphasize growth opportunity',
    ],
  },
  {
    id: 'corp-policy-announcement',
    title: 'Internal Policy or Process Announcement',
    summary: 'You need to communicate a new or updated policy to staff in a way that is clear, respectful, and answers questions before they are asked.',
    audiences: ['business'],
    role: 'Human Resources',
    task: 'Internal Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'policy',
        label: 'The policy or process change',
        hint: 'describe the policy or process change clearly',
        long: true,
      },
      {
        key: 'effective',
        label: 'Effective date',
      },
      {
        key: 'affected',
        label: 'Who is affected',
        hint: 'all staff / specific teams / specific roles',
      },
      {
        key: 'changes',
        label: 'What changed from before',
        hint: 'key changes from before, or "this is new"',
        long: true,
      },
      {
        key: 'reason',
        label: 'Reason for the change',
        hint: 'e.g. compliance requirement, operational improvement',
        long: true,
      },
      {
        key: 'tone',
        label: 'Tone',
        hint: 'informational / urgent / collaborative',
      },
    ],
    template: `CONTEXT: I need to communicate a new or updated policy or process to i-Tech staff. The policy or process is: {policy}. Effective date: {effective}. Who it affects: {affected}. Key changes from the previous approach: {changes}. Reason for the change: {reason}.

ROLE: Act as an internal communications specialist and HR professional with expertise in clear policy communication and staff engagement.

TASK: Write an internal announcement that explains the policy change clearly, gives staff the context for why it is happening, tells them exactly what changes for them and what they need to do, and answers the most likely questions before they are asked.

FORMAT: Internal email or memo. Clear, direct, respectful tone, not bureaucratic. Under 300 words. Include: what is changing, why, when it takes effect, what staff need to do, and who to contact with questions.

TARGET AUDIENCE: i-Tech Support staff. Tone: {tone}.`,
    tailorFor: [
      'New policy vs. policy update vs. process change',
      'compliance-driven vs. culture-driven',
      'company-wide vs. department-specific',
    ],
  },
  {
    id: 'corp-meeting-recap',
    title: 'Meeting Recap & Action Items',
    summary: 'You just finished a meeting and need to send a clean recap that captures decisions and action items so nothing falls through the cracks.',
    audiences: ['business'],
    role: 'Operations',
    task: 'Documentation',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'meetingType',
        label: 'Meeting type',
        hint: 'e.g. client call, internal planning, vendor review',
        long: true,
      },
      {
        key: 'attendees',
        label: 'Attendees',
        hint: 'list names and roles or organizations',
        long: true,
      },
      {
        key: 'topics',
        label: 'Key topics discussed',
        hint: 'list 3-5 key topics discussed',
        long: true,
      },
      {
        key: 'decisions',
        label: 'Decisions made',
        hint: 'list any decisions made, or "none"',
        long: true,
      },
      {
        key: 'actions',
        label: 'Action items',
        hint: 'list each action with owner and due date',
        long: true,
      },
      {
        key: 'distribution',
        label: 'Distribution',
        hint: 'internal only / includes client',
      },
    ],
    template: `CONTEXT: I just completed a meeting and need to send a clean recap. Meeting type: {meetingType}. Attendees: {attendees}. Key topics discussed: {topics}. Decisions made: {decisions}. Action items: {actions}.

ROLE: Act as a professional communications specialist with expertise in clear, concise business documentation.

TASK: Write a meeting recap that summarizes the key discussion points, captures all decisions clearly, and lists action items in a clean format with owners and due dates. Recipients should be able to read this in under 2 minutes and know exactly what was decided and what happens next.

FORMAT: Professional email. Organized with labeled sections: Summary, Decisions Made, Action Items. Action items in owner / task / due date format. Under 300 words. Neutral, factual tone: no interpretation or editorializing.

TARGET AUDIENCE: Meeting attendees and stakeholders. Distribution: {distribution}.`,
    tailorFor: [
      'Client meeting vs. internal meeting vs. vendor meeting',
      'action-heavy meeting vs. discussion-only',
      'formal recap vs. casual team summary',
    ],
  },
  {
    id: 'corp-vendor-proposal',
    title: 'Vendor Proposal Summary',
    summary: 'You have received a vendor proposal and need to brief leadership with a clear, objective summary and a recommended next step.',
    audiences: ['business'],
    role: 'Operations',
    task: 'Research & Analysis',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'vendor',
        label: 'Vendor name',
      },
      {
        key: 'product',
        label: 'Product or service',
        hint: 'product or service being proposed',
      },
      {
        key: 'details',
        label: 'Key details',
        hint: 'pricing, contract length, key features or deliverables',
        long: true,
      },
      {
        key: 'comparison',
        label: 'Comparison to alternatives',
        hint: 'comparison to alternatives, or "no direct comparison available"',
        long: true,
      },
      {
        key: 'criteria',
        label: 'Decision criteria',
        hint: 'e.g. cost, support quality, integration with existing systems',
        long: true,
      },
      {
        key: 'concerns',
        label: 'Concerns or questions',
        hint: 'any concerns or questions, or "none at this time"',
        long: true,
      },
    ],
    template: `CONTEXT: I have received a proposal from {vendor} for {product}. Key details of the proposal: {details}. How this compares to alternatives: {comparison}. Our primary evaluation criteria: {criteria}. Any concerns or questions: {concerns}.

ROLE: Act as a senior operations and procurement specialist with expertise in vendor evaluation, contract review, and executive briefing.

TASK: Write a concise vendor proposal summary for leadership review. Include: what is being proposed, key commercial terms, strengths and weaknesses of the proposal, any risks or questions that need resolution, and a recommended next step.

FORMAT: Executive summary format. Objective, analytical tone. Under 350 words. Use a structured layout with labeled sections. End with a clear recommended next step: accept, negotiate, decline, or request more information.

TARGET AUDIENCE: Internal leadership or decision-makers. May not have seen the proposal: assume no prior context.`,
    tailorFor: [
      'Software vendor vs. hardware vs. services vendor',
      'single vendor vs. competitive evaluation',
      'straightforward proposal vs. complex contract',
    ],
  },
  {
    id: 'corp-perf-review-prep',
    title: 'Performance Review Talking Points',
    summary: 'You are preparing for a performance review conversation and want structured talking points that are direct, fair, and constructive.',
    audiences: ['business'],
    role: 'Human Resources',
    task: 'Internal Communication',
    framework: 'craft',
    level: 'starter',
    fields: [
      {
        key: 'employee',
        label: 'Employee name and role',
        hint: 'employee name / role',
      },
      {
        key: 'period',
        label: 'Review period',
      },
      {
        key: 'strengths',
        label: 'Strength examples',
        hint: 'list 2-3 specific strength examples',
        long: true,
      },
      {
        key: 'devAreas',
        label: 'Development areas',
        hint: 'list 1-2 specific development areas',
        long: true,
      },
      {
        key: 'incidents',
        label: 'Significant incidents',
        hint: 'significant incidents this period, or "none"',
        long: true,
      },
      {
        key: 'direction',
        label: 'Overall direction',
        hint: 'exceeding expectations / meeting expectations / needs improvement',
      },
    ],
    template: `CONTEXT: I am preparing for a performance review conversation with {employee}. Review period: {period}. Key strengths demonstrated this period: {strengths}. Areas for development or improvement: {devAreas}. Any significant incidents (positive or negative): {incidents}. Overall performance direction: {direction}.

ROLE: Act as a senior HR professional and leadership coach with expertise in performance communication, employee development, and difficult conversations.

TASK: Build structured talking points for this performance review conversation. Include: opening framing, specific strength recognition with impact, development areas framed constructively, any goals for the next period, and a closing that reinforces the employee's value to the team.

FORMAT: Structured talking points: not a script, but clear guidance for each section of the conversation. Empathetic but direct tone. Include suggested language for any sensitive areas. Under 400 words.

TARGET AUDIENCE: Manager preparing for a 1:1 conversation with a direct report. Conversation tone: {direction}.`,
    tailorFor: [
      'Strong performer vs. needs improvement vs. mixed review',
      'experienced manager vs. new manager',
      'formal review vs. mid-year check-in',
    ],
  },
];
