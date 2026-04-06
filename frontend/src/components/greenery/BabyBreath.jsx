export default function BabyBreath({ width = 80, height = 180, flip = false }) {
  // Generate many tiny branch endpoints
  const branches = [
    { x1: 40, y1: 175, cx: 35, cy: 120, x2: 28, y2: 60 },
    { x1: 40, y1: 175, cx: 45, cy: 130, x2: 50, y2: 70 },
    { x1: 40, y1: 175, cx: 38, cy: 110, x2: 20, y2: 50 },
    { x1: 40, y1: 175, cx: 42, cy: 115, x2: 58, y2: 55 },
    { x1: 40, y1: 175, cx: 40, cy: 100, x2: 35, y2: 40 },
  ];

  const flowers = [
    [25,18],[32,25],[18,30],[28,45],[36,32],[42,22],[48,35],[55,28],
    [22,55],[38,58],[52,48],[60,42],[15,42],[45,15],[55,60],[20,65],
    [34,12],[46,55],[30,70],[50,65],[40,42],[58,50],[25,38],[42,68],
    [35,50],[48,45],[28,58],[52,32],[22,48],[38,28],[56,38],[18,55],
  ];

  return (
    <svg
      width={width} height={height}
      viewBox="0 0 80 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* Thin branching stems */}
      {branches.map((b, i) => (
        <path
          key={i}
          d={`M${b.x1} ${b.y1} Q${b.cx} ${b.cy} ${b.x2} ${b.y2}`}
          stroke="#7a9a72"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {/* Sub-branches */}
      {flowers.map(([x, y], i) => {
        const stemX = 30 + (x - 30) * 0.4;
        const stemY = y + 30;
        return (
          <line key={`s${i}`} x1={stemX} y1={stemY} x2={x} y2={y} stroke="#9ab094" strokeWidth="0.5" />
        );
      })}
      {/* Tiny white flowers */}
      {flowers.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2.2" fill="white" />
          <circle cx={x} cy={y} r="1.2" fill="#f9fafb" />
          <circle cx={x} cy={y} r="0.5" fill="#fde68a" />
        </g>
      ))}
    </svg>
  );
}
