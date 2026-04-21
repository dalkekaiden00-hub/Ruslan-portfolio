import { Container } from './Container'
import { Rule } from '../ui/Rule'
import { profile } from '@/lib/data'

export function Footer() {
  return (
    <footer className="mt-32 pb-12">
      <Container>
        <Rule className="mb-8" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <div>
            <div className="text-faint">© {new Date().getFullYear()}</div>
            <div className="text-ink mt-1 normal-case tracking-normal text-[13px] font-sans">
              {profile.name}
            </div>
          </div>
          <div className="flex gap-6">
            <a href={profile.contact.github}   className="hover:text-ink transition-colors">GitHub ↗</a>
            <a href={profile.contact.linkedin} className="hover:text-ink transition-colors">LinkedIn ↗</a>
            <a href={`mailto:${profile.contact.email}`} className="hover:text-ink transition-colors">Email ↗</a>
          </div>
          <div className="text-faint">
            Colophon · Set in Newsreader &amp; Inter · {profile.meta.updated}
          </div>
        </div>
      </Container>
    </footer>
  )
}
