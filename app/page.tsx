import { Nav }        from '@/components/layout/Nav'
import { Footer }     from '@/components/layout/Footer'
import { Hero }       from '@/components/sections/Hero'
import { Ask }        from '@/components/sections/Ask'
import { About }      from '@/components/sections/About'
import { Work }       from '@/components/sections/Work'
import { Experience } from '@/components/sections/Experience'
import { Contact }    from '@/components/sections/Contact'

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <Nav />
      <Hero />
      <Ask />
      <About />
      <Work />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
