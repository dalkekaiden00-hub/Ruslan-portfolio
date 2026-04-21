/* Tiny editorial architecture diagrams — thin-stroke, brass on paper.
   One SVG per project. Kept small and schematic on purpose: this is a
   systems diagram, not a screenshot. */

type Props = { kind: 'atlas' | 'halyard' | 'dispatch' | 'bench' | 'veldt' }

const INK    = '#1A1814'
const MUTED  = '#6B6660'
const FAINT  = '#D4CEC1'
const ACCENT = '#8B6F47'

function Node({
  x, y, w = 96, h = 30, label, kind = 'default',
}: {
  x: number; y: number; w?: number; h?: number; label: string
  kind?: 'default' | 'accent' | 'ghost'
}) {
  const stroke = kind === 'accent' ? ACCENT : kind === 'ghost' ? FAINT : INK
  const fill   = kind === 'accent' ? '#F4EEDE' : 'none'
  const text   = kind === 'ghost' ? MUTED : INK
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="1" rx="2" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="10" fill={text}
        letterSpacing="0.04em">
        {label}
      </text>
    </g>
  )
}

function Edge({
  x1, y1, x2, y2, label, dashed = false,
}: { x1: number; y1: number; x2: number; y2: number; label?: string; dashed?: boolean }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={MUTED} strokeWidth="1"
        strokeDasharray={dashed ? '3 3' : undefined}
        markerEnd="url(#arrow)" />
      {label && (
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 4} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize="9" fill={MUTED}
          letterSpacing="0.04em">
          {label}
        </text>
      )}
    </g>
  )
}

const Defs = () => (
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
      markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill={MUTED} />
    </marker>
  </defs>
)

const W = 720
const H = 220

function Shell({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className="border border-rule bg-hi/40 rounded-sm">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
        <Defs />
        {children}
      </svg>
      <figcaption className="border-t border-rule px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
        Fig. · {caption}
      </figcaption>
    </figure>
  )
}

