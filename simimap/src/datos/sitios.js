import imgParqueLaMaria from '../assets/maria/Parque la maria.webp';

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

    descripcion: "",

    historia: "",

    ubicacion: "",

    imagenes: [],

    video: "",

    panorama360: imgParqueLaMaria
  }
];

export default sitios;