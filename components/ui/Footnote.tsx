import { ReactNode } from 'react'

export function Footnote({ n, children }: { n: number | string; children: ReactNode }) {
  return (
    <p className="font-mono text-[12px] leading-[1.6] text-muted">
      <sup className="text-accent mr-2">{n}</sup>
      {children}
    </p>
  )
}
