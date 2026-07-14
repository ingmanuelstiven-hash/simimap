import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import simijBg from '../assets/simij.jpg';
import logoSimimap from '../assets/logo_simimap.svg';

/**
 * Inicio.jsx
 * Pantalla de bienvenida de SimiMap.
 *
 * Estructura:
 * - Navbar fijo arriba
 * - Sección Hero con imagen de fondo, overlay oscuro y animaciones de entrada
 *
 * Accesibilidad aplicada:
 * - role="main" en el contenido principal
 * - aria-label en la sección hero
 * - Animaciones respetan prefers-reduced-motion
 */
export default function Inicio() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              Cargando SimiMap...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de navegación */}
      <Navbar />

      {/* Sección principal */}
      <main role="main" className="flex-1 flex flex-col">
        <section
          className="relative flex-1 z-10 flex flex-col items-center justify-center text-center py-8 px-4 md:py-8 md:px-16 lg:px-16 overflow-hidden"
          aria-label="Bienvenida a SimiMap"
        >
          {/* Imagen de fondo */}
          <img 
            src={simijBg} 
            alt="Fondo panorámico de Simijaca" 
            className="absolute inset-0 w-full h-full object-cover object-center z-[-1] pointer-events-none" 
          />

          {/* Capa oscura de overlay */}
          <div className="absolute inset-0 bg-[#032100]/45 z-0" />

          {/* Contenido principal */}
          <div className="relative z-10 flex flex-col items-center gap-5 max-w-[50rem]">

            {/* Título principal */}
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold text-white leading-[1.1] animate-fadeInUp delay-250">
              Descubre Simijaca como nunca antes
            </h1>

            {/* Descripción */}
            <p className="font-body text-[clamp(1rem,2vw,1.125rem)] text-surface-dim leading-relaxed max-w-[32rem] animate-fadeInUp delay-400">
              Explora los sitios más representativos del municipio a través de
              fotografías, videos y experiencias inmersivas en 360°.
            </p>

            {/* Botón al mapa */}
            <Link
              to="/mapa"
              className="inline-block font-display text-sm font-bold tracking-wider uppercase text-on-primary bg-primary py-4 px-9 rounded-full no-underline transition-all duration-200 hover:bg-primary-container hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-primary-fixed focus-visible:outline-offset-4 animate-fadeInUp delay-550"
              aria-label="Ir al mapa interactivo de Simijaca"
            >
              Explorar el mapa
            </Link>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}