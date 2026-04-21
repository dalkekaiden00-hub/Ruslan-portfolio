import { projects, profile, type Project } from './data'

const STOPWORDS = new Set([
  'the', 'and', 'for', 'you', 'your', 'how', 'what', 'why', 'who', 'when', 'where',
  'does', 'about', 'with', 'from', 'that', 'this', 'have', 'has', 'are', 'was', 'were',
  'can', 'will', 'would', 'should', 'could', 'may', 'might', 'tell', 'give', 'ask',
  'any', 'some', 'much', 'many', 'just', 'only', 'also', 'too', 'very', 'then',
])

function tokenize(s: string): string[] {
  return (s.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(
    (t) => t.length >= 3 && !STOPWORDS.has(t),
  )
}

function docFor(p: Project): string {
  return [p.title, p.summary, p.kind, p.arc.problem, p.arc.instrumentation, p.arc.finding, p.stack.join(' ')].join(' ').toLowerCase()
}

function score(p: Project, tokens: string[]): number {
  const doc = docFor(p)
  let s = 0
  for (const t of tokens) {
    const re = new RegExp(`\\b${t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'g')
    const hits = doc.match(re)
    if (hits) s += hits.length
    if (p.title.toLowerCase().includes(t)) s += 2
    if (p.kind.toLowerCase().includes(t))  s += 1
  }
  return s
}

function bestSnippet(p: Project, tokens: string[]): { label: string; text: string } {
  const candidates = [
    { label: 'Finding',         text: p.arc.finding },
    { label: 'Instrumentation', text: p.arc.instrumentation },
    { label: 'Problem',         text: p.arc.problem },
    { label: 'Summary',         text: p.summary },
  ]
  let best = candidates[0]
  let bestHits = -1
  for (const c of candidates) {
    const lc = c.text.toLowerCase()
    const hits = tokens.reduce((n, t) => n + (lc.includes(t) ? 1 : 0), 0)
    if (hits > bestHits) {
      best = c
      bestHits = hits
    }
  }
  return best
}

export type Hit = {
  index:     string
  title:     string
  kind:      string
  year:      string
  status:    string
  label:     string
  snippet:   string
  relevance: number
  href:      string
}

export type AskResult = {
  q:        string
  notebook: string
  took_ms:  number
  hits:     Hit[]
  empty:    boolean
}

export function retrieve(q: string, limit = 3): AskResult {
  const started = Date.now()
  const tokens  = tokenize(q)

  const scored = projects
    .map((p) => ({ p, s: score(p, tokens) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)

  const empty = scored.length === 0

  const source = empty ? projects.slice(0, 2).map((p) => ({ p, s: 1 })) : scored
  const top    = source[0].s

  const hits: Hit[] = source.map(({ p, s }) => {
    const snip = bestSnippet(p, tokens)
    return {
      index:     p.index,
      title:     p.title,
      kind:      p.kind,
      year:      p.year,
      status:    p.status,
      label:     snip.label,
      snippet:   snip.text,
      relevance: empty ? 0 : Math.round((s / top) * 100),
      href:      `#entry-${p.index}`,
    }
  })

  return {
    q,
    notebook: `${profile.name} · ${profile.meta.version}`,
    took_ms:  Date.now() - started,
    hits,
    empty,
  }
}
