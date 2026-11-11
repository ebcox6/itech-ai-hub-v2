import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Bot, Download, Expand, X } from 'lucide-react';
import { frameworks } from '../data/learn';
import { FavoriteButton } from './ui';

const fwName = Object.fromEntries(frameworks.map((f) => [f.slug, f.name]));

export function PromptCard({ prompt: p }) {
  return (
    <Link
      to={`/prompts/${p.id}`}
      className="group card relative flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-[0_8px_24px_rgba(0,30,98,0.08)]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="chip bg-orange-soft text-[#b4541a]">{p.task}</span>
          {p.framework && p.group !== 'power' && <span className="chip bg-blue-soft text-blue">{fwName[p.framework]}</span>}
        </div>
        <FavoriteButton id={p.id} label={p.title} className="-mt-1.5 -mr-1.5" />
      </div>
      <h3 className="font-heading text-base leading-snug font-semibold text-navy group-hover:text-blue">{p.title}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">{p.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 font-heading text-sm font-semibold text-blue">
        Open prompt <ArrowUpRight size={15} aria-hidden />
      </span>
    </Link>
  );
}

export function AgentCard({ agent: a }) {
  return (
    <Link
      to={`/agents/${a.id}`}
      className="group card flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-[0_8px_24px_rgba(0,30,98,0.08)]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
          <Bot size={20} aria-hidden />
        </span>
        <FavoriteButton id={`agent:${a.id}`} label={a.title} className="-mt-1 -mr-1.5" />
      </div>
      <h3 className="font-heading text-base font-semibold text-navy group-hover:text-blue">{a.title}</h3>
      <p className="text-xs font-semibold text-orange">{a.focus}</p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{a.summary}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="font-heading text-sm font-semibold text-blue">Use this agent</span>
        <ArrowUpRight size={18} className="text-muted transition group-hover:text-blue" aria-hidden />
      </div>
    </Link>
  );
}

// Infographic thumbnail that opens a full-size viewer.
export function GuideCard({ guide, caption }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group card block w-full overflow-hidden text-left transition hover:shadow-[0_8px_24px_rgba(0,30,98,0.10)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
          <img src={guide.thumb} alt="" loading="lazy" className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]" />
          <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy shadow">
            <Expand size={13} aria-hidden /> View
          </span>
        </div>
        <div className="p-4">
          <p className="font-heading text-sm font-semibold text-navy">{guide.title}</p>
          {caption && <p className="mt-0.5 text-xs text-muted">{caption}</p>}
        </div>
      </button>
      <a href={guide.pdf} download className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:underline">
        <Download size={13} aria-hidden /> Download printable PDF
      </a>
      <Lightbox open={open} onClose={() => setOpen(false)} guide={guide} />
    </>
  );
}

function Lightbox({ open, onClose, guide }) {
  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = prev; };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-navy-deep/85 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={guide.title}
        >
          <button type="button" onClick={onClose} className="fixed top-4 right-4 z-10 rounded-full bg-white p-2 text-navy shadow-lg" aria-label="Close">
            <X size={20} />
          </button>
          <img src={guide.src} alt={guide.title} className="mx-auto w-full max-w-3xl rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
