export default function LeafSpray({ width = 100, height = 230, flip = false }) {
  const glossyLeaf = (cx, cy, rot, scale, shade) => (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${scale})`}>
      {/* Base leaf shape */}
      <path
        d="M0,0 C-14,-4 -18,-18 -14,-34 C-10,-46 0,-50 0,-50 C0,-50 10,-46 14,-34 C18,-18 14,-4 0,0Z"
        fill={shade}
      />
      {/* Dark shadow on right edge */}
      <path
        d="M0,0 C10,-4 14,-20 14,-34 C10,-46 0,-50 0,-50 L0,0Z"
        fill="#14532d" opacity="0.35"
      />
      {/* Gloss highlight */}
      <ellipse cx="-4" cy="-25" rx="4" ry="12" fill="white" opacity="0.18" />
      {/* Midrib */}
      <path d="M0,0 C0,-20 0,-40 0,-50" stroke="#166534" strokeWidth="0.8" fill="none" opacity="0.6" />
      {/* Side veins */}
      <line x1="0" y1="-12" x2="-10" y2="-18" stroke="#15803d" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="-12" x2="10" y2="-18" stroke="#15803d" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="-24" x2="-9" y2="-30" stroke="#15803d" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="-24" x2="9" y2="-30" stroke="#15803d" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="-36" x2="-7" y2="-40" stroke="#15803d" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="-36" x2="7" y2="-40" stroke="#15803d" strokeWidth="0.4" opacity="0.3" />
    </g>
  );

  return (
    <svg viewBox="0 0 100 230" width={width} height={height} xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {/* Central stem */}
      <path d="M50,225 C48,190 44,150 40,115 C36,80 34,50 33,20" stroke="#14532d" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* Branch left */}
      <path d="M40,140 C32,118 24,98 16,75" stroke="#14532d" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Branch right */}
      <path d="M38,105 C46,85 56,68 66,50" stroke="#14532d" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Small upper-left branch */}
      <path d="M36,70 C28,55 22,42 18,28" stroke="#166534" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Central stem leaves */}
      {glossyLeaf(26, 25, -38, 1.05, '#15803d')}
      {glossyLeaf(44, 55, 22, 1.15, '#166534')}
      {glossyLeaf(30, 88, -32, 1.2, '#15803d')}
      {glossyLeaf(46, 125, 18, 1.1, '#166534')}
      {/* Left branch leaves */}
      {glossyLeaf(22, 108, -48, 1.05, '#14532d')}
      {glossyLeaf(16, 78, -55, 1.0, '#15803d')}
      {/* Right branch leaves */}
      {glossyLeaf(58, 62, 32, 1.1, '#166534')}
      {glossyLeaf(66, 52, 42, 0.95, '#14532d')}
      {/* Upper branch leaf */}
      {glossyLeaf(18, 30, -52, 0.9, '#15803d')}
    </svg>
  );
}
