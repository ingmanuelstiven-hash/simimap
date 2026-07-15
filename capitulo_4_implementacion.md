# 4.4. Fase 4. Implementación de la Aplicación Web

Esta fase comprendió el desarrollo de la aplicación web de una sola página (*SPA - Single Page Application*) **SimiMap**, orientada a la promoción turística, accesibilidad digital e interactividad y descubrimiento del patrimonio cultural y natural del municipio de Simijaca. A partir de los requerimientos y el diseño de la interfaz detallados en las fases previas, se construyó una solución de software funcional estructurada bajo estándares modernos de desarrollo web y accesibilidad.

En esta etapa, se consolidaron los recursos gráficos vectoriales, tarjetas de información dinámica, contenido multimedia enriquecido (fotografía y video) y un mapa cartográfico interactivo de Simijaca modelado directamente en formato SVG (*Scalable Vector Graphics*). Esto permite que el usuario explore los principales atractivos turísticos locales de forma intuitiva, fluida y con microinteracciones adaptadas de manera responsiva a cualquier tipo de dispositivo (ordenadores de escritorio, tabletas y teléfonos móviles).

---

### 4.4.1. Tecnologías y entorno de desarrollo

La implementación técnica de **SimiMap** se estructuró a partir de una pila tecnológica (*tech stack*) moderna de alto rendimiento, cuyas dependencias y herramientas principales se detallan a continuación:

*   **React (v19.2.6):** Biblioteca de JavaScript declarativa basada en componentes para la construcción de interfaces de usuario. Su arquitectura basada en estados locales y la gestión optimizada del *Virtual DOM* garantizan actualizaciones de pantalla rápidas y fluidas al suprimir las recargas completas de la página (*page refreshes*).
*   **React Router DOM (v7.17.0):** Librería de enrutamiento dinámico y declarativo. Gestiona el historial del navegador del lado del cliente, permitiendo crear rutas lógicas (como la navegación al mapa `/mapa` o a fichas detalladas `/sitio/:slug`) sin interrumpir la experiencia de usuario SPA.
*   **Tailwind CSS (v3.4.19):** Framework CSS basado en utilidades de maquetación rápida de bajo nivel. Incorpora un compilador *Just-In-Time* (JIT) que genera dinámicamente un archivo de estilos sumamente compacto con las reglas CSS estrictamente empleadas en producción. Facilitó la aplicación del sistema de diseño (colores accesibles, espaciados y tipografías personalizadas como *Anybody* y *Be Vietnam Pro*).
*   **Framer Motion (v12.42.2):** Motor avanzado de animaciones físicas y gestos interactivos. Se utilizó para orquestar la fluidez y suavidad en las microinteracciones del sistema (desplazamientos de menús laterales, transiciones de pestañas informativas y los efectos de escala/opacidad del visualizador modal de imágenes).
*   **Lucide React (v1.24.0):** Conjunto de iconos vectoriales modernos y minimalistas optimizados para pantallas de alta densidad (Retina) y accesibilidad mediante etiquetas de descripción de texto.
*   **Git y GitHub:** Base del control de versiones distribuido y la gestión colaborativa del software. Git permite llevar un registro cronológico exhaustivo de cada cambio en el código fuente, previniendo la pérdida accidental de datos y facilitando la experimentación segura en ramas (*branches*), además de ofrecer mecanismos ágiles de reversión (*rollback*). GitHub actúa como el repositorio centralizado en la nube donde reside el código fuente estable.
*   **Vercel:** Plataforma en la nube optimizada para el hospedaje y la distribución continua (CI/CD) de aplicaciones front-end. Aloja los archivos estáticos resultantes en su red perimetral de distribución global (*Edge CDN*), garantizando que los recursos web se sirvan desde el nodo físicamente más cercano al usuario para reducir la latencia de red a pocos milisegundos.

---

### 4.4.2. Arquitectura de componentes y flujo de datos

