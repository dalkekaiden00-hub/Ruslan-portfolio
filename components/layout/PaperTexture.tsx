/* Editorial backdrop. Three fixed, pointer-events-none layers:
   1. warm radial wash (gentle depth)
   2. SVG feTurbulence grain (paper fiber)
   3. hairline vertical rules in the gutters (notebook margin feel) */

export function PaperTexture() {
  return (
    <>
      {/* 1 — warm wash */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(1200px 700px at 15% 0%, #EFEADC 0%, transparent 60%), ' +
            'radial-gradient(1000px 800px at 95% 100%, #E7E0CF 0%, transparent 55%), ' +
            'linear-gradient(180deg, #F6F3EC 0%, #F2EEE4 100%)',
        }}
      />

      {/* 2 — grain */}
      <svg
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none mix-blend-multiply"
        style={{ zIndex: 0, opacity: 0.18 }}
      >
        <filter id="paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
            seed="7"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.35
                    0 0 0 0 0.32
                    0 0 0 0 0.28
                    0 0 0 0.35 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)" />
      </svg>

      {/* 3 — margin rules (desktop only, very faint) */}
      <div
        aria-hidden="true"
        className="fixed inset-y-0 pointer-events-none hidden lg:block"
        style={{
          zIndex: 0,
          left:   'max(24px, calc((100vw - 1200px) / 2 + 72px))',
          width:  '1px',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(212,206,193,0.6) 18%, rgba(212,206,193,0.6) 82%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-y-0 pointer-events-none hidden lg:block"
        style={{
          zIndex: 0,
          right:  'max(24px, calc((100vw - 1200px) / 2 + 72px))',
          width:  '1px',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(212,206,193,0.6) 18%, rgba(212,206,193,0.6) 82%, transparent 100%)',
        }}
      />
    </>
  )
}
