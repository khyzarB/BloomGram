export default function Lotus({ width = 100, height = 140 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* No stem — lotus floats. Pad leaf beneath */}
      <ellipse cx="50" cy="105" rx="38" ry="12" fill="#15803d" opacity="0.3" />
      <ellipse cx="50" cy="105" rx="34" ry="10" fill="#22c55e" opacity="0.2" />
      {/* Outermost petals — deep pink */}
      <path d="M12 70 C10 50, 25 30, 50 28 C30 35, 14 50, 12 70Z" fill="#ec4899" />
      <path d="M88 70 C90 50, 75 30, 50 28 C70 35, 86 50, 88 70Z" fill="#ec4899" />
      <path d="M18 78 C10 58, 22 35, 50 30 C30 40, 14 58, 18 78Z" fill="#f472b6" />
      <path d="M82 78 C90 58, 78 35, 50 30 C70 40, 86 58, 82 78Z" fill="#f472b6" />
      {/* Middle layer */}
      <path d="M25 75 C20 55, 32 35, 50 32 C38 40, 24 56, 25 75Z" fill="#f9a8d4" />
      <path d="M75 75 C80 55, 68 35, 50 32 C62 40, 76 56, 75 75Z" fill="#f9a8d4" />
      <path d="M32 72 C28 55, 38 38, 50 34 C42 42, 32 56, 32 72Z" fill="#fbcfe8" />
      <path d="M68 72 C72 55, 62 38, 50 34 C58 42, 68 56, 68 72Z" fill="#fbcfe8" />
      {/* Inner petals — palest */}
      <path d="M38 68 C35 52, 42 38, 50 36 C45 42, 38 54, 38 68Z" fill="#fce7f3" />
      <path d="M62 68 C65 52, 58 38, 50 36 C55 42, 62 54, 62 68Z" fill="#fce7f3" />
      <path d="M44 65 C42 50, 46 40, 50 38 C48 44, 44 52, 44 65Z" fill="white" opacity="0.7" />
      <path d="M56 65 C58 50, 54 40, 50 38 C52 44, 56 52, 56 65Z" fill="white" opacity="0.7" />
      {/* Center */}
      <circle cx="50" cy="55" r="6" fill="#fde68a" />
      <circle cx="50" cy="55" r="3.5" fill="#fbbf24" />
      {/* Center dots */}
      {[0,60,120,180,240,300].map((a, i) => {
        const r = 4.5;
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={50 + Math.cos(rad) * r} cy={55 + Math.sin(rad) * r} r="1" fill="#f59e0b" />;
      })}
    </svg>
  );
}
