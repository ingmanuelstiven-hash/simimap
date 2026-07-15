# 4.4. Fase 4. Implementación de la Aplicación Web

Esta fase comprendió el desarrollo de la aplicación web de una sola página (*SPA - Single Page Application*) **SimiMap**, orientada a la promoción turística, accesibilidad digital e interactividad y descubrimiento del patrimonio cultural y natural del municipio de Simijaca. A partir de los requerimientos y el diseño de la interfaz detallados en las fases previas, se construyó una solución de software funcional estructurada bajo estándares modernos de desarrollo web y accesibilidad.

En esta etapa, se consolidaron los recursos gráficos vectoriales, tarjetas de información dinámica, contenido multimedia enriquecido (fotografía y video) y un mapa cartográfico interactivo de Simijaca modelado directamente en formato SVG (*Scalable Vector Graphics*). Esto permite que el usuario explore los principales atractivos turísticos locales de forma intuitiva, fluida y con microinteracciones adaptadas de manera responsiva a cualquier tipo de dispositivo (ordenadores de escritorio, tabletas y teléfonos móviles).

---

### 4.4.1. Tecnologías y entorno de desarrollo

La implementación técnica de **SimiMap** se estructuró a partir de una pila tecnológica (*tech stack*) moderna de alto rendimiento, cuyas dependencias y herramientas principales se detallan a continuación:

*   **React (v19.2.6):** Biblioteca de JavaScript declarativa basada en componentes para la construcción de interfaces de usuario. Su arquitectura basada en estados locales y la gestión optimizada del *Virtual DOM* garantizan actualizaciones de pantalla rápidas y fluidas al suprimir las recargas completas de la página (*page refreshes*).
*   **React Router DOM (v7.17.0):** Librería de enrutamiento dinámico y declarativo. Gestiona el historial del navegador del lado del cliente, permitiendo crear rutas lógicas (como la navegación al mapa `/mapa` o a fichas detalladas `/sitio/:slug`) sin interrumpir la experiencia de usuario SPA.
*   **Pannellum (v1.2.4):** Visor panorámico inmersivo de código abierto integrado para la Web a través de su adaptación de React (`pannellum-react`). Utiliza APIs estándar de **WebGL** (gráficos 3D por hardware) y proyecciones equirectangulares, permitiendo a los usuarios interactuar y rotar libremente imágenes en 360° sin necesidad de instalar complementos externos.
*   **Tailwind CSS (v3.4.19):** Framework CSS basado en utilidades de maquetación rápida de bajo nivel. Incorpora un compilador *Just-In-Time* (JIT) que genera dinámicamente un archivo de estilos sumamente compacto con las reglas CSS estrictamente empleadas en producción. Facilitó la aplicación del sistema de diseño (colores accesibles, espaciados y tipografías personalizadas como *Anybody* y *Be Vietnam Pro*).
*   **Framer Motion (v12.42.2):** Motor avanzado de animaciones físicas y gestos interactivos. Se utilizó para orquestar la fluidez y suavidad en las microinteracciones del sistema (desplazamientos de menús laterales, transiciones de pestañas informativas y los efectos de escala/opacidad del visualizador modal de imágenes).
*   **Lucide React (v1.24.0):** Conjunto de iconos vectoriales modernos y minimalistas optimizados para pantallas de alta densidad (Retina) y accesibilidad mediante etiquetas de descripción de texto.
*   **Git y GitHub:** Base del control de versiones distribuido y la gestión colaborativa del software. Git permite llevar un registro cronológico exhaustivo de cada cambio en el código fuente, previniendo la pérdida accidental de datos y facilitando la experimentación segura en ramas (*branches*), además de ofrecer mecanismos ágiles de reversión (*rollback*). GitHub actúa como el repositorio centralizado en la nube donde reside el código fuente estable.
*   **Vercel:** Plataforma en la nube optimizada para el hospedaje y la distribución continua (CI/CD) de aplicaciones front-end. Aloja los archivos estáticos resultantes en su red perimetral de distribución global (*Edge CDN*), garantizando que los recursos web se sirvan desde el nodo físicamente más cercano al usuario para reducir la latencia de red a pocos milisegundos.

---

### 4.4.2. Arquitectura de componentes y flujo de datos

La aplicación sigue una estructura estrictamente modular orientada a maximizar la reutilización del código, reducir la redundancia y facilitar el mantenimiento futuro. El flujo de datos y el estado general de la SPA se gestionan a través de las siguientes capas:

