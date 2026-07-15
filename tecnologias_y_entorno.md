# Tecnologías y Entorno de Desarrollo

Este capítulo detalla la arquitectura de software, las herramientas de desarrollo, las librerías especializadas y la infraestructura tecnológica utilizada para la concepción, diseño e implementación de **SimiMap**. La selección de esta pila tecnológica (*tech stack*) responde a criterios de rendimiento, scalabilidad, accesibilidad y experiencia de usuario inmersiva bajo el enfoque de aplicaciones web modernas de una sola página (*SPA - Single Page Application*).

---

## 1. Núcleo de Desarrollo Frontend

### React (v19.2.6)
Para la construcción de la interfaz de usuario se seleccionó **React**, una biblioteca de JavaScript de código abierto basada en componentes. 
*   **Justificación técnica:** React implementa un modelo de programación declarativo y hace uso del *Virtual DOM* para optimizar las actualizaciones de la interfaz. Esto asegura que los cambios de estado (como filtros de búsqueda, selección de sitios en el mapa o apertura de galerías) se rendericen de manera sumamente eficiente y sin recargas de página completas.
*   **Uso en el proyecto:** Se estructuró la aplicación en componentes modulares y reutilizables (ej. `Navbar`, `Footer`, `MapaSVG`, `AccesibilidadPanel`), garantizando la separación de responsabilidades y facilitando el mantenimiento del código.

### React Router DOM (v7.17.0)
Es el estándar para la gestión de enrutamiento dinámico en aplicaciones SPA construidas con React.
*   **Justificación técnica:** Permite mapear URLs del navegador a componentes específicos de forma declarativa, gestionando el historial del navegador de manera interna.
*   **Uso en el proyecto:** Controla la navegación lógica del sistema (ej. ruta principal `/`, vista del mapa interactivo `/mapa`, y páginas dinámicas de detalle `/sitio/:slug`), permitiendo el paso de parámetros en URL para recuperar dinámicamente la información de la base de datos local.

---

## 2. Visualización Inmersiva 360° (Realidad Virtual)

### Pannellum (v1.2.4)
Para la integración del visor panorámico de realidad virtual, se utilizó **Pannellum** a través de su abstracción adaptada para el ecosistema de React (`pannellum-react`).
*   **Justificación técnica:** Pannellum es un visor de panoramas integrado para la web, desarrollado utilizando HTML5, CSS3 y la API gráfica de **WebGL**. Al no depender de plugins externos pesados, proporciona un rendimiento fluido y acelerado por hardware directamente en navegadores móviles y de escritorio.
*   **Uso en el proyecto:** Permite el renderizado tridimensional de proyecciones equirectangulares (fotografías 360°). Los usuarios pueden interactuar mediante gestos táctiles o el ratón para rotar la cámara y explorar interactivamente el entorno espacial del atractivo seleccionado.

---

## 3. Diseño Visual y Maquetación Responsiva

### Tailwind CSS (v3.4.19)
Es un marco de trabajo de CSS (*framework*) basado en utilidades de bajo nivel para el diseño rápido de interfaces.
*   **Justificación técnica:** Tailwind opera mediante un compilador *Just-In-Time* (JIT), el cual analiza los archivos fuente de React y genera de forma dinámica únicamente el CSS utilizado en producción. Esto reduce drásticamente el peso de las hojas de estilo enviadas al cliente.
*   **Uso en el proyecto:** Facilitó la creación del sistema de diseño propuesto en la guía de estilo (colores accesibles, tipografías personalizadas como *Anybody* y *Be Vietnam Pro*), y permitió asegurar la adaptabilidad responsiva integral en pantallas móviles, tabletas y computadoras mediante prefijos como `md:` y `lg:`.

### PostCSS y Autoprefixer (v10.5.2)
*   **Justificación técnica:** PostCSS procesa el código CSS final de Tailwind y **Autoprefixer** se encarga de inyectar de forma automatizada los prefijos de compatibilidad de los navegadores (ej. `-webkit-`, `-moz-`). Esto asegura que las transiciones, cuadrículas y propiedades avanzadas se visualicen correctamente en todas las versiones de navegadores móviles y de escritorio.

---

## 4. Dinamismo y Microinteracciones

### Framer Motion (v12.42.2)
Es una librería especializada en animaciones físicas listas para producción en el ecosistema React.
*   **Justificación técnica:** Framer Motion maneja los estados de entrada y salida del árbol del DOM (mediante componentes como `AnimatePresence`) de forma limpia, sincronizando animaciones complejas basadas en físicas de resortes (*springs*) en lugar de duraciones rígidas.
*   **Uso en el proyecto:** Se utilizó para dar fluidez y transiciones orgánicas a la interfaz, incluyendo:
    *   La entrada suave de los paneles informativos.
    *   El deslizamiento y desvanecimiento de las pestañas en la vista de detalle.
    *   El efecto de ampliación, arrastre y navegación de imágenes en la galería interactiva (*Lightbox*).

---

## 5. Control de Versiones y Gestión Colaborativa

