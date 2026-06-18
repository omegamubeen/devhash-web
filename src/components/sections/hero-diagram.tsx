interface HeroDiagramProps {
  labels: { web: string; software: string; automation: string; support: string };
}

/**
 * Hero "capability system" — a hub (DevHash) wired to the four capabilities.
 * Pure inline SVG: scales via viewBox, no image request, no layout shift, and
 * the travelling connector dots pause under prefers-reduced-motion.
 */
export function HeroDiagram({ labels }: HeroDiagramProps) {
  const nodes = [
    { x: 250, y: 40, label: labels.web },
    { x: 452, y: 190, label: labels.automation },
    { x: 250, y: 340, label: labels.support },
    { x: 48, y: 190, label: labels.software },
  ];

  return (
    <svg
      viewBox="0 0 500 380"
      className="h-auto w-full"
      role="img"
      aria-label={`${labels.web}, ${labels.software}, ${labels.automation}, ${labels.support}`}
    >
      <defs>
        <radialGradient id="dh-hub" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#1c2536" />
          <stop offset="100%" stopColor="#0e1420" />
        </radialGradient>
      </defs>

      {/* Connectors */}
      <g
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="3 6"
        strokeLinecap="round"
      >
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="250"
            y1="190"
            x2={n.x}
            y2={n.y}
            className="dh-wire"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </g>

      {/* Capability nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="6" fill="var(--color-accent-bright)" />
          <circle cx={n.x} cy={n.y} r="11" fill="none" stroke="var(--color-accent-bright)" strokeOpacity="0.3" />
          <rect
            x={n.x < 120 ? n.x + 16 : n.x > 380 ? n.x - 140 : n.x - 62}
            y={n.y - 15}
            width="124"
            height="30"
            rx="8"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.12)"
          />
          <text
            x={n.x < 120 ? n.x + 78 : n.x > 380 ? n.x - 78 : n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fill="#dfe3ea"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Hub */}
      <circle cx="250" cy="190" r="46" fill="url(#dh-hub)" stroke="rgba(255,255,255,0.14)" />
      <circle
        cx="250"
        cy="190"
        r="46"
        fill="none"
        stroke="var(--color-accent-bright)"
        strokeOpacity="0.35"
        strokeDasharray="2 5"
        className="dh-ring"
      />
      <path
        d="M243 174 L237 206 M257 174 L251 206 M232 183 L263 183 M230 197 L261 197"
        stroke="var(--color-accent-bright)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
