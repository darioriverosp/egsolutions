// Contenido del sitio, tomado del diseño de Figma (EGSOLUTIONS · página "EG SOLUTIONS V2").
// Marcado ligero en los textos: **negrita**, {o}naranja{/o}, \n = salto de línea.
// Las imágenes marcadas con PENDIENTE usan provisionalmente otra foto del sitio
// hasta tener la exportación original de Figma (ver README.md).

export const site = {
  name: 'EG SOLUTIONS',
  legal: 'EG SOLUTIONS C.A.',
  tagline: 'Un sólo equipo, todas las soluciones',
  url: 'https://egsolutions.net',
  whatsapp: '584127691174',
  instagram: 'https://www.instagram.com/_egsolutions/',
  instagramHandle: '@_egsolutions',
  facebook: '#', // PENDIENTE: el diseño muestra el icono pero no la URL de Facebook
  sedes: [
    {
      nombre: 'Sede Región Andes (Oficina Principal)',
      direccion: 'Calle Principal, Edificio La Castellana, Piso 5, Oficina 5-2,\nUrb. La Magdalena, Mérida, Edo. Mérida, Venezuela.',
      telefonos: ['0274-4174855', '0412-7691174'],
      mapa: 'Edificio La Castellana, La Magdalena, Mérida, Venezuela',
    },
    {
      nombre: 'Sede Región Capital (Operaciones y Galpón)',
      direccion: 'Sector 1 Cartanal, Galpón #10, Santa Teresa del Tuy,\nEdo. Miranda, Venezuela.',
      telefonos: ['0412-7691174'],
      mapa: 'Cartanal, Santa Teresa del Tuy, Miranda, Venezuela',
    },
  ],
};

// Categorías de servicio (páginas "Servicios Página Principal - …")
export const categories = [
  {
    slug: 'obras-civiles',
    name: 'Obras Civiles y Construcción',
    menuName: 'Obras civiles y construcción',
    icon: 'ico-building.svg',
    menuIcon: 'menu-building.svg',
    hero: 'obras-hero.webp',
    title: 'Obras Cíviles y Construcción',
    subtitle: 'Empresa de Obras Civiles y Construcción en Venezuela',
    h2: 'Garantía de {o}solidez, seguridad y continuidad{/o} operativa en tu industria, negocio o condominio.',
    intro: 'En EG SOLUTIONS C.A. contamos con un **equipo multidisciplinario de ingenieros especializados en obras civiles**. Ofrecemos soluciones integrales que abarcan desde impermeabilizaciones de gran escala y vaciado de pisos, hasta la remodelación técnica de espacios corporativos, áreas de salud y estructuras industriales.\n\nNuestros servicios están orientados a resguardar la infraestructura de inmuebles en todo el país.',
    introBtn: 'Habla con un especialista técnico',
    strip: ['obras-strip1.webp', 'obras-strip2.webp', 'obras-strip3.webp'],
    sectionTitle: 'Nuestra trayectoria en obras civiles transformada en ventajas operativas',
    resultsTitle: 'Nuestra mejor garantía es la operatividad de nuestros clientes.',
    resultsSub: 'Con criterios de calidad, entrega a tiempo y ejecución impecable.',
    ctaTitle: '¿Necesitas una empresa constructora y de ingeniería? {o}Contáctanos ahora.{/o}',
    ctaText: 'En **EG SOLUTIONS C.A.** estamos listos para evaluar tu requerimiento sin compromiso. **Déjanos tus datos y un ingeniero te responderá en corto plazo.**',
    menuQuestion: '¿Necesitas una empresa constructora y de ingeniería?',
    menuBtn: 'Revisa nuestro servicio de obras civiles y construcción',
    card: { img: 'card-construccion.webp', title: 'Construcción y Estructuras', text: 'Garantía de seguridad y durabilidad en cada obra.' },
  },
  {
    slug: 'climatizacion',
    name: 'Climatización y Refrigeración',
    menuName: 'Climatización y refrigeración',
    icon: 'ico-temperature.svg',
    menuIcon: 'menu-thermo.svg',
    hero: 'card-climatizacion.webp', // PENDIENTE: foto de portada propia de la categoría
    title: 'Climatización y Refrigeración',
    subtitle: 'Especialistas en Climatización y Refrigeración Comercial e Industrial.',
    h2: 'Garantizamos la {o}temperatura ideal y la protección{/o} de tus activos sin interrupciones operativas.',
    intro: 'En EG SOLUTIONS C.A. **diseñamos, instalamos y mantenemos sistemas de aire acondicionado y refrigeración de alta exigencia.** Como empresa multidisciplinaria, abordamos cada proyecto integrando ingeniería mecánica y eléctrica para asegurar el máximo rendimiento energético y resguardar la operatividad de instalaciones comerciales, industriales y de salud en todo el país.',
    introBtn: 'Solicitar evaluación térmica',
    strip: ['nos-strip1.webp', 'nos-strip2.webp', 'nos-strip3.webp'],
    sectionTitle: 'Nuestra experiencia en termodinámica transformada en ventajas para tu empresa',
    resultsTitle: 'Resultados que respaldan nuestra ingeniería térmica.',
    resultsSub: 'Con criterios de eficiencia energética y respuesta inmediata.',
    ctaTitle: '¿Necesitas optimizar los sistemas de frío de tu empresa? {o}Contáctanos ahora.{/o}',
    ctaText: 'En **EG SOLUTIONS C.A.** un ingeniero especialista está listo para evaluar tu infraestructura térmica sin compromiso.',
    menuQuestion: '¿Necesitas optimizar los sistemas de frío de tu empresa?',
    menuBtn: 'Revisa nuestro servicio de climatización y refrigeración',
    card: { img: 'card-climatizacion.webp', title: 'Climatización y Refrigeración', text: 'Soluciones integrales en aire acondicionado y refrigeración para espacios y procesos.' },
  },
  {
    slug: 'gestion-inmuebles',
    name: 'Gestión de Inmuebles y Mantenimiento',
    menuName: 'Gestión de inmuebles y mantenimiento',
    icon: 'ico-armchair.svg',
    menuIcon: 'menu-armchair.svg',
    hero: 'nos-vision.webp', // PENDIENTE
    title: 'Gestión de Inmuebles y Mantenimiento',
    subtitle: 'Especialistas en Gestión de Inmuebles y Mantenimiento Técnico Integral.',
    h2: 'Optimizamos el {o}valor de tus propiedades{/o} y garantizamos el funcionamiento ininterrumpido de tu infraestructura.',
    intro: 'En EG SOLUTIONS C.A. **asumimos la administración técnica y el mantenimiento preventivo y correctivo de instalaciones corporativas, comerciales, industriales y residenciales**. Centralizamos la ingeniería civil, eléctrica, mecánica y de sistemas bajo una sola dirección operativa para prolongar la vida útil de tus inmuebles, eliminar paradas críticas y liberar a tu equipo directivo del desgaste logístico.',
    introBtn: 'Solicitar diagnóstico de infraestructura',
    strip: ['nos-strip1.webp', 'nos-strip2.webp', 'nos-strip3.webp'],
    sectionTitle: 'Nuestra ingeniería de gestión convertida en ahorro, control y tranquilidad',
    resultsTitle: 'Resultados que respaldan nuestra gestión inmobiliaria y corporativa',
    resultsSub: 'Con criterios de preservación patrimonial, respuesta oportuna y transparencia.',
    ctaTitle: '¿Listo para simplificar la administración técnica de tus inmuebles? {o}Contáctanos hoy{/o}',
    ctaText: 'En **EG SOLUTIONS C.A.** diseñamos un plan de mantenimiento a la medida de tu presupuesto e infraestructura.',
    menuQuestion: '¿Listo para simplificar la administración técnica de tus inmuebles?',
    menuBtn: 'Revisa nuestro servicio de gestión de inmuebles y mantenimiento',
    card: { img: 'card-mantenimiento.webp', title: 'Mantenimiento Preventivo', text: 'Anticipe las fallas, reduce riesgos y optimiza el rendimiento de sus activos.' },
  },
  {
    slug: 'sector-hotelero',
    name: 'Servicios para el Sector Hotelero',
    menuName: 'Servicios para el Sector Hotelero',
    icon: 'ico-bed.svg',
    menuIcon: 'ico-bed.svg',
    hero: 'nos-strip1.webp', // PENDIENTE
    title: 'Servicios para el Sector Hotelero',
    subtitle: 'Especialistas en Remodelación y Mantenimiento Técnico para el área hotelera.',
    h2: 'Garantizamos el {o}funcionamiento impecable{/o} de tu infraestructura y el {o}confort de tus clientes{/o}\nsin paralizar tus operaciones',
    intro: 'En EG SOLUTIONS C.A. **centralizamos el diseño, ejecución y mantenimiento preventivo de áreas críticas en el sector hospitalidad.** Como empresa multidisciplinaria, abordamos cada desafío integrando obras civiles, electromecánicas y automatización para erradicar las habitaciones "fuera de servicio" y resguardar la reputación y operatividad de hoteles, resorts y alojamientos de alta exigencia en todo el país.',
    introBtn: 'Solicitar inspección',
    strip: ['hotel-strip1.webp', 'hotel-strip2.webp', 'hotel-strip3.webp'],
    sectionTitle: 'Ingeniería de alta exigencia transformada\nen experiencias de cinco estrellas',
    resultsTitle: 'Resultados que respaldan nuestros servicios para el sector hotelero.',
    resultsSub: 'Con criterios de eficiencia en mantenimiento y remodelación.',
    ctaTitle: 'Asegura el confort de tus huéspedes sin interrumpir la operatividad de tu hotel. {o}Contáctanos ahora.{/o}',
    ctaText: 'En **EG SOLUTIONS C.A.** un ingeniero especialista está listo para evaluar tu infraestructura sin compromiso.',
    menuQuestion: '¿Quieres asegurar el confort de tus huéspedes?',
    menuBtn: 'Revisa nuestros servicios para el sector hotelero',
  },
];

