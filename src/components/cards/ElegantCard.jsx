export default function ElegantCard({ toName, fromName, message, mini = false }) {
  const scale = mini ? 0.55 : 1;
  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        background: '#0f0f0f',
        borderRadius: 12 * scale,
        padding: mini ? '12px 10px' : '32px 28px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        maxWidth: mini ? 140 : 380,
        width: '100%',
        margin: mini ? 0 : '0 auto',
      }}
    >
      {/* Gold top rule */}
      <div
        className="mx-auto"
        style={{
          width: mini ? '60%' : '70%',
          height: mini ? 0.5 : 1,
          background: 'linear-gradient(90deg, transparent, #d4a853, transparent)',
          marginBottom: mini ? 8 : 20,
        }}
      />

      <div className="relative z-10" style={{ padding: mini ? '2px' : '8px 4px' }}>
        <p
          className="font-display text-center"
          style={{
            color: '#f0e6d2',
            fontSize: mini ? 9 : 16,
            letterSpacing: '0.1em',
            marginBottom: mini ? 4 : 14,
          }}
        >
          {toName || '...'}
        </p>

        <p
          className="font-body text-center whitespace-pre-wrap"
          style={{
            color: '#d0c4b0',
            fontSize: mini ? 7 : 14,
            lineHeight: mini ? 1.3 : 1.8,
            fontWeight: 300,
            minHeight: mini ? 20 : 60,
          }}
        >
          {message || (mini ? 'Message...' : 'Your message will appear here...')}
        </p>

        <p
          className="font-display text-center"
          style={{
            color: '#d4a853',
            fontSize: mini ? 8 : 13,
            marginTop: mini ? 4 : 16,
            letterSpacing: '0.08em',
          }}
        >
          — {fromName || '...'}
        </p>
      </div>

      {/* Gold bottom rule */}
      <div
        className="mx-auto"
        style={{
          width: mini ? '60%' : '70%',
          height: mini ? 0.5 : 1,
          background: 'linear-gradient(90deg, transparent, #d4a853, transparent)',
          marginTop: mini ? 8 : 20,
        }}
      />
    </div>
  );
}
