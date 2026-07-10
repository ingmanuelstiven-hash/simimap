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
      }
    },
  },
  plugins: [],
}
