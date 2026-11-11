// Fill {key} placeholders. Unfilled fields fall back to a readable [label] marker.
export function fillTemplate(template, fields = [], values = {}) {
  return fields.reduce((text, f) => {
    const v = (values[f.key] || '').trim();
    return text.split(`{${f.key}}`).join(v || `[${f.label.toLowerCase()}]`);
  }, template);
}

// Split a template into text and field tokens for the highlighted live preview.
export function tokenize(template, fields = []) {
  if (!fields.length) return [{ type: 'text', value: template }];
  const keys = fields.map((f) => f.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`\\{(${keys.join('|')})\\}`, 'g');
  const out = [];
  let last = 0;
  for (const m of template.matchAll(re)) {
    if (m.index > last) out.push({ type: 'text', value: template.slice(last, m.index) });
    out.push({ type: 'field', key: m[1] });
    last = m.index + m[0].length;
  }
  if (last < template.length) out.push({ type: 'text', value: template.slice(last) });
  return out;
}

// ChatGPT and Claude accept a prefilled prompt in the URL. Gemini and Copilot do not,
// so we copy first and open the app for the user to paste.
export const aiTargets = [
  { key: 'chatgpt', label: 'ChatGPT', url: (t) => `https://chatgpt.com/?q=${encodeURIComponent(t)}`, prefill: true },
  { key: 'claude', label: 'Claude', url: (t) => `https://claude.ai/new?q=${encodeURIComponent(t)}`, prefill: true },
  { key: 'gemini', label: 'Gemini', url: () => 'https://gemini.google.com/app', prefill: false },
  { key: 'copilot', label: 'Copilot', url: () => 'https://copilot.microsoft.com', prefill: false },
];

// Very long prompts can exceed URL limits. Fall back to copy and paste.
export const MAX_PREFILL = 6000;

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}
