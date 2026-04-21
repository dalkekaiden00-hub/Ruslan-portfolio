import { ReactNode } from 'react'

export function Marginalia({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted leading-[1.5]">
      {label && <div className="text-faint mb-1">{label}</div>}
      <div className="normal-case tracking-normal text-[12px] text-muted">{children}</div>
    </aside>
  )
}
