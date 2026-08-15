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
    descripcion: "Ubicado en el sector Cristales dentro de la vereda Aposentos, el cerro de San Juanito —mejor conocido como el Cerro o Alto de la Cruz— es uno de los miradores naturales más impresionantes del municipio. Desde su cima, ofrece una vista panorámica espectacular de todo el trazado urbano de Simijaca y el paisaje verde que lo rodea. El lugar destaca por tener en su cumbre una icónica cruz blanca, acompañada a lo largo del sendero de ascenso por las estaciones del viacrucis. Más allá de su profundo valor espiritual, el cerro es un punto focal para el ecoturismo y el senderismo (trekking). Sus rutas permiten a los visitantes respirar aire puro, realizar caminatas ecológicas y apreciar la diversidad de flora y fauna nativa en un entorno de reserva que, además, protege importantes recursos hídricos locales. Como atractivo visual adicional, desde el cerro se desprende una hermosa cascada que, vista desde el pueblo, simula un delicado hilo de agua que cae por la montaña.",
    historia: "El Alto de la Cruz ha estado íntimamente ligado a la identidad, la devoción y las tradiciones de los simijenses durante generaciones. Históricamente, se consolidó como el escenario principal de peregrinación católica del municipio, cobrando especial protagonismo durante la Semana Santa, época en la que la comunidad realiza largas procesiones por la ladera de la montaña como acto de fe. Con el paso de los años, su concepción ha evolucionado de ser un espacio exclusivamente de recogimiento religioso a convertirse en un activo fundamental para el turismo rural y paisajístico. El cerro ha sido testigo del paso de campesinos, locales y turistas, consolidándose no solo como un mirador, sino como un guardián del patrimonio natural que conecta el legado cultural y religioso del municipio con la creciente vocación hacia la conservación ambiental y el turismo sostenible.",
    ubicacion: "Vereda Aposentos, Sector Cristales, zona rural de Simijaca, Cundinamarca.",
    imagenes: cruzGallery,
    video: "",
    panorama360: imgCruz360,
    googleMaps: "https://maps.app.goo.gl/a8hotohU7iiYxrPj6"
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
    descripcion: "El monumento del Sagrado Corazón de Jesús es un destacado punto de interés religioso y paisajístico situado en las alturas de uno de los cerros que vigilan el municipio de Simijaca. Concebido como un lugar de peregrinación y recogimiento espiritual, este espacio atrae tanto a devotos locales como a visitantes interesados en el turismo religioso y el senderismo.Desde su base en el cerro, los visitantes son recompensados con una vista panorámica excepcional de la llamada tierra del cielo azul y de los paisajes montañosos del valle. La ascensión ofrece una experiencia que combina el contacto con la naturaleza, el esfuerzo físico moderado y la devoción católica, convirtiendo a esta obra en un referente de paz, meditación y contemplación para toda la región.",
    historia: "La devoción al Sagrado Corazón de Jesús tiene raíces institucionales y culturales muy profundas en Simijaca a lo largo de las décadas. Como reflejo de este fervor, el municipio ha reafirmado su vocación católica en varias ocasiones; un ejemplo notable fue la renovación de la consagración oficial y solemne del municipio al Sagrado Corazón mediante el Decreto No. 0047, firmado el 20 de octubre de 2016 por la Alcaldía Municipal.No obstante, la materialización de la majestuosa estatua en el cerro es un hito de la historia reciente del pueblo. La consolidación e inauguración oficial de esta obra se llevó a cabo el fin de semana del 25 y 26 de noviembre de 2023. Durante esas fechas, la comunidad se unió en una gran peregrinación, caminando desde el centro de Simijaca hacia el cerro para celebrar las vísperas y asistir a la apertura oficial. Desde entonces, el lugar se ha posicionado rápidamente como un nuevo símbolo en la historia religiosa y turística del municipio.",
    ubicacion: "Zona de cerros de Simijaca, Cundinamarca, Colombia (ruta de ascenso desde el casco urbano).",
    imagenes: sagradoGallery,
    video: "",
    panorama360: imgSagrado360,
    googleMaps: "https://maps.google.com/?cid=6314987964198860515"
  },

  {
    id: 5,
    slug: "las-lajas",
    nombre: "Las Lajas",
    categoria: "Natural",
    descripcion: "Las Lajas no es un monumento de un solo punto, sino una de las veredas más ricas en belleza natural y ecoturismo dentro del municipio de Simijaca. Este sector rural se caracteriza por su topografía montañosa, sus formaciones rocosas y sus extensos terrenos de pastos verdes que reflejan la profunda vocación agrícola y ganadera de la región. El área de Las Lajas es el punto de partida y el corredor natural para acceder a algunos de los atractivos ecológicos más importantes del municipio. Desde allí, los visitantes pueden aproximarse a la majestuosa cadena montañosa de los Picos del Sicuara (una serie de nueve cerros que, en su conjunto, simulan el pico o nariz de una lechuza). Además, la zona es reconocida por sus afluentes hídricos y quebradas de piedra natural, convirtiéndose en un escenario ideal para el avistamiento de aves, el turismo de contemplación y la práctica de deportes de aventura o senderismo de montaña.",
    historia: "Históricamente, la vereda Las Lajas y sus zonas aledañas (como la vereda Don Lope) fueron territorios transitados por las comunidades indígenas Muiscas antes de la colonización española. La energía de la zona ha permitido que, con el paso de las generaciones, se conserven relatos y mitos de tradición oral muy arraigados en la cultura de Simijaca. El elemento histórico y místico más relevante asociado a este sector es su cercanía a la Laguna del Colorado, popularmente conocida por los simijenses como la Laguna Encantada. Según los relatos ancestrales, este cuerpo de agua era utilizado por los indígenas para realizar ceremonias y ritos sagrados. Hoy en día, los abuelos del pueblo aún cuentan leyendas sobre apariciones mágicas en la laguna, como patos y gallinas de oro que brillan bajo el agua, manteniendo vivo el misticismo del lugar y atrayendo a los turistas que buscan sumergirse en la cultura local.",
    ubicacion: "Zona rural montañosa del municipio de Simijaca, Cundinamarca (colindante con la vereda Don Lope).",
    imagenes: lajasGallery,
    video: "",
    panorama360: imgLajas360,
    googleMaps: "https://maps.app.goo.gl/qTgTNqAjjji6YXBj7"
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