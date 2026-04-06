export default function Fern({ width = 80, height = 180, flip = false }) {
  return (
    <svg
      width={width} height={height}
      viewBox="0 0 80 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* Central stem — gentle arc */}
      <path d="M40 175 C38 150, 32 100, 28 60 C24 30, 22 15, 20 5" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Pinnae (alternating sub-leaflets) */}
      {[
        [22,20,-35,10],[26,30,30,12],[24,42,-32,13],[28,52,28,14],
        [26,64,-30,14],[30,74,26,15],[28,86,-28,15],[32,96,24,14],
        [30,108,-26,13],[34,118,22,12],[32,128,-24,11],[36,138,20,10],
        [34,148,-22,9],[38,158,18,8],
      ].map(([x, y, angle, len], i) => {
        const rad = (angle * Math.PI) / 180;
        const ex = x + Math.cos(rad) * len;
        const ey = y + Math.sin(rad) * len;
        const shade = i % 2 === 0 ? '#15803d' : '#16a34a';
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={ex} y2={ey} stroke={shade} strokeWidth="1" />
            <ellipse cx={ex} cy={ey} rx="4" ry="2.5" fill={shade} transform={`rotate(${angle} ${ex} ${ey})`} />
            {/* Sub-pinnae */}
            <ellipse cx={x + (ex - x) * 0.5 - 2} cy={y + (ey - y) * 0.5 - 1} rx="3" ry="2" fill={shade} opacity="0.7" transform={`rotate(${angle} ${x + (ex - x) * 0.5 - 2} ${y + (ey - y) * 0.5 - 1})`} />
          </g>
        );
      })}
    </svg>
  );
}
