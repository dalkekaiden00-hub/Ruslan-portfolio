import { Container } from './Container'
import { profile } from '@/lib/data'

const links = [
  { href: '#ask',        label: 'Ask'        },
  { href: '#about',      label: 'About'      },
  { href: '#work',       label: 'Work'       },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact'    },
]

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-sm border-b border-rule">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <a href="#top" className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink">
            {profile.name} <span className="text-faint">/ {profile.meta.version}</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ink transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
          <a
            href={profile.contact.resume}
            download
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors"
          >
            Resume ↓
          </a>
        </div>
      </Container>
    </nav>
  )
}
