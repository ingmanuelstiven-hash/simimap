import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import svgRaw from '../assets/Mapa_Simijaca.svg?raw';
import sitios from '../datos/sitios'; // Necesario para buscar los nombres bonitos
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

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
  bahama: { x: -75, y: -50 }, // Ejemplo: subirlo 25px
  maria: { x: 65, y: -35 },
  parque: { x: 35, y: -56 },
  iglesia: { x: -70, y: -70 },
  cruz: { x: -45, y: -60 },
  sagrado: { x: -60, y: -30 },
  lajas: { x: 0, y: -50 },
};

export default function MapaSVG({ onSelectSite, sitioActivo, sitioPin }) {
  const contenedorRef = useRef(null);
  const tooltipRef = useRef(null);
  
  // --- Estados de Zoom y Paneo ---
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [pinPos, setPinPos] = useState(null); // Guardamos dónde va a caer el pin animado

  // Estados para separar Clic/Tap del Arrastre (Pan)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [bloquearClic, setBloquearClic] = useState(false);

  // Efecto para forzar zoom 1 en pantallas grandes ante redimensionamiento
  useEffect(() => {
    const checkViewport = () => {
      if (window.innerWidth >= 1024) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    const tooltip = tooltipRef.current;
    if (!contenedor || !tooltip) return;

    // Detectar clic para navegar o seleccionar (Solo en Escritorio >= 1024px)
    const manejarClick = (evento) => {
      if (window.innerWidth < 1024) return; // En móviles todo se delega al final del toque (touchend)
      if (bloquearClic) return;
      
      const grupo = evento.target.closest('g[id]');
      if (grupo && grupo.id.toLowerCase() !== 'mapa') {
        const idSvg = grupo.id.toLowerCase();
        onSelectSite(grupo.id);

        // En escritorio se muestra el tooltip flotante
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

    // Detectar movimiento del ratón para el tooltip (solo en computadoras con hover activo)
    const manejarMovimiento = (evento) => {
      const grupo = evento.target.closest('g[id]');
      
      if (grupo && grupo.id.toLowerCase() !== 'mapa' && window.innerWidth >= 1024) {
        const idSvg = grupo.id.toLowerCase();

        tooltip.classList.add('visible');
        
        const mouseX = evento.clientX || (evento.touches && evento.touches[0].clientX);
        const mouseY = evento.clientY || (evento.touches && evento.touches[0].clientY);
        
        if (mouseX && mouseY) {
          tooltip.style.left = `${mouseX}px`;
          tooltip.style.top = `${mouseY}px`;
        }

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
      } else {
        // Esconder siempre el tooltip flotante en móviles/tablets para no tapar contenido
        tooltip.classList.remove('visible');
      }
    };

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
  }, [onSelectSite, bloquearClic]);

  // Efecto para aplicar la clase activa
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const todosLosGrupos = contenedor.querySelectorAll('g[id]');
    todosLosGrupos.forEach(grupo => {
      grupo.classList.remove('svg-grupo-activo');
    });

    if (sitioActivo) {
      const idNormalizado = sitioActivo.toLowerCase();
      const grupo = contenedor.querySelector(`g[id="${idNormalizado}" i]`) || 
                    contenedor.querySelector(`g[id="${sitioActivo}" i]`);
      
      if (grupo) {
        grupo.classList.add('svg-grupo-activo');
      }
    }
  }, [sitioActivo]);

  // Efecto separado para calcular y actualizar la posición del pin responsivamente
  useEffect(() => {
    const recalcularPosicion = () => {
      const contenedor = contenedorRef.current;
      if (!contenedor || !sitioPin) {
        setPinPos(null);
        return;
      }

      const idNormalizado = sitioPin.toLowerCase();
      const grupo = contenedor.querySelector(`g[id="${idNormalizado}" i]`) || 
                    contenedor.querySelector(`g[id="${sitioPin}" i]`);
      
      if (grupo) {
        const parentRect = contenedor.parentElement.getBoundingClientRect();
        const containerRect = contenedor.getBoundingClientRect();
        const elementRect = grupo.getBoundingClientRect();
        
        const svgElement = contenedor.querySelector('svg');
        const viewBox = svgElement ? svgElement.viewBox?.baseVal : null;
        const svgBaseWidth = viewBox && viewBox.width > 0 ? viewBox.width : 1920; 
        
        const escala = containerRect.width / (svgBaseWidth * zoom); // Adaptamos la escala por el zoom actual
        
        const offsetOriginal = pinOffsets[idNormalizado] || { x: 0, y: -20 };
        const offsetX = offsetOriginal.x * escala;
        const offsetY = offsetOriginal.y * escala;
        
        setPinPos({
          x: elementRect.left - parentRect.left + elementRect.width / 2 + offsetX,
          y: elementRect.top - parentRect.top + elementRect.height / 2 + offsetY
        });
      } else {
        setPinPos(null);
      }
    };

    recalcularPosicion();
    window.addEventListener('resize', recalcularPosicion);
    const timeout = setTimeout(recalcularPosicion, 100);

    return () => {
      window.removeEventListener('resize', recalcularPosicion);
      clearTimeout(timeout);
    };
  }, [sitioPin, zoom, pan]); // Se recalcula si cambia el zoom o pan

  // --- Funciones de Zoom ---
  const hacerZoomIn = () => setZoom(z => Math.min(z + 0.25, 3));
  const hacerZoomOut = () => {
    setZoom(z => {
      const nuevoZoom = Math.max(z - 0.25, 1);
      if (nuevoZoom === 1) setPan({ x: 0, y: 0 }); // Resetear paneo si vuelve a 1x
      return nuevoZoom;
    });
  };
  const restablecerZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // --- Funciones de Arrastre (Paneo) ---
  const iniciarArrastre = (e) => {
    if (window.innerWidth >= 1024) return; // En computadoras no hacemos arrastre
    
    setDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    setDragStart({ x: clientX - pan.x, y: clientY - pan.y });
    setStartPos({ x: clientX, y: clientY });
  };

  const moverArrastre = (e) => {
    if (!dragging || window.innerWidth >= 1024 || zoom === 1) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    const limiteX = (zoom - 1) * 200;
    const limiteY = (zoom - 1) * 150;
    
    const nuevoX = Math.min(Math.max(clientX - dragStart.x, -limiteX), limiteX);
    const nuevoY = Math.min(Math.max(clientY - dragStart.y, -limiteY), limiteY);
    
    setPan({ x: nuevoX, y: nuevoY });
  };

  const terminarArrastre = (e) => {
    if (!dragging) return;
    setDragging(false);

    // Calcular la distancia total del toque/mouse para saber si fue clic o arrastre
    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);

    if (clientX && clientY) {
      const dx = clientX - startPos.x;
      const dy = clientY - startPos.y;
      const distancia = Math.sqrt(dx * dx + dy * dy);
      
      if (distancia > 6) {
        // Distancia mayor a 6px es un arrastre (paneo); bloqueamos el evento clic por 150ms
        if (zoom > 1) {
          setBloquearClic(true);
          setTimeout(() => setBloquearClic(false), 150);
        }
      } else {
        // Fue un toque/clic rápido (tap)
        if (window.innerWidth < 1024) {
          const elem = document.elementFromPoint(clientX, clientY);
          const grupo = elem?.closest('g[id]');
          if (grupo && grupo.id.toLowerCase() !== 'mapa') {
            onSelectSite(grupo.id);
          }
        }
      }
    }
  };

  return (
    <>
      {/* El tooltip nativo que sigue al ratón */}
      <div id="mapa-tooltip" ref={tooltipRef}></div>

      {/* Contenedor principal en flex-col */}
      <div className="w-full h-full flex flex-col relative bg-transparent">
        
        {/* Área del mapa con desbordamiento oculto */}
        <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center">
          <div
            ref={contenedorRef}
            onMouseDown={iniciarArrastre}
            onMouseMove={moverArrastre}
            onMouseUp={terminarArrastre}
            onMouseLeave={() => setDragging(false)}
            onTouchStart={iniciarArrastre}
            onTouchMove={moverArrastre}
            onTouchEnd={terminarArrastre}
            className="mapa-procesos-wrapper svg-map-container w-full h-full flex items-center justify-center transition-all"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: 'center center',
              transition: dragging ? 'none' : 'transform 0.15s ease-out',
              cursor: zoom > 1 && window.innerWidth < 1024 ? (dragging ? 'grabbing' : 'grab') : 'default'
            }}
            dangerouslySetInnerHTML={{ __html: svgRaw }}
          />

          <AnimatePresence>
            {pinPos && sitioPin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute pointer-events-none z-50 drop-shadow-xl"
                style={{
                  left: pinPos.x,
                  top: pinPos.y,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                {/* Contenedor interno animado para rebote infinito por hardware */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                    alt="Pin animado"
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Barra de controles de zoom (SOLO visible en móviles/tablets < 1024px) */}
        {window.innerWidth < 1024 && (
          <div className="flex items-center justify-end gap-2.5 p-2 bg-white/40 backdrop-blur-sm border-t border-outline-variant/10 rounded-b-3xl">
            <button
              onClick={hacerZoomIn}
              className="p-1.5 bg-white/80 hover:bg-primary/20 text-on-surface rounded-lg transition-colors border border-outline-variant/10 shadow-sm focus-visible:outline-none flex items-center justify-center"
              aria-label="Acercar mapa"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={hacerZoomOut}
              className="p-1.5 bg-white/80 hover:bg-primary/20 text-on-surface rounded-lg transition-colors border border-outline-variant/10 shadow-sm focus-visible:outline-none flex items-center justify-center"
              aria-label="Alejar mapa"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={restablecerZoom}
              className="p-1.5 bg-white/80 hover:bg-primary/20 text-on-surface rounded-lg transition-colors border border-outline-variant/10 shadow-sm focus-visible:outline-none flex items-center justify-center"
              aria-label="Restablecer tamaño de mapa"
            >
              <Maximize size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
