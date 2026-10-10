import { Activity, BrainCircuit, Calculator, DatabaseZap, FileText, Layers3, ServerCog, Smartphone, type LucideIcon } from 'lucide-react'

export const siteConfig = {
  name: 'Ashish Singh',
  location: 'Bengaluru, India',
  email: 'sync.ashishsingh@outlook.com',
  github: 'https://github.com/ashishsingh009',
  linkedin: '',
  canonical: 'https://ashishsingh009.github.io/portfolio/',
  resume: './resume.pdf',
  roles: ['Android Architect', 'Mobile Platform Architect'],
}

export type EvidenceStatus = 'production' | 'prototype' | 'research' | 'study-fork'

export const statusCopy: Record<EvidenceStatus, string> = {
  production: 'Production',
  prototype: 'Prototype',
  research: 'Research',
  'study-fork': 'Study / fork',
}

export type Project = {
  slug: string
  title: string
  summary: string
  architectureLine: string
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

export const proofStats = [
  { value: '14+', label: 'Years', detail: 'building mobile platforms' },
  { value: '100M+', label: 'Users', detail: 'across production systems' },
  { value: '99.9%', label: 'Uptime', detail: 'reliability at scale' },
  { value: '70%', label: 'Tech-debt cut', detail: 'plus measurable ANR improvement' },
] as const

export const engineeringApproach = [
  {
    title: 'Architecture before orchestration',
    copy: 'On Verizon Cloud, high-level design and explicit sync contracts came first. Shared Kotlin/KMP patterns (MVVM/MVI) only landed after the data model and failure boundaries were clear — the same order I use when an agent wants a tool loop.',
  },
  {
    title: 'Evaluation before confidence',
    copy: 'Reliability was treated as an observed outcome: automated alerting for ANRs and memory spikes, then fixes in production paths. I will not claim an AI workflow “works” without a similar eval path — even if the current prototype only has a qualitative rubric.',
  },
  {
    title: 'Privacy and failure recovery by design',
    copy: 'Cloud backup is private content on imperfect networks. Sync had to degrade, retry, and stay correct. On-device and agentic AI has the same constraint: no silent hallucination, no unbounded battery spend, and a defined fallback when the model or the network fails.',
  },
]

export const projects: Project[] = [
  {
    slug: 'anr-triage',
    title: 'ANR Triage Agent',
    summary: 'Paste a production Android log. A heuristic agent classifies ANR vs leak vs deadlock vs unknown and names the next probe — 10/10 on a labeled fixture set, median <50 ms in-browser.',
    architectureLine: 'Log text → signal extractors (timeout, lock cycle, OOM) → class + next probe. No API key. Eval table is on the same page.',
    status: 'prototype',
    tags: ['ANR', 'Agents', 'Android', 'Eval'],
    icon: Activity,
    problem: 'On-call Android engineers still grep traces.txt by hand. At 100M-user scale that delay is store reviews. Generic chatbots do not know Input dispatching timed out from a lock convoy.',
    usersAndUseCase: 'Staff/Principal Android and SRE-adjacent mobile engineers who get a freeze dump and need a first classification in under a minute before they open Android Studio.',
    solution: 'An in-browser triage agent with explicit classes and a next probe. Heuristic first so the demo stays live without secrets. Optional LLM hop is documented as future work, not a fake production brain.',
    architecture: 'Client-only: regex/signal table → priority (deadlock beats generic ANR) → badge + probe. Fixtures and labels ship in the same HTML so anyone can rerun precision.',
    stack: ['Vanilla JS', 'GitHub Pages', 'Android log fixtures'],
    contribution: 'Problem framing from Verizon Cloud ANR work, fixture labels, classifier, eval harness, live deploy.',
    modelStrategy: 'No model in v1. The “agent” is a constrained classifier with a stop condition. An LLM would only rewrite the probe, not invent a class.',
    retrievalOrTools: 'Tools are the signal extractors. No unbounded loop.',
    evaluation: '10 labeled fixtures. Result: 10/10 correct, median 0.02–50 ms depending on device. Lab number, not an SLO.',
    results: 'Live demo. 10/10 fixture precision. Median in-browser triage well under 50 ms on this page.',
    latencyAndCost: 'Zero tokens. Cost is one static page.',
    limitations: 'English logcat idioms. Will miss vendor-specific dumps. Heuristic will not replace a heap dump.',
    securityAndPrivacy: 'Logs never leave the tab.',
    nextImprovements: 'Optional Gemini rewrite of the probe; more OEM dump formats; a 50-trace set.',
    githubUrl: 'https://github.com/Ashishsingh009/portfolio',
    demoUrl: '/demos/anr-triage/',
  },
  {
    slug: 'aistudyhub-gallery',
    title: 'AiStudyHub eval gallery',
    summary: 'Worksheet → walkthrough with a fail rubric. 8 labeled sheets, 6/8 read-the-problem (75%). Live Gemini is optional and local-key only.',
    architectureLine: 'Gallery of labeled sheets + pass/fail. Optional browser call to Gemini with a user-supplied key; CI never holds a secret.',
    status: 'prototype',
    tags: ['Gemma', 'Eval', 'Education', 'Gemini'],
    icon: Smartphone,
    problem: 'Homework solvers look magical until they answer a different question. Parents need the model to restate the problem first.',
    usersAndUseCase: 'Students and parents on a phone; this web gallery is the measurable stand-in until the Android APK is the live path.',
    solution: 'Published rubric: pass = walkthrough restates the actual problem. Two documented fails (two-part sheet, truncated handwriting).',
    architecture: 'Static eval set in HTML. Optional fetch to generativelanguage.googleapis.com using a key that never hits our servers.',
    stack: ['GitHub Pages', 'Gemini optional', 'Rubric eval'],
    contribution: 'Original AiStudyHub product idea; this gallery is the first public number (6/8).',
    modelStrategy: 'Restate-then-walk. If unreadable, say so — the two fails exist because the model (or a stand-in writeup) did not.',
    retrievalOrTools: 'Camera is the tool on Android; here the tool is the labeled sheet.',
    evaluation: '8 sheets. 6 pass, 2 fail. 75% read-correct. Fail cases stay on the page.',
    results: '6/8 pass. Live gallery. Android repo still the original prototype.',
    latencyAndCost: 'Gallery is free. Live Gemini is the user’s quota.',
    limitations: 'Sheets are typed stand-ins for photos except the two fail cases. Not a production OCR benchmark.',
    securityAndPrivacy: 'No schoolwork uploaded unless the user pastes a key and a problem themselves.',
    nextImprovements: 'Real worksheet photos, on-device Gemma timing, academic-integrity mode.',
    githubUrl: 'https://github.com/Ashishsingh009/AiStudyHub',
    demoUrl: '/demos/aistudyhub/',
  },
  {
    slug: 'ai-budget',
    title: 'On-device AI budget',
    summary: 'RAM / tokens / thermal band before you ship Gemma or Gemini Nano. 12 device×model rows. Method is on the page.',
    architectureLine: 'Working set ≈ 1.6× weights + KV; tokens/min from a decode curve × device multiplier; three bands: fits / thermal-risk / no-go.',
    status: 'prototype',
    tags: ['On-device', 'Gemma', 'Cost', 'Mobile'],
    icon: Calculator,
    problem: 'Teams pick a 9B Q4 checkpoint for a 6 GB phone and discover thermal throttling in QA. There was no budget.',
    usersAndUseCase: 'Android PMs and platform leads deciding Nano vs Gemma 2B vs cloud Flash.',
    solution: 'Interactive estimator plus a 12-row published table, including an Android Emulator Pixel 8 profile row.',
    architecture: 'Client formulas only. No telemetry.',
    stack: ['GitHub Pages', 'Public model-card sizes'],
    contribution: 'Model, table, bands, and the honesty that only the emulator row was runnable in this environment.',
    modelStrategy: 'N/A — this is a budget tool, not a generator.',
    retrievalOrTools: 'None.',
    evaluation: '12 rows generated from the same formulas the calculator uses. Sensitivity is documented (1.6× weights).',
    results: '12 published rows. Gemma 2 9B Q4 is no-go on 6 GB; Nano-class fits flagship 8 GB with thermal-risk on mid-range.',
    latencyAndCost: 'Static page.',
    limitations: 'Not a 20-phone lab. KV formula is approximate. Cloud row ignores network jitter.',
    securityAndPrivacy: 'No user data.',
    nextImprovements: 'One physical mid-range and one flagship measurement to replace the emulator multiplier.',
    githubUrl: 'https://github.com/Ashishsingh009/portfolio',
    demoUrl: '/demos/ai-budget/',
  },
  {
    slug: 'aistudyhub',
    title: 'AiStudyHub',
    summary: 'An original Android prototype: photograph a homework problem and get a descriptive Gemma analysis for students and parents.',
    architectureLine: 'Camera capture → image-to-model path → Gemma analysis → readable solution, with on-device vs cloud as an explicit tradeoff.',
    status: 'prototype',
    tags: ['Gemma', 'On-device AI', 'Android', 'Education'],
    icon: Smartphone,
    problem: 'Students and parents often need a step-by-step explanation of a printed or handwritten problem, not a one-line answer. Existing chat apps assume typed text, a laptop, and a willingness to paste private schoolwork into a generic chatbot.',
    usersAndUseCase: 'Primary users are students and parents who can photograph a problem from a workbook or whiteboard and want a descriptive solution they can follow. The interaction has to work on a phone, with poor lighting, messy handwriting, and interrupted connectivity.',
    solution: 'AiStudyHub is a mobile workflow: capture the problem, send it through a Gemma-centered analysis path, and return a descriptive solution rather than a short answer. The prototype exists to learn model, latency, and UX constraints on Android — not as a shipped education product.',
    architecture: 'Capture (camera / gallery) → preprocessing of the problem image → Gemma inference (local or remote, depending on device class) → structured explanation back to the UI. Client state has to survive process death and failed inference the way any production Android screen would.',
    stack: ['Kotlin', 'Android', 'Gemma', 'On-device / edge inference'],
    contribution: 'Original prototype and product framing. I defined the capture-to-explanation loop, the student/parent use case, and the constraint set (latency, battery, privacy of schoolwork) that a production version would have to meet.',
    modelStrategy: 'Gemma as the analysis model because it is a practical open-weight family for mobile experiments. Prompts ask for a descriptive walkthrough, not a graded answer key. Image understanding quality depends on crop, lighting, and whether the problem is typed or handwritten.',
    retrievalOrTools: 'No document RAG in v1. The “tool” is the camera. Future work could add a curriculum-grounded retrieval layer so explanations stay at the right grade level.',
    evaluation: 'Qualitative rubric so far: did the model read the problem, did the steps match the question, was the language usable by a parent. No published accuracy number yet — that is the next research step, not a claim.',
    results: 'Working prototype and public repository. No production user metrics. The useful result is a concrete Android AI surface I can reason about under device constraints.',
    latencyAndCost: 'On-device inference trades accuracy and model size for privacy and offline behavior; a cloud Gemma path trades cost and round-trip latency for a larger model. Neither is free on a mid-range Android device — thermal and battery budgets show up immediately.',
    limitations: 'Handwriting, multi-part questions, non-English worksheets, and cheating/academic-integrity concerns are unsolved. The README still overstates “Gemma4”; the honest status is an early prototype, not a benchmarked model choice.',
    securityAndPrivacy: 'Schoolwork photos are sensitive, especially for minors. A production build would keep capture on-device by default, avoid logging images, and make any cloud inference an explicit, opt-in path with retention limits.',
    nextImprovements: 'A labeled set of worksheet photos, a pass/fail eval for “read the problem correctly,” on-device vs cloud A/B on latency and battery, and a clear academic-integrity mode that explains rather than completing take-home tests.',
    githubUrl: 'https://github.com/Ashishsingh009/AiStudyHub',
  },
  {
    slug: 'adk-agent-study',
    title: 'Agentic workflows with Google ADK',
    summary: 'A study fork of Google’s Agent Development Kit samples — used to learn multi-step tool use, not presented as a shipped product.',
    architectureLine: 'Planner / tool-using agent → tools → observation → next step, with explicit failure when a tool is wrong or the loop should stop.',
    status: 'study-fork',
    tags: ['Google ADK', 'Agents', 'Tool use', 'Study'],
    icon: BrainCircuit,
    problem: 'A single LLM call cannot own a multi-step workflow with tools, retries, and a stop condition. I needed a grounded way to learn how agent frameworks actually structure that loop before proposing anything on Android.',
    usersAndUseCase: 'This is a learning artifact for me as an Android platform engineer. The intended future user is an internal or product workflow where an agent can call tools, but a human still owns correctness.',
    solution: 'I forked google/adk-samples and worked through sample agents: how they declare tools, how they pass observations back, and where a demo loop would be unsafe in production. The case study documents that study — it does not claim original sample authorship.',
    architecture: 'Upstream ADK samples: agent definition, tool registry, run loop, and session state. My reading notes focus on what would have to change on a mobile client: timeouts, cancellation, user-visible progress, and a hard stop when the agent is not converging.',
    stack: ['Google ADK', 'Python samples', 'Tool-calling agents'],
    contribution: 'Study and annotation of upstream samples. I did not write the original Google sample agents. What I own is the translation: which patterns survive contact with Android process lifetime, ANRs, and observability.',
    modelStrategy: 'Sample agents typically wrap a general LLM with tool schemas. The interesting part is not the prompt — it is when the model is allowed to call a tool versus when it must return control.',
    retrievalOrTools: 'Tools are first-class: the agent proposes a call, the runtime executes, the observation comes back. That is the piece I would productionize carefully on Android (no unbounded tool loops, no silent side effects).',
    evaluation: 'No benchmark of my own. Evaluation questions I keep: did the agent finish, did it call the wrong tool, did it loop, and would a user have been able to cancel. Those are the same questions I ask of flaky Android jobs.',
    results: 'Study notes and a public fork. No production agent, no latency/cost dashboard, no customer metric.',
    latencyAndCost: 'Each tool hop is a round trip plus model tokens. On mobile, that cost shows up as battery, cellular data, and UI jank if the loop is tied to the main thread. I would budget hops the way I budget sync retries.',
    limitations: 'Fork of Google samples, not an original framework. Sample happy paths hide auth, PII in tool payloads, and eval. Claiming “I built ADK” would be false; this page does not.',
    securityAndPrivacy: 'Tool-calling agents can exfiltrate whatever they can read. A production port would treat tools like IPC surfaces: least privilege, no ambient credentials, and audit logs.',
    nextImprovements: 'A thin Android client that drives one ADK-style loop with cancellation, a trace of every tool call, and a stop policy. Then a real eval set — not another demo.',
    githubUrl: 'https://github.com/Ashishsingh009/adk-samples',
  },
  {
    slug: 'android-ai-samples',
    title: 'Android AI samples',
    summary: 'A study fork of android/ai-samples — Gemini and on-device generative patterns under real Android constraints.',
    architectureLine: 'Jetpack / Gemini / ML Kit GenAI APIs on a standard Android sample app: permissions, lifecycle, and device-class fallbacks included.',
    status: 'study-fork',
    tags: ['Gemini', 'ML Kit GenAI', 'Jetpack', 'Study'],
    icon: FileText,
    problem: 'On-device and Gemini-on-Android samples are the fastest way to see what Google actually supports in-process: model availability, API surface, and the gap between a codelab and a product.',
    usersAndUseCase: 'Developers (including me) using official Android AI samples to understand Gemini APIs, ML Kit GenAI, and how those APIs behave across device classes. End users of a future product would only see a reliable, permission-aware feature — not the sample scaffolding.',
    solution: 'I forked android/ai-samples to read and run the official patterns. The case study records what is upstream versus what I would carry into a product: lifecycle, fallbacks when a model is missing, and performance budgets.',
    architecture: 'Standard Android sample modules around Gemini and on-device generative APIs. UI is Compose or View-based per sample; the important architecture is the inference client, the permission/model-availability gate, and the UI state when inference is slow or unavailable.',
    stack: ['Kotlin', 'Jetpack', 'Gemini APIs', 'ML Kit GenAI'],
    contribution: 'Study of upstream Android AI samples. Original sample code is Google’s. My contribution is the production reading: ANR risk, model download, privacy of on-device vs cloud Gemini, and what I would reuse in AiStudyHub.',
    modelStrategy: 'Use the platform’s recommended model path (Gemini / GenAI APIs) instead of inventing a custom runtime first. Swap only when device constraints demand a smaller open-weight model such as Gemma.',
    retrievalOrTools: 'Samples are mostly single-turn generation and on-device features, not agent tool loops. That contrast is useful: not every Android AI feature should be an agent.',
    evaluation: 'Run on a physical device and note: time-to-first-token, whether the UI janks, what happens when the model pack is missing, and whether permissions are obvious. No published numbers from this study yet.',
    results: 'Public fork used as a lab. No Play-shipped AI feature and no claimed user metric from these samples.',
    latencyAndCost: 'On-device is latency- and thermal-bound; Gemini cloud is token- and network-bound. Sample apps rarely show a cost dashboard — a product would have to.',
    limitations: 'Study fork. I do not present Google’s samples as my product. Device coverage is incomplete; flagship vs mid-range behavior will differ.',
    securityAndPrivacy: 'On-device inference is the privacy-preferring path. Cloud Gemini requires a clear disclosure. Samples that send images or text off-device would need a production privacy review before any real user data.',
    nextImprovements: 'Extract a small “inference client” from the samples into AiStudyHub with model-unavailable UX, and document measured latency on one mid-range and one flagship device.',
    githubUrl: 'https://github.com/Ashishsingh009/ai-samples',
  },
]

export type Note = {
  slug: string
  title: string
  date: string
  kind: 'prototype' | 'experiment' | 'production observation'
  summary: string
  body: string[]
}

export const notes: Note[] = [
  {
    slug: 'gemma-on-device-tradeoffs',
    title: 'Gemma on a phone is a budget, not a demo',
    date: '2026',
    kind: 'prototype',
    summary: 'AiStudyHub made the usual on-device vs cloud split concrete: privacy and offline behavior versus model quality, heat, and time-to-answer.',
    body: [
      'Photographing a worksheet looks simple until the model has to read it. A larger cloud Gemma (or Gemini) path is more likely to parse a messy page; an on-device path keeps schoolwork on the device and still works on a train. Both are valid. Pretending they are free is not.',
      'The production habits that matter are the same ones I already use for sync: a timeout, a retry with backoff, a user-visible failure, and no work on the main thread that can ANR. Inference is just another expensive background job with a worse failure mode — a fluent wrong answer.',
      'Next measurement I want, before any marketing language: time-to-first-token, total energy for one capture, and a pass/fail on “did we read the problem.” Until those exist, AiStudyHub stays labeled as a prototype.',
    ],
  },
  {
    slug: 'adk-vs-single-call',
    title: 'ADK vs a single LLM call',
    date: '2026',
    kind: 'experiment',
    summary: 'Google ADK samples are useful because they make tool hops explicit. A single completion is cheaper; an agent is only justified when the work is actually multi-step.',
    body: [
      'Most Android AI features I would ship are still one call with a tight schema: summarize this, classify that, draft a reply. An agent loop is for work that needs tools, intermediate state, and a stop condition.',
      'The ADK samples (upstream, which I forked to study) show the structure: declare tools, run, observe, repeat. The production question is not “can the model call a tool?” It is “what happens on hop 7, on a killed process, or when the tool returns garbage?”',
      'That is the same class of problem as a flaky sync worker. I would not put an unbounded agent on a user-facing Android screen without cancellation, a trace, and a budget. The study fork is how I am learning those failure modes before proposing them at work.',
    ],
  },
  {
    slug: 'anr-habits-for-agent-loops',
    title: 'ANR and observability habits apply to agent loops',
    date: '2026',
    kind: 'production observation',
    summary: 'Verizon Cloud reliability work — ANRs, memory, alerting — is the template I want for any agentic or on-device AI path.',
    body: [
      'At 100M+ user scale, “it worked on my device” is not an argument. We instrumented ANRs and memory spikes so we could see failures before they became store reviews. Agent loops fail the same way: silently, on some devices, after a few hops.',
      'If I productionized AiStudyHub or an ADK-style client, I would want the same pipeline: traces for every inference and tool call, freeze detection around the UI, and a kill switch when error rates move. Evaluation is observability with a rubric.',
      'This is why I am not leading this site as an “AI Engineer.” The production proof I can stand behind is Android platform work. The AI work is research with repositories attached, and it will earn stronger claims only after it has measurements.',
    ],
  },
]

export const career = [
  ['2020 — Present', 'Senior Software Engineer III', 'Synchronoss Technology'],
  ['2019 — 2020', 'Senior Consultant', 'Xebia IT Architect India'],
  ['2018 — 2019', 'Android Team Lead', 'Wipro'],
  ['2017 — 2018', 'Senior Software Engineer', 'Source Soft Solutions'],
  ['2015 — 2017', 'Senior Software Engineer', 'Prospus Consulting'],
  ['2012 — 2015', 'Software Engineer', 'Xantatech Pvt Ltd'],
] as const

export const skillGroups = [
  {
    title: 'Android platforms',
    copy: 'The production core: architecture, Kotlin, and systems that stay up for a very large user base.',
    icon: Smartphone,
    skills: ['Kotlin', 'Jetpack Compose', 'KMP', 'MVVM / MVI', 'Jetpack'],
  },
  {
    title: 'Reliability at scale',
    copy: 'ANRs, memory, concurrency, and observability — treated as product outcomes, not afterthoughts.',
    icon: ServerCog,
    skills: ['ANR diagnosis', 'Memory', 'Coroutines / Flow', 'Alerting', 'TDD'],
  },
  {
    title: 'On-device and mobile AI',
    copy: 'Applied research on inference that has to respect latency, privacy, battery, and missing models.',
    icon: DatabaseZap,
    skills: ['Gemma', 'Gemini APIs', 'ML Kit GenAI', 'On-device inference'],
  },
  {
    title: 'Agentic systems (study)',
    copy: 'Learning multi-step tool use with Google ADK samples, then asking what would survive Android production constraints.',
    icon: BrainCircuit,
    skills: ['Google ADK', 'Tool use', 'Eval mindset', 'Failure recovery'],
  },
]

export const verifiedWork = [
  {
    title: 'Verizon Cloud',
    eyebrow: 'Production · Synchronoss',
    description:
      'Architected high-level design for core cloud synchronization modules and data contracts on a platform serving 100M+ users with a 99.9% uptime target. Kotlin-first engineering with Compose and KMP patterns, plus modernization that cut a large share of technical debt.',
    icon: DatabaseZap,
    tags: ['Cloud sync', 'HLD', '100M+ scale', '99.9% uptime'],
    href: 'https://play.google.com/store/apps/details?id=com.vcast.mediamanager',
    accent: 'from-violet-400/30 via-fuchsia-400/10 to-transparent',
  },
  {
    title: 'Performance engineering',
    eyebrow: 'Verified capability',
    description:
      'Diagnosed ANRs, memory leaks, and concurrency issues in large-scale Android production. Built alerting and performance monitoring so spikes could be caught before they hit users. Measurable ANR improvement alongside a ~70% reduction in technical debt from legacy modernization.',
    icon: ServerCog,
    tags: ['ANRs', 'Memory', 'Observability'],
    accent: 'from-cyan-300/25 via-sky-400/10 to-transparent',
  },
  {
    title: 'Architecture authority',
    eyebrow: 'Verified capability',
    description:
      'Owned app layout, database schemas, tech-stack choices, and MVVM/MVI patterns in KMP. Partnered with stakeholders on roadmaps so business requirements became deliverable engineering milestones.',
    icon: Layers3,
    tags: ['HLD', 'MVVM/MVI', 'KMP', 'Tech strategy'],
    accent: 'from-amber-200/20 via-orange-300/10 to-transparent',
  },
]
