import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Builder from './pages/Builder';
import BouquetReveal from './pages/BouquetReveal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/bouquet/:id" element={<BouquetReveal />} />
      </Routes>
    </BrowserRouter>
  );
}
