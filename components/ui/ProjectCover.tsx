import Image from 'next/image'

export function ProjectCover({
  src,
  plate,
  codename,
  caption,
}: {
  src:      string
  plate:    string
  codename: string
  caption?: string
}) {
  return (
    <figure className="border border-rule bg-hi/40 rounded-sm overflow-hidden">
      <div className="relative aspect-[16/9] bg-hi">
        <Image
          src={src}
          alt={`${codename} — generated cover`}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <figcaption className="border-t border-rule px-3 py-2 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          Plate · {plate} · {codename}
        </span>
        {caption && (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted truncate">
            {caption}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
