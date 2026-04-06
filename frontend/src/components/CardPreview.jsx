import THEMES from '../data/themes';

export default function CardPreview({ theme, toName, fromName, message }) {
  const t = THEMES.find((th) => th.id === theme) || THEMES[0];

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl max-w-sm mx-auto"
      style={{ border: t.border }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 text-center relative overflow-hidden"
        style={{ background: t.headerBg }}
      >
        {/* Decorative corner elements */}
        <span className="absolute top-2 left-3 text-sm opacity-20">✿</span>
        <span className="absolute top-2 right-3 text-sm opacity-20">✿</span>
        <p
          className="font-display text-lg font-semibold tracking-wide"
          style={{ color: t.headerText }}
        >
          Dear {toName || '...'}
        </p>
        <div
          className="mx-auto mt-2 w-16 h-[1px] opacity-30"
          style={{ backgroundColor: t.accent }}
        />
      </div>

      {/* Body */}
      <div className="px-6 py-6 relative" style={{ backgroundColor: t.bodyBg }}>
        {/* Opening quote mark */}
        <span
          className="absolute top-3 left-4 text-3xl font-display opacity-10 leading-none"
          style={{ color: t.accent }}
        >
          &ldquo;
        </span>

        <p
          className="font-display text-sm leading-relaxed whitespace-pre-wrap min-h-[60px] px-2"
          style={{
            color: t.bodyText,
            fontStyle: t.fontStyle,
          }}
        >
          {message || 'Your message will appear here...'}
        </p>

        <div className="mt-6 pt-4 text-right" style={{ borderTop: `1px solid ${t.accent}20` }}>
          <p
            className="font-display text-xs tracking-widest uppercase opacity-70"
            style={{ color: t.accent }}
          >
            With love
          </p>
          <p
            className="font-display font-bold text-lg mt-1"
            style={{ color: t.headerText }}
          >
            {fromName || '...'}
          </p>
        </div>
      </div>
    </div>
  );
}
