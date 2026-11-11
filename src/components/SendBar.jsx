import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { aiTargets, copyText, MAX_PREFILL } from '../lib/prompt';
import { useStore } from '../lib/store';
import { useToast } from '../lib/toast';

// Copy, or open the prompt in an AI tool. ChatGPT and Claude prefill; others copy and open.
export default function SendBar({ text, id, kind = 'prompt', title, compact = false }) {
  const [copied, setCopied] = useState(false);
  const { logUse } = useStore();
  const toast = useToast();
  const log = (action) => id && logUse({ id, kind, title, text, action });

  const onCopy = async () => {
    const ok = await copyText(text);
    if (!ok) return toast('Copy failed. Select the text and copy it manually.');
    setCopied(true);
    log('Copied');
    setTimeout(() => setCopied(false), 1800);
  };

  const onOpen = async (t) => {
    const prefill = t.prefill && text.length <= MAX_PREFILL;
    if (!prefill) {
      await copyText(text);
      toast(`Prompt copied. Paste it into ${t.label} when it opens.`);
    }
    log(`Opened in ${t.label}`);
    window.open(prefill ? t.url(text) : t.url(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onCopy} className={compact ? 'btn-ghost py-2' : 'btn-primary'} aria-live="polite">
        {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        {copied ? 'Copied' : 'Copy prompt'}
      </button>
      <span className="mx-1 hidden text-xs font-semibold text-muted sm:inline">or open in</span>
      {aiTargets.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onOpen(t)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 font-heading text-sm font-medium text-navy transition hover:border-blue hover:text-blue"
        >
          {t.label}
          <ExternalLink size={13} aria-hidden className="opacity-60" />
        </button>
      ))}
    </div>
  );
}