// Servicios individuales (páginas "Servicios Individual")
// summary = texto de la tarjeta en la página de categoría; intro = texto de cabecera del servicio.
export const services = [
  // ── Obras civiles ──
  {
    slug: 'impermeabilizacion', cat: 'obras-civiles', img: 'obras-impermeabilizacion.webp',
    title: 'Impermeabilización de Alta Exigencia',
    summary: 'Ejecución de obras de impermeabilización definitivas en losas de techo, terrazas y tanques de agua de gran capacidad. Realizamos correcciones de pendientes con mortero hidrófugo y fundición de manto asfáltico profesional para blindar la estructura contra la corrosión.',
    intro: 'Ejecución de obras de impermeabilización definitivas en losas de techo, terrazas y tanques de agua de gran capacidad.\n\nRealizamos correcciones de pendientes con mortero hidrófugo y fundición de manto asfáltico profesional para blindar la estructura contra la corrosión.',
    details: 'Para garantizar resultados definitivos, nuestro servicio integral abarca desde la remoción mecánica de mantos deteriorados y la preparación técnica del sustrato, hasta la aplicación de imprimantes asfálticos de alta adherencia y acabados reflectantes para reducción térmica. Además de la impermeabilización tradicional, instalamos recubrimientos de poliuretano y resinas especializadas, adaptando cada solución a la exposición química, el tráfico y las exigencias climáticas de tus instalaciones industriales o comerciales.',
    bullets: [
      ['Preparación estructural:', 'Corrección de pendientes y fisuras.'],
      ['Alta adherencia:', 'Sistemas de fijación monolítica.'],
      ['Aislamiento térmico:', 'Acabados reflectantes para optimizar tus equipos HVAC.'],
      ['Exigencia extrema:', 'Poliuretano industrial para resistir químicos y alto tráfico.'],
    ],
  },
  {
    slug: 'remodelacion-corporativa', cat: 'obras-civiles', img: 'remod-corp.webp',
    title: 'Remodelación Corporativa e Industrial',
    summary: 'Diseño y ejecución de obras civiles para oficinas, locales y áreas de alto tráfico. Incluye el tratamiento, nivelación y vaciado técnico de pisos industriales de alta resistencia, garantizando superficies idóneas para el tráfico pesado y la logística empresarial.',
    intro: 'Diseño y ejecución de obras civiles para oficinas, locales y áreas de alto tráfico. Incluye el tratamiento, nivelación y vaciado técnico de pisos industriales de alta resistencia, garantizando superficies idóneas para el tráfico pesado y la logística empresarial.',
    details: 'Para asegurar una transición operativa impecable y maximizar el ciclo de vida de tus instalaciones, nuestro servicio abarca desde la planificación estructural y demolición controlada, hasta la instalación de acabados de alto rendimiento. Adaptamos cada proyecto a los requerimientos de carga, normativas de seguridad y el flujo de trabajo de tu empresa, ejecutando obras civiles que soportan la actividad logística y comercial más exigente sin comprometer la estética de tu marca:',
    bullets: [
      ['Adecuación integral:', 'Reconfiguración estratégica de espacios para optimizar la operatividad corporativa y comercial.'],
      ['Nivelación de precisión:', 'Preparación mecánica del sustrato y corrección estructural para garantizar bases impecables.'],
      ['Resistencia extrema:', 'Vaciado técnico de pisos industriales diseñados para soportar tránsito continuo de montacargas y cargas dinámicas.'],
      ['Acabados de alto rendimiento:', 'Integración de revestimientos que fusionan la estética corporativa premium con durabilidad de grado industrial.'],
    ],
  },
  {
    slug: 'estructuras-metalicas', cat: 'obras-civiles', img: 'estructuras.webp',
    title: 'Construcción y Estructuras Metálicas',
    summary: 'Cálculo, fabricación y montaje de estructuras metálicas, losas de tabelón y ampliaciones (residenciales o corporativas). Construimos con precisión milimétrica para asegurar bases escalables y seguras.',
    intro: 'Cálculo, fabricación y montaje de estructuras metálicas, losas de tabelón y ampliaciones (residenciales o corporativas). Construimos con precisión milimétrica para asegurar bases escalables y seguras.',
    details: 'El crecimiento físico de tu empresa no puede representar un riesgo estructural. Nuestro servicio de construcción se fundamenta en el cálculo de ingeniería riguroso, garantizando que cada nueva nave industrial, nivel corporativo o área de carga soporte las máximas exigencias operativas y dinámicas. Ejecutamos cada proyecto bajo estrictas normativas sismorresistentes y de seguridad industrial, optimizando los tiempos de obra para que la expansión de tu infraestructura no interrumpa el flujo actual de tu negocio:',
    bullets: [
      ['Ingeniería estructural:', 'Cálculo y modelado de pórticos y cubiertas metálicas, adaptados a la normativa de cargas vivas y muertas específicas de tu industria.'],
      ['Fabricación y montaje técnico:', 'Ensamblaje en sitio con soldaduras certificadas y precisión milimétrica, reduciendo drásticamente los tiempos de ejecución en comparación con la construcción tradicional.'],
      ['Sistemas de entrepiso:', 'Vaciado técnico de losas de tabelón y placas colaborantes (sofito metálico) para ampliaciones rápidas, seguras y de alta resistencia portante.'],
      ['Expansión escalable:', 'Adecuaciones y ampliaciones diseñadas para integrarse a tu arquitectura existente.'],
    ],
  },
  {
    slug: 'remodelacion-hospitalaria', cat: 'obras-civiles', img: 'card-remod-hospitalaria.webp',
    title: 'Remodelación Hospitalaria y Clínica',
    summary: 'Adecuación civil de quirófanos y centros de salud bajo estrictas normativas. Instalación de superficies asépticas, acabados sanitarios y acondicionamiento de áreas críticas para garantizar un ecosistema médico sin riesgo de contaminación cruzada.',
    intro: 'Adecuación civil de quirófanos y centros de salud bajo estrictas normativas. Instalación de superficies asépticas, acabados sanitarios y acondicionamiento de áreas críticas para garantizar un ecosistema médico sin riesgo de contaminación cruzada.',
    details: 'En el sector salud, la infraestructura no cumple una función estética, sino que actúa como la primera línea de defensa contra las infecciones intrahospitalarias. Nuestro servicio de adecuación clínica sustituye la albañilería tradicional por ingeniería sanitaria de alta precisión. Intervenimos áreas críticas minimizando el impacto en la operatividad del centro médico, ejecutando obras que garantizan la aprobación de auditorías de salud y protegen la vida de los pacientes a través de espacios 100% estériles:',
    bullets: [
      ['Ingeniería normada:', 'Adecuación estructural y arquitectónica bajo el estricto cumplimiento de normativas del Ministerio de Salud y estándares internacionales de bioseguridad.'],
      ['Superficies de grado médico:', 'Instalación de pisos vinílicos conductivos, sistemas epóxicos autonivelantes y curvas sanitarias continuas que eliminan los focos de proliferación bacteriana.'],
      ['Acabados asépticos:', 'Sellado hermético y aplicación de recubrimientos antibacteriales de alto tráfico en paredes y techos, garantizando áreas de rápida desinfección y nula porosidad.'],
      ['Acondicionamiento de áreas críticas:', 'Preparación civil integral de quirófanos, UCI y laboratorios, asegurando el entorno estructural idóneo para la integración segura de gases medicinales y sistemas HVAC de presión positiva.'],
    ],
  },

  // ── Climatización ──
  {
    slug: 'refrigeracion-comercial', cat: 'climatizacion', img: 'proj-refrigeracion.webp',
    title: 'Refrigeración Comercial e Industrial',
    summary: 'Diseño, instalación y mantenimiento de cavas cuarto, vitrinas refrigeradas (Vissacoolers) y sistemas de enfriamiento a gran escala. Blindamos tu cadena de frío para evitar pérdidas de inventario, mermas de producto y sobrecargas eléctricas.',
    intro: 'Diseño, instalación y mantenimiento de cavas cuarto, vitrinas refrigeradas (Vissacoolers) y sistemas de enfriamiento a gran escala.\n\nBlindamos tu cadena de frío para evitar pérdidas de inventario, mermas de producto y sobrecargas eléctricas.',
    details: 'En sectores como el retail, la industria alimentaria y la hospitalidad, un equipo de enfriamiento ineficiente no es un simple problema de mantenimiento: es una fuga directa de capital. Nuestro servicio de ingeniería térmica está diseñado para eliminar el riesgo de pérdidas millonarias por fluctuaciones de temperatura o paradas imprevistas. Abarcamos desde el cálculo inicial de las cargas térmicas hasta la ejecución de rutinas de mantenimiento preventivo especializado, garantizando sistemas robustos que protegen tus productos 24/7 y optimizan drásticamente el consumo eléctrico de tu empresa:',
    bullets: [
      ['Ingeniería térmica:', 'Cálculo exacto de frigorías y diseño de redes de enfriamiento a la medida, asegurando el rendimiento óptimo del equipo sin sobredimensionar el gasto energético.'],
      ['Almacenamiento masivo:', 'Ensamblaje y puesta en marcha de cavas cuarto (conservación y congelación) con paneles de aislamiento de alta densidad y sellado 100% hermético.'],
      ['Exhibición comercial:', 'Adecuación, reparación y mantenimiento de vitrinas refrigeradas (Vissacoolers), garantizando la temperatura normativa sin sacrificar el atractivo visual para el cliente final.'],
      ['Blindaje operativo:', 'Protocolos de mantenimiento preventivo, revisión de compresores y calibración de refrigerantes para anticipar fallas catastróficas, evitar mermas de inventario y prolongar la vida útil de tus activos.'],
    ],
  },
  {
    slug: 'climatizacion-corporativa', cat: 'climatizacion', img: 'svc-climatizacion-corporativa.webp',
    title: 'Climatización Corporativa (HVAC)',
    summary: 'Implementación de sistemas de aire acondicionado central, equipos VRF/VRV y unidades tipo paquete (Rooftop) para edificios de oficinas, hoteles, centros comerciales y galpones. Garantizamos confort térmico y calidad del aire interior con eficiencia energética.',
    intro: 'Implementación de sistemas de aire acondicionado central, equipos VRF/VRV y unidades tipo paquete (Rooftop) para edificios de oficinas, hoteles, centros comerciales y galpones.\n\nGarantizamos confort térmico y calidad del aire interior con eficiencia energética.',
    details: 'En instalaciones de gran escala, la climatización no es una simple cuestión de confort, sino una variable estructural que impacta directamente en la productividad de tu equipo y en los costos operativos (OPEX) del edificio. Nuestro servicio sustituye la instalación empírica por ingeniería térmica de precisión. Abarcamos desde el cálculo exacto de cargas hasta la puesta en marcha de sistemas robustos que se integran armónicamente a la arquitectura de tu proyecto, asegurando un ambiente corporativo impecable mientras reducimos drásticamente el consumo eléctrico mensual:',
    bullets: [
      ['Ingeniería térmica:', 'Dimensionamiento exacto de frigorías y diseño aerodinámico de redes de ductería para evitar el sobredimensionamiento de equipos y el desperdicio energético.'],
      ['Tecnología de alta eficiencia:', 'Suministro, instalación y configuración de sistemas VRF/VRV, Chillers y unidades Rooftop (Paquete), garantizando una climatización sectorizada y adaptable a la demanda real de cada área.'],
      ['Calidad de Aire Interior (CAI):', 'Implementación de sistemas de renovación de aire, filtrado especializado y extracción mecánica para cumplir con normativas de salud ocupacional y erradicar el "síndrome del edificio enfermo".'],
      ['Automatización operativa:', 'Integración de tableros de control centralizado que permiten gestionar el clima de toda la infraestructura de manera inteligente, extendiendo la vida útil de los activos y blindando tu presupuesto.'],
    ],
  },
  {
    slug: 'mantenimiento-climatizacion', cat: 'climatizacion', img: 'svc-mantenimiento-climatizacion.webp',
    title: 'Mantenimiento Preventivo y Correctivo',
    summary: 'Planes de mantenimiento programado para flotas de equipos de refrigeración y aires acondicionados. Evitamos paradas críticas, extendemos la vida útil de los compresores y corregimos fallas antes de que afecten el ritmo de tu negocio.',
    intro: 'Planes de mantenimiento programado para flotas de equipos de refrigeración y aires acondicionados.\n\nEvitamos paradas críticas, extendemos la vida útil de los compresores y corregimos fallas antes de que afecten el ritmo de tu negocio.',
    details: 'En el sector corporativo e industrial, esperar a que un equipo falle no es una estrategia de mantenimiento; es un riesgo financiero inminente. Nuestro servicio integral transforma el enfoque reactivo tradicional en previsibilidad técnica. Ejecutamos rutinas de inspección rigurosas y protocolos de ingeniería diseñados para proteger tu inversión inicial, optimizar el consumo energético mensual y garantizar la continuidad absoluta de tus operaciones, eliminando la incertidumbre de las emergencias técnicas:',
    bullets: [
      ['Auditoría y diagnóstico inicial:', 'Levantamiento técnico detallado (eléctrico, mecánico y termodinámico) de tu flota de equipos para establecer una línea base y detectar vulnerabilidades ocultas.'],
      ['Planes preventivos a la medida:', 'Cronogramas de intervención (limpieza química especializada, medición de amperajes y calibración de presiones) adaptados al régimen de trabajo específico de tu industria.'],
      ['Protección de activos críticos:', 'Monitoreo de desgaste en compresores, motores y tarjetas electrónicas para anticipar fallas catastróficas, extendiendo significativamente el ciclo de vida de tu infraestructura.'],
      ['Respuesta correctiva de precisión:', 'Intervención técnica con criterio de ingeniería para solucionar fallas desde la raíz, erradicando los "parches" temporales que generan averías recurrentes y paradas prolongadas.'],
    ],
  },
  {
    slug: 'climatizacion-hospitalaria', cat: 'climatizacion', img: 'svc-climatizacion-hospitalaria.webp',
    title: 'Climatización Hospitalaria y Áreas Críticas',
    summary: 'Ingeniería mecánica aplicada al sector salud. Diseño de sistemas con flujo laminar, presión positiva/negativa y filtros absolutos para quirófanos y laboratorios, cumpliendo estrictamente con las normativas de bioseguridad.',
    intro: 'Ingeniería mecánica aplicada al sector salud. Diseño de sistemas con flujo laminar, presión positiva/negativa y filtros absolutos para quirófanos y laboratorios, cumpliendo estrictamente con las normativas de bioseguridad.',
    details: 'En entornos médicos, el sistema HVAC no es una cuestión de temperatura o confort; es el soporte vital de la infraestructura y la principal barrera contra las infecciones intrahospitalarias. Un diseño empírico o una falla de calibración en estas áreas críticas se traduce inmediatamente en contaminación cruzada y la inhabilitación del espacio. En EG SOLUTIONS garantizamos la pureza absoluta del aire y el control milimétrico de las variables ambientales, asegurando la aprobación de cualquier auditoría sanitaria y protegiendo tanto la vida del paciente como la operatividad ininterrumpida de tu clínica o laboratorio:',
    bullets: [
      ['Ingeniería de bioseguridad:', 'Diseño y cálculo térmico bajo el estricto cumplimiento de normativas del Ministerio de Salud y estándares internacionales (ASHRAE/ISO) para centros de salud.'],
      ['Control de presiones y flujo:', 'Implementación de sistemas de presión positiva (para blindar quirófanos) y negativa (para áreas de aislamiento), integrados con flujo laminar para el barrido efectivo de patógenos.'],
      ['Filtración absoluta (HEPA/ULPA):', 'Instalación técnica de bancos de filtros de alta eficiencia y sistemas de renovación de aire que garantizan la erradicación del 99.9% de partículas, bacterias y virus en el ambiente.'],
      ['Confiabilidad crítica 24/7:', 'Configuración de equipos redundantes y sistemas de automatización que mantienen la temperatura y la humedad estables, evitando fluctuaciones que comprometan la esterilidad del ecosistema médico.'],
    ],
  },

  // ── Gestión de inmuebles ──
  {
    slug: 'planes-mantenimiento', cat: 'gestion-inmuebles', img: 'svc-planes-mantenimiento.webp',
    title: 'Planes de Mantenimiento Preventivo y Correctivo',
    summary: 'Programación de rutinas de inspección y servicio para instalaciones eléctricas, climatización, bombas de agua y estructuras civiles. Anticipamos fallas operativas para reducir costos de reparación hasta en un 40% y mantener tu inmueble en óptimas condiciones 24/7.',
    intro: 'Programación de rutinas de inspección y servicio para instalaciones eléctricas, climatización, bombas de agua y estructuras civiles.\n\nAnticipamos fallas operativas para reducir costos de reparación hasta en un 40% y mantener tu inmueble en óptimas condiciones 24/7.',
    details: 'En el entorno corporativo e industrial, la gestión reactiva de los espacios no es una estrategia; es la antesala a una crisis operativa. Nuestro servicio transforma el mantenimiento de un "gasto imprevisto" a una inversión planificada y predecible. Delegar la infraestructura de tu empresa a nuestro equipo de ingenieros garantiza que cada subsistema crítico opere a su máxima capacidad, eliminando el estrés de las emergencias y permitiéndote enfocar todos tus recursos en el núcleo de tu negocio:',
    bullets: [
      ['Auditoría y levantamiento técnico:', 'Diagnóstico exhaustivo del estado actual de tus instalaciones (eléctricas, sanitarias, térmicas y civiles) para diseñar un plan de acción basado en datos de ingeniería, no en suposiciones.'],
      ['Prevención programada:', 'Ejecución de cronogramas estrictos de inspección, ajuste y calibración de equipos críticos, mitigando el desgaste prematuro y extendiendo drásticamente el ciclo de vida útil de tus activos.'],
      ['Respuesta correctiva de precisión:', 'Intervención técnica especializada ante eventualidades, aplicando soluciones definitivas que erradican la raíz del problema y eliminan las fallas recurrentes (cero "parches").'],
      ['Optimización financiera:', 'Reducción comprobada de paradas no planificadas y sobrecostos por reparaciones de emergencia, brindando control absoluto y previsibilidad a tu presupuesto operativo anual.'],
    ],
  },
  {
    slug: 'centralizacion-operativa', cat: 'gestion-inmuebles', img: 'proj-centralizacion.webp',
    title: 'Centralización Operativa',
    summary: 'Gestión integral de servicios técnicos para empresas, centros comerciales y edificios corporativos. Eliminamos la necesidad de contratar múltiples técnicos independientes: asumimos la supervisión, auditoría de activos y control de la infraestructura con un solo punto de contacto.',
    intro: 'Gestión integral de servicios técnicos para empresas, centros comerciales y edificios corporativos.\n\nEliminamos la necesidad de contratar múltiples técnicos independientes: asumimos la supervisión, auditoría de activos y control de la infraestructura con un solo punto de contacto.',
    details: 'Coordinar a múltiples contratistas informales para el mantenimiento de una instalación de gran escala no solo genera fricción administrativa, sino que diluye la responsabilidad técnica cuando ocurren fallas críticas. Asumimos el control absoluto y la supervisión de todos tus activos físicos a través de una única línea de mando. Eliminamos el caos de la gestión de proveedores para que tu gerencia se enfoque exclusivamente en la rentabilidad y el crecimiento del negocio:',
    bullets: [
      ['Responsabilidad unificada:', 'Un solo equipo de ingeniería asume la ejecución y garantía integral del mantenimiento civil, eléctrico, sanitario y de climatización, eliminando la triangulación de proveedores.'],
      ['Auditoría de activos:', 'Levantamiento técnico, catalogación y monitoreo continuo de todos tus equipos y sistemas estructurales para establecer protocolos de cuidado basados en datos reales de operación.'],
      ['Supervisión especializada:', 'Las intervenciones no se delegan al criterio empírico; cada mantenimiento correctivo o preventivo es dirigido, auditado y documentado por ingenieros especialistas.'],
      ['Eficiencia administrativa:', 'Reducción drástica de la carga operativa para tu departamento de compras y gerencia. Cero fricción en la coordinación de horarios, simplificación de la facturación y control absoluto de tu presupuesto operativo.'],
    ],
  },
  {
    slug: 'adecuacion-areas-comunes', cat: 'gestion-inmuebles', img: 'svc-adecuacion-areas-comunes.webp',
    title: 'Adecuación y Conservación de Áreas Comunes e Inmuebles',
    summary: 'Trabajos de pintura, reparación de fachadas, impermeabilización de losas, nivelación de superficies y mejoras estético-funcionales para condominios e inmuebles comerciales. Conservamos la plusvalía del inmueble con acabados de alto nivel profesional.',
    intro: 'Trabajos de pintura, reparación de fachadas, impermeabilización de losas, nivelación de superficies y mejoras estético-funcionales para condominios e inmuebles comerciales. Conservamos la plusvalía del inmueble con acabados de alto nivel profesional.',
    details: 'En el sector inmobiliario y corporativo, la fachada y las áreas comunes son la primera línea de defensa de tu edificación y el principal indicador de su valor en el mercado. El deterioro visible no solo impacta negativamente la imagen de la propiedad, sino que suele ser el síntoma de patologías estructurales más graves. En EG SOLUTIONS elevamos el mantenimiento general a un estándar de ingeniería civil. No nos limitamos a aplicar soluciones cosméticas o "pintura rápida"; diagnosticamos la raíz del desgaste, reparamos la estructura y embellecemos tus espacios utilizando materiales de alto rendimiento, garantizando que tu inmueble recupere y mantenga su rentabilidad:',
    bullets: [
      ['Restauración de fachadas:', 'Tratamiento especializado de grietas, frisos y revestimientos exteriores para detener el deterioro estructural, culminando con la aplicación de recubrimientos de grado industrial resistentes a los rayos UV y la humedad.'],
      ['Acondicionamiento de superficies:', 'Nivelación técnica, escarificación y reparación de pisos en estacionamientos, lobbies, escaleras y pasillos, asegurando bases impecables que soportan el tránsito continuo sin perder su estética.'],
      ['Protección integral:', 'Ejecución de obras de impermeabilización en losas, jardineras y terrazas comunes, erradicando filtraciones que comprometen la estructura interna del edificio y la tranquilidad de los ocupantes.'],
      ['Conservación patrimonial:', 'Ejecución de mejoras estético-funcionales planificadas que revalorizan el inmueble (plusvalía). Coordinamos las obras bajo protocolos estrictos de orden y limpieza para minimizar el impacto en la rutina de residentes o usuarios comerciales.'],
    ],
  },
  {
    slug: 'auditorias-tecnicas', cat: 'gestion-inmuebles', img: 'svc-auditorias-tecnicas.webp',
    title: 'Auditorías Técnicas y Diagnóstico de Infraestructura',
    summary: 'Inspecciones técnicas especializadas con equipos de medición para evaluar el estado real de redes eléctricas, sistemas hidráulicos, impermeabilización y climatización. Entregamos informes ejecutivos con planes priorizados de inversión y adecuación normativa.',
    intro: 'Inspecciones técnicas especializadas con equipos de medición para evaluar el estado real de redes eléctricas, sistemas hidráulicos, impermeabilización y climatización. Entregamos informes ejecutivos con planes priorizados de inversión y adecuación normativa.',
    details: 'En el entorno corporativo e industrial, tomar decisiones de mantenimiento basadas en suposiciones o inspecciones visuales superficiales es un riesgo financiero incalculable. Intervenimos tus instalaciones con equipos de medición especializados para evaluar la salud real de cada subsistema crítico. El resultado de esta evaluación no es un simple listado de fallas, sino una hoja de ruta ejecutiva diseñada para priorizar tus inversiones, prevenir colapsos operativos y garantizar el cumplimiento estricto de las normativas de bioseguridad, seguridad industrial e infraestructura vigentes:',
    bullets: [
      ['Levantamiento instrumental:', 'Inspección técnica con equipos de precisión (termografía eléctrica, medición de parámetros HVAC, pruebas de estanqueidad y humedad) para detectar fallas invisibles al ojo humano.'],
      ['Diagnóstico predictivo:', 'Identificación de patologías estructurales y vulnerabilidades electromecánicas en etapas tempranas, mucho antes de que se conviertan en emergencias que paralicen el ritmo de tu negocio.'],
      ['Informes ejecutivos:', 'Traducción de la data cruda de ingeniería en reportes gerenciales claros, respaldados por evidencia fotográfica, métricas de rendimiento actual y cálculos de carga térmica o eléctrica.'],
      ['Planes de inversión priorizados:', 'Diseño de un cronograma estratégico de adecuaciones y mantenimiento clasificado por nivel de riesgo crítico, permitiendo a la gerencia optimizar y justificar el uso del presupuesto anual.'],
    ],
  },

  // ── Sector hotelero ──
  {
    slug: 'remodelacion-areas-comunes', cat: 'sector-hotelero', img: 'svc-remodelacion-areas-comunes.webp',
    title: 'Remodelación de Áreas Comunes',
    summary: 'Adecuación de lobbies, restaurantes, fachadas y mantenimiento especializado de piscinas y cuartos de máquinas, ejecutando obras civiles sin paralizar el funcionamiento del hotel.',
    intro: 'Adecuación de lobbies, restaurantes, fachadas y mantenimiento especializado de piscinas y cuartos de máquinas, ejecutando obras civiles sin paralizar el funcionamiento del hotel.',
    details: 'La primera impresión de un huésped define su estadía. Llevamos a cabo proyectos de modernización arquitectónica y mantenimiento pesado en áreas de alto tráfico con una logística de obra calculada al milímetro. Aislamos nuestras zonas de trabajo térmica y acústicamente, permitiendo que tu hotel siga facturando mientras nosotros elevamos el valor de su infraestructura:',
    bullets: [
      ['Renovación de alto impacto:', 'Vaciado de pisos, adecuación de techos y modernización de áreas de recepción y alimentos/bebidas.'],
      ['Ingeniería de zonas húmedas:', 'Impermeabilización técnica, reparación de bombas y mantenimiento de sistemas de filtrado en piscinas y spas.'],
      ['Intervención logística:', 'Ejecución de trabajos críticos en horarios nocturnos o de bajo tránsito, garantizando la promesa de descanso para tus clientes.'],
    ],
  },
  {
    slug: 'mantenimiento-hotelero', cat: 'sector-hotelero', img: 'svc-mantenimiento-hotelero.webp',
    title: 'Mantenimiento Preventivo Integral',
    pageTitle: 'Mantenimiento Preventivo Integral\n(Cero Habitaciones Bloqueadas)',
    summary: 'Planes integrados y centralizados para plomería, electricidad y cerrajería. Protegemos tu inventario de habitaciones para maximizar la tasa de ocupación y los ingresos del hotel.',
    intro: 'Planes integrados y centralizados para plomería, electricidad y cerrajería. Protegemos tu inventario de habitaciones para maximizar la tasa de ocupación y los ingresos del hotel.',
    details: 'Tener habitaciones "Fuera de Servicio" por fallas menores de mantenimiento es una fuga directa de capital. EG Solutions actúa como el departamento de mantenimiento externalizado de tu hotel. Ejecutamos rutinas de inspección exhaustiva que detectan y corrigen filtraciones, fallas eléctricas o deterioro de acabados antes de que el huésped lo note. Nuestra promesa es la "intervención invisible": trabajamos bajo protocolos de silencio y limpieza estrictos para no alterar la tranquilidad de las operaciones diarias:',
    bullets: [
      ['Disponibilidad máxima:', 'Corrección técnica inmediata de patologías estructurales e hidrosanitarias para devolver las habitaciones al inventario de ventas en tiempo récord.'],
      ['Electricidad y respaldo:', 'Mantenimiento de tableros, iluminación arquitectónica y sistemas de plantas eléctricas de emergencia para garantizar continuidad 24/7.'],
      ['Mantenimiento estético:', 'Reparación de frisos, retoques de pintura y conservación de mobiliario fijo para mantener el estándar visual que exige tu categoría de estrellas.'],
    ],
  },
  {
    slug: 'automatizacion-eficiencia', cat: 'sector-hotelero', img: 'svc-automatizacion-eficiencia.webp',
    title: 'Automatización y Eficiencia Energética',
    summary: 'Integración de sistemas de gestión de edificios (Building Management Systems) para el control inteligente de la infraestructura hotelera. Transformamos tu hotel tradicional en un ecosistema tecnológico eficiente y monitoreado en tiempo real.',
    intro: 'Integración de sistemas de gestión de edificios (Building Management Systems) para el control inteligente de la infraestructura hotelera. Transformamos tu hotel tradicional en un ecosistema tecnológico eficiente y monitoreado en tiempo real.',
    details: 'El mayor gasto operativo de un hotel es el consumo energético. Nuestro servicio de integración tecnológica centraliza el control de tus sistemas críticos (iluminación, climatización, bombeo de agua y extracción) para que operen según la demanda real y la ocupación del edificio. Implementamos sensores y tableros automatizados que no solo garantizan el confort absoluto del huésped, sino que blindan el presupuesto de la gerencia contra el desperdicio eléctrico y las sobrecargas:',
    bullets: [
      ['Control inteligente de climatización:', 'Automatización de chillers y equipos VRF/VRV para ajustar temperaturas en áreas comunes y habitaciones basándose en horarios y niveles de ocupación.'],
      ['Monitoreo hidráulico automatizado:', 'Sistemas de control para cuartos de bombas, calderas y calentadores, garantizando presión y temperatura de agua constante sin intervención manual.'],
      ['Redes y Conectividad ininterrumpida:', 'Adecuación de infraestructura de telecomunicaciones y cableado estructurado para asegurar cobertura Wi-Fi de alta velocidad en el 100% de las instalaciones.'],
      ['Eficiencia operativa:', 'Reducción de hasta un 30% en el consumo eléctrico mensual mediante la sincronización tecnológica de los activos electromecánicos.'],
    ],
  },
  {
    slug: 'climatizacion-hotelera', cat: 'sector-hotelero', img: 'svc-climatizacion-hotelera.webp',
    title: 'Climatización Hotelera de Precisión',
    summary: 'Diseño, instalación y mantenimiento de sistemas de aire acondicionado centralizados e individuales, enfocados en el confort térmico y el silencio absoluto para el descanso del huésped.',
    intro: 'Diseño, instalación y mantenimiento de sistemas de aire acondicionado centralizados e individuales, enfocados en el confort térmico y el silencio absoluto para el descanso del huésped.',
    details: 'En una habitación de hotel, el sistema de climatización debe sentirse, pero jamás escucharse. Sustituimos las instalaciones empíricas por cálculos de ingeniería termodinámica. Nos encargamos desde la instalación de ductería con aislamiento acústico en áreas comunes (lobbies, restaurantes, salones de eventos) hasta el mantenimiento preventivo de unidades fan-coil en habitaciones, asegurando calidad de aire interior y erradicando los malos olores por humedad:',
    bullets: [
      ['Ingeniería de confort:', 'Dimensionamiento térmico para garantizar temperaturas ideales sin corrientes de aire molestas sobre las camas o mesas.'],
      ['Aislamiento acústico:', 'Intervención técnica en equipos y ductos para eliminar vibraciones y ruidos que interfieran con la experiencia de descanso.'],
      ['Mantenimiento preventivo hotelero:', 'Rutinas de limpieza química profunda y cambio de filtros programados en temporadas de baja ocupación.'],
    ],
  },
];