La aplicación sigue una estructura modular orientada a maximizar la reutilización del código, reducir la redundancia y facilitar el mantenimiento futuro. El flujo de datos y el estado general de la SPA se gestionan a través de las siguientes capas:

1.  **Capa de Datos (Módulo JS):** En lugar de utilizar bases de datos pesadas en servidores externos, los datos se centralizaron en [sitios.js](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/datos/sitios.js) utilizando módulos ES de JavaScript. Este archivo contiene los objetos descriptivos estructurados de los siete sitios turísticos de Simijaca. Al usar un módulo ES en lugar de un JSON plano, Vite puede procesar y enlazar de forma nativa los archivos de imágenes, videos y panorámicas 360° durante el proceso de empaquetado, generando optimizaciones como la carga diferida (*lazy loading*).
2.  **Componentes de Renderizado Dinámico:** La información de los atractivos se inyecta dinámicamente en las páginas y componentes (ej. [DetalleSitio.jsx](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/paginas/DetalleSitio.jsx)) mediante rutas dinámicas parametrizadas por React Router (`/sitio/:slug`). De esta forma, una sola estructura visual de interfaz renderiza de forma limpia la información descriptiva de cualquiera de los atractivos turísticos del inventario.
3.  **Gestión de Estado mediante Hooks:** El comportamiento interactivo del cliente es gobernado por Hooks nativos de React:
    *   `useState`: Controla de forma reactiva el estado local de la pestaña activa (`informacion`, `imagenes`, `video`, `360`), la visualización de las instrucciones del mapa 360°, y la selección e índice de la imagen activa en la galería ampliada (*Lightbox*).
    *   `useEffect`: Maneja efectos secundarios como la inicialización y limpieza de listeners del teclado (para navegar la galería con las flechas direccionales), la sincronización de preferencias del panel de accesibilidad con el navegador y el reposicionamiento suave del scroll vertical (`window.scrollTo`) al cambiar entre destinos para mantener una navegación cómoda.

---

### 4.4.3. Implementación del mapa interactivo SVG

El mapa de Simijaca se implementó como una imagen SVG personalizada creada desde cero con la herramienta de diseño Illustrator, la cual se integró directamente en el DOM a través del componente [MapaSVG.jsx](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/componentes/MapaSVG.jsx). Por tanto, no se utilizó como una imagen estática pasiva, sino como un elemento interactivo compuesto por nodos gráficos agrupados por el ID de cada sitio que responden activamente a las acciones del usuario.

Los elementos que representan los sitios turísticos, marcadores y puntos de interés se estructuraron internamente mediante etiquetas de nodos vectoriales SVG como `<g>`, `<path>` y `<rect>`. Para controlar su comportamiento e interactividad dentro de la aplicación, el componente hace uso de un **patrón de delegación de eventos** de React, asociando dinámicamente manejadores de eventos como `onClick`, `onMouseEnter`, `onMouseLeave` y gestos móviles táctiles mediante listeners de escucha asignados sobre el elemento contenedor del DOM:

1.  **Detección Dinámica:** Al hacer clic u operar sobre el mapa, JavaScript sube en el árbol del DOM y captura el grupo vectorial `<g>` más cercano que posea el atributo `id` descriptivo del sitio.
2.  **Lógica de Navegación y Sincronización:** Una vez identificado el nodo seleccionado (ej. `id="Maria"`), el componente invoca la callback `onSelectSite` para actualizar la barra lateral de información y el hook `useNavigate` de React Router para redirigir dinámicamente al usuario hacia la ruta detallada correspondiente (`/sitio/:slug`).
3.  **Retroalimentación por CSS Acelerado por Hardware:** En lugar de saturar el procesador con cálculos lógicos de renderizado de JavaScript durante los estados de hover o selección activa, la interactividad visual (como el efecto de respiración de los iconos y cambio de escala) se delega a la GPU mediante transiciones nativas y la animación `@keyframes mapSitePulse` definida en CSS.

---

