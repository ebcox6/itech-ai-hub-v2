import { agentBuilder, agents } from '../data/agents';
import PromptBuilder from '../components/PromptBuilder';
import { AgentCard } from '../components/cards';
import { AgentTest, GoingFurther, PlatformTabs, RefineSteps, ScoreTable } from '../components/agentParts';
import { PageHeader, SectionTitle } from '../components/ui';
import { NumberedSteps, UseCase } from '../components/usecase';

const STEPS = [
  { id: 'start', n: 1, title: 'Write it', body: 'Start from the Universal Starter or a ready-made role agent.' },
  { id: 'install', n: 2, title: 'Install it', body: 'Paste it into UnifiedAI or the AI tool your team uses.' },
  { id: 'test', n: 3, title: 'Test it', body: 'Run the three-phase test before real work.' },
  { id: 'improve', n: 4, title: 'Improve it', body: 'Patch the gaps, add files, and share it.' },
];

export default function Agents() {
  const ex = agentBuilder.example;

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
        <UseCase title={ex.title} scenario={ex.scenario}>
          <NumberedSteps steps={ex.steps} />
          <p className="text-sm text-muted">Follow the same four steps below. Use <span className="font-semibold text-blue">Fill with example</span> in Step 1 to see Dana’s answers.</p>
        </UseCase>

        <section id="start" className="scroll-mt-32">
          <SectionTitle eyebrow="Step 1" title="Write your agent’s instructions">
            Five details turn this into instructions for your role, in any industry. It sets the rules every good agent follows: ask before guessing, flag assumptions, and never invent facts.
          </SectionTitle>
          <PromptBuilder id="agent-builder" kind="agent" title="Agent Builder" template={agentBuilder.template} fields={agentBuilder.fields} example={ex.values} />

          <div className="mt-10">
            <h3 className="text-lg font-semibold">Or start from a starter agent</h3>
            <p className="mt-1 mb-4 text-sm text-muted">
              Ready-made instructions organized by the kind of work, not by industry. Each one comes with its own test.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((a) => <AgentCard key={a.id} agent={a} />)}
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
            Run this inside your new agent. Each starter agent has a scenario written for it; here you can describe your own.
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
