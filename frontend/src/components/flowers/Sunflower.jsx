export default function Sunflower({ width = 120, height = 160 }) {
  const cx = 60, cy = 50;

  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Thick stem */}
      <path d="M60,78 C60,95 58,125 60,155" stroke="#2d5a27" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Large rough leaves */}
      <path d="M58,100 C32,85 16,90 16,104 C16,118 38,118 58,104Z" fill="#2d5a27" />
      <path d="M58,102 C36,88 22,94 20,104" stroke="#1e4620" strokeWidth="0.7" fill="none" />
      <path d="M62,125 C86,112 98,118 96,130 C94,142 74,136 62,127Z" fill="#3a7a32" />

      {/* Outer ring — 10 petals */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        const isLit = i % 2 === 0;
        return (
          <g key={`o${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
            <path
              d={`M${cx},${cy} C${cx - 5.5},${cy - 5} ${cx - 7},${cy - 18} ${cx - 5},${cy - 34} C${cx - 3},${cy - 42} ${cx + 3},${cy - 42} ${cx + 5},${cy - 34} C${cx + 7},${cy - 18} ${cx + 5.5},${cy - 5} ${cx},${cy}Z`}
              fill={isLit ? '#fbbf24' : '#f59e0b'}
            />
            <path
              d={`M${cx},${cy} C${cx - 4},${cy - 6} ${cx - 5.5},${cy - 20} ${cx - 4},${cy - 34} L${cx},${cy}Z`}
              fill="#d97706" opacity="0.25"
            />
          </g>
        );
      })}
      {/* Inner ring — 10 petals offset 18° */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360 + 18;
        return (
          <g key={`i${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
            <path
              d={`M${cx},${cy} C${cx - 4.5},${cy - 4} ${cx - 6},${cy - 14} ${cx - 4},${cy - 28} C${cx - 2},${cy - 36} ${cx + 2},${cy - 36} ${cx + 4},${cy - 28} C${cx + 6},${cy - 14} ${cx + 4.5},${cy - 4} ${cx},${cy}Z`}
              fill="#fcd34d"
            />
          </g>
        );
      })}

      {/* Center disk */}
      <circle cx={cx} cy={cy} r="18" fill="#92400e" />
      <circle cx={cx} cy={cy} r="14" fill="#78350f" />
      <circle cx={cx} cy={cy} r="10" fill="#451a03" />
      {/* Seed spiral pattern */}
      {Array.from({ length: 32 }).map((_, i) => {
        const golden = 2.39996; // golden angle in radians
        const r = 2.5 * Math.sqrt(i);
        if (r > 16) return null;
        const a = i * golden;
        return (
          <ellipse key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r}
            rx="1.2" ry="0.8" fill="#92400e" opacity="0.7"
            transform={`rotate(${(a * 180) / Math.PI}, ${cx + Math.cos(a) * r}, ${cy + Math.sin(a) * r})`}
          />
        );
      })}
    </svg>
  );
}
