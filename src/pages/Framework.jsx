import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Target } from 'lucide-react';
import { frameworks, ultimatePrompt } from '../data/learn';
import { guideFor } from '../lib/guides';
import { BeforeAfter, Dialogue, NumberedSteps, UseCase, WhyItWorks } from '../components/usecase';
import { prompts } from '../data/prompts';
import { GuideCard, PromptCard } from '../components/cards';
import { BackLink, Callout, PageHeader, SectionTitle } from '../components/ui';
import PromptBuilder from '../components/PromptBuilder';
import NotFound from './NotFound';

export default function Framework() {
  const { slug } = useParams();
  const i = frameworks.findIndex((f) => f.slug === slug);
  if (i < 0) return <NotFound />;
  const f = frameworks[i];
  const prev = frameworks[i - 1];
  const next = frameworks[i + 1];
  const examples = prompts.filter((p) => p.framework === f.slug);
  const ex = f.example;
  const numbered = f.slug !== 'power';

  return (
    <>
      <PageHeader eyebrow={`Lesson ${i + 1} of ${frameworks.length}`} title={f.name} back={<BackLink to="/learn">All lessons</BackLink>}>
        <p>{f.intro}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"><Clock size={14} aria-hidden /> {f.minutes} minute read</p>
      </PageHeader>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 space-y-10">
          <div className="flex gap-3 rounded-2xl bg-navy p-5 text-white">
            <Target size={20} className="mt-0.5 shrink-0 text-orange" aria-hidden />
            <p className="text-sm leading-relaxed"><span className="font-heading font-semibold">Use it when: </span>{f.useWhen}</p>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold">{f.partsTitle}</h2>
            <ol className={`grid gap-3 ${f.parts.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {f.parts.map((p, n) => (
                <li key={p.key} className="card flex gap-4 p-4">
                  <span className="font-heading text-2xl leading-none font-bold text-orange">
                    {f.slug === 'craft' ? p.key[0] : numbered ? n + 1 : '•'}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-navy">{p.key}</p>
                    {p.quote && <p className="mt-1 text-sm text-navy/80 italic">“{p.quote}”</p>}
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {f.commands && (
            <section>
              <h2 className="mb-4 text-xl font-bold">Commands</h2>
              <div className="card divide-y divide-line/60">
                {f.commands.map((c) => (
                  <div key={c.cmd} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                    <code className="w-24 shrink-0 font-mono text-sm font-semibold text-blue">{c.cmd}</code>
                    <span className="text-sm text-muted">{c.desc}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <UseCase title={ex.title} scenario={ex.scenario}>
            {ex.before && <BeforeAfter before={ex.before} after={ex.after} />}
            {ex.dialogue && <Dialogue lines={ex.dialogue} />}
            {ex.steps && <NumberedSteps steps={ex.steps} />}
            <WhyItWorks items={ex.why} />
          </UseCase>

          <Callout title={f.insight.title}>{f.insight.body}</Callout>

          {f.extra === 'ultimate' && (
            <section>
              <SectionTitle title="The Ultimate Prompt">
                Let the AI write a full C.R.A.F.T. prompt for you. Send this, give it your topic, and it does the rest.
              </SectionTitle>
              <PromptBuilder id="ultimate-prompt" title="The Ultimate Prompt" template={ultimatePrompt} note="When it finishes, follow up with the Self-Check prompt in Power Moves." />
            </section>
          )}
          {examples.length > 0 && (
            <section>
              <SectionTitle title={f.slug === 'power' ? 'All the power moves' : `Prompts built with ${f.name}`}>
                Open any prompt to fill it in and send it.
              </SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                {examples.map((p) => <PromptCard key={p.id} prompt={p} />)}
              </div>
            </section>
          )}

          <nav className="flex flex-col gap-3 border-t border-line/60 pt-6 sm:flex-row sm:justify-between" aria-label="Lessons">
            {prev ? (
              <Link to={`/learn/${prev.slug}`} className="btn-ghost justify-start">
                <ArrowLeft size={16} aria-hidden /> {prev.name}
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/learn/${next.slug}`} className="btn-navy justify-end">
                Next: {next.name} <ArrowRight size={16} aria-hidden />
              </Link>
            ) : (
              <Link to="/agents" className="btn-primary justify-end">
                You’re ready: build an agent <ArrowRight size={16} aria-hidden />
              </Link>
            )}
          </nav>
        </div>

        <aside>
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow mb-3">Visual guide</p>
            <div className="max-w-[16rem]">
              <GuideCard guide={guideFor(f.slug, f.name)} caption="Select to view full size" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
