import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Users } from 'lucide-react';
import { audiences } from '../config/site';
import { useStore } from '../lib/store';

// Header control for "which team am I on". Filters prompts and agents across the hub.
export default function AudienceSwitcher() {
  const { audience, setAudience } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = audiences.find((a) => a.key === audience);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  const options = [{ key: null, label: 'All teams', description: 'Show everything in the hub.' }, ...audiences];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-xl bg-orange px-3 font-heading text-sm font-semibold text-white transition hover:bg-[#d9621a]"
      >
        <Users size={16} aria-hidden />
        <span className="max-w-[7.5rem] truncate">{current ? current.short : 'All teams'}</span>
        <ChevronDown size={14} aria-hidden className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Choose your team"
          className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-ink shadow-xl"
        >
          <p className="px-3 pt-2 pb-1 text-xs font-semibold text-muted">Show prompts and agents for</p>
          {options.map((o) => {
            const active = o.key === audience;
            return (
              <button
                key={o.key ?? 'all'}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => { setAudience(o.key); setOpen(false); }}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface ${active ? 'bg-navy-soft/60' : ''}`}
              >
                <span className="mt-0.5 w-4 shrink-0 text-orange">{active && <Check size={16} />}</span>
                <span>
                  <span className="block font-heading text-sm font-semibold text-navy">{o.label}</span>
                  <span className="block text-xs leading-snug text-muted">{o.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
