export default function Sunflower({ width = 100, height = 140 }) {
  const petals = 20;
  const cx = 50, cy = 44, pr = 24;
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M50 70 C50 88, 48 115, 50 138" stroke="#2d5a27" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Large rough leaves */}
      <path d="M48 95 C28 80, 15 82, 14 94 C13 106, 32 108, 48 98" fill="#2d5a27" />
      <path d="M48 96 C30 84, 20 88, 17 95" stroke="#1e4620" strokeWidth="0.6" fill="none" />
      <path d="M52 115 C72 104, 82 108, 82 118 C82 128, 66 124, 52 117" fill="#3a7a32" />
      {/* Petals */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * 360;
        const rad = (angle * Math.PI) / 180;
        const px = cx + Math.cos(rad) * pr;
        const py = cy + Math.sin(rad) * pr;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx="5.5"
            ry="14"
            fill={i % 2 === 0 ? '#fcd34d' : '#fbbf24'}
            stroke="#f59e0b"
            strokeWidth="0.3"
            transform={`rotate(${angle} ${px} ${py})`}
          />
        );
      })}
      {/* Dark center */}
      <circle cx={cx} cy={cy} r="14" fill="#78350f" />
      <circle cx={cx} cy={cy} r="11" fill="#451a03" />
      <circle cx={cx} cy={cy} r="8" fill="#78350f" />
      <circle cx={cx} cy={cy} r="5" fill="#451a03" />
      {/* Center seed texture */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 6 + (i % 2) * 3;
        return <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r="0.7" fill="#92400e" />;
      })}
    </svg>
  );
}
