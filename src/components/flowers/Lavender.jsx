export default function Lavender({ width = 90, height = 200 }) {
  const spike = (stemPath, tipX, tipY, floretPositions) => (
    <g>
      <path d={stemPath} stroke="#6b8a62" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {floretPositions.map(([fx, fy, shade], i) => (
        <ellipse key={i} cx={fx} cy={fy} rx="5" ry="3.5" fill={shade} />
      ))}
      <ellipse cx={tipX} cy={tipY} rx="3" ry="4" fill="#7c3aed" />
    </g>
  );

  return (
    <svg viewBox="0 0 90 200" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* Slim gray-green leaves at base */}
      <path d="M42,165 C28,155 20,158 22,166 C24,174 36,172 42,168Z" fill="#7a9a72" />
      <path d="M48,175 C62,167 70,170 68,178 C66,186 54,182 48,177Z" fill="#6b8a62" />
      <path d="M44,155 C32,148 26,152 28,158 C30,164 40,162 44,158Z" fill="#7a9a72" opacity="0.8" />

      {/* Spike 1 — center, tallest */}
      {spike(
        "M45,195 C45,160 45,120 45,80",
        45, 16,
        [
          [45, 24, '#7c3aed'], [45, 32, '#8b5cf6'], [45, 40, '#8b5cf6'],
          [45, 48, '#8b5cf6'], [45, 56, '#a78bfa'], [45, 64, '#a78bfa'],
          [45, 72, '#a78bfa'], [45, 80, '#c4b5fd'], [45, 88, '#c4b5fd'],
          [45, 96, '#c4b5fd'], [45, 104, '#ddd6fe'], [45, 112, '#ddd6fe'],
        ]
      )}

      {/* Spike 2 — left, angled */}
      {spike(
        "M45,195 C40,165 34,130 28,90",
        26, 28,
        [
          [27, 35, '#7c3aed'], [28, 44, '#8b5cf6'], [29, 53, '#8b5cf6'],
          [30, 62, '#a78bfa'], [31, 71, '#a78bfa'], [32, 80, '#c4b5fd'],
          [33, 89, '#c4b5fd'], [34, 98, '#ddd6fe'], [35, 107, '#ddd6fe'],
        ]
      )}

      {/* Spike 3 — right, angled */}
      {spike(
        "M45,195 C50,165 56,130 62,90",
        64, 28,
        [
          [63, 35, '#7c3aed'], [62, 44, '#8b5cf6'], [61, 53, '#8b5cf6'],
          [60, 62, '#a78bfa'], [59, 71, '#a78bfa'], [58, 80, '#c4b5fd'],
          [57, 89, '#c4b5fd'], [56, 98, '#ddd6fe'], [55, 107, '#ddd6fe'],
        ]
      )}
    </svg>
  );
}
