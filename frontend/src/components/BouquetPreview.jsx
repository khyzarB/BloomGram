import FLOWERS from '../data/flowers';

const ARRANGEMENTS = {
  round: {
    getPositions(count) {
      const positions = [];
      if (count === 0) return positions;
      // Dome/round arrangement — flowers fill a semicircle from center outward
      const layers = count <= 3 ? 1 : count <= 7 ? 2 : 3;
      let placed = 0;
      for (let layer = 0; layer < layers; layer++) {
        const remaining = count - placed;
        const layersLeft = layers - layer;
        const inLayer = Math.min(Math.ceil(remaining / layersLeft), remaining);
        const arcSpread = 100 + layer * 60;
        const yBase = -layer * 54 - 10;
        for (let i = 0; i < inLayer; i++) {
          const t = inLayer === 1 ? 0.5 : i / (inLayer - 1);
          const angle = -60 + t * 120;
          const rad = (angle * Math.PI) / 180;
          const x = Math.sin(rad) * (arcSpread * 0.45);
          const y = yBase - Math.cos(rad) * 20;
          const rotation = angle * 0.3;
          positions.push({ x, y, rotation, scale: 1 - layer * 0.05 });
          placed++;
        }
      }
      return positions;
    },
  },
  cascade: {
    getPositions(count) {
      const positions = [];
      // Waterfall/cascade — flowers drape downward from center
      for (let i = 0; i < count; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const xOffset = (col - 1) * 58;
        const jitter = Math.sin(i * 4.7) * 10;
        const yDrop = row * 20;
        positions.push({
          x: xOffset + jitter,
          y: -row * 42 - 10 + yDrop * 0.2,
          rotation: (col - 1) * 12 + Math.sin(i * 3) * 5,
          scale: 1 - row * 0.04,
        });
      }
      return positions;
    },
  },
  heart: {
    getPositions(count) {
      const positions = [];
      // Heart shape parametric
      for (let i = 0; i < count; i++) {
        const t = (i / Math.max(count - 1, 1)) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        positions.push({
          x: hx * 5.5,
          y: -hy * 4.5 - 80,
          rotation: Math.sin(i * 2.3) * 10,
          scale: 0.95,
        });
      }
      return positions;
    },
  },
  crescent: {
    getPositions(count) {
      const positions = [];
      // Arc/crescent
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0.5 : i / (count - 1);
        const angle = -70 + t * 140;
        const rad = (angle * Math.PI) / 180;
        const radius = 90 + Math.sin(t * Math.PI) * 20;
        positions.push({
          x: Math.sin(rad) * radius,
          y: -Math.cos(rad) * radius + 20,
          rotation: angle * 0.4,
          scale: 0.9 + Math.sin(t * Math.PI) * 0.15,
        });
      }
      return positions;
    },
  },
};

const WRAPPER_COLORS = [
  { id: 'cream', label: 'Cream', bg: 'linear-gradient(180deg, #fef3e2, #f5e6d0)', border: '#e8d5b8' },
  { id: 'pink', label: 'Pink', bg: 'linear-gradient(180deg, #fde2e8, #f5c6d0)', border: '#e8a0b0' },
  { id: 'sage', label: 'Sage', bg: 'linear-gradient(180deg, #e2f0e2, #cce0cc)', border: '#a8c8a8' },
  { id: 'lavender', label: 'Lavender', bg: 'linear-gradient(180deg, #ece2f5, #d8c8ee)', border: '#baa8d8' },
  { id: 'white', label: 'White', bg: 'linear-gradient(180deg, #ffffff, #f5f0eb)', border: '#e0d8d0' },
  { id: 'kraft', label: 'Kraft', bg: 'linear-gradient(180deg, #d4b896, #c4a070)', border: '#a88050' },
];

const RIBBON_COLORS = [
  { id: 'rose', label: 'Rose', color: '#e8637a' },
  { id: 'gold', label: 'Gold', color: '#d4a040' },
  { id: 'sage', label: 'Sage', color: '#6b9e6b' },
  { id: 'lavender', label: 'Lavender', color: '#9b7ec8' },
  { id: 'peach', label: 'Peach', color: '#f0a070' },
  { id: 'navy', label: 'Navy', color: '#3a4a6b' },
];

export {ARRANGEMENTS, WRAPPER_COLORS, RIBBON_COLORS};

