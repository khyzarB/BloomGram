export default function Peony({ width = 100, height = 140 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M50 80 C49 95, 47 115, 49 135" stroke="#2d5a27" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M48 105 C32 95, 20 97, 18 104 C16 111, 30 114, 48 107" fill="#2d5a27" />
      <path d="M50 118 C66 110, 78 114, 78 120 C78 126, 64 126, 50 120" fill="#3a7a32" />
      {/* Calyx */}
      <path d="M42 77 C42 82, 46 84, 50 84 C54 84, 58 82, 58 77" fill="#2d5a27" />
      {/* Outer ruffled petals */}
      <path d="M25 55 C20 35, 35 20, 50 25 C40 22, 28 32, 25 55Z" fill="#e8a4b8" />
      <path d="M75 55 C80 35, 65 20, 50 25 C60 22, 72 32, 75 55Z" fill="#e8a4b8" />
      <path d="M22 60 C15 50, 20 35, 35 30 C25 35, 18 48, 22 60Z" fill="#f4b8c8" />
      <path d="M78 60 C85 50, 80 35, 65 30 C75 35, 82 48, 78 60Z" fill="#f4b8c8" />
      <path d="M30 70 C20 60, 18 45, 30 35 C22 45, 22 58, 30 70Z" fill="#eaa0b5" />
      <path d="M70 70 C80 60, 82 45, 70 35 C78 45, 78 58, 70 70Z" fill="#eaa0b5" />
      {/* Middle petals */}
      <ellipse cx="40" cy="48" rx="15" ry="20" fill="#f4c4d4" transform="rotate(-10 40 48)" />
      <ellipse cx="60" cy="48" rx="15" ry="20" fill="#f4c4d4" transform="rotate(10 60 48)" />
      <ellipse cx="50" cy="40" rx="16" ry="18" fill="#fce4ec" />
      {/* Inner petals */}
      <ellipse cx="45" cy="47" rx="10" ry="14" fill="#fce4ec" transform="rotate(-5 45 47)" />
      <ellipse cx="55" cy="47" rx="10" ry="14" fill="#fce4ec" transform="rotate(5 55 47)" />
      {/* Center — stamens */}
      <circle cx="48" cy="44" r="2" fill="#f0c060" />
      <circle cx="52" cy="43" r="2" fill="#f0c060" />
      <circle cx="50" cy="46" r="2" fill="#f0c060" />
      <circle cx="50" cy="44" r="4" fill="#fdd" opacity="0.5" />
      {/* Highlight */}
      <ellipse cx="42" cy="38" rx="6" ry="8" fill="white" opacity="0.15" />
    </svg>
  );
}
