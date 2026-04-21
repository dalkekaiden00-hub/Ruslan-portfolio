'use client'

import { useState, useRef, useEffect } from 'react'
import { Container } from '../layout/Container'
import { Rule } from '../ui/Rule'

type Hit = {
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

type Result = {
  q:        string
  notebook: string
  took_ms:  number
  hits:     Hit[]
  empty:    boolean
}

const SUGGESTIONS = [
  'How do you evaluate RAG systems?',
  'Tell me about agent tooling',
  'Latency and cost trade-offs',
  'An observability win',
]

export function Ask() {
  const [q, setQ]             = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState<Result | null>(null)
  const [error, setError]     = useState<string | null>(null)
  const inputRef              = useRef<HTMLInputElement>(null)

  async function ask(query: string) {
    const trimmed = query.trim()
    if (!trimmed || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const r = await fetch('/api/ask', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ q: trimmed }),
      })
      if (!r.ok) throw new Error(String(r.status))
      const data: Result = await r.json()
      await new Promise((res) => setTimeout(res, 180))
      setResult(data)
    } catch {
      setError('Retrieval failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    ask(q)
  }

  function useSuggestion(s: string) {
    setQ(s)
    ask(s)
    inputRef.current?.focus()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="ask" className="py-16 md:py-20">
      <Container>
        <Rule className="mb-8" />

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 md:col-span-2 mb-4 md:mb-0">
            <div className="label text-faint">§ 00 · Query</div>
          </aside>

          <div className="col-span-12 md:col-span-10">
            <form onSubmit={onSubmit}>
              <label htmlFor="ask-input" className="label text-muted">
                Ask the notebook
              </label>
              <div className="mt-4 flex items-baseline gap-4 border-b border-ink pb-3 md:pb-4">
                <input
                  id="ask-input"
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="e.g. How do you handle faithfulness in RAG?"
                  disabled={loading}
                  maxLength={400}
                  autoComplete="off"
                  className="flex-1 bg-transparent display text-[24px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-ink placeholder:text-faint focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={loading || q.trim().length === 0}
                  className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink hover:text-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Submit query"
                >
                  {loading ? 'Reading…' : 'Query ↵'}
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => useSuggestion(s)}
                    disabled={loading}
                    className="font-mono text-[11px] text-muted border border-rule rounded-full px-3 py-1.5 hover:text-ink hover:border-ink transition-colors disabled:opacity-40"
                  >
                    {s}
                  </button>
                ))}
                <span className="ml-auto font-mono text-[11px] text-faint self-center hidden md:block">
                  ⌘ / to focus
                </span>
              </div>
            </form>

            {/* Results */}
            <div className="mt-10 min-h-[40px]">
              {loading && (
                <div className="font-mono text-[12px] text-muted">
                  <span className="text-accent">›</span> retrieving from notebook…
                </div>
              )}

              {error && !loading && (
                <div className="font-mono text-[12px] text-accent">{error}</div>
              )}

              {result && !loading && (
                <div className="animate-[fadein_400ms_ease-out]">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 label text-faint mb-5">
                    <span>Retrieved</span>
                    <span className="text-muted">{result.hits.length} {result.hits.length === 1 ? 'entry' : 'entries'}</span>
                    <span>·</span>
                    <span className="text-muted">{result.took_ms} ms</span>
                    <span>·</span>
                    <span className="text-muted">{result.notebook}</span>
                  </div>

                  <ul className="divide-y divide-rule border-t border-b border-rule">
                    {result.hits.map((h, i) => (
                      <li
                        key={h.index}
                        className="py-5 grid grid-cols-12 gap-4"
                        style={{ animation: `fadein 350ms ease-out ${i * 80}ms both` }}
                      >
                        <div className="col-span-12 md:col-span-3 space-y-1">
                          <div className="font-mono text-[11px] text-faint">§ {h.index}</div>
                          {!result.empty && (
                            <div className="font-mono text-[11px] text-accent">{h.relevance}% match</div>
                          )}
                          <div className="font-mono text-[11px] text-muted">{h.year}</div>
                        </div>
                        <div className="col-span-12 md:col-span-9">
                          <a
                            href={h.href}
                            className="display text-[20px] md:text-[22px] leading-[1.25] text-ink hover:text-accent transition-colors block"
                          >
                            {h.title}
                          </a>
                          <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                            <span className="label text-faint mr-2">{h.label}</span>
                            {h.snippet}
                          </p>
                          <a
                            href={h.href}
                            className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-accent hover:underline"
                          >
                            Jump to entry ↓
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] text-faint">
                      Retrieval: local BM25-ish · Generation: offline (swap in OPENAI_API_KEY to enable synthesis)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
