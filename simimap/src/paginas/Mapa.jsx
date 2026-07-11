import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import MapaSVG from '../componentes/MapaSVG';
import sitios from '../datos/sitios';
import { MapPin, RotateCcw } from 'lucide-react'; 
import logoSimimap from '../assets/logo_simimap.svg'; // Importamos el logo para el loading

const mapaIdASlug = {
  parque: 'parque-principal',
  cruz: 'cerro-de-la-cruz',
  iglesia: 'parroquia-inmaculada-concepcion',
  sagrado: 'sagrado-corazon',
  lajas: 'las-lajas',
  bahama: 'sector-bahama',
  maria: 'parque-la-maria',
};

const slugAMapaId = Object.entries(mapaIdASlug).reduce((acumulador, [id, slug]) => {
  acumulador[slug] = id;
  return acumulador;
}, {});

export default function Mapa() {
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(true); // Estado para la pantalla de carga
  const [sitioActivo, setSitioActivo] = useState(null); // Solo para cuando pasamos el ratón en la LISTA
  const [sitioAbierto, setSitioAbierto] = useState(null); 

  // Simulamos un pequeño tiempo de carga para mostrar la animación chula
  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 400); // Reducido a 400ms de carga
    return () => clearTimeout(timer);
  }, []);

  const manejarSeleccionSitio = (idDelSvg) => {
    const idNormalizado = idDelSvg.toLowerCase();
    const slug = mapaIdASlug[idNormalizado];
    if (slug) {
      navegar(`/sitio/${slug}`);
    }
  };

  return (
    <div className="h-screen w-full bg-[#c3f0d5] flex flex-col overflow-hidden relative">
      {/* PANTALLA DE CARGA (Loading) */}
      <AnimatePresence>
        {cargando && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 z-[300] bg-surface flex flex-col items-center justify-center"
          >
            <motion.img 
              src={logoSimimap} 
              alt="SimiMap Logo" 
              className="w-32 h-32 md:w-40 md:h-40 mb-6 drop-shadow-md"
              animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
            <h2 className="font-display text-2xl font-bold text-primary animate-pulse">
              Cargando mapa...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      {/* Pantalla de bloqueo para móviles en modo vertical */}
      <div className="md:hidden flex-col items-center justify-center fixed inset-0 z-[200] bg-surface text-center p-8 portrait:flex landscape:hidden">
        <RotateCcw className="w-16 h-16 text-primary animate-spin-slow mb-4" />
        <h2 className="font-display text-2xl font-bold text-primary mt-2 mb-2">
          Gira tu dispositivo
        </h2>
        <p className="font-body text-on-surface-variant text-lg">
          Para una mejor experiencia con el mapa interactivo, por favor gira tu celular en modo horizontal.
        </p>
      </div>

      <main className="flex-1 w-full 3 p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-hidden h-full">
        {/* Columna Izquierda: El Mapa Interactivo */}
        <div className="flex-1 h-full flex items-center justify-center relative overflow-hidden">
          {/* El mapa ya NO le pasa eventos de hover a la lista para no iluminarla innecesariamente */}
          <MapaSVG 
            onSelectSite={manejarSeleccionSitio} 
            sitioActivo={sitioActivo || sitioAbierto} // Sigue recibiendo info desde la lista hacia el mapa
            sitioPin={sitioActivo || sitioAbierto} // Muestra el Pin animado si haces hover en la lista o lo abres
          />
        </div>

        {/* Columna Derecha: La lista lateral de sitios */}
        <aside className="w-full md:w-80 lg:w-96 bg-surface rounded-3xl shadow-sm border border-outline-variant flex flex-col h-full overflow-hidden shrink-0">
          <div className="p-6 border-b border-outline-variant bg-white z-10">
            <h2 className="font-display text-2xl font-semibold text-on-surface">
              Lugares Turísticos
            </h2>
            <p className="text-sm text-on-surface-variant mt-1 font-body">
              Selecciona un destino de la lista
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {sitios.map((sitio) => {
              const idDelMapa = slugAMapaId[sitio.slug];
              const estaHover = sitioActivo === idDelMapa;
              const estaAbierto = sitioAbierto === idDelMapa;

              return (
                <div
                  key={sitio.id}
                  onMouseEnter={() => setSitioActivo(idDelMapa)}
                  onMouseLeave={() => setSitioActivo(null)}
                  onClick={() => setSitioAbierto(estaAbierto ? null : idDelMapa)}
                  className={`
                    p-4 rounded-xl border cursor-pointer flex flex-col gap-2 
                    transition-all duration-200 ease-out
                    ${estaAbierto || estaHover
                      ? 'border-primary bg-primary-container/10 shadow-sm ring-1 ring-primary/20'
                      : 'border-outline-variant bg-white hover:border-primary/50 hover:bg-surface'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      estaAbierto || estaHover ? 'bg-primary text-white scale-110' : 'bg-surface-variant text-on-surface-variant'
                    }`}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className={`font-display font-bold transition-colors duration-200 ${estaAbierto || estaHover ? 'text-primary' : 'text-on-surface'}`}>
                        {sitio.nombre}
                      </h4>
                      <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{sitio.categoria}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {estaAbierto && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden pt-2"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navegar(`/sitio/${sitio.slug}`);
                          }}
                          className="w-full py-2.5 mt-2 bg-primary hover:bg-primary-container text-white text-sm font-bold rounded-lg transition-colors duration-200 shadow-sm font-body"
                        >
                          Ver Información Completa
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