// Tarjetas de la sección "Soluciones diseñadas…" de la portada
export const homeCards = [
  { img: 'card-construccion.webp', title: 'Construcción y Estructuras', text: 'Garantía de seguridad y durabilidad en cada obra.', href: 'servicios/estructuras-metalicas.html' },
  { img: 'card-mantenimiento.webp', title: 'Mantenimiento Preventivo', text: 'Anticipe las fallas, reduce riesgos y optimiza el rendimiento de sus activos.', href: 'servicios/planes-mantenimiento.html', crop: 'top' },
  { img: 'card-impermeabilizacion.webp', title: 'Impermeabilización', text: 'Soluciones en sus estructuras para goteras y humedades.', href: 'servicios/impermeabilizacion.html' },
  { img: 'card-remod-corporativa.webp', title: 'Remodelación Corporativa', text: 'Ingeniería de mantenimiento y renovación de espacios.', href: 'servicios/remodelacion-corporativa.html' },
  { img: 'card-remod-hospitalaria.webp', title: 'Remodelación Hospitalaria', text: 'Soluciones en instalaciones del área de salud y sus servicios asociados.', href: 'servicios/remodelacion-hospitalaria.html' },
  { img: 'card-climatizacion.webp', title: 'Climatización y Refrigeración', text: 'Soluciones integrales en aire acondicionado y refrigeración para espacios y procesos.', href: 'servicios/climatizacion.html' },
];

