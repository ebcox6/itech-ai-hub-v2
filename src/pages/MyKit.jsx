import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, Copy, Heart, Trash2 } from 'lucide-react';
import { prompts } from '../data/prompts';
import { agents } from '../data/agents';
import { useStore } from '../lib/store';
import { copyText } from '../lib/prompt';
import { useToast } from '../lib/toast';
import { AgentCard, PromptCard } from '../components/cards';
import { EmptyState, PageHeader, SectionTitle } from '../components/ui';

function timeAgo(t) {
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function MyKit() {
  const { favorites, history, clearHistory } = useStore();
  const favPrompts = favorites.map((id) => prompts.find((p) => p.id === id)).filter(Boolean);
  const favAgents = favorites.filter((f) => f.startsWith('agent:')).map((f) => agents.find((a) => a.id === f.slice(6))).filter(Boolean);
  const none = !favPrompts.length && !favAgents.length;

  return (
    <>
      <PageHeader eyebrow="My Kit" title="Your saved prompts and recent work">
        Saved items and history stay in this browser only. Nothing is sent anywhere.
      </PageHeader>

      <div className="container-page space-y-14 py-10">
        <section>
          <SectionTitle title="Saved" />
          {none ? (
            <EmptyState icon={Heart} title="Nothing saved yet" action={<Link to="/prompts" className="btn-navy">Browse prompts</Link>}>
              Tap the heart on any prompt or agent to keep it here.
            </EmptyState>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favPrompts.map((p) => <PromptCard key={p.id} prompt={p} />)}
              {favAgents.map((a) => <AgentCard key={a.id} agent={a} />)}
            </div>
          )}
        </section>

        <section>
          <SectionTitle
            title="Recent"
            action={history.length > 0 && (
              <button type="button" onClick={clearHistory} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-red-600">
                <Trash2 size={15} aria-hidden /> Clear history
              </button>
            )}
          >
            The last {15} prompts you copied or sent, exactly as you filled them in.
          </SectionTitle>
          {history.length ? (
            <ul className="space-y-3">{history.map((h) => <HistoryItem key={h.at} item={h} />)}</ul>
          ) : (
            <EmptyState icon={Clock} title="No history yet">Copy or send a prompt and it will appear here.</EmptyState>
          )}
        </section>
      </div>
    </>
  );
}

function HistoryItem({ item }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const href = item.kind === 'prompt' && prompts.some((p) => p.id === item.id) ? `/prompts/${item.id}` : null;
  const onCopy = async () => {
    if (!(await copyText(item.text))) return toast('Copy failed.');
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <li className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {href ? (
            <Link to={href} className="font-heading font-semibold text-navy hover:text-blue">{item.title}</Link>
          ) : (
            <p className="font-heading font-semibold text-navy">{item.title}</p>
          )}
          <p className="text-xs text-muted">{item.action} · {timeAgo(item.at)}</p>
        </div>
        <button type="button" onClick={onCopy} className="btn-ghost py-2">
          {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />} {copied ? 'Copied' : 'Copy again'}
        </button>
      </div>
      <p className="prose-prompt mt-3 line-clamp-3 rounded-xl bg-surface px-3 py-2.5 text-muted">{item.text}</p>
    </li>
  );
}
