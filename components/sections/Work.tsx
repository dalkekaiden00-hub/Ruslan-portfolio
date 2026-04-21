import { Container } from '../layout/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Rule } from '../ui/Rule'
import { Architecture } from '../ui/Architecture'
import { projects, type Project } from '@/lib/data'

function ProjectEntry({ p }: { p: Project }) {
  return (
    <article
      id={`entry-${p.index}`}
      className="grid grid-cols-12 gap-6 py-16 md:py-20 first:pt-0 scroll-mt-24"
    >
      {/* Left margin: metadata */}
      <aside className="col-span-12 md:col-span-3 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Entry</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">{p.index}</span>
        </div>

        <div>
          <div className="label">Codename</div>
          <div className="mt-1 display text-[22px] text-accent italic">{p.codename}</div>
        </div>

        <div>
          <div className="label">Year · Status</div>
          <div className="mt-0.5 font-mono text-[12px] text-ink">{p.year} · <span className="text-accent">{p.status}</span></div>
        </div>

        <div>
          <div className="label">Kind</div>
          <div className="mt-0.5 font-mono text-[11px] text-muted leading-relaxed">{p.kind}</div>
        </div>

        <div>
          <div className="label">Role</div>
          <div className="mt-0.5 text-[12px] text-ink leading-relaxed">{p.role}</div>
        </div>

        <div>
          <div className="label">Team</div>
          <div className="mt-0.5 text-[12px] text-muted leading-relaxed">{p.team}</div>
        </div>
      </aside>

      {/* Main body */}
      <div className="col-span-12 md:col-span-9">
        <h3 className="display text-[28px] md:text-[38px] leading-[1.15] tracking-[-0.02em] text-ink max-w-[26ch]">
          {p.title}
        </h3>

        <p className="mt-5 text-lead leading-[1.6] text-muted max-w-[60ch]">
          {p.summary}
        </p>

        {/* Architecture diagram */}
        <div className="mt-10">
          <Architecture kind={p.architecture} />
        </div>

        {/* Arc */}
        <dl className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-5 md:gap-x-6 max-w-[72ch]">
          {[
            { k: 'Problem',         v: p.arc.problem,         n: 'a' },
            { k: 'Instrumentation', v: p.arc.instrumentation, n: 'b' },
            { k: 'Finding',         v: p.arc.finding,         n: 'c' },
          ].map((row) => (
            <div key={row.k} className="md:col-span-12 grid grid-cols-12 gap-4">
              <dt className="col-span-12 md:col-span-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                  <span className="text-accent mr-2">{row.n}.</span>{row.k}
                </div>
              </dt>
              <dd className="col-span-12 md:col-span-9 text-body leading-[1.7] text-ink">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>

        {/* Highlights */}
        {p.highlights && (
          <div className="mt-10 max-w-[72ch]">
            <div className="label mb-3 text-faint">Engineering notes</div>
            <ul className="space-y-2.5">
              {p.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-ink">
                  <span className="font-mono text-[11px] text-accent mt-1.5 shrink-0">—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metrics */}
        {p.metrics && (
          <div className="mt-10 border-t border-rule pt-5">
            <div className="label mb-4 text-faint">Measured outcomes</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[68ch]">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <div className="label">{m.label}</div>
                  <div className="mt-1 display text-[22px] md:text-[26px] text-ink">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scale */}
        {p.scale && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {p.scale.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="label text-faint">{s.label}</span>
                <span className="font-mono text-[12px] text-muted">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stack */}
        <div className="mt-8 pt-5 border-t border-rule flex flex-wrap gap-x-4 gap-y-2">
          <span className="label text-faint">Stack</span>
          {p.stack.map((s) => (
            <span key={s} className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              · {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Work() {
  return (
    <section id="work" className="py-20 md:py-28">
      <Container>
        <SectionHeader index="§ 02" label="Selected Work" title="Five case studies, written as lab entries." />

        <div className="divide-y divide-rule">
          {projects.map((p) => (
            <ProjectEntry key={p.index} p={p} />
          ))}
        </div>

        <Rule className="mt-16" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          Additional work under NDA · available on request
        </p>
      </Container>
    </section>
  )
}
