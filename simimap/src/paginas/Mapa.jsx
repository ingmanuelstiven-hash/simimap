import Navbar from '../componentes/Navbar';
import MapaSVG from '../componentes/MapaSVG';
import '../styles/Mapa.css';

export default function Mapa() {
  return (
    <div className="mapa-pagina">
      <Navbar />
      <main className="mapa-contenedor">
        <MapaSVG onSelectSite={(id) => console.log('ID clickeado:', id)} />
      </main>
    </div>
  );
}