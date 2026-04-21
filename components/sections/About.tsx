import { Container } from '../layout/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { profile } from '@/lib/data'

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Container>
        <SectionHeader index="§ 01" label="About" title="A brief accounting." />

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 md:col-span-3 mb-6 md:mb-0">
            <div className="space-y-4">
              <div>
                <div className="label">Years</div>
                <div className="mt-1 text-h3 display">{profile.years}</div>
              </div>
              <div>
                <div className="label">Based</div>
                <div className="mt-1 text-[14px] text-ink">{profile.location}</div>
              </div>
            </div>
          </aside>

          <div className="col-span-12 md:col-span-9 space-y-6 max-w-[62ch]">
            <p className="text-lead leading-[1.7] text-ink">
              I work where research-grade AI meets the tolerances of production software. My focus is retrieval systems,
              agent tooling, and the evaluation infrastructure that keeps either honest.
            </p>
            <p className="text-body leading-[1.75] text-muted">
              Most of my shipped work lives behind a login, inside a compliance boundary, or under an NDA — so this
              site leans on case studies over screenshots. Each project below is written as a lab entry:
              the problem as it arrived, what was instrumented, and what the data eventually said.
            </p>
            <p className="text-body leading-[1.75] text-muted">
              Before AI absorbed the conversation, I spent several years as a full-stack engineer on Python, React,
              and the unglamorous backends that make products real. That pre-LLM muscle memory — types, tests,
              observability — is the reason the LLM work doesn&rsquo;t collapse under its own weight.
            </p>

            <div className="pt-6 mt-2 border-t border-rule grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
              {profile.stack.map((s) => (
                <div key={s} className="font-mono text-[12px] text-muted">
                  <span className="text-faint mr-2">·</span>{s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
