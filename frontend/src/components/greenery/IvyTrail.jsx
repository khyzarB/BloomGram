export default function IvyTrail({ width = 80, height = 180, flip = false }) {
  const ivyLeaf = (cx, cy, scale, rot) => (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${scale})`}>
      <path
        d="M0 -8 C-6 -10, -10 -4, -8 0 C-10 4, -6 8, 0 6 C6 8, 10 4, 8 0 C10 -4, 6 -10, 0 -8Z"
        fill="#166534"
      />
      <path d="M0 -6 L0 4" stroke="#15803d" strokeWidth="0.5" opacity="0.5" />
      <path d="M0 -2 L-4 -4" stroke="#15803d" strokeWidth="0.4" opacity="0.4" />
      <path d="M0 -2 L4 -4" stroke="#15803d" strokeWidth="0.4" opacity="0.4" />
    </g>
  );

  return (
    <svg
      width={width} height={height}
      viewBox="0 0 80 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* Main trailing stem */}
      <path d="M40 175 C38 150, 30 110, 35 80 C40 50, 30 30, 25 10" stroke="#166534" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Branch */}
      <path d="M35 80 C42 65, 50 55, 55 40" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Leaves along main stem */}
      {ivyLeaf(26, 15, 1.1, -15)}
      {ivyLeaf(32, 40, 1.2, 10)}
      {ivyLeaf(28, 65, 1.15, -20)}
      {ivyLeaf(37, 95, 1.1, 15)}
      {ivyLeaf(35, 125, 1.0, -10)}
      {/* Leaves on branch */}
      {ivyLeaf(48, 52, 1.0, 20)}
      {ivyLeaf(53, 42, 0.9, 30)}
    </svg>
  );
}
