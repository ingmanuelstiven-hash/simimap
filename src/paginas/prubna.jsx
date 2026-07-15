import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MapaSVG({ sitios, onSelectSite }) {
  const contenedorRef = useRef(null);
  const navegar = useNavigate();

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    // 1. Delegación de Eventos: Captura clics en cualquier parte del mapa
    const manejarClick = (evento) => {
      // Identifica el grupo vectorial interactivo más cercano con ID
      const grupo = evento.target.closest('g[id]');
      
      if (grupo && grupo.id !== 'mapa') {
        const idSvg = grupo.id; // Ej: 'Maria', 'cruz' o 'iglesia'
        
        onSelectSite(idSvg); // Sincroniza estado de barra lateral
        
        // Redirección dinámica hacia la ficha descriptiva
        const slug = obtenerSlugPorId(idSvg);
        navegar(`/sitio/${slug}`);
      }
    };

    contenedor.addEventListener('click', manejarClick);
    return () => contenedor.removeEventListener('click', manejarClick);
  }, [navegar]);

  return (
    <div ref={contenedorRef} className="contenedor-mapa">
      <svg id="MapaSimijaca" viewBox="0 0 1000 800">
        {/* Grupos vectoriales identificados desde Illustrator */}
        <g id="cruz" className="cursor-pointer transition-transform duration-300">
          <path d="..." />
        </g>
        <g id="Maria" className="cursor-pointer transition-transform duration-300">
  
        </g>
      </svg>
    </div>
  );
}
