export default function Lily({ width = 120, height = 160 }) {
  const lilyPetal = (rot, key) => (
    <g key={key} transform={`rotate(${rot}, 60, 52)`}>
      {/* Recurved petal — curves out then tips curl back */}
      <path
        d="M60,52 C52,47 48,24 52,8 C55,-4 60,-8 60,-8 C60,-8 65,-4 68,8 C72,24 68,47 60,52Z"
        fill="#fefce8"
      />
      {/* Purple-pink flush at tip */}
      <path
        d="M60,-8 C55,-4 52,4 52,8 C56,0 58,-4 60,-8Z"
        fill="#ddd6fe" opacity="0.7"
      />
      <path
        d="M60,-8 C65,-4 68,4 68,8 C64,0 62,-4 60,-8Z"
        fill="#c084fc" opacity="0.5"
      />
      {/* Shadow side */}
      <path
        d="M60,52 C54,48 50,30 52,12 C54,2 58,-4 60,-6 L60,52Z"
        fill="#e8dcc8" opacity="0.3"
      />
      {/* Center vein */}
      <line x1="60" y1="48" x2="60" y2="-4" stroke="#d4c8a0" strokeWidth="0.5" opacity="0.4" />
    </g>
  );

  return (
    <svg viewBox="0 0 120 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M60,76 C58,92 56,120 58,155" stroke="#3a7a32" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M57,105 C36,94 24,98 24,108 C24,118 40,116 57,108Z" fill="#3a7a32" />
      <path d="M59,130 C78,120 88,124 86,132 C84,140 70,136 59,132Z" fill="#2d5a27" />

      {/* 6 petals at 60° intervals */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => lilyPetal(a, `p${i}`))}

      {/* 6 stamens with orange anthers */}
      {[-14, -8, -2, 4, 10, 16].map((dx, i) => (
        <g key={`s${i}`}>
          <line x1={60 + dx} y1="52" x2={60 + dx * 1.4} y2="30" stroke="#5a8a50" strokeWidth="1" />
          <ellipse cx={60 + dx * 1.4} cy="28" rx="2.5" ry="4" fill="#ea580c" />
          <ellipse cx={60 + dx * 1.4} cy="27" rx="1.5" ry="2.5" fill="#f97316" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}
