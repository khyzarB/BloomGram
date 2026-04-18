export default function Lotus({ width = 120, height = 160 }) {
  const lotusPetal = (rot, ring, key) => {
    const fills = { outer: '#f472b6', mid: '#f9a8d4', inner: '#fce7f3' };
    const fill = fills[ring];
    const sc = ring === 'outer' ? 1 : ring === 'mid' ? 0.82 : 0.62;
    return (
      <g key={key} transform={`rotate(${rot}, 60, 65)`}>
        <path
          d={`M60,65 C${60 - 10 * sc},${65 - 6 * sc} ${60 - 14 * sc},${65 - 22 * sc} ${60 - 10 * sc},${65 - 40 * sc} C${60 - 6 * sc},${65 - 52 * sc} ${60 - 2 * sc},${65 - 56 * sc} 60,${65 - 56 * sc} C${60 + 2 * sc},${65 - 56 * sc} ${60 + 6 * sc},${65 - 52 * sc} ${60 + 10 * sc},${65 - 40 * sc} C${60 + 14 * sc},${65 - 22 * sc} ${60 + 10 * sc},${65 - 6 * sc} 60,65Z`}
          fill={fill}
        />
        <path
          d={`M60,65 C${60 - 7 * sc},${65 - 8 * sc} ${60 - 10 * sc},${65 - 24 * sc} ${60 - 7 * sc},${65 - 42 * sc} L60,65Z`}
          fill="#e85aaa" opacity="0.2"
        />
        <path
          d={`M60,${65 - 56 * sc} C${60 + 4 * sc},${65 - 52 * sc} ${60 + 8 * sc},${65 - 42 * sc} ${60 + 10 * sc},${65 - 32 * sc}`}
          stroke="white" strokeWidth="0.6" fill="none" opacity="0.3"
        />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Pad leaf beneath */}
      <ellipse cx="60" cy="125" rx="42" ry="14" fill="#15803d" opacity="0.25" />
      <ellipse cx="60" cy="125" rx="36" ry="11" fill="#22c55e" opacity="0.15" />

      {/* Outer ring — 6 petals */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => lotusPetal(a, 'outer', `o${i}`))}
      {/* Middle ring — 5 petals */}
      {[30, 102, 174, 246, 318].map((a, i) => lotusPetal(a, 'mid', `m${i}`))}
      {/* Inner ring — 4 petals */}
      {[15, 105, 195, 285].map((a, i) => lotusPetal(a, 'inner', `i${i}`))}

      {/* Center */}
      <circle cx="60" cy="60" r="7" fill="#fde68a" />
      <circle cx="60" cy="59" r="4.5" fill="#fbbf24" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={60 + Math.cos(rad) * 5.5} cy={60 + Math.sin(rad) * 5.5} r="1.2" fill="#f59e0b" />;
      })}
    </svg>
  );
}
