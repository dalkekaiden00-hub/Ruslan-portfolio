import Link from 'next/link'
import { Container } from '../layout/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Rule } from '../ui/Rule'
import { ProductShot } from '../ui/ProductShot'
import { projects, type Project } from '@/lib/data'

function WorkCard({ p }: { p: Project }) {
  const headline = p.metrics[0]
  return (
    <Link
      href={`/work/${p.slug}`}
      id={`entry-${p.index}`}
      className="group grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-7 scroll-mt-24 items-center hover:bg-hi/30 transition-colors -mx-3 px-3 rounded-sm"
    >
      {/* Thumbnail */}
      <div className="col-span-4 md:col-span-2">
        <div className="relative aspect-[16/9] border border-rule overflow-hidden rounded-sm group-hover:border-ink transition-colors">
          <ProductShot kind={p.architecture} />
        </div>
      </div>

      {/* Index + codename */}
      <div className="col-span-8 md:col-span-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          § {p.index}
        </div>
        <div className="display text-[22px] md:text-[24px] italic text-accent leading-[1.1] mt-1">
          {p.codename}
        </div>
        <div className="font-mono text-[11px] text-muted mt-1">{p.year}</div>
      </div>

      {/* Title + summary */}
      <div className="col-span-12 md:col-span-6">
        <h3 className="display text-[18px] md:text-[20px] leading-[1.3] text-ink group-hover:text-accent transition-colors">
          {p.title}
        </h3>
        <p className="mt-1.5 text-[13px] text-muted leading-[1.55] line-clamp-2">
          {p.summary}
        </p>
      </div>

      {/* Key metric + arrow */}
      <div className="col-span-12 md:col-span-2 md:text-right">
        {headline && (
          <>
            <div className="label text-faint">{headline.label}</div>
            <div className="display text-[20px] text-ink mt-0.5">{headline.value}</div>
          </>
        )}
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faint group-hover:text-accent transition-colors">
          Read ↗
        </div>
      </div>
    </Link>
  )
}

export function Work() {
  return (
    <section id="work" className="py-20 md:py-28">
      <Container>
        <SectionHeader
          index="§ 02"
          label="Selected Work"
          title="Five case studies, written as lab entries."
        />

        <div className="divide-y divide-rule border-t border-b border-rule">
          {projects.map((p) => (
            <WorkCard key={p.slug} p={p} />
          ))}
        </div>

        <Rule className="mt-12" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          Additional work under NDA · available on request
        </p>
      </Container>
    </section>
  )
}
