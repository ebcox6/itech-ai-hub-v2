import { Link, useParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { prompts } from '../data/prompts';
import { frameworks } from '../data/learn';
import PromptBuilder from '../components/PromptBuilder';
import { PromptCard } from '../components/cards';
import { BackLink, Callout, FavoriteButton, PageHeader, SectionTitle } from '../components/ui';
import { UseCase } from '../components/usecase';
import NotFound from './NotFound';

export default function PromptDetail() {
  const { id } = useParams();
  const p = prompts.find((x) => x.id === id);
  if (!p) return <NotFound />;
  const fw = frameworks.find((f) => f.slug === p.framework);
  const related = prompts
    .filter((x) => x.id !== p.id)
    .map((x) => ({ x, score: (x.group === p.group ? 2 : 0) + (x.task === p.task ? 2 : 0) + (x.framework === p.framework ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.x);

  return (
    <>
      <PageHeader
        key={p.id}
        eyebrow={p.task}
        title={p.title}
        back={<BackLink to="/prompts">All prompts</BackLink>}
        actions={<FavoriteButton id={p.id} label={p.title} className="h-11 w-11 border border-line" />}
      >
        <p>{p.summary}</p>
        {fw && (
          <Link to={`/learn/${fw.slug}`} className="chip mt-4 bg-blue-soft text-blue hover:underline">
            {p.group === 'power' ? 'Part of Power Moves' : `Built with ${fw.name}`}
          </Link>
        )}
      </PageHeader>

      <div className="container-page space-y-10 py-8">
        <PromptBuilder key={p.id} id={p.id} title={p.title} template={p.template} fields={p.fields} example={p.example?.values} />

        {p.example && p.fields.length > 0 && (
          <UseCase title="See it filled in" scenario={p.example.scenario}>
            <dl className="grid gap-3 sm:grid-cols-2">
              {p.fields.map((f) => (
                <div key={f.key} className="rounded-xl bg-surface px-4 py-3">
                  <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{f.label}</dt>
                  <dd className="mt-1 text-sm text-ink">{p.example.values[f.key]}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-muted">Select <span className="font-semibold text-blue">Fill with example</span> above to load these answers, then make them your own.</p>
          </UseCase>
        )}

        {p.id !== 'self-check' && (
          <Callout icon={ShieldCheck} title="Before you use the result">
            Follow up with the <Link to="/prompts/self-check" className="font-semibold text-blue hover:underline">Self-Check prompt</Link>.
            The AI will flag its assumptions, gaps, and claims to verify, then give you an improved version.
          </Callout>
        )}

        <section>
          <SectionTitle title="Related prompts" />
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((r) => <PromptCard key={r.id} prompt={r} />)}
          </div>
        </section>
      </div>
    </>
  );
}
