export default function CherryBlossom({ width = 120, height = 140 }) {
  const bloom = (bx, by, scale) => {
    const petals = 5;
    return (
      <g transform={`translate(${bx},${by}) scale(${scale})`}>
        {/* 5 notched petals */}
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (i / petals) * 360 - 90;
          return (
            <g key={i} transform={`rotate(${angle})`}>
              {/* Notched petal */}
              <path
                d="M0,0 C-7,-3 -11,-14 -10,-24 C-9,-30 -5,-32 -2,-30 C-1,-32 1,-32 2,-30 C5,-32 9,-30 10,-24 C11,-14 7,-3 0,0Z"
                fill="#fce7f3"
              />
              {/* Shadow side */}
              <path
                d="M0,0 C-6,-4 -9,-16 -8,-24 C-7,-28 -4,-30 -2,-30 L0,0Z"
                fill="#fbcfe8" opacity="0.5"
              />
            </g>
          );
        })}
        {/* Stamens — 12 thin lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = 8;
          return (
            <g key={`s${i}`}>
              <line x1="0" y1="0" x2={Math.cos(a) * r} y2={Math.sin(a) * r} stroke="#ec4899" strokeWidth="0.6" />
              <circle cx={Math.cos(a) * r} cy={Math.sin(a) * r} r="1" fill="#ec4899" />
            </g>
          );
        })}
        <circle cx="0" cy="0" r="3" fill="#fbbf24" />
        <circle cx="0" cy="-0.5" r="1.8" fill="#fcd34d" />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 120 140" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Woody branch */}
      <path d="M60,135 C58,115 52,85 56,65 C60,50 50,38 42,28" stroke="#57230a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M56,68 C64,55 72,45 78,35" stroke="#57230a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M54,85 C42,74 34,68 28,62" stroke="#57230a" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Bark texture */}
      <path d="M58,100 C57,95 56,90 57,85" stroke="#3d1508" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M60,115 C59,110 58,105 59,100" stroke="#3d1508" strokeWidth="0.5" fill="none" opacity="0.25" />

      {/* Three blooms */}
      {bloom(40, 24, 1.0)}
      {bloom(76, 32, 0.9)}
      {bloom(30, 58, 0.85)}

      {/* Buds */}
      <ellipse cx="28" cy="63" rx="3.5" ry="5" fill="#fbcfe8" />
      <ellipse cx="82" cy="40" rx="3" ry="4.5" fill="#fce7f3" />
      <ellipse cx="48" cy="42" rx="2.5" ry="3.5" fill="#fbcfe8" opacity="0.7" />
    </svg>
  );
}
