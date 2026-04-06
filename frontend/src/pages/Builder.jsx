import { useState } from 'react';
import FLOWERS from '../data/flowers';
import THEMES from '../data/themes';
import StepIndicator from '../components/StepIndicator';
import FlowerCard from '../components/FlowerCard';
import BouquetPreview, { WRAPPER_COLORS, RIBBON_COLORS } from '../components/BouquetPreview';
import CardPreview from '../components/CardPreview';
import ShareActions from '../components/ShareActions';

const SUGGESTIONS = [
  "Every moment with you feels like a garden in full bloom. You are my sunshine, my favorite hello, and my hardest goodbye. 🌹",
  "To the friend who always knows how to make me smile — thank you for being my person through every season of life. 💛",
  "Congratulations on this beautiful milestone! May your path ahead be filled with joy, laughter, and endless possibilities. 🎉",
  "No special reason, no occasion — just wanted to remind you that you're thought of, appreciated, and so deeply loved. 🌸",
  "Miles apart but never far in heart. Sending this bouquet across the distance to let you know I'm thinking of you always. 💜",
];

const ARRANGEMENT_OPTIONS = [
  { id: 'round', name: 'Round', icon: '🔵', desc: 'Classic dome shape' },
  { id: 'cascade', name: 'Cascade', icon: '🌊', desc: 'Flowing waterfall' },
  { id: 'heart', name: 'Heart', icon: '💗', desc: 'Heart shaped' },
  { id: 'crescent', name: 'Crescent', icon: '🌙', desc: 'Elegant arc' },
];

