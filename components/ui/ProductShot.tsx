/* Programmatic UI mockups per project.
   Each component renders a distinct flat UI screenshot as SVG —
   no device frames, edge-to-edge, varied palette per product. */

type Props = { kind: 'atlas' | 'halyard' | 'dispatch' | 'bench' | 'veldt' }

const W = 1600
const H = 900

const SANS = 'Inter, ui-sans-serif, system-ui, sans-serif'
const SERIF = 'Newsreader, Georgia, serif'
const MONO = 'JetBrains Mono, ui-monospace, monospace'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  )
}

/* ─── Atlas · dark slate + cyan (RAG retrieval UI) ───────────── */
function AtlasShot() {
  const bg = '#0B1220', panel = '#0F172A', line = '#1E293B', text = '#E2E8F0', dim = '#64748B'
  const cyan = '#22D3EE', cyanDim = '#164E63'

  const sources = [
    'SEC 10-K · Q3 2024',
    'MiFID II — Art. 13',
    'Basel III · Capital Req.',
    'FINRA Rule 4511',
    'GDPR · Art. 32',
    'FATCA · Reg. Update',
    'OCC Guidance 2022-17',
  ]

  const results = [
    {
      title: 'Prioritize faithfulness over top-k recall',
      body: 'Faithfulness — not top-k recall — was the correct north-star metric for a regulated',
      body2: 'corpus. Lifted faithful-answer rate from 62% to 94% across three model swaps without',
      body3: 'changing the retriever, which made the pipeline model-portable.',
      cites: ['§ p. 142', '§ p. 217'],
    },
    {
      title: 'Deterministic chunk IDs preserve citations after re-index',
      body: 'Chunk IDs are derived from page/paragraph offsets so a citation still resolves after',
      body2: 'the corpus is re-embedded. This was the single change that unblocked audit sign-off.',
      body3: '',
      cites: ['§ p. 89', '§ p. 301'],
    },
    {
      title: 'Hybrid retrieval — dense + BM25 — with reciprocal rank fusion',
      body: 'Hybrid retrieval out-performed pure dense on long-tail regulator terminology.',
      body2: 'RRF preserved the complementary strengths of each retriever without tuning weights.',
      body3: '',
      cites: ['§ p. 55', '§ p. 178'],
    },
  ]

  return (
    <Shell>
      <rect width={W} height={H} fill={bg} />
      {/* Title bar */}
      <rect x="0" y="0" width={W} height="48" fill="#060B15" />
      <circle cx="28" cy="24" r="6" fill={cyan} />
      <text x="48" y="30" fill={text} fontFamily={SANS} fontSize="13" fontWeight="600">atlas</text>
      <text x="110" y="30" fill={dim} fontFamily={MONO} fontSize="11">/ regulated-filings</text>
      <text x={W - 220} y="30" fill={dim} fontFamily={MONO} fontSize="11">v3.2.1 · 40,112 docs indexed</text>

      {/* Sidebar */}
      <rect x="0" y="48" width="260" height={H - 48} fill={panel} />
      <line x1="260" y1="48" x2="260" y2={H} stroke={line} />
      <text x="20" y="88" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">SOURCES</text>
      {sources.map((s, i) => (
        <g key={i} transform={`translate(20, ${108 + i * 52})`}>
          <rect x="-4" y="-8" width="240" height="40" rx="4" fill={i === 2 ? line : 'transparent'} />
          <rect width="6" height="6" rx="1" y="2" fill={i === 2 ? cyan : dim} />
          <text x="16" y="10" fill={i === 2 ? text : dim} fontFamily={SANS} fontSize="12" fontWeight={i === 2 ? 600 : 400}>{s}</text>
          <text x="16" y="24" fill={dim} fontFamily={MONO} fontSize="10">p. {24 + i * 17} · {140 + i * 38}kb</text>
        </g>
      ))}

      {/* Main: query */}
      <g transform="translate(290, 70)">
        <rect width="920" height="44" rx="6" fill={panel} stroke={cyanDim} />
        <text x="18" y="28" fill={text} fontFamily={SERIF} fontSize="15">How do you handle faithfulness in long-context RAG?</text>
        <rect x="858" y="10" width="52" height="24" rx="4" fill={cyan} />
        <text x="884" y="26" textAnchor="middle" fill="#0B1220" fontFamily={SANS} fontSize="11" fontWeight="600">Query</text>

        {/* Results */}
        {results.map((r, i) => (
          <g key={i} transform={`translate(0, ${80 + i * 220})`}>
            <rect width="920" height="200" rx="6" fill={panel} stroke={line} />
            <text x="20" y="32" fill={text} fontFamily={SERIF} fontSize="15" fontWeight="500">{r.title}</text>
            <rect x="830" y="18" width="80" height="20" rx="10" fill={cyanDim} />
            <text x="870" y="32" textAnchor="middle" fill={cyan} fontFamily={MONO} fontSize="10">{94 - i * 6}% match</text>
            <text x="20" y="68" fill={dim} fontFamily={SANS} fontSize="12">{r.body}</text>
            <text x="20" y="88" fill={dim} fontFamily={SANS} fontSize="12">{r.body2}</text>
            {r.body3 && <text x="20" y="108" fill={dim} fontFamily={SANS} fontSize="12">{r.body3}</text>}
            {/* highlighted phrase */}
            <rect x="20" y="54" width="340" height="18" rx="3" fill={cyan} opacity="0.12" />
            {/* citations */}
            <g transform="translate(20, 160)">
              {r.cites.map((c, j) => (
                <g key={j} transform={`translate(${j * 94}, 0)`}>
                  <rect width="84" height="22" rx="11" fill={cyanDim} />
                  <text x="42" y="15" textAnchor="middle" fill={cyan} fontFamily={MONO} fontSize="10">{c}</text>
                </g>
              ))}
              <text x="200" y="15" fill={dim} fontFamily={MONO} fontSize="10">· 2 more</text>
            </g>
          </g>
        ))}
      </g>

      {/* Right inspector */}
      <g transform="translate(1240, 70)">
        <rect width="340" height="760" rx="6" fill={panel} stroke={line} />
        <text x="20" y="34" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">FAITHFULNESS</text>
        <text x="20" y="98" fill={cyan} fontFamily={SERIF} fontSize="52" fontWeight="300">94%</text>
        <text x="160" y="98" fill={dim} fontFamily={MONO} fontSize="12">↑ +1.2 pp</text>
        <text x="20" y="122" fill={dim} fontFamily={SANS} fontSize="11">across 500-query eval set</text>

        {/* Bars */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect key={i} x={20 + i * 32} y="150" width="24" height={30 + (i % 3) * 18} fill={cyan} opacity={0.3 + (i / 10)} />
        ))}
        <line x1="20" y1="232" x2="320" y2="232" stroke={line} />
        <text x="20" y="256" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">BY JUDGE</text>

        {[
          { k: 'claude-3.5-sonnet', v: '94.2%' },
          { k: 'gpt-4o',             v: '93.8%' },
          { k: 'human raters',       v: '95.1%' },
          { k: 'ensemble',           v: '94.4%' },
        ].map((row, i) => (
          <g key={i} transform={`translate(20, ${288 + i * 44})`}>
            <text fill={text} fontFamily={MONO} fontSize="12">{row.k}</text>
            <text x="300" textAnchor="end" fill={cyan} fontFamily={MONO} fontSize="12" fontWeight="600">{row.v}</text>
            <rect x="0" y="8" width="300" height="3" rx="1" fill={line} />
            <rect x="0" y="8" width={parseInt(row.v) * 3} height="3" rx="1" fill={cyan} opacity="0.8" />
            <line x1="0" y1="30" x2="300" y2="30" stroke={line} />
          </g>
        ))}

        <text x="20" y="506" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">RELEASE GATE</text>
        <g transform="translate(20, 524)">
          <circle cx="8" cy="12" r="5" fill={cyan} />
          <text x="22" y="16" fill={text} fontFamily={SANS} fontSize="12">Passing · no regression</text>
          <text x="22" y="34" fill={dim} fontFamily={MONO} fontSize="10">paired t-test · p = 0.31</text>
        </g>
      </g>
    </Shell>
  )
}

