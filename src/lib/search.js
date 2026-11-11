import { prompts } from '../data/prompts';
import { agents } from '../data/agents';
import { frameworks } from '../data/learn';

// One flat index for the command palette. Small enough to search in memory on every keystroke.
const index = [
  ...frameworks.map((f) => ({
    kind: 'Learn', id: `learn-${f.slug}`, title: f.name, sub: f.tagline, to: `/learn/${f.slug}`,
    text: [f.name, f.tagline, f.intro, ...f.parts.map((p) => p.key)].join(' '),
  })),
  ...prompts.map((p) => ({
    kind: 'Prompt', id: p.id, title: p.title, sub: p.subtitle || p.summary, to: `/prompts/${p.id}`,
    text: [p.title, p.subtitle, p.summary, p.role, p.task, p.framework].join(' '),
  })),
  ...agents.map((a) => ({
    kind: 'Agent', id: a.id, title: a.title, sub: a.summary, to: `/agents/${a.id}`,
    text: [a.title, a.role, a.summary].join(' '),
  })),
].map((r) => ({ ...r, hay: r.text.toLowerCase(), titleLc: r.title.toLowerCase() }));

export function search(query, limit = 12) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return index
    .map((r) => {
      if (!terms.every((t) => r.hay.includes(t))) return null;
      const score = terms.reduce((s, t) => s + (r.titleLc.startsWith(t) ? 6 : r.titleLc.includes(t) ? 3 : 1), 0);
      return { ...r, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
