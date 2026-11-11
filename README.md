# i-Tech Academy AI Hub (v2)

A training hub for working smarter with AI. People learn five prompting frameworks, fill in proven prompts, send them straight to ChatGPT, Claude, Gemini, or Copilot, and build role-specific AI agents.

This is a redesign of [itech-ai-hub](https://github.com/ebcox6/itech-ai-hub) with a new structure, content model, and navigation.

## What's inside

| Area | Path | What it does |
| --- | --- | --- |
| Home | `/` | Pick your team (MSP, ERP, Business & Education), see the Learn, Use, Build path and featured prompts |
| Learn | `/learn`, `/learn/:slug` | Five lessons in order: Anatomy, C.R.A.F.T., Socratic, Professor Synapse, Power Moves. Each has a visual guide and its prompts |
| Prompts | `/prompts`, `/prompts/:id` | 41 prompts in one library, filterable by team, task, and framework. Each has its own shareable page with a form, live preview, and send buttons |
| Agents | `/agents`, `/agents/:id` | Write, Install, Test, Improve. Universal Starter plus six role agents, each with its own test scenario |
| My Kit | `/my-kit` | Saved prompts and agents, plus the last 15 prompts copied or sent |

Search everything with **Ctrl K** (or **/**). The team choice filters prompts and agents across the whole hub.

Old v1 links (`/craft`, `/library`, `/favorites` and so on) redirect to their new pages.

Saved items, history, and the team choice are stored in the visitor's browser only. Nothing is sent to a server.

## Editing content

All content lives in plain data files, so most updates need no component changes.

| File | Holds |
| --- | --- |
| `src/config/site.js` | Org name, intro copy, contact email, and the three audiences |
| `src/data/prompts.js` | Every prompt. Fields use `{key}` placeholders in the template |
| `src/data/learn.js` | The five lessons, the Ultimate Prompt, the Self-Check prompt, and the infographics |
| `src/data/agents.js` | Universal Starter, role agents, install steps, and the agent test |

To add a prompt, copy an existing entry in `prompts.js`, give it a unique `id`, and set `audiences` to any of `msp`, `erp`, `business`.

House style: US English and no em dashes.

## Development

```bash
npm install
npm run dev
```

`npm run build` writes to `dist/` and copies `index.html` to `404.html`, so deep links work on GitHub Pages.

## Deploying

**GitHub Pages:** pushing to `main` runs `.github/workflows/deploy.yml`. In the repo settings, go to Pages and set Source to **GitHub Actions**. The workflow sets the base path from the repo name, so a rename needs no code change.

**Vercel:** `vercel --prod` from the project root. `vercel.json` handles routing.

## Stack

React 19, Vite 8, Tailwind CSS 4, Framer Motion, React Router 7, Lucide icons. Fonts are Poppins (headings) and Nunito (body). Brand colors are Navy `#001e62`, Carrot Orange `#ef7225`, and Dodger Blue `#006cff`.
