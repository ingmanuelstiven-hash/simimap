import imgParqueLaMaria from '../assets/maria/Parque la maria.webp';
import videoLaMaria from '../assets/maria/video/La maria.mp4';
const mariaGaleria = Object.values(
import.meta.glob('../assets/maria/galeria/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' })
);

/**
 * Base de datos local de SimiMap.
 *
 * Cada objeto representa un sitio turístico.
 * Aquí se almacenará toda la información que luego
 * mostraremos en las diferentes páginas.
 */

const sitios = [
  {
    id: 1,
    slug: "parque-principal",
    nombre: "Parque Principal",
    categoria: "Cultural",

    descripcion: "",

    historia: "",

    ubicacion: "",

    imagenes: [],

    video: "",

    panorama360: ""
  },

  {
    id: 2,
    slug: "cerro-de-la-cruz",
    nombre: "Cerro de la Cruz",
    categoria: "Religioso",

    descripcion: "",

    historia: "",

    ubicacion: "",

    imagenes: [],

    video: "",

    panorama360: ""
  },

  {
    id: 3,
    slug: "parroquia-inmaculada-concepcion",
    nombre: "Parroquia Inmaculada Concepción",
    categoria: "Religioso",

    descripcion: "",

    historia: "",

    ubicacion: "",

    imagenes: [],

    video: "",

    panorama360: ""
  },

  {
    id: 4,
    slug: "sagrado-corazon",
    nombre: "Monumento al Sagrado Corazón",
    categoria: "Religioso",

    descripcion: "",

    historia: "",

    ubicacion: "",

    imagenes: [],

    video: "",

    panorama360: ""
  },

  {
    id: 5,
    slug: "las-lajas",
    nombre: "Las Lajas",
    categoria: "Natural",

    descripcion: "",

    historia: "",

    ubicacion: "",

    imagenes: [],

    video: "",

    panorama360: ""
  },

  {
    id: 6,
    slug: "sector-bahama",
    nombre: "Sector El Bahama",
    categoria: "Natural",

    descripcion: "",

    historia: "",

    ubicacion: "",

    imagenes: [],

    video: "",

    panorama360: ""
  },

  {
    id: 7,
    slug: "parque-la-maria",
    nombre: "Parque Recreativo La María",
    categoria: "Recreativo",
    descripcion: "El Parque Ecológico y Recreativo 'La María' es un espacio de esparcimiento, integración y aprovechamiento del tiempo libre que ofrece hermosos paisajes, zonas verdes, un lago, kioscos y áreas de BBQ, parque infantil, pista didáctica de tránsito, salón de eventos, canchas deportivas (fútbol, voleibol y tejo), animales de granja y llamas. Su principal atractivo moderno es el 'Laberinto de La Lechuza', un escenario cultural y ambiental de 1.350 metros cuadrados destinado a la educación ecológica, donde se imparten charlas sobre árboles nativos y se complementa con la visita al vivero municipal 'Héroes de mi Patria'. El parque opera en un ambiente enfocado en el turismo de naturaleza, familiar y educativo, con un horario de atención los sábados, domingos y festivos de 9:00 a.m. a 5:00 p.m.",
    historia: "El terreno del parque fue donado por el señor Agustín Parra, habitante de Simijaca, y actualmente es de propiedad del municipio. La atracción principal del complejo, el 'Laberinto de La Lechuza', inició su construcción en marzo de 2020 utilizando un poco más de 4.000 plantas de Eugenias en una extensión de 1.350 metros cuadrados. Tomó cerca de tres años y unos meses de desarrollo hasta su inauguración oficial, realizada por la Administración Municipal ('Simijaca Nos Une') en cabeza del alcalde Edgar Aguilar Castro, con la presencia de la gestora social María Teresa Suárez y 250 estudiantes de la I.E.D. Agustín Parra.",
    ubicacion: "El parque se encuentra ubicado en una de las entradas al municipio de Simijaca, en el kilómetro 1,5 de la vía que conduce de Simijaca hacia Chiquinquirá (Boyacá) o viceversa. Se sitúa en el lado derecho de la carretera, justo frente a la empresa de productos Gloria Colombia (antes Lechesan), y está integrado dentro del mismo Parque Ecológico y Recreativo La María.",
    imagenes: mariaGaleria,
    video: videoLaMaria,
    panorama360: imgParqueLaMaria,
    googleMaps: "https://www.google.com/maps/place/Parque+Ecol%C3%B3gico+y+Recreativo+La+Mar%C3%ADa/@5.5645,-73.8344,17z"
  }
];

export default sitios;