1.  **Capa de Datos (Módulo JS):** En lugar de utilizar bases de datos pesadas en servidores externos, los datos se centralizaron en [sitios.js](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/datos/sitios.js) utilizando módulos ES de JavaScript. Este archivo contiene los objetos descriptivos estructurados de los siete sitios turísticos de Simijaca. Al usar un módulo ES en lugar de un JSON plano, Vite puede procesar y enlazar de forma nativa los archivos de imágenes, videos y panorámicas 360° durante el proceso de empaquetado, generando optimizaciones como la carga diferida (*lazy loading*).
2.  **Componentes de Renderizado Dinámico:** La información de los atractivos se inyecta dinámicamente en las páginas y componentes (ej. [DetalleSitio.jsx](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/paginas/DetalleSitio.jsx)) mediante rutas dinámicas parametrizadas por React Router (`/sitio/:slug`). De esta forma, una sola estructura visual de interfaz renderiza de forma limpia la información descriptiva de cualquiera de los atractivos turísticos del inventario.
3.  **Gestión de Estado mediante Hooks:** El comportamiento interactivo del cliente es gobernado por Hooks nativos de React:
    *   `useState`: Controla de forma reactiva el estado local de la pestaña activa (`informacion`, `imagenes`, `video`, `360`), la visualización de las instrucciones del mapa 360°, y la selección e índice de la imagen activa en la galería ampliada (*Lightbox*).
    *   `useEffect`: Maneja efectos secundarios como la inicialización y limpieza de listeners del teclado (para navegar la galería con las flechas direccionales), la sincronización de preferencias del panel de accesibilidad con el navegador y el reposicionamiento suave del scroll vertical (`window.scrollTo`) al cambiar entre destinos para mantener una navegación cómoda.

---

### 4.4.3. Implementación del mapa interactivo SVG

El mapa interactivo de Simijaca no es una imagen gráfica pasiva, sino un lienzo vectorial estructurado como una serie de nodos XML integrados directamente en el DOM mediante el componente de React [MapaSVG.jsx](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/componentes/MapaSVG.jsx).

*   **Interactividad basada en eventos React:** Cada marcador y punto de interés gráfico en el SVG (representados por elementos `<g>`, `<path>` y `<rect>`) está vinculado directamente a manejadores de eventos nativos de React como `onClick`, `onMouseEnter` y `onMouseLeave`.
*   **Lógica de Navegación y Sincronización de Estados:** Al interactuar con un área del mapa, el sistema captura el identificador textual (*ID/slug*) asignado al atractivo. Al hacer doble clic o pulsar en los accesos de información detallada, el componente hace uso del hook `useNavigate` de React Router para redirigir dinámicamente al usuario a la URL asociada (`/sitio/:slug`), cargando la ficha correspondiente de forma instantánea.
*   **Animaciones y Retroalimentación por CSS:** Se diseñó la animación `@keyframes mapSitePulse` en `index.css`, la cual aplica transiciones fluidas de color y escala (efecto de latido/respiración) en los marcadores activos (`.svg-grupo-activo`) y en estados de hover. Al ejecutarse directamente mediante la GPU del navegador por transiciones de hardware CSS, se evita el consumo de memoria del hilo de JavaScript, logrando una tasa de refresco constante en teléfonos inteligentes.

---

### 4.4.4. Integración de contenido multimedia y visualización 360°

Para lograr una promoción turística inmersiva efectiva, la aplicación organiza y presenta recursos visuales de alta fidelidad optimizados para el consumo web móvil:

*   **Visor Panorámico 360° (Pannellum y WebGL):** La visualización tridimensional interactiva se realiza mediante el componente `Pannellum`. A diferencia de los iframes pesados que ralentizan la carga y limitan el control de eventos, Pannellum renderiza las imágenes panorámicas proyectándolas directamente dentro de un contenedor esférico tridimensional utilizando WebGL acelerado por hardware. Esto permite una exploración espacial sumamente fluida en pantallas táctiles y de alta densidad.
*   **Importación Dinámica de Galería:** Se implementó una importación dinámica mediante `import.meta.glob` de Vite en la base de datos local. Esto escanea la carpeta `src/assets/maria/galeria` de forma automatizada. Así, se elimina la necesidad de declarar decenas de imports de imágenes en código duro, facilitando la escalabilidad del sistema: basta con añadir imágenes en la carpeta del proyecto para que aparezcan en el sitio web.
*   **Optimización de Medios:** Las fotografías fueron procesadas en formato de última generación **WebP**, reduciendo el tamaño promedio de descarga en un 70% en relación con formatos JPG tradicionales. Para los videos locales (como `La maria.mp4`), se integraron mediante el elemento nativo de HTML5 `<video controls>` que realiza carga diferida (*lazy loading*) para evitar el consumo de ancho de banda hasta que el usuario decida reproducirlo.

