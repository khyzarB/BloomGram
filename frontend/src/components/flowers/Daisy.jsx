export default function Daisy({ width = 100, height = 140 }) {
  const petals = 14;
  const cx = 50, cy = 42, pr = 20;
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M50 62 C49 80, 48 110, 50 138" stroke="#4a8a42" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M49 90 C38 82, 30 85, 30 92 C30 99, 40 97, 49 93" fill="#4a8a42" />
      <path d="M50 110 C60 104, 68 107, 68 113 C68 119, 58 116, 50 112" fill="#3a7a32" />
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
            rx="5"
            ry="13"
            fill={i % 2 === 0 ? '#f9fafb' : '#f0f1f3'}
            stroke="#e5e7eb"
            strokeWidth="0.3"
            transform={`rotate(${angle} ${px} ${py})`}
          />
        );
      })}
      {/* Center dome */}
      <circle cx={cx} cy={cy} r="10" fill="#fbbf24" />
      <circle cx={cx} cy={cy} r="7" fill="#f59e0b" />
      <circle cx={cx} cy={cy - 1} r="5" fill="#fbbf24" />
      {/* Center texture dots */}
      {[[-2,-2],[2,-1],[0,2],[-1,1],[1,-2],[3,1],[-3,0]].map(([dx,dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r="0.8" fill="#d97706" />
      ))}
    </svg>
  );
}
