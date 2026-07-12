import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Type, Sparkles } from 'lucide-react';

const AccessibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" />
    <path d="m9 22 2-6h2l2 6" />
    <path d="M6 12h12" />
    <path d="M12 7v7" />
  </svg>
);

export default function AccesibilidadPanel() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estados de accesibilidad inicializados desde localStorage
  const [altoContraste, setAltoContraste] = useState(
    () => localStorage.getItem('access-high-contrast') === 'true'
  );
  const [textoGrande, setTextoGrande] = useState(
    () => localStorage.getItem('access-large-text') === 'true'
  );
  const [fuenteFacil, setFuenteFacil] = useState(
    () => localStorage.getItem('access-readable-font') === 'true'
  );

  // Efecto para sincronizar las clases en el body
  useEffect(() => {
    const body = document.body;

    if (altoContraste) {
      body.classList.add('accessibility-high-contrast');
      localStorage.setItem('access-high-contrast', 'true');
    } else {
      body.classList.remove('accessibility-high-contrast');
      localStorage.setItem('access-high-contrast', 'false');
    }

    if (textoGrande) {
      body.classList.add('accessibility-large-text');
      localStorage.setItem('access-large-text', 'true');
    } else {
      body.classList.remove('accessibility-large-text');
      localStorage.setItem('access-large-text', 'false');
    }

    if (fuenteFacil) {
      body.classList.add('accessibility-readable-font');
      localStorage.setItem('access-readable-font', 'true');
    } else {
      body.classList.remove('accessibility-readable-font');
      localStorage.setItem('access-readable-font', 'false');
    }
  }, [altoContraste, textoGrande, fuenteFacil]);

  const restaurarValores = () => {
    setAltoContraste(false);
    setTextoGrande(false);
    setFuenteFacil(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[250] flex flex-col items-start font-body">
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 p-5 bg-surface-container-highest border border-outline-variant rounded-2xl shadow-xl w-72 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-outline-variant pb-2">
              <h3 className="font-display font-bold text-on-surface text-base flex items-center gap-2">
                <AccessibilityIcon />
                Ajustes de Accesibilidad
              </h3>
              <button 
                onClick={() => setMenuAbierto(false)}
                className="text-on-surface-variant hover:text-on-surface text-sm p-1"
                aria-label="Cerrar panel de accesibilidad"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Opción 1: Alto Contraste */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface flex items-center gap-2">
                  <Eye size={18} className="text-primary" />
                  Alto Contraste
                </span>
                <button
                  onClick={() => setAltoContraste(!altoContraste)}
                  className={`w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex items-center p-1 ${
                    altoContraste ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                  aria-checked={altoContraste}
                  role="switch"
                  aria-label="Alternar modo de alto contraste"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      altoContraste ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Opción 2: Texto Agrandado */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface flex items-center gap-2">
                  <Type size={18} className="text-primary" />
                  Texto Agrandado
                </span>
                <button
                  onClick={() => setTextoGrande(!textoGrande)}
                  className={`w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex items-center p-1 ${
                    textoGrande ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                  aria-checked={textoGrande}
                  role="switch"
                  aria-label="Alternar tamaño de texto grande"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      textoGrande ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Opción 3: Fuente Fácil Lectura */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  Fácil Lectura
                </span>
                <button
                  onClick={() => setFuenteFacil(!fuenteFacil)}
                  className={`w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex items-center p-1 ${
                    fuenteFacil ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                  aria-checked={fuenteFacil}
                  role="switch"
                  aria-label="Alternar tipografía de fácil lectura"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      fuenteFacil ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Botón de Restaurar */}
            <button
              onClick={restaurarValores}
              className="mt-2 text-xs font-bold text-center text-primary hover:text-primary-container hover:underline py-1"
              aria-label="Restablecer valores predeterminados de accesibilidad"
            >
              Restablecer valores predeterminados
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante Principal */}
      <motion.button
        onClick={() => setMenuAbierto(!menuAbierto)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-primary hover:bg-primary-container text-white p-3.5 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
        aria-label="Menú de accesibilidad"
        aria-expanded={menuAbierto}
      >
        <AccessibilityIcon />
      </motion.button>
    </div>
  );
}
