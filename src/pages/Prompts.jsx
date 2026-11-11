import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { groups, prompts } from '../data/prompts';
import { PromptCard } from '../components/cards';
import { EmptyState, PageHeader, SectionTitle } from '../components/ui';
import { NumberedSteps, UseCase } from '../components/usecase';

const WALKTHROUGH = [
  { title: 'Pick a prompt', body: 'Maya needs to chase a vendor who missed a deadline, so she opens Professional Email.' },
  { title: 'Fill in four details', body: 'The situation, who it is going to, what she needs, and the tone. "Fill with example" shows what good answers look like.' },
  { title: 'Send it to her AI tool', body: 'One click opens ChatGPT or Claude with the prompt ready, or copies it for Gemini and Copilot.' },
  { title: 'Check before sending', body: 'She follows up with the Self-Check prompt, which catches a date she forgot to confirm.' },
];

export default function Prompts() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';

  const list = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return prompts;
    return prompts.filter((p) => {
      const hay = [p.title, p.summary, p.task, p.framework].join(' ').toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q]);

  const setQ = (v) => setParams(v ? { q: v } : {}, { replace: true });

  return (
    <>
      <PageHeader eyebrow="Prompts" title="Ready-made prompts for everyday work">
        A short, focused set that works in any role or industry. Open one, fill in your details, and send it to ChatGPT, Claude, Gemini, or Copilot.
      </PageHeader>

      <div className="container-page space-y-12 py-8">
        <UseCase title="From blank page to sent email in two minutes" scenario="Maya, a coordinator, needs to follow up with a vendor who missed a deadline.">
          <NumberedSteps steps={WALKTHROUGH} />
          <Link to="/prompts/professional-email" className="btn-navy">Try Professional Email</Link>
        </UseCase>

        <div>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter prompts, for example “email” or “meeting”"
            aria-label="Filter prompts by keyword"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-blue focus:ring-3 focus:ring-blue/15"
          />
          {q && (
            <p className="mt-2 text-sm text-muted" aria-live="polite">
              {list.length} of {prompts.length} prompts match
            </p>
          )}
        </div>

        {list.length === 0 && (
          <EmptyState icon={SearchX} title="No prompts match" action={<button type="button" onClick={() => setQ('')} className="btn-navy">Clear filter</button>}>
            Try another word, or start from a framework template.
          </EmptyState>
        )}

        {groups.map((g) => {
          const items = list.filter((p) => p.group === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key} id={g.key} className="scroll-mt-24">
              <SectionTitle title={g.title}>{g.blurb}</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => <PromptCard key={p.id} prompt={p} />)}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
