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
    
    // Si la pantalla es de móvil o tablet (< 1024px)
    if (window.innerWidth < 1024) {
      // Primer clic selecciona y muestra el Pin; segundo clic navega
      if (sitioAbierto === idNormalizado) {
        if (slug) navegar(`/sitio/${slug}`);
      } else {
        setSitioAbierto(idNormalizado);
      }
    } else {
      // En computadoras de escritorio/laptops (>= 1024px), navegar de inmediato con un solo clic
      if (slug) navegar(`/sitio/${slug}`);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#c3f0d5] flex flex-col overflow-y-auto lg:overflow-hidden relative font-body">
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

      <main className="flex-1 w-full p-4 lg:p-6 flex flex-col lg:flex-row gap-6 overflow-visible lg:overflow-hidden lg:h-full relative">
        {/* Contenedor del Mapa Interactivo (Sin fondo blanco ni bordes para fusionarse con el verde) */}
        <div className="w-full lg:flex-1 h-[350px] sm:h-[450px] lg:h-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent border-none p-0">
          <MapaSVG 
            onSelectSite={manejarSeleccionSitio} 
            sitioActivo={sitioActivo || sitioAbierto} // Sigue recibiendo info desde la lista hacia el mapa
            sitioPin={sitioActivo || sitioAbierto} // Muestra el Pin animado si haces hover en la lista o lo abres
          />
        </div>

        {/* Barra de información estática / Card de detalle (solo para móvil/tablet, justo debajo del mapa) */}
        {sitioAbierto ? (
          (() => {
            const sitioEncontrado = sitios.find(s => s.slug === mapaIdASlug[sitioAbierto]);
            return (
              <div className="lg:hidden w-full bg-white border border-primary/20 p-4 rounded-2xl shadow-sm flex flex-col gap-3.5 z-10">
                <div className="flex items-center gap-2.5 text-primary">
                  <MapPin size={18} className="animate-bounce" />
                  <h3 className="font-display font-extrabold text-base">{sitioEncontrado?.nombre}</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {sitioEncontrado?.descripcion || "Explora la historia, galería fotográfica y recorrido interactivo 360° de este maravilloso destino turístico en Simijaca."}
                </p>
                <button
                  onClick={() => navegar(`/sitio/${sitioEncontrado?.slug}`)}
                  className="w-full py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl transition-colors shadow-sm font-body"
                >
                  Conocer lugar
                </button>
              </div>
            );
          })()
        ) : (
          <div className="lg:hidden w-full bg-white border border-primary/20 p-3.5 rounded-2xl shadow-sm flex items-center justify-center text-center z-10">
            <span className="text-on-surface-variant font-medium text-xs sm:text-sm font-body">
              Selecciona el lugar turístico que te gustaría conocer
            </span>
          </div>
        )}

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
                <motion.div
                  key={sitio.id}
                  onMouseEnter={() => setSitioActivo(idDelMapa)}
                  onMouseLeave={() => setSitioActivo(null)}
                  onClick={() => setSitioAbierto(estaAbierto ? null : idDelMapa)}
                  // Animación saltarina (bounce) al activarse en computadora con spring activo
                  animate={estaAbierto ? { y: [0, -12, 0] } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  whileTap={{ scale: 0.97 }}
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
                </motion.div>
              );
            })}
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
