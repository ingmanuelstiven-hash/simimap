import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Pannellum } from "pannellum-react";
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import sitios from '../datos/sitios';
import { ArrowLeft, Info, Image as ImageIcon, Video, Box, MousePointer2, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import logoSimimap from '../assets/logo_simimap.svg';

// Variantes de animación reutilizables para dar dinamismo a la interfaz
const fadeUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const tabContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const tabItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function DetalleSitio() {
  const { slug } = useParams();
  const navegar = useNavigate();

  // Buscar la información del sitio primero
  const sitio = sitios.find(s => s.slug === slug);

  const [cargando, setCargando] = useState(true);
  const [tabActivo, setTabActivo] = useState('informacion');

  // Ref para el contenedor de contenido para hacer scroll al cambiar de pestaña
  const contenidoRef = useRef(null);

  // Estado para la instrucción del visor 360
  const [mostrarInstruccion360, setMostrarInstruccion360] = useState(true);

  // Estado para la galería ampliada (Lightbox)
  const [indiceImagenActiva, setIndiceImagenActiva] = useState(null);

  const mostrarImagenAnterior = (e) => {
    if (e) e.stopPropagation();
    if (!sitio?.imagenes) return;
    setIndiceImagenActiva((prev) => (prev === 0 ? sitio.imagenes.length - 1 : prev - 1));
  };

  const mostrarImagenSiguiente = (e) => {
    if (e) e.stopPropagation();
    if (!sitio?.imagenes) return;
    setIndiceImagenActiva((prev) => (prev === sitio.imagenes.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const manejarTeclado = (e) => {
      if (indiceImagenActiva === null) return;
      if (e.key === 'Escape') setIndiceImagenActiva(null);
      if (e.key === 'ArrowLeft') mostrarImagenAnterior();
      if (e.key === 'ArrowRight') mostrarImagenSiguiente();
    };

    window.addEventListener('keydown', manejarTeclado);
    return () => window.removeEventListener('keydown', manejarTeclado);
  }, [indiceImagenActiva, sitio]);

  useEffect(() => {
    // Simulamos el tiempo de carga para mostrar el loader personalizado
    const timer = setTimeout(() => {
      setCargando(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [slug]);

  // Si cambiamos de pestaña y volvemos a la 360, resetear estados
  useEffect(() => {
    if (tabActivo === '360') {
      setMostrarInstruccion360(true);
    }
  }, [tabActivo]);

  if (!sitio && !cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-on-surface mb-4">Sitio no encontrado</h2>
          <button onClick={() => navegar('/mapa')} className="px-6 py-2 bg-primary text-white rounded-lg font-bold">
            Volver al Mapa
          </button>
        </div>
      </div>
    );
  }

  const pestañas = [
    { id: 'informacion', label: 'Información', icono: <Info size={18} /> },
    { id: 'imagenes', label: 'Galería', icono: <ImageIcon size={18} /> },
    { id: 'video', label: 'Video', icono: <Video size={18} /> },
    { id: '360', label: 'Vista 360°', icono: <Box size={18} /> },
  ];

  const cambiarTab = (tabId) => {
    setTabActivo(tabId);
    // Hacemos scroll al inicio del contenedor del contenido tras un leve delay
    setTimeout(() => {
      if (contenidoRef.current) {
        // Obtenemos la posición de la barra de navegación para dejar un offset
        const yOffset = -90;
        const element = contenidoRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      {/* Loader Personalizado */}
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
              alt="Cargando..."
              className="w-32 h-32 md:w-40 md:h-40 mb-6 drop-shadow-md"
              animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
            <h2 className="font-display text-2xl font-bold text-primary animate-pulse">
              Cargando información...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* Contenido Principal */}
      {!cargando && (
        <main className="flex-1 max-w-[95%] w-[95%] mx-auto py-8 flex flex-col">
          {/* Header de la vista con animación slide-up */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mb-8 mt-4"
          >
            <button
              onClick={() => navegar('/mapa')}
              className="flex items-center text-primary hover:text-primary-container transition-colors mb-4 font-bold focus:outline-none"
            >
              <ArrowLeft size={20} className="mr-2" />
              Volver al Mapa
            </button>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface">
              {sitio?.nombre}
            </h1>
            <p className="text-lg text-on-surface-variant mt-2 font-medium">
              Categoría: {sitio?.categoria}
            </p>
          </motion.div>

          {/* Menú de Pestañas: Grid de 1 columna en móvil y Fila en pantallas grandes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-2 md:flex border-b border-outline-variant mb-6 gap-2 md:gap-0 overflow-x-auto custom-scrollbar"
          >
            {pestañas.map((tab) => (
              <button
                key={tab.id}
                onClick={() => cambiarTab(tab.id)}
                className={`
                  flex items-center justify-center md:justify-start gap-2.5 py-3 px-5 font-bold transition-all duration-200 border-2 md:border-t-0 md:border-x-0 md:border-b-2 rounded-xl md:rounded-none
                  ${tabActivo === tab.id
                    ? 'border-primary bg-primary/5 text-primary scale-[1.02] md:bg-transparent md:scale-100'
                    : 'border-outline-variant/40 md:border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'}
                `}
                aria-label={`Ver pestaña ${tab.label}`}
              >
                {tab.icono}
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Contenido de cada Pestaña animado dinámicamente */}
          <div
            ref={contenidoRef}
            className="flex-1 bg-surface rounded-2xl shadow-sm border border-outline-variant p-6 md:p-8 min-h-[400px]"
          >
            {tabActivo === 'informacion' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={tabContainerVariants}
                className="space-y-6"
              >
                <motion.h3 variants={tabItemVariants} className="text-2xl font-display font-semibold text-on-surface">
                  Descripción
                </motion.h3>

                <motion.p variants={tabItemVariants} className="text-on-surface-variant leading-relaxed text-justify">
                  {sitio?.descripcion || "Descripción detallada del sitio turístico en desarrollo."}
                </motion.p>

                {sitio?.historia && (
                  <>
                    <motion.h3 variants={tabItemVariants} className="text-2xl font-display font-semibold text-on-surface pt-2">
                      Historia
                    </motion.h3>
                    <motion.p variants={tabItemVariants} className="text-on-surface-variant leading-relaxed text-justify">
                      {sitio.historia}
                    </motion.p>
                  </>
                )}

                <motion.div variants={tabItemVariants} className="bg-primary-container/10 border border-primary/20 p-5 rounded-2xl mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-display font-extrabold text-primary text-base mb-1.5 flex items-center gap-2">
                      <MapPin size={18} />
                      Ubicación
                    </h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed font-medium text-justify">
                      {sitio?.ubicacion || "Indicaciones de ubicación en desarrollo para este sitio."}
                    </p>
                  </div>

                  {sitio?.ubicacion && (
                    <a
                      href={sitio?.googleMaps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sitio?.nombre + ', Simijaca, Cundinamarca')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-white hover:bg-primary-container/10 border border-primary/30 text-primary hover:text-primary-container text-sm font-bold rounded-xl transition-all duration-200 shadow-sm shrink-0 self-start sm:self-auto no-underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Ver en Google Maps
                    </a>
                  )}
                </motion.div>
              </motion.div>
            )}

            {tabActivo === 'imagenes' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={tabContainerVariants}
              >
                <motion.h3 variants={tabItemVariants} className="text-2xl font-display font-semibold text-on-surface mb-6">
                  Galería Fotográfica
                </motion.h3>

                {sitio?.imagenes && sitio.imagenes.length > 0 ? (
                  <motion.div variants={tabItemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sitio.imagenes.map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, rotate: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="aspect-video rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setIndiceImagenActiva(i)}
                      >
                        <img src={img} alt={`${sitio.nombre} ${i + 1}`} className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    variants={tabItemVariants}
                    className="aspect-[21/9] bg-surface-variant rounded-xl w-full flex flex-col items-center justify-center text-on-surface-variant"
                  >
                    <ImageIcon size={48} className="mb-4 opacity-50" />
                    <p className="font-bold text-lg">Galería próximamente</p>
                    <p className="text-sm">Imágenes fotográficas en desarrollo para este sitio.</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {tabActivo === 'video' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={tabContainerVariants}
              >


                {sitio?.video ? (
                  <motion.div
                    variants={tabItemVariants}
                    className="aspect-video rounded-2xl w-full md:w-[100%] lg:w-[100%] max-w-4xl mx-auto overflow-hidden shadow-lg border border-outline-variant/40"
                  >
                    {sitio.video.includes('youtube.com') || sitio.video.includes('youtu.be') ? (
                      <iframe
                        className="w-full h-full"
                        src={sitio.video.replace('watch?v=', 'embed/')}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video className="w-full h-full object-cover" controls src={sitio.video} />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    variants={tabItemVariants}
                    className="aspect-[21/9] bg-surface-variant rounded-xl w-full flex flex-col items-center justify-center text-on-surface-variant"
                  >
                    <Video size={48} className="mb-4 opacity-50" />
                    <p className="font-bold text-lg">Video próximamente</p>
                    <p className="text-sm">Recorrido audiovisual en desarrollo para este sitio.</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {tabActivo === '360' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={tabContainerVariants}
              >
                <motion.h3 variants={tabItemVariants} className="text-2xl font-display font-semibold text-on-surface mb-6">
                  Vista Panorámica 360°
                </motion.h3>

                {sitio?.panorama360 ? (
                  <motion.div
                    variants={tabItemVariants}
                    className="rounded-xl overflow-hidden shadow-md h-[400px] md:h-[600px] w-full relative z-0 bg-black border border-outline-variant"
                    onMouseDown={() => setMostrarInstruccion360(false)}
                    onTouchStart={() => setMostrarInstruccion360(false)}
                  >
                    <Pannellum
                      width="100%"
                      height="100%"
                      image={sitio.panorama360}
                      pitch={10}
                      yaw={180}
                      hfov={110}
                      autoLoad
                      showZoomCtrl={true}
                      showFullscreenCtrl={true}
                      mouseZoom={true}
                      keyboardZoom={false}
                      autoRotate={-2}
                      onLoad={() => {
                      setTimeout(() => setMostrarInstruccion360(false), 6000);
                      }}
                    />

                    {/* Instrucción Overlay con animación de pulso */}
                    <AnimatePresence>
                      {mostrarInstruccion360 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/30 z-20"
                        >
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm"
                          >
                            <MousePointer2 className="w-12 h-12 text-primary mb-3 animate-bounce" />
                            <p className="font-display font-extrabold text-on-surface text-2xl mb-1">Arrastra para explorar</p>
                            <p className="text-on-surface-variant font-medium">Mueve la imagen en cualquier dirección para ver todo el panorama.</p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={tabItemVariants}
                    className="aspect-[21/9] bg-surface-variant rounded-xl w-full flex flex-col items-center justify-center text-on-surface-variant"
                  >
                    <Box size={48} className="mb-4 opacity-50" />
                    <p className="font-bold text-lg">Próximamente</p>
                    <p className="text-sm">Vista 360° en desarrollo para este sitio.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </main>
      )}

      {/* Footer Genérico */}
      <Footer />

      {/* Lightbox / Galería Ampliada Modal */}
      <AnimatePresence>
        {indiceImagenActiva !== null && sitio?.imagenes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIndiceImagenActiva(null)}
          >
            {/* Botón de cerrar */}
            <button
              onClick={() => setIndiceImagenActiva(null)}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full z-50 focus-visible:outline-none"
              aria-label="Cerrar galería"
            >
              <X size={24} />
            </button>

            {/* Contenedor principal de la imagen y controles */}
            <div className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>

              {/* Botón Anterior */}
              <button
                onClick={mostrarImagenAnterior}
                className="absolute left-2 md:-left-16 text-white hover:text-primary transition-colors p-3 bg-black/40 hover:bg-black/60 md:bg-white/10 md:hover:bg-white/20 rounded-full z-10 focus-visible:outline-none"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Imagen activa con animación de cambio de slide */}
              <motion.img
                key={indiceImagenActiva}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={sitio.imagenes[indiceImagenActiva]}
                alt={`${sitio.nombre} ampliada ${indiceImagenActiva + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl select-none shadow-2xl border border-white/5"
              />

              {/* Botón Siguiente */}
              <button
                onClick={mostrarImagenSiguiente}
                className="absolute right-2 md:-right-16 text-white hover:text-primary transition-colors p-3 bg-black/40 hover:bg-black/60 md:bg-white/10 md:hover:bg-white/20 rounded-full z-10 focus-visible:outline-none"
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Indicador de posición (ej: 3 / 12) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider font-body border border-white/5">
              {indiceImagenActiva + 1} / {sitio.imagenes.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}