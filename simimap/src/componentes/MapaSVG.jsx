import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import svgRaw from '../assets/Mapa_Simijaca.svg?raw';
import sitios from '../datos/sitios'; // Necesario para buscar los nombres bonitos

// Diccionario para relacionar el ID cortito del SVG con la ruta (slug) de cada sitio.
const mapaIdASlug = {
  parque: 'parque-principal',
  cruz: 'cerro-de-la-cruz',
  iglesia: 'parroquia-inmaculada-concepcion',
  sagrado: 'sagrado-corazon',
  lajas: 'las-lajas',
  bahama: 'sector-bahama',
  maria: 'parque-la-maria',
};

// Offsets manuales para ajustar exactamente dónde cae el Pin respecto al centro del elemento SVG
const pinOffsets = {
  bahama: { x: 0, y: -25 }, // Ejemplo: subirlo 25px
  maria: { x: 0, y: -20 },
  parque: { x: 0, y: -20 },
  iglesia: { x: 0, y: -20 },
  cruz: { x: 0, y: -30 },
  sagrado: { x: 0, y: -30 },
  lajas: { x: 0, y: -20 },
};

export default function MapaSVG({ onSelectSite, sitioActivo, sitioPin }) {
  const contenedorRef = useRef(null);
  const tooltipRef = useRef(null);
  const [pinPos, setPinPos] = useState(null); // Guardamos dónde va a caer el pin animado

  useEffect(() => {
    const contenedor = contenedorRef.current;
    const tooltip = tooltipRef.current;
    if (!contenedor || !tooltip) return;

    // Detectar clic para navegar o seleccionar
    const manejarClick = (evento) => {
      const grupo = evento.target.closest('g[id]');
      if (grupo && grupo.id.toLowerCase() !== 'mapa') {
        const idSvg = grupo.id.toLowerCase();
        onSelectSite(grupo.id);

        // Forzar la visualización del tooltip justo arriba del elemento (útil en móviles)
        tooltip.classList.add('visible');
        const elementRect = grupo.getBoundingClientRect();
        tooltip.style.left = `${elementRect.left + elementRect.width / 2}px`;
        tooltip.style.top = `${elementRect.top - 10}px`;

        const slug = mapaIdASlug[idSvg];
        const sitioEncontrado = sitios.find(s => s.slug === slug);
        const nombreMostrar = sitioEncontrado ? sitioEncontrado.nombre : idSvg;

        tooltip.innerHTML = `
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="tooltip-titulo">${nombreMostrar}</span>
          </div>
        `;
      }
    };

    // Detectar movimiento del ratón para el tooltip
    const manejarMovimiento = (evento) => {
      const grupo = evento.target.closest('g[id]');

      if (grupo && grupo.id.toLowerCase() !== 'mapa') {
        const idSvg = grupo.id.toLowerCase();

        // --- Lógica del Tooltip Nativo ---
        tooltip.classList.add('visible');

        // Movemos el letrerito para que siga al ratón
        const mouseX = evento.clientX || (evento.touches && evento.touches[0].clientX);
        const mouseY = evento.clientY || (evento.touches && evento.touches[0].clientY);

        if (mouseX && mouseY) {
          tooltip.style.left = `${mouseX}px`;
          tooltip.style.top = `${mouseY}px`;
        }

        // Buscar el nombre bonito para mostrarlo en el tooltip
        const slug = mapaIdASlug[idSvg];
        const sitioEncontrado = sitios.find(s => s.slug === slug);
        const nombreMostrar = sitioEncontrado ? sitioEncontrado.nombre : idSvg;

        // Tooltip con ícono de ubicación incluido
        tooltip.innerHTML = `
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="tooltip-titulo">${nombreMostrar}</span>
          </div>
        `;
      } else {
        tooltip.classList.remove('visible');
      }
    };

    // Cuando el ratón sale del contenedor completo
    const manejarMouseOut = (evento) => {
      if (!evento.relatedTarget || !contenedor.contains(evento.relatedTarget)) {
        tooltip.classList.remove('visible');
      }
    };

    contenedor.addEventListener('click', manejarClick);
    contenedor.addEventListener('mousemove', manejarMovimiento);
    contenedor.addEventListener('touchmove', manejarMovimiento, { passive: true });
    contenedor.addEventListener('mouseout', manejarMouseOut);

    return () => {
      contenedor.removeEventListener('click', manejarClick);
      contenedor.removeEventListener('mousemove', manejarMovimiento);
      contenedor.removeEventListener('touchmove', manejarMovimiento);
      contenedor.removeEventListener('mouseout', manejarMouseOut);
    };
  }, [onSelectSite]);

  // Efecto para aplicar la clase activa
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    // Quitamos la clase activa a todos
    const todosLosGrupos = contenedor.querySelectorAll('g[id]');
    todosLosGrupos.forEach(grupo => {
      grupo.classList.remove('svg-grupo-activo');
    });

    if (sitioActivo) {
      const idNormalizado = sitioActivo.toLowerCase();
      // Buscamos ignorando mayúsculas/minúsculas usando el modificador "i"
      const grupo = contenedor.querySelector(`g[id="${idNormalizado}" i]`) ||
        contenedor.querySelector(`g[id="${sitioActivo}" i]`);

      if (grupo) {
        // Le ponemos la clase al que está activo
        grupo.classList.add('svg-grupo-activo');
      }
    }
  }, [sitioActivo]);

  // Efecto separado solo para calcular la posición del pin cuando se abre desde la lista
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor || !sitioPin) {
      setPinPos(null);
      return;
    }

    const idNormalizado = sitioPin.toLowerCase();
    // Buscamos ignorando mayúsculas/minúsculas
    const grupo = contenedor.querySelector(`g[id="${idNormalizado}" i]`) ||
      contenedor.querySelector(`g[id="${sitioPin}" i]`);

    if (grupo) {
      // Calculamos dónde está el grupo para poner el Pin
      const containerRect = contenedor.getBoundingClientRect();
      const elementRect = grupo.getBoundingClientRect();
      const offset = pinOffsets[idNormalizado] || { x: 0, y: -20 };

      setPinPos({
        x: elementRect.left - containerRect.left + elementRect.width / 2 + offset.x,
        y: elementRect.top - containerRect.top + elementRect.height / 2 + offset.y
      });
    } else {
      setPinPos(null);
    }
  }, [sitioPin]);

  return (
    <>
      {/* El tooltip nativo que sigue al ratón */}
      <div id="mapa-tooltip" ref={tooltipRef}></div>

      {/* El contenedor principal del mapa con las clases de Tailwind que agregamos al config */}
      <div className="w-full h-full relative overflow-hidden svg-map-container flex items-center justify-center">
        {/* Aquí inyectamos el SVG */}
        <div
          ref={contenedorRef}
          className="mapa-procesos-wrapper w-full h-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: svgRaw }}
        />

        {/* Pin animado que aparece SOLO cuando se activa desde la lista lateral */}
        <AnimatePresence>
          {pinPos && sitioPin && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute pointer-events-none z-50 drop-shadow-xl"
              style={{
                left: pinPos.x,
                top: pinPos.y,
                transform: 'translate(-50%, -100%)' // Para que apunte justo al centro inferior del pin
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Pin animado"
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 animate-bounce"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

