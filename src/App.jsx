import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Mapa from './paginas/Mapa';
import DetalleSitio from './paginas/DetalleSitio';
import AcercaDe from './paginas/AcercaDe';
import AccesibilidadPanel from './componentes/AccesibilidadPanel';

/**
 * App.jsx ahora actúa como el "director de tráfico".
 * Define qué componente se dibuja según la URL.
 */
function App() {
  return (
    <div className="App">
      <Routes>
       
        <Route path="/" element={<Inicio />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        {/* Ruta dinámica para los sitios turísticos.*/}
        <Route path="/sitio/:slug" element={<DetalleSitio />} />
      </Routes>

      {/* Panel global de Accesibilidad (WAI-ARIA / WCAG) */}
      <AccesibilidadPanel />
    </div>
  );
}

export default App;