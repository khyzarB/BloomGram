export default function BabyBreath({ width = 110, height = 230, flip = false }) {
  // 22 branch tip positions — cloud shape in upper 75%
  const tips = [
    [35,14],[55,10],[75,18],[22,28],[45,24],[65,30],[85,26],
    [15,44],[38,40],[58,46],[78,42],[28,58],[50,54],[70,60],
    [12,74],[35,70],[55,76],[75,68],[22,88],[48,84],[68,92],
    [38,100],
  ];

  // Main branch paths
  const branches = [
    "M55,225 C52,190 48,160 42,130 C36,100 30,72 25,42",
    "M55,225 C55,188 55,155 55,120 C55,88 55,58 55,25",
    "M55,225 C58,192 62,160 68,130 C74,100 78,70 80,38",
    "M42,130 C35,108 28,88 18,58",
    "M55,120 C50,98 45,78 38,52",
    "M68,130 C72,108 76,86 82,60",
    "M42,130 C48,112 50,92 50,68",
    "M68,130 C64,108 58,88 55,62",
  ];

  const tinyFlower = (px, py) => (
    <g transform={`translate(${px},${py})`}>
      {[0, 72, 144, 216, 288].map(angle => (
        <ellipse
          key={angle}
          cx="0" cy="-3.5"
          rx="2.5" ry="3.5"
          fill="white" stroke="#f0f0f0" strokeWidth="0.3"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="1.8" fill="#fef08a" />
      <circle cx="0" cy="-0.5" r="0.8" fill="#fbbf24" />
    </g>
  );

  return (
    <svg viewBox="0 0 110 230" width={width} height={height} xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {/* Thin branching stems */}
      {branches.map((d, i) => (
        <path key={i} d={d} stroke="#9ca3af" strokeWidth={i < 3 ? 1.2 : 0.8} fill="none" strokeLinecap="round" />
      ))}

      {/* Tiny connector lines to each flower */}
      {tips.map(([x, y], i) => {
        const cx = 55 + (x - 55) * 0.25;
        const cy = y + 15;
        return <line key={`c${i}`} x1={cx} y1={cy} x2={x} y2={y + 2} stroke="#b0b8c0" strokeWidth="0.5" opacity="0.4" />;
      })}

      {/* Flowers at tips */}
      {tips.map(([x, y], i) => (
        <g key={i}>{tinyFlower(x, y)}</g>
      ))}
    </svg>
  );
}
