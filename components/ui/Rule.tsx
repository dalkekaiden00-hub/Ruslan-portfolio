export function Rule({ className = '' }: { className?: string }) {
  return <div className={`rule-h ${className}`} aria-hidden="true" />
}
