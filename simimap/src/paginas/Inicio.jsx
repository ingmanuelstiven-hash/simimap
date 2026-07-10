import { Link } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import '../styles/Inicio.css';
import simijBg from '../assets/simij.jpg';

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
  return (
    <div className="inicio">

      {/* Barra de navegación */}
      <Navbar />

      {/* Sección principal */}
      <main role="main">
        <section
          className="hero"
          aria-label="Bienvenida a SimiMap"
        >
          {/* Imagen de fondo cargada desde el JSX */}
          <img 
            src={simijBg} 
            alt="Fondo panorámico de Simijaca" 
            className="hero__background-img" 
          />

          <div className="hero__contenido">

       

            {/* Título principal */}
            <h1 className="hero__titulo">
              Descubre Simijaca como nunca antes
            </h1>

            {/* Descripción */}
            <p className="hero__subtitulo">
              Explora los sitios más representativos del municipio a través de
              fotografías, videos y experiencias inmersivas en 360°.
            </p>

            {/* Botón al mapa */}
            <Link
              to="/mapa"
              className="hero__boton"
              aria-label="Ir al mapa interactivo de Simijaca"
            >
              Explorar el mapa
            </Link>

          </div>
        </section>
      </main>

    </div>
  );
}