/* ─── Halyard · light cream + purple (Trace waterfall) ───────── */
function HalyardShot() {
  const bg = '#F7F3EB', panel = '#FFFFFF', line = '#E7E0CF', text = '#2A1F3D', dim = '#8A7EA1'
  const purple = '#7C3AED', purpleDim = '#A78BFA', lavender = '#EDE9FE'

  const spans = [
    { y:  80, x:    0, w: 1080, c: purple,    label: 'http.request · POST /workflow' },
    { y: 120, x:   40, w:  900, c: purpleDim, label: 'agent.plan · gpt-4o' },
    { y: 160, x:   80, w:  340, c: purple,    label: 'llm.stream · tool_calls' },
    { y: 200, x:   80, w:  180, c: purpleDim, label: 'tool.resolve · rag.query' },
    { y: 240, x:  440, w:  280, c: purple,    label: 'retriever.dense' },
    { y: 280, x:  440, w:  180, c: purpleDim, label: 'pgvector.query · top_k=12' },
    { y: 320, x:  720, w:  240, c: purple,    label: 'retriever.bm25' },
    { y: 360, x:  960, w:  120, c: purpleDim, label: 'rrf.merge' },
  ]
  const kv = [
    ['duration',   '248 ms'],
    ['status',     'OK'],
    ['tenant',     'finance'],
    ['tokens_in',  '1,240'],
    ['top_k',      '12'],
    ['score_max',  '0.89'],
    ['score_min',  '0.52'],
    ['cache',      'miss'],
  ]

  return (
    <Shell>
      <rect width={W} height={H} fill={bg} />
      {/* Title bar */}
      <rect x="0" y="0" width={W} height="52" fill={panel} />
      <line x1="0" y1="52" x2={W} y2="52" stroke={line} />
      <rect x="24" y="14" width="24" height="24" rx="4" fill={purple} />
      <text x="60" y="32" fill={text} fontFamily={SANS} fontSize="14" fontWeight="600">Halyard</text>
      {['Traces', 'Tools', 'Tenants', 'Replays', 'Budgets'].map((t, i) => (
        <text key={i} x={180 + i * 84} y="32" fill={i === 0 ? text : dim} fontFamily={SANS} fontSize="12" fontWeight={i === 0 ? 600 : 400}>{t}</text>
      ))}
      <text x={W - 240} y="32" fill={dim} fontFamily={MONO} fontSize="11">trace_id · 7f2b…c091</text>

      {/* Main header */}
      <g transform="translate(40, 88)">
        <text x="0" y="0" fill={text} fontFamily={SERIF} fontSize="22" fontWeight="500">finance.atlas.retrieve</text>
        <text x="220" y="0" fill={dim} fontFamily={MONO} fontSize="12">2.14s · 8 spans · 3 tools · 1 LLM call</text>
        <rect x="0" y="18" width="1100" height="1" fill={line} />

        {/* Time axis */}
        <line x1="0" y1="54" x2="1100" y2="54" stroke={line} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={i}>
            <line x1={i * 137} y1="54" x2={i * 137} y2="60" stroke={dim} />
            <text x={i * 137} y="78" fill={dim} fontFamily={MONO} fontSize="10">{i * 250}ms</text>
          </g>
        ))}

        {/* Spans */}
        {spans.map((s, i) => (
          <g key={i} transform={`translate(${s.x}, ${s.y + 24})`}>
            <rect width={s.w} height="26" rx="3" fill={s.c} opacity="0.82" />
            <rect width="3" height="26" fill={purple} />
            <text x={s.w + 12} y="18" fill={text} fontFamily={MONO} fontSize="12">{s.label}</text>
            <text x={s.w - 8} y="18" textAnchor="end" fill="#fff" fontFamily={MONO} fontSize="11" fontWeight="600">{Math.round(s.w * 0.23)} ms</text>
          </g>
        ))}
      </g>

      {/* Right panel */}
      <g transform="translate(1180, 88)">
        <rect width="380" height="770" rx="8" fill={panel} stroke={line} />
        <rect width="380" height="48" rx="8" fill={lavender} />
        <text x="20" y="32" fill={purple} fontFamily={SERIF} fontSize="16" fontWeight="500">Span · retriever.dense</text>
        {kv.map(([k, v], i) => (
          <g key={i} transform={`translate(20, ${86 + i * 36})`}>
            <text fill={dim} fontFamily={MONO} fontSize="11" letterSpacing="1">{k}</text>
            <text x="340" textAnchor="end" fill={text} fontFamily={MONO} fontSize="12" fontWeight="500">{v}</text>
            <line x1="0" y1="22" x2="340" y2="22" stroke={line} />
          </g>
        ))}

        <text x="20" y="404" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">LATENCY · p95 last 24h</text>
        <rect x="20" y="420" width="340" height="120" rx="4" fill={lavender} />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={28 + i * 24} y={530 - (40 + ((i * 7) % 60))} width="18" height={40 + ((i * 7) % 60)} fill={purple} opacity={0.4 + (((i * 3) % 50) / 100)} />
        ))}

        <text x="20" y="588" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">RECENT REPLAYS</text>
        {[
          ['replay.finance.1',  'passed · 2m ago'],
          ['replay.cx.47',      'passed · 8m ago'],
          ['replay.ops.12',     'skip · 12m ago'],
          ['replay.legal.3',    'passed · 18m ago'],
        ].map((r, i) => (
          <g key={i} transform={`translate(20, ${610 + i * 34})`}>
            <circle cx="6" cy="10" r="4" fill={i === 2 ? dim : purple} />
            <text x="18" y="14" fill={text} fontFamily={MONO} fontSize="11">{r[0]}</text>
            <text x="340" y="14" textAnchor="end" fill={dim} fontFamily={MONO} fontSize="10">{r[1]}</text>
          </g>
        ))}
      </g>
    </Shell>
  )
}

