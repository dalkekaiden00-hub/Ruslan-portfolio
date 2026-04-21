export type Metric = { label: string; value: string }

export type Project = {
  index:    string
  slug:     string
  codename: string
  title:    string
  kind:     string
  year:     string
  status:   'Shipped' | 'In production' | 'Research preview' | 'Open source'
  team:     string
  role:     string
  summary:  string
  arc: {
    problem:         string
    instrumentation: string
    finding:         string
  }
  highlights: string[]
  metrics:    Metric[]
  scale?:     Metric[]
  stack:      string[]
  architecture: 'atlas' | 'halyard' | 'dispatch' | 'bench' | 'veldt'
  links?:     { label: string; href: string }[]
}

export const projects: Project[] = [
  /* ────────────────────── 01 ──────────────────────────────── */
  {
    index:    '01',
    slug:     'atlas',
    codename: 'Atlas',
    title:    'Citation-grounded RAG platform for regulated filings',
    kind:     'RAG · Evaluation · Python · Postgres',
    year:     '2025',
    status:   'In production',
    team:     '4 engineers · 1 PM · 2 SMEs',
    role:     'Tech lead · architecture + retrieval + eval',
    summary:
      'A retrieval system over 40,000 pages of regulatory filings where every answer is traceable to a specific paragraph. Trust, not raw accuracy, was the optimization target.',
    arc: {
      problem:
        'Analysts needed answers they could defend in a compliance review. Off-the-shelf RAG returned plausible prose without durable citations — unusable in regulated work where an unverifiable sentence is worse than no sentence at all.',
      instrumentation:
        'Dual-retriever pipeline (dense + BM25 with reciprocal rank fusion), deterministic chunk IDs bound to document offsets, a hand-labeled eval set of 500 queries, and an answer-faithfulness judge that gates every release through CI.',
      finding:
        'Faithfulness, not top-k recall, was the correct north-star. Optimising for it lifted the faithful-answer rate from 62 % to 94 % across three model swaps without changing the retriever — the pipeline became model-portable.',
    },
    highlights: [
      'Deterministic chunk IDs derived from page/paragraph offsets, so a citation still resolves after re-indexing.',
      'Hybrid retrieval with reciprocal rank fusion out-performed pure dense on long-tail regulator terminology.',
      'LLM-judge faithfulness metric paired with an inter-annotator agreement study before it was trusted to gate releases.',
      'Cold-cache p95 under 2 seconds with streaming first-token render at ~300 ms.',
      'Model-agnostic: swapped the generation layer twice (OpenAI → Anthropic → mixed routing) with zero retrieval-layer changes.',
    ],
    metrics: [
      { label: 'Faithful-answer rate', value: '94 %'     },
      { label: 'p95 latency',           value: '1.8 s'   },
      { label: 'Eval coverage',         value: '500 qs'  },
      { label: 'Cost / query',          value: '$0.004'  },
    ],
    scale: [
      { label: 'Documents',  value: '40k pages' },
      { label: 'Chunks',     value: '~620k'     },
      { label: 'Daily queries', value: '~3,200' },
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'LangChain', 'OpenAI', 'Anthropic', 'Redis', 'Docker', 'Terraform'],
    architecture: 'atlas',
  },

  /* ────────────────────── 02 ──────────────────────────────── */
  {
    index:    '02',
    slug:     'halyard',
    codename: 'Halyard',
    title:    'Typed agent platform with replayable traces',
    kind:     'Agents · Platform · TypeScript · OpenTelemetry',
    year:     '2024',
    status:   'Shipped',
    team:     '3 engineers',
    role:     'Architect · tool runtime + observability',
    summary:
      'A strongly-typed tool-use framework that let non-engineers compose reliable automations across six internal APIs. Replaced a brittle no-code layer that was silently failing at scale.',
    arc: {
      problem:
        'Ops teams were stitching Zapier flows that broke invisibly under load. Every new workflow went through engineering, and every failure landed in a Slack channel with no trace. The no-code layer had become the bottleneck and the outage surface at once.',
      instrumentation:
        'Designed a typed tool registry with runtime Zod schema validation, emitted structured OpenTelemetry spans for every call, and shipped a replay harness that could re-run any production failure as a deterministic test fixture.',
      finding:
        'Observability-first design out-performed model upgrades. Ninety percent of failures were malformed inputs, not model mistakes — fixable at the schema layer before any LLM was ever called.',
    },
    highlights: [
      'Every tool is defined once with a Zod schema; runtime validation + TS types + OpenAPI spec are generated from the same source.',
      'Traces carry tool-call inputs, outputs, and model reasoning as spans — replayable with the same seeds that produced the failure.',
      'Budgeted execution: each workflow declares a max token, max cost, and max wall-clock that the runtime enforces.',
      'Multi-tenant isolation on the tool registry — Finance and CX can ship workflows without seeing each other’s schemas.',
      'Dry-run mode: workflows can be evaluated against production inputs with side effects stubbed before cutover.',
    ],
    metrics: [
      { label: 'Workflows shipped',    value: '47'           },
      { label: 'Silent-failure rate',  value: '< 0.5 %'      },
      { label: 'Mean time to replay',  value: '45 s'         },
      { label: 'Engineer-hours saved', value: '~1,200 / qtr' },
    ],
    scale: [
      { label: 'Tools in registry', value: '78'      },
      { label: 'Tenants',           value: '12'      },
      { label: 'Traces / day',      value: '~380k'   },
    ],
    stack: ['TypeScript', 'Node.js', 'Zod', 'OpenTelemetry', 'PostgreSQL', 'Temporal', 'Next.js', 'tRPC'],
    architecture: 'halyard',
  },

  /* ────────────────────── 03 ──────────────────────────────── */
  {
    index:    '03',
    slug:     'dispatch',
    codename: 'Dispatch',
    title:    'Cascaded triage classifier at 40k tickets / day',
    kind:     'Fine-tune · Serving · Active learning',
    year:     '2023',
    status:   'In production',
    team:     '2 engineers',
    role:     'IC · training + serving',
    summary:
      'A small-model / large-model cascade that routes 40,000 tickets a day under a 250 ms latency budget, fine-tuned on a messy, imbalanced corpus with active-learning cycles.',
    arc: {
      problem:
        'A single large model per ticket was too slow and too expensive at volume. The latency budget was 250 ms end-to-end; the cost budget was a tenth of a cent.',
      instrumentation:
        'Cascaded a fine-tuned encoder against a fallback LLM for the low-confidence tail. Trained on 80,000 labeled tickets with weekly active-learning cycles. Shadow-deployed for six weeks alongside the old system before any cutover.',
      finding:
        'Cost dropped 11× against the pure-LLM baseline with equivalent F1. The shadow period caught three label-schema bugs that would have silently regressed production — the shadow was worth more than the model.',
    },
    highlights: [
      'Confidence-calibrated cascade: 83 % of tickets classified by the 40M-param encoder, the rest routed to the LLM fallback.',
      'Active-learning loop surfaces low-confidence + high-disagreement tickets to a labeling queue weekly.',
      'Per-class F1 dashboards caught a silent data-drift on a minority class two weeks before it would have paged ops.',
      'Model artefact versioning + automated canary with automatic rollback on F1 regression > 1 %.',
      'p99 stays under 400 ms even on cold cache via pinned-GPU warm pool and request coalescing.',
    ],
    metrics: [
      { label: 'p95 latency',       value: '190 ms'   },
      { label: 'p99 latency',       value: '380 ms'   },
      { label: 'Cost / request',    value: '$0.00038' },
      { label: 'Weighted F1',       value: '0.92'     },
    ],
    scale: [
      { label: 'Tickets / day',  value: '40k'    },
      { label: 'Labeled corpus', value: '80k'    },
      { label: 'Classes',        value: '34'     },
    ],
    stack: ['Python', 'PyTorch', 'Hugging Face', 'Redis', 'AWS (SageMaker, ECS)', 'Triton Inference Server'],
    architecture: 'dispatch',
  },

  /* ────────────────────── 04 ──────────────────────────────── */
  {
    index:    '04',
    slug:     'bench',
    codename: 'Bench',
    title:    'LLM evaluation harness wired into CI',
    kind:     'Evals · Platform · CI/CD',
    year:     '2024',
    status:   'In production',
    team:     '2 engineers',
    role:     'Architect · eval framework + judge calibration',
    summary:
      'An eval platform that turned model regressions into build failures. Every PR that touches prompt, retriever, or model config runs the evals that matter for the surface it affects — and blocks on regression.',
    arc: {
      problem:
        'Prompt and model changes were shipped on vibes. Regressions surfaced days later in user reports, and there was no statistical story for "it got better." Eval work was happening in notebooks that nobody re-ran.',
      instrumentation:
        'Built a Pytest-style harness with 1,200 eval cases across four products, a router that selects relevant suites per PR, LLM-as-judge scoring paired with semantic similarity and deterministic checks, and a GitHub Actions gate that blocks on a > 2 % faithfulness drop with paired-test significance.',
      finding:
        'Judges drift. Baking in a quarterly judge-calibration run — re-grading a golden set against new judge versions — caught three silent judge regressions that would have corrupted the eval history.',
    },
    highlights: [
      'Suite router: only the evals relevant to a PR run, based on touched files and surface tags — CI stays under 4 minutes.',
      'Hybrid scoring: deterministic unit checks first, then semantic similarity, then LLM-judge — each layer cheaper than the next.',
      'Paired-test significance on faithfulness deltas; one-off flukes don’t trip the gate.',
      'Judge calibration: quarterly re-grade of a frozen golden set to detect judge drift across model upgrades.',
      'Cost-aware: dev-branch runs use a cheap judge; release-branch runs use the expensive one.',
    ],
    metrics: [
      { label: 'Eval cases',          value: '1,200+' },
      { label: 'Median CI time',      value: '3.4 min' },
      { label: 'Regressions caught',  value: '18'     },
      { label: 'False-gate rate',     value: '< 1 %'  },
    ],
    scale: [
      { label: 'Products covered', value: '4'    },
      { label: 'Suites',           value: '26'   },
      { label: 'Judges',           value: '3'    },
    ],
    stack: ['Python', 'Pytest', 'pgvector', 'OpenAI', 'Anthropic', 'GitHub Actions', 'DuckDB'],
    architecture: 'bench',
  },

  /* ────────────────────── 05 ──────────────────────────────── */
  {
    index:    '05',
    slug:     'veldt',
    codename: 'Veldt',
    title:    'Open-source streaming AI chat SDK',
    kind:     'Full-stack · SDK · Streaming',
    year:     '2024 — 2025',
    status:   'Open source',
    team:     'Solo + ~40 community contributors',
    role:     'Creator · maintainer · protocol + runtime',
    summary:
      'A React SDK and FastAPI backend for building production AI chat in a weekend: streaming tool-use, session memory backed by pgvector, multi-tenant auth, pluggable model backends.',
    arc: {
      problem:
        'Every product team was reinventing the same streaming-chat scaffolding — SSE reconnect logic, tool-call rendering, session memory, auth scoping. The work wasn’t interesting and everyone was getting it subtly wrong.',
      instrumentation:
        'Shipped a typed SDK and a reference backend as two packages with a shared protocol spec: streaming envelopes, tool-call state machine, session memory over pgvector, and a pluggable provider interface (OpenAI, Anthropic, Ollama).',
      finding:
        'The protocol was the product. Once the envelope spec was stable, backends and frontends could evolve independently — and third parties started shipping alt-backends (Ollama, local llama.cpp) the same week.',
    },
    highlights: [
      'Token-level SSE with reconnect + replay buffer — if the client disconnects mid-stream, it resumes from the last committed token.',
      'Tool-call state machine: pending / streaming-args / executing / streamed-result — each state is a stable React hook target.',
      'Session memory: pgvector-backed with per-thread TTL and a cheap summarization step that keeps context under 4k tokens.',
      'Multi-tenant: scoped API keys, per-key rate limits, vector-table partitioning — safe to expose to end-user traffic.',
      'Adopted internally by 3 product teams and 12 external projects before I stopped counting.',
    ],
    metrics: [
      { label: 'GitHub stars',     value: '~430'   },
      { label: 'Downstream apps',  value: '15+'    },
      { label: 'Protocol versions',value: 'v3'     },
      { label: 'Bundle size',      value: '14 kB'  },
    ],
    scale: [
      { label: 'Packages',    value: '3' },
      { label: 'Contributors', value: '~40' },
      { label: 'Backends',    value: '4 (OpenAI · Anthropic · Ollama · Azure)' },
    ],
    stack: ['TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'SSE', 'OpenAPI', 'Vercel'],
    architecture: 'veldt',
  },
]
