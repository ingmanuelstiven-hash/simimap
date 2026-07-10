import { Link, useLocation } from 'react-router-dom';
import logoSimimap from '../assets/logo_simimap.svg';


export default function Navbar() {
 
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center py-3.5 px-4 md:py-4 md:px-8 bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-[100]" role="navigation" aria-label="Navegación principal">

      <Link to="/" className="flex items-center min-w-[150px] h-[50px] no-underline" aria-label="SimiMap - Inicio">
        <img 
          src={logoSimimap} 
          alt="SimiMap" 
          className="block h-full w-auto" 
        />
      </Link>

      {/* Links de navegación */}
      <div className="flex gap-4 md:gap-6">
        <Link
          to="/"
          className={`font-body text-[0.9rem] md:text-base text-on-surface no-underline font-medium py-1 border-b-2 transition-all duration-200 ease-in-out hover:text-primary hover:border-primary focus-visible:text-primary focus-visible:border-primary focus-visible:outline-none ${
            location.pathname === '/' ? 'text-primary border-primary' : 'border-transparent'
          }`}
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          Inicio
        </Link>

        <Link
          to="/mapa"
          className={`font-body text-[0.9rem] md:text-base text-on-surface no-underline font-medium py-1 border-b-2 transition-all duration-200 ease-in-out hover:text-primary hover:border-primary focus-visible:text-primary focus-visible:border-primary focus-visible:outline-none ${
            location.pathname === '/mapa' ? 'text-primary border-primary' : 'border-transparent'
          }`}
          aria-current={location.pathname === '/mapa' ? 'page' : undefined}
        >
          Mapa
        </Link>
      </div>

    </nav>
  );
}
