import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { fillTemplate, tokenize } from '../lib/prompt';
import SendBar from './SendBar';

// Form on the left, live preview on the right. Filled values are highlighted in the preview
// so people can see exactly where their words land before sending.
export default function PromptBuilder({ id, kind = 'prompt', title, template, fields = [], note }) {
  const [values, setValues] = useState({});
  const tokens = useMemo(() => tokenize(template, fields), [template, fields]);
  const text = useMemo(() => fillTemplate(template, fields, values), [template, fields, values]);
  const filled = fields.filter((f) => (values[f.key] || '').trim()).length;
  const set = (key, v) => setValues((s) => ({ ...s, [key]: v }));

  const preview = (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line/70 px-4 py-3 sm:px-5">
        <p className="font-heading text-sm font-semibold text-navy">{fields.length ? 'Your prompt' : 'The prompt'}</p>
        {fields.length > 0 && (
          <span className={`chip ${filled === fields.length ? 'bg-green-50 text-green-700' : 'bg-surface text-muted'}`}>
            {filled}/{fields.length} filled
          </span>
        )}
      </div>
      <div className="prose-prompt max-h-[28rem] overflow-y-auto bg-surface/60 px-4 py-4 text-ink sm:px-5">
        {tokens.map((t, i) => {
          if (t.type === 'text') return <span key={i}>{t.value}</span>;
          const f = fields.find((x) => x.key === t.key);
          const v = (values[t.key] || '').trim();
          return v ? (
            <mark key={i} className="rounded bg-orange-soft px-0.5 text-ink">{v}</mark>
          ) : (
            <span key={i} className="rounded bg-blue-soft px-1 text-blue">[{f.label.toLowerCase()}]</span>
          );
        })}
      </div>
      <div className="border-t border-line/70 px-4 py-4 sm:px-5">
        <SendBar text={text} id={id} kind={kind} title={title} />
        {note && <p className="mt-3 text-xs text-muted">{note}</p>}
      </div>
    </div>
  );

  if (!fields.length) return preview;

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <form className="card p-4 sm:p-5" onSubmit={(e) => e.preventDefault()} aria-label="Fill in the prompt">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-heading text-sm font-semibold text-navy">Fill in the details</p>
          {filled > 0 && (
            <button type="button" onClick={() => setValues({})} className="flex items-center gap-1 text-xs font-semibold text-muted hover:text-navy">
              <RotateCcw size={13} aria-hidden /> Clear
            </button>
          )}
        </div>
        <div className="space-y-4">
          {fields.map((f) => {
            const fid = `${id}-${f.key}`;
            const common = {
              id: fid,
              placeholder: f.hint,
              value: values[f.key] || '',
              onChange: (e) => set(f.key, e.target.value),
              className:
                'w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-blue focus:ring-3 focus:ring-blue/15',
            };
            return (
              <div key={f.key}>
                <label htmlFor={fid} className="mb-1.5 block text-sm font-semibold text-ink">{f.label}</label>
                {f.long ? <textarea rows={3} {...common} className={`${common.className} resize-y`} /> : <input type="text" {...common} />}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Leave a field blank and it stays as a [bracket] so you can finish it in the chat.
        </p>
      </form>
      <div className="lg:sticky lg:top-20">{preview}</div>
    </div>
  );
}
