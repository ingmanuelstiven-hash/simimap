import { useEffect, useRef } from 'react';
import svgRaw from '../assets/Mapa_Simijaca.svg?raw';

export default function MapaSVG({ onSelectSite }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const grupos = container.querySelectorAll('g[id]');

    // Solo imprimimos los IDs en consola por ahora
    console.log('IDs encontrados en el SVG:');
    grupos.forEach((g) => {
      console.log(' -', g.id);
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => onSelectSite(g.id));
    });
  }, []);

 return (
  <div
    ref={containerRef}
    className="mapa-svg-wrapper"
    style={{ width: '100%' }}
    dangerouslySetInnerHTML={{ __html: svgRaw }}
  />
);
}