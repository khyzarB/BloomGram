import FLOWERS from '../data/flowers';
import GREENERY from '../data/greenery';

export default function FlowerPicker({
  selectedFlowers,
  selectedGreenery,
  onAddFlower,
  onRemoveFlower,
  onToggleGreenery,
}) {
  const flowerCounts = {};
  selectedFlowers.forEach(id => { flowerCounts[id] = (flowerCounts[id] || 0) + 1; });

  return (
    <div className="step-enter">
      <h2 className="font-display text-xl text-center text-primary mb-1">Choose Your Flowers</h2>
      <p className="text-center text-muted text-sm font-body mb-5">
        Tap to add &middot; <span className="font-semibold text-rose">{selectedFlowers.length}</span>/12 selected
      </p>

      {/* Flower grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
        {FLOWERS.map(flower => {
          const count = flowerCounts[flower.id] || 0;
          return (
            <button
              key={flower.id}
              onClick={() => onAddFlower(flower.id)}
              className="flower-card group relative bg-white rounded-2xl p-3 text-center border border-[rgba(180,140,100,0.1)] hover:border-rose/30 focus:outline-none overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: flower.color }} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pop-in shadow-md z-10" style={{ background: flower.color }}>
                  {count}
                </span>
              )}
              <div className="flex justify-center mb-1.5" style={{ filter: `drop-shadow(0 2px 4px ${flower.color}30)` }}>
                <svg width={55} height={70} viewBox="0 0 55 70" overflow="visible"><flower.Component width={55} height={70} /></svg>
              </div>
              <div className="font-display font-semibold text-xs text-primary leading-tight">{flower.name}</div>
              <div className="text-[9px] text-muted mt-0.5 leading-tight font-body opacity-70">{flower.meaning}</div>
            </button>
          );
        })}
      </div>

      {/* Selected pills */}
      {selectedFlowers.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mb-6">
          {selectedFlowers.map((id, i) => {
            const f = FLOWERS.find(fl => fl.id === id);
            return (
              <span key={i} className="inline-flex items-center gap-1 bg-white border rounded-full px-2.5 py-0.5 text-xs font-body animate-pop-in shadow-sm" style={{ borderColor: `${f?.color}30` }}>
                {f?.name}
                <button onClick={() => onRemoveFlower(i)} className="text-muted hover:text-rose transition-colors leading-none">&times;</button>
              </span>
            );
          })}
        </div>
      )}

      {/* Greenery section */}
      <div className="mt-4 pt-4 border-t border-[rgba(180,140,100,0.1)]">
        <h3 className="font-display text-base text-primary mb-1">Add Foliage</h3>
        <p className="text-xs text-muted font-body mb-3">Lush greenery to fill your bouquet (max 3)</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {GREENERY.map(g => {
            const selected = selectedGreenery.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => onToggleGreenery(g.id)}
                className={`relative rounded-xl p-2 text-center border transition-all duration-200 ${
                  selected
                    ? 'border-sage bg-sage/5 ring-1 ring-sage/20'
                    : 'border-[rgba(180,140,100,0.1)] bg-white hover:border-sage/30'
                }`}
              >
                {selected && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-sage text-white text-[8px] rounded-full flex items-center justify-center">✓</span>
                )}
                <div className="flex justify-center mb-1 opacity-80">
                  <svg width={36} height={55} viewBox="0 0 36 55" overflow="visible"><g.Component width={36} height={55} /></svg>
                </div>
                <div className="text-[10px] font-body font-medium text-primary">{g.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
