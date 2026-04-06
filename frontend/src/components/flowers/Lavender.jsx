export default function Lavender({ width = 100, height = 140 }) {
  const spike = (sx, startY, lean) => {
    const florets = [];
    for (let i = 0; i < 8; i++) {
      const y = startY + i * 5;
      const x = sx + lean * (i * 0.3);
      const shade = i < 3 ? '#8b5cf6' : i < 6 ? '#a78bfa' : '#c4b5fd';
      florets.push(
        <ellipse key={`${sx}-${i}`} cx={x} cy={y} rx="4.5" ry="3" fill={shade} />
      );
    }
    return florets;
  };

  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stems */}
      <path d="M38 60 C36 80, 38 110, 40 138" stroke="#6b8a62" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M50 55 C50 78, 50 110, 50 138" stroke="#6b8a62" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M62 58 C64 80, 62 110, 60 138" stroke="#6b8a62" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Slim gray-green leaves */}
      <path d="M42 95 C32 88, 24 90, 26 96 C28 102, 36 100, 42 97" fill="#7a9a72" />
      <path d="M58 100 C68 94, 74 96, 72 102 C70 108, 62 105, 58 102" fill="#6b8a62" />
      <path d="M48 115 C38 110, 32 112, 34 118 C36 124, 44 120, 48 117" fill="#7a9a72" />
      {/* Flower spikes */}
      {spike(38, 18, -0.5)}
      {spike(50, 12, 0)}
      {spike(62, 16, 0.5)}
      {/* Tiny tip buds */}
      <circle cx="37" cy="16" r="2" fill="#7c3aed" />
      <circle cx="50" cy="10" r="2" fill="#7c3aed" />
      <circle cx="63" cy="14" r="2" fill="#7c3aed" />
    </svg>
  );
}
