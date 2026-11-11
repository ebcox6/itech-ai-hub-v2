// The Learn path. Order matters: each framework builds on the one before it.
import anatomyImg from '../assets/guides/anatomy-of-a-prompt.webp';
import anatomyThumb from '../assets/guides/anatomy-of-a-prompt-thumb.webp';
import craftImg from '../assets/guides/craft-prompt-template.webp';
import craftThumb from '../assets/guides/craft-prompt-template-thumb.webp';
import socraticImg from '../assets/guides/socratic-prompting-guide.webp';
import socraticThumb from '../assets/guides/socratic-prompting-guide-thumb.webp';
import synapseImg from '../assets/guides/professor-synapse.webp';
import synapseThumb from '../assets/guides/professor-synapse-thumb.webp';
import universalImg from '../assets/guides/universal-ai-prompting-guide.webp';
import universalThumb from '../assets/guides/universal-ai-prompting-guide-thumb.webp';

export const guides = {
  anatomy: { title: 'Anatomy of a Prompt', src: anatomyImg, thumb: anatomyThumb },
  craft: { title: 'C.R.A.F.T. Prompt Template', src: craftImg, thumb: craftThumb },
  socratic: { title: 'Socratic Prompting Guide', src: socraticImg, thumb: socraticThumb },
  synapse: { title: 'Professor Synapse', src: synapseImg, thumb: synapseThumb },
  universal: { title: 'Universal AI Prompting Guide', src: universalImg, thumb: universalThumb },
};

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
      { key: 'Reasoning', desc: 'Think step by step, cross-check with credible sources, and show concise reasoning only.' },
      { key: 'Output format', desc: 'Bullets, numbered list, table, or narrative. Spell out the structure.' },
      { key: 'Stop conditions', desc: 'Word or bullet limits, exclusions, when the task is complete, and how to end.' },
    ],
    insight: {
      title: 'Most overlooked component',
      body: 'Stop conditions. Telling the AI exactly when and how to end prevents bloated, over-explained answers and keeps the output actionable.',
    },
    guide: 'anatomy',
  },
  {
    slug: 'craft',
    name: 'C.R.A.F.T.',
    minutes: 5,
    tagline: 'The everyday five-part structure for outputs that need little editing.',
    intro:
      'C.R.A.F.T. packs the essentials into an easy acronym. Fill in all five elements and you give the AI enough context, direction, and clarity to get it right the first time.',
    useWhen: 'You are writing client emails, internal updates, reports, or anything you plan to send with minimal edits.',
    partsTitle: 'The five elements',
    parts: [
      { key: 'Context', desc: 'What is going on. The situation or background the AI needs before acting.' },
      { key: 'Role', desc: 'Who the AI should act as. Be specific about expertise, experience level, and industry.' },
      { key: 'Action', desc: 'The exact task and what success looks like. Not just "write an email" but what kind and to what end.' },
      { key: 'Format', desc: 'How the output should look: length, structure, tone, and whether to use bullets, headers, or prose.' },
      { key: 'Target audience', desc: 'Who the output is for. This shapes vocabulary, depth, and assumptions.' },
    ],
    insight: {
      title: 'The key insight',
      body: 'Most bad AI outputs happen because the Role or Target audience was vague. Get specific on both and you will see an immediate improvement.',
    },
    guide: 'craft',
    extra: 'ultimate',
  },
  {
    slug: 'socratic',
    name: 'Socratic Prompting',
    minutes: 4,
    tagline: 'Make the AI reason first, then generate.',
    intro:
      'Instead of asking for the answer straight away, you walk the AI through three phases. It defines what good looks like, pulls in the right frameworks, and only then applies them to your task.',
    useWhen: 'The stakes are high: SOPs, proposals, policies, and strategic plans where quality really matters.',
    partsTitle: 'The three phases',
    parts: [
      { key: 'Theoretical', quote: 'What makes a high-quality version of this output?', desc: 'The AI analyzes purpose, what separates average from exceptional, common mistakes, and how to evaluate the result.' },
      { key: 'Framework', quote: 'What principles and structures apply here?', desc: 'The AI surfaces established frameworks, structural patterns, sequencing logic, and success measures.' },
      { key: 'Application', quote: 'Now apply all of that to my specific task.', desc: 'Only after the first two phases does the AI produce the final output, grounded in first principles.' },
    ],
    insight: {
      title: 'Why it works',
      body: 'You get genuine expertise instead of pattern matching. The extra reasoning step costs seconds and routinely produces a noticeably stronger first draft.',
    },
    guide: 'socratic',
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
      { key: 'Install', desc: 'Copy the master prompt and paste it into ChatGPT or Claude.' },
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
    guide: 'synapse',
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
    guide: 'universal',
  },
];

export const ultimatePrompt = `CONTEXT: We are going to create one of the best AI prompts ever written. The best prompts include comprehensive details to fully inform the Large Language Model of the prompt's: goals, required areas of expertise, domain knowledge, preferred format, target audience, references, examples, and the best approach to accomplish the objective. Based on this and the following information, you will be able to write this exceptional prompt.

ROLE: You are an LLM prompt generation expert. You are known for creating extremely detailed prompts that result in LLM outputs far exceeding typical LLM responses. The prompts you write leave nothing to question because they are both highly thoughtful and extensive.

ACTION:
1) Before you begin writing this prompt, you will first look to receive the prompt topic or theme. If I don't provide the topic or theme for you, please request it.
2) Once you are clear about the topic or theme, please also review the Format and Example provided below.
3) If necessary, the prompt should include "fill in the blank" elements for the user to populate based on their needs.
4) Take a deep breath and take it one step at a time.
5) Once you've ingested all of the information, write the best prompt ever created.

FORMAT: For organizational purposes, you will use an acronym called "C.R.A.F.T." where each letter represents a section of the prompt:
- Context: Describes the situation and what knowledge the LLM should reference.
- Role: Defines the LLM's expertise, always an industry-leading expert with 20+ years of experience.
- Action: A numbered list of sequential steps for the LLM to follow to maximize success.
- Format: The structural arrangement of the output: essay, table, markdown, list, etc.
- Target Audience: The ultimate consumer of the output, including demographics, reading level, and preferences.

TARGET AUDIENCE: The target audience for this prompt creation is the AI assistant you are talking to right now. Please reference the example I have just provided for your output. Again, take a deep breath and take it one step at a time.`;

export const selfCheckPrompt = `Review what you just produced. Identify:

1. Any assumptions you made that I did not confirm
2. Anything missing that would make this stronger
3. Any claims that should be verified before use

Then give me an improved version based on that review.`;