// Acordeón "¿Por qué somos el único aliado…?" de la portada
export const whyUs = [
  {
    q: 'Más de una década resolviendo los retos técnicos de la industria venezolana',
    title: '{o}Más de una década{/o} resolviendo los retos técnicos de la industria venezolana',
    text: 'Nos respaldan más de 11 años de experiencia ejecutando soluciones de ingeniería en el mercado venezolano, con alcance en la Región Andes y Capital. Desde adecuaciones de alta exigencia en clínicas hasta la recuperación eléctrica de complejos industriales, aplicamos el más alto rigor técnico y normativo para proteger tu inversión.',
    btn: 'Nosotros', href: 'nosotros.html', img: 'frase1.webp',
  },
  {
    q: 'Ingeniería diseñada para que el ritmo de tu negocio nunca se detenga',
    title: 'Ingeniería diseñada para que el ritmo de tu negocio {o}nunca se detenga{/o}',
    text: 'Entendemos que el éxito de tu empresa y la tranquilidad de tus instalaciones dependen de una infraestructura que no falla. No nos limitamos a "reparar"; diseñamos y ejecutamos planes de mantenimiento técnico (preventivo y correctivo) orientados a evitar paradas críticas, asegurando que tu operatividad se mantenga al 100% sin interrupciones.',
    btn: 'Conoce nuestros servicios más destacados', href: 'soluciones.html', img: 'card-construccion.webp', // PENDIENTE
  },
  {
    q: 'Delega todo tu mantenimiento técnico en un sólo equipo de especialistas',
    title: 'Delega todo tu mantenimiento técnico en {o}un sólo equipo{/o} de especialistas',
    text: 'Eliminamos el desgaste logístico de lidiar con múltiples proveedores. Integramos obras civiles, proyectos eléctricos y sistemas de climatización bajo una misma dirección de ingeniería. Unificamos las responsabilidades en un solo equipo para garantizar fluidez, ahorro de tiempo y un control de calidad absoluto en cada fase de tu proyecto.',
    btn: 'Conoce nuestros servicios más destacados', href: 'soluciones.html', img: 'frase3.webp',
  },
];

