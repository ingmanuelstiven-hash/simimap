import Navbar from '../componentes/Navbar';
import MapaSVG from '../componentes/MapaSVG';

export default function Mapa() {
  return (
    <div className="h-screen bg-meadow-bg flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 w-full p-0 m-0 overflow-hidden">
        <MapaSVG onSelectSite={(id) => console.log('ID clickeado:', id)} />
      </main>
    </div>
  );
}