/* ─── Dispatch · dark navy + green (ML dashboard) ─────────────── */
function DispatchShot() {
  const bg = '#0B1426', panel = '#101B32', line = '#1E2A47', text = '#E2E8F0', dim = '#94A3B8'
  const green = '#10B981', greenDim = '#064E3B'

  return (
    <Shell>
      <rect width={W} height={H} fill={bg} />
      {/* Title */}
      <rect x="0" y="0" width={W} height="48" fill="#060F1F" />
      <rect x="24" y="14" width="20" height="20" rx="4" fill={green} />
      <text x="54" y="30" fill={text} fontFamily={SANS} fontSize="13" fontWeight="600">Dispatch</text>
      {['Overview', 'Latency', 'Accuracy', 'Cost', 'Drift'].map((t, i) => (
        <text key={i} x={140 + i * 82} y="30" fill={i === 0 ? text : dim} fontFamily={SANS} fontSize="12" fontWeight={i === 0 ? 600 : 400}>{t}</text>
      ))}
      <rect x={W - 120} y="14" width="96" height="20" rx="10" fill={greenDim} />
      <circle cx={W - 108} cy="24" r="3" fill={green} />
      <text x={W - 98} y="28" fill={green} fontFamily={MONO} fontSize="10">live · 40,121 rps</text>

      {/* Top-left: p95 latency */}
      <g transform="translate(40, 80)">
        <rect width="720" height="370" rx="8" fill={panel} stroke={line} />
        <text x="24" y="34" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">LATENCY · P95 · LAST HOUR</text>
        <text x="24" y="92" fill={text} fontFamily={SERIF} fontSize="44" fontWeight="300">190 ms</text>
        <text x="200" y="92" fill={green} fontFamily={MONO} fontSize="13">−12% vs 24h avg</text>
        <text x="24" y="116" fill={dim} fontFamily={SANS} fontSize="11">Target: 250 ms · Budget remaining: 60 ms</text>
        {Array.from({ length: 28 }).map((_, i) => {
          const h = 30 + ((Math.sin(i * 0.7) * 0.5 + 0.7) * 180)
          return <rect key={i} x={24 + i * 24} y={340 - h} width="18" height={h} rx="2" fill={green} opacity={0.4 + (i / 40)} />
        })}
        <line x1="24" y1="340" x2="696" y2="340" stroke={line} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <text key={i} x={24 + i * 130} y="360" fill={dim} fontFamily={MONO} fontSize="9">{i * 10}m</text>
        ))}
      </g>

      {/* Top-right: F1 by class */}
      <g transform="translate(780, 80)">
        <rect width="440" height="370" rx="8" fill={panel} stroke={line} />
        <text x="24" y="34" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">F1 · WEIGHTED</text>
        <text x="24" y="84" fill={text} fontFamily={SERIF} fontSize="38" fontWeight="300">0.921</text>
        <text x="160" y="84" fill={green} fontFamily={MONO} fontSize="12">↑ +0.003</text>
        <path
          d="M 30 320 L 60 280 L 90 290 L 130 230 L 170 240 L 210 190 L 250 210 L 290 170 L 330 150 L 370 120 L 410 100"
          stroke={green} fill="none" strokeWidth="2.5"
        />
        <path
          d="M 30 340 L 60 320 L 90 310 L 130 280 L 170 290 L 210 260 L 250 270 L 290 240 L 330 220 L 370 210 L 410 190 L 410 340 L 30 340 Z"
          fill={green} opacity="0.12"
        />
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={30 + i * 38} cy={[320, 280, 290, 230, 240, 190, 210, 170, 150, 120, 100][i]} r="3" fill={green} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="24" y1={80 + i * 52} x2="416" y2={80 + i * 52} stroke={line} />
        ))}
      </g>

      {/* Top-far-right: confusion matrix */}
      <g transform="translate(1240, 80)">
        <rect width="320" height="370" rx="8" fill={panel} stroke={line} />
        <text x="24" y="34" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">CONFUSION · 6×6</text>
        <text x="24" y="58" fill={dim} fontFamily={SANS} fontSize="10">Top classes only</text>
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 6 }).map((__, c) => {
            const v = r === c ? 0.95 : (0.02 + Math.abs(Math.sin(r * 3 + c * 2)) * 0.15)
            return (
              <rect key={`${r}-${c}`}
                x={24 + c * 45} y={78 + r * 45}
                width="42" height="42" rx="2"
                fill={green} opacity={v * 0.9}
              />
            )
          })
        )}
        <text x="24" y="360" fill={dim} fontFamily={MONO} fontSize="10">billing · refund · abuse · status · auth · misc</text>
      </g>

      {/* Bottom strip: throughput */}
      <g transform="translate(40, 480)">
        <rect width="1520" height="370" rx="8" fill={panel} stroke={line} />
        <text x="24" y="34" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">THROUGHPUT · LAST 24H · TICKETS / MIN</text>
        <text x="24" y="70" fill={text} fontFamily={SERIF} fontSize="28" fontWeight="300">40,112 / day</text>
        <text x="300" y="70" fill={dim} fontFamily={MONO} fontSize="12">cascade: 83% encoder · 17% LLM fallback</text>
        {Array.from({ length: 90 }).map((_, i) => {
          const h = 40 + ((Math.sin(i * 0.21) * 0.5 + 0.5) * 220) + ((i % 17) * 2)
          return <rect key={i} x={24 + i * 16.6} y={340 - h} width="12" height={h} rx="2" fill={green} opacity={0.35 + (h / 400)} />
        })}
        <line x1="24" y1="340" x2="1510" y2="340" stroke={line} />
        {['00:00', '06:00', '12:00', '18:00', '24:00'].map((t, i) => (
          <text key={i} x={24 + i * 371} y="360" fill={dim} fontFamily={MONO} fontSize="10">{t}</text>
        ))}
      </g>
    </Shell>
  )
}

/* ─── Bench · light + red/green (CI / PR checks) ──────────────── */
function BenchShot() {
  const bg = '#F7F8FA', panel = '#FFFFFF', line = '#D0D7DE', text = '#1F2328', dim = '#656D76'
  const green = '#1A7F37', greenBg = '#DAFBE1', red = '#CF222E', redBg = '#FFEBE9', amber = '#9A6700', amberBg = '#FFF8C5'

  const checks = [
    { s: 'ok',  n: 'atlas · faithfulness (500 queries)',   v: '94.2%',  d: '+1.2%',  c: green, bg: greenBg },
    { s: 'ok',  n: 'atlas · retrieval.recall@10',          v: '0.89',   d: '+0.01',  c: green, bg: greenBg },
    { s: 'ok',  n: 'halyard · workflow.silent_failure',    v: '0.3%',   d: '−0.1%',  c: green, bg: greenBg },
    { s: 'warn', n: 'dispatch · weighted_f1',              v: '0.921',  d: '−0.002', c: amber, bg: amberBg },
    { s: 'ok',  n: 'dispatch · p95_latency',               v: '186ms',  d: '−4ms',   c: green, bg: greenBg },
    { s: 'ok',  n: 'bench · judge_drift.paired_t',         v: 'p=0.31', d: 'stable', c: green, bg: greenBg },
    { s: 'err', n: 'veldt · sdk.bundle_size',              v: '14.3kB', d: '+0.4kB', c: red,   bg: redBg },
    { s: 'ok',  n: 'veldt · chat.envelope.contract',       v: 'pass',   d: 'v3',     c: green, bg: greenBg },
  ]

  return (
    <Shell>
      <rect width={W} height={H} fill={bg} />
      {/* Header */}
      <rect x="0" y="0" width={W} height="60" fill={panel} />
      <line x1="0" y1="60" x2={W} y2="60" stroke={line} />
      <rect x="32" y="22" width="14" height="14" rx="7" fill={green} />
      <text x="56" y="36" fill={text} fontFamily={SANS} fontSize="15" fontWeight="600">bench · PR #1248 · tighten faithfulness gate to 2% delta</text>
      <text x="56" y="54" fill={dim} fontFamily={MONO} fontSize="11">ruslan-somin wants to merge 1 commit into main · +420 −38 · 7 files changed · 2h ago</text>
      <rect x={W - 170} y="20" width="130" height="28" rx="6" fill={green} />
      <text x={W - 105} y="38" textAnchor="middle" fill="#fff" fontFamily={SANS} fontSize="12" fontWeight="600">Merge pull request</text>

      {/* Summary card */}
      <g transform="translate(40, 88)">
        <rect width="1520" height="88" rx="8" fill={panel} stroke={line} />
        <rect width="6" height="88" fill={green} />
        <circle cx="40" cy="44" r="16" fill={greenBg} />
        <text x="40" y="50" textAnchor="middle" fill={green} fontFamily={SANS} fontSize="18" fontWeight="700">✓</text>
        <text x="72" y="36" fill={text} fontFamily={SANS} fontSize="15" fontWeight="600">All checks have passed</text>
        <text x="72" y="58" fill={dim} fontFamily={MONO} fontSize="12">7 passed · 1 warning · 0 failed · faithfulness Δ +1.2% · p95 Δ −4ms · no regressions</text>
        <text x="72" y="76" fill={dim} fontFamily={MONO} fontSize="11">bench.ci · 3m 24s total · 1,248 eval cases · paired t-test gate</text>
        <text x="1490" y="40" textAnchor="end" fill={dim} fontFamily={MONO} fontSize="11">Hide details ↑</text>
      </g>

      {/* Checks list */}
      <g transform="translate(40, 196)">
        {checks.map((row, i) => (
          <g key={i} transform={`translate(0, ${i * 72})`}>
            <rect width="1520" height="64" rx="8" fill={panel} stroke={line} />
            <rect x="0" y="0" width="4" height="64" fill={row.c} />
            <circle cx="36" cy="32" r="12" fill={row.bg} />
            <text x="36" y="37" textAnchor="middle" fill={row.c} fontFamily={SANS} fontWeight="700" fontSize="14">
              {row.s === 'ok' ? '✓' : row.s === 'err' ? '✕' : '!'}
            </text>
            <text x="60" y="30" fill={text} fontFamily={SANS} fontSize="13" fontWeight="500">{row.n}</text>
            <text x="60" y="50" fill={dim} fontFamily={MONO} fontSize="11">bench/ci · {32 + i * 7}s · judge: claude-3.5-sonnet</text>
            <text x="1300" y="30" textAnchor="end" fill={text} fontFamily={MONO} fontSize="14" fontWeight="600">{row.v}</text>
            <rect x="1320" y="18" width="80" height="22" rx="11" fill={row.bg} />
            <text x="1360" y="33" textAnchor="middle" fill={row.c} fontFamily={MONO} fontSize="11" fontWeight="600">{row.d}</text>
            <rect x="1420" y="24" width="80" height="4" rx="2" fill={line} />
            <rect x="1420" y="24" width={row.s === 'err' ? 30 : 60 + (i * 4 % 20)} height="4" rx="2" fill={row.c} />
          </g>
        ))}
      </g>
    </Shell>
  )
}