### Git y GitHub
**GitHub** es la plataforma de desarrollo y alojamiento en la nube utilizada para la gestión del repositorio de control de versiones fundamentado en **Git**.
*   **Justificación técnica:** El uso de control de versiones distribuido con Git permite realizar un seguimiento exhaustivo y cronológico de cada modificación realizada en el código fuente. Esto previene la pérdida de datos, facilita la experimentación segura mediante la creación de ramificaciones (*branches*) y proporciona mecanismos de reversión ante posibles fallos de software.
*   **Uso en el proyecto:** GitHub actúa como el repositorio centralizado donde se aloja el código fuente definitivo de **SimiMap**. A través de commits semánticos y estructurados, se mantiene un historial transparente del desarrollo de la tesis. Asimismo, actúa como el puente de integración directa con la infraestructura de despliegue mediante *webhooks* automatizados.

---

## 6. Entorno de Desarrollo y Compilación

### Vite (v8.0.12)
Es una herramienta moderna de construcción frontend y servidor de desarrollo local que sustituye arquitecturas heredadas como *Create React App* (Webpack).
*   **Justificación técnica:** Vite hace uso de módulos ES nativos del navegador (*ES Modules*) para servir el código en desarrollo casi instantáneamente. Para el despliegue de producción, utiliza el empaquetador **Rollup**, realizando optimizaciones avanzadas como división de código (*code-splitting*), remoción de código muerto (*tree-shaking*) y compresión de recursos.
*   **Uso en el proyecto:** Orquesta la ejecución del servidor de pruebas local rápido con reemplazo en caliente de módulos (HMR) y gestiona el empaquetado optimizado en la carpeta `/dist`.

### Node.js y npm
*   Representan el entorno de ejecución de JavaScript del lado del servidor y el gestor de dependencias del proyecto, respectivamente, necesarios para instalar y administrar todas las librerías del ecosistema de desarrollo.

---

## 7. Despliegue y Distribución en la Nube

### Vercel (Plataforma Serverless y Edge CDN)
El despliegue, distribución y alojamiento en producción de **SimiMap** se realiza mediante **Vercel**, una plataforma en la nube optimizada para el alojamiento de aplicaciones frontend modernas de alto rendimiento.

*   **Arquitectura de Distribución Global (Edge Network):** Vercel aloja los archivos estáticos resultantes del build (`/dist`) en su red global de distribución de contenido (*Edge CDN*). Esto significa que la aplicación no corre en un servidor central geográficamente distante, sino que está distribuida en cientos de servidores perimetrales (*Edge Nodes*) en todo el mundo. Cuando un usuario accede a SimiMap, los recursos son provistos por el servidor físicamente más cercano a su ubicación, minimizando la latencia de red y logrando un tiempo de carga inicial (*TTFB - Time to First Byte*) de pocos milisegundos.
*   **Pipeline de Integración y Despliegue Continuo (CI/CD):** Se implementó un flujo automatizado de DevOps que conecta directamente el repositorio de GitHub con los servidores de Vercel. Este pipeline funciona bajo el siguiente flujo:
    1.  **Detección:** El desarrollador realiza un envío (*push*) de cambios a la rama `main` de GitHub.
    2.  **Webhook Trigger:** GitHub alerta automáticamente a Vercel mediante un *webhook*.
    3.  **Entorno Aislado:** Vercel levanta un contenedor aislado temporal, clona el código fuente e instala las dependencias.
    4.  **Compilación y Optimización:** Ejecuta de forma segura el comando `npm run build` administrado por Vite y Rollup.
    5.  **Despliegue Atómico:** Si la compilación es exitosa, los nuevos archivos estáticos reemplazan la versión anterior de forma atómica e instantánea. Si el build falla en algún punto, el despliegue se cancela automáticamente, manteniendo la versión anterior estable sin caída del servicio.
*   **Gestión Eficiente de Caché (Cache-Busting):** Debido a que la SPA está alojada en un CDN, el sistema de despliegue trabaja en conjunto con la estrategia de compilación de Vite. Los nombres de los recursos se versionan con códigos hash únicos en cada compilación (ej. `index-CNVU0LsH.js`). Vercel configura cabeceras HTTP de caché agresivas de largo plazo para estos archivos hashed, ya que garantiza que cuando se realice una nueva actualización, el cliente descargará únicamente los archivos modificados con nuevos nombres (*cache-busting*), evitando problemas de inconsistencia visual para el usuario final.
*   **Protocolos Modernos y Seguridad:** La distribución se realiza haciendo uso automático de protocolos de red modernos como **HTTP/2** y **HTTP/3 (QUIC)**, los cuales permiten la multiplexación de descargas (carga simultánea de scripts, estilos e imágenes 360° en una sola conexión TCP/UDP). En términos de seguridad, la plataforma provee cifrado de extremo a extremo mediante certificados SSL generados de forma automática (HTTPS mediante *Let's Encrypt*), protección ante ataques de denegación de servicio (*DDoS*) de capa 3, 4 y 7, y aislamiento completo a nivel de red.