// Tarjetas de proyectos (Nosotros y "Soluciones relacionadas")
export const projectCards = [
  { img: 'obras-impermeabilizacion.webp', title: 'Impermeabilización\nde Alta Exigencia', text: 'Ejecución de obras de impermeabilización definitivas en losas de techo, terrazas y tanques de agua de gran capacidad.', href: 'servicios/impermeabilizacion.html' },
  { img: 'proj-refrigeracion.webp', title: 'Refrigeración Comercial\ne Industrial', text: 'Diseño, instalación y mantenimiento de cavas cuarto, vitrinas refrigeradas (Vissacoolers) y sistemas de enfriamiento a gran escala.', href: 'servicios/refrigeracion-comercial.html' },
  { img: 'proj-centralizacion.webp', title: 'Centralización Operativa', text: 'Gestión integral de servicios técnicos para empresas, centros comerciales y edificios corporativos.', href: 'servicios/centralizacion-operativa.html' },
  { img: 'remod-corp.webp', title: 'Remodelación Corporativa\ne Industrial', text: 'Diseño y ejecución de obras civiles para oficinas, locales y áreas de alto tráfico.', href: 'servicios/remodelacion-corporativa.html' },
  { img: 'card-remod-hospitalaria.webp', title: 'Remodelación Hospitalaria\ny Clínica', text: 'Adecuación civil de quirófanos y centros de salud bajo estrictas normativas.', href: 'servicios/remodelacion-hospitalaria.html' },
  { img: 'estructuras.webp', title: 'Construcción y\nEstructuras Metálicas', text: 'Cálculo, fabricación y montaje de estructuras metálicas, losas de tabelón y ampliaciones.', href: 'servicios/estructuras-metalicas.html' },
];

