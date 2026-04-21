import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Architecture } from '@/components/ui/Architecture'
import { ProductShot } from '@/components/ui/ProductShot'
import { projects, profile } from '@/lib/data'

const PLATE_ROMAN = ['II', 'III', 'IV', 'V', 'VI']

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  if (!p) return { title: 'Entry not found' }
  return {
    title:       `${p.codename} — ${profile.name}`,
    description: p.summary,
  }
}

export default async function WorkDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx < 0) notFound()
  const p     = projects[idx]
  const prev  = projects[(idx - 1 + projects.length) % projects.length]
  const next  = projects[(idx + 1) % projects.length]
  const plate = PLATE_ROMAN[idx] ?? `${idx + 2}`

  return (
    <article className="pb-20">
      {/* Breadcrumb */}
      <div className="pt-6 pb-3 border-b border-rule">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <nav className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted flex items-center gap-2 min-w-0">
              <Link href="/" className="hover:text-accent transition-colors">Notebook</Link>
              <span className="text-faint">/</span>
              <Link href="/#work" className="hover:text-accent transition-colors">Work</Link>
              <span className="text-faint">/</span>
              <span className="text-ink truncate">§ {p.index} · {p.codename}</span>
            </nav>
            <Link
              href="/"
              aria-label="Close and return home"
              className="group shrink-0 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors"
            >
              <span className="hidden sm:inline">Close</span>
              <span className="flex items-center justify-center w-7 h-7 border border-rule rounded-full group-hover:border-ink transition-colors text-[14px]" aria-hidden="true">×</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* Header */}
      <header className="pt-12 md:pt-20 pb-10 md:pb-14">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-12 md:col-span-3 space-y-4">
              <div>
                <div className="label text-faint">Entry</div>
                <div className="mt-1 font-mono text-[12px] text-ink">§ {p.index}</div>
              </div>
              <div>
                <div className="label text-faint">Codename</div>
                <div className="mt-1 display text-[26px] text-accent italic">{p.codename}</div>
              </div>
              <div>
                <div className="label text-faint">Year · Status</div>
                <div className="mt-1 font-mono text-[12px] text-ink">
                  {p.year} · <span className="text-accent">{p.status}</span>
                </div>
              </div>
              <div>
                <div className="label text-faint">Role</div>
                <div className="mt-1 text-[13px] text-ink leading-relaxed">{p.role}</div>
              </div>
              <div>
                <div className="label text-faint">Team</div>
                <div className="mt-1 text-[13px] text-muted leading-relaxed">{p.team}</div>
              </div>
              <div>
                <div className="label text-faint">Kind</div>
                <div className="mt-1 font-mono text-[11px] text-muted leading-relaxed">{p.kind}</div>
              </div>
            </aside>

            <div className="col-span-12 md:col-span-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint mb-4">
                Plate · {plate}
              </p>
              <h1 className="display text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.025em] text-ink max-w-[24ch]">
                {p.title}
              </h1>
              <p className="mt-6 md:mt-8 text-lead leading-[1.6] text-muted max-w-[62ch]">
                {p.summary}
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* Cover */}
      <div className="py-2">
        <Container>
          <figure className="border border-rule overflow-hidden rounded-sm">
            <div className="relative aspect-[16/9]">
              <ProductShot kind={p.architecture} />
            </div>
            <figcaption className="border-t border-rule px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint flex justify-between bg-paper">
              <span>Plate · {plate} · {p.codename}</span>
              <span>Interface preview</span>
            </figcaption>
          </figure>
        </Container>
      </div>

      {/* Architecture */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="label text-faint">§ {p.index}.a</div>
              <div className="display text-[22px] text-ink mt-1">System diagram</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Architecture kind={p.architecture} />
            </div>
          </div>
        </Container>
      </section>

      {/* Arc */}
      <section className="py-12 md:py-16 border-t border-rule">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="label text-faint">§ {p.index}.b</div>
              <div className="display text-[22px] text-ink mt-1">Arc</div>
            </div>
            <dl className="col-span-12 md:col-span-9 space-y-8 max-w-[72ch]">
              {[
                { k: 'Problem',         v: p.arc.problem,         n: 'i' },
                { k: 'Instrumentation', v: p.arc.instrumentation, n: 'ii' },
                { k: 'Finding',         v: p.arc.finding,         n: 'iii' },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint mb-2">
                    <span className="text-accent mr-2">{row.n}.</span>{row.k}
                  </dt>
                  <dd className="text-lead leading-[1.7] text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      {p.highlights && (
        <section className="py-12 md:py-16 border-t border-rule">
          <Container>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <div className="label text-faint">§ {p.index}.c</div>
                <div className="display text-[22px] text-ink mt-1">Engineering notes</div>
              </div>
              <ul className="col-span-12 md:col-span-9 space-y-3.5 max-w-[72ch]">
                {p.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-ink">
                    <span className="font-mono text-[11px] text-accent mt-1.5 shrink-0">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Metrics + scale */}
      {p.metrics && (
        <section className="py-12 md:py-16 border-t border-rule">
          <Container>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <div className="label text-faint">§ {p.index}.d</div>
                <div className="display text-[22px] text-ink mt-1">Measured outcomes</div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[68ch]">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="label">{m.label}</div>
                      <div className="mt-1 display text-[26px] md:text-[30px] text-ink">{m.value}</div>
                    </div>
                  ))}
                </div>

                {p.scale && (
                  <div className="mt-6 pt-4 border-t border-rule flex flex-wrap gap-x-6 gap-y-2">
                    {p.scale.map((s) => (
                      <div key={s.label} className="flex items-baseline gap-2">
                        <span className="label text-faint">{s.label}</span>
                        <span className="font-mono text-[12px] text-muted">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Stack */}
      <section className="py-12 md:py-16 border-t border-rule">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="label text-faint">§ {p.index}.e</div>
              <div className="display text-[22px] text-ink mt-1">Stack</div>
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-4 gap-y-2">
              {p.stack.map((s) => (
                <span key={s} className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                  · {s}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Prev / next */}
      <nav className="py-12 border-t border-rule">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <Link
              href={`/work/${prev.slug}`}
              className="col-span-12 md:col-span-6 group"
            >
              <div className="label text-faint">Previous</div>
              <div className="mt-1 font-mono text-[11px] text-muted">← § {prev.index}</div>
              <div className="display text-[22px] text-ink group-hover:text-accent transition-colors mt-1">
                {prev.codename} <span className="text-faint text-[14px]">— {prev.title}</span>
              </div>
            </Link>
            <Link
              href={`/work/${next.slug}`}
              className="col-span-12 md:col-span-6 md:text-right group"
            >
              <div className="label text-faint">Next</div>
              <div className="mt-1 font-mono text-[11px] text-muted">§ {next.index} →</div>
              <div className="display text-[22px] text-ink group-hover:text-accent transition-colors mt-1">
                {next.codename} <span className="text-faint text-[14px]">— {next.title}</span>
              </div>
            </Link>
          </div>
        </Container>
      </nav>
    </article>
  )
}
