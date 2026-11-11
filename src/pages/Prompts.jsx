import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX, X } from 'lucide-react';
import { audiences } from '../config/site';
import { prompts } from '../data/prompts';
import { frameworks } from '../data/learn';
import { useStore } from '../lib/store';
import { PromptCard } from '../components/cards';
import { EmptyState, PageHeader } from '../components/ui';

const TASKS = [...new Set(prompts.map((p) => p.task))].sort();

function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition ${
        on ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-navy/40'
      }`}
    >
      {children}
    </button>
  );
}

export default function Prompts() {
  const { audience, setAudience } = useStore();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const task = params.get('task') || '';
  const fw = params.get('framework') || '';

  const update = (key, val) => {
    const next = new URLSearchParams(params);
    if (val) next.set(key, val); else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return prompts.filter((p) => {
      if (audience && !p.audiences.includes(audience)) return false;
      if (task && p.task !== task) return false;
      if (fw && p.framework !== fw) return false;
      if (terms.length) {
        const hay = [p.title, p.subtitle, p.summary, p.role, p.task].join(' ').toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [audience, task, fw, q]);

  const filtersOn = Boolean(audience || task || fw || q);
  const clearAll = () => { setAudience(null); setParams({}, { replace: true }); };

  return (
    <>
      <PageHeader eyebrow="Prompt library" title="Find a prompt, fill it in, send it">
        Every prompt opens in a builder: type your details, preview the result, and send it to ChatGPT, Claude, Gemini, or Copilot.
      </PageHeader>

      <div className="container-page py-8">
        <div className="card mb-6 space-y-4 p-4 sm:p-5">
          <input
            type="search"
            value={q}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Filter by keyword, for example “status” or “client email”"
            aria-label="Filter prompts by keyword"
            className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white focus:ring-3 focus:ring-blue/15"
          />
          <FilterRow label="Team">
            <Chip on={!audience} onClick={() => setAudience(null)}>All teams</Chip>
            {audiences.map((a) => (
              <Chip key={a.key} on={audience === a.key} onClick={() => setAudience(audience === a.key ? null : a.key)}>{a.label}</Chip>
            ))}
          </FilterRow>
          <FilterRow label="Task">
            <Chip on={!task} onClick={() => update('task', '')}>Any task</Chip>
            {TASKS.map((t) => <Chip key={t} on={task === t} onClick={() => update('task', task === t ? '' : t)}>{t}</Chip>)}
          </FilterRow>
          <FilterRow label="Framework">
            <Chip on={!fw} onClick={() => update('framework', '')}>Any</Chip>
            {frameworks.map((f) => <Chip key={f.slug} on={fw === f.slug} onClick={() => update('framework', fw === f.slug ? '' : f.slug)}>{f.name}</Chip>)}
          </FilterRow>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            Showing <span className="font-semibold text-ink">{list.length}</span> of {prompts.length} prompts
          </p>
          {filtersOn && (
            <button type="button" onClick={clearAll} className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline">
              <X size={14} aria-hidden /> Clear filters
            </button>
          )}
        </div>

        {list.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <PromptCard key={p.id} prompt={p} />)}
          </div>
        ) : (
          <EmptyState icon={SearchX} title="No prompts match those filters" action={<button type="button" onClick={clearAll} className="btn-navy">Clear filters</button>}>
            Try a different keyword, or widen the team or task.
          </EmptyState>
        )}
      </div>
    </>
  );
}

// Chips scroll sideways on small screens instead of wrapping into a tall block.
function FilterRow({ label, children }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-20 shrink-0 text-xs font-semibold tracking-wide text-muted uppercase">{label}</span>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {children}
      </div>
    </div>
  );
}
