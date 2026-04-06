import THEMES from '../data/themes';

export default function CardPreview({ theme, toName, fromName, message, mini = false }) {
  const t = THEMES.find(th => th.id === theme) || THEMES[0];
  const Card = t.Component;
  return <Card toName={toName} fromName={fromName} message={message} mini={mini} />;
}
