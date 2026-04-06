export default function Orchid({ width = 120, height = 160 }) {
  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Curved stem */}
      <path d="M60,80 C55,95 48,120 50,155" stroke="#3a7a32" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Leaf */}
      <path d="M49,125 C32,115 22,120 22,130 C22,140 36,138 49,128Z" fill="#2d5a27" />

      {/* 2 side petals — wider, horizontal */}
      <path d="M60,44 C36,38 18,40 14,48 C10,56 22,62 42,56 C48,54 54,50 60,44Z" fill="#a78bfa" />
      <path d="M60,44 C84,38 102,40 106,48 C110,56 98,62 78,56 C72,54 66,50 60,44Z" fill="#a78bfa" />
      {/* Shadow on side petals */}
      <path d="M60,44 C40,40 24,42 18,48 C22,44 38,40 60,44Z" fill="#7c3aed" opacity="0.25" />
      <path d="M60,44 C80,40 96,42 102,48 C98,44 82,40 60,44Z" fill="#7c3aed" opacity="0.25" />

      {/* 2 upper petals — narrow, pointing up */}
      <path d="M60,44 C48,36 38,18 42,8 C46,-2 54,2 60,16 L60,44Z" fill="#8b5cf6" />
      <path d="M60,44 C72,36 82,18 78,8 C74,-2 66,2 60,16 L60,44Z" fill="#8b5cf6" />
      {/* Highlight on upper petals */}
      <path d="M60,16 C56,6 50,2 48,6 C50,4 54,4 60,16Z" fill="#c4b5fd" opacity="0.4" />
      <path d="M60,16 C64,6 70,2 72,6 C70,4 66,4 60,16Z" fill="#c4b5fd" opacity="0.4" />

      {/* Top sepal */}
      <path d="M60,44 C56,32 52,16 54,4 C56,-4 60,-6 60,-6 C60,-6 64,-4 66,4 C68,16 64,32 60,44Z" fill="#ddd6fe" />

      {/* Lip petal — ornate, largest */}
      <path d="M60,44 C38,42 28,54 32,66 C36,78 48,84 60,86 C72,84 84,78 88,66 C92,54 82,42 60,44Z" fill="#7c3aed" />
      {/* Lip ruffled edge highlight */}
      <path d="M36,70 C42,80 52,84 60,86 C68,84 78,80 84,70" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Yellow markings on lip */}
      <path d="M52,56 C55,50 60,48 60,48 C60,48 65,50 68,56" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
      <circle cx="56" cy="60" r="2" fill="#f59e0b" opacity="0.7" />
      <circle cx="64" cy="60" r="2" fill="#f59e0b" opacity="0.7" />
      <ellipse cx="60" cy="52" rx="3" ry="2" fill="#fde68a" opacity="0.5" />

      {/* Column */}
      <ellipse cx="60" cy="42" rx="3.5" ry="5.5" fill="#c4b5fd" />
      <ellipse cx="60" cy="41" rx="2" ry="3.5" fill="#ddd6fe" opacity="0.5" />
    </svg>
  );
}
