import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar.jsx
 * Barra de navegación fija en la parte superior.
 * - Muestra el logo SVG de SimiMap
 * - Marca el link activo según la URL actual
 * - aria-current para accesibilidad (WCAG 2.1)
 */
export default function Navbar() {
  // useLocation nos dice en qué ruta estamos ahora mismo
  const location = useLocation();

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">

  <Link to="/" className="navbar__logo" aria-label="SimiMap - Inicio">
  <img 
    src="/logo.svg" 
    alt="SimiMap" 
    className="navbar__logo-img" 
  />
</Link>

      {/* Links de navegación */}
      <div className="navbar__links">
        <Link
          to="/"
          className={`navbar__link ${location.pathname === '/' ? 'navbar__link--activo' : ''}`}
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          Inicio
        </Link>

        <Link
          to="/mapa"
          className={`navbar__link ${location.pathname === '/mapa' ? 'navbar__link--activo' : ''}`}
          aria-current={location.pathname === '/mapa' ? 'page' : undefined}
        >
          Mapa
        </Link>
      </div>

    </nav>
  );
}