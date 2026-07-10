/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ==========================================
        // 🎨 VARIABLES PRINCIPALES (MODIFICABLES)
        // Puedes cambiar estos colores cuando quieras
        // ==========================================
        
        // Primario (verde)
        'primary': '#276b15',
        'primary-container': '#41852d',
        'primary-fixed': '#aaf68f',
        'primary-fixed-dim': '#8fd975',
        
        // Secundario (naranja/ámbar)
        'secondary': '#875200',
        'secondary-container': '#fda21b',
        'secondary-fixed': '#ffddba',
        'secondary-fixed-dim': '#ffb865',
        
        // Terciario (teal/turquesa)
        'tertiary': '#00686c',
        'tertiary-container': '#008389',
        
        // Superficies y Fondo
        'background': '#fcf9f5',
        'surface': '#fcf9f5',
        'surface-dim': '#dcdad6',
        'surface-bright': '#fcf9f5',
        'surface-cream': '#fdfbf2',
        'surface-container': '#f0edea',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3f0',
        'surface-container-high': '#eae8e4',
        'surface-container-highest': '#e5e2df',
        
        // Bordes y Contornos
        'outline': '#717a6a',
        'outline-variant': '#c0c9b8',
        
        // Textos sobre superficies
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-tertiary': '#ffffff',
        'on-surface': '#1b1c1a',
        'on-surface-variant': '#41493c',
        
        // Acentos extras
        'meadow-bg': '#c3f0d5',
        'accent-coral': '#e47468',
        'deep-navy': '#051e67',
        'earth-brown': '#7a473b',
      },
      fontFamily: {
        // Fuentes cargadas en index.html
        'display': ['Anybody', 'sans-serif'],
        'body': ['Be Vietnam Pro', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(1.5rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        mapPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(39, 107, 21, 0.4)) brightness(1.0)' },
          '50%': { filter: 'drop-shadow(0 0 10px rgba(39, 107, 21, 0.8)) brightness(1.05)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        mapPulse: 'mapPulse 3s infinite ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
