export default function BlushCard({ toName, fromName, message, mini = false }) {
  const scale = mini ? 0.55 : 1;
  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        background: 'white',
        borderRadius: 12 * scale,
        border: `${mini ? 1 : 2}px solid #d4a853`,
        padding: mini ? '12px 10px' : '32px 28px',
        boxShadow: '0 4px 20px rgba(180,140,80,0.12)',
        maxWidth: mini ? 140 : 380,
        width: '100%',
        margin: mini ? 0 : '0 auto',
      }}
    >
      {/* Watercolor pink wash — top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -20, left: -20,
          width: mini ? 60 : 140, height: mini ? 60 : 140,
          background: 'radial-gradient(circle, rgba(244,180,200,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Watercolor pink wash — bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -20, right: -20,
          width: mini ? 50 : 120, height: mini ? 50 : 120,
          background: 'radial-gradient(circle, rgba(244,180,200,0.25) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Corner flower doodles */}
      {!mini && (
        <svg className="absolute top-3 left-3 opacity-20" width="30" height="30" viewBox="0 0 30 30">
          <circle cx="15" cy="8" r="4" fill="#e8637a" />
          <circle cx="8" cy="15" r="4" fill="#e8637a" />
          <circle cx="22" cy="15" r="4" fill="#e8637a" />
          <circle cx="15" cy="22" r="4" fill="#e8637a" />
          <circle cx="15" cy="15" r="3" fill="#fbbf24" />
        </svg>
      )}

      <div className="relative z-10" style={{ padding: mini ? '2px' : '8px 4px' }}>
        <p
          className="font-display text-center"
          style={{
            color: '#c9446a',
            fontSize: mini ? 9 : 17,
            fontStyle: 'italic',
            marginBottom: mini ? 4 : 14,
          }}
        >
          For {toName || '...'}
        </p>

        <p
          className="font-body text-center whitespace-pre-wrap"
          style={{
            color: '#3d2b1f',
            fontSize: mini ? 7 : 14,
            lineHeight: mini ? 1.3 : 1.7,
            fontWeight: 300,
            minHeight: mini ? 20 : 60,
          }}
        >
          {message || (mini ? 'Message...' : 'Your message will appear here...')}
        </p>

        <p
          className="font-display text-center"
          style={{
            color: '#c9446a',
            fontSize: mini ? 8 : 13,
            marginTop: mini ? 4 : 16,
          }}
        >
          — {fromName || '...'}
        </p>
      </div>
    </div>
  );
}
