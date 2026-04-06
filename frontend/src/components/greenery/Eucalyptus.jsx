export default function Eucalyptus({ width = 100, height = 230, flip = false }) {
  // 8 leaf pairs along arching stem
  const pairs = [
    { y: 30,  sx: 36 },
    { y: 55,  sx: 37 },
    { y: 80,  sx: 38 },
    { y: 105, sx: 39 },
    { y: 130, sx: 41 },
    { y: 155, sx: 43 },
    { y: 180, sx: 45 },
    { y: 205, sx: 47 },
  ];

  const eucLeaf = (px, py, dir, size, shade, highlight) => {
    const s = dir; // -1 left, +1 right
    const r = 14 * size;
    return (
      <g>
        {/* Leaf body — slightly pointed oval */}
        <path
          d={`M${px},${py} C${px + s * 6},${py - 2} ${px + s * 18 * size},${py - 3 * size} ${px + s * 22 * size},${py} C${px + s * 18 * size},${py + 3 * size} ${px + s * 6},${py + 2} ${px},${py}Z`}
          fill={shade}
        />
        {/* Light side highlight */}
        <path
          d={`M${px},${py} C${px + s * 5},${py - 1.5} ${px + s * 14 * size},${py - 2.5 * size} ${px + s * 18 * size},${py - 0.5} C${px + s * 14 * size},${py + 1} ${px + s * 5},${py + 0.5} ${px},${py}Z`}
          fill={highlight} opacity="0.35"
        />
        {/* Midrib */}
        <line
          x1={px + s * 2} y1={py}
          x2={px + s * 20 * size} y2={py}
          stroke="#5a7a62" strokeWidth="0.8" opacity="0.5"
        />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 100 230" width={width} height={height} xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {/* Main stem */}
      <path
        d="M50,225 C48,180 42,140 38,95 C34,55 33,25 35,10"
        stroke="#5a7a62" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />

      {/* Leaf pairs */}
      {pairs.map(({ y, sx }, i) => {
        const size = i < 2 ? 0.7 : i < 6 ? 1.0 : 0.85;
        return (
          <g key={i}>
            {/* Connectors */}
            <line x1={sx} y1={y} x2={sx - 16 * size} y2={y - 1} stroke="#6b8870" strokeWidth="1.2" opacity="0.5" />
            <line x1={sx} y1={y} x2={sx + 16 * size} y2={y + 1} stroke="#6b8870" strokeWidth="1.2" opacity="0.5" />
            {/* Left leaf */}
            {eucLeaf(sx, y, -1, size, i % 2 === 0 ? '#8aab90' : '#7a9980', '#9bbea2')}
            {/* Right leaf */}
            {eucLeaf(sx, y + 2, 1, size, i % 2 === 0 ? '#7a9980' : '#6b8870', '#8aab90')}
          </g>
        );
      })}

      {/* Tip bud */}
      <ellipse cx="35" cy="8" rx="3.5" ry="5.5" fill="#8aab90" opacity="0.8" />
    </svg>
  );
}
