import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Pannellum } from "pannellum-react";
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import sitios from '../datos/sitios';
import { ArrowLeft, Info, Image as ImageIcon, Video, Box, MousePointer2 } from 'lucide-react';
import logoSimimap from '../assets/logo_simimap.svg';

export default function DetalleSitio() {
  const { slug } = useParams();
  const navegar = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [tabActivo, setTabActivo] = useState('informacion');
  
  // Estado para la instrucción del visor 360
  const [mostrarInstruccion360, setMostrarInstruccion360] = useState(true);

  // Buscar la información del sitio
  const sitio = sitios.find(s => s.slug === slug);

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
    { id: 'imagenes', label: 'Imágenes', icono: <ImageIcon size={18} /> },
    { id: 'video', label: 'Video', icono: <Video size={18} /> },
    { id: '360', label: 'Vista 360°', icono: <Box size={18} /> },
  ];

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
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
          {/* Header de la vista */}
          <div className="mb-8 mt-4">
            <button 
              onClick={() => navegar('/mapa')}
              className="flex items-center text-primary hover:text-primary-container transition-colors mb-4 font-bold"
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
          </div>

          {/* Sistema de Pestañas (Tabs) */}
          <div className="flex border-b border-outline-variant mb-6 overflow-x-auto custom-scrollbar">
            {pestañas.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActivo(tab.id)}
                className={`
                  flex items-center gap-2 py-3 px-6 font-bold whitespace-nowrap transition-colors border-b-2
                  ${tabActivo === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'}
                `}
              >
                {tab.icono}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido de cada Pestaña */}
          <div className="flex-1 bg-surface rounded-2xl shadow-sm border border-outline-variant p-6 md:p-8 min-h-[400px]">
            {tabActivo === 'informacion' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-2xl font-display font-semibold text-on-surface">Historia y Descripción</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Aquí irá todo el texto descriptivo del sitio turístico, su historia, datos curiosos e información relevante para los visitantes.
                </p>
                <div className="bg-primary-container/20 p-4 rounded-xl mt-4">
                  <h4 className="font-bold text-primary mb-2">Ubicación</h4>
                  <p className="text-sm text-on-surface">Aquí puedes colocar la dirección o indicaciones para llegar.</p>
                </div>
              </motion.div>
            )}

            {tabActivo === 'imagenes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-2xl font-display font-semibold text-on-surface mb-6">Galería Fotográfica</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-video bg-surface-variant rounded-xl flex items-center justify-center text-on-surface-variant">
                      <ImageIcon size={32} className="opacity-50" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tabActivo === 'video' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-2xl font-display font-semibold text-on-surface mb-6">Recorrido en Video</h3>
                <div className="aspect-video bg-surface-variant rounded-xl w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-on-surface-variant">
                  <Video size={48} className="mb-4 opacity-50" />
                  <p>Reproductor de video (YouTube o local)</p>
                </div>
              </motion.div>
            )}

            {tabActivo === '360' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-2xl font-display font-semibold text-on-surface mb-6">Vista Panorámica 360°</h3>
                
                {sitio?.panorama360 ? (
                  <div 
                    className="rounded-xl overflow-hidden shadow-sm h-[400px] md:h-[600px] w-full relative z-0 bg-black"
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
                        // Ocultar la instrucción automáticamente después de 6 segundos
                        setTimeout(() => setMostrarInstruccion360(false), 6000);
                      }}
                    />

                    {/* Instrucción Overlay */}
                    <AnimatePresence>
                      {mostrarInstruccion360 && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/30 z-20"
                        >
                          <div className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm">
                            <MousePointer2 className="w-12 h-12 text-primary mb-3 animate-bounce" />
                            <p className="font-display font-extrabold text-on-surface text-2xl mb-1">Arrastra para explorar</p>
                            <p className="text-on-surface-variant font-medium">Mueve la imagen en cualquier dirección para ver todo el panorama.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="aspect-[21/9] bg-surface-variant rounded-xl w-full flex flex-col items-center justify-center text-on-surface-variant">
                    <Box size={48} className="mb-4 opacity-50" />
                    <p className="font-bold text-lg">Próximamente</p>
                    <p className="text-sm">Vista 360° en desarrollo para este sitio.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </main>
      )}

      {/* Footer Genérico */}
      <Footer />
    </div>
  );
}