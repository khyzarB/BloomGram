import Rose from '../components/flowers/Rose';
import Peony from '../components/flowers/Peony';
import Tulip from '../components/flowers/Tulip';
import Daisy from '../components/flowers/Daisy';
import Sunflower from '../components/flowers/Sunflower';
import Lily from '../components/flowers/Lily';
import Lotus from '../components/flowers/Lotus';
import Orchid from '../components/flowers/Orchid';
import Lavender from '../components/flowers/Lavender';
import CherryBlossom from '../components/flowers/CherryBlossom';

const FLOWERS = [
  { id: 'rose',      name: 'Rose',           meaning: 'Deep love & passion',        color: '#c9446a', Component: Rose },
  { id: 'peony',     name: 'Peony',          meaning: 'Romance & prosperity',       color: '#f4b8c8', Component: Peony },
  { id: 'tulip',     name: 'Tulip',          meaning: 'Perfect, deep love',         color: '#f97448', Component: Tulip },
  { id: 'daisy',     name: 'Daisy',          meaning: 'Innocence & new beginnings', color: '#fbbf24', Component: Daisy },
  { id: 'sunflower', name: 'Sunflower',      meaning: 'Adoration & loyalty',        color: '#f59e0b', Component: Sunflower },
  { id: 'lily',      name: 'Lily',           meaning: 'Elegance & devotion',        color: '#c084fc', Component: Lily },
  { id: 'lotus',     name: 'Lotus',          meaning: 'Resilience & rebirth',       color: '#f472b6', Component: Lotus },
  { id: 'orchid',    name: 'Orchid',         meaning: 'Luxury & rare beauty',       color: '#8b5cf6', Component: Orchid },
  { id: 'lavender',  name: 'Lavender',       meaning: 'Serenity & grace',           color: '#8b5cf6', Component: Lavender },
  { id: 'cherry',    name: 'Cherry Blossom', meaning: 'Beauty & renewal',           color: '#f9a8d4', Component: CherryBlossom },
];

export default FLOWERS;
