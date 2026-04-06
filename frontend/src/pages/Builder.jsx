import { useState, useCallback } from 'react';
import THEMES from '../data/themes';
import StepIndicator from '../components/StepIndicator';
import FlowerPicker from '../components/FlowerPicker';
import BouquetCanvas from '../components/BouquetCanvas';
import CardPreview from '../components/CardPreview';

const SUGGESTIONS = [
  "You make every day feel like spring 🌸",
  "Thinking of you — always 💕",
  "Celebrating you today and every day 🎉",
  "Just because you deserve flowers 🌹",
  "Missing you across the miles 💐",
];

export default function Builder() {
  const [step, setStep] = useState(1);
  const [flowers, setFlowers] = useState([]);
  const [greenery, setGreenery] = useState([]);
  const [theme, setTheme] = useState('vintage');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [message, setMessage] = useState('');
  const [shareUrl, setShareUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addFlower = useCallback((id) => {
    if (flowers.length >= 12) return;
    setFlowers([...flowers, id]);
  }, [flowers]);

  const removeFlower = useCallback((index) => {
    setFlowers(flowers.filter((_, i) => i !== index));
  }, [flowers]);

  const toggleGreenery = useCallback((id) => {
    setGreenery(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : prev.length >= 3 ? prev : [...prev, id]
    );
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bouquets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flowers, greenery, flowerPositions: [], theme, toName: toName.trim(), fromName: fromName.trim(), message: message.trim() }),
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('Backend not responding. Is it running?'); }
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setShareUrl(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setFlowers([]); setGreenery([]);
    setTheme('vintage'); setToName(''); setFromName(''); setMessage('');
    setShareUrl(null); setError('');
  };

  const canNext = () => {
    if (step === 1) return flowers.length > 0;
    if (step === 2) return flowers.length > 0;
    if (step === 3) return toName.trim() && fromName.trim() && message.trim();
    return true;
  };

  const fullUrl = shareUrl ? `${window.location.origin}${shareUrl}` : '';
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="text-center pt-8 pb-2 px-4">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-tight">BloomGram</h1>
        <p className="font-body text-muted text-sm mt-1 font-light italic">craft a digital bouquet for someone special</p>
        <div className="w-12 h-[1px] bg-rose/30 mx-auto mt-3" />
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-16 mt-4">
        <StepIndicator current={step} />

        {/* ── Step 1 ── */}
        {step === 1 && (
          <FlowerPicker
            selectedFlowers={flowers}
            selectedGreenery={greenery}
            onAddFlower={addFlower}
            onRemoveFlower={removeFlower}
            onToggleGreenery={toggleGreenery}
          />
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div className="step-enter">
            <h2 className="font-display text-xl text-center text-primary mb-1">Arrange Your Bouquet</h2>
            <p className="text-center text-muted text-sm font-body mb-4">Drag flowers to reposition them</p>
            <div className="bg-white rounded-3xl border border-[rgba(180,140,100,0.1)] p-4 shadow-sm">
              <BouquetCanvas
                flowers={flowers}
                greenery={greenery}
              />
            </div>
          </div>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && (
          <div className="step-enter">
            <h2 className="font-display text-xl text-center text-primary mb-5">Write Your Card</h2>

            <label className="block text-xs font-body text-muted mb-2 uppercase tracking-wider">Card Theme</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                    theme === t.id ? 'border-rose ring-2 ring-rose/20 scale-[1.04]' : 'border-[rgba(180,140,100,0.1)] hover:border-rose/30'
                  }`}
                >
                  <div className="p-1">
                    <CardPreview theme={t.id} toName="Name" fromName="You" message="Your message here..." mini={true} />
                  </div>
                  <div className="text-[10px] font-body text-primary text-center py-1 bg-cream/50">{t.icon} {t.name}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-body text-muted mb-1.5">To</label>
                <input type="text" value={toName} onChange={e => setToName(e.target.value)} placeholder="Recipient's name" maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(180,140,100,0.15)] bg-white font-body text-sm text-primary placeholder:text-muted/30 focus:outline-none focus:ring-2 focus:ring-rose/30" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted mb-1.5">From</label>
                <input type="text" value={fromName} onChange={e => setFromName(e.target.value)} placeholder="Your name" maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(180,140,100,0.15)] bg-white font-body text-sm text-primary placeholder:text-muted/30 focus:outline-none focus:ring-2 focus:ring-rose/30" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-body text-muted mb-1.5">
                Message <span className={`float-right ${message.length > 360 ? 'text-rose font-semibold' : ''}`}>{message.length}/400</span>
              </label>
              <textarea value={message} onChange={e => setMessage(e.target.value.slice(0, 400))} placeholder="Write something from the heart..." rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(180,140,100,0.15)] bg-white font-body text-sm text-primary placeholder:text-muted/30 resize-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
            </div>

            <div className="mb-7">
              <p className="text-xs font-body text-muted mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => setMessage(s)}
                    className="px-3 py-1.5 text-[11px] font-body bg-white border border-[rgba(180,140,100,0.1)] rounded-full text-muted hover:border-rose/30 hover:text-rose transition-colors">
                    {s.slice(0, 30)}...
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted font-body text-center mb-3 uppercase tracking-wider">Live Preview</p>
            <CardPreview theme={theme} toName={toName} fromName={fromName} message={message} />
          </div>
        )}

        {/* ── Step 4 ── */}
        {step === 4 && (
          <div className="step-enter">
            <h2 className="font-display text-xl text-center text-primary mb-1">
              {shareUrl ? 'Your BloomGram is Ready!' : 'Preview & Share'}
            </h2>
            {!shareUrl && <p className="text-center text-muted text-sm font-body mb-4">Here's what they'll see</p>}

            <div className="bg-white rounded-3xl border border-[rgba(180,140,100,0.1)] p-4 shadow-sm mb-5">
              <BouquetCanvas flowers={flowers} greenery={greenery} />
            </div>
            <CardPreview theme={theme} toName={toName} fromName={fromName} message={message} />

            {!shareUrl ? (
              <div className="mt-8 text-center">
                {error && <p className="text-red-500 text-sm font-body mb-3">{error}</p>}
                <button onClick={handleCreate} disabled={loading}
                  className="px-10 py-3.5 bg-rose text-white font-body font-bold rounded-2xl hover:bg-rose/90 transition-all disabled:opacity-50 shadow-lg shadow-rose/25 active:scale-[0.98]">
                  {loading ? 'Creating...' : 'Create & Share'}
                </button>
              </div>
            ) : (
              <div className="mt-6 animate-fade-slide-up">
                {/* Link display */}
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[rgba(180,140,100,0.15)] max-w-md mx-auto">
                  <span className="text-sm font-body text-muted truncate flex-1">{fullUrl}</span>
                  <button onClick={copyLink} className="shrink-0 px-4 py-1.5 bg-rose text-white text-sm font-body font-bold rounded-lg hover:bg-rose/90 transition-colors">
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="flex gap-3 justify-center mt-4">
                  <a href={`https://wa.me/?text=${encodeURIComponent(`I made you a digital bouquet! 💐\n${fullUrl}`)}`} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#25D366] text-white text-sm font-body font-bold rounded-xl hover:opacity-90 transition-opacity">WhatsApp</a>
                  <a href={`mailto:?subject=${encodeURIComponent('A BloomGram for you! 💐')}&body=${encodeURIComponent(`I made you a digital bouquet!\n${fullUrl}`)}`}
                    className="px-5 py-2.5 bg-primary text-cream text-sm font-body font-bold rounded-xl hover:opacity-90 transition-opacity">Email</a>
                </div>
                <div className="text-center mt-6">
                  <button onClick={reset} className="font-body text-sm text-muted hover:text-rose transition-colors underline underline-offset-4 decoration-muted/30">Make another bouquet</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        <div className="flex justify-between mt-10">
          {step > 1 && !shareUrl ? (
            <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 font-body text-sm text-muted border border-[rgba(180,140,100,0.15)] rounded-xl hover:border-rose/30 hover:text-rose transition-colors">Back</button>
          ) : <div />}
          {step < 4 && (
            <button onClick={() => setStep(step + 1)} disabled={!canNext()}
              className="px-7 py-2.5 bg-rose text-white font-body font-bold text-sm rounded-xl hover:bg-rose/90 transition-all disabled:opacity-30 shadow-md shadow-rose/15 active:scale-[0.97]">Next</button>
          )}
        </div>
      </div>
    </div>
  );
}
