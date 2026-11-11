import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Bot, Library, Sparkles } from 'lucide-react';
import { site } from '../config/site';
import { frameworks } from '../data/learn';
import { prompts } from '../data/prompts';
import { agents } from '../data/agents';
import { PromptCard } from '../components/cards';
import { SectionTitle } from '../components/ui';
import { BeforeAfter, UseCase, WhyItWorks } from '../components/usecase';

const FEATURED = ['professional-email', 'meeting-recap', 'self-check'];
const craft = frameworks.find((f) => f.slug === 'craft');

const PATHS = [
  {
    to: '/learn',
    icon: BookOpen,
    step: 'Step 1',
    title: 'Learn the frameworks',
    body: 'Five short lessons, about 20 minutes in total, each with a real use case and a printable guide.',
    cta: 'Start learning',
  },
  {
    to: '/prompts',
    icon: Library,
    step: 'Step 2',
    title: 'Use a proven prompt',
    body: 'Fill-in-the-blank prompts for everyday work. Type your details, preview, and send to your AI tool in one click.',
    cta: 'Browse prompts',
  },
  {
    to: '/agents',
    icon: Bot,
    step: 'Step 3',
    title: 'Build your own agent',
    body: 'Turn what you learned into an assistant that already knows your job. Install it, then test it before you trust it.',
    cta: 'Build an agent',
  },
];

const fade = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });

export default function Home() {
  const featured = FEATURED.map((id) => prompts.find((p) => p.id === id)).filter(Boolean);

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
                [prompts.length, 'Ready-made prompts'],
                [agents.length, 'Starter agents'],
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

      {/* Use case */}
      <section className="container-page py-12 sm:py-16">
        <SectionTitle eyebrow="See the difference" title="Same request, very different result">
          Here is what one framework does to an everyday request. Every lesson in the hub walks through an example like this.
        </SectionTitle>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <UseCase id="home-use-case" title={craft.example.title} scenario={craft.example.scenario}>
            <BeforeAfter before={craft.example.before} after={craft.example.after} />
          </UseCase>
          <div className="card space-y-5 p-6 lg:sticky lg:top-24">
            <WhyItWorks items={craft.example.why} />
            <Link to="/learn/craft" className="btn-navy w-full">
              Learn C.R.A.F.T. <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
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
          eyebrow="Start here"
          title="Three prompts worth using this week"
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
  const mark = 'rounded bg-orange-soft px-0.5 text-ink';
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="hidden rotate-1 rounded-2xl bg-white p-5 text-ink shadow-2xl ring-1 ring-white/10 lg:block"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="chip bg-orange-soft text-[#b4541a]">Writing</span>
        <span className="chip bg-surface text-muted">3/4 filled</span>
      </div>
      <p className="font-heading font-semibold text-navy">Professional Email</p>
      <div className="prose-prompt mt-3 rounded-xl bg-surface p-3 text-[12px] text-muted">
        CONTEXT: <mark className={mark}>Our print vendor has missed two delivery dates</mark>.{'\n\n'}ACTION: Write an email to{' '}
        <mark className={mark}>our account manager</mark>. The goal is:{' '}
        <mark className={mark}>a confirmed date by Thursday</mark>.{'\n\n'}FORMAT: Under 175 words. Tone:{' '}
        <span className="rounded bg-blue-soft px-1 text-blue">[tone]</span>
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
