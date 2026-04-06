export default function LeafSpray({ width = 80, height = 180, flip = false }) {
  const leaves = [
    { x: 22, y: 20, r: -30, s: 0.9 },
    { x: 35, y: 35, r: 20, s: 1.0 },
    { x: 24, y: 55, r: -25, s: 1.1 },
    { x: 36, y: 72, r: 15, s: 1.0 },
    { x: 26, y: 90, r: -20, s: 1.05 },
    { x: 38, y: 108, r: 12, s: 0.95 },
    { x: 28, y: 125, r: -18, s: 0.9 },
    { x: 36, y: 142, r: 10, s: 0.85 },
  ];

  return (
    <svg
      width={width} height={height}
      viewBox="0 0 80 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* Main stem */}
      <path d="M38 175 C36 150, 32 110, 28 80 C24 50, 26 30, 26 10" stroke="#3a7a32" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Branch stem */}
      <path d="M30 80 C38 65, 42 50, 44 35" stroke="#3a7a32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <ellipse cx="0" cy="0" rx="12" ry="6" fill={i % 2 === 0 ? '#3a8a3a' : '#4a9a4a'} />
          {/* Center vein */}
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#2d7a2d" strokeWidth="0.5" opacity="0.5" />
          {/* Side veins */}
          <line x1="-4" y1="0" x2="-7" y2="-3" stroke="#2d7a2d" strokeWidth="0.3" opacity="0.4" />
          <line x1="-4" y1="0" x2="-7" y2="3" stroke="#2d7a2d" strokeWidth="0.3" opacity="0.4" />
          <line x1="4" y1="0" x2="7" y2="-3" stroke="#2d7a2d" strokeWidth="0.3" opacity="0.4" />
          <line x1="4" y1="0" x2="7" y2="3" stroke="#2d7a32" strokeWidth="0.3" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