export default function Builder() {
  const [step, setStep] = useState(1);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [arrangement, setArrangement] = useState('round');
  const [wrapperColor, setWrapperColor] = useState('cream');
  const [ribbonColor, setRibbonColor] = useState('rose');
  const [theme, setTheme] = useState('blush');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [message, setMessage] = useState('');
  const [shareUrl, setShareUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const flowerCounts = {};
  selectedFlowers.forEach((id) => {
    flowerCounts[id] = (flowerCounts[id] || 0) + 1;
  });

  const addFlower = (id) => {
    if (selectedFlowers.length >= 12) return;
    setSelectedFlowers([...selectedFlowers, id]);
  };

  const removeFlower = (index) => {
    setSelectedFlowers(selectedFlowers.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bouquets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowers: selectedFlowers,
          arrangement,
          wrapperColor,
          ribbonColor,
          theme,
          toName: toName.trim(),
          fromName: fromName.trim(),
          message: message.trim(),
        }),
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned an invalid response. Is the backend running?');
      }
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setShareUrl(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setSelectedFlowers([]);
    setArrangement('round');
    setWrapperColor('cream');
    setRibbonColor('rose');
    setTheme('blush');
    setToName('');
    setFromName('');
    setMessage('');
    setShareUrl(null);
    setError('');
  };

  const canNext = () => {
    if (step === 1) return selectedFlowers.length > 0;
    if (step === 2) return selectedFlowers.length > 0;
    if (step === 3) return toName.trim() && fromName.trim() && message.trim();
    return true;
  };

  const uniqueMeanings = [...new Set(selectedFlowers)]
    .map((id) => FLOWERS.find((f) => f.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="text-center pt-8 pb-2 px-4">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-tight">
          BloomGram
        </h1>
        <p className="font-body text-muted text-sm mt-1 font-light italic">
          craft a digital bouquet for someone special
        </p>
        <div className="w-12 h-[1px] bg-rose/30 mx-auto mt-3" />
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-16 mt-4">
        <StepIndicator current={step} />

        {/* ── Step 1: Pick Flowers ── */}
        {step === 1 && (
          <div className="step-enter">
            <h2 className="font-display text-xl text-center text-primary mb-1">
              Choose Your Flowers
            </h2>
            <p className="text-center text-muted text-sm font-body mb-6">
              Tap to add &middot; <span className="font-semibold text-rose">{selectedFlowers.length}</span>/12 selected
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {FLOWERS.map((flower) => (
                <FlowerCard
                  key={flower.id}
                  flower={flower}
                  count={flowerCounts[flower.id] || 0}
                  onAdd={() => addFlower(flower.id)}
                />
              ))}
            </div>

            {/* Selection pills */}
            {selectedFlowers.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-body text-muted text-center mb-2">Your selection:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedFlowers.map((id, i) => {
                    const f = FLOWERS.find((fl) => fl.id === id);
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 bg-white border rounded-full px-3 py-1 text-sm font-body animate-pop-in shadow-sm"
                        style={{ borderColor: f?.color + '40' }}
                      >
                        {f?.emoji} {f?.name}
                        <button
                          onClick={() => removeFlower(i)}
                          className="ml-1 text-muted hover:text-rose transition-colors text-base leading-none"
                        >
                          &times;
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Arrange ── */}
        {step === 2 && (
          <div className="step-enter">
            <h2 className="font-display text-xl text-center text-primary mb-1">
              Arrange Your Bouquet
            </h2>
            <p className="text-center text-muted text-sm font-body mb-6">
              Choose a style, wrapper & ribbon &middot; click a flower to remove
            </p>

            {/* Live preview */}
            <div className="bg-white rounded-3xl border border-[rgba(180,140,100,0.12)] p-6 shadow-sm mb-6">
              <BouquetPreview
                selectedFlowers={selectedFlowers}
                onRemove={removeFlower}
                arrangement={arrangement}
                wrapperColor={wrapperColor}
                ribbonColor={ribbonColor}
              />
            </div>

            {/* Arrangement style */}
            <div className="mb-5">
              <label className="block text-xs font-body text-muted mb-2 uppercase tracking-wider">
                Arrangement Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ARRANGEMENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setArrangement(opt.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-200 ${
                      arrangement === opt.id
                        ? 'border-rose bg-rose/5 shadow-sm scale-[1.03]'
                        : 'border-[rgba(180,140,100,0.12)] bg-white hover:border-rose/30'
                    }`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    <span className="text-xs font-body font-semibold text-primary">{opt.name}</span>
                    <span className="text-[10px] text-muted">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wrapper color */}
            <div className="mb-5">
              <label className="block text-xs font-body text-muted mb-2 uppercase tracking-wider">
                Wrapper
              </label>
              <div className="flex gap-2 flex-wrap">
                {WRAPPER_COLORS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWrapperColor(w.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                      wrapperColor === w.id
                        ? 'border-rose ring-2 ring-rose/20 scale-[1.03]'
                        : 'border-[rgba(180,140,100,0.15)] hover:border-rose/30'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ background: w.bg, borderColor: w.border }}
                    />
                    <span className="text-xs font-body text-primary">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ribbon color */}
            <div className="mb-5">
              <label className="block text-xs font-body text-muted mb-2 uppercase tracking-wider">
                Ribbon
              </label>
              <div className="flex gap-2 flex-wrap">
                {RIBBON_COLORS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRibbonColor(r.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                      ribbonColor === r.id
                        ? 'border-rose ring-2 ring-rose/20 scale-[1.03]'
                        : 'border-[rgba(180,140,100,0.15)] hover:border-rose/30'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full shadow-inner"
                      style={{ backgroundColor: r.color }}
                    />
                    <span className="text-xs font-body text-primary">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Meanings */}
            {uniqueMeanings.length > 0 && (
              <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-[rgba(180,140,100,0.1)]">
                <p className="font-display text-sm text-primary text-center mb-2">Your bouquet says...</p>
                <div className="space-y-1">
                  {uniqueMeanings.map((f) => (
                    <p key={f.id} className="text-xs text-muted font-body text-center">
                      {f.emoji} <span className="font-semibold">{f.name}</span> — <em>{f.meaning}</em>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 3: Write Card ── */}
        {step === 3 && (
          <div className="step-enter">
            <h2 className="font-display text-xl text-center text-primary mb-6">
              Write Your Card
            </h2>

            {/* Theme picker */}
            <label className="block text-xs font-body text-muted mb-2 uppercase tracking-wider">
              Card Theme
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                    theme === t.id
                      ? 'border-rose bg-rose/5 shadow-sm scale-105'
                      : 'border-[rgba(180,140,100,0.12)] bg-white hover:border-rose/30'
                  }`}
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-[11px] font-body font-medium text-primary">{t.name}</span>
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-body text-muted mb-1.5">To</label>
                <input
                  type="text"
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="Recipient's name"
                  maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(180,140,100,0.2)] bg-white font-body text-sm text-primary placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose/30 transition-shadow"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-muted mb-1.5">From</label>
                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  placeholder="Your name"
                  maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(180,140,100,0.2)] bg-white font-body text-sm text-primary placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose/30 transition-shadow"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-body text-muted mb-1.5">
                Message
                <span className={`float-right ${message.length > 360 ? 'text-rose font-semibold' : ''}`}>
                  {message.length}/400
                </span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 400))}
                placeholder="Write something from the heart..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(180,140,100,0.2)] bg-white font-body text-sm text-primary placeholder:text-muted/40 resize-none focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose/30 transition-shadow"
              />
            </div>

            {/* Suggestions */}
            <div className="mb-8">
              <p className="text-xs font-body text-muted mb-2">Need inspiration?</p>
              <div className="flex flex-wrap gap-2">
                {['💕 Love', '👯 Friendship', '🎉 Celebrate', '🌸 Just because', '✈️ Long distance'].map(
                  (label, i) => (
                    <button
                      key={i}
                      onClick={() => setMessage(SUGGESTIONS[i])}
                      className="px-3 py-1.5 text-xs font-body bg-white border border-[rgba(180,140,100,0.12)] rounded-full text-muted hover:border-rose/40 hover:text-rose hover:bg-rose/5 transition-all duration-200"
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Live preview */}
            <p className="text-xs font-body text-muted text-center mb-3 uppercase tracking-wider">Preview</p>
            <CardPreview
              theme={theme}
              toName={toName}
              fromName={fromName}
              message={message}
            />
          </div>
        )}

        {/* ── Step 4: Share ── */}
        {step === 4 && (
          <div className="step-enter">
            <h2 className="font-display text-xl text-center text-primary mb-2">
              {shareUrl ? 'Your BloomGram is Ready!' : 'Preview & Share'}
            </h2>
            {!shareUrl && (
              <p className="text-center text-muted text-sm font-body mb-6">
                Here's what your recipient will see
              </p>
            )}

            <div className="bg-white rounded-3xl border border-[rgba(180,140,100,0.12)] p-6 shadow-sm mb-6">
              <BouquetPreview
                selectedFlowers={selectedFlowers}
                onRemove={null}
                arrangement={arrangement}
                wrapperColor={wrapperColor}
                ribbonColor={ribbonColor}
              />
            </div>

            <CardPreview
              theme={theme}
              toName={toName}
              fromName={fromName}
              message={message}
            />

            {!shareUrl ? (
              <div className="mt-8 text-center">
                {error && (
                  <p className="text-red-500 text-sm font-body mb-3">{error}</p>
                )}
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="px-10 py-3.5 bg-rose text-white font-body font-bold rounded-2xl text-base hover:bg-rose/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose/25 hover:shadow-xl hover:shadow-rose/30 active:scale-[0.98]"
                >
                  {loading ? 'Creating...' : 'Create & Share'}
                </button>
              </div>
            ) : (
              <div className="mt-6 animate-fade-slide-up">
                <ShareActions url={shareUrl} />
                <div className="text-center mt-8">
                  <button
                    onClick={resetWizard}
                    className="font-body text-sm text-muted hover:text-rose transition-colors underline underline-offset-4 decoration-muted/30 hover:decoration-rose/50"
                  >
                    Make another bouquet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {step > 1 && !shareUrl ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2.5 font-body text-sm text-muted border border-[rgba(180,140,100,0.2)] rounded-xl hover:border-rose/30 hover:text-rose transition-all duration-200 active:scale-[0.97]"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 4 && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="px-7 py-2.5 bg-rose text-white font-body font-bold text-sm rounded-xl hover:bg-rose/90 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-rose/15 active:scale-[0.97]"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
