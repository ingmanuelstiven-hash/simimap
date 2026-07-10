import { useEffect, useRef } from 'react';
import svgRaw from '../assets/Mapa_Simijaca.svg?raw';

export default function MapaSVG({ onSelectSite }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const grupos = container.querySelectorAll('g[id]');

    // Agregamos cursores e interacción de clics
    grupos.forEach((g) => {
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => onSelectSite(g.id));
    });
  }, [onSelectSite]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full [&_svg]:w-full [&_svg]:block [&_svg]:h-[50vh] sm:[&_svg]:h-[60vw] md:[&_svg]:h-full"
      dangerouslySetInnerHTML={{ __html: svgRaw }}
    />
  );
}