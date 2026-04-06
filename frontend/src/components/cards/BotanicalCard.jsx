export default function BotanicalCard({ toName, fromName, message, mini = false }) {
  const scale = mini ? 0.55 : 1;
  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        background: '#fcfcfa',
        borderRadius: 12 * scale,
        border: `${mini ? 1 : 2}px solid #2d6a3e`,
        padding: mini ? '12px 10px' : '32px 28px',
        boxShadow: '0 4px 20px rgba(40,80,40,0.1)',
        maxWidth: mini ? 140 : 380,
        width: '100%',
        margin: mini ? 0 : '0 auto',
      }}
    >
      {/* Botanical border — SVG leaf decoration */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 380 300">
        {/* Top border leaves */}
        {[40,80,120,160,200,240,280,320].map((x, i) => (
          <g key={`t${i}`} transform={`translate(${x},12) rotate(${i % 2 ? 15 : -15})`}>
            <ellipse rx="8" ry="4" fill="#1a4731" />
          </g>
        ))}
        {/* Bottom border leaves */}
        {[40,80,120,160,200,240,280,320].map((x, i) => (
          <g key={`b${i}`} transform={`translate(${x},288) rotate(${i % 2 ? -15 : 15})`}>
            <ellipse rx="8" ry="4" fill="#1a4731" />
          </g>
        ))}
        {/* Side leaves */}
        {[40,80,120,160,200,240].map((y, i) => (
          <g key={`l${i}`}>
            <g transform={`translate(12,${y}) rotate(${45 + (i % 2) * 30})`}>
              <ellipse rx="8" ry="3.5" fill="#1a4731" />
            </g>
            <g transform={`translate(368,${y}) rotate(${-45 - (i % 2) * 30})`}>
              <ellipse rx="8" ry="3.5" fill="#1a4731" />
            </g>
          </g>
        ))}
      </svg>

      <div className="relative z-10" style={{ padding: mini ? '2px' : '8px 4px' }}>
        <p
          className="font-display text-center"
          style={{
            color: '#1a4731',
            fontSize: mini ? 9 : 16,
            fontWeight: 600,
            marginBottom: mini ? 4 : 14,
            letterSpacing: '0.05em',
          }}
        >
          Dear {toName || '...'}
        </p>

        {!mini && <div className="w-16 h-px mx-auto mb-4" style={{ background: '#2d6a3e', opacity: 0.3 }} />}

        <p
          className="font-body text-center whitespace-pre-wrap"
          style={{
            color: '#1a4731',
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
            color: '#2d6a3e',
            fontSize: mini ? 8 : 13,
            marginTop: mini ? 4 : 16,
            fontStyle: 'italic',
          }}
        >
          Warmly, {fromName || '...'}
        </p>
      </div>
    </div>
  );
}
