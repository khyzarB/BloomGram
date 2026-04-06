import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FLOWERS from '../data/flowers';
import BouquetPreview from '../components/BouquetPreview';
import CardPreview from '../components/CardPreview';

export default function Bouquet() {
  const { id } = useParams();
  const [bouquet, setBouquet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    fetch(`/api/bouquets/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Not found');
        const text = await res.text();
        return JSON.parse(text);
      })
      .then((data) => {
        setBouquet(data);
        setLoading(false);
        setTimeout(() => setShowCard(true), data.flowers.length * 150 + 800);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-gentle-bounce">💐</div>
          <p className="font-body text-muted text-sm mt-4 italic">Unwrapping your bouquet...</p>
        </div>
      </div>
    );
  }

  if (error || !bouquet) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🥀</div>
          <h1 className="font-display text-2xl text-primary mb-2">Bouquet Not Found</h1>
          <p className="font-body text-muted text-sm mb-6 leading-relaxed">
            This bouquet may have wilted away or the link might be incorrect.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-rose text-white font-body font-bold rounded-2xl hover:bg-rose/90 transition-colors shadow-lg shadow-rose/20"
          >
            Create Your Own BloomGram
          </Link>
        </div>
      </div>
    );
  }

  const uniqueFlowers = [...new Set(bouquet.flowers)]
    .map((fid) => FLOWERS.find((f) => f.id === fid))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-slide-up">
          <p className="font-body text-muted text-xs uppercase tracking-[0.2em]">A BloomGram for</p>
          <h1 className="font-display text-4xl font-bold text-primary mt-2">
            {bouquet.toName}
          </h1>
          <div className="w-10 h-[1px] bg-rose/30 mx-auto mt-3" />
        </div>

        {/* Bouquet */}
        <div className="bg-white rounded-3xl border border-[rgba(180,140,100,0.1)] p-8 shadow-sm mb-6">
          <BouquetPreview
            selectedFlowers={bouquet.flowers}
            onRemove={null}
            animated={true}
            arrangement={bouquet.arrangement}
            wrapperColor={bouquet.wrapperColor}
            ribbonColor={bouquet.ribbonColor}
          />
        </div>

        {/* Flower meanings */}
        <div
          className="text-center mb-8 p-4 rounded-2xl bg-white/50 animate-fade-slide-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <p className="font-display text-xs text-muted uppercase tracking-[0.15em] mb-2">
            The language of flowers
          </p>
          {uniqueFlowers.map((f) => (
            <p key={f.id} className="text-xs text-muted font-body leading-relaxed">
              {f.emoji} <span className="font-semibold">{f.name}</span> — <em>{f.meaning}</em>
            </p>
          ))}
        </div>

        {/* Card */}
        {showCard && (
          <div className="animate-fade-slide-up">
            <CardPreview
              theme={bouquet.theme}
              toName={bouquet.toName}
              fromName={bouquet.fromName}
              message={bouquet.message}
            />
          </div>
        )}

        {/* CTA */}
        <div
          className="text-center mt-14 animate-fade-in"
          style={{ animationDelay: '2.5s', animationFillMode: 'both' }}
        >
          <p className="font-body text-muted text-xs mb-3">Touched by this bouquet?</p>
          <Link
            to="/"
            className="inline-block px-8 py-3.5 bg-rose text-white font-body font-bold rounded-2xl hover:bg-rose/90 transition-all duration-200 shadow-lg shadow-rose/20 hover:shadow-xl active:scale-[0.98]"
          >
            Create Your Own BloomGram
          </Link>
        </div>
      </div>
    </div>
  );
}
