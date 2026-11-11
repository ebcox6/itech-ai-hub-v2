import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { site } from '../config/site';
import { aiTargets, copyText, MAX_PREFILL } from '../lib/prompt';
import { useStore } from '../lib/store';
import { useToast } from '../lib/toast';

const primary = site.primaryAI;

// Default action: copy the prompt for the organization's primary AI tool (UnifiedAI),
// and open it if a URL is configured. Other tools are offered as secondary options.
export default function SendBar({ text, id, kind = 'prompt', title }) {
  const [copied, setCopied] = useState(false);
  const { logUse } = useStore();
  const toast = useToast();
  const log = (action) => id && logUse({ id, kind, title, text, action });

  const onPrimary = async () => {
    const ok = await copyText(text);
    if (!ok) return toast('Copy failed. Select the text and copy it manually.');
    setCopied(true);
    log(`Copied for ${primary.name}`);
    toast(`Copied. Paste it into ${primary.name}.`);
    if (primary.url) window.open(primary.url, '_blank', 'noopener,noreferrer');
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
    <div className="space-y-3">
      <button type="button" onClick={onPrimary} className="btn-primary w-full py-3 text-base sm:w-auto sm:px-6">
        {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
        {copied ? `Copied for ${primary.name}` : `Copy prompt into ${primary.name}`}
        {primary.url && !copied && <ExternalLink size={15} aria-hidden className="opacity-80" />}
      </button>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        <span className="mr-1 text-xs font-semibold text-muted">Or open in</span>
        {aiTargets.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onOpen(t)}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-heading text-sm font-medium text-navy transition hover:bg-surface hover:text-blue"
          >
            {t.label}
            <ExternalLink size={12} aria-hidden className="opacity-50" />
          </button>
        ))}
      </div>
    </div>
  );
}
