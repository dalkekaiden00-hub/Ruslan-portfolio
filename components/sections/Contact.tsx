import { Container } from '../layout/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { profile } from '@/lib/data'

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <Container>
        <SectionHeader index="§ 04" label="Contact" />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9">
            <p className="display text-[32px] md:text-[52px] leading-[1.1] tracking-[-0.02em] text-ink max-w-[22ch]">
              If you&rsquo;re building something that leans on LLMs and needs to
              {' '}<em className="italic font-light text-accent">actually work</em>, let&rsquo;s talk.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
              <a
                href={`mailto:${profile.contact.email}`}
                className="group block border-t border-ink pt-4 hover:border-accent transition-colors"
              >
                <div className="label text-faint">Email</div>
                <div className="mt-1 font-mono text-[13px] text-ink group-hover:text-accent transition-colors break-all">
                  {profile.contact.email}
                </div>
              </a>
              <a
                href={profile.contact.github}
                className="group block border-t border-ink pt-4 hover:border-accent transition-colors"
              >
                <div className="label text-faint">GitHub</div>
                <div className="mt-1 font-mono text-[13px] text-ink group-hover:text-accent transition-colors">
                  github.com/ruslansomin ↗
                </div>
              </a>
              <a
                href={profile.contact.linkedin}
                className="group block border-t border-ink pt-4 hover:border-accent transition-colors"
              >
                <div className="label text-faint">LinkedIn</div>
                <div className="mt-1 font-mono text-[13px] text-ink group-hover:text-accent transition-colors">
                  linkedin.com/in/ruslansomin ↗
                </div>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
