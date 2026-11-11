import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, XCircle } from 'lucide-react';
import { agentTest, buildAgentTest, goingFurther, platforms } from '../data/agents';
import PromptBuilder from './PromptBuilder';

export function PlatformTabs() {
  const [active, setActive] = useState(platforms[0].key);
  const p = platforms.find((x) => x.key === active);
  return (
    <div className="card overflow-hidden">
      <div className="flex overflow-x-auto border-b border-line/70 [scrollbar-width:none]" role="tablist" aria-label="AI platform">
        {platforms.map((x) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            id={`tab-${x.key}`}
            aria-selected={x.key === active}
            aria-controls="platform-panel"
            onClick={() => setActive(x.key)}
            className={`relative shrink-0 px-4 py-3.5 font-heading text-sm font-semibold whitespace-nowrap transition ${
              x.key === active ? 'text-navy' : 'text-muted hover:text-navy'
            }`}
          >
            {x.title}
            {x.key === active && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-orange" />}
          </button>
        ))}
      </div>
      <ol id="platform-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="space-y-3 p-5">
        {p.steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-sm leading-relaxed">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{i + 1}</span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// The three-phase test. Pass a role agent's scenario, or let the user describe their own.
export function AgentTest({ agent }) {
  const scenarioField = [{ key: 'scenario', label: 'Describe a real task you would hand this agent', long: true }];
  const tpl = buildAgentTest(agent ? agent.test.scenario : '{scenario}');
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['Phase 1', 'Context check', 'Does it know who it is, who it works for, and how to format?'],
          ['Phase 2', agent ? agent.test.label : 'Live test', 'A realistic task with details missing, on purpose.'],
          ['Phase 3', 'Self-assessment', 'Can it spot its own assumptions and gaps?'],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-2xl bg-surface p-4">
            <p className="eyebrow">{n}</p>
            <p className="mt-1 font-heading font-semibold text-navy">{t}</p>
            <p className="mt-1 text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>

      <PromptBuilder
        id={agent ? `test-${agent.id}` : 'test-custom'}
        kind="agent"
        title={agent ? `${agent.title} test` : 'Agent test'}
        template={tpl}
        fields={agent ? [] : scenarioField}
        note="Send this inside the agent you installed, not in a fresh chat."
      />

      {agent && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-5">
            <p className="mb-3 flex items-center gap-2 font-heading font-semibold text-navy">
              <CheckCircle2 size={18} className="text-green-600" aria-hidden /> What a good answer does
            </p>
            <ul className="space-y-2 text-sm">
              {agent.test.lookFor.map((l) => (
                <li key={l} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />{l}</li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <p className="mb-3 flex items-center gap-2 font-heading font-semibold text-navy">
              <AlertTriangle size={18} className="text-orange" aria-hidden /> Red flag
            </p>
            <p className="text-sm">{agent.test.redFlag}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ScoreTable() {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="bg-navy text-white">
            <tr>
              {['Criterion', 'Pass', 'Fail'].map((h) => <th key={h} scope="col" className="px-4 py-3 font-heading font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {agentTest.scoring.map((r, i) => (
              <tr key={r.test} className={i % 2 ? 'bg-[#f5f5f5]' : 'bg-white'}>
                <th scope="row" className="px-4 py-3 font-semibold text-navy">{r.test}</th>
                <td className="px-4 py-3"><span className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" aria-hidden />{r.pass}</span></td>
                <td className="px-4 py-3"><span className="flex gap-2"><XCircle size={16} className="mt-0.5 shrink-0 text-red-600" aria-hidden />{r.fail}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RefineSteps() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {agentTest.refine.map((r, i) => (
        <li key={r.title} className="card p-4">
          <span className="font-heading text-2xl font-bold text-orange">{String(i + 1).padStart(2, '0')}</span>
          <p className="mt-1 font-heading font-semibold text-navy">{r.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function GoingFurther() {
  return (
    <div className="space-y-3">
      {goingFurther.map((g) => (
        <details key={g.title} className="group card overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-heading font-semibold text-navy [&::-webkit-details-marker]:hidden">
            {g.title}
            <ChevronDown size={18} className="shrink-0 text-muted transition group-open:rotate-180" aria-hidden />
          </summary>
          <div className="space-y-3 px-5 pb-5 text-sm leading-relaxed">
            <p>{g.body}</p>
            {g.code && <pre className="prose-prompt rounded-xl bg-navy-deep p-4 text-white/90">{g.code}</pre>}
            <p className="text-xs font-semibold text-muted">Best for: {g.bestFor}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
