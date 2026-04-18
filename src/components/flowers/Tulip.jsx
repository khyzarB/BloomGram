export default function Tulip({ width = 120, height = 160 }) {
  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">

      {/* STEM */}
      <path d="M 60,158 C 60,140 59,125 60,105"
            stroke="#2d6a27" strokeWidth="4" fill="none" strokeLinecap="round"/>

      {/* LEAF — long strap leaf curving left */}
      <path d="M 56,130 C 46,118 34,108 26,92 C 34,90 48,98 58,112 Z"
            fill="#3a8a30"/>
      <path d="M 56,130 C 46,118 36,106 26,92"
            stroke="#2a6a22" strokeWidth="1" fill="none"/>

      {/* LEAF — long strap leaf curving right */}
      <path d="M 64,138 C 74,124 88,112 94,96 C 86,94 72,104 64,120 Z"
            fill="#3a8a30"/>

      {/* 3 OUTER PETALS — form the main cup */}

      {/* Center outer petal — faces viewer */}
      <path d="M 60,106 C 46,100 38,84 40,66 C 42,52 50,42 60,40 C 70,42 78,52 80,66 C 82,84 74,100 60,106 Z"
            fill="#e8623a"/>
      {/* Shadow on left side */}
      <path d="M 60,106 C 46,100 38,84 40,66 C 42,52 50,42 60,40 L 60,106 Z"
            fill="#c84a24" opacity="0.35"/>

      {/* Left outer petal */}
      <path d="M 60,104 C 48,100 36,86 36,68 C 36,52 44,40 54,38 C 48,50 46,68 50,86 C 52,96 56,102 60,104 Z"
            fill="#d45830"/>

      {/* Right outer petal */}
      <path d="M 60,104 C 72,100 84,86 84,68 C 84,52 76,40 66,38 C 72,50 74,68 70,86 C 68,96 64,102 60,104 Z"
            fill="#d45830"/>

      {/* 3 INNER PETALS — lighter, peek above outer */}

      {/* Inner center */}
      <path d="M 60,100 C 50,94 46,78 48,62 C 50,50 56,43 60,42 C 64,43 70,50 72,62 C 74,78 70,94 60,100 Z"
            fill="#f07848"/>
      {/* Highlight */}
      <path d="M 60,98 C 56,88 54,72 56,58 C 57,50 59,44 60,43 C 61,44 62,50 63,58 C 65,72 64,88 60,98 Z"
            fill="#f8a888" opacity="0.6"/>

      {/* Inner left */}
      <path d="M 60,100 C 50,96 44,80 46,64 C 48,50 54,42 60,41 C 54,52 52,70 54,86 C 56,94 58,98 60,100 Z"
            fill="#ee7040"/>

      {/* Inner right */}
      <path d="M 60,100 C 70,96 76,80 74,64 C 72,50 66,42 60,41 C 66,52 68,70 66,86 C 64,94 62,98 60,100 Z"
            fill="#ee7040"/>

      {/* PETAL TIPS at top */}
      <path d="M 50,42 C 48,36 50,30 54,32 C 56,34 56,38 54,42 Z"
            fill="#d45830"/>
      <path d="M 60,40 C 58,34 60,28 62,28 C 64,28 62,34 60,40 Z"
            fill="#e06038"/>
      <path d="M 70,42 C 72,36 70,30 66,32 C 64,34 64,38 66,42 Z"
            fill="#d45830"/>

      {/* BASE SEPAL */}
      <path d="M 48,104 C 46,110 50,115 60,116 C 70,115 74,110 72,104"
            fill="#3a7a2a" opacity="0.8"/>

    </svg>
  );
}
