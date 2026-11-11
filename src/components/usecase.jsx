import { ArrowDown, CheckCircle2, X } from 'lucide-react';

// Shared frame for every "Use case example" block across Learn, Prompts, and Agents.
export function UseCase({ title, scenario, children, id = 'use-case' }) {
  return (
    <section id={id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-navy/15 bg-white">
      <div className="bg-navy px-5 py-4 text-white sm:px-6">
        <p className="eyebrow mb-1">Use case example</p>
        <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
        {scenario && <p className="mt-1 text-sm leading-relaxed text-white/75">{scenario}</p>}
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </section>
  );
}

export function BeforeAfter({ before, after }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wide text-red-700 uppercase">
          <X size={14} aria-hidden /> Before: a typical prompt
        </p>
        <p className="prose-prompt text-ink">{before}</p>
      </div>
      <div className="flex justify-center text-muted" aria-hidden><ArrowDown size={18} /></div>
      <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wide text-green-700 uppercase">
          <CheckCircle2 size={14} aria-hidden /> After: with the framework
        </p>
        <p className="prose-prompt text-ink">{after}</p>
      </div>
    </div>
  );
}

export function WhyItWorks({ items }) {
  return (
    <div>
      <p className="mb-2 font-heading text-sm font-semibold text-navy">Why it works</p>
      <ul className="space-y-2">
        {items.map((w) => (
          <li key={w} className="flex gap-2 text-sm leading-relaxed">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange" aria-hidden />
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

// A short illustrative conversation (used for Professor Synapse).
export function Dialogue({ lines }) {
  return (
    <div className="space-y-2.5">
      {lines.map((l, i) => {
        const you = l.who === 'You';
        return (
          <div key={i} className={`flex ${you ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${you ? 'bg-blue text-white' : 'bg-surface text-ink'}`}>
              <p className={`mb-0.5 text-[11px] font-bold tracking-wide uppercase ${you ? 'text-white/70' : 'text-orange'}`}>{l.who}</p>
              {l.text}
            </div>
          </div>
        );
      })}
      <p className="text-xs text-muted">Illustrative conversation. Actual wording will vary.</p>
    </div>
  );
}

export function NumberedSteps({ steps }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={s.title || s.move} className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-xs font-bold text-white">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-semibold text-navy">{s.title || s.move}</p>
            {s.body && <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.body}</p>}
            {s.prompt && <p className="prose-prompt mt-1.5 rounded-lg bg-surface px-3 py-2 text-ink">{s.prompt}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
