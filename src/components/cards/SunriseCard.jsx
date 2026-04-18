export default function SunriseCard({ toName, fromName, message, mini = false }) {
  const scale = mini ? 0.55 : 1;
  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #fff3e0 0%, #ffe8cc 100%)',
        borderRadius: 12 * scale,
        border: `${mini ? 1 : 1.5}px solid #e8a060`,
        padding: mini ? '12px 10px' : '32px 28px',
        boxShadow: '0 4px 20px rgba(180,100,40,0.12)',
        maxWidth: mini ? 140 : 380,
        width: '100%',
        margin: mini ? 0 : '0 auto',
      }}
    >
      {/* Sun illustration at top */}
      {!mini && (
        <svg className="mx-auto mb-3 opacity-30" width="60" height="35" viewBox="0 0 60 35">
          {/* Rays */}
          {[0, 30, 60, 90, 120, 150, 180].map((a, i) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={30 + Math.cos(rad) * 12} y1={30 - Math.sin(rad) * 12}
                x2={30 + Math.cos(rad) * 20} y2={30 - Math.sin(rad) * 20}
                stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round"
              />
            );
          })}
          {/* Semicircle sun */}
          <path d="M14 30 A16 16 0 0 1 46 30" fill="#f59e0b" />
          <path d="M18 30 A12 12 0 0 1 42 30" fill="#fbbf24" />
        </svg>
      )}

      <div className="relative z-10" style={{ padding: mini ? '2px' : '4px' }}>
        <p
          className="font-display text-center"
          style={{
            color: '#9a3412',
            fontSize: mini ? 9 : 16,
            marginBottom: mini ? 4 : 14,
          }}
        >
          Good morning, {toName || '...'}
        </p>

        <p
          className="font-body text-center whitespace-pre-wrap"
          style={{
            color: '#3a1800',
            fontSize: mini ? 7 : 14,
            lineHeight: mini ? 1.3 : 1.7,
            fontWeight: 300,
            minHeight: mini ? 20 : 60,
          }}
        >
          {message || (mini ? 'Message...' : 'Your message will appear here...')}
        </p>

        {!mini && (
          <div className="w-12 h-px mx-auto mt-4 mb-3" style={{ background: '#c2410c', opacity: 0.25 }} />
        )}

        <p
          className="font-display text-center"
          style={{
            color: '#c2410c',
            fontSize: mini ? 8 : 13,
            marginTop: mini ? 4 : 0,
            fontStyle: 'italic',
          }}
        >
          Sunshine always, {fromName || '...'}
        </p>
      </div>
    </div>
  );
}
