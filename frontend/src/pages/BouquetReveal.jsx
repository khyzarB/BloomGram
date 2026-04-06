import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FLOWERS from '../data/flowers';
import BouquetCanvas from '../components/BouquetCanvas';
import CardPreview from '../components/CardPreview';

export default function BouquetReveal() {
  const { id } = useParams();
  const [bouquet, setBouquet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardExpanded, setCardExpanded] = useState(false);

  useEffect(() => {
    fetch(`/api/bouquets/${id}`)
      .then(async res => {
        if (!res.ok) throw new Error();
        return JSON.parse(await res.text());
      })
      .then(data => {
        setBouquet(data);
        setLoading(false);
        // Card appears after bouquet animation completes
        const greeneryTime = (data.greenery?.length || 0) * 150;
        const flowerTime = data.flowers.length * 250;
        setTimeout(() => setShowCard(true), greeneryTime + flowerTime + 1200);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-5xl animate-gentle-bounce">💐</div>
          <p className="font-body text-muted text-sm mt-4 italic">Unwrapping your bouquet...</p>
        </div>
      </div>
    );
  }

  if (error || !bouquet) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-sm animate-fade-slide-up">
          {/* Sad flower illustration */}
          <svg className="mx-auto mb-4 opacity-40" width="80" height="100" viewBox="0 0 100 140">
            <path d="M50 70 C48 90, 46 110, 48 135" stroke="#8b6b52" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="35" cy="52" rx="15" ry="18" fill="#d4a8a8" transform="rotate(-20 35 52)" />
            <ellipse cx="65" cy="52" rx="15" ry="18" fill="#d4a8a8" transform="rotate(20 65 52)" />
            <ellipse cx="50" cy="42" rx="14" ry="16" fill="#c8a0a0" />
            <circle cx="50" cy="44" r="5" fill="#b09090" />
          </svg>
          <h1 className="font-display text-2xl text-primary mb-2">Bouquet Not Found</h1>
          <p className="font-body text-muted text-sm mb-6 leading-relaxed">This bouquet may have wilted away or the link might be incorrect.</p>
          <Link to="/" className="inline-block px-6 py-3 bg-rose text-white font-body font-bold rounded-2xl hover:bg-rose/90 transition-colors shadow-lg shadow-rose/20">
            Create Your Own BloomGram
          </Link>
        </div>
      </div>
    );
  }

  const uniqueFlowers = [...new Set(bouquet.flowers)]
    .map(fid => FLOWERS.find(f => f.id === fid)).filter(Boolean);

  return (
    <div className="min-h-screen bg-cream overflow-hidden">
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Title */}
        <div className="text-center mb-6 animate-fade-slide-up">
          <p className="font-body text-muted text-xs uppercase tracking-[0.2em]">A BloomGram for</p>
          <h1 className="font-display text-4xl font-bold text-primary mt-2">{bouquet.toName}</h1>
          <p className="font-body text-muted text-xs mt-2 italic">Here's your beautiful creation</p>
          <div className="w-10 h-[1px] bg-rose/30 mx-auto mt-3" />
        </div>

        {/* Animated bouquet */}
        <div className="bg-white rounded-3xl border border-[rgba(180,140,100,0.08)] p-4 shadow-sm mb-4">
          <BouquetCanvas
            flowers={bouquet.flowers}
            greenery={bouquet.greenery}
          />
        </div>

        {/* Flower meanings */}
        <div className="text-center mb-6 animate-fade-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          <p className="font-display text-[10px] text-muted uppercase tracking-[0.15em] mb-2">The language of flowers</p>
          {uniqueFlowers.map(f => (
            <p key={f.id} className="text-xs text-muted font-body leading-relaxed">
              <span className="font-semibold">{f.name}</span> — <em>{f.meaning}</em>
            </p>
          ))}
        </div>

        {/* Card — starts small, expand on click */}
        {showCard && (
          <div className="animate-fade-slide-up">
            <p className="text-center text-muted text-[10px] font-body mb-2 animate-pulse">
              {cardExpanded ? '' : 'Tap card to expand'}
            </p>
            <div
              onClick={() => setCardExpanded(!cardExpanded)}
              className="cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: cardExpanded ? 'scale(1)' : 'scale(0.75)',
                opacity: cardExpanded ? 1 : 0.9,
                transformOrigin: 'top center',
              }}
            >
              <CardPreview theme={bouquet.theme} toName={bouquet.toName} fromName={bouquet.fromName} message={bouquet.message} />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14 animate-fade-in" style={{ animationDelay: '3s', animationFillMode: 'both' }}>
          <p className="font-body text-muted text-xs mb-3">Touched by this bouquet?</p>
          <Link to="/" className="inline-block px-8 py-3.5 bg-rose text-white font-body font-bold rounded-2xl hover:bg-rose/90 transition-all shadow-lg shadow-rose/20 active:scale-[0.98]">
            Create Your Own BloomGram
          </Link>
        </div>
      </div>
    </div>
  );
}
