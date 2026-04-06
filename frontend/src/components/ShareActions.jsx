import { useState } from 'react';

export default function ShareActions({ url }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `${window.location.origin}${url}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `I made you a digital bouquet! 💐\n${fullUrl}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent('A BloomGram for you! 💐')}&body=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Link display */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[rgba(180,140,100,0.2)] w-full max-w-md">
        <span className="text-sm font-body text-muted truncate flex-1">{fullUrl}</span>
        <button
          onClick={handleCopy}
          className="shrink-0 px-4 py-1.5 bg-rose text-white text-sm font-body font-bold rounded-lg hover:bg-rose/90 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Share buttons */}
      <div className="flex gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-body font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          WhatsApp
        </a>
        <a
          href={emailUrl}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-cream text-sm font-body font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Email
        </a>
      </div>
    </div>
  );
}
