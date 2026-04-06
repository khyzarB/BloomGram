import Fern from '../components/greenery/Fern';
import Eucalyptus from '../components/greenery/Eucalyptus';
import IvyTrail from '../components/greenery/IvyTrail';
import BabyBreath from '../components/greenery/BabyBreath';
import LeafSpray from '../components/greenery/LeafSpray';

const GREENERY = [
  { id: 'fern',       name: 'Fern',         desc: 'Lush arching fronds',   Component: Fern },
  { id: 'eucalyptus', name: 'Eucalyptus',   desc: 'Silver-green rounds',   Component: Eucalyptus },
  { id: 'ivy',        name: 'Ivy Trail',    desc: 'Classic trailing vine',  Component: IvyTrail },
  { id: 'babybreath', name: "Baby's Breath", desc: 'Delicate white sprays', Component: BabyBreath },
  { id: 'leafspray',  name: 'Leaf Spray',   desc: 'Simple oval leaves',    Component: LeafSpray },
];

export default GREENERY;
