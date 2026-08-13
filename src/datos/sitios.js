// Importar las imágenes panorámicas 360° de cada sitio
import imgParque360 from '../assets/parque/parque.webp';
import imgCruz360 from '../assets/cruz/cruz.webp';
import imgIglesia360 from '../assets/iglesia/iglesia.webp';
import imgSagrado360 from '../assets/sagrado/sagrado corazon.webp';
import imgLajas360 from '../assets/lajas/lajas.webp';
import imgBama360 from '../assets/bama/bama.webp';
import imgMaria360 from '../assets/maria/Parque la maria.webp';

// Importar el video local de Parque La María
import mariaVideo from '../assets/maria/video/La maria.mp4';
import bamavideo from '../assets/bama/video/bama.mp4';
import parqueVideo from '../assets/parque/video/parque.mp4';

// Cargar dinámicamente todas las imágenes de la galería de cada sitio usando import.meta.glob de Vite
const parqueGallery = Object.values(
  import.meta.glob('../assets/parque/galeria/*.webp', { eager: true, import: 'default' })
);
const cruzGallery = Object.values(
  import.meta.glob('../assets/cruz/galeria/*.webp', { eager: true, import: 'default' })
);
const iglesiaGallery = Object.values(
  import.meta.glob('../assets/iglesia/galeria/*.webp', { eager: true, import: 'default' })
);
const bamaGallery = Object.values(
  import.meta.glob('../assets/bama/galeria/*.webp', { eager: true, import: 'default' })
);
const lajasGallery = Object.values(
  import.meta.glob('../assets/lajas/galeria/*.webp', { eager: true, import: 'default' })
);
const sagradoGallery = Object.values(
  import.meta.glob('../assets/sagrado/galeria/*.webp', { eager: true, import: 'default' })
);
const mariaGallery = Object.values(
  import.meta.glob('../assets/maria/galeria/*.webp', { eager: true, import: 'default' })
);

/**
 * Base de datos local de SimiMap.
 *
 * Contiene la información técnica e histórica real de cada sitio
 * turístico del municipio de Simijaca.
 */
