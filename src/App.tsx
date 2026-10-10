import { useEffect, useState, type ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight, ChevronRight, Download, ExternalLink, GitFork, Mail, MapPin, Menu, Sparkles, X } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  career,
  engineeringApproach,
  notes,
  projects,
  proofStats,
  siteConfig,
  skillGroups,
  statusCopy,
  verifiedWork,
  type EvidenceStatus,
  type Note,
  type Project,
} from './data'

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Research', href: '/projects' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const sectionReveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
}

function Seo({ title, description, type = 'website' }: { title: string; description: string; type?: string }) {
  useEffect(() => {
    document.title = title
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let node = document.head.querySelector(selector) as HTMLMetaElement | null
      if (!node) {
        node = document.createElement('meta')
        node.setAttribute(property ? 'property' : 'name', name)
        document.head.append(node)
      }
      node.content = content
    }
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:type', type, true)
    setMeta('og:url', window.location.href, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    const path = window.location.pathname.replace(/\/$/, '')
    const suffix = path.includes('/projects/')
      ? `projects/${path.split('/projects/')[1]}`
      : path.endsWith('/projects')
        ? 'projects'
        : path.endsWith('/about')
          ? 'about'
          : path.endsWith('/notes')
            ? 'notes'
            : path.endsWith('/contact')
              ? 'contact'
              : ''
    canonical.href = suffix ? `${siteConfig.canonical}${suffix}` : siteConfig.canonical
  }, [description, title, type])
  return null
}

