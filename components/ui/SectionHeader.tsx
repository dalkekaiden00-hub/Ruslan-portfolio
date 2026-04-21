import { Rule } from './Rule'

export function SectionHeader({
  index,
  label,
  title,
}: {
  index: string
  label: string
  title?: string
}) {
  return (
    <header className="mb-10 md:mb-14">
      <Rule className="mb-6" />
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{index}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{label}</span>
      </div>
      {title && (
        <h2 className="display text-h2 md:text-h1 text-ink mt-4 max-w-3xl">{title}</h2>
      )}
    </header>
  )
}