export default function BouquetPreview({
  selectedFlowers,
  onRemove,
  animated = false,
  arrangement = 'round',
  wrapperColor = 'cream',
  ribbonColor = 'rose',
}) {
  const flowerData = selectedFlowers.map((id) => FLOWERS.find((f) => f.id === id));
  const arr = ARRANGEMENTS[arrangement] || ARRANGEMENTS.round;
  const positions = arr.getPositions(selectedFlowers.length);
  const wrapper = WRAPPER_COLORS.find((w) => w.id === wrapperColor) || WRAPPER_COLORS[0];
  const ribbon = RIBBON_COLORS.find((r) => r.id === ribbonColor) || RIBBON_COLORS[0];

  if (selectedFlowers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-72 text-muted font-body">
        <div className="text-6xl mb-4 opacity-20">💐</div>
        <p className="text-sm font-display italic">Your bouquet is empty</p>
        <p className="text-xs mt-2 opacity-60">Pick some flowers to begin</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative" style={{ width: 280, height: 300 }}>
        {/* Stems */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="280" height="300"
          viewBox="0 0 280 300"
        >
          {positions.map((pos, i) => {
            const fx = 140 + pos.x;
            const fy = 120 + pos.y;
            const bx = 140 + (pos.x * 0.15);
            const by = 240;
            return (
              <path
                key={i}
                d={`M ${fx} ${fy + 16} C ${fx} ${fy + 50}, ${bx} ${by - 40}, ${bx} ${by}`}
                stroke="#5a8a50"
                strokeWidth="2.5"
                fill="none"
                opacity={0.5}
                className={animated ? 'animate-fade-in' : ''}
                style={animated ? { animationDelay: `${i * 0.1}s`, animationFillMode: 'both' } : {}}
              />
            );
          })}
        </svg>

        {/* Wrapper / paper cone */}
        <div
          className="absolute"
          style={{
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            width: 160,
            height: 120,
            background: wrapper.bg,
            border: `1.5px solid ${wrapper.border}`,
            borderRadius: '8px 8px 40% 40%',
            clipPath: 'polygon(5% 0%, 95% 0%, 78% 100%, 22% 100%)',
            zIndex: 10,
          }}
        >
          {/* Texture lines on wrapper */}
          <div className="absolute inset-0 opacity-10"
            style={{
              background: 'repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(0,0,0,0.06) 8px, rgba(0,0,0,0.06) 9px)',
            }}
          />
        </div>

        {/* Wrapper fold/lip */}
        <div
          className="absolute"
          style={{
            left: '50%',
            bottom: 116,
            transform: 'translateX(-50%)',
            width: 168,
            height: 18,
            background: wrapper.bg,
            border: `1.5px solid ${wrapper.border}`,
            borderBottom: 'none',
            borderRadius: '6px 6px 0 0',
            zIndex: 11,
            opacity: 0.7,
          }}
        />

        {/* Ribbon bow */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: '50%',
            bottom: 105,
            transform: 'translateX(-50%)',
            zIndex: 15,
          }}
        >
          {/* Left loop */}
          <div
            style={{
              width: 28,
              height: 18,
              borderRadius: '50%',
              background: ribbon.color,
              transform: 'rotate(-20deg)',
              opacity: 0.85,
              marginRight: -4,
            }}
          />
          {/* Center knot */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: ribbon.color,
              zIndex: 2,
              boxShadow: `0 0 0 2px ${ribbon.color}33`,
            }}
          />
          {/* Right loop */}
          <div
            style={{
              width: 28,
              height: 18,
              borderRadius: '50%',
              background: ribbon.color,
              transform: 'rotate(20deg)',
              opacity: 0.85,
              marginLeft: -4,
            }}
          />
        </div>

        {/* Ribbon tails */}
        <svg className="absolute pointer-events-none" style={{ left: '50%', bottom: 80, transform: 'translateX(-50%)', zIndex: 14 }} width="60" height="32" viewBox="0 0 60 32">
          <path d={`M 22 0 Q 16 16, 8 28`} stroke={ribbon.color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d={`M 38 0 Q 44 16, 52 28`} stroke={ribbon.color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* Flowers */}
        {flowerData.map((flower, i) => {
          if (!flower) return null;
          const pos = positions[i] || { x: 0, y: 0, rotation: 0, scale: 1 };
          const isClickable = onRemove != null;
          return (
            <button
              key={i}
              onClick={() => isClickable && onRemove(i)}
              disabled={!isClickable}
              className={`absolute transition-transform duration-200 ${
                isClickable ? 'cursor-pointer hover:scale-[1.3] hover:z-50' : 'cursor-default'
              } ${animated ? 'animate-bloom-in' : ''}`}
              style={{
                left: 140 + pos.x - 20,
                top: 120 + pos.y - 20,
                width: 40,
                height: 40,
                fontSize: '2.2rem',
                lineHeight: '40px',
                textAlign: 'center',
                transform: `rotate(${pos.rotation}deg) scale(${pos.scale || 1})`,
                zIndex: 20 + i,
                animationDelay: animated ? `${i * 0.15}s` : '0s',
                animationFillMode: 'both',
                filter: `drop-shadow(0 2px 3px rgba(0,0,0,0.15))`,
              }}
              title={isClickable ? `${flower.name} — click to remove` : flower.name}
            >
              {flower.emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}