function navigate(href: string) {
  const base = window.location.pathname.startsWith('/portfolio') ? '/portfolio' : ''
  if (href.startsWith('/#')) {
    const hash = href.slice(1)
    window.history.pushState({}, '', `${base}/${hash}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
    return
  }
  const target = href === '/' ? `${base}/` : `${base}${href}`
  window.history.pushState({}, '', target)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function assetUrl(path: string) {
  const base = window.location.pathname.startsWith('/portfolio') ? '/portfolio' : ''
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

function StatusChip({ status }: { status: EvidenceStatus }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-stone-300">
      {statusCopy[status]}
    </span>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  const go = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOpen(false)
    navigate(href)
  }
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-stone-950/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5" aria-label="Primary navigation">
        <a className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-stone-100" href="/" onClick={go('/')}>
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-stone-100 text-xs font-bold text-stone-950">AS</span>
          {siteConfig.name}
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} className="nav-link" href={item.href} onClick={go(item.href)}>
              {item.label}
            </a>
          ))}
        </div>
        <a className="button button-small hidden sm:inline-flex" href={`mailto:${siteConfig.email}`}>
          Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-stone-100 md:hidden"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-stone-950/95 p-2 backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <a key={item.href} className="block rounded-xl px-4 py-3 text-sm text-stone-300 hover:bg-white/5 hover:text-white" href={item.href} onClick={go(item.href)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-stone-400">
      <a className="hover:text-white" href={siteConfig.github} target="_blank" rel="noreferrer">
        GitHub <span className="sr-only">(opens in a new tab)</span>
      </a>
      <span aria-hidden="true">·</span>
      <a className="hover:text-white" href={`mailto:${siteConfig.email}`}>
        {siteConfig.email}
      </a>
      <span aria-hidden="true">·</span>
      <a className="hover:text-white" href={siteConfig.resume}>
        Résumé
      </a>
    </div>
  )
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0a0a0a] text-stone-100 selection:bg-violet-300 selection:text-stone-950">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      {children}
      <footer className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Android platforms first — AI with proof.
          </p>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-stone-300" href={siteConfig.github} target="_blank" rel="noreferrer">
              GitHub <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a className="hover:text-stone-300" href={`mailto:${siteConfig.email}`}>
              Email
            </a>
            <a className="hover:text-stone-300" href={siteConfig.resume}>
              Résumé
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Hero() {
  const reduced = useReducedMotion()
  const [glow, setGlow] = useState({ x: 50, y: 30 })
  return (
    <section
      className="relative isolate flex min-h-[90vh] items-end overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12"
      onPointerMove={(event) => {
        if (!reduced) {
          const b = event.currentTarget.getBoundingClientRect()
          setGlow({ x: ((event.clientX - b.left) / b.width) * 100, y: ((event.clientY - b.top) / b.height) * 100 })
        }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(139,92,246,.17), transparent 48%)` }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:gap-16">
        <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}>
          <p className="eyebrow mb-6">Android systems · 100M+ users · applied AI research</p>
          <h1 className="max-w-5xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.06em] text-stone-100 sm:text-6xl lg:text-[4.6rem]">
            I architect reliable <span className="text-violet-200">Android platforms</span> — and research on-device and agentic AI under production constraints.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-400 sm:text-xl">
            Fourteen years of Kotlin, KMP, Compose, and large-scale sync. Current research: Gemma on device, Google ADK agent loops, and Android Gemini APIs — labeled as prototype or study, never as shipped AI product work.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-stone-500">
            <MapPin size={14} aria-hidden="true" />
            {siteConfig.location} · Senior Android engineer · open to Principal / Staff platform roles
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              className="button"
              href="/#work"
              onClick={(e) => {
                e.preventDefault()
                navigate('/#work')
              }}
            >
              View platform work <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a
              className="button button-quiet"
              href="/projects"
              onClick={(e) => {
                e.preventDefault()
                navigate('/projects')
              }}
            >
              AI research
            </a>
            <a className="button button-quiet" href={siteConfig.resume}>
              <Download size={16} aria-hidden="true" />
              Download résumé
            </a>
          </div>
          <div className="mt-7">
            <SocialLinks />
          </div>
        </motion.div>
        <motion.figure
          className="relative mx-auto hidden w-full max-w-[360px] lg:block"
          initial={reduced ? false : { opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-violet-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] p-2 shadow-2xl shadow-violet-950/30 backdrop-blur-sm">
            <img
              className="aspect-[398/460] w-full rounded-[1.55rem] object-cover"
              src="./ashish-singh.png"
              width="398"
              height="460"
              decoding="async"
              alt="Ashish Singh, Android and mobile-platform architect"
            />
            <figcaption className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-stone-950/70 px-3 py-2 text-xs text-stone-300 backdrop-blur-md">
              Android architect · applied AI research
            </figcaption>
          </div>
        </motion.figure>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, copy, level = 2 }: { eyebrow: string; title: string; copy?: string; level?: 1 | 2 }) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <Heading className="mt-4 text-4xl font-medium tracking-[-0.05em] text-stone-100 sm:text-5xl">{title}</Heading>
      {copy && <p className="mt-5 text-base leading-7 text-stone-400 sm:text-lg">{copy}</p>}
    </div>
  )
}

