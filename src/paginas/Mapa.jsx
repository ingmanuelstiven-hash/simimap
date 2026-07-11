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
  const [drawerAbierto, setDrawerAbierto] = useState(false); // Estado para el menú lateral en móviles

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
    
    // Si ya está seleccionado/abierto, navegamos al sitio al hacer clic de nuevo
    if (sitioAbierto === idNormalizado) {
      if (slug) {
        navegar(`/sitio/${slug}`);
      }
    } else {
      // Si es el primer clic, solo lo seleccionamos (muestra el Pin y abre la tarjeta)
      setSitioAbierto(idNormalizado);
    }
  };

  return (
    <div className="h-screen w-full bg-[#c3f0d5] flex flex-col overflow-hidden relative font-body">
      {/* PANTALLA DE CARGA (Loading) */}
      <AnimatePresence>
        {cargando && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[300] bg-surface flex flex-col items-center justify-center"
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

      <main className="flex-1 w-full p-4 lg:p-6 flex flex-row gap-6 overflow-hidden h-full relative">
        {/* Columna Izquierda: El Mapa Interactivo */}
        <div className="flex-1 h-full flex items-center justify-center relative overflow-hidden">
          <MapaSVG 
            onSelectSite={manejarSeleccionSitio} 
            sitioActivo={sitioActivo || sitioAbierto} // Sigue recibiendo info desde la lista hacia el mapa
            sitioPin={sitioActivo || sitioAbierto} // Muestra el Pin animado si haces hover en la lista o lo abres
          />

          {/* Botón flotante para abrir el listado en móviles y tablets (pantallas < lg) */}
          <button
            onClick={() => setDrawerAbierto(true)}
            className="lg:hidden absolute bottom-4 right-4 z-40 bg-primary hover:bg-primary-container text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200"
            aria-label="Ver listado de sitios"
          >
            <MapPin size={20} />
            <span className="font-bold text-sm">Ver Sitios</span>
          </button>
        </div>

        {/* Aside/Sidebar para Escritorio (lg en adelante) */}
        <aside className="hidden lg:flex w-64 xl:w-80 2xl:w-96 bg-surface rounded-3xl shadow-sm border border-outline-variant flex-col h-full overflow-hidden shrink-0">
          <div className="p-4 xl:p-6 border-b border-outline-variant bg-white z-10">
            <h2 className="font-display text-lg xl:text-xl 2xl:text-2xl font-semibold text-on-surface">
              Lugares Turísticos
            </h2>
            <p className="text-xs xl:text-sm text-on-surface-variant mt-1 font-body">
              Selecciona un destino de la lista
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 xl:p-4 space-y-3 custom-scrollbar">
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
                    p-3 xl:p-4 rounded-xl border cursor-pointer flex flex-col gap-2 
                    transition-all duration-200 ease-out
                    ${estaAbierto || estaHover
                      ? 'border-primary bg-primary-container/10 shadow-sm ring-1 ring-primary/20'
                      : 'border-outline-variant bg-white hover:border-primary/50 hover:bg-surface'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 xl:gap-3">
                    <div className={`w-8 h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      estaAbierto || estaHover ? 'bg-primary text-white scale-105 xl:scale-110' : 'bg-surface-variant text-on-surface-variant'
                    }`}>
                      <MapPin size={16} className="xl:w-[18px] xl:h-[18px]" />
                    </div>
                    <div>
                      <h4 className={`font-display text-sm xl:text-base font-bold transition-colors duration-200 ${estaAbierto || estaHover ? 'text-primary' : 'text-on-surface'}`}>
                        {sitio.nombre}
                      </h4>
                      <p className="text-[10px] xl:text-xs text-on-surface-variant line-clamp-1 mt-0.5">{sitio.categoria}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {estaAbierto && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden pt-1 xl:pt-2"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navegar(`/sitio/${sitio.slug}`);
                          }}
                          className="w-full py-2 mt-1 xl:mt-2 bg-primary hover:bg-primary-container text-white text-xs xl:text-sm font-bold rounded-lg transition-colors duration-200 shadow-sm font-body"
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

        {/* Drawer Lateral Desplazable para Móviles y Tablets (< lg) */}
        <AnimatePresence>
          {drawerAbierto && (
            <>
              {/* Overlay oscuro de fondo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerAbierto(false)}
                className="lg:hidden fixed inset-0 bg-black z-40"
              />

              {/* Contenedor del Drawer */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-surface z-50 shadow-2xl flex flex-col h-full overflow-hidden border-l border-outline-variant"
              >
                <div className="p-6 border-b border-outline-variant bg-white flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-on-surface">
                      Lugares Turísticos
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Selecciona un destino
                    </p>
                  </div>
                  <button 
                    onClick={() => setDrawerAbierto(false)}
                    className="p-2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {sitios.map((sitio) => {
                    const idDelMapa = slugAMapaId[sitio.slug];
                    const estaHover = sitioActivo === idDelMapa;
                    const estaAbierto = sitioAbierto === idDelMapa;

                    return (
                      <div
                        key={sitio.id}
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
                                  setDrawerAbierto(false); // Cierra el drawer al navegar
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
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
