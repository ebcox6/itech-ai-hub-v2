import { useParams } from 'react-router-dom';
import { agents } from '../data/agents';
import PromptBuilder from '../components/PromptBuilder';
import { AgentTest, PlatformTabs, ScoreTable } from '../components/agentParts';
import { AudienceChips, BackLink, FavoriteButton, PageHeader, SectionTitle } from '../components/ui';
import NotFound from './NotFound';

export default function AgentDetail() {
  const { id } = useParams();
  const a = agents.find((x) => x.id === id);
  if (!a) return <NotFound />;

  return (
    <>
      <PageHeader
        eyebrow={a.role}
        title={a.title}
        back={<BackLink to="/agents">Build your agent</BackLink>}
        actions={<FavoriteButton id={`agent:${a.id}`} label={a.title} className="h-11 w-11 border border-line" />}
      >
        <p>{a.summary}</p>
        <div className="mt-4 flex gap-1.5 text-xs"><AudienceChips keys={a.audiences} /></div>
      </PageHeader>

      <div className="container-page space-y-14 py-10">
        <section>
          <SectionTitle eyebrow="Step 1" title="Copy the instructions">
            Adjust any detail that does not match your team, then paste it into your AI tool’s instructions field.
          </SectionTitle>
          <PromptBuilder key={a.id} id={`agent:${a.id}`} kind="agent" title={a.title} template={a.systemPrompt} />
        </section>
        <section>
          <SectionTitle eyebrow="Step 2" title="Install it" />
          <PlatformTabs />
        </section>
        <section>
          <SectionTitle eyebrow="Step 3" title={`Test it: ${a.test.label.toLowerCase()}`}>
            Paste this into the agent you just installed and compare its answer against the checklist.
          </SectionTitle>
          <AgentTest agent={a} />
          <h3 className="mt-10 mb-4 text-lg font-semibold">Score the results</h3>
          <ScoreTable />
        </section>
      </div>
    </>
  );
}
