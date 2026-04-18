export default function VintageCard({ toName, fromName, message, mini = false }) {
  const scale = mini ? 0.55 : 1;
  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        background: '#f5e6c8',
        borderRadius: 12 * scale,
        padding: mini ? '12px 10px' : '32px 28px',
        transform: mini ? 'none' : 'rotate(-1.5deg)',
        boxShadow: '0 4px 20px rgba(80,50,20,0.15), inset 0 0 60px rgba(120,80,30,0.06)',
        maxWidth: mini ? 140 : 380,
        width: '100%',
        margin: mini ? 0 : '0 auto',
      }}
    >
      {/* SVG paper grain texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-v"><feTurbulence baseFrequency="0.9" numOctaves="4" type="fractalNoise" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#grain-v)" />
      </svg>

      {/* Dashed inner border */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: mini ? 6 : 14,
          left: mini ? 6 : 14,
          right: mini ? 6 : 14,
          bottom: mini ? 6 : 14,
          border: `${mini ? 1 : 1.5}px dashed #4a7c6f`,
          borderRadius: 6 * scale,
          opacity: 0.5,
        }}
      />

      {/* Corner brackets */}
      {!mini && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 380 300">
          <path d="M28 28 L28 42 M28 28 L42 28" stroke="#4a7c6f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M352 28 L352 42 M352 28 L338 28" stroke="#4a7c6f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M28 272 L28 258 M28 272 L42 272" stroke="#4a7c6f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M352 272 L352 258 M352 272 L338 272" stroke="#4a7c6f" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {/* Content */}
      <div className="relative z-10" style={{ padding: mini ? '4px 2px' : '16px 12px' }}>
        <p
          className="font-display text-center"
          style={{
            color: '#4a7c6f',
            fontSize: mini ? 9 : 16,
            fontStyle: 'italic',
            marginBottom: mini ? 4 : 16,
          }}
        >
          To: {toName || '...'}
        </p>

        {!mini && <div className="w-12 h-px bg-[#4a7c6f] mx-auto mb-4 opacity-30" />}

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

        {!mini && <div className="w-12 h-px bg-[#4a7c6f] mx-auto mt-4 mb-3 opacity-30" />}

        <p
          className="font-display text-center"
          style={{
            color: '#4a7c6f',
            fontSize: mini ? 8 : 14,
            fontStyle: 'italic',
            marginTop: mini ? 4 : 0,
          }}
        >
          With love, {fromName || '...'}
        </p>
      </div>
    </div>
  );
}
