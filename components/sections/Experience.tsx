import { Container } from '../layout/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Rule } from '../ui/Rule'
import { experience, openSource } from '@/lib/data'

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <Container>
        <SectionHeader index="§ 03" label="Experience" title="Seven years, four places." />

        <ol className="border-t border-rule">
          {experience.map((r, i) => (
            <li
              key={r.company + i}
              className="grid grid-cols-12 gap-4 md:gap-6 py-8 md:py-10 border-b border-rule"
            >
              <div className="col-span-12 md:col-span-3">
                <div className="font-mono text-[12px] text-muted flex items-center gap-2">
                  {r.period}
                  {r.current && <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" aria-label="current" />}
                </div>
                <div className="mt-2 label text-faint">{r.scope}</div>
              </div>

              <div className="col-span-12 md:col-span-3">
                <div className="display text-[22px] leading-[1.25] text-ink">{r.company}</div>
                <div className="text-[13px] text-accent mt-1 italic">{r.role}</div>
              </div>

              <div className="col-span-12 md:col-span-6">
                <p className="text-[14px] text-ink leading-[1.65]">{r.note}</p>

                {r.wins && (
                  <ul className="mt-4 space-y-1.5">
                    {r.wins.map((w, j) => (
                      <li key={j} className="flex gap-2 text-[13px] leading-[1.6] text-muted">
                        <span className="font-mono text-accent mt-0.5 shrink-0">·</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {r.stack && (
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                    {r.stack.map((s) => (
                      <span key={s} className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <Rule className="mt-16" />

        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="label text-faint">§ 03.1</div>
            <div className="display text-[22px] text-ink mt-1">Open source & writing</div>
          </div>
          <ul className="col-span-12 md:col-span-9 space-y-4">
            {openSource.map((o) => (
              <li key={o.name} className="grid grid-cols-12 gap-4 border-b border-rule pb-4">
                <div className="col-span-12 md:col-span-3">
                  <div className="display text-[18px] text-ink italic">{o.name}</div>
                  <div className="font-mono text-[11px] text-muted mt-0.5">{o.role}</div>
                </div>
                <div className="col-span-12 md:col-span-7 text-[14px] text-muted leading-[1.6]">
                  {o.summary}
                </div>
                <div className="col-span-12 md:col-span-2 font-mono text-[11px] text-faint md:text-right">
                  {o.stars}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
