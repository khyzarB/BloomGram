import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Builder from './pages/Builder';
import Bouquet from './pages/Bouquet';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/bouquet/:id" element={<Bouquet />} />
      </Routes>
    </BrowserRouter>
  );
}
