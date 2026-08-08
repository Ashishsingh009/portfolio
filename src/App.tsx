import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  ChevronRight,
  DatabaseZap,
  GitFork,
  Layers3,
  Mail,
  Menu,
  ServerCog,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const EMAIL = 'aashish2k2@gmail.com'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const highlights = [
  { value: '14+', label: 'years engineering' },
  { value: '100M+', label: 'users supported' },
  { value: '99.9%', label: 'uptime target' },
]

type WorkCard = {
  title: string
  eyebrow: string
  description: string
  icon: LucideIcon
  className: string
  tags: string[]
  accent: string
}

const workCards: WorkCard[] = [
  {
    title: 'Verizon Cloud',
    eyebrow: 'Selected case study',
    description:
      'Designed core cloud synchronization architecture, data contracts, and sync logic for a digital-life platform serving more than 100 million users.',
    icon: DatabaseZap,
    className: 'md:col-span-2 md:row-span-2',
    tags: ['Cloud sync', 'Android architecture', '100M+ scale'],
    accent: 'from-violet-400/30 via-fuchsia-400/10 to-transparent',
  },
  {
    title: 'Performance Engineering',
    eyebrow: 'Capability',
    description: 'Root-cause analysis for ANRs, memory leaks, and concurrency issues in production Android systems.',
    icon: ServerCog,
    className: 'md:col-span-1',
    tags: ['ANR reduction', 'Memory', 'Observability'],
    accent: 'from-cyan-300/25 via-sky-400/10 to-transparent',
  },
  {
    title: 'Architecture Authority',
    eyebrow: 'Capability',
    description: 'Technical roadmaps, app layouts, data schemas, and durable MVVM/MVI patterns that help teams ship confidently.',
    icon: Layers3,
    className: 'md:col-span-1',
    tags: ['HLD', 'MVVM/MVI', 'Tech strategy'],
    accent: 'from-amber-200/20 via-orange-300/10 to-transparent',
  },
  {
    title: 'Agentic Systems',
    eyebrow: 'Exploration',
    description: 'Researching LLMs, Google ADK, Koog, and agentic workflows for the next generation of mobile experiences.',
    icon: BrainCircuit,
    className: 'md:col-span-2',
    tags: ['LLMs', 'Google ADK', 'Koog'],
    accent: 'from-emerald-300/20 via-teal-300/10 to-transparent',
  },
]

const skillGroups = [
  {
    title: 'Android systems',
    skills: ['Kotlin', 'Jetpack Compose', 'Android Jetpack', 'MVVM / MVP', 'Flow & Coroutines'],
  },
  {
    title: 'Quality & scale',
    skills: ['TDD', 'JUnit & Espresso', 'Performance optimization', 'Documentation', 'Agile delivery'],
  },
  {
    title: 'AI exploration',
    skills: ['Large language models', 'Agentic workflows', 'Google ADK', 'Koog', 'Multi-agent systems'],
  },
]

const career = [
  ['2020 — Present', 'Senior Software Engineer III', 'Synchronoss Technology'],
  ['2019 — 2020', 'Senior Consultant', 'Xebia IT Architect India'],
  ['2018 — 2019', 'Android Team Lead', 'Wipro'],
  ['2017 — 2018', 'Senior Software Engineer', 'Source Soft Solutions'],
  ['2015 — 2017', 'Senior Software Engineer', 'Prospus Consulting'],
  ['2012 — 2015', 'Software Engineer', 'Xantatech Pvt Ltd'],
] as const

const sectionReveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-stone-100 sm:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-base leading-7 text-stone-400 sm:text-lg">{copy}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [glow, setGlow] = useState({ x: 50, y: 30 })
  const reducedMotion = useReducedMotion()

  const reveal = reducedMotion
    ? { initial: false }
    : sectionReveal

  return (
    <div className="min-h-screen overflow-x-clip bg-[#0a0a0a] text-stone-100 selection:bg-violet-300 selection:text-stone-950">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-stone-950/65 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5" aria-label="Primary navigation">
          <a className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-stone-100" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-stone-100 text-xs font-bold text-stone-950 transition-transform duration-300 group-hover:rotate-6">AS</span>
            Ashish Singh
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>{item.label}</a>
            ))}
          </div>
          <a className="button button-small hidden sm:inline-flex" href={`mailto:${EMAIL}`}>
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-stone-100 md:hidden" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-stone-950/95 p-2 backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <a key={item.href} className="block rounded-xl px-4 py-3 text-sm text-stone-300 hover:bg-white/5 hover:text-white" href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative isolate flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12" onPointerMove={(event) => {
          if (!reducedMotion) {
            const bounds = event.currentTarget.getBoundingClientRect()
            setGlow({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 })
          }
        }}>
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-90" style={{ background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(139, 92, 246, 0.20), transparent 48%)` }} />
          <div className="pointer-events-none absolute -right-[18rem] top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-fuchsia-400/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-[10%] -z-10 h-56 w-2/3 bg-gradient-to-t from-violet-600/10 to-transparent blur-3xl" />
          <div className="mx-auto w-full max-w-6xl">
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}>
              <p className="eyebrow mb-6"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_2px_rgba(110,231,183,.65)]" />Available for meaningful work</p>
              <h1 className="max-w-5xl text-balance text-5xl font-medium leading-[0.96] tracking-[-0.07em] text-stone-100 sm:text-7xl lg:text-[6.5rem]">
                Android systems, <span className="text-stone-500">built for</span> <em className="font-normal text-violet-200">scale.</em>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-stone-400 sm:text-xl">Android Architect and systems thinker. I build resilient mobile platforms, untangle production complexity, and explore what agentic AI makes possible.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a className="button" href={`mailto:${EMAIL}`}><Mail size={17} aria-hidden="true" />Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a className="button button-quiet" href="#work">Explore selected work <ArrowDownRight size={16} aria-hidden="true" /></a>
              </div>
            </motion.div>
            <motion.div className="mt-16 grid max-w-3xl grid-cols-3 border-t border-white/10 pt-6 sm:mt-24" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.7 }}>
              {highlights.map((item) => <div key={item.label}><p className="text-2xl font-medium tracking-[-0.04em] text-stone-100 sm:text-3xl">{item.value}</p><p className="mt-1 text-xs leading-4 text-stone-500 sm:text-sm">{item.label}</p></div>)}
            </motion.div>
          </div>
        </section>

        <motion.section id="work" className="section-shell" {...reveal}>
          <SectionTitle eyebrow="01 / Selected work" title="Engineering that holds up under pressure." copy="One named case study, supported by the architectural and operational disciplines behind it." />
          <div className="mt-10 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-3">
            {workCards.map((card) => {
              const Icon = card.icon
              return <motion.article key={card.title} whileHover={reducedMotion ? undefined : { y: -6 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }} className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-colors hover:border-white/25 sm:p-7 ${card.className}`}>
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-5"><p className="eyebrow">{card.eyebrow}</p><Icon className="text-stone-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" size={24} aria-hidden="true" /></div>
                  <div className="mt-auto pt-14"><h3 className="text-2xl font-medium tracking-[-0.04em] text-stone-100">{card.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">{card.description}</p><div className="mt-6 flex flex-wrap gap-2">{card.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[11px] text-stone-300">{tag}</span>)}</div></div>
                </div>
              </motion.article>
            })}
          </div>
        </motion.section>

        <motion.section id="expertise" className="section-shell pt-0" {...reveal}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-6 sm:p-10 lg:p-12">
            <SectionTitle eyebrow="02 / Expertise" title="Deep in the stack. Clear at the system level." />
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {skillGroups.map((group, groupIndex) => <div key={group.title} className="relative"><span className="text-sm text-violet-200">0{groupIndex + 1}</span><h3 className="mt-3 text-xl font-medium tracking-[-0.03em]">{group.title}</h3><ul className="mt-5 space-y-3">{group.skills.map((skill) => <li key={skill} className="flex items-center gap-2.5 text-sm text-stone-400"><ChevronRight size={14} className="text-violet-300" aria-hidden="true" />{skill}</li>)}</ul></div>)}
            </div>
          </div>
        </motion.section>

        <motion.section id="experience" className="section-shell pt-0" {...reveal}>
          <SectionTitle eyebrow="03 / Career" title="Fourteen years of building forward." copy="A progression through hands-on mobile engineering, technical leadership, and platform-scale systems work." />
          <div className="mt-10 border-t border-white/10">
            {career.map(([period, role, company]) => <div key={`${period}-${company}`} className="grid gap-2 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.025] sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6 sm:px-3"><p className="text-xs font-medium tracking-wide text-stone-500">{period}</p><h3 className="text-base font-medium text-stone-200">{role}</h3><p className="text-sm text-stone-400">{company}</p></div>)}
          </div>
        </motion.section>

        <motion.section id="contact" className="px-5 pb-5 pt-12 sm:px-8 lg:px-12" {...reveal}>
          <div className="mx-auto max-w-6xl rounded-3xl border border-violet-200/15 bg-[radial-gradient(circle_at_75%_20%,rgba(167,139,250,.2),transparent_35%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.025))] px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <Sparkles className="text-violet-200" size={25} aria-hidden="true" />
            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-medium tracking-[-0.06em] sm:text-6xl">Have a complex mobile problem worth solving?</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-400 sm:text-lg">I’m open to conversations about Android platform architecture, performance engineering, and agentic AI in mobile ecosystems.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="button" href={`mailto:${EMAIL}`}><Mail size={17} aria-hidden="true" />{EMAIL}</a><a className="button button-quiet" href="https://github.com/ashishsingh009" target="_blank" rel="noreferrer"><GitFork size={17} aria-hidden="true" />GitHub <ArrowUpRight size={16} aria-hidden="true" /></a></div>
          </div>
        </motion.section>
      </main>
      <footer className="px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Ashish Singh. Built with intent.</p><a className="transition-colors hover:text-stone-300" href="https://linktr.ee/RealAshish" target="_blank" rel="noreferrer">More ways to connect <ArrowUpRight className="inline" size={12} aria-hidden="true" /></a></div></footer>
    </div>
  )
}

export default App
