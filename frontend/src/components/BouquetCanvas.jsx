import { useState, useRef, useCallback, useEffect } from 'react';
import FLOWERS from '../data/flowers';
import GREENERY from '../data/greenery';

/* ── Default placement offsets from center (250, 300) ── */
const PLACEMENTS = {
  1: [[0, -20]],
  2: [[-45, 10], [45, -10]],
  3: [[0, -30], [-50, 20], [50, 20]],
  4: [[0, -50], [-55, 0], [55, 0], [0, 40]],
  5: [[0, -55], [-50, -15], [50, -15], [-35, 35], [35, 35]],
  6: [[0, -65], [-55, -20], [55, -20], [-50, 25], [50, 25], [0, 45]],
};

function getDefaultPositions(count) {
  if (count <= 6 && PLACEMENTS[count]) {
    return PLACEMENTS[count].map(([dx, dy], i) => ({
      dx, dy,
      rotation: Math.sin(i * 2.7) * 16,
      scale: dy > 20 ? 1.0 : 0.9,
    }));
  }
  // 7+ — arc pattern
  const positions = [];
  const inner = Math.min(count, 4);
  const outer = count - inner;
  for (let i = 0; i < inner; i++) {
    const t = inner === 1 ? 0.5 : i / (inner - 1);
    const angle = -50 + t * 100;
    const rad = (angle * Math.PI) / 180;
    positions.push({
      dx: Math.sin(rad) * 55,
      dy: -Math.cos(rad) * 40 + 20,
      rotation: angle * 0.3,
      scale: 1.0,
    });
  }
  for (let i = 0; i < outer; i++) {
    const t = outer === 1 ? 0.5 : i / (outer - 1);
    const angle = -60 + t * 120;
    const rad = (angle * Math.PI) / 180;
    positions.push({
      dx: Math.sin(rad) * 80,
      dy: -Math.cos(rad) * 60 - 20,
      rotation: angle * 0.25,
      scale: 0.85,
    });
  }
  return positions;
}

/* Greenery fan angles */
const GREENERY_ANGLES = [-38, -22, -5, 12, 28, 42];

