export default function Tulip({ width = 100, height = 140 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M50 70 C50 85, 49 110, 50 138" stroke="#2d5a27" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Left strap leaf */}
      <path d="M49 90 C30 75, 22 80, 20 90 C18 100, 35 100, 49 95" fill="#3a7a32" />
      <path d="M49 92 C35 82, 26 86, 23 92" stroke="#2d5a27" strokeWidth="0.6" fill="none" />
      {/* Right strap leaf */}
      <path d="M51 105 C70 92, 78 96, 78 105 C78 114, 65 112, 51 108" fill="#2d5a27" />
      {/* Calyx */}
      <path d="M43 68 C43 73, 46 75, 50 75 C54 75, 57 73, 57 68" fill="#2d5a27" />
      {/* Outer petals */}
      <path d="M30 50 C28 30, 38 12, 50 10 C42 15, 32 30, 30 50Z" fill="#d45a2a" />
      <path d="M70 50 C72 30, 62 12, 50 10 C58 15, 68 30, 70 50Z" fill="#d45a2a" />
      <path d="M35 58 C30 40, 40 18, 50 14 C44 22, 34 40, 35 58Z" fill="#f97448" />
      <path d="M65 58 C70 40, 60 18, 50 14 C56 22, 66 40, 65 58Z" fill="#f97448" />
      {/* Inner petals */}
      <path d="M40 55 C37 38, 44 20, 50 16 C46 25, 40 40, 40 55Z" fill="#fb9068" />
      <path d="M60 55 C63 38, 56 20, 50 16 C54 25, 60 40, 60 55Z" fill="#fb9068" />
      {/* Veining */}
      <path d="M43 50 C42 38, 46 24, 50 16" stroke="#d45a2a" strokeWidth="0.5" opacity="0.5" fill="none" />
      <path d="M57 50 C58 38, 54 24, 50 16" stroke="#d45a2a" strokeWidth="0.5" opacity="0.5" fill="none" />
      {/* Highlight */}
      <ellipse cx="45" cy="30" rx="4" ry="10" fill="#fdb" opacity="0.2" transform="rotate(-8 45 30)" />
    </svg>
  );
}
