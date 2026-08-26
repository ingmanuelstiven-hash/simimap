// Importar imagenes 360
import imgParque360 from '../assets/parque/parque.webp';
import imgCruz360 from '../assets/cruz/cruz.webp';
import imgIglesia360 from '../assets/iglesia/iglesia.webp';
import imgSagrado360 from '../assets/sagrado/sagrado corazon.webp';
import imgLajas360 from '../assets/lajas/lajas.webp';
import imgBama360 from '../assets/bama/bama.webp';
import imgMaria360 from '../assets/maria/Parque la maria.webp';


// Importar los videos
import mariaVideo from '../assets/maria/video/La maria.mp4';
import bamavideo from '../assets/bama/video/bama.mp4';
import parqueVideo from '../assets/parque/video/parque.mp4';
import cerrocruzvideo from '../assets/cruz/video/cruz.mp4'
import sagradocorazonvideo from '../assets/sagrado/video/sagrado corazon.mp4';
import iglesiaVideo from '../assets/iglesia/video/Iglesia principal.mp4';
import lajasVideo from '../assets/lajas/video/Las lajas.mp4';

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

//Datos de sitios turisticos de Simijaca}

const sitios = [
  {
    id: 1,
    slug: "parque-principal",
    nombre: "Parque Principal",
    categoria: "Cultural",
    descripcion: `El Parque Principal de Simijaca es el núcleo urbano, social y cultural del municipio, un espacio exclusivamente peatonal diseñado para el esparcimiento, la meditación y la convivencia. En su distribución actual, fruto de la modernización arquitectónica de finales del siglo XX, el parque destaca por sus amplias materas construidas en piedra, un generoso espacio central abierto y una pila moderna que adorna el paisaje.
    Es un punto de encuentro rodeado de jardines, ideal para caminar y descansar. Visualmente, el parque está dominado por la imponente Parroquia de la Inmaculada Concepción, cuyo frontis con dos torres laterales alberga el campanario y un reloj clásico. La atmósfera del parque hace honor al apelativo de Simijaca como la "tierra del cielo azul", ofreciendo a locales y turistas un respiro tranquilo en el corazón de las montañas cundinamarquesas.`,
    historia: `El parque se ubica exactamente en el mismo lugar donde fue trazado durante la fundación definitiva del municipio, el 14 de agosto de 1600, llevada a cabo por el Oidor Luis Enríquez y el Juez Poblador Juan López de Linares. Fiel a la vida colonial y al modelo español de trazado en damero, esta plaza principal dio origen a la organización urbana y política de la época, conformando un núcleo cívico tradicional rodeado por la parroquia y la casa de gobierno.
    A lo largo de los siglos, la plaza ha sido testigo invaluable de la evolución arquitectónica, las tradiciones religiosas y las vivencias de los habitantes. La memoria local y las fotografías antiguas revelan que, a principios del siglo XX, el parque era una plaza de tierra que los días lunes se transformaba en el agitado epicentro comercial del pueblo. En sus espacios se ubicaban lotes de ganado, ventas de líchigo, papa, cereales y verduras directamente en el suelo, mientras que en toldos se ofreciían comidas y bebidas, y en estructuras de madera operaba el tradicional batán.
    La transformación hacia el parque moderno que conocemos hoy se dio en dos grandes etapas:
    La intervención de 1965: A mediados de este año, el mercado de ganado y víveres fue trasladado a la Plazuela. El parque fue pavimentado en concreto y se adecuaron canchas múltiples para básquetbol y microfútbol, junto con jardines ornamentales. En esta época, el paisaje del parque estaba marcado por cuatro grandes palmeras y el busto de Policarpa Salavarrieta ("La Pola").
    La remodelación de 1988: A finales de la década de los ochenta, bajo la administración del alcalde Luis Blanco, surgió la iniciativa de embellecer definitivamente el espacio, gestionando diseños con la Universidad de los Andes y la CAR. La obra fue ejecutada en 1988 bajo la administración de Fabio Peña. En esta etapa definitiva se eliminaron las zonas deportivas (trasladándolas a la Plazuela) y el busto de "La Pola" fue reubicado en la escuela homónima. Así, el parque adoptó su diseño actual con amplias zonas duras, materas de piedra y la pila central, destinando el espacio para el uso exclusivo de los peatones.`,
    ubicacion: "Dirección: Carrera 7 No. 7-42, en el núcleo urbano de Simijaca, Cundinamarca, Colombia. Punto de referencia: Parque Principal de Simijaca.",
    imagenes: parqueGallery,
    video: parqueVideo,
    panorama360: imgParque360,
    googleMaps: "https://maps.google.com/?cid=13074639822615455531"
  },

  {
    id: 2,
    slug: "cerro-de-la-cruz",
    nombre: "Cerro de la Cruz",
    categoria: "Religioso",
    descripcion: `Ubicado en el sector Cristales dentro de la vereda Aposentos, el cerro de San Juanito —mejor conocido como el Cerro o Alto de la Cruz— es uno de los miradores naturales más impresionantes del municipio. Desde su cima, ofrece una vista panorámica espectacular de todo el trazado urbano de Simijaca y el paisaje verde que lo rodea.
    El lugar destaca por tener en su cumbre una icónica cruz blanca, acompañada a lo largo del sendero de ascenso por las estaciones del viacrucis. Más allá de su profundo valor espiritual, el cerro es un punto focal para el ecoturismo y el senderismo (trekking). Sus rutas permiten a los visitantes respirar aire puro, realizar caminatas ecológicas y apreciar la diversidad de flora y fauna nativa en un entorno de reserva que, además, protege importantes recursos hídricos locales. Como atractivo visual adicional, desde el cerro se desprende una hermosa cascada que, vista desde el pueblo, simula un delicado hilo de agua que cae por la montaña.`,
    historia: `El Alto de la Cruz ha estado íntimamente ligado a la identidad, la devoción y las tradiciones de los simijenses durante generaciones. Históricamente, se consolidó como el escenario principal de peregrinación católica del municipio, cobrando especial protagonismo durante la Semana Santa, época en la que la comunidad realiza largas procesiones por la ladera de la montaña como acto de fe. Con el paso de los años, su concepción ha evolucionado de ser un espacio exclusivamente de recogimiento religioso a convertirse en un activo fundamental para el turismo rural y paisajístico. El cerro ha sido testigo del paso de campesinos, locales y turistas, consolidándose no solo como un mirador, sino como un guardián del patrimonio natural que conecta el legado cultural y religioso del municipio con la creciente vocación hacia la conservación ambiental y el turismo sostenible.`,
    ubicacion: `Vereda Aposentos, Sector Cristales, zona rural de Simijaca, Cundinamarca.`,
    imagenes: cruzGallery,
    video: cerrocruzvideo,
    panorama360: imgCruz360,
    googleMaps: "https://maps.app.goo.gl/a8hotohU7iiYxrPj6"
  },

  {
    id: 3,
    slug: "parroquia-inmaculada-concepcion",
    nombre: "Parroquia Inmaculada Concepción",
    categoria: "Religioso",
    descripcion: `El Templo de la Parroquia de la Inmaculada Concepción es la joya arquitectónica y el corazón espiritual del municipio. En la actualidad, esta imponente edificación domina visualmente el paisaje del Parque Principal y funciona como el epicentro vivo de las celebraciones católicas, congregando a locales y turistas durante la Semana Santa, las fiestas patronales y el día a día del pueblo.
    A nivel arquitectónico, el templo deslumbra hoy con un diseño majestuoso y detalles invaluables: Fachada y Exterior: Su frontis está constituido por dos grandes torres que albergan el campanario y un reloj clásico (que forma parte de la memoria visual del municipio, aunque actualmente no se encuentre en funcionamiento). La estructura exterior está cimentada sólidamente con centenares de rocas traídas de diversas fincas locales y ladrillos procesados tradicionalmente en la vía al Salitre.     Diseño Interior: Al cruzar sus puertas, los visitantes encuentran una nave central y dos laterales amplias, rematadas en sus techos con imponentes bóvedas de crucería. El peso de la estructura descansa sobre elegantes columnas con capiteles de estilo griego corintio, adornados con fustes rojos y terminaciones doradas. Arte y Devoción: Grandes y coloridos ventanales permiten un hermoso juego de luz natural por las mañanas. El altar mayor, elaborado en mármol y madera fina, resguarda una imagen de Jesús crucificado y cuenta con un altar de piedra para la eucaristía. A través de sus naves laterales y el deambulatorio, los feligreses pueden visitar la imagen de la Inmaculada Concepción, el altar de Santa Lucía, el Divino Niño Jesús y el clásico Bautisterio con su pila de roca.`,
    historia: `El majestuoso templo actual se levanta exactamente sobre la misma huella del antiguo santuario, una modesta construcción de 1842 hecha de ladrillos de barro y teja de arcilla. Debido al rápido crecimiento poblacional en la década de 1950, el espacio se hizo insuficiente, lo que motivó la colosal decisión de demoler la antigua iglesia tras 115 años en pie.
    La construcción del nuevo templo, iniciada en 1957, es uno de los mayores ejemplos de trabajo comunitario en la historia de Simijaca. Fue impulsada por el dinamismo del padre Rafael Reyes Barrera (cuyos restos reposan hoy en el deambulatorio del templo) y dirigida por el maestro Luis Becerra, quien tomó como inspiración el diseño de la iglesia de Saboyá.
    Al iniciar la obra, el comité contaba con tan solo 30.000 pesos. Sin embargo, el proyecto cobró vida gracias al tesón y la solidaridad de todos los simijenses. Familias enteras y líderes comunitarios (como Miguel y Rudecindo León, Luis Torres, Román Bustos y Vicente Reyes) aportaron donaciones, materiales y mano de obra. Los recursos económicos se multiplicaron mediante bazares, rifas, un concurrido restaurante instalado en pleno parque principal y un ingenioso impuesto local de 5 centavos aplicado a las cervezas populares de la época.
    Tras nueve años de arduo esfuerzo colectivo, la estructura principal se dio por terminada hacia 1967. Posteriormente, bajo la guía de los párrocos José del Carmen Gutiérrez y Julio E. Forero, se culminaron las obras complementarias como la Casa Cural. Finalmente, el 13 de diciembre de 1969, el obispo Monseñor Buenaventura Jáuregui inauguró solemnemente esta magna obra, consagrándola a la historia y al patrimonio de todos los simijenses.`,
    ubicacion: `Dirección: Parque Principal de Simijaca (Carrera 7 con Calle 7). Punto de referencia: Templo Parroquial Inmaculada Concepción.`,
    imagenes: iglesiaGallery,
    video: iglesiaVideo,
    panorama360: imgIglesia360,
    googleMaps: "https://maps.app.goo.gl/ApLUpgdiLB6NbNKFA"
  },

  {
    id: 4,
    slug: "sagrado-corazon",
    nombre: "Monumento al Sagrado Corazón",
    categoria: "Religioso",
    descripcion: `El monumento del Sagrado Corazón de Jesús es un destacado punto de interés religioso y paisajístico situado en las alturas de uno de los cerros que vigilan el municipio de Simijaca. Concebido como un lugar de peregrinación y recogimiento espiritual, este espacio atrae tanto a devotos locales como a visitantes interesados en el turismo religioso y el senderismo.Desde su base en el cerro, los visitantes son recompensados con una vista panorámica excepcional de la llamada tierra del cielo azul y de los paisajes montañosos del valle. 
    La ascensión ofrece una experiencia que combina el contacto con la naturaleza, el esfuerzo físico moderado y la devoción católica, convirtiendo a esta obra en un referente de paz, meditación y contemplación para toda la región.`,
    historia: `La devoción al Sagrado Corazón de Jesús tiene raíces institucionales y culturales muy profundas en Simijaca a lo largo de las décadas. Como reflejo de este fervor, el municipio ha reafirmado su vocación católica en varias ocasiones; un ejemplo notable fue la renovación de la consagración oficial y solemne del municipio al Sagrado Corazón mediante el Decreto No. 0047, firmado el 20 de octubre de 2016 por la Alcaldía Municipal.No obstante, la materialización de la majestuosa estatua en el cerro es un hito de la historia reciente del pueblo. 
    La consolidación e inauguración oficial de esta obra se llevó a cabo el fin de semana del 25 y 26 de noviembre de 2023. Durante esas fechas, la comunidad se unió en una gran peregrinación, caminando desde el centro de Simijaca hacia el cerro para celebrar las vísperas y asistir a la apertura oficial. Desde entonces, el lugar se ha posicionado rápidamente como un nuevo símbolo en la historia religiosa y turística del municipio.`,
    ubicacion: `Zona de cerros de Simijaca, Cundinamarca, Colombia (ruta de ascenso desde el casco urbano).`,
    imagenes: sagradoGallery,
    video: sagradocorazonvideo,
    panorama360: imgSagrado360,
    googleMaps: "https://maps.google.com/?cid=6314987964198860515"
  },

  {
    id: 5,
    slug: "las-lajas",
    nombre: "Las Lajas",
    categoria: "Natural",
    descripcion: `Las Lajas no es un monumento de un solo punto, sino una de las veredas más ricas en belleza natural y ecoturismo dentro del municipio de Simijaca. Este sector rural se caracteriza por su topografía montañosa, sus formaciones rocosas y sus extensos terrenos de pastos verdes que reflejan la profunda vocación agrícola y ganadera de la región. El área de Las Lajas es el punto de partida y el corredor natural para acceder a algunos de los atractivos ecológicos más importantes del municipio. 
    Desde allí, los visitantes pueden aproximarse a la majestuosa cadena montañosa de los Picos del Sicuara (una serie de nueve cerros que, en su conjunto, simulan el pico o nariz de una lechuza). Además, la zona es reconocida por sus afluentes hídricos y quebradas de piedra natural, convirtiéndose en un escenario ideal para el avistamiento de aves, el turismo de contemplación y la práctica de deportes de aventura o senderismo de montaña.`,
    historia: `Históricamente, la vereda Las Lajas y sus zonas aledañas (como la vereda Don Lope) fueron territorios transitados por las comunidades indígenas Muiscas antes de la colonización española. La energía de la zona ha permitido que, con el paso de las generaciones, se conserven relatos y mitos de tradición oral muy arraigados en la cultura de Simijaca. El elemento histórico y místico más relevante asociado a este sector es su cercanía a la Laguna del Colorado, popularmente conocida por los simijenses como la Laguna Encantada. 
    Según los relatos ancestrales, este cuerpo de agua era utilizado por los indígenas para realizar ceremonias y ritos sagrados. Hoy en día, los abuelos del pueblo aún cuentan leyendas sobre apariciones mágicas en la laguna, como patos y gallinas de oro que brillan bajo el agua, manteniendo vivo el misticismo del lugar y atrayendo a los turistas que buscan sumergirse en la cultura local.`,
    ubicacion: `Zona rural montañosa del municipio de Simijaca, Cundinamarca (colindante con la vereda Don Lope).`,
    imagenes: lajasGallery,
    video: lajasVideo,
    panorama360: imgLajas360,
    googleMaps: "https://maps.app.goo.gl/qTgTNqAjjji6YXBj7"
  },

  {
    id: 6,
    slug: "sector-bahama",
    nombre: "Sector El Bahama",
    categoria: "Natural",
    descripcion: `El Sector El Bahama es una pintoresca zona rural ubicada en la franja montañosa oriental de Simijaca. Históricamente reconocido por sus hermosos paisajes verdes y su entorno agrícola y ganadero, hoy este lugar se ha consolidado como un gran referente de sostenibilidad ambiental, albergando el Banco Municipal de Almacenamiento de Aguas Lluvias (BAMA) más grande de Colombia.
    El espacio que alguna vez resguardó a la mítica "Laguna Encantada" es en la actualidad un monumental espejo de agua con capacidad para contener 50.855 metros cúbicos (el equivalente a casi 17 piscinas olímpicas). Más allá de su función hídrica, el sector fue transformado en un pulmón ecológico: su ronda fue reforestada con más de 1.400 árboles de especies nativas bajo la iniciativa "Un bosque para tu futuro". Además, cuenta con un aula ambiental diseñada para brindar capacitación y talleres a locales y visitantes sobre el cuidado de los recursos naturales, convirtiéndolo en un destino imperdible para el ecoturismo y la educación ambiental.`,
    historia: `La historia de este sector es un viaje desde la cosmovisión indígena hasta la ingeniería moderna, marcada por su profunda relación con el agua.
    La herencia de la Laguna Encantada: En la época precolombina, la depresión geográfica de El Bahama albergaba la Laguna del Colorado, un cuerpo de agua sagrado utilizado por los indígenas Muiscas para ritos de purificación. Con el paso de los siglos, la tradición oral campesina la bautizó como la "Laguna Encantada". Los abuelos relataban que las aguas rugían y emitían densas neblinas para ahuyentar a los forasteros, y que en sus orillas habitaban seres mágicos, como patos y gallinas con polluelos de oro que brillaban bajo el sol.
    ¿Por qué se construyó el BAMA?: Con la expansión agrícola y los retos climáticos modernos, la región enfrentó la necesidad urgente de recuperar su "colchón hídrico", dado que el municipio depende de una única fuente de abastecimiento: el río Simijaca.
    Para salvaguardar el entorno, la Corporación Autónoma Regional de Cundinamarca (CAR), en alianza con la alcaldía municipal, ejecutó una inversión superior a los 3.000 millones de pesos para construir este megaproyecto. Entregado oficialmente en octubre de 2023, el BAMA fue diseñado con un doble propósito vital:     Seguridad hídrica y agrícola: Almacenar agua durante las épocas de lluvias intensas para beneficiar a más de 11.500 habitantes y productores campesinos, garantizando el riego de cultivos, el apoyo doméstico y la atención de incendios forestales durante los meses de sequía.    Control de inundaciones: Liberar de presión al río Simijaca, regulando sus niveles de exceso para evitar desbordamientos y desastres en las partes bajas del valle.`,
    ubicacion: `Zona rural montañosa del oriente del municipio de Simijaca, Cundinamarca, Vereda Aposentos, camino o antiguo camino de herradura Las Escaleras con destino a Carmen de Carupa, Cundinamarca.`,
    imagenes: bamaGallery,
    video: bamavideo,
    panorama360: imgBama360,
    googleMaps: "https://maps.app.goo.gl/fRnDxBMX7rwmBdj87"
  },

  {
    id: 7,
    slug: "parque-la-maria",
    nombre: "Parque Recreativo La María",
    categoria: "Recreativo",
    descripcion: `El Parque Ecológico y Recreativo 'La María' es super espacio de esparcimiento, integración y aprovechamiento del tiempo libre que ofrece hermosos paisajes, zonas verdes, un lago, kioscos y áreas de BBQ, parque infantil, pista didáctica de tránsito, salón de eventos, canchas deportivas (fútbol, voleibol y tejo), animales de granja y llamas. 
    Su principal atractivo moderno es el 'Laberinto de La Lechuza', un escenario cultural y ambiental de 1.350 metros cuadrados destinado a la educación ecológica, donde se imparten charlas sobre árboles nativos y se complementa con la visita al vivero municipal 'Héroes de mi Patria'. El parque opera en un ambiente enfocado en el turismo de naturaleza, familiar y educativo, con un horario de atención los sábados, domingos y festivos de 9:00 a.m. a 5:00 p.m.`,
    historia: `El terreno del parque fue donado por el señor Agustín Parra, habitante de Simijaca, y actualmente es de propiedad del municipio. La atracción principal del complejo, el 'Laberinto de La Lechuza', inició su construcción en marzo de 2020 utilizando un poco más de 4.000 plantas de Eugenias en una extensión de 1.350 metros cuadrados. Tomó cerca de tres años y unos meses de desarrollo hasta su inauguración oficial, realizada por la Administración Municipal ('Simijaca Nos Une') en cabeza del alcalde Edgar Aguilar Castro, con la presencia de la gestora social María Teresa Suárez y 250 estudiantes de la I.E.D. Agustín Parra.`,
    ubicacion: `El parque se encuentra ubicado en una de las entradas al municipio de Simijaca, en el kilómetro 1,5 de la vía que conduce de Simijaca hacia Chiquinquirá (Boyacá) o viceversa. Se sitúa en el lado derecho de la carretera, justo frente a la empresa de productos Gloria Colombia (antes Lechesan), y está integrado dentro del mismo Parque Ecológico y Recreativo La María.`,
    imagenes: mariaGallery,
    video: mariaVideo,
    panorama360: imgMaria360,
    googleMaps: "https://www.google.com/maps/place/Parque+Ecol%C3%B3gico+y+Recreativo+La+Mar%C3%ADa/@5.5645,-73.8344,17z"
  }
];

export default sitios;