export default function BouquetCanvas({
  flowers = [],          // array of flower id strings
  greenery = [],         // array of greenery id strings
  positions: externalPos,
  onPositionsChange,
  draggable = false,
  animated = false,
  className = '',
}) {
  const cx = 250, cy = 300;
  const svgRef = useRef(null);
  const [dragging, setDragging] = useState(null); // index
  const [dragStart, setDragStart] = useState(null);

  // Internal positions state — either controlled or local
  const defaults = getDefaultPositions(flowers.length);
  const [localPos, setLocalPos] = useState(defaults);

  const positions = externalPos || localPos;
  const setPositions = onPositionsChange || setLocalPos;

  // Reset positions when flower count changes
  useEffect(() => {
    if (!externalPos) {
      setLocalPos(getDefaultPositions(flowers.length));
    }
  }, [flowers.length, externalPos]);

  const autoArrange = useCallback(() => {
    const newPos = getDefaultPositions(flowers.length);
    setPositions(newPos);
  }, [flowers.length, setPositions]);

  // Drag handlers
  const handlePointerDown = useCallback((e, index) => {
    if (!draggable) return;
    e.preventDefault();
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    setDragging(index);
    setDragStart({ x: svgPt.x, y: svgPt.y, origDx: positions[index].dx, origDy: positions[index].dy });
  }, [draggable, positions]);

  const handlePointerMove = useCallback((e) => {
    if (dragging === null || !dragStart) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    const newDx = Math.max(-180, Math.min(180, dragStart.origDx + (svgPt.x - dragStart.x)));
    const newDy = Math.max(-200, Math.min(120, dragStart.origDy + (svgPt.y - dragStart.y)));
    const newPos = positions.map((p, i) => i === dragging ? { ...p, dx: newDx, dy: newDy } : p);
    setPositions(newPos);
  }, [dragging, dragStart, positions, setPositions]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
    setDragStart(null);
  }, []);

  // Sort flowers by Y for depth (back to front)
  const sortedIndices = flowers.map((_, i) => i)
    .sort((a, b) => (positions[a]?.dy || 0) - (positions[b]?.dy || 0));

  // Resolve greenery components
  const greeneryItems = greenery.map(id => GREENERY.find(g => g.id === id)).filter(Boolean);

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 500 600"
        className="w-full h-auto max-w-[420px] mx-auto"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: 'none' }}
      >
        <defs>
          <filter id="grain">
            <feTurbulence baseFrequency="0.8" numOctaves="4" type="fractalNoise" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>

        {/* ── Greenery layer (behind flowers) ── */}
        {greeneryItems.map((g, i) => {
          const angle = GREENERY_ANGLES[i % GREENERY_ANGLES.length];
          const flipIt = angle > 0;
          return (
            <g
              key={`${g.id}-${i}`}
              transform={`translate(${cx}, ${cy + 50}) rotate(${angle})`}
              className={animated ? 'animate-greenery-in' : ''}
              style={animated ? { animationDelay: `${i * 150}ms`, animationFillMode: 'both' } : {}}
            >
              <g transform="translate(-40, -180)">
                <g.Component width={80} height={180} flip={flipIt} />
              </g>
            </g>
          );
        })}

        {/* ── Flowers ── */}
        {sortedIndices.map((i) => {
          const flowerId = flowers[i];
          const flowerData = FLOWERS.find(f => f.id === flowerId);
          if (!flowerData || !positions[i]) return null;
          const { dx, dy, rotation, scale: s } = positions[i];
          const fw = 80 * (s || 1);
          const fh = 110 * (s || 1);
          return (
            <g
              key={`flower-${i}`}
              transform={`translate(${cx + dx}, ${cy + dy}) rotate(${rotation || 0})`}
              onPointerDown={(e) => handlePointerDown(e, i)}
              className={`${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${animated ? 'animate-flower-bloom' : ''}`}
              style={animated ? { animationDelay: `${greeneryItems.length * 150 + 400 + i * 250}ms`, animationFillMode: 'both' } : {}}
            >
              {/* Highlight ring when dragging */}
              {dragging === i && (
                <circle cx="0" cy="0" r={fh * 0.5} fill="none" stroke="#e8637a" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
              )}
              <g transform={`translate(${-fw / 2}, ${-fh / 2})`}>
                <flowerData.Component width={fw} height={fh} />
              </g>
            </g>
          );
        })}

        {/* ── Wrap (kraft paper cone) ── */}
        <g
          className={animated ? 'animate-wrap-slide' : ''}
          style={animated ? { animationDelay: `${greeneryItems.length * 150 + 400 + flowers.length * 250 + 200}ms`, animationFillMode: 'both' } : {}}
        >
          {/* Main cone */}
          <path
            d="M160 400 L250 580 L340 400 Z"
            fill="url(#wrapGradient)"
            stroke="#c4a070"
            strokeWidth="1.5"
          />
          {/* Wrap gradient */}
          <defs>
            <linearGradient id="wrapGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8d5b7" />
              <stop offset="50%" stopColor="#dcc8a0" />
              <stop offset="100%" stopColor="#c4a882" />
            </linearGradient>
          </defs>
          {/* Paper texture lines */}
          {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
            const lx = 160 + (250 - 160) * t;
            const ly = 400 + (580 - 400) * t;
            const rx = 340 + (250 - 340) * t;
            const ry = 400 + (580 - 400) * t;
            return <line key={i} x1={lx + 10} y1={ly} x2={rx - 10} y2={ry} stroke="#c4a070" strokeWidth="0.5" opacity="0.15" />;
          })}
          {/* Fold at top */}
          <path d="M155 400 C155 390, 200 385, 250 388 C300 385, 345 390, 345 400" fill="#e8d5b7" stroke="#c4a070" strokeWidth="1" />

          {/* ── Ribbon bow ── */}
          <g transform="translate(250, 395)">
            {/* Left loop */}
            <ellipse cx="-18" cy="-2" rx="16" ry="9" fill="#e8637a" transform="rotate(-15)" />
            <ellipse cx="-18" cy="-2" rx="12" ry="6" fill="#f0a0b8" opacity="0.3" transform="rotate(-15)" />
            {/* Right loop */}
            <ellipse cx="18" cy="-2" rx="16" ry="9" fill="#e8637a" transform="rotate(15)" />
            <ellipse cx="18" cy="-2" rx="12" ry="6" fill="#f0a0b8" opacity="0.3" transform="rotate(15)" />
            {/* Center knot */}
            <ellipse cx="0" cy="0" rx="8" ry="7" fill="#c9446a" />
            {/* Tails */}
            <path d="M-4 6 C-10 20, -18 28, -22 35" stroke="#e8637a" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M4 6 C10 20, 18 28, 22 35" stroke="#e8637a" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </svg>

      {/* Auto-arrange button */}
      {draggable && (
        <button
          onClick={autoArrange}
          className="absolute bottom-2 right-2 px-3 py-1.5 text-xs font-body bg-white/90 border border-[rgba(180,140,100,0.2)] rounded-lg text-muted hover:text-rose hover:border-rose/30 transition-colors shadow-sm"
        >
          Auto-arrange
        </button>
      )}
    </div>
  );
}

export { getDefaultPositions };
