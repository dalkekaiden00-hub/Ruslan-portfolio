import Image from 'next/image'
import { Container } from '../layout/Container'
import { Meta } from '../ui/Meta'
import { Rule } from '../ui/Rule'
import { profile } from '@/lib/data'

export function Hero() {
  return (
    <section id="top" className="pt-20 md:pt-28 pb-20 md:pb-28">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          {/* Marginalia */}
          <aside className="col-span-12 md:col-span-2 flex flex-col gap-2 mb-8 md:mb-0">
            <Meta k="§"         v="00" />
            <Meta k="Entry"     v={profile.meta.updated} />
            <Meta k="Revision"  v={profile.meta.version} />
            <Meta k="Status"    v="Open for work" />
          </aside>

          {/* Headline + plate */}
          <div className="col-span-12 md:col-span-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-6">
              {profile.role}
            </p>

            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-8">
                <h1 className="display text-[44px] sm:text-[60px] md:text-[72px] leading-[1.02] tracking-[-0.025em] text-ink">
                  {profile.tagline.split(' ').map((w, i, arr) => {
                    const isLast = i === arr.length - 1
                    return (
                      <span key={i}>
                        {isLast ? <em className="italic font-light text-accent">{w}</em> : w}
                        {i < arr.length - 1 && ' '}
                      </span>
                    )
                  })}
                </h1>

                <p className="mt-10 max-w-[52ch] text-lead text-muted leading-[1.6]">
                  {profile.intro}
                </p>
              </div>

              {/* Plate */}
              <figure className="col-span-12 md:col-span-4 md:mt-2">
                <div className="relative aspect-[4/5] border border-rule bg-hi overflow-hidden rounded-sm">
                  <Image
                    src="/images/projects/hero.jpg"
                    alt="Abstract architectural cross-section — AI system layers"
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint flex justify-between">
                  <span>Plate · I</span>
                  <span>Cover</span>
                </figcaption>
              </figure>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 max-w-3xl">
              {profile.focus.map((f, i) => (
                <div key={f} className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                  <span className="font-sans text-[14px] text-ink">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Rule className="mt-20 md:mt-24" />
      </Container>
    </section>
  )
}
