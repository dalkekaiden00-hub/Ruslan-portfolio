# Reference material — senior AI fullstack projects

These are inspiration only. Not displayed on the portfolio. Browse them to decide
what screenshots, diagrams, or UI patterns you want for your own projects when
you're ready to add your real work.

The images here are GitHub OpenGraph previews (repo cards) — they don't replace
real screenshots, they just give you a visual index of similar projects worth
studying.

## Project → reference mapping

### § 01 Atlas — Citation-grounded RAG
- `atlas-langfuse.png` — https://github.com/langfuse/langfuse · trace-level observability for LLM pipelines
- `atlas-langchain.png` — https://github.com/langchain-ai/langchain · retrieval primitives, chains, agents
- `atlas-llamaindex.png` — https://github.com/run-llama/llama_index · document ingestion + indexing patterns
- `atlas-pgvector.png` — https://github.com/pgvector/pgvector · the vector extension Atlas runs on

### § 02 Halyard — Typed agent platform
- `halyard-autogen.png` — https://github.com/microsoft/autogen · agent orchestration framework
- (add a reference of your own: https://github.com/joaomdmoura/crewAI · role-based agents)

### § 03 Dispatch — Cascaded classifier
- `dispatch-openai-cookbook.png` — https://github.com/openai/openai-cookbook · serving + cost patterns
- `dispatch-triton.png` — https://github.com/triton-inference-server/server · the inference server Dispatch runs on

### § 04 Bench — LLM eval harness
- `bench-promptfoo.png` — https://github.com/promptfoo/promptfoo · CI-integrated LLM evals
- `bench-ragas.png` — https://github.com/explodinggradients/ragas · RAG-specific metrics
- `bench-phoenix.png` — https://github.com/Arize-ai/phoenix · LLM observability + evals

### § 05 Veldt — Streaming chat SDK
- `veldt-vercel-ai-chatbot.png` — https://github.com/vercel/ai-chatbot · the canonical Next.js AI chat
- `veldt-assistant-ui.png` — https://github.com/Yonom/assistant-ui · headless React chat primitives
- `veldt-litellm.png` — https://github.com/BerriAI/litellm · provider abstraction layer

## When you replace placeholder content with real work

Drop your own screenshots into `public/projects/` one level up (not this folder)
using names like `01-atlas.png`, `02-halyard.png`, etc. Then wire them into
`components/sections/Work.tsx` in place of (or alongside) the SVG architecture
diagrams.

Recommended screenshot ideas per project:
- **Atlas** — the citation UI, a trace from Langfuse, the faithfulness eval dashboard
- **Halyard** — an OTel trace waterfall, the tool registry UI, a replay comparison
- **Dispatch** — latency histograms, cascade routing diagram, F1 by class
- **Bench** — a CI check blocking a PR, a paired-t-test plot, a judge calibration curve
- **Veldt** — the SDK quickstart, the streaming envelope spec, a live chat demo
