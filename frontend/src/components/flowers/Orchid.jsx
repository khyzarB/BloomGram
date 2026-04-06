export default function Orchid({ width = 100, height = 140 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Curved stem */}
      <path d="M50 72 C45 85, 40 105, 42 138" stroke="#3a7a32" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Leaf */}
      <path d="M42 115 C28 108, 20 112, 20 120 C20 128, 32 125, 42 118" fill="#2d5a27" />
      {/* 3 Outer sepals — light purple */}
      <path d="M50 12 C45 8, 40 10, 42 20 C44 30, 48 35, 50 38 C52 35, 56 30, 58 20 C60 10, 55 8, 50 12Z" fill="#ddd6fe" />
      <path d="M22 52 C15 48, 12 42, 18 36 C24 30, 32 34, 38 42 C34 45, 28 50, 22 52Z" fill="#ddd6fe" />
      <path d="M78 52 C85 48, 88 42, 82 36 C76 30, 68 34, 62 42 C66 45, 72 50, 78 52Z" fill="#ddd6fe" />
      {/* 2 Upper petals — medium purple */}
      <path d="M30 38 C24 28, 28 18, 38 16 C48 14, 48 24, 44 36 C40 34, 34 35, 30 38Z" fill="#8b5cf6" />
      <path d="M70 38 C76 28, 72 18, 62 16 C52 14, 52 24, 56 36 C60 34, 66 35, 70 38Z" fill="#8b5cf6" />
      {/* Lip petal — ornate, dark purple */}
      <path d="M35 52 C32 44, 38 38, 50 36 C62 38, 68 44, 65 52 C62 60, 56 66, 50 68 C44 66, 38 60, 35 52Z" fill="#7c3aed" />
      {/* Lip inner markings */}
      <ellipse cx="50" cy="48" rx="8" ry="5" fill="#fde68a" opacity="0.7" />
      <path d="M46 48 C48 44, 52 44, 54 48" stroke="#d97706" strokeWidth="1" fill="none" />
      <circle cx="48" cy="50" r="1.5" fill="#f59e0b" />
      <circle cx="52" cy="50" r="1.5" fill="#f59e0b" />
      {/* Column */}
      <ellipse cx="50" cy="40" rx="3" ry="5" fill="#c4b5fd" />
      {/* Vein lines */}
      <path d="M50 15 L50 35" stroke="#c4b5fd" strokeWidth="0.4" opacity="0.5" />
      <path d="M25 45 L38 42" stroke="#c4b5fd" strokeWidth="0.4" opacity="0.5" />
      <path d="M75 45 L62 42" stroke="#c4b5fd" strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}
