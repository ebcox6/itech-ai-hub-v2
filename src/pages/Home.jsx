import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Bot, Check, Library, Sparkles } from 'lucide-react';
import { audiences, site } from '../config/site';
import { frameworks } from '../data/learn';
import { prompts } from '../data/prompts';
import { agents } from '../data/agents';
import { useStore } from '../lib/store';
import { PromptCard } from '../components/cards';
import { SectionTitle } from '../components/ui';

const FEATURED = {
  msp: ['msp-escalation-summary', 'msp-qbr-agenda', 'msp-difficult-client-email'],
  erp: ['erp-weekly-status-report', 'erp-discovery-questions', 'erp-golive-readiness'],
  business: ['corp-meeting-agenda', 'corp-meeting-recap', 'corp-policy-announcement'],
  all: ['uc-general', 'adv-selfcheck', 'msp-qbr-agenda'],
};

const PATHS = [
  {
    to: '/learn',
    icon: BookOpen,
    step: 'Step 1',
    title: 'Learn the frameworks',
    body: 'Five short lessons, about 20 minutes in total. Start with the anatomy of a prompt and finish with the power moves.',
    cta: 'Start learning',
  },
  {
    to: '/prompts',
    icon: Library,
    step: 'Step 2',
    title: 'Use a proven prompt',
    body: `${prompts.length} fill-in-the-blank prompts. Type your details, preview, and send to your AI tool in one click.`,
    cta: 'Browse prompts',
  },
  {
    to: '/agents',
    icon: Bot,
    step: 'Step 3',
    title: 'Build your own agent',
    body: 'Turn what you learned into an assistant that already knows your role. Install it, then test it before you trust it.',
    cta: 'Build an agent',
  },
];

const fade = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });

export default function Home() {
  const { audience, setAudience } = useStore();
  const featured = (FEATURED[audience] || FEATURED.all).map((id) => prompts.find((p) => p.id === id)).filter(Boolean);
  const current = audiences.find((a) => a.key === audience);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div aria-hidden className="absolute inset-0 opacity-60 [background:radial-gradient(60rem_30rem_at_85%_-10%,#006cff55,transparent_60%),radial-gradient(40rem_24rem_at_100%_100%,#ef722533,transparent_60%)]" />
        <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_25rem]">
          <div>
          <motion.p {...fade()} className="eyebrow mb-4 flex items-center gap-2">
            <Sparkles size={14} aria-hidden /> {site.orgName}
          </motion.p>
          <motion.h1 {...fade(0.05)} className="max-w-3xl text-4xl leading-[1.1] font-bold text-white sm:text-5xl">
            Better prompts. <span className="text-orange">Smarter agents.</span> Less blank-page time.
          </motion.h1>
          <motion.p {...fade(0.1)} className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {site.intro}
          </motion.p>
          <motion.div {...fade(0.15)} className="mt-8 flex flex-wrap gap-3">
            <Link to="/learn" className="btn-primary px-5 py-3 text-base">
              I’m new to prompting <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/agents" className="btn border border-white/25 px-5 py-3 text-base text-white hover:bg-white/10">
              I’m ready to build an agent
            </Link>
          </motion.div>
          <motion.dl {...fade(0.2)} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {[
              [frameworks.length, 'Frameworks'],
              [prompts.length, 'Prompts'],
              [agents.length, 'Role agents'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-heading text-3xl font-bold text-white">{n}</dd>
                <dd className="text-sm text-white/60">{l}</dd>
              </div>
            ))}
          </motion.dl>
          </div>
          <HeroPreview />
        </div>
      </section>

      {/* Team picker */}
      <section className="container-page py-12 sm:py-16">
        <SectionTitle eyebrow="Make it yours" title="Which team are you on?">
          Pick one and the hub shows the prompts and agents built for your work. Change it anytime from the menu at the top.
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3" role="radiogroup" aria-label="Your team">
          {audiences.map((a) => {
            const on = audience === a.key;
            const count = prompts.filter((p) => p.audiences.includes(a.key)).length;
            return (
              <button
                key={a.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setAudience(on ? null : a.key)}
                className={`card relative p-5 text-left transition ${
                  on ? 'border-orange shadow-[0_0_0_3px_rgba(239,114,37,0.18)]' : 'hover:border-navy/30'
                }`}
              >
                <span className={`absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full border ${on ? 'border-orange bg-orange text-white' : 'border-line'}`}>
                  {on && <Check size={14} aria-hidden />}
                </span>
                <p className="pr-8 font-heading text-lg font-semibold text-navy">{a.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.description}</p>
                <p className="mt-4 text-xs font-semibold text-orange">{count} prompts</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Path */}
      <section className="border-y border-line/60 bg-white">
        <div className="container-page py-12 sm:py-16">
          <SectionTitle eyebrow="How the hub works" title="Learn it, use it, build it" />
          <div className="grid gap-4 md:grid-cols-3">
            {PATHS.map((p) => (
              <Link key={p.to} to={p.to} className="group card flex flex-col bg-surface/50 p-6 transition hover:border-navy/30 hover:bg-white">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                    <p.icon size={22} aria-hidden />
                  </span>
                  <span className="font-heading text-xs font-semibold tracking-wider text-muted uppercase">{p.step}</span>
                </div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue">
                  {p.cta} <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-12 sm:py-16">
        <SectionTitle
          eyebrow={current ? `Popular with ${current.short} teams` : 'Popular right now'}
          title="Try one of these first"
          action={
            <Link to="/prompts" className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue hover:underline">
              See all prompts <ArrowRight size={16} aria-hidden />
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((p) => <PromptCard key={p.id} prompt={p} />)}
        </div>
      </section>
    </>
  );
}

// Decorative sample of the prompt builder, so first-time visitors see what the hub does.
function HeroPreview() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="hidden rotate-1 rounded-2xl bg-white p-5 text-ink shadow-2xl ring-1 ring-white/10 lg:block"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="chip bg-orange-soft text-[#b4541a]">Client Communication</span>
        <span className="chip bg-surface text-muted">3/4 filled</span>
      </div>
      <p className="font-heading font-semibold text-navy">QBR Agenda & Talking Points</p>
      <div className="prose-prompt mt-3 rounded-xl bg-surface p-3 text-[12px] text-muted">
        CONTEXT: I am preparing for a Quarterly Business Review with{' '}
        <mark className="rounded bg-orange-soft px-0.5 text-ink">Acme Dental</mark>. They are a{' '}
        <mark className="rounded bg-orange-soft px-0.5 text-ink">12-location healthcare</mark> client who has been with us for{' '}
        <mark className="rounded bg-orange-soft px-0.5 text-ink">3 years</mark>. Key topics I need to cover:{' '}
        <span className="rounded bg-blue-soft px-1 text-blue">[key topics]</span>
        {'\n\n'}ROLE: Act as a senior vCIO and client success strategist...
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="btn-primary px-3 py-2 text-xs">Copy prompt</span>
        {['ChatGPT', 'Claude', 'Copilot'].map((t) => (
          <span key={t} className="rounded-xl border border-line px-3 py-2 font-heading text-xs font-medium text-navy">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}
