# AI engineering rounds

These loops fail people who say “we’ll add RAG” with no eval. You already have public numbers. Use them.

## Likely questions

**Eval harness.** How do you know it works?  
Answer with AiStudyHub: 8 sheets, pass = restated the problem, **6/8**. Fail cases stay visible. For ANR: **10/10** labeled traces. Never quote a number you cannot rerun on the page.

**RAG vs agent.**  
RAG when the answer is in documents. Agent when you need tools and a stop condition. Most Android features are one structured call. Agents are for multi-step with cancellation (ADK study, not a product you shipped — say that).

**Tool-calling failure modes.**  
Wrong tool, loop, timeout, PII in the payload, process death mid-hop. Treat tools like Binder: least privilege, audit. Unbounded loops are an ANR with extra tokens.

**Latency and cost.**  
On-device: RAM ≈ 1.6× weights + KV; thermal bands. Cloud: tokens + RTT. Point at the [budget demo](https://ashishsingh009.github.io/portfolio/demos/ai-budget/) (12 rows). Gemma 9B Q4 on 6 GB is a no-go in that table.

**On-device constraints.**  
Missing model pack, 6 GB vs 12 GB, privacy of schoolwork, main-thread decode = ANR. Same as sync: timeout, retry, visible failure.

**Why you, not a new LLM grad.**  
You have shipped at 100M with observability. AI products die the same way Android products die: silent failure on some devices.

## What not to say

- “I built Google ADK.” (fork)
- “70% ANR” if you only have tech-debt 70% + measurable ANR drop
- “I’m an AI engineer” without a demo
- Fake competing offers in the same breath as architecture
