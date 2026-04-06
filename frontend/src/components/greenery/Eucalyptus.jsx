export default function Eucalyptus({ width = 80, height = 180, flip = false }) {
  const pairs = [
    [24, 20], [28, 38], [26, 56], [30, 74], [28, 92], [32, 110], [30, 128], [34, 146],
  ];
  return (
    <svg
      width={width} height={height}
      viewBox="0 0 80 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* Gently arching stem */}
      <path d="M40 175 C38 155, 34 120, 30 85 C26 50, 24 30, 24 10" stroke="#6b8068" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Leaf pairs — round silver-green */}
      {pairs.map(([x, y], i) => {
        const s = 7 + (8 - i) * 0.4;
        return (
          <g key={i}>
            {/* Left leaf */}
            <ellipse cx={x - 10} cy={y} rx={s} ry={s * 0.85} fill="#86a88a" opacity="0.85" />
            <ellipse cx={x - 10} cy={y} rx={s * 0.6} ry={s * 0.5} fill="#9ab89e" opacity="0.4" />
            {/* Right leaf */}
            <ellipse cx={x + 14} cy={y + 2} rx={s} ry={s * 0.85} fill="#7a9e7e" opacity="0.85" />
            <ellipse cx={x + 14} cy={y + 2} rx={s * 0.6} ry={s * 0.5} fill="#8fb093" opacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}
