import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import logoSimimap from '../assets/logo_simimap.svg';

export default function AcercaDe() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

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
              Cargando Acerca de...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="flex-1 max-w-[90%] w-[1200px] mx-auto py-12 flex flex-col justify-center">
        {/* Título de la Sección con entrada animada */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-on-surface">
            Acerca del Proyecto
          </h1>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Bloque principal tipo Ficha Técnica Académica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Ficha Académica Izquierda (UNIR) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 bg-surface border border-outline-variant p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-primary mb-6">
                Ficha Técnica del Proyecto
              </h2>

              <dl className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-outline-variant/10 pb-3">
                  <dt className="text-sm font-bold text-on-surface-variant font-display">Tesis / Proyecto:</dt>
                  <dd className="text-sm text-on-surface sm:col-span-2 font-medium">
                    Diseño y desarrollo de una aplicación web SPA en React para la promoción y exploración turística del municipio de Simijaca “SimiMap”.
                  </dd>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-outline-variant/10 pb-3">
                  <dt className="text-sm font-bold text-on-surface-variant font-display">Estudiante / Autor:</dt>
                  <dd className="text-sm text-on-surface sm:col-span-2 font-extrabold text-primary">
                    Manuel Stiven Rodríguez Lamprea
                  </dd>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-outline-variant/10 pb-3">
                  <dt className="text-sm font-bold text-on-surface-variant font-display">Directora de Tesis:</dt>
                  <dd className="text-sm text-on-surface sm:col-span-2 font-medium">
                    Andrea Vanessa Mory Alvarado
                  </dd>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-outline-variant/10 pb-3">
                  <dt className="text-sm font-bold text-on-surface-variant font-display">Programa Académico:</dt>
                  <dd className="text-sm text-on-surface sm:col-span-2 font-medium">
                    Máster Universitario en Diseño y Desarrollo de Interfaz de Usuario Web (Front-End Design and Development)
                  </dd>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b border-outline-variant/10 pb-3">
                  <dt className="text-sm font-bold text-on-surface-variant font-display">Institución:</dt>
                  <dd className="text-sm text-on-surface sm:col-span-2 font-medium">
                    Universidad Internacional de La Rioja (UNIR) <br />
                    Escuela Superior de Ingeniería y Tecnología
                  </dd>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 pb-3">
                  <dt className="text-sm font-bold text-on-surface-variant font-display">Fecha de Presentación:</dt>
                  <dd className="text-sm text-on-surface sm:col-span-2 font-medium">
                    22 de Julio de 2026
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>

          {/* Resumen & Propósito Derecha */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-5 bg-primary-container/20 border border-primary/20 p-6 md:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-primary mb-6">
                Propósito del Proyecto
              </h2>

              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 font-medium">
                SimiMap es una plataforma digital de tipo SPA (Single Page Application) diseñada y desarrollada utilizando la librería **React** y herramientas modernas de front-end. Su objetivo principal es potenciar la promoción y exploración turística del municipio de Simijaca (Cundinamarca, Colombia).
              </p>

              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
                A través de un **mapa interactivo vectorial (SVG)**, galerías de imágenes y **recorridos inmersivos en formato 360°**, SimiMap permite a los usuarios descubrir y explorar de manera virtual los sitios históricos, recreativos y naturales más emblemáticos del municipio, integrando directrices de **accesibilidad web (WAI-ARIA & WCAG)** para garantizar una experiencia inclusiva para todos los visitantes.
              </p>
            </div>

            <div className="pt-6 border-t border-primary/10 mt-6 text-xs text-primary font-bold font-display">
              © 2026 SimiMap · Universidad Internacional de La Rioja (UNIR)
            </div>
          </motion.div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