/* ─── Veldt · dark charcoal + amber (AI chat dev tool) ────────── */
function VeldtShot() {
  const bg = '#1A1916', panel = '#23221E', line = '#34332E', text = '#E8E4D8', dim = '#8B8678'
  const amber = '#F59E0B', amberBg = '#78350F'

  const threads = [
    { title: 'Retrieval pipeline design review',  time: 'active · streaming',   active: true },
    { title: 'Halyard agent runtime questions',   time: '2m ago',               active: false },
    { title: 'Eval harness · multi-turn design',  time: '12m ago',              active: false },
    { title: 'Dispatch cascade latency audit',    time: '1h ago',               active: false },
    { title: 'Veldt envelope v3 migration',       time: '3h ago',               active: false },
    { title: 'Judge drift quarterly review',      time: 'yesterday',            active: false },
    { title: 'Pgvector index tuning notes',       time: 'yesterday',            active: false },
    { title: 'Agent tool schema conventions',     time: '2d ago',               active: false },
  ]

  return (
    <Shell>
      <rect width={W} height={H} fill={bg} />
      {/* Left rail */}
      <rect x="0" y="0" width="64" height={H} fill="#141310" />
      {['V', '⌕', '◇', '≡', '⚙'].map((g, i) => (
        <g key={i} transform={`translate(18, ${80 + i * 60})`}>
          <rect width="28" height="28" rx="6" fill={i === 0 ? amber : line} opacity={i === 0 ? 1 : 0.6} />
          <text x="14" y="20" textAnchor="middle" fill={i === 0 ? '#1A1916' : dim} fontFamily={SANS} fontSize="14" fontWeight="700">{g}</text>
        </g>
      ))}

      {/* Threads list */}
      <rect x="64" y="0" width="300" height={H} fill={panel} />
      <line x1="64" y1="0" x2="64" y2={H} stroke={line} />
      <line x1="364" y1="0" x2="364" y2={H} stroke={line} />
      <text x="82" y="44" fill={dim} fontFamily={MONO} fontSize="10" letterSpacing="2">THREADS</text>
      <rect x="82" y="58" width="264" height="32" rx="6" fill={line} />
      <text x="96" y="78" fill={dim} fontFamily={SANS} fontSize="12">⌕  Search threads</text>

      {threads.map((t, i) => (
        <g key={i} transform={`translate(82, ${110 + i * 68})`}>
          <rect width="264" height="56" rx="6" fill={t.active ? line : 'transparent'} opacity={t.active ? 0.8 : 0} />
          {t.active && <rect width="3" height="56" fill={amber} />}
          <text x="12" y="24" fill={t.active ? text : dim} fontFamily={SANS} fontSize="12" fontWeight={t.active ? 600 : 400}>
            {t.title.length > 30 ? t.title.slice(0, 28) + '…' : t.title}
          </text>
          <text x="12" y="42" fill={dim} fontFamily={MONO} fontSize="10">{t.time}</text>
        </g>
      ))}

      {/* Main chat */}
      <g transform="translate(384, 0)">
        {/* Header */}
        <rect width="1216" height="56" fill={panel} />
        <line x1="0" y1="56" x2="1216" y2="56" stroke={line} />
        <text x="24" y="36" fill={text} fontFamily={SERIF} fontSize="17">Retrieval pipeline design review</text>
        <circle cx="1100" cy="28" r="5" fill={amber} />
        <text x="1112" y="32" fill={dim} fontFamily={MONO} fontSize="11">streaming · 248 tokens · claude-3.5-sonnet</text>

        {/* User message */}
        <g transform="translate(200, 88)">
          <rect width="820" height="72" rx="12" fill={line} />
          <text x="40" y="30" fill={text} fontFamily={SANS} fontSize="13" fontWeight="500">You · 2:14 PM</text>
          <text x="40" y="52" fill={text} fontFamily={SANS} fontSize="14">
            How should I structure the eval harness for multi-turn agents?
          </text>
        </g>

        {/* Assistant message */}
        <g transform="translate(0, 188)">
          <circle cx="28" cy="20" r="14" fill={amberBg} />
          <text x="28" y="25" textAnchor="middle" fill={amber} fontFamily={SERIF} fontSize="14" fontWeight="600">V</text>
          <text x="56" y="16" fill={text} fontFamily={SANS} fontSize="13" fontWeight="500">Veldt · 2:14 PM</text>

          <text x="56" y="42" fill={text} fontFamily={SANS} fontSize="14">
            For multi-turn agents, the eval case is the whole conversation, not a single turn. Three pieces:
          </text>
          <text x="56" y="66" fill={text} fontFamily={SANS} fontSize="14">
            1. Store golden trajectories as the input format — not prompts. A trajectory is a list of
          </text>
          <text x="56" y="86" fill={text} fontFamily={SANS} fontSize="14">
            {'   '}(role, content, tool_calls) tuples that you can replay deterministically.
          </text>

          {/* Tool call card */}
          <g transform="translate(56, 108)">
            <rect width="1080" height="186" rx="8" fill={panel} stroke={line} />
            <rect x="0" y="0" width="4" height="186" fill={amber} />
            <rect x="16" y="16" width="150" height="22" rx="4" fill={amberBg} />
            <text x="28" y="31" fill={amber} fontFamily={MONO} fontSize="11" fontWeight="600">tool · rag.query</text>
            <rect x="1020" y="16" width="44" height="22" rx="11" fill={line} />
            <circle cx="1034" cy="27" r="3" fill={amber} />
            <text x="1046" y="31" fill={amber} fontFamily={MONO} fontSize="10">ok</text>

            {/* Code block */}
            <rect x="16" y="50" width="1048" height="124" rx="4" fill="#0F0E0C" />
            <text x="32"  y="74" fill={dim}   fontFamily={MONO} fontSize="11">1</text>
            <text x="56"  y="74" fill={amber} fontFamily={MONO} fontSize="11">query</text>
            <text x="108" y="74" fill={text}  fontFamily={MONO} fontSize="11">:</text>
            <text x="120" y="74" fill="#86EFAC" fontFamily={MONO} fontSize="11">&quot;multi-turn agent evaluation&quot;</text>

            <text x="32"  y="94" fill={dim}   fontFamily={MONO} fontSize="11">2</text>
            <text x="56"  y="94" fill={amber} fontFamily={MONO} fontSize="11">top_k</text>
            <text x="108" y="94" fill={text}  fontFamily={MONO} fontSize="11">:</text>
            <text x="120" y="94" fill="#FDA4AF" fontFamily={MONO} fontSize="11">8</text>

            <text x="32"  y="114" fill={dim}   fontFamily={MONO} fontSize="11">3</text>
            <text x="56"  y="114" fill={amber} fontFamily={MONO} fontSize="11">filters</text>
            <text x="108" y="114" fill={text}  fontFamily={MONO} fontSize="11">: {'{'} tenant:</text>
            <text x="218" y="114" fill="#86EFAC" fontFamily={MONO} fontSize="11">&quot;internal&quot;</text>
            <text x="296" y="114" fill={text}  fontFamily={MONO} fontSize="11">, kind:</text>
            <text x="354" y="114" fill="#86EFAC" fontFamily={MONO} fontSize="11">&quot;eval&quot;</text>
            <text x="408" y="114" fill={text}  fontFamily={MONO} fontSize="11">{'}'}</text>

            <text x="32"  y="134" fill={dim}   fontFamily={MONO} fontSize="11">4</text>
            <text x="56"  y="134" fill={amber} fontFamily={MONO} fontSize="11">rerank</text>
            <text x="108" y="134" fill={text}  fontFamily={MONO} fontSize="11">:</text>
            <text x="120" y="134" fill="#FDA4AF" fontFamily={MONO} fontSize="11">true</text>

            <text x="32"  y="154" fill={dim}   fontFamily={MONO} fontSize="11">5</text>
            <text x="56"  y="154" fill={dim}   fontFamily={MONO} fontSize="11">// returns 6 relevant eval case trajectories</text>
          </g>

          <text x="56" y="316" fill={text} fontFamily={SANS} fontSize="14">
            2. A trajectory-level judge that scores the full arc — task completion, not turn-by-turn
          </text>
          <text x="56" y="336" fill={text} fontFamily={SANS} fontSize="14">
            {'   '}faithfulness. Claude-3.5-sonnet has been stable for us here.
          </text>

          <text x="56" y="362" fill={text} fontFamily={SANS} fontSize="14">
            3. Replay before release — every shipping model gets re-run against the golden set with<tspan fill={amber}>▌</tspan>
          </text>
        </g>

        {/* Input */}
        <g transform="translate(0, 776)">
          <rect width="1216" height="124" fill={panel} />
          <line x1="0" y1="0" x2="1216" y2="0" stroke={line} />
          <rect x="24" y="24" width="1168" height="76" rx="10" fill={bg} stroke={line} />
          <text x="40" y="62" fill={dim} fontFamily={SERIF} fontSize="15">Ask anything about your notebook…</text>
          <circle cx="1150" cy="62" r="18" fill={amber} />
          <path d="M 1142 62 L 1158 62 M 1152 56 L 1158 62 L 1152 68" stroke="#1A1916" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </Shell>
  )
}

export function ProductShot({ kind }: Props) {
  switch (kind) {
    case 'atlas':    return <AtlasShot />
    case 'halyard':  return <HalyardShot />
    case 'dispatch': return <DispatchShot />
    case 'bench':    return <BenchShot />
    case 'veldt':    return <VeldtShot />
  }
}
