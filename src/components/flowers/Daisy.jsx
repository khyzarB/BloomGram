export default function Daisy({ width = 120, height = 160 }) {
  const petalCount = 14;
  const cx = 60, cy = 50;

  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M60,72 C59,90 58,120 60,155" stroke="#4a8a42" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M59,100 C42,90 32,94 32,102 C32,110 44,108 59,103Z" fill="#4a8a42" />
      <path d="M61,125 C76,118 84,122 82,128 C80,134 68,130 61,127Z" fill="#3a7a32" />

      {/* 14 narrow elongated petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * 360;
        const isLit = i % 2 === 0;
        return (
          <g key={i} transform={`rotate(${angle}, ${cx}, ${cy})`}>
            {/* Main petal */}
            <path
              d={`M${cx},${cy} C${cx - 5},${cy - 5} ${cx - 7},${cy - 20} ${cx - 5},${cy - 34} C${cx - 3},${cy - 44} ${cx + 3},${cy - 44} ${cx + 5},${cy - 34} C${cx + 7},${cy - 20} ${cx + 5},${cy - 5} ${cx},${cy}Z`}
              fill={isLit ? '#f8fafc' : '#eef0f4'}
            />
            {/* Shadow on one side */}
            <path
              d={`M${cx},${cy} C${cx - 4},${cy - 6} ${cx - 6},${cy - 22} ${cx - 4},${cy - 36} C${cx - 2},${cy - 44} ${cx},${cy - 44} L${cx},${cy}Z`}
              fill="#e2e8f0" opacity="0.5"
            />
          </g>
        );
      })}

      {/* Center dome */}
      <circle cx={cx} cy={cy} r="12" fill="#d97706" />
      <circle cx={cx} cy={cy - 1} r="10" fill="#f59e0b" />
      <circle cx={cx} cy={cy - 2} r="7" fill="#fcd34d" />
      {/* Texture dots */}
      {Array.from({ length: 30 }).map((_, i) => {
        const a = (i / 30) * Math.PI * 2 + i * 0.5;
        const r = 2 + (i % 4) * 2.2;
        if (r > 10) return null;
        return <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r="0.9" fill="#92400e" opacity="0.6" />;
      })}
    </svg>
  );
}
