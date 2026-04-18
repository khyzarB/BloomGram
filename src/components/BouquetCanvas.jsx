import { FLOWER_MAP } from '../data/flowers';
import { GREENERY_MAP } from '../data/greenery';

const CENTER_X = 250;
const CENTER_Y = 280;

const PLACEMENTS = {
  1: [[0, 0]],
  2: [[-60, 10], [60, -10]],
  3: [[0, -50], [-62, 28], [62, 28]],
  4: [[0, -58], [-68, 4], [68, 4], [0, 60]],
  5: [[0, -65], [-62, -24], [62, -24], [-46, 48], [46, 48]],
  6: [[0, -70], [-65, -26], [65, -26], [-60, 40], [60, 40], [0, 66]],
  7: [[0, -74], [-62, -38], [62, -38], [-78, 14], [78, 14], [-46, 66], [46, 66]],
  8: [[0, -76], [-56, -52], [56, -52], [-80, 8], [80, 8], [-60, 60], [60, 60], [0, 76]],
};

const GREENERY_CONFIGS = {
  1: [{ angle: -5, left: 210, top: 260, scale: 1.05 }],
  2: [
    { angle: -30, left: 168, top: 255, scale: 1.0 },
    { angle: 22, left: 252, top: 258, scale: 1.0 },
  ],
  3: [
    { angle: -38, left: 155, top: 252, scale: 0.95 },
    { angle: -5, left: 208, top: 248, scale: 1.08 },
    { angle: 28, left: 255, top: 255, scale: 0.95 },
  ],
  4: [
    { angle: -42, left: 148, top: 250, scale: 0.92 },
    { angle: -20, left: 182, top: 246, scale: 1.0 },
    { angle: 14, left: 240, top: 248, scale: 1.0 },
    { angle: 38, left: 268, top: 252, scale: 0.92 },
  ],
  5: [
    { angle: -45, left: 142, top: 248, scale: 0.9 },
    { angle: -24, left: 174, top: 244, scale: 0.98 },
    { angle: 0, left: 206, top: 242, scale: 1.08 },
    { angle: 22, left: 240, top: 246, scale: 0.98 },
    { angle: 44, left: 266, top: 250, scale: 0.9 },
  ],
};

function getDefaultPositions(count) {
  const table = PLACEMENTS[Math.min(count, 8)] || PLACEMENTS[8];
  return Array.from({ length: count }, (_, i) => {
    const [ox, oy] = table[i % table.length] || [0, 0];
    return { dx: ox, dy: oy, rotation: parseFloat((Math.sin(i * 2.4) * 13).toFixed(1)) };
  });
}

export default function BouquetCanvas({ flowers = [], greenery = [], className = '' }) {
  const placements = PLACEMENTS[Math.min(flowers.length, 8)] || PLACEMENTS[8];
  const greeneryConfigs = GREENERY_CONFIGS[Math.min(greenery.length, 5)] || GREENERY_CONFIGS[3];

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '500px',
        height: '620px',
        maxWidth: '100%',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* ── LAYER 1: GREENERY ── */}
      {greenery.map((g, i) => {
        const gid = typeof g === 'string' ? g : g.id || g;
        const config = greeneryConfigs[i];
        if (!config) return null;
        const GComp = GREENERY_MAP[gid];
        if (!GComp) return null;
        return (
          <div
            key={`g-${i}`}
            style={{
              position: 'absolute',
              left: `${config.left}px`,
              top: `${config.top}px`,
              width: '90px',
              height: '220px',
              transform: `rotate(${config.angle}deg) scale(${config.scale})`,
              transformOrigin: 'bottom center',
              zIndex: 1,
            }}
          >
            <GComp width={90} height={220} />
          </div>
        );
      })}

      {/* ── LAYER 2: FLOWERS ── */}
      {flowers.map((f, i) => {
        const fid = typeof f === 'string' ? f : f.id || f;
        const [ox, oy] = placements[i % placements.length] || [0, 0];
        const cx = CENTER_X + ox;
        const cy = CENTER_Y + oy;
        const depthT = (oy + 76) / 152;
        const depthScale = 0.88 + depthT * 0.18;
        const fw = Math.round(130 * depthScale);
        const fh = Math.round(165 * depthScale);
        const rotation = Math.sin(i * 2.3) * 13;
        const FlowerComp = FLOWER_MAP[fid];
        if (!FlowerComp) return null;
        return (
          <div
            key={`f-${i}`}
            style={{
              position: 'absolute',
              left: `${cx - fw / 2}px`,
              top: `${cy - fh / 2}px`,
              width: `${fw}px`,
              height: `${fh}px`,
              transform: `rotate(${rotation.toFixed(1)}deg)`,
              transformOrigin: 'center bottom',
              zIndex: 2 + Math.round((oy + 76) / 15),
            }}
          >
            <FlowerComp width={fw} height={fh} />
          </div>
        );
      })}

      {/* ── LAYER 3: WRAP (SVG overlay) ── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '500px',
          height: '620px',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 500 620"
          width="500"
          height="620"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main wrap trapezoid */}
          <path d="M 148,442 L 352,442 L 292,582 L 208,582 Z" fill="#c4a882" />
          {/* Left shadow fold */}
          <path d="M 148,442 L 208,582 L 220,582 L 162,442 Z" fill="#9a7a58" opacity="0.45" />
          {/* Right highlight fold */}
          <path d="M 352,442 L 292,582 L 280,582 L 338,442 Z" fill="#dcc09a" opacity="0.45" />
          {/* Paper fold crease */}
          <line x1="148" y1="460" x2="352" y2="460" stroke="#a88860" strokeWidth="1.2" opacity="0.35" />

          {/* Ribbon — left loop */}
          <ellipse cx="226" cy="443" rx="26" ry="12" fill="#fbb6ce" transform="rotate(-24, 226, 443)" />
          {/* Ribbon — right loop */}
          <ellipse cx="274" cy="443" rx="26" ry="12" fill="#fbb6ce" transform="rotate(24, 274, 443)" />
          {/* Ribbon — center knot */}
          <circle cx="250" cy="443" r="9" fill="#f472b6" />
          {/* Ribbon — left tail */}
          <path d="M 250,443 C 238,454 222,460 214,472" stroke="#fbb6ce" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          {/* Ribbon — right tail */}
          <path d="M 250,443 C 262,454 278,460 286,472" stroke="#fbb6ce" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export { getDefaultPositions };
