interface HeroDiagramProps {
  labels: { web: string; software: string; automation: string; support: string };
}

/**
 * Homepage motion graphic: a delivery-flow board. Service work enters as
 * organized cards, moves through a build surface, and resolves into live
 * operating signals.
 */
export function HeroDiagram({ labels }: HeroDiagramProps) {
  const cards = [
    { index: '01', label: labels.web, x: 48, y: 64, bar: 64, delay: '0s' },
    { index: '02', label: labels.software, x: 48, y: 136, bar: 76, delay: '-0.7s' },
    { index: '03', label: labels.automation, x: 48, y: 208, bar: 68, delay: '-1.4s' },
    { index: '04', label: labels.support, x: 48, y: 280, bar: 62, delay: '-2.1s' },
  ];

  const routes = [
    { d: 'M188 92 C226 92 226 118 258 118', delay: '0s' },
    { d: 'M188 164 C226 164 226 170 258 170', delay: '-0.9s' },
    { d: 'M188 236 C226 236 226 222 258 222', delay: '-1.8s' },
    { d: 'M188 308 C226 308 226 274 258 274', delay: '-2.7s' },
    { d: 'M338 118 C374 118 380 102 416 102', delay: '-0.4s' },
    { d: 'M338 196 C374 196 382 178 416 178', delay: '-1.3s' },
    { d: 'M338 274 C374 274 382 254 416 254', delay: '-2.2s' },
  ];

  const tasks = [
    { x: 280, y: 96, width: 44, delay: '0s' },
    { x: 272, y: 144, width: 56, delay: '-0.8s' },
    { x: 284, y: 192, width: 40, delay: '-1.6s' },
    { x: 270, y: 240, width: 62, delay: '-2.4s' },
  ];

  const outputs = [
    { y: 96, width: 34, delay: '0s' },
    { y: 152, width: 46, delay: '-0.75s' },
    { y: 208, width: 40, delay: '-1.5s' },
    { y: 264, width: 48, delay: '-2.25s' },
  ];

  return (
    <svg
      viewBox="0 0 560 360"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={`${labels.web}, ${labels.software}, ${labels.automation}, ${labels.support}`}
    >
      <defs>
        <linearGradient id="dh-flow-bg" x1="48" x2="512" y1="20" y2="340">
          <stop offset="0%" stopColor="#202838" />
          <stop offset="52%" stopColor="#121a28" />
          <stop offset="100%" stopColor="#090f18" />
        </linearGradient>
        <linearGradient id="dh-flow-edge" x1="56" x2="504" y1="36" y2="324">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(54,217,155,0.24)" />
        </linearGradient>
        <linearGradient id="dh-flow-scan-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-bright)" stopOpacity="0" />
          <stop offset="48%" stopColor="var(--color-accent-bright)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--color-accent-bright)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="dh-flow-live-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="var(--color-accent-bright)" stopOpacity="0.34" />
          <stop offset="58%" stopColor="var(--color-accent-bright)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--color-accent-bright)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="dh-flow-clip">
          <rect x="22" y="20" width="516" height="320" rx="30" />
        </clipPath>
        <clipPath id="dh-build-clip">
          <rect x="244" y="58" width="112" height="244" rx="20" />
        </clipPath>
      </defs>

      <rect
        x="22"
        y="20"
        width="516"
        height="320"
        rx="30"
        fill="url(#dh-flow-bg)"
        stroke="url(#dh-flow-edge)"
      />

      <g clipPath="url(#dh-flow-clip)" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`flow-grid-v-${i}`}
            x1={70 + i * 54}
            y1="20"
            x2={70 + i * 54}
            y2="340"
            stroke="rgba(255,255,255,0.035)"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`flow-grid-h-${i}`}
            x1="22"
            y1={60 + i * 52}
            x2="538"
            y2={60 + i * 52}
            stroke="rgba(255,255,255,0.035)"
          />
        ))}
        <circle cx="316" cy="182" r="106" fill="url(#dh-flow-live-glow)" opacity="0.62" />
      </g>

      {routes.map((route, index) => (
        <g key={`${route.d}-${index}`} aria-hidden="true">
          <path
            d={route.d}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
          <path
            d={route.d}
            fill="none"
            stroke="var(--color-accent-bright)"
            strokeWidth="2"
            strokeLinecap="round"
            className="dh-flow-route"
            style={{ animationDelay: route.delay }}
          />
        </g>
      ))}

      {cards.map((card) => {
        const isLongLabel = card.label.length > 16;

        return (
          <g
            key={card.index}
            className="dh-flow-card"
            style={{ animationDelay: card.delay }}
          >
            <rect
              x={card.x}
              y={card.y}
              width="140"
              height="52"
              rx="14"
              fill="rgba(255,255,255,0.052)"
              stroke="rgba(255,255,255,0.12)"
            />
            <rect
              x={card.x + 12}
              y={card.y + 12}
              width="22"
              height="22"
              rx="7"
              fill="rgba(54,217,155,0.1)"
              stroke="rgba(54,217,155,0.28)"
            />
            <text
              x={card.x + 18}
              y={card.y + 27}
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              fill="var(--color-accent-bright)"
            >
              {card.index}
            </text>
            <text
              x={card.x + 46}
              y={card.y + 22}
              fontFamily="var(--font-mono)"
              fontSize={isLongLabel ? 8.6 : 9.5}
              textLength={isLongLabel ? 76 : undefined}
              lengthAdjust={isLongLabel ? 'spacingAndGlyphs' : undefined}
              fill="#e9edf4"
            >
              {card.label}
            </text>
            <rect
              x={card.x + 46}
              y={card.y + 32}
              width="76"
              height="4"
              rx="2"
              fill="rgba(255,255,255,0.12)"
            />
            <rect
              x={card.x + 46}
              y={card.y + 32}
              width={card.bar}
              height="4"
              rx="2"
              fill="var(--color-accent-bright)"
              className="dh-flow-fill"
              style={{ animationDelay: card.delay }}
            />
          </g>
        );
      })}

      <g aria-hidden="true">
        <rect
          x="244"
          y="58"
          width="112"
          height="244"
          rx="20"
          fill="rgba(255,255,255,0.055)"
          stroke="rgba(255,255,255,0.14)"
        />
        <g clipPath="url(#dh-build-clip)">
          <rect
            x="244"
            y="34"
            width="112"
            height="62"
            fill="url(#dh-flow-scan-fill)"
            className="dh-flow-scan"
          />
          <line x1="281" y1="74" x2="281" y2="286" stroke="rgba(255,255,255,0.07)" />
          <line x1="319" y1="74" x2="319" y2="286" stroke="rgba(255,255,255,0.07)" />
        </g>
        <rect x="264" y="78" width="72" height="206" rx="15" fill="rgba(7,12,20,0.54)" />
        {tasks.map((task, index) => (
          <g key={`${task.y}-${index}`} className="dh-flow-task" style={{ animationDelay: task.delay }}>
            <rect
              x={task.x}
              y={task.y}
              width="38"
              height="28"
              rx="8"
              fill="rgba(255,255,255,0.072)"
              stroke="rgba(255,255,255,0.12)"
            />
            <rect
              x={task.x + 8}
              y={task.y + 9}
              width={task.width / 2}
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.56)"
            />
            <rect
              x={task.x + 8}
              y={task.y + 17}
              width={task.width / 2.8}
              height="3"
              rx="1.5"
              fill="var(--color-accent-bright)"
              opacity="0.72"
            />
          </g>
        ))}
        <circle
          cx="300"
          cy="180"
          r="30"
          fill="rgba(54,217,155,0.08)"
          className="dh-flow-halo"
        />
        <rect
          x="286"
          y="166"
          width="28"
          height="28"
          rx="8"
          fill="var(--color-accent-bright)"
          className="dh-flow-node"
        />
        <path
          d="M293 180 L298 185 L308 174"
          fill="none"
          stroke="#071017"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g aria-hidden="true">
        <rect
          x="416"
          y="66"
          width="104"
          height="232"
          rx="18"
          fill="rgba(255,255,255,0.045)"
          stroke="rgba(255,255,255,0.12)"
        />
        <rect x="436" y="88" width="42" height="8" rx="4" fill="rgba(255,255,255,0.54)" />
        <rect x="436" y="106" width="64" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
        {outputs.map((output, index) => (
          <g key={output.y}>
            <circle
              cx="438"
              cy={output.y + 66}
              r="4.5"
              fill="var(--color-accent-bright)"
              className="dh-flow-pulse"
              style={{ animationDelay: output.delay }}
            />
            <rect
              x="452"
              y={output.y + 63}
              width="48"
              height="6"
              rx="3"
              fill="rgba(255,255,255,0.12)"
            />
            <rect
              x="452"
              y={output.y + 63}
              width={output.width}
              height="6"
              rx="3"
              fill="var(--color-accent-bright)"
              className="dh-flow-output"
              style={{ animationDelay: output.delay }}
            />
            {index < outputs.length - 1 ? (
              <line
                x1="436"
                y1={output.y + 86}
                x2="500"
                y2={output.y + 86}
                stroke="rgba(255,255,255,0.06)"
              />
            ) : null}
          </g>
        ))}
      </g>
    </svg>
  );
}
