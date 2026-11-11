import { Info } from 'lucide-react';
import { audiences } from '../config/site';
import { agents, universalStarter } from '../data/agents';
import { useStore } from '../lib/store';
import PromptBuilder from '../components/PromptBuilder';
import { AgentCard } from '../components/cards';
import { AgentTest, GoingFurther, PlatformTabs, RefineSteps, ScoreTable } from '../components/agentParts';
import { PageHeader, SectionTitle } from '../components/ui';

const STEPS = [
  { id: 'start', n: 1, title: 'Write it', body: 'Start from the Universal Starter or a ready-made role agent.' },
  { id: 'install', n: 2, title: 'Install it', body: 'Paste it into ChatGPT, Claude, Copilot, or Gemini.' },
  { id: 'test', n: 3, title: 'Test it', body: 'Run the three-phase test before real work.' },
  { id: 'improve', n: 4, title: 'Improve it', body: 'Patch the gaps, add files, and share it.' },
];

export default function Agents() {
  const { audience } = useStore();
  const matching = audience ? agents.filter((a) => a.audiences.includes(audience)) : agents;
  const shown = matching.length ? matching : agents;
  const aud = audiences.find((a) => a.key === audience);

  return (
    <>
      <PageHeader eyebrow="Build your agent" title="An assistant that knows your job before you type a word">
        Stop re-explaining your role in every chat. Write your instructions once, install them, and test the result. About 10 minutes.
      </PageHeader>

      <nav aria-label="Steps" className="sticky top-16 z-30 border-b border-line/60 bg-white/95 backdrop-blur">
        <ol className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {STEPS.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-navy hover:bg-surface">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-xs text-white">{s.n}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="container-page space-y-16 py-10">
        <section id="start" className="scroll-mt-32">
          <SectionTitle eyebrow="Step 1" title="Write your agent’s instructions">
            Fill in two details to make the Universal Starter yours. It sets the rules every good agent follows: ask before guessing, flag assumptions, and keep a consistent format.
          </SectionTitle>
          <PromptBuilder id="universal-starter" kind="agent" title="Universal Starter" template={universalStarter.template} fields={universalStarter.fields} />

          <div className="mt-10">
            <h3 className="text-lg font-semibold">Or start from a role agent</h3>
            <p className="mt-1 mb-4 text-sm text-muted">
              Pre-written instructions for common roles, each with its own test scenario.
            </p>
            {audience && !matching.length && (
              <div className="mb-4 flex gap-2 rounded-xl bg-blue-soft px-4 py-3 text-sm text-navy">
                <Info size={18} className="mt-0.5 shrink-0 text-blue" aria-hidden />
                There are no ready-made {aud.label} agents yet. The Universal Starter above works for any role, or adapt one of these.
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((a) => <AgentCard key={a.id} agent={a} />)}
            </div>
          </div>
        </section>

        <section id="install" className="scroll-mt-32">
          <SectionTitle eyebrow="Step 2" title="Install it on your platform">
            Copy your instructions, then follow the steps for the tool your team uses.
          </SectionTitle>
          <PlatformTabs />
        </section>

        <section id="test" className="scroll-mt-32">
          <SectionTitle eyebrow="Step 3" title="Test before you trust">
            Run this inside your new agent. Each role agent page has a scenario written for that role; here you can describe your own.
          </SectionTitle>
          <AgentTest />
          <h3 className="mt-10 mb-4 text-lg font-semibold">Score the results</h3>
          <ScoreTable />
        </section>

        <section id="improve" className="scroll-mt-32">
          <SectionTitle eyebrow="Step 4" title="Improve it">
            A well-tested agent saves more time than a fast one.
          </SectionTitle>
          <RefineSteps />
          <h3 className="mt-10 mb-4 text-lg font-semibold">Going further</h3>
          <GoingFurther />
        </section>
      </div>
    </>
  );
}
