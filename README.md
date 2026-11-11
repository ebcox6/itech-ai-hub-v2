# i-Tech Academy AI Hub (v2)

A training hub for working smarter with AI. People learn five prompting frameworks, fill in proven prompts, send them straight to ChatGPT, Claude, Gemini, or Copilot, and build AI agents that already know their job. Written to work in any industry.

This is a redesign of [itech-ai-hub](https://github.com/ebcox6/itech-ai-hub) with a new structure, content model, and navigation.

## What's inside

The hub is written to work in any industry or role.

| Area | Path | What it does |
| --- | --- | --- |
| Home | `/` | A before-and-after use case, the Learn, Use, Build path, and three starter prompts |
| Learn | `/learn`, `/learn/:slug` | Five lessons in order: Anatomy, C.R.A.F.T., Socratic, Professor Synapse, Power Moves. Each has a worked use case, its prompts, and a printable guide |
| Prompts | `/prompts`, `/prompts/:id` | 17 prompts in three groups: everyday prompts, framework templates, and power moves. Each page has a form, live preview, send buttons, and a "Fill with example" use case |
| Agents | `/agents`, `/agents/:id` | Write, Install, Test, Improve. A general Agent Builder plus three starter agents (Writing, Meetings & Projects, Research & Decisions), with a walkthrough example |
| My Kit | `/my-kit` | Saved prompts and agents, plus the last 15 prompts copied or sent |

Search everything with **Ctrl K** (or **/**). Old links (`/craft`, `/library`, the earlier role agents, and so on) redirect to their new pages.

Saved items and history are stored in the visitor's browser only. Nothing is sent to a server.

## Editing content

All content lives in plain data files, so most updates need no component changes.

| File | Holds |
| --- | --- |
| `src/config/site.js` | Org name, intro copy, contact email, the "Updated" date on the guides, and `primaryAI` (the default tool every prompt is copied into, currently UnifiedAI) |
| `src/data/learn.js` | The five lessons, their use cases, and the fill-in block printed on each infographic |
| `src/data/prompts.js` | Every prompt. Fields use `{key}` placeholders, and `example.values` powers "Fill with example" |
| `src/data/agents.js` | Agent Builder, starter agents, install steps, and the agent test |

House style: US English and no em dashes.

## Infographics

The five guides in `public/guides/` (PNG, thumbnail, and PDF) are generated from `src/data/learn.js`, so they always match the lessons. After editing a lesson, regenerate them:

```bash
npm i -D playwright
npx playwright install chromium
npm run guides
```

Then commit the updated files in `public/guides/`.

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
