import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Lightbulb } from 'lucide-react';
import { useStore } from '../lib/store';

export function PageHeader({ eyebrow, title, children, actions, back }) {
  return (
    <div className="border-b border-line/60 bg-white">
      <div className="container-page py-8 sm:py-10">
        {back}
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-[1.75rem] leading-tight font-bold sm:text-4xl">{title}</h1>
            {children && <div className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{children}</div>}
          </div>
          {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

export function BackLink({ to, children }) {
  return (
    <Link to={to} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline">
      <ArrowRight size={14} className="rotate-180" aria-hidden /> {children}
    </Link>
  );
}

export function SectionTitle({ eyebrow, title, children, id, action }) {
  return (
    <div id={id} className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        {children && <p className="mt-1.5 max-w-2xl text-muted">{children}</p>}
      </div>
      {action}
    </div>
  );
}

export function Callout({ title, children, icon: Icon = Lightbulb }) {
  return (
    <div className="flex gap-3 rounded-2xl border-l-4 border-orange bg-orange-soft px-4 py-4 sm:px-5">
      <Icon size={20} className="mt-0.5 shrink-0 text-orange" aria-hidden />
      <div className="text-sm leading-relaxed text-ink">
        {title && <p className="mb-0.5 font-heading font-semibold text-navy">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export function FavoriteButton({ id, label, className = '' }) {
  const { isFavorite, toggleFavorite } = useStore();
  const on = isFavorite(id);
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(id); }}
      aria-pressed={on}
      aria-label={on ? `Remove ${label} from My Kit` : `Save ${label} to My Kit`}
      title={on ? 'Saved to My Kit' : 'Save to My Kit'}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
        on ? 'bg-orange-soft text-orange' : 'text-muted hover:bg-surface hover:text-orange'
      } ${className}`}
    >
      <Heart size={18} fill={on ? 'currentColor' : 'none'} aria-hidden />
    </button>
  );
}

export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      {Icon && <Icon size={28} className="mb-3 text-orange" aria-hidden />}
      <p className="font-heading text-lg font-semibold text-navy">{title}</p>
      {children && <p className="mt-1 max-w-md text-sm text-muted">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