### 4.4.4. Integración de contenido multimedia y visualización 360°

La aplicación integró recursos fotográficos, videos y panorámicas de 360° con el propósito de complementar la información textual de los atractivos turísticos y ofrecer una exploración visual más amplia del municipio.

#### A. Visualización panorámica de 360°
Las vistas panorámicas se implementaron mediante **Pannellum**, una herramienta de visualización que permite presentar imágenes equirectangulares en un entorno interactivo. El visor utilizó **WebGL** (aceleración gráfica por hardware 3D) cuando el navegador y el dispositivo lo permitieron, facilitando la exploración de las panorámicas mediante desplazamientos en pantalla, arrastre con cursor o gestos táctiles.

La integración de este componente directo en el DOM (en lugar de iframes externos lentos) permitió presentar contenido inmersivo e interactivo directamente dentro de la ficha turística sin redirigir al usuario a una plataforma externa.

#### B. Carga dinámica de imágenes de galería
Para organizar las imágenes de las galerías, se utilizó la funcionalidad **`import.meta.glob`** de la herramienta de construcción Vite. Esta funcionalidad permitió localizar y cargar de forma programática y asíncrona todos los archivos de imágenes ubicados en directorios específicos de recursos de la aplicación, como:

`src/assets/maria/galeria`

Esta estrategia redujo significativamente la necesidad de declarar manualmente cada importación de imagen individual en el código base, promoviendo la escalabilidad. No obstante, para que una imagen nueva se incorporara automáticamente a la interfaz, debía cumplir con la estructura de carpetas definida y ser procesada por la lógica de mapeo dinámico implementada en la aplicación.

#### C. Optimización y carga de recursos audiovisuales
Las fotografías se almacenaron y sirvieron en el formato de última generación **WebP**, seleccionado estratégicamente por su capacidad de reducir el peso de transferencia de los recursos visuales en un 70% frente a formatos tradicionales como JPG, manteniendo una fidelidad y calidad de visualización web idónea.

Los videos locales (como el recorrido de `La maria.mp4`) se integraron de forma nativa a través del elemento estándar de HTML5:

```html
<video controls>
```

La carga del video se configuró para priorizar la visualización inicial de la página y evitar descargar el contenido audiovisual completo antes de que el usuario decidiera reproducirlo (carga diferida o *lazy loading*). Esta decisión contribuyó a disminuir el consumo inicial de ancho de banda y a acelerar los tiempos de renderizado, especialmente en conexiones móviles y redes celulares de datos limitados.

---

### 4.4.5. Implementación del Panel de Accesibilidad

Con el objetivo de cumplir rigurosamente con las directrices de accesibilidad digital **WCAG 2.1**, se desarrolló el componente transversal [AccesibilidadPanel.jsx](file:///c:/Users/manus/OneDrive/Documents/Maestria/Tesis/desarrollo/3%20Version/src/componentes/AccesibilidadPanel.jsx), con un índice de posición prioritario (`z-[9999]`) sobre cualquier capa visual. Su arquitectura lógica opera de la siguiente manera:

*   **Modo de Alto Contraste:** Al activarse, inyecta dinámicamente la clase `.accessibility-high-contrast` en la etiqueta raíz `body`. Esta clase redefine la paleta de colores a tonos oscuros de alto contraste y bordes de alta visibilidad que cumplen con los ratios de contraste mínimos.
*   **Tipografía Adaptada para Dislexia:** El panel permite cambiar la tipografía del sistema a **Anybody**, una fuente variable diseñada para optimizar la legibilidad y espaciado de letras para personas con dislexia, modificando la clase `.accessibility-readable-font` en el body.
*   **Persistencia entre Sesiones:** Los estados de accesibilidad (alto contraste, tamaño de texto aumentado y fuente legible) se inicializan leyendo directamente del **`localStorage`** del navegador y se guardan tras cada interacción, garantizando que las preferencias del usuario se mantengan activas durante toda su navegación y en futuras visitas.
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
