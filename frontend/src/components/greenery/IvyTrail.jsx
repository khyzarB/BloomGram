export default function IvyTrail({ width = 100, height = 230, flip = false }) {
  const ivyLeaf = (cx, cy, scale, rot, shade) => (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${scale})`}>
      {/* 5-lobed ivy leaf */}
      <path
        d="M0,8 C-4,4 -14,2 -15,-4 C-16,-10 -10,-16 -6,-12 C-10,-18 -8,-26 0,-28 C8,-26 10,-18 6,-12 C10,-16 16,-10 15,-4 C14,2 4,4 0,8Z"
        fill={shade}
      />
      {/* Shadow on right half */}
      <path
        d="M0,8 C4,4 14,2 15,-4 C16,-10 10,-16 6,-12 C10,-18 8,-26 0,-28 L0,8Z"
        fill="#14532d" opacity="0.25"
      />
      {/* Veins */}
      <line x1="0" y1="8" x2="0" y2="-28" stroke="#22c55e" strokeWidth="0.7" opacity="0.5" />
      <line x1="0" y1="-6" x2="-13" y2="-6" stroke="#22c55e" strokeWidth="0.5" opacity="0.35" />
      <line x1="0" y1="-6" x2="13" y2="-6" stroke="#22c55e" strokeWidth="0.5" opacity="0.35" />
      <line x1="0" y1="-16" x2="-7" y2="-22" stroke="#22c55e" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="-16" x2="7" y2="-22" stroke="#22c55e" strokeWidth="0.4" opacity="0.3" />
      {/* Highlight */}
      <ellipse cx="-3" cy="-10" rx="4" ry="6" fill="#34d399" opacity="0.1" />
    </g>
  );

  return (
    <svg viewBox="0 0 100 230" width={width} height={height} xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {/* Stem 1 — winds left */}
      <path d="M50,225 C46,195 38,165 30,135 C22,105 20,75 25,48 C30,25 22,12 18,5" stroke="#15803d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Stem 2 — winds right */}
      <path d="M50,225 C54,190 58,158 62,128 C66,98 68,70 64,45 C60,25 65,12 70,5" stroke="#15803d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Branch off stem 1 */}
      <path d="M30,135 C24,118 18,105 14,90" stroke="#166534" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Branch off stem 2 */}
      <path d="M62,128 C68,112 74,100 78,85" stroke="#166534" strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {/* Leaves on stem 1 */}
      {ivyLeaf(20, 8, 1.1, -12, '#166534')}
      {ivyLeaf(26, 40, 1.2, 15, '#1a7a3a')}
      {ivyLeaf(22, 72, 1.25, -18, '#166534')}
      {ivyLeaf(14, 92, 1.1, -30, '#15803d')}
      {ivyLeaf(28, 120, 1.2, 8, '#1a7a3a')}
      {ivyLeaf(34, 155, 1.15, 20, '#166534')}
      {ivyLeaf(42, 190, 1.0, 10, '#15803d')}

      {/* Leaves on stem 2 */}
      {ivyLeaf(68, 10, 1.0, 18, '#1a7a3a')}
      {ivyLeaf(62, 50, 1.15, -8, '#166534')}
      {ivyLeaf(66, 82, 1.2, 22, '#15803d')}
      {ivyLeaf(78, 88, 1.0, 35, '#166534')}
      {ivyLeaf(60, 115, 1.15, -5, '#1a7a3a')}
      {ivyLeaf(56, 148, 1.1, 12, '#166534')}
      {ivyLeaf(52, 180, 1.05, -10, '#15803d')}
    </svg>
  );
}