function Career() {
  return (
    <motion.section className="section-shell pt-0" {...sectionReveal}>
      <SectionTitle
        eyebrow="05 / Career"
        title="Fourteen years of building platforms."
        copy="Hands-on Android engineering, technical leadership, and production systems at scale. Applied AI research sits on top of this, not instead of it."
      />
      <div className="mt-10 border-t border-white/10">
        {career.map(([period, role, company]) => (
          <div key={`${period}-${company}`} className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6 sm:px-3">
            <p className="text-xs text-stone-500">{period}</p>
            <h2 className="text-base font-medium text-stone-200">{role}</h2>
            <p className="text-sm text-stone-400">{company}</p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function Contact() {
  return (
    <motion.section id="contact" className="px-5 pb-5 pt-8 sm:px-8 lg:px-12" {...sectionReveal}>
      <div className="mx-auto max-w-6xl rounded-3xl border border-violet-200/15 bg-white/[0.05] px-6 py-12 sm:px-10 lg:px-14">
        <Sparkles className="text-violet-200" size={25} aria-hidden="true" />
        <h2 className="mt-6 max-w-3xl text-4xl font-medium tracking-[-0.06em] sm:text-6xl">Have a hard mobile-platform problem?</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-stone-400 sm:text-lg">
          Open to Principal / Staff Android, mobile-platform architecture, and teams that want production-minded applied AI — not demo-only agent slides.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button" href={`mailto:${siteConfig.email}`}>
            <Mail size={17} aria-hidden="true" />
            Email Ashish
          </a>
          <a className="button button-quiet" href={siteConfig.github} target="_blank" rel="noreferrer">
            <GitFork size={17} aria-hidden="true" />
            GitHub <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a className="button button-quiet" href={siteConfig.resume}>
            <Download size={17} aria-hidden="true" />
            Résumé
          </a>
        </div>
      </div>
    </motion.section>
  )
}

function HomePage() {
  const reduced = useReducedMotion()
  const reveal = reduced ? { initial: false } : sectionReveal
  useEffect(() => {
    if (window.location.hash) {
      window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
    }
  }, [])
  return (
    <Layout>
      <Seo
        title="Ashish Singh — Android & Mobile Platform Architect"
        description="Android architect with 14 years at 100M+ user scale. Applied AI research: AiStudyHub (Gemma), Google ADK study, Android Gemini samples."
      />
      <main id="main-content">
        <Hero />
        <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12" aria-label="Career highlights">
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4">
            {proofStats.map((stat) => (
              <div key={stat.label} className="border-white/10 px-5 py-8 text-center even:border-l md:border-l md:first:border-l-0">
                <p className="text-3xl font-medium tracking-tight text-stone-100 sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-200">{stat.label}</p>
                <p className="mt-2 text-xs text-stone-500">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>
        <motion.section id="work" className="section-shell" {...reveal}>
          <SectionTitle
            eyebrow="01 / Selected work"
            title="Building a reliable mobile platform at 100M+ user scale."
            copy="Led architecture and evolution of mission-critical Android capabilities for Verizon Cloud at Synchronoss: sync contracts, modernization, and observability-led reliability."
          />
          <div className="mt-10 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-3">
            {verifiedWork.map((card, i) => (
              <motion.article
                key={card.title}
                whileHover={reduced ? undefined : { y: -5 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-colors hover:border-white/25 sm:p-7 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-60`} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <p className="eyebrow">{card.eyebrow}</p>
                    <card.icon size={24} className="text-stone-300" aria-hidden="true" />
                  </div>
                  <div className="mt-auto pt-14">
                    <h2 className="text-2xl font-medium tracking-[-0.04em]">{card.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-stone-400">{card.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-stone-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {card.href && (
                      <a className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-200 hover:text-white" href={card.href} target="_blank" rel="noreferrer">
                        View on Play Store <ExternalLink size={14} aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
        <motion.section id="research" className="section-shell pt-0" {...reveal}>
          <SectionTitle
            eyebrow="02 / Applied AI research"
            title="Intelligence that has to live with latency, privacy, and battery."
            copy="Three public artifacts. One original prototype; two labeled study forks. Recruiters can open the repos. Nothing here is claimed as production AI."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <StatusChip status={project.status} />
                  <project.icon size={22} className="text-violet-200" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-xl font-medium tracking-[-0.03em]">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-stone-400">{project.summary}</p>
                <p className="mt-4 text-xs leading-5 text-stone-500">{project.architectureLine}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-stone-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <a
                    className="text-sm font-medium text-violet-200 hover:text-white"
                    href={`/projects/${project.slug}`}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/projects/${project.slug}`)
                    }}
                  >
                    Case study
                  </a>
                  {project.demoUrl && (
                    <a className="text-sm font-medium text-violet-200 hover:text-white" href={assetUrl(project.demoUrl)} target="_blank" rel="noreferrer">
                      Live demo <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a className="text-sm text-stone-400 hover:text-white" href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </motion.section>
        <motion.section className="section-shell pt-0" {...reveal}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:p-12">
            <SectionTitle
              eyebrow="03 / How I work"
              title="Production constraints, then intelligence."
              copy="Android at this scale already encodes the habits AI products need: architecture, measurement, privacy, and recovery."
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {skillGroups.map((group, i) => (
                <div key={group.title} className="border-t border-white/10 pt-5">
                  <group.icon size={20} className="text-violet-200" aria-hidden="true" />
                  <p className="mt-4 text-lg font-medium">{group.title}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{group.copy}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-stone-300">
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 block text-xs text-stone-600">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section className="section-shell pt-0" {...reveal}>
          <SectionTitle eyebrow="04 / Engineering approach" title="Useful, testable, honest about limitations." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {engineeringApproach.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 p-6">
                <ChevronRight className="text-violet-200" size={18} aria-hidden="true" />
                <h2 className="mt-8 text-xl font-medium">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-stone-400">{item.copy}</p>
              </div>
            ))}
          </div>
        </motion.section>
        <Career />
        <Contact />
      </main>
    </Layout>
  )
}

function ProjectsPage() {
  return (
    <Layout>
      <Seo
        title="AI research — Ashish Singh"
        description="AiStudyHub Gemma prototype, Google ADK study fork, and Android AI samples — each labeled with evidence status and a GitHub link."
      />
      <main id="main-content" className="section-shell pt-40">
        <SectionTitle
          level={1}
          eyebrow="Research"
          title="Applied AI with repositories attached."
          copy="Each case study states the problem, architecture, evaluation (or lack of it), limitations, and what is original versus a study fork."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
    </Layout>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-white/25 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <StatusChip status={project.status} />
          <h2 className="mt-4 text-2xl font-medium tracking-[-0.04em]">{project.title}</h2>
        </div>
        <project.icon className="text-violet-200" size={24} aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm leading-6 text-stone-400">{project.summary}</p>
      <p className="mt-3 text-xs leading-5 text-stone-500">{project.architectureLine}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-stone-300">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          className="button button-quiet"
          href={`/projects/${project.slug}`}
          onClick={(e) => {
            e.preventDefault()
            navigate(`/projects/${project.slug}`)
          }}
        >
          Read case study <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        {project.demoUrl && (
          <a className="button button-quiet" href={assetUrl(project.demoUrl)} target="_blank" rel="noreferrer">
            Live demo
          </a>
        )}
      </div>
    </article>
  )
}

function CaseStudyPage({ project }: { project: Project }) {
  const fields: Array<[string, string]> = [
    ['Problem', project.problem],
    ['Users and use case', project.usersAndUseCase],
    ['Solution', project.solution],
    ['Architecture', project.architecture],
    ['My specific contribution', project.contribution],
    ['Model and prompt strategy', project.modelStrategy],
    ['Retrieval or tool-use design', project.retrievalOrTools],
    ['Evaluation approach', project.evaluation],
    ['Results and metrics', project.results],
    ['Latency and cost considerations', project.latencyAndCost],
    ['Failure modes and limitations', project.limitations],
    ['Security and privacy considerations', project.securityAndPrivacy],
    ['What I would improve next', project.nextImprovements],
  ]
  return (
    <Layout>
      <Seo title={`${project.title} — Ashish Singh`} description={project.summary} type="article" />
      <main id="main-content" className="section-shell pt-40">
        <a
          className="text-sm text-stone-500 hover:text-white"
          href="/projects"
          onClick={(e) => {
            e.preventDefault()
            navigate('/projects')
          }}
        >
          ← All research
        </a>
        <div className="mt-12">
          <StatusChip status={project.status} />
        </div>
        <h1 className="mt-4 max-w-4xl text-5xl font-medium tracking-[-0.06em] sm:text-7xl">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-stone-400">{project.summary}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-500">{project.architectureLine}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {fields.map(([label, value]) => (
            <section key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-medium">{label}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-stone-400">{value}</p>
            </section>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a className="button" href={project.githubUrl} target="_blank" rel="noreferrer">
              GitHub <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {project.demoUrl && (
            <a className="button button-quiet" href={assetUrl(project.demoUrl)} target="_blank" rel="noreferrer">
              Live demo <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </main>
    </Layout>
  )
}

function AboutPage() {
  return (
    <Layout>
      <Seo
        title="About — Ashish Singh"
        description="Senior Android and mobile-platform architect in Bengaluru. 14 years, 100M+ users, applied AI research with Gemma and ADK."
      />
      <main id="main-content" className="section-shell pt-40">
        <SectionTitle
          level={1}
          eyebrow="About"
          title="An Android architect studying applied AI the same way I ship platforms: with constraints."
          copy="I have spent 14+ years building Android systems, debugging production failures, and owning architecture for large-scale mobile products — most recently Verizon Cloud at Synchronoss. I am not rewriting that career as “AI Engineer.” I am adding measured research on top of it."
        />
        <div className="mt-10 max-w-2xl space-y-5 text-sm leading-7 text-stone-400">
          <p>
            Production work: high-level design for cloud sync, data contracts, ANR and memory diagnosis, observability, and KMP/MVVM patterns used by a team. That is the evidence a Principal Android recruiter can verify.
          </p>
          <p>
            Research work: AiStudyHub (original Gemma prototype), a study fork of Google ADK samples, and a study fork of Android AI samples. Each has a case study that says what I did not build.
          </p>
          <p>
            I am based in Bengaluru and open to Principal / Staff Android and mobile-platform roles, including teams where on-device or agentic AI will have to live inside a real product.
          </p>
        </div>
        <div className="mt-10">
          <SocialLinks />
        </div>
      </main>
    </Layout>
  )
}

function NotesPage() {
  return (
    <Layout>
      <Seo title="Engineering notes — Ashish Singh" description="Short notes on Gemma on-device tradeoffs, ADK vs a single LLM call, and why ANR habits apply to agent loops." />
      <main id="main-content" className="section-shell pt-40">
        <SectionTitle
          level={1}
          eyebrow="Notes"
          title="Evidence over hype."
          copy="Each note is a prototype observation, an experiment, or a production habit I am carrying into AI work. None of them invent metrics."
        />
        <div className="mt-12 grid gap-4">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </main>
    </Layout>
  )
}

function NoteCard({ note }: { note: Note }) {
  return (
    <article id={note.slug} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <p className="eyebrow">
        {note.kind} · {note.date}
      </p>
      <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em]">{note.title}</h2>
      <p className="mt-3 text-sm leading-6 text-stone-400">{note.summary}</p>
      <div className="mt-6 space-y-4">
        {note.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-sm leading-7 text-stone-400">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}

function ContactPage() {
  return (
    <Layout>
      <Seo title="Contact — Ashish Singh" description="Email sync.ashishsingh@outlook.com for Principal Android, mobile-platform, and applied-AI-with-constraints conversations." />
      <main id="main-content" className="section-shell pt-40">
        <SectionTitle
          level={1}
          eyebrow="Contact"
          title="Let’s talk about a platform that has to stay up — including when it grows a model."
          copy="Principal / Staff Android, mobile-platform architecture, and applied AI that will be evaluated like production software."
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <a className="button" href={`mailto:${siteConfig.email}`}>
            <Mail size={17} aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a className="button button-quiet" href={siteConfig.github} target="_blank" rel="noreferrer">
            GitHub <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a className="button button-quiet" href={siteConfig.resume}>
            Résumé
          </a>
        </div>
      </main>
    </Layout>
  )
}

function normalizePath(path: string) {
  return path.replace(/^\/portfolio/, '').replace(/\/$/, '') || '/'
}

function App() {
  const initialPath = new URLSearchParams(window.location.search).get('route') || window.location.pathname
  const [path, setPath] = useState(initialPath)
  useEffect(() => {
    const onPop = () => setPath(new URLSearchParams(window.location.search).get('route') || window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const normalized = normalizePath(path)
  if (normalized === '/projects') return <ProjectsPage />
  if (normalized.startsWith('/projects/')) {
    const project = projects.find((item) => item.slug === normalized.split('/')[2])
    return project ? <CaseStudyPage project={project} /> : <ProjectsPage />
  }
  if (normalized === '/about') return <AboutPage />
  if (normalized === '/notes') return <NotesPage />
  if (normalized === '/contact') return <ContactPage />
  return <HomePage />
}

export default App
