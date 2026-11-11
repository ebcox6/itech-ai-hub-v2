import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Bot, CornerDownLeft, Library, Search, X } from 'lucide-react';
import { search } from '../lib/search';

const KIND_ICON = { Learn: BookOpen, Prompt: Library, Agent: Bot };
const SUGGESTIONS = ['QBR', 'status report', 'escalation', 'meeting', 'C.R.A.F.T.', 'self-check'];

export default function CommandSearch({ open, onClose: close }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = useMemo(() => search(q), [q]);
  // Reset on close so the next open starts clean.
  const onClose = () => { close(); setQ(''); setActive(0); };

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(t); document.body.style.overflow = prev; };
  }, [open]);

  const go = (r) => { onClose(); navigate(r.to); };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && results[active]) go(results[active]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-navy-deep/60 px-4 pt-[10vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the hub"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setActive(0); }}
                onKeyDown={onKeyDown}
                placeholder="Search prompts, agents, and frameworks"
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted/70"
                aria-label="Search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
              />
              <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-surface" aria-label="Close search">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2" id="search-results" role="listbox">
              {!q && (
                <div className="p-3">
                  <p className="mb-2 text-xs font-semibold text-muted">Try</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" onClick={() => setQ(s)} className="chip bg-surface py-1 text-navy hover:bg-navy-soft">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {q && results.length === 0 && <p className="p-6 text-center text-sm text-muted">No matches for “{q}”.</p>}
              {results.map((r, i) => {
                const Icon = KIND_ICON[r.kind];
                return (
                  <button
                    key={r.kind + r.id}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${i === active ? 'bg-navy-soft/70' : ''}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-navy">
                      <Icon size={17} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-heading text-sm font-semibold text-navy">{r.title}</span>
                      <span className="block truncate text-xs text-muted">{r.sub}</span>
                    </span>
                    <span className="chip bg-surface text-muted">{r.kind}</span>
                    {i === active && <CornerDownLeft size={14} className="hidden text-muted sm:block" aria-hidden />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
