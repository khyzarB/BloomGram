export default function Lily({ width = 100, height = 140 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M50 75 C48 90, 46 115, 48 138" stroke="#3a7a32" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M47 100 C30 92, 22 96, 22 104 C22 112, 35 110, 47 103" fill="#3a7a32" />
      <path d="M49 120 C65 114, 74 118, 72 124 C70 130, 58 126, 49 122" fill="#2d5a27" />
      {/* Outer petals — recurved, cream-white with purple tips */}
      <path d="M20 50 C18 30, 30 10, 50 15 C35 12, 22 28, 20 50Z" fill="#fefce8" />
      <path d="M80 50 C82 30, 70 10, 50 15 C65 12, 78 28, 80 50Z" fill="#fefce8" />
      <path d="M25 60 C15 42, 28 18, 50 18 C32 20, 18 40, 25 60Z" fill="#fefce8" />
      <path d="M75 60 C85 42, 72 18, 50 18 C68 20, 82 40, 75 60Z" fill="#fefce8" />
      <path d="M35 65 C28 48, 36 25, 50 20 C40 28, 32 48, 35 65Z" fill="#fef9c3" />
      <path d="M65 65 C72 48, 64 25, 50 20 C60 28, 68 48, 65 65Z" fill="#fef9c3" />
      {/* Purple-pink tips */}
      <path d="M20 48 C18 38, 24 22, 34 16 C26 25, 20 36, 20 48Z" fill="#c084fc" opacity="0.6" />
      <path d="M80 48 C82 38, 76 22, 66 16 C74 25, 80 36, 80 48Z" fill="#c084fc" opacity="0.6" />
      <path d="M25 56 C18 44, 24 28, 38 20 C28 30, 20 44, 25 56Z" fill="#c084fc" opacity="0.4" />
      <path d="M75 56 C82 44, 76 28, 62 20 C72 30, 80 44, 75 56Z" fill="#c084fc" opacity="0.4" />
      {/* Stamens */}
      {[-12,-6,0,6,12].map((dx, i) => (
        <g key={i}>
          <line x1={50 + dx} y1="58" x2={50 + dx * 1.3} y2="35" stroke="#5a8a50" strokeWidth="1" />
          <ellipse cx={50 + dx * 1.3} cy="33" rx="2.5" ry="3.5" fill="#f59e0b" />
        </g>
      ))}
      {/* Highlight */}
      <ellipse cx="42" cy="35" rx="5" ry="10" fill="white" opacity="0.15" />
    </svg>
  );
}
