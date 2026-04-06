export default function Peony({ width = 120, height = 160 }) {
  const ruffledPetal = (rot, ring, key) => {
    const fills = {
      outer: '#f4b8c8',
      mid: '#f2a0bc',
      inner: '#ee8fb0',
      center: '#e87da8',
    };
    const fill = fills[ring];
    const sc = ring === 'outer' ? 1 : ring === 'mid' ? 0.82 : ring === 'inner' ? 0.66 : 0.5;
    return (
      <g key={key} transform={`rotate(${rot}, 60, 54)`}>
        <path
          d={`M60,54 C${60 - 14 * sc},${54 - 5 * sc} ${60 - 18 * sc},${54 - 22 * sc} ${60 - 14 * sc},${54 - 36 * sc} C${60 - 10 * sc},${54 - 46 * sc} ${60 - 4 * sc},${54 - 50 * sc} 60,${54 - 50 * sc} C${60 + 4 * sc},${54 - 50 * sc} ${60 + 10 * sc},${54 - 46 * sc} ${60 + 14 * sc},${54 - 36 * sc} C${60 + 18 * sc},${54 - 22 * sc} ${60 + 14 * sc},${54 - 5 * sc} 60,54Z`}
          fill={fill}
        />
        {/* Shadow fold */}
        <path
          d={`M60,54 C${60 - 10 * sc},${54 - 8 * sc} ${60 - 14 * sc},${54 - 24 * sc} ${60 - 10 * sc},${54 - 38 * sc} C${60 - 6 * sc},${54 - 46 * sc} ${60 - 2 * sc},${54 - 48 * sc} 60,${54 - 48 * sc} L60,54Z`}
          fill="#d4789a" opacity="0.25"
        />
        {/* Highlight ruffle */}
        <path
          d={`M60,${54 - 50 * sc} C${60 + 6 * sc},${54 - 48 * sc} ${60 + 12 * sc},${54 - 40 * sc} ${60 + 14 * sc},${54 - 30 * sc}`}
          stroke="#fce4ec" strokeWidth="0.8" fill="none" opacity="0.5"
        />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M60,82 C58,98 56,120 58,155" stroke="#2d5a27" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M57,110 C38,98 24,102 22,112 C20,122 36,122 57,113Z" fill="#2d5a27" />
      <path d="M59,132 C78,122 88,126 86,134 C84,142 70,138 59,134Z" fill="#3a7a32" />
      {/* Calyx */}
      <path d="M52,78 C52,84 56,86 60,86 C64,86 68,84 68,78" fill="#2d5a27" />

      {/* Ring 1 — outermost, 7 petals */}
      {[0, 51, 103, 154, 206, 257, 309].map((a, i) => ruffledPetal(a, 'outer', `r1-${i}`))}
      {/* Ring 2 — 6 petals */}
      {[25, 85, 145, 205, 265, 325].map((a, i) => ruffledPetal(a, 'mid', `r2-${i}`))}
      {/* Ring 3 — 5 petals */}
      {[10, 82, 154, 226, 298].map((a, i) => ruffledPetal(a, 'inner', `r3-${i}`))}
      {/* Ring 4 center — 4 tight */}
      {[0, 90, 180, 270].map((a, i) => ruffledPetal(a, 'center', `r4-${i}`))}

      {/* Center stamens */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const r = 5;
        return <circle key={i} cx={60 + Math.cos(rad) * r} cy={54 + Math.sin(rad) * r} r="1.2" fill="#f0c060" />;
      })}
      <circle cx="60" cy="54" r="3" fill="#fde68a" opacity="0.6" />
    </svg>
  );
}
