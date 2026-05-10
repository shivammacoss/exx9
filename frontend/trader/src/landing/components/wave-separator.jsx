'use client'

/**
 * WaveSeparator — beautiful animated SVG wave dividers between sections.
 *
 * Variants:
 *   - 'curve'    : single smooth curve (default)
 *   - 'dual'     : two layered waves with depth
 *   - 'sharp'    : sharper wave with steeper crests
 *   - 'tide'     : three-layer animated tide (slow drift)
 *   - 'split'    : top + bottom curves with brand glow band
 *
 * Color modes:
 *   - 'brand'    : emerald → lime gradient (default)
 *   - 'mint'     : softer mint tones
 *   - 'dark'     : dark overlay for hero-to-content transition
 *   - 'light'    : near-white for subtle separation between light sections
 *
 * Direction:
 *   - 'down' (default) — wave dips into the next section
 *   - 'up'             — wave bulges up into the previous section
 *
 * The separator sits in the document flow (no negative margins),
 * so it visually bridges two adjacent sections without breaking layout.
 */

const GRADIENTS = {
  brand: { from: '#047857', via: '#10b981', to: '#84cc16' },
  mint:  { from: '#a7f3d0', via: '#86efac', to: '#bef264' },
  dark:  { from: '#022c22', via: '#064e3b', to: '#065f46' },
  light: { from: '#f0fdf4', via: '#ecfdf5', to: '#f7fee7' },
}

export function WaveSeparator({
  variant = 'curve',
  color = 'brand',
  direction = 'down',
  height = 100,
  className = '',
  bg = 'transparent',
}) {
  const gradId = `wave-grad-${color}-${Math.random().toString(36).slice(2, 9)}`
  const palette = GRADIENTS[color] || GRADIENTS.brand
  const flip = direction === 'up' ? 'rotate(180deg)' : 'none'

  return (
    <div
      className={`wave-separator wave-separator--${variant} ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        lineHeight: 0,
        background: bg,
        overflow: 'hidden',
        transform: flip,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: `${height}px` }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={palette.from} />
            <stop offset="50%"  stopColor={palette.via} />
            <stop offset="100%" stopColor={palette.to} />
          </linearGradient>
          <linearGradient id={`${gradId}-soft`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={palette.from} stopOpacity="0.55" />
            <stop offset="100%" stopColor={palette.to}   stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {variant === 'curve' && (
          <path
            d="M0,64 C240,112 480,16 720,48 C960,80 1200,112 1440,72 L1440,120 L0,120 Z"
            fill={`url(#${gradId})`}
          />
        )}

        {variant === 'sharp' && (
          <path
            d="M0,40 L240,90 L480,30 L720,80 L960,30 L1200,90 L1440,40 L1440,120 L0,120 Z"
            fill={`url(#${gradId})`}
          />
        )}

        {variant === 'dual' && (
          <>
            <path
              d="M0,72 C240,40 480,108 720,72 C960,36 1200,108 1440,72 L1440,120 L0,120 Z"
              fill={`url(#${gradId}-soft)`}
            />
            <path
              d="M0,84 C240,56 480,116 720,84 C960,52 1200,116 1440,84 L1440,120 L0,120 Z"
              fill={`url(#${gradId})`}
              opacity="0.85"
            />
          </>
        )}

        {variant === 'tide' && (
          <>
            <path
              d="M0,80 C360,40 720,120 1080,80 C1260,60 1350,90 1440,80 L1440,120 L0,120 Z"
              fill={`url(#${gradId}-soft)`}
              opacity="0.45"
            >
              <animate
                attributeName="d"
                dur="14s"
                repeatCount="indefinite"
                values="
                  M0,80 C360,40 720,120 1080,80 C1260,60 1350,90 1440,80 L1440,120 L0,120 Z;
                  M0,90 C360,60 720,100 1080,90 C1260,75 1350,80 1440,90 L1440,120 L0,120 Z;
                  M0,80 C360,40 720,120 1080,80 C1260,60 1350,90 1440,80 L1440,120 L0,120 Z"
              />
            </path>
            <path
              d="M0,90 C360,60 720,110 1080,90 C1260,75 1350,95 1440,90 L1440,120 L0,120 Z"
              fill={`url(#${gradId}-soft)`}
              opacity="0.65"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
                  M0,90 C360,60 720,110 1080,90 C1260,75 1350,95 1440,90 L1440,120 L0,120 Z;
                  M0,86 C360,68 720,104 1080,86 C1260,72 1350,90 1440,86 L1440,120 L0,120 Z;
                  M0,90 C360,60 720,110 1080,90 C1260,75 1350,95 1440,90 L1440,120 L0,120 Z"
              />
            </path>
            <path
              d="M0,100 C360,80 720,108 1080,100 C1260,92 1350,104 1440,100 L1440,120 L0,120 Z"
              fill={`url(#${gradId})`}
            >
              <animate
                attributeName="d"
                dur="7s"
                repeatCount="indefinite"
                values="
                  M0,100 C360,80 720,108 1080,100 C1260,92 1350,104 1440,100 L1440,120 L0,120 Z;
                  M0,96 C360,84 720,112 1080,96 C1260,88 1350,108 1440,96 L1440,120 L0,120 Z;
                  M0,100 C360,80 720,108 1080,100 C1260,92 1350,104 1440,100 L1440,120 L0,120 Z"
              />
            </path>
          </>
        )}

        {variant === 'split' && (
          <>
            <path
              d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,0 L0,0 Z"
              fill={`url(#${gradId}-soft)`}
              opacity="0.35"
            />
            <path
              d="M0,76 C240,36 480,116 720,76 C960,36 1200,116 1440,76 L1440,120 L0,120 Z"
              fill={`url(#${gradId})`}
            />
          </>
        )}
      </svg>
    </div>
  )
}

export default WaveSeparator
