export default function FlowerCard({ flower, count, onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="flower-card group relative bg-white rounded-2xl p-4 text-center cursor-pointer border border-[rgba(180,140,100,0.12)] hover:border-rose/40 focus:outline-none focus:ring-2 focus:ring-rose/30 overflow-hidden"
    >
      {/* Color accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: flower.color }}
      />

      {count > 0 && (
        <span
          className="absolute -top-2 -right-2 w-7 h-7 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pop-in shadow-md"
          style={{ backgroundColor: flower.color }}
        >
          {count}
        </span>
      )}

      <div
        className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-110"
        style={{ filter: `drop-shadow(0 2px 4px ${flower.color}40)` }}
      >
        {flower.emoji}
      </div>
      <div className="font-display font-semibold text-sm text-primary">{flower.name}</div>
      <div className="text-[11px] text-muted mt-1 leading-tight font-body">{flower.meaning}</div>

      {/* Subtle color glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] rounded-2xl transition-opacity duration-300"
        style={{ background: flower.color }}
      />
    </button>
  );
}
