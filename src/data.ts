import { BrainCircuit, DatabaseZap, FileText, Layers3, ServerCog, Smartphone, type LucideIcon } from 'lucide-react'

export const siteConfig = {
  name: 'Ashish Singh',
  location: 'Bengaluru, India',
  email: 'aashish2k2@gmail.com',
  github: 'https://github.com/ashishsingh009',
  linkedin: '',
  canonical: 'https://ashishsingh009.github.io/portfolio/',
  resume: './resume.pdf',
  roles: ['AI Engineer', 'AI Agent Engineer', 'Android Architect'],
}

export type EvidenceStatus = 'production' | 'prototype' | 'research' | 'placeholder'

export type Project = {
  slug: string
  title: string
  summary: string
  status: EvidenceStatus
  tags: string[]
  icon: LucideIcon
  problem: string
  usersAndUseCase: string
  solution: string
  architecture: string
  stack: string[]
  contribution: string
  modelStrategy: string
  retrievalOrTools: string
  evaluation: string
  results: string
  latencyAndCost: string
  limitations: string
  securityAndPrivacy: string
  nextImprovements: string
  githubUrl?: string
  demoUrl?: string
  videoUrl?: string
}

const missing = '[ADD PROJECT DETAILS]'

export const projects: Project[] = [
  {
    slug: 'ai-powered-android-assistant', title: 'AI-powered Android assistant', summary: 'A mobile AI experience designed around useful actions, clear boundaries, and production Android constraints.', status: 'placeholder', tags: ['Agents', 'Android', 'Gemini'], icon: Smartphone,
    problem: missing, usersAndUseCase: missing, solution: missing, architecture: '[ADD ARCHITECTURE DIAGRAM]', stack: ['Kotlin', 'Jetpack Compose', 'Gemini APIs'], contribution: missing, modelStrategy: missing, retrievalOrTools: missing, evaluation: '[ADD EVALUATION RESULT]', results: '[ADD RESULT]', latencyAndCost: '[ADD LATENCY] · [ADD COST PER REQUEST]', limitations: missing, securityAndPrivacy: missing, nextImprovements: missing, githubUrl: '', demoUrl: '', videoUrl: '',
  },
  {
    slug: 'document-rag-summarization', title: 'Document summarization / RAG system', summary: 'A grounded document workflow exploring ingestion, retrieval quality, and concise summaries for real users.', status: 'placeholder', tags: ['RAG', 'LLMs', 'Evaluation'], icon: FileText,
    problem: missing, usersAndUseCase: missing, solution: missing, architecture: '[ADD ARCHITECTURE DIAGRAM]', stack: ['LLM', 'Embeddings', 'Vector store'], contribution: missing, modelStrategy: missing, retrievalOrTools: missing, evaluation: '[ADD EVALUATION RESULT]', results: '[ADD RESULT]', latencyAndCost: '[ADD LATENCY] · [ADD COST PER REQUEST]', limitations: missing, securityAndPrivacy: missing, nextImprovements: missing, githubUrl: '', demoUrl: '', videoUrl: '',
  },
  {
    slug: 'agentic-android-test-automation', title: 'Agentic Android test automation', summary: 'An exploration of AI-assisted test workflows with explicit evaluation and failure recovery rather than a demo-only loop.', status: 'placeholder', tags: ['Agents', 'Testing', 'Android'], icon: BrainCircuit,
    problem: missing, usersAndUseCase: missing, solution: missing, architecture: '[ADD ARCHITECTURE DIAGRAM]', stack: ['Android testing', 'Agent workflow', 'MCP'], contribution: missing, modelStrategy: missing, retrievalOrTools: missing, evaluation: '[ADD EVALUATION RESULT]', results: '[ADD RESULT]', latencyAndCost: '[ADD LATENCY] · [ADD COST PER REQUEST]', limitations: missing, securityAndPrivacy: missing, nextImprovements: missing, githubUrl: '', demoUrl: '', videoUrl: '',
  },
]

export const career = [
  ['2020 — Present', 'Senior Software Engineer III', 'Synchronoss Technology'], ['2019 — 2020', 'Senior Consultant', 'Xebia IT Architect India'], ['2018 — 2019', 'Android Team Lead', 'Wipro'], ['2017 — 2018', 'Senior Software Engineer', 'Source Soft Solutions'], ['2015 — 2017', 'Senior Software Engineer', 'Prospus Consulting'], ['2012 — 2015', 'Software Engineer', 'Xantatech Pvt Ltd'],
] as const

export const skillGroups = [
  { title: 'Agent systems', copy: 'Tool use, orchestration, MCP, and multi-step workflows.', icon: BrainCircuit, skills: ['LLM applications', 'Agentic workflows', 'MCP', 'Google ADK', 'Koog'] },
  { title: 'Knowledge systems', copy: 'Grounded answers with retrieval quality and evaluation in view.', icon: DatabaseZap, skills: ['RAG', 'Document ingestion', 'Chunking', 'Grounding', 'Summarization'] },
  { title: 'AI on mobile', copy: 'AI experiences shaped by device, privacy, and performance constraints.', icon: Smartphone, skills: ['Kotlin', 'Jetpack Compose', 'Gemini APIs', 'ML Kit GenAI', 'Native integrations'] },
  { title: 'Reliability', copy: 'Production habits applied to emerging AI systems.', icon: ServerCog, skills: ['Evaluation', 'Latency', 'Cost', 'Failure recovery', 'Test automation'] },
]

export const verifiedWork = [
  { title: 'Verizon Cloud', eyebrow: 'Production experience', description: 'Designed core synchronization architecture and data contracts for a platform serving 100M+ users with a 99.9% uptime target.', icon: DatabaseZap, tags: ['Cloud sync', 'Android architecture', '100M+ scale'], href: 'https://play.google.com/store/apps/details?id=com.vcast.mediamanager', accent: 'from-violet-400/30 via-fuchsia-400/10 to-transparent' },
  { title: 'Performance engineering', eyebrow: 'Verified capability', description: 'Diagnosed ANRs, memory leaks, and concurrency issues across large-scale Android production systems.', icon: ServerCog, tags: ['ANR reduction', 'Memory', 'Observability'], accent: 'from-cyan-300/25 via-sky-400/10 to-transparent' },
  { title: 'Architecture authority', eyebrow: 'Verified capability', description: 'Owned high-level design, data schemas, technical roadmaps, and durable MVVM/MVI patterns.', icon: Layers3, tags: ['HLD', 'MVVM/MVI', 'Tech strategy'], accent: 'from-amber-200/20 via-orange-300/10 to-transparent' },
]
