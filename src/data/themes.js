import VintageCard from '../components/cards/VintageCard';
import BlushCard from '../components/cards/BlushCard';
import BotanicalCard from '../components/cards/BotanicalCard';
import ElegantCard from '../components/cards/ElegantCard';
import MidnightCard from '../components/cards/MidnightCard';
import SunriseCard from '../components/cards/SunriseCard';

const THEMES = [
  { id: 'vintage',   name: 'Vintage',    icon: '🕰️', Component: VintageCard },
  { id: 'blush',     name: 'Blush',      icon: '🌸', Component: BlushCard },
  { id: 'botanical', name: 'Botanical',  icon: '🌿', Component: BotanicalCard },
  { id: 'elegant',   name: 'Elegant',    icon: '🌙', Component: ElegantCard },
  { id: 'midnight',  name: 'Midnight',   icon: '✨', Component: MidnightCard },
  { id: 'sunrise',   name: 'Sunrise',    icon: '🌅', Component: SunriseCard },
];

export default THEMES;
