import { Link, useParams } from 'react-router-dom';
import { ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { prompts } from '../data/prompts';
import { frameworks } from '../data/learn';
import PromptBuilder from '../components/PromptBuilder';
import { PromptCard } from '../components/cards';
import { AudienceChips, BackLink, Callout, FavoriteButton, PageHeader, SectionTitle } from '../components/ui';
import NotFound from './NotFound';

export default function PromptDetail() {
  const { id } = useParams();
  const p = prompts.find((x) => x.id === id);
  if (!p) return <NotFound />;
  const fw = frameworks.find((f) => f.slug === p.framework);
  const related = prompts
    .filter((x) => x.id !== p.id)
    .map((x) => ({ x, score: (x.task === p.task ? 2 : 0) + (x.audiences.some((a) => p.audiences.includes(a)) ? 1 : 0) + (x.framework === p.framework ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.x);

  return (
    <>
      <PageHeader
        key={p.id}
        eyebrow={p.task}
        title={p.title}
        back={<BackLink to="/prompts">Prompt library</BackLink>}
        actions={<FavoriteButton id={p.id} label={p.title} className="h-11 w-11 border border-line" />}
      >
        {p.subtitle && <p className="font-semibold text-navy">{p.subtitle}</p>}
        <p className={p.subtitle ? 'mt-1' : ''}>{p.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
          <AudienceChips keys={p.audiences} />
          {p.role !== 'Any role' && <span className="chip bg-surface text-muted">{p.role}</span>}
          {fw && (
            <Link to={`/learn/${fw.slug}`} className="chip bg-blue-soft text-blue hover:underline">
              Built with {fw.name}
            </Link>
          )}
        </div>
      </PageHeader>

      <div className="container-page space-y-10 py-8">
        <PromptBuilder key={p.id} id={p.id} title={p.title} template={p.template} fields={p.fields} />

        {p.tailorFor && (
          <section className="card p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <SlidersHorizontal size={18} className="text-orange" aria-hidden /> Tailor it for your situation
            </h2>
            <p className="mb-3 text-sm text-muted">Add a line to the prompt that says which of these fits your case:</p>
            <ul className="grid gap-2 sm:grid-cols-3">
              {p.tailorFor.map((t) => (
                <li key={t} className="rounded-xl bg-surface px-3 py-2.5 text-sm text-ink">{t}</li>
              ))}
            </ul>
          </section>
        )}

        {p.id !== 'adv-selfcheck' && (
          <Callout icon={ShieldCheck} title="Before you send the result anywhere">
            Follow up with the <Link to="/prompts/adv-selfcheck" className="font-semibold text-blue hover:underline">Self-Check prompt</Link>.
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
