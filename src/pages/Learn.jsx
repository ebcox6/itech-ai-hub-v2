import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { frameworks } from '../data/learn';
import { guideFor } from '../lib/guides';
import { prompts } from '../data/prompts';
import { GuideCard } from '../components/cards';
import { PageHeader, SectionTitle } from '../components/ui';

export default function Learn() {
  const total = frameworks.reduce((s, f) => s + f.minutes, 0);
  return (
    <>
      <PageHeader eyebrow="Learn" title="Prompting, one framework at a time">
        Five short lessons that build on each other. About {total} minutes end to end. Every lesson includes a real use case, ready-to-use prompts, and a printable guide.
      </PageHeader>

      <section className="container-page py-10">
        <ol className="space-y-3">
          {frameworks.map((f, i) => {
            const count = prompts.filter((p) => p.framework === f.slug).length;
            return (
              <li key={f.slug}>
                <Link
                  to={`/learn/${f.slug}`}
                  className="group card flex items-center gap-4 p-4 transition hover:border-navy/30 hover:shadow-[0_8px_24px_rgba(0,30,98,0.06)] sm:gap-6 sm:p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy font-heading text-lg font-bold text-white sm:h-14 sm:w-14 sm:text-xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-lg font-semibold text-navy group-hover:text-blue">{f.name}</span>
                    <span className="block text-sm text-muted">{f.tagline}</span>
                    <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted">
                      <span className="inline-flex items-center gap-1"><Clock size={13} aria-hidden /> {f.minutes} min</span>
                      <span>Use case: {f.example.title}</span>
                      {count > 0 && <span>{count} {count === 1 ? 'prompt' : 'prompts'}</span>}
                    </span>
                  </span>
                  <ArrowRight size={20} className="hidden shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-blue sm:block" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-t border-line/60 bg-white">
        <div className="container-page py-12">
          <SectionTitle id="guides" eyebrow="Visual guides" title="Print them, share them, pin them up">
            One-page infographics for each framework. Select a guide to view it full size, or download the PDF to print.
          </SectionTitle>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {frameworks.map((f) => <div key={f.slug}><GuideCard guide={guideFor(f.slug, f.name)} /></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