const sitios = [
  {
    id: 1,
    slug: "parque-principal",
    nombre: "Parque Principal",
    categoria: "Cultural",
    descripcion: "El Parque Principal de Simijaca es el corazón cultural del municipio, rodeado de arquitectura colonial, jardines coloridos y un ambiente pacífico donde locales y turistas se reúnen cotidianamente.",
    historia: "Históricamente ha sido el centro geográfico y social desde la refundación del municipio, albergando los principales eventos cívicos, políticos y religiosos de la comunidad de Simijaca.",
    ubicacion: "Ubicado en el centro urbano del municipio, entre las Calles 8 y 9 y Carreras 7 y 8.",
    imagenes: parqueGallery,
    video: parqueVideo,
    panorama360: imgParque360,
    googleMaps: "https://www.google.com/maps/place/Parque+Principal+Simijaca"
  },

  {
    id: 2,
    slug: "cerro-de-la-cruz",
    nombre: "Cerro de la Cruz",
    categoria: "Religioso",
    descripcion: "Un mirador natural y centro de peregrinación religiosa que se eleva sobre el municipio, ofreciendo una vista panorámica espectacular de todo el valle de Simijaca.",
    historia: "El Cerro de la Cruz ha sido tradicionalmente escalado durante la Semana Santa por cientos de devotos de la región como un acto de fe, penitencia y espiritualidad.",
    ubicacion: "Sendero peatonal ubicado al costado sur del casco urbano de Simijaca.",
    imagenes: cruzGallery,
    video: "",
    panorama360: imgCruz360,
    googleMaps: ""
  },

  {
    id: 3,
    slug: "parroquia-inmaculada-concepcion",
    nombre: "Parroquia Inmaculada Concepción",
    categoria: "Religioso",
    descripcion: "La iglesia principal de Simijaca, caracterizada por su imponente fachada, sus naves bellamente decoradas y su valor arquitectónico y patrimonial para la región.",
    historia: "Dedicada a la Inmaculada Concepción, patrona del municipio, esta parroquia ha custodiado la fe católica de Simijaca desde su establecimiento.",
    ubicacion: "Ubicada en el marco de la plaza principal de Simijaca.",
    imagenes: iglesiaGallery,
    video: "",
    panorama360: imgIglesia360,
    googleMaps: ""
  },

  {
    id: 4,
    slug: "sagrado-corazon",
    nombre: "Monumento al Sagrado Corazón",
    categoria: "Religioso",
    descripcion: "Un monumento de gran devoción y valor artístico situado en un punto estratégico del municipio, dedicado al Sagrado Corazón de Jesús.",
    historia: "Fue edificado como muestra de fe y consagración del municipio, sirviendo hoy en día como un hito visual y de oración.",
    ubicacion: "Ubicado en el acceso norte del municipio, sobre la vía principal.",
    imagenes: sagradoGallery,
    video: "",
    panorama360: imgSagrado360,
    googleMaps: ""
  },

  {
    id: 5,
    slug: "las-lajas",
    nombre: "Las Lajas",
    categoria: "Natural",
    descripcion: "Hermosa cascada natural rodeada de vegetación nativa. Es un destino ideal para el senderismo, el ecoturismo y la observación de aves en un entorno completamente virgen.",
    historia: "Ha sido un recurso hídrico vital y un espacio de recreación al aire libre apreciado por generaciones de simijacenses.",
    ubicacion: "Vereda Don Lope, aproximadamente a 25 minutos del casco urbano.",
    imagenes: lajasGallery,
    video: "",
    panorama360: imgLajas360,
    googleMaps: ""
  },

  {
    id: 6,
    slug: "sector-bahama",
    nombre: "Sector El Bahama",
    categoria: "Natural",
    descripcion: "Una reserva natural de gran biodiversidad y paisajes andinos. Es un área protegida que resguarda flora y fauna autóctona del altiplano cundiboyacense.",
    historia: "Pulmón ecológico del municipio, es objeto de programas de conservación forestal y ambiental comunitaria.",
    ubicacion: "Vereda El Bahama, sector de reserva forestal al este del municipio.",
    imagenes: bamaGallery,
    video: bamavideo,
    panorama360: imgBama360,
    googleMaps: ""
  },

  {
    id: 7,
    slug: "parque-la-maria",
    nombre: "Parque Recreativo La María",
    categoria: "Recreativo",
    descripcion: "El Parque Ecológico y Recreativo 'La María' es super espacio de esparcimiento, integración y aprovechamiento del tiempo libre que ofrece hermosos paisajes, zonas verdes, un lago, kioscos y áreas de BBQ, parque infantil, pista didáctica de tránsito, salón de eventos, canchas deportivas (fútbol, voleibol y tejo), animales de granja y llamas. Su principal atractivo moderno es el 'Laberinto de La Lechuza', un escenario cultural y ambiental de 1.350 metros cuadrados destinado a la educación ecológica, donde se imparten charlas sobre árboles nativos y se complementa con la visita al vivero municipal 'Héroes de mi Patria'. El parque opera en un ambiente enfocado en el turismo de naturaleza, familiar y educativo, con un horario de atención los sábados, domingos y festivos de 9:00 a.m. a 5:00 p.m.",
    historia: "El terreno del parque fue donado por el señor Agustín Parra, habitante de Simijaca, y actualmente es de propiedad del municipio. La atracción principal del complejo, el 'Laberinto de La Lechuza', inició su construcción en marzo de 2020 utilizando un poco más de 4.000 plantas de Eugenias en una extensión de 1.350 metros cuadrados. Tomó cerca de tres años y unos meses de desarrollo hasta su inauguración oficial, realizada por la Administración Municipal ('Simijaca Nos Une') en cabeza del alcalde Edgar Aguilar Castro, con la presencia de la gestora social María Teresa Suárez y 250 estudiantes de la I.E.D. Agustín Parra.",
    ubicacion: "El parque se encuentra ubicado en una de las entradas al municipio de Simijaca, en el kilómetro 1,5 de la vía que conduce de Simijaca hacia Chiquinquirá (Boyacá) o viceversa. Se sitúa en el lado derecho de la carretera, justo frente a la empresa de productos Gloria Colombia (antes Lechesan), y está integrado dentro del mismo Parque Ecológico y Recreativo La María.",
    imagenes: mariaGallery,
    video: mariaVideo,
    panorama360: imgMaria360,
    googleMaps: "https://www.google.com/maps/place/Parque+Ecol%C3%B3gico+y+Recreativo+La+Mar%C3%ADa/@5.5645,-73.8344,17z"
  }
];

export default sitios;