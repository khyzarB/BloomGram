export default function Rose({ width = 100, height = 140 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M50 75 C48 90, 46 110, 48 135" stroke="#2d5a27" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Left leaf */}
      <path d="M47 100 C35 90, 25 92, 22 98 C19 104, 28 108, 47 102" fill="#2d5a27" />
      <path d="M47 101 C35 95, 28 98, 25 100" stroke="#1e4620" strokeWidth="0.5" fill="none" />
      {/* Right leaf */}
      <path d="M49 112 C62 104, 72 106, 75 112 C78 118, 68 120, 49 114" fill="#3a7a32" />
      <path d="M49 113 C62 107, 70 110, 73 113" stroke="#2d5a27" strokeWidth="0.5" fill="none" />
      {/* Calyx */}
      <path d="M43 72 C42 76, 44 78, 50 78 C56 78, 58 76, 57 72" fill="#2d5a27" />
      {/* Outer petals — deep rose */}
      <ellipse cx="35" cy="52" rx="18" ry="22" fill="#9e2f4f" transform="rotate(-15 35 52)" />
      <ellipse cx="65" cy="52" rx="18" ry="22" fill="#9e2f4f" transform="rotate(15 65 52)" />
      <ellipse cx="50" cy="40" rx="18" ry="20" fill="#9e2f4f" transform="rotate(0 50 40)" />
      {/* Mid petals — rose */}
      <ellipse cx="40" cy="50" rx="14" ry="18" fill="#c9446a" transform="rotate(-8 40 50)" />
      <ellipse cx="60" cy="50" rx="14" ry="18" fill="#c9446a" transform="rotate(8 60 50)" />
      <ellipse cx="50" cy="42" rx="14" ry="16" fill="#c9446a" />
      {/* Inner petals — light rose */}
      <ellipse cx="45" cy="48" rx="10" ry="13" fill="#e8637a" transform="rotate(-5 45 48)" />
      <ellipse cx="55" cy="48" rx="10" ry="13" fill="#e8637a" transform="rotate(5 55 48)" />
      {/* Center spiral */}
      <path d="M50 44 C52 42, 55 44, 53 47 C51 50, 47 48, 49 45 C50 43, 52 43, 51 45" fill="#9e2f4f" />
      <circle cx="50" cy="45" r="3" fill="#b83a5a" />
      {/* Highlights */}
      <ellipse cx="43" cy="43" rx="5" ry="7" fill="#f0a0b8" opacity="0.3" />
    </svg>
  );
}