/* ─── Atlas ─────────────────────────── */
function Atlas() {
  return (
    <Shell caption="Atlas · hybrid retrieval + faithfulness gate">
      <Node x={20}  y={95}  w={86}  label="Query" kind="accent" />
      <Edge x1={106} y1={110} x2={140} y2={110} />
      <Node x={140} y={60}  w={110} label="Dense (pgvector)" />
      <Node x={140} y={130} w={110} label="BM25" />
      <Edge x1={250} y1={75}  x2={300} y2={100} />
      <Edge x1={250} y1={145} x2={300} y2={120} />
      <Node x={300} y={95}  w={96}  label="RRF fusion" />
      <Edge x1={396} y1={110} x2={430} y2={110} />
      <Node x={430} y={95}  w={110} label="LLM + cite" kind="accent" />
      <Edge x1={540} y1={110} x2={580} y2={110} />
      <Node x={580} y={95}  w={118} label="Answer + chunk IDs" />
      <Node x={300} y={170} w={96}  label="Judge (eval)" kind="ghost" />
      <Edge x1={348} y1={170} x2={348} y2={125} dashed label="gate" />
      <text x={W/2} y={30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
        fill={MUTED} letterSpacing="0.12em">
        RETRIEVAL → FUSION → GENERATION → EVAL GATE
      </text>
    </Shell>
  )
}

/* ─── Halyard ─────────────────────────── */
function Halyard() {
  return (
    <Shell caption="Halyard · typed tool runtime with replay">
      <Node x={20}  y={95}  w={96}  label="Workflow" kind="accent" />
      <Edge x1={116} y1={110} x2={150} y2={110} />
      <Node x={150} y={95}  w={110} label="Zod schema" />
      <Edge x1={260} y1={110} x2={290} y2={110} label="valid" />
      <Node x={290} y={95}  w={96}  label="Tool runtime" kind="accent" />
      <Edge x1={386} y1={110} x2={420} y2={110} />
      <Node x={420} y={60}  w={96}  label="Tool A" />
      <Node x={420} y={130} w={96}  label="Tool B" />
      <Edge x1={516} y1={75}  x2={560} y2={110} />
      <Edge x1={516} y1={145} x2={560} y2={110} />
      <Node x={560} y={95}  w={140} label="Result + trace" />
      <Node x={290} y={170} w={96}  label="OTel spans" kind="ghost" />
      <Edge x1={338} y1={170} x2={338} y2={125} dashed label="replay" />
      <text x={W/2} y={30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
        fill={MUTED} letterSpacing="0.12em">
        SCHEMA → TYPED RUNTIME → TRACEABLE TOOLS
      </text>
    </Shell>
  )
}

/* ─── Dispatch ─────────────────────────── */
function Dispatch() {
  return (
    <Shell caption="Dispatch · confidence-gated cascade">
      <Node x={20}  y={95}  w={96}  label="Ticket" kind="accent" />
      <Edge x1={116} y1={110} x2={150} y2={110} />
      <Node x={150} y={95}  w={120} label="Encoder (40M)" />
      <Edge x1={270} y1={95}  x2={330} y2={70}  label="high conf · 83 %" />
      <Edge x1={270} y1={125} x2={330} y2={160} label="low conf · 17 %" dashed />
      <Node x={330} y={55}  w={96}  label="Class out" />
      <Node x={330} y={145} w={110} label="LLM fallback" />
      <Edge x1={440} y1={160} x2={500} y2={110} />
      <Edge x1={426} y1={70}  x2={500} y2={110} />
      <Node x={500} y={95}  w={120} label="Route + route log" kind="accent" />
      <Node x={150} y={170} w={120} label="Active-learning Q" kind="ghost" />
      <Edge x1={270} y1={170} x2={330} y2={170} dashed label="labels" />
      <text x={W/2} y={30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
        fill={MUTED} letterSpacing="0.12em">
        CASCADE · SMALL MODEL ⇢ LLM FALLBACK
      </text>
    </Shell>
  )
}

/* ─── Bench ─────────────────────────── */
function Bench() {
  return (
    <Shell caption="Bench · PR-gated eval harness">
      <Node x={20}  y={95}  w={96}  label="PR" kind="accent" />
      <Edge x1={116} y1={110} x2={150} y2={110} />
      <Node x={150} y={95}  w={110} label="Suite router" />
      <Edge x1={260} y1={110} x2={290} y2={110} />
      <Node x={290} y={45}  w={110} label="Unit checks" />
      <Node x={290} y={95}  w={110} label="Semantic sim" />
      <Node x={290} y={145} w={110} label="LLM judge" />
      <Edge x1={400} y1={60}  x2={450} y2={110} />
      <Edge x1={400} y1={110} x2={450} y2={110} />
      <Edge x1={400} y1={160} x2={450} y2={110} />
      <Node x={450} y={95}  w={110} label="Paired t-test" />
      <Edge x1={560} y1={110} x2={590} y2={110} />
      <Node x={590} y={95}  w={110} label="Gate · block > 2 %" kind="accent" />
      <Node x={290} y={185} w={110} label="Judge calib" kind="ghost" />
      <text x={W/2} y={30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
        fill={MUTED} letterSpacing="0.12em">
        CHEAP CHECKS → EXPENSIVE CHECKS → STATS GATE
      </text>
    </Shell>
  )
}

/* ─── Veldt ─────────────────────────── */
function Veldt() {
  return (
    <Shell caption="Veldt · protocol-first chat SDK">
      <Node x={20}  y={95}  w={110} label="React SDK" kind="accent" />
      <Edge x1={130} y1={110} x2={180} y2={110} label="SSE" />
      <Node x={180} y={95}  w={120} label="Envelope v3" />
      <Edge x1={300} y1={110} x2={340} y2={110} />
      <Node x={340} y={95}  w={120} label="FastAPI runtime" kind="accent" />
      <Edge x1={460} y1={110} x2={500} y2={70}  />
      <Edge x1={460} y1={110} x2={500} y2={150} />
      <Node x={500} y={55}  w={110} label="Providers" />
      <Node x={500} y={135} w={110} label="pgvector memory" />
      <Edge x1={610} y1={70}  x2={660} y2={110} />
      <Edge x1={610} y1={150} x2={660} y2={110} />
      <Node x={660} y={95}  w={50}  label="out" />
      <text x={500} y={195} fontFamily="var(--font-mono)" fontSize="9" fill={MUTED}
        letterSpacing="0.04em">
        OpenAI · Anthropic · Ollama · Azure
      </text>
      <text x={W/2} y={30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
        fill={MUTED} letterSpacing="0.12em">
        TYPED ENVELOPE · PLUGGABLE BACKENDS
      </text>
    </Shell>
  )
}

export function Architecture({ kind }: Props) {
  switch (kind) {
    case 'atlas':    return <Atlas />
    case 'halyard':  return <Halyard />
    case 'dispatch': return <Dispatch />
    case 'bench':    return <Bench />
    case 'veldt':    return <Veldt />
  }
}
