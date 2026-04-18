export default function Rose({ width = 120, height = 160 }) {
  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">

      {/* STEM */}
      <path d="M 60,155 C 58,130 56,110 58,95"
            stroke="#2d6a27" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

      {/* LEAF LEFT */}
      <path d="M 56,120 C 44,112 36,106 32,98 C 38,96 48,100 56,108 Z"
            fill="#2d7a27"/>
      <path d="M 56,120 C 50,112 42,106 32,98"
            stroke="#1a5a18" strokeWidth="0.8" fill="none"/>

      {/* LEAF RIGHT */}
      <path d="M 62,128 C 74,118 82,112 88,104 C 82,102 72,108 64,116 Z"
            fill="#2d7a27"/>

      {/* OUTER PETALS — 5 petals spreading wide */}
      <path d="M 60,90 C 38,86 28,72 32,58 C 36,48 46,46 52,52 C 50,60 52,76 60,90 Z"
            fill="#c9446a"/>
      <path d="M 60,90 C 42,84 34,70 36,58 C 38,52 44,48 52,52"
            stroke="#a8304f" strokeWidth="0.6" fill="none" opacity="0.5"/>

      <path d="M 60,90 C 82,86 92,72 88,58 C 84,48 74,46 68,52 C 70,60 68,76 60,90 Z"
            fill="#c9446a"/>

      <path d="M 60,90 C 40,78 30,62 36,48 C 40,38 52,36 56,44 C 52,52 52,70 60,90 Z"
            fill="#be3d62"/>

      <path d="M 60,90 C 80,78 90,62 84,48 C 80,38 68,36 64,44 C 68,52 68,70 60,90 Z"
            fill="#be3d62"/>

      <path d="M 60,90 C 48,68 46,50 54,38 C 58,30 62,30 66,38 C 74,50 72,68 60,90 Z"
            fill="#d4546e"/>

      {/* MIDDLE PETALS — 4 petals, more cupped, lighter */}
      <path d="M 60,84 C 44,76 38,62 42,50 C 46,42 54,42 58,50 C 56,60 56,72 60,84 Z"
            fill="#d96080"/>

      <path d="M 60,84 C 76,76 82,62 78,50 C 74,42 66,42 62,50 C 64,60 64,72 60,84 Z"
            fill="#d96080"/>

      <path d="M 60,84 C 48,68 46,54 52,44 C 56,38 62,40 64,48 C 62,58 60,72 60,84 Z"
            fill="#e06888"/>

      <path d="M 60,84 C 72,68 74,54 68,44 C 64,38 58,40 56,48 C 58,58 60,72 60,84 Z"
            fill="#e06888"/>

      {/* INNER PETALS — 3 tight petals, palest */}
      <path d="M 60,78 C 50,70 48,58 54,50 C 58,44 64,46 64,54 C 63,62 61,72 60,78 Z"
            fill="#f090a0"/>
      <path d="M 60,78 C 70,70 72,58 66,50 C 62,44 56,46 56,54 C 57,62 59,72 60,78 Z"
            fill="#f090a0"/>
      <path d="M 60,78 C 52,68 52,56 58,50 C 60,47 62,47 64,50 C 68,56 68,68 60,78 Z"
            fill="#f8b0b8"/>

      {/* CENTER SPIRAL */}
      <ellipse cx="60" cy="62" rx="8" ry="7" fill="#e8607a"/>
      <path d="M 60,58 C 56,60 55,64 58,67 C 60,69 63,68 64,65 C 65,62 63,59 60,58 Z"
            fill="#c04060"/>
      <path d="M 60,60 C 58,62 59,65 62,65"
            stroke="#a03050" strokeWidth="0.8" fill="none"/>

    </svg>
  );
}
