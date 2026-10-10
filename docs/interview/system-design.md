# System design — Staff / Principal Android + applied AI

Interviewers at AI startups will probe whether you can keep a product up, not whether you can draw a chatbot. Four prompts. Each: requirements → sketch → failure modes they punish.

## 1. Verizon-scale cloud sync (your home field)

**Ask:** Design photo/video backup for 100M Android users.

- **Reqs:** 99.9% visible success, flaky radios, retries that do not duplicate, battery, encryption at rest.
- **Sketch:** device change-log → chunked upload → server cursor / data contracts → download on demand. Explicit conflict rules. WorkManager, not a forever Service. Backpressure when the queue is huge.
- **Punish:** unbounded retries, sync on the main thread, “we’ll use a queue” with no poison-message story, no ANR/memory budget.

**Closer:** “We instrumented ANRs and memory spikes so reliability was observed, not hoped. 100M+ users, 99.9% uptime target.”

## 2. On-device vs cloud inference

**Ask:** Gemma on phone vs Gemini in cloud for a homework photo.

- **Reqs:** privacy of minors’ worksheets, p95 latency, mid-range RAM, offline subway.
- **Sketch:** gate on model pack + RAM (use the [budget demo](https://ashishsingh009.github.io/portfolio/demos/ai-budget/)). On-device default; cloud opt-in. Timeout, retry, user-visible fail. Never block the main thread on decode.
- **Punish:** “just run 9B Q4 on 6 GB,” no thermal band, no missing-model UX.

## 3. ANR pipeline

**Ask:** Detect and triage freezes before Play reviews.

- **Sketch:** client traces + alerting → classify (timeout / leak / deadlock) → owner + next probe. Same classes as the [live triage demo](https://ashishsingh009.github.io/portfolio/demos/anr-triage/) (10/10 fixtures).
- **Punish:** “we’ll look at Firebase Crashlytics” with no freeze vs crash split, no budget for dump size.

## 4. Agent loop with cancellation

**Ask:** Tool-using agent on Android.

- **Sketch:** bounded hops, user-visible progress, cancel = kill the job, every tool call traced, stop when not converging. Tools are IPC: least privilege.
- **Punish:** unbounded while(model.wantsTool), credentials in the prompt, no eval.

### 30-second board template

1. Users and SLO  
2. Data contracts  
3. Failure + retry  
4. Observation (ANR, tokens, hops)  
5. Privacy  
6. What you would measure this week
