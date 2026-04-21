export function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.12em]">
      <span className="text-faint">{k}</span>
      <span className="text-muted normal-case tracking-normal text-[12px]">{v}</span>
    </div>
  )
}
