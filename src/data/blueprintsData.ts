export interface Hotspot {
  id: string;
  code: string;
  title: string;
  category: 'estructura' | 'envolvente' | 'mep' | 'bioclimatica';
  categoryLabel: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  detail: string;
  specification: string;
  normative: string;
  material: string;
}

export interface BlueprintPlan {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  level: string;
  scaleText: string;
  scaleRatioMetersPerPercent: number; // For measurement tool calculation
  elevation: string;
  projectId: string;
  description: string;
  hotspots: Hotspot[];
  gridAxes: {
    xAxes: { label: string; x: number }[];
    yAxes: { label: string; y: number }[];
  };
  zones: {
    name: string;
    area: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}

export const BLUEPRINTS: BlueprintPlan[] = [
  {
    id: 'plan-cultural',
    code: 'PL-01-CUL',
    title: 'Planta General de Nivelación & Estructura',
    subtitle: 'Centro Cultural Ágora Líquida — Salas de Exposición y Lámina de Agua',
    level: 'NIVEL ±0.00m',
    scaleText: 'ESCALA 1:100 (A1)',
    scaleRatioMetersPerPercent: 0.38, // 100% width = 38 meters in real world
    elevation: 'COTA +14.20m S.N.M.',
    projectId: 'agora-liquida',
    description: 'Planta técnica que ilustra la articulación entre el atrio de acceso diáfano, las salas de exposición acústicamente desacopladas y el voladizo frontal de 14.2 metros sobre la dársena.',
    gridAxes: {
      xAxes: [
        { label: 'A', x: 14 },
        { label: 'B', x: 34 },
        { label: 'C', x: 54 },
        { label: 'D', x: 74 },
        { label: 'E', x: 90 }
      ],
      yAxes: [
        { label: '1', y: 15 },
        { label: '2', y: 38 },
        { label: '3', y: 62 },
        { label: '4', y: 85 }
      ]
    },
    zones: [
      { name: 'Atrio Central & Recepción', area: '420 m²', x: 18, y: 22, width: 32, height: 35 },
      { name: 'Galería de Arte Contemporáneo', area: '680 m²', x: 53, y: 22, width: 34, height: 35 },
      { name: 'Auditorio Acústico Subterráneo', area: '310 m²', x: 18, y: 60, width: 32, height: 26 },
      { name: 'Laboratorio de Restauración', area: '240 m²', x: 53, y: 60, width: 22, height: 26 },
      { name: 'Lámina Hídrica Termo-reguladora', area: '580 m²', x: 77, y: 60, width: 14, height: 26 }
    ],
    hotspots: [
      {
        id: 'hs-cantilever',
        code: 'EST-01',
        title: 'Viga Postensada en Voladizo 14.2m',
        category: 'estructura',
        categoryLabel: 'Ingeniería Estructural',
        x: 88,
        y: 35,
        detail: 'Viga cajón pretensada con tendones no adherentes de acero de alta resistencia Y1860S7. Flecha máxima controlada en L/850 con precamber de 22mm para absorción de fluencia lenta.',
        specification: 'Hormigón H-45/F/12/IIa autocompactante con árido cuarcítico seleccionado. 12 cables de postensado de 7 cordones.',
        normative: 'Eurocódigo 2 (EN 1992-1-1) & CTE DB-SE',
        material: 'Acero postensado calidad Y1860 + Hormigón H-45'
      },
      {
        id: 'hs-curtain-wall',
        code: 'ENV-02',
        title: 'Muro Cortina Estructural Suspendido',
        category: 'envolvente',
        categoryLabel: 'Fachada & Envolvente',
        x: 52,
        y: 16,
        detail: 'Fachada acristalada suspendida por costillas estructurales de vidrio templado laminado de 3 capas. Sin montantes metálicos opacos para máxima transparencia lumínica.',
        specification: 'Triple vidrio bajo emisivo con capa magnetrónica selective SunGuard SuperNeutral 70/35. Valor U = 0.78 W/m²K, factor solar g = 0.28.',
        normative: 'CTE DB-HE Ahorro de Energía & UNE-EN 13830',
        material: 'Vidrio triple laminado con PVB acústico Sound Control'
      },
      {
        id: 'hs-geothermal',
        code: 'MEP-03',
        title: 'Distribuidor Geotérmico & Suelo Radiante',
        category: 'mep',
        categoryLabel: 'Instalaciones MEP',
        x: 32,
        y: 68,
        detail: 'Múltiple de distribución hidráulica conectado a 18 sondas geotérmicas de polietileno PE100-RC en circuito cerrado de doble U a 120m de profundidad.',
        specification: 'COP estacional = 5.2 en régimen de calefacción; EER = 6.4 en refrescamiento pasivo Free-Cooling sin compresores activos.',
        normative: 'RITE (Reglamento de Instalaciones Térmicas en los Edificios)',
        material: 'Tuberías PE-RT con barrera antioxígeno EVOH'
      },
      {
        id: 'hs-water-pool',
        code: 'BIO-04',
        title: 'Lámina Hídrica de Microclima Bioclimático',
        category: 'bioclimatica',
        categoryLabel: 'Estrategia Bioclimática',
        x: 82,
        y: 72,
        detail: 'Espejo de agua perimetral diseñado para inducir corrientes convectivas descendentes por enfriamiento evaporativo, reduciendo la temperatura del aire exterior hasta 4.2°C en verano.',
        specification: 'Lámina de profundidad constante de 18cm con biofiltro de plantas macrofitas y recirculación continua impulsada por energía fotovoltaica.',
        normative: 'ASHRAE 55 Thermal Environmental Conditions for Human Occupancy',
        material: 'Revestimiento impermeable de mortero polimérico continuo'
      },
      {
        id: 'hs-pilar-pantalla',
        code: 'EST-05',
        title: 'Pilar Pantalla de Transmisión Sismo-resistente',
        category: 'estructura',
        categoryLabel: 'Ingeniería Estructural',
        x: 35,
        y: 42,
        detail: 'Pilar apantallado de 35x180cm que canaliza las cargas sísmicas y de viento hacia la losa de cimentación, permitiendo liberar la fachada exterior de elementos sustentantes.',
        specification: 'Armadura vertical B-500S con estribado cerrado anti-pandeo cada 10cm en zonas críticas de plastificación.',
        normative: 'NCSE-02 Norma de Construcción Sismorresistente',
        material: 'Hormigón armado H-35 con árido rodado'
      }
    ]
  },
  {
    id: 'plan-residential',
    code: 'PL-02-RES',
    title: 'Planta Primera — Zona de Día & Voladizo',
    subtitle: 'Residencia Cantilever Mirador — Espacio Diáfano y Patios Pasivos',
    level: 'NIVEL +3.60m',
    scaleText: 'ESCALA 1:50 (A1)',
    scaleRatioMetersPerPercent: 0.22, // 100% width = 22 meters
    elevation: 'COTA +88.40m S.N.M.',
    projectId: 'residencia-cantilever',
    description: 'Planta suspendida sobre el acantilado donde el salón y cocina se proyectan hacia el horizonte mediterráneo a través de una celosía estructural de hormigón entablillado.',
    gridAxes: {
      xAxes: [
        { label: 'A', x: 18 },
        { label: 'B', x: 42 },
        { label: 'C', x: 68 },
        { label: 'D', x: 88 }
      ],
      yAxes: [
        { label: '1', y: 20 },
        { label: '2', y: 48 },
        { label: '3', y: 80 }
      ]
    },
    zones: [
      { name: 'Salón Principal Mirador', area: '88 m²', x: 50, y: 24, width: 36, height: 42 },
      { name: 'Cocina & Espacio Gastronómico', area: '45 m²', x: 22, y: 24, width: 26, height: 26 },
      { name: 'Patio de Sombras Bioclimático', area: '32 m²', x: 22, y: 52, width: 26, height: 28 },
      { name: 'Suite Panorámica en Vuelo', area: '65 m²', x: 50, y: 68, width: 36, height: 22 }
    ],
    hotspots: [
      {
        id: 'hs-viga-pared',
        code: 'EST-02',
        title: 'Viga Pared Vierendeel Aligerada',
        category: 'estructura',
        categoryLabel: 'Ingeniería Estructural',
        x: 74,
        y: 20,
        detail: 'Viga estructural continua de 3.20m de altura que conforma el propio antepecho y dintel de las ventanas panorámicas, salvando un voladizo neto de 6.8 metros.',
        specification: 'Acero corrugado B-500SD de alta ductilidad con cuantía media de 145 kg/m³ para resistir momentos negativos de empotramiento.',
        normative: 'Código Estructural Español 2021 & CTE DB-SE',
        material: 'Hormigón H-35 con aditivo reductor de agua y retracción controlada'
      },
      {
        id: 'hs-corte-termico',
        code: 'ENV-01',
        title: 'Rotura de Puente Térmico Estructural Isokorb',
        category: 'envolvente',
        categoryLabel: 'Aislamiento Passivhaus',
        x: 48,
        y: 38,
        detail: 'Elemento de rotura de puente térmico Schöck Isokorb integrado entre el forjado interior climatizado y la terraza volada exterior, evitando condensaciones y pérdidas.',
        specification: 'Transmitancia térmica lineal Psi = 0.08 W/m·K. Capacidad portante a flexión negativa y cortante dinámico.',
        normative: 'Criterios de Certificación Passivhaus Institut Darmstadt',
        material: 'Armadura de acero inoxidable dúplex y aislamiento de Neopor EPS grafitado'
      },
      {
        id: 'hs-vmc-passivhaus',
        code: 'MEP-01',
        title: 'Unidad de Ventilación VMC con Recuperador 93%',
        category: 'mep',
        categoryLabel: 'Climatización Passivhaus',
        x: 28,
        y: 45,
        detail: 'Equipo de ventilación de confort con recuperación de calor entálpico Zehnder ComfoAir Q350 con bypass automático 100% para enfriamiento nocturno estival.',
        specification: 'Filtros F7 para polen/PM2.5 en admisión y G4 en extracción. Consumo eléctrico específico 0.24 Wh/m³.',
        normative: 'UNE-EN 13141-7 & Passivhaus Certified Component',
        material: 'Conductos semirrígidos higiénicos Clinside con tratamiento antibacteriano'
      },
      {
        id: 'hs-chimenea-solar',
        code: 'BIO-02',
        title: 'Patio de Ventilación Cruzada por Efecto Venturi',
        category: 'bioclimatica',
        categoryLabel: 'Diseño Bioclimático',
        x: 35,
        y: 65,
        detail: 'Apertura cenital motorizada que aprovecha la brisa marina dominante canalizada entre los dos volúmenes rocosos, forzando la renovación del 100% del aire en 12 minutos.',
        specification: 'Apertura automática vinculada a estación meteorológica y sensores interiores de CO₂ y temperatura.',
        normative: 'CTE DB-HS Salubridad & Calidad del Aire Interior',
        material: 'Lamas orientables de aluminio con rotura de puente térmico'
      }
    ]
  },
  {
    id: 'plan-tower',
    code: 'PL-03-COR',
    title: 'Sección Técnica Longitudinal A-A\' & Fachada Activa',
    subtitle: 'Torre Helios Bioclimática — Núcleo Central y Chimenea de Convección Solar',
    level: 'SECCIÓN PLANTAS 01 A 28',
    scaleText: 'ESCALA 1:200 (A0)',
    scaleRatioMetersPerPercent: 0.95, // 100% = 95 meters in height
    elevation: 'DESDE COTA ±0.00m HASTA +112.00m',
    projectId: 'torre-helios',
    description: 'Corte transversal que detalla el funcionamiento termodinámico de la doble piel de fachada, el núcleo rígido de hormigón autotrepante y la captación eólica superior.',
    gridAxes: {
      xAxes: [
        { label: 'EJE NORTE', x: 22 },
        { label: 'NÚCLEO', x: 50 },
        { label: 'EJE SUR', x: 78 }
      ],
      yAxes: [
        { label: '+112m (Cubierta)', y: 15 },
        { label: '+60m (Planta 15)', y: 48 },
        { label: '+0.00m (Acceso)', y: 84 }
      ]
    },
    zones: [
      { name: 'Pérgola Fotovoltaica BIPV 450 kWp', area: '1.200 m²', x: 30, y: 12, width: 40, height: 10 },
      { name: 'Plantas Técnicas & Climatización', area: '850 m²', x: 35, y: 24, width: 30, height: 8 },
      { name: 'Plantas Diáfanas de Trabajo Corporativo', area: '18.200 m²', x: 24, y: 34, width: 52, height: 42 },
      { name: 'Atrio Triple Altura & Vestíbulo', area: '1.400 m²', x: 24, y: 78, width: 52, height: 12 }
    ],
    hotspots: [
      {
        id: 'hs-nucleo-autotrepante',
        code: 'EST-03',
        title: 'Núcleo Central Sismo-resistente C60/75',
        category: 'estructura',
        categoryLabel: 'Estructura Rascacielos',
        x: 50,
        y: 52,
        detail: 'Estructura tubular cerrada de hormigón de alta resistencia ejecutada con encofrado autotrepante hidráulico. Soporta el 82% del cortante por viento dinámico a 112m.',
        specification: 'Hormigón C60/75 con humo de sílice y aditivos superplastificantes de última generación. Espesor de muros: 60cm en base, 35cm en coronación.',
        normative: 'Eurocódigo 8 (EN 1998-1) & DB-SE-C',
        material: 'Hormigón de alta resistencia C60/75 con microsílice'
      },
      {
        id: 'hs-doble-piel',
        code: 'ENV-03',
        title: 'Doble Piel Ventilada con Lamas Cerámicas',
        category: 'envolvente',
        categoryLabel: 'Ingeniería de Fachadas',
        x: 78,
        y: 44,
        detail: 'Fachada multicapa con cámara de aire de 80cm: lamas cerámicas exteriores que interceptan el 76% de la radiación solar incidente antes de que alcance el acristalamiento.',
        specification: 'Lamas orientables de terracota extrusionada con acabado dióxido de titanio que descompone óxidos de nitrógeno (NOx) mediante fotocatálisis.',
        normative: 'LEED v4 Daylight and Quality Views & CTE DB-HE',
        material: 'Gres porcelánico extrusionado y perfiles de aluminio extruido anodizado'
      },
      {
        id: 'hs-vigas-frias',
        code: 'MEP-04',
        title: 'Climatización por Vigas Frías Activas',
        category: 'mep',
        categoryLabel: 'Instalaciones HVAC',
        x: 36,
        y: 42,
        detail: 'Unidades terminales de inducción integradas en el falso techo acústico. Acondicionan los espacios sin corrientes de aire ni turbulencias, operando con agua a 16°C.',
        specification: 'Ahorro energético del 34% respecto a sistemas de climatización por aire convencional todo-aire.',
        normative: 'EN 15116 Criterios de diseño para vigas frías activas',
        material: 'Batería de cobre-aluminio con toberas de inducción aerodinámicas'
      }
    ]
  },
  {
    id: 'plan-clt',
    code: 'PL-04-CLT',
    title: 'Planta Estructural Modular & Juntas BIM',
    subtitle: 'Pabellón de Investigación Botánica — Paneles CLT & Muros de Tapial',
    level: 'NIVEL ±0.00m',
    scaleText: 'ESCALA 1:50 (A1)',
    scaleRatioMetersPerPercent: 0.18, // 100% = 18 meters
    elevation: 'COTA +620.00m S.N.M.',
    projectId: 'pabellon-clt-biodiversidad',
    description: 'Despiece pormenorizado de los paneles de madera contralaminada CLT, conectores metálicos ciegos Rothoblaas y muros portantes de tapial de tierra cruda estabilizada.',
    gridAxes: {
      xAxes: [
        { label: 'E-1', x: 20 },
        { label: 'E-2', x: 45 },
        { label: 'E-3', x: 70 },
        { label: 'E-4', x: 88 }
      ],
      yAxes: [
        { label: 'N-1', y: 25 },
        { label: 'N-2', y: 55 },
        { label: 'N-3', y: 80 }
      ]
    },
    zones: [
      { name: 'Invernadero Bioclimático & Fitodepuración', area: '140 m²', x: 22, y: 26, width: 46, height: 28 },
      { name: 'Laboratorio de Dendrocronología', area: '95 m²', x: 70, y: 26, width: 18, height: 28 },
      { name: 'Taller de Secado & Análisis Forestal', area: '120 m²', x: 22, y: 56, width: 46, height: 24 },
      { name: 'Sala de Seminarios & Divulgación', area: '80 m²', x: 70, y: 56, width: 18, height: 24 }
    ],
    hotspots: [
      {
        id: 'hs-clt-wall',
        code: 'EST-04',
        title: 'Panel CLT 5s 160mm Portante con Unión Oculta',
        category: 'estructura',
        categoryLabel: 'Estructura en Madera',
        x: 45,
        y: 40,
        detail: 'Panel de madera contralaminada de 5 capas de abeto suizo/pirenaico encolado con poliuretano PUR monocomponente libre de solventes. Resistencia al fuego REI 90 sin revestimiento.',
        specification: 'Densidad 480 kg/m³. Unión angular mediante conectores metálicos invisibles de aleación de aluminio y tirafondos avellanados HBS.',
        normative: 'Eurocódigo 5 (EN 1995-1-1 y 1-2) Estructuras de Madera',
        material: 'Picea abies certificada PEFC Clase resistente C24'
      },
      {
        id: 'hs-tapial-tierra',
        code: 'BIO-03',
        title: 'Muro Masivo de Tapial de Tierra Cruda 50cm',
        category: 'bioclimatica',
        categoryLabel: 'Construcción Sostenible',
        x: 69,
        y: 48,
        detail: 'Muro de carga compactado mecánicamente por tongadas de 15cm con tierra procedente de la propia excavación. Actúa como acumulador de calor por inercia térmica y regulador higrométrico.',
        specification: 'Resistencia a compresión característica fk = 2.4 N/mm². Capacidad de adsorción de vapor de agua Clase WS III.',
        normative: 'Norma UNE 41410 Bloques de tierra comprimida & Guía Tapial',
        material: 'Arcilla local (60%), arena seleccionada (35%), cal aérea CL90 (5%)'
      },
      {
        id: 'hs-pozo-provenzal',
        code: 'MEP-02',
        title: 'Entrada de Aire Geotérmico Pozo Canadiense',
        category: 'mep',
        categoryLabel: 'Geotermia Pasiva',
        x: 23,
        y: 72,
        detail: 'Conducto de captación de aire enterrado a 2.5 metros de profundidad y 35 metros de longitud. El aire exterior entra precalentado a 14°C en invierno y enfriado a 18°C en verano.',
        specification: 'Tubo de polipropileno antimicrobiano con iones de plata REHAU AWADUKT Thermo. Caudal de diseño: 650 m³/h.',
        normative: 'VDI 4640 Aprovechamiento térmico del subsuelo',
        material: 'Polipropileno PP macizo de alta rigidez anular SN8'
      }
    ]
  }
];