---

### 4.4.5. Implementación del Panel de Accesibilidad

Con el objetivo de cumplir rigurosamente con las directrices de accesibilidad digital **WCAG 2.1**, se desarrolló el componente transversal [AccesibilidadPanel.jsx](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/componentes/AccesibilidadPanel.jsx), con un índice de posición prioritario (`z-[9999]`) sobre cualquier capa visual. Su arquitectura lógica opera de la siguiente manera:

*   **Modo de Alto Contraste:** Al activarse, inyecta dinámicamente la clase `.accessibility-high-contrast` en la etiqueta raíz `body`. Esta clase redefine globalmente los tokens y variables de color CSS del proyecto, invirtiendo la paleta de colores a tonos oscuros de alto contraste y bordes de alta visibilidad que cumplen con los ratios de contraste mínimos.
*   **Tipografía Adaptada para Dislexia:** El panel permite cambiar la tipografía del sistema a **Anybody**, una fuente variable diseñada para optimizar la legibilidad y espaciado de letras para personas con dislexia. Esto se gestiona modificando la clase `.accessibility-readable-font` en el body.
*   **Persistencia entre Sesiones:** Los estados de accesibilidad (alto contraste, tamaño de texto aumentado y fuente legible) se inicializan leyendo directamente del **`localStorage`** del navegador y se guardan tras cada interacción. Esto garantiza que las preferencias de accesibilidad del usuario se mantengan activas durante toda su navegación y en futuras visitas, sin perderse al recargar la página.
*   **Semántica y Roles ARIA:** Se implementó una estructura HTML5 semántica clara (`<header>`, `<main>`, `<footer>`, `<article>`) respaldada por atributos ARIA (como `role="tablist"`, `aria-selected` y `aria-label`) para asegurar que tecnologías de asistencia (como lectores de pantalla) puedan interpretar la estructura y el contenido con precisión.

#### Tabla 12. Accesibilidad propuesta por componente

| Componente | Atributos ARIA / HTML | Soporte teclado | Propósito accesible |
| :--- | :--- | :--- | :--- |
| **Mapa interactivo (SVG)** | `tabindex="0"`, `role="button"`, `aria-label` | `Enter` y `Space` | Selección y exploración de sitios turísticos sin uso de ratón; lectura por software de asistencia. |
| **Sistema de pestañas** | `role="tablist"`, `role="tab"`, `aria-selected` | `Tab` y flechas direccionales | Navegación e identificación estructurada entre secciones con estado visual activo. |
| **Botones e íconos** | `aria-label`, `aria-hidden="true"` (íconos decorativos) | `Tab`, `Enter` / `Space` | Descripción auditiva de acciones y ocultamiento de ruido decorativo en lectores de pantalla. |
| **Visor 360° (WebGL)**| `title="Vista interactiva 360 de [lugar]"` | Controles direccionales | Identificación clara de contenido incrustado tridimensional para tecnologías de asistencia. |
| **Galería de imágenes** | `alt` descriptivo y dinámico | Flechas `←`, `→` y `Esc` | Contexto descriptivo detallado a usuarios invidentes y controles interactivos por teclado. |

*Fuente: Elaboración propia.*

---

### 4.4.6. Despliegue e Infraestructura CI/CD

El ciclo de vida del desarrollo de software de SimiMap concluyó con la implementación de una canalización moderna de Integración y Despliegue Continuo (CI/CD):

*   **Repositorio Centralizado en GitHub:** Se utilizó GitHub para alojar de manera segura el código fuente, utilizando un flujo basado en la rama `main` para las versiones estables. Cada commit semántico documenta el desarrollo y las correcciones de errores, asegurando la integridad del trabajo.
*   **Distribución Global Serverless en Vercel:** Vercel está vinculado directamente al repositorio de GitHub mediante *webhooks*. Cada vez que se realiza un envío de código (*push*), Vercel aprovisiona un entorno aislado en la nube que ejecuta las validaciones y el build final. Si la compilación es exitosa, los recursos del frontend se distribuyen a través de su red global de distribución de contenido (*Edge CDN*). Esto asegura una velocidad de carga uniforme a nivel mundial y proporciona un entorno de producción real idéntico al que consultarán los usuarios, facilitando las evaluaciones sobre dispositivos físicos reales.
