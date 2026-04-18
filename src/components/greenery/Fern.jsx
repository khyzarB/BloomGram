export default function Fern({ width = 100, height = 240, flip = false }) {
  // 11 positions along the curved rachis from t=0.1 to t=0.9
  // Stem: (50,235) → curves to (65,15)
  const stemPositions = [
    { x: 51, y: 212, size: 28 },
    { x: 52, y: 190, size: 26 },
    { x: 53, y: 168, size: 24 },
    { x: 55, y: 146, size: 22 },
    { x: 57, y: 124, size: 20 },
    { x: 58, y: 104, size: 18 },
    { x: 60, y: 84, size: 15 },
    { x: 61, y: 66, size: 12 },
    { x: 63, y: 48, size: 9 },
    { x: 64, y: 34, size: 6 },
    { x: 65, y: 22, size: 4 },
  ];

  const pinna = (px, py, size, dir, shade) => {
    const s = dir; // -1 left, 1 right
    return (
      <g key={`${px}-${py}-${s}`}>
        {/* Main pinna leaf shape */}
        <path
          d={`M${px},${py} C${px + s * 18 * (size / 28)},${py - 6 * (size / 28)} ${px + s * 22 * (size / 28)},${py - 18 * (size / 28)} ${px + s * 16 * (size / 28)},${py - 26 * (size / 28)} C${px + s * 10 * (size / 28)},${py - 32 * (size / 28)} ${px + s * 4 * (size / 28)},${py - 30 * (size / 28)} ${px},${py}Z`}
          fill={shade}
        />
        {/* Midrib */}
        <line
          x1={px} y1={py}
          x2={px + s * 12 * (size / 28)} y2={py - 22 * (size / 28)}
          stroke="#15803d" strokeWidth="0.6" opacity="0.6"
        />
        {/* Shadow on lower half */}
        <path
          d={`M${px},${py} C${px + s * 18 * (size / 28)},${py - 6 * (size / 28)} ${px + s * 22 * (size / 28)},${py - 18 * (size / 28)} ${px + s * 16 * (size / 28)},${py - 26 * (size / 28)} C${px + s * 14 * (size / 28)},${py - 20 * (size / 28)} ${px + s * 8 * (size / 28)},${py - 8 * (size / 28)} ${px},${py}Z`}
          fill="#15803d" opacity="0.3"
        />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 100 240" width={width} height={height} xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {/* Main rachis */}
      <path
        d="M50,235 C50,180 55,140 58,100 C61,60 65,35 65,15"
        stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round"
      />
      {/* Rachis highlight */}
      <path
        d="M50,235 C50,180 55,140 58,100 C61,60 65,35 65,15"
        stroke="#22c55e" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3"
      />

      {/* Pinna pairs */}
      {stemPositions.map((p, i) => (
        <g key={i}>
          {pinna(p.x, p.y, p.size, -1, i % 2 === 0 ? '#16a34a' : '#1a9a48')}
          {pinna(p.x, p.y, p.size, 1, i % 2 === 0 ? '#15803d' : '#178a3a')}
        </g>
      ))}

      {/* Unfurling tip */}
      <path d="M65,15 C66,10 67,6 65,3 C64,1 63,2 64,5" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