// Artículos (publicaciones de Instagram) — página Soluciones
// crop = [ancho%, alto%, izquierda%, arriba%] del recorte que usa el diseño en la tarjeta.
export const articles = [
  {
    slug: 'cuatro-proveedores', img: 'post-mayor-error.webp', crop: [105.5, 223.62, -1.58, -45.29], mainCrop: [100.03, 223.62, -0.01, -45.29],
    title: '¿Por qué contratar a cuatro proveedores distintos es el mayor error en el mantenimiento de tu negocio?',
    cardTitle: '¿Por qué contratar a cuatro proveedores es el mayor error en el mantenimiento de tu negocio?',
    text: 'Lidiar con múltiples contratistas es un dolor de cabeza logístico que tu empresa (o condominio) no necesita.',
    body: 'Lidiar con múltiples contratistas es un dolor de cabeza logístico que tu empresa (o condominio) no necesita.\n\n**Cuando el mantenimiento se fragmenta, las responsabilidades se pierden.**\n\n**En EG SOLUTIONS C.A.** operamos bajo un enfoque multidisciplinario.\nDesde la impermeabilización del techo hasta la recuperación de los tableros eléctricos y sistemas de refrigeración comercial, unificamos la ingeniería para garantizar la óptima operatividad de tu inmueble. Más de 11 años de trayectoria en el mercado venezolano nos respaldan.',
  },
  {
    slug: 'ingenieria-de-precision', img: 'post-precision.webp', crop: [118.8, 251.8, -5.9, -91.78], mainCrop: [118.8, 287.03, -5.9, -104.63],
    title: 'Ingeniería de Precisión: Donde la vida no admite improvisaciones',
    cardTitle: 'Ingeniería de Precisión:\nDonde la vida no admite improvisaciones',
    text: 'Un quirófano no es una simple habitación; es una máquina de soporte vital. Intervenir un área quirúrgica exige tolerancia cero y el cumplimiento estricto de normativas hospitalarias.',
    pending: true,
  },
  {
    slug: 'mancha-de-humedad', img: 'post-humedad.webp', crop: [108.8, 208.4, -4.4, -93.95], mainCrop: [108.8, 226.5, -4.4, -105.85],
    title: 'Esa pequeña mancha de humedad es una bomba de tiempo para tus equipos más costosos',
    cardTitle: 'Esa pequeña mancha de humedad es una bomba de tiempo para tus equipos más costosos',
    text: 'En instalaciones corporativas, clínicas o industriales, el agua no solo daña la pintura; corroe estructuras, genera cortocircuitos en maquinarias críticas, contamina áreas estériles y detiene la producción.',
    pending: true,
  },
  {
    slug: 'remodelar-una-clinica', img: 'post-clinica.webp', crop: [114.44, 242.78, -14.38, -60.17],
    title: 'Por qué remodelar una clínica, nunca debe tratarse como la remodelación de una oficina',
    cardTitle: 'Por qué remodelar una clínica, nunca debe tratarse como la remodelación de una oficina',
    text: 'Contratar a la misma empresa que remodeló las oficinas administrativas para construir tu nuevo quirófano o área de triaje es una bomba de tiempo.',
    pending: true,
  },
  {
    slug: 'piso-agrietado', img: 'post-pisos.webp', crop: [131.95, 163.17, -18.24, -1.64],
    title: 'Un piso agrietado en tu empresa no es un problema estético, es una fuga constante de dinero y un riesgo normativo',
    cardTitle: 'Un piso agrietado en tu empresa no es un problema estético, es una fuga constante de dinero y un riesgo normativo',
    text: '¿Cuánto le cuesta a tu empresa detener la producción o cerrar un área solo para reparar un piso deteriorado?',
    cardText: '¿Cuánto le cuesta a tu empresa detener la producción o cerrar un área solo para...',
    pending: true,
  },
  {
    slug: 'que-ingenieria-requiere-tu-empresa', img: 'post-ingenieria.webp', crop: [111.62, 237.29, -4.81, 0],
    title: '¿Qué tipo de ingeniería requiere tu empresa?',
    cardTitle: '¿Qué tipo de ingeniería requiere tu empresa?',
    text: '¿Le estás exigiendo resistencia industrial a un piso puramente decorativo? O peor... ¿estás sacrificando la imagen de tu marca por instalar un piso "que aguante"?',
    pending: true,
  },
  {
    slug: 'piso-de-alto-trafico', img: 'card-remod-corporativa.webp', crop: [118.04, 112.93, -9.02, -6.8],
    title: '¿Cambiando el piso de tu local cada dos años por el alto tráfico? La estética comercial también exige ingeniería',
    cardTitle: '¿Cambiando el piso de tu local cada dos años por el alto tráfico? La estética comercial también exige ingeniería',
    text: 'La primera impresión de tu cliente entra por los pies, pero el dolor de cabeza operativo lo sufres tú.',
    pending: true,
  },
  {
    slug: 'climatizacion-no-solo-frio', img: 'post-climatizacion.webp', crop: [118.04, 251.28, 0.02, -87.75],
    title: 'Tu sistema de climatización no está ahí "sólo para dar frío" (y pensar así te está costando dinero)',
    cardTitle: 'Tu sistema de climatización no está ahí ¨sólo para dar frío¨\n(y pensar así te está costando dinero)',
    text: '¿Sabías que un sistema de climatización sin mantenimiento técnico puede incrementar tu consumo eléctrico hasta en un 30%?',
    cardText: '¿Sabías que un sistema de climatización sin mantenimiento técnico puede incrementar tu consumo eléctrico hasta en un 30%...',
    pending: true,
  },
];

export const testimonials = Array.from({ length: 6 }, (_, i) => ({
  // PENDIENTE: el diseño usa textos de ejemplo; sustituir por opiniones reales de clientes.
  name: 'Nombre del Cliente',
  text: 'Excelente servicio! Los mejores en mantenimiento, remodelación e impermeabilización.',
  stars: ['stars-b.svg', 'stars-c.svg', 'stars-a.svg'][i % 3],
}));
