export default function CherryBlossom({ width = 100, height = 140 }) {
  const bloom = (cx, cy, scale = 1) => {
    const petals = 5;
    const r = 12 * scale;
    return (
      <g>
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (i / petals) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const px = cx + Math.cos(rad) * r;
          const py = cy + Math.sin(rad) * r;
          return (
            <g key={i}>
              <ellipse
                cx={px} cy={py}
                rx={5.5 * scale} ry={9 * scale}
                fill="#fce7f3"
                stroke="#fbcfe8"
                strokeWidth="0.3"
                transform={`rotate(${angle} ${px} ${py})`}
              />
              {/* Notch in petal tip */}
              <circle
                cx={cx + Math.cos(rad) * (r + 7 * scale)}
                cy={cy + Math.sin(rad) * (r + 7 * scale)}
                r={1.5 * scale}
                fill="#fffbf5"
              />
            </g>
          );
        })}
        {/* Center stamens */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          const sr = 4 * scale;
          return (
            <g key={`s${i}`}>
              <line
                x1={cx} y1={cy}
                x2={cx + Math.cos(a) * sr} y2={cy + Math.sin(a) * sr}
                stroke="#f472b6" strokeWidth={0.6 * scale}
              />
              <circle cx={cx + Math.cos(a) * sr} cy={cy + Math.sin(a) * sr} r={1 * scale} fill="#ec4899" />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={2.5 * scale} fill="#fbbf24" />
      </g>
    );
  };

  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Woody branch */}
      <path d="M50 130 C48 110, 44 80, 50 60 C54 48, 45 38, 38 30" stroke="#57230a" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M50 65 C58 55, 65 45, 68 35" stroke="#57230a" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M47 80 C38 72, 30 68, 25 65" stroke="#57230a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Three clustered blooms */}
      {bloom(36, 26, 1)}
      {bloom(66, 32, 0.9)}
      {bloom(28, 60, 0.85)}
      {/* Buds */}
      <ellipse cx="25" cy="64" rx="3" ry="4" fill="#fbcfe8" />
      <ellipse cx="72" cy="40" rx="2.5" ry="3.5" fill="#fce7f3" />
    </svg>
  );
}
