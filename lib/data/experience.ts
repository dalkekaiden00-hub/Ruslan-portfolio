export type Role = {
  period:  string
  company: string
  role:    string
  scope:   string
  note:    string
  wins?:   string[]
  stack?:  string[]
  current: boolean
}

export const experience: Role[] = [
  {
    period:  '2025 — Present',
    company: 'TwilightCore',
    role:    'Senior AI Engineer',
    scope:   'Tech lead · platform + retrieval · 4-engineer pod',
    note:    'Retrieval-grounded products for regulated industries. Shipped the Atlas RAG platform and the eval harness that gates every release.',
    wins: [
      'Lifted faithful-answer rate from 62 % → 94 % on 40k-page compliance corpus.',
      'Designed the CI-integrated eval harness (Bench) now adopted across four products.',
      'Cut generation cost 38 % via hybrid retrieval + model routing, no quality loss.',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'LangChain', 'OpenAI', 'Anthropic', 'AWS'],
    current: true,
  },
  {
    period:  '2023 — 2025',
    company: 'Northvale Systems',
    role:    'Senior AI Engineer → Staff AI Engineer',
    scope:   'Architect · agent tooling + observability · 3-engineer team',
    note:    'Led the internal agent platform (Halyard) and the migration off a no-code workflow layer. Set the observability standards still used by the team.',
    wins: [
      'Shipped 47 automated workflows replacing an outage-prone no-code layer; silent-failure rate dropped below 0.5 %.',
      'Published the internal eval playbook and ran the team’s first judge-calibration study.',
      'Mentored two engineers from mid to senior through case-study writeups and eval reviews.',
    ],
    stack: ['TypeScript', 'Node.js', 'Zod', 'OpenTelemetry', 'PostgreSQL', 'Temporal', 'Next.js'],
    current: false,
  },
  {
    period:  '2021 — 2023',
    company: 'Red Cedar Tech',
    role:    'Full-Stack Engineer → Senior Full-Stack Engineer',
    scope:   'IC · training + serving + product · rotating across 3 squads',
    note:    'Shipped the Dispatch triage classifier and built data products on Python + React across three teams. Pre-LLM muscle memory — types, tests, serving — that makes the current AI work hold up.',
    wins: [
      'Cut ticket-routing cost 11× at 40k/day with a small-model / LLM cascade; p95 190 ms.',
      'Rebuilt the analytics pipeline on DuckDB + dbt; dashboard refresh cut from 45 min to 90 s.',
      'First engineer on the platform auth rewrite; shipped JWT + per-tenant scopes used across 6 products.',
    ],
    stack: ['Python', 'PyTorch', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'Redis'],
    current: false,
  },
  {
    period:  '2018 — 2021',
    company: 'Indigo Labs & contract work',
    role:    'Software Engineer',
    scope:   'IC · backend + data',
    note:    'Backend systems, analytics pipelines, internal developer tooling. Range of contract work that covered three stacks and taught me to read unfamiliar codebases fast.',
    stack: ['Python', 'Django', 'PostgreSQL', 'React', 'Docker', 'GCP'],
    current: false,
  },
]

export type OpenSource = {
  name:    string
  role:    string
  summary: string
  stars?:  string
  href?:   string
}

export const openSource: OpenSource[] = [
  {
    name:    'Veldt',
    role:    'Creator · maintainer',
    summary: 'Open-source React SDK + FastAPI backend for production AI chat.',
    stars:   '~430',
  },
  {
    name:    'rag-eval-notes',
    role:    'Author',
    summary: 'Essays on faithfulness, judge drift, and what actually breaks in production RAG.',
  },
  {
    name:    'pgvector contributor',
    role:    'Contributor',
    summary: 'Two merged PRs around index tuning and cosine-distance benchmarks.',
  },
]
