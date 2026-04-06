export default function MidnightCard({ toName, fromName, message, mini = false }) {
  const scale = mini ? 0.55 : 1;
  // Deterministic stars
  const stars = [
    [15,12],[82,18],[45,8],[68,22],[28,25],[90,10],[55,30],[12,35],
    [75,5],[38,20],[60,15],[8,20],[92,28],[50,35],[20,5],[70,32],
  ];
  // Constellation lines
  const lines = [[0,1],[2,4],[3,6],[7,5]];

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        background: '#0f172a',
        borderRadius: 12 * scale,
        padding: mini ? '12px 10px' : '32px 28px',
        boxShadow: '0 4px 24px rgba(10,10,30,0.4)',
        maxWidth: mini ? 140 : 380,
        width: '100%',
        margin: mini ? 0 : '0 auto',
      }}
    >
      {/* Stars */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 0.6 : 0.35} fill="white" opacity={0.3 + (i % 4) * 0.15} />
        ))}
        {lines.map(([a, b], i) => (
          <line key={`l${i}`} x1={stars[a][0]} y1={stars[a][1]} x2={stars[b][0]} y2={stars[b][1]} stroke="#e2d9f3" strokeWidth="0.15" opacity="0.2" />
        ))}
      </svg>

      <div className="relative z-10" style={{ padding: mini ? '2px' : '8px 4px' }}>
        <p
          className="font-display text-center"
          style={{
            color: '#e2d9f3',
            fontSize: mini ? 9 : 16,
            fontStyle: 'italic',
            marginBottom: mini ? 4 : 14,
          }}
        >
          To {toName || '...'}
        </p>

        <p
          className="font-body text-center whitespace-pre-wrap"
          style={{
            color: '#c8bfe0',
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
            color: '#d090f8',
            fontSize: mini ? 8 : 13,
            marginTop: mini ? 4 : 16,
          }}
        >
          Under the same stars, {fromName || '...'}
        </p>
      </div>
    </div>
  );
}
