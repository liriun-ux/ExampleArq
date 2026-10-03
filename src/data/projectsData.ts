export interface MaterialSpec {
  name: string;
  specs: string;
  provenance: string;
}

export interface EnergyMetrics {
  thermalDemand: string;
  embodiedCarbon: string;
  renewableShare: string;
  uValueEnvelope: string;
}

export interface TechnicalSpecs {
  foundation: string;
  structure: string;
  facade: string;
  hvac: string;
  acoustics: string;
  roofing: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  category: 'cultural' | 'residencial' | 'corporativo' | 'sostenible' | 'patrimonio';
  categoryLabel: string;
  tagline: string;
  location: string;
  coordinates: string;
  year: string;
  area: string;
  volume: string;
  status: 'Construido' | 'En Ejecución' | 'Proyecto Ejecutivo' | 'Premiado FAD';
  image: string;
  drawingScheme: string;
  blueprintId: string;
  client: string;
  leadConsultant: string;
  certification: string;
  overview: string;
  architecturalConcept: string;
  energyMetrics: EnergyMetrics;
  technicalSpecs: TechnicalSpecs;
  materialPalette: MaterialSpec[];
  keyChallenges: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'agora-liquida',
    code: 'VR-2025-CUL',
    title: 'Centro Cultural Ágora Líquida',
    category: 'cultural',
    categoryLabel: 'Equipamiento Cultural',
    tagline: 'Estructura en hormigón autocompactante y diafragma acústico con lámina de agua reflectante.',
    location: 'Valencia, España',
    coordinates: '39°28\'12"N 0°22\'35"W',
    year: '2025',
    area: '4.850 m²',
    volume: '23.400 m³',
    status: 'Construido',
    image: '/src/assets/images/project_cultural_center_1791057067756.jpg',
    drawingScheme: 'Planta de nivelación y voladizos postensados sobre lámina hídrica',
    blueprintId: 'plan-cultural',
    client: 'Fundación Mediterránea de las Artes',
    leadConsultant: 'Dr. Arq. Ferran Mas & Arq. Irene Soriano',
    certification: 'LEED Platinum (92 pts) & Verde GBCe',
    overview: 'Complejo cultural y polivalente concebido como una transición tectónica entre el espacio público de la ribera y las salas expositivas. La consultoría técnica resolvió un voladizo estructural de 14,2 metros sin pilares intermedios sobre una piscina de amortiguación térmica.',
    architecturalConcept: 'La masa térmica del hormigón ciclópeo exterior estabiliza la temperatura interior frente a la severa radiación estival, mientras que una secuencia de lucernarios orientados a 340° Norte baña las galerías de luz difusa sin ganancia solar directa.',
    energyMetrics: {
      thermalDemand: '11.8 kWh/m²·año',
      embodiedCarbon: '298 kg CO₂e/m² (-42% vs. tipología)',
      renewableShare: '84% autoconsumo fotovoltaico BIPV',
      uValueEnvelope: '0.13 W/m²K'
    },
    technicalSpecs: {
      foundation: 'Losa armada de 110 cm sobre 42 pilotes de hinca profunda (diámetro 800 mm) anclados en sustrato margoso impermeable con doble impermeabilización bentonítica.',
      structure: 'Hormigón blanco autocompactante visto H-40 con encofrado fenólico continuo de abeto nórdico cepillado. Muros pantalla de 60 cm de espesor y losa superior postensada uniaxialmente.',
      facade: 'Muro cortina suspendido de vidrio triple bajo emisivo con capa selectiva y gas argón (44.2 / 16 gas / 6 / 16 gas / 44.2). Factor solar g = 0,26.',
      hvac: 'Intercambiador geotérmico de circuito cerrado con 18 pozos a 120 metros acoplados a bomba de calor agua-agua polivalente y suelo radiante-refrescante zonificado.',
      acoustics: 'Revestimiento fonoabsorbente de lamas de roble microperforado NRC 0.85 con plenum de lana mineral basáltica de 70 kg/m³ para sala sinfónica.',
      roofing: 'Cubierta ecológica aljibe intensiva con vegetación halófila autóctona que retiene el 100% de la escorrentía para riego y enfriamiento evaporativo.'
    },
    materialPalette: [
      { name: 'Hormigón Blanco H-40', specs: 'Cemento sulforresistente CEM III/B, árido calizo seleccionado', provenance: 'Buñol, Valencia' },
      { name: 'Vidrio Estructural Low-E', specs: 'Composición triple laminada U=0.6 W/m²K con serigrafía micropunto', provenance: 'SGG Saint-Gobain' },
      { name: 'Madera de Roble Europeo', specs: 'Lamas macizas certificadas FSC con tratamiento ignífugo Euroclase B-s1,d0', provenance: 'Navarra' },
      { name: 'Piedra Arenisca Calatorao', specs: 'Pavimento abujardado antideslizante clase 3 en exteriores', provenance: 'Zaragoza' }
    ],
    keyChallenges: [
      'Cálculo de flecha diferida a 30 años en voladizo postensado de 14.2m.',
      'Aislamiento del nivel freático costero con barrera continua autoadhesiva.',
      'Control estricto de la fisuración de retracción en paños de 24 metros de hormigón visto.'
    ]
  },
  {
    id: 'residencia-cantilever',
    code: 'VR-2024-RES',
    title: 'Residencia Cantilever Mirador',
    category: 'residencial',
    categoryLabel: 'Residencial Vanguardista',
    tagline: 'Vivienda unifamiliar aislada suspendida sobre acantilado granítico con certificación Passivhaus Plus.',
    location: 'Begur, Costa Brava',
    coordinates: '41°57\'15"N 3°12\'40"E',
    year: '2024',
    area: '620 m²',
    volume: '2.180 m³',
    status: 'Construido',
    image: '/src/assets/images/project_cliff_residence_1791057077018.jpg',
    blueprintId: 'plan-residential',
    drawingScheme: 'Planta alta suspendida con análisis de tensiones de tracción en tirantes',
    client: 'Colección Privada Arq & Paisaje',
    leadConsultant: 'Arq. Mateo Valenzuela',
    certification: 'Passivhaus Plus & Certificación nZEB',
    overview: 'Emplazada en una pendiente rocosa del 48%, la vivienda se articula como dos prismas tectónicos desfasados. La planta superior vuela 6,8 metros sobre el vacío marino mediante una viga pared cajón de hormigón armado aligerado.',
    architecturalConcept: 'Minimizar la huella en el terreno mediante tres únicos puntos de apoyo masivos sobre micropilotes perforados en granito. Los patios interiores captan las brisas marinas diurnas generando ventilación cruzada natural.',
    energyMetrics: {
      thermalDemand: '8.4 kWh/m²·año (Calefacción) / 9.1 kWh/m²·año (Refrigeración)',
      embodiedCarbon: '275 kg CO₂e/m²',
      renewableShare: '100% neto anual (Genera 13.200 kWh/año)',
      uValueEnvelope: '0.11 W/m²K'
    },
    technicalSpecs: {
      foundation: '24 micropilotes autoperforantes de 150 mm inyectados con lechada de cemento en macizo rocoso hasta 8 metros de profundidad, atados por encepados de hormigón armado.',
      structure: 'Viga Vierendeel de hormigón armado con canto de 3,20 m integrada en el cerramiento de fachada, combinada con forjado colaborante aligerado.',
      facade: 'Envolvente térmica continua exterior de corcho negro aglomerado expandido (ICB) de 160 mm y acabado mineral a la cal hidráulica transpirable.',
      hvac: 'Sistema de ventilación mecánica controlada (VMC) de doble flujo con recuperación de calor entálpica de alta eficiencia (93%) Zehnder ComfoAir Q.',
      acoustics: 'Aislamiento a ruido aéreo de fachada R\'w + Ctr = 48 dBA frente a temporales de tramontana.',
      roofing: 'Cubierta plana ajardinada extensiva con especies suculentas crasuláceas sin requerimiento de riego artificial.'
    },
    materialPalette: [
      { name: 'Hormigón con Encofrado Entablillado', specs: 'Textura de tablilla de pino sin desbastar con desencofrante vegetal', provenance: 'Girona' },
      { name: 'Aislamiento Corcho Negro Expandido', specs: 'Panel 100% natural sin resinas sintéticas lambda 0.038 W/mK', provenance: 'Palafrugell' },
      { name: 'Carpintería de Madera-Aluminio', specs: 'Perfil Passivhaus certificado Uw = 0.72 W/m²K con triple junta', provenance: 'Carinbisa' }
    ],
    keyChallenges: [
      'Estudio geotécnico de discontinuidades diaclasadas en acantilado costero.',
      'Control milimétrico del puente térmico en el encuentro del voladizo con el macizo.',
      'Hermeticidad al aire acreditada con ensayo Blower Door n50 = 0.38 renovaciones/hora.'
    ]
  },
  {
    id: 'torre-helios',
    code: 'VR-2026-COR',
    title: 'Torre Helios Bioclimática',
    category: 'corporativo',
    categoryLabel: 'Torres Corporativas',
    tagline: 'Sede corporativa de 28 plantas con doble piel ventilada y lamas cerámicas autolimpiables.',
    location: 'Madrid, Distrito Financiero',
    coordinates: '40°28\'48"N 3°41\'22"W',
    year: '2026',
    area: '24.600 m²',
    volume: '98.000 m³',
    status: 'En Ejecución',
    image: '/src/assets/images/project_tower_facade_1791057086506.jpg',
    blueprintId: 'plan-tower',
    drawingScheme: 'Sección vertical bioclimática y fachada de doble piel activa',
    client: 'Inmobiliaria Corporativa Ibérica',
    leadConsultant: 'Dr. Ing. Gonzalo de la Vega & Arq. Clara Beltrán',
    certification: 'LEED Platinum candidato (96 pts) & WELL Platinum v2',
    overview: 'Edificio terciario de alta eficiencia concebido bajo el estándar nZEB. La fachada cinética orientada al suroeste modula dinámicamente la entrada solar mediante lamas cerámicas terracota accionadas por actuadores solares paramétricos.',
    architecturalConcept: 'Un núcleo central de hormigón de alta resistencia aloja las comunicaciones verticales y canaliza una chimenea solar de tiro inducido que renueva el aire interior de las plantas diáfanas por convección natural.',
    energyMetrics: {
      thermalDemand: '14.2 kWh/m²·año',
      embodiedCarbon: '340 kg CO₂e/m²',
      renewableShare: '62% autoconsumo con fachada BIPV vertical',
      uValueEnvelope: '0.15 W/m²K'
    },
    technicalSpecs: {
      foundation: 'Losa masiva de cimentación de 240 cm combinada con 78 pilotes barrena continua de 1200 mm de diámetro hasta 28 metros de profundidad.',
      structure: 'Núcleo rígido central autotrepante de hormigón armado C60/75 con pilares mixtos acero-hormigón perimetrales y losas alveolares pretensadas.',
      facade: 'Doble piel activa con pasarela de mantenimiento: piel exterior de vidrio simple templado serigrafiado con lamas de gres porcelánico extrusionado y piel interior con doble acristalamiento.',
      hvac: 'Sistema VRF de recuperación de calor simultánea 3 tubos de caudal variable combinado con vigas frías activas de inducción en falso techo acústico.',
      acoustics: 'Atenuación acústica entre plantas Ln,w = 42 dB y fonoabsorción en núcleo NRC = 0.80.',
      roofing: 'Cubierta técnica bioclimática con pérgola fotovoltaica de 450 kWp y jardín botánico para bienestar de los ocupantes.'
    },
    materialPalette: [
      { name: 'Cerámica Terracota Extrudida', specs: 'Lamas tridimensionales esmaltadas en tono tierra cocida con recubrimiento de TiO2 autolimpiable', provenance: 'Castellón' },
      { name: 'Acero Estructural Reciclado', specs: 'Perfiles laminados S355JR con 85% de contenido de chatarra reciclada de arco eléctrico', provenance: 'ArcelorMittal' },
      { name: 'Vidrio de Control Solar Avanzado', specs: 'Vidrio selectivo Cool-Lite Xtreme con TL = 70% y FS = 0.33', provenance: 'Saint-Gobain Glass' }
    ],
    keyChallenges: [
      'Modelado de dinámica de fluidos computacional (CFD) para la chimenea solar en 28 alturas.',
      'Sincronización BIM LOD 500 para la prefabricación milimétrica de los módulos de fachada.',
      'Resistencia a cargas de viento dinámico ensayada en túnel de viento a escala 1:150.'
    ]
  },
  {
    id: 'pabellon-clt-biodiversidad',
    code: 'VR-2025-SOS',
    title: 'Pabellón de Investigación Botánica & CLT',
    category: 'sostenible',
    categoryLabel: 'Arquitectura Bioclimática & Madera',
    tagline: 'Estructura en madera contralaminada (CLT) y tapial ciclópeo con huella de carbono negativa.',
    location: 'Valle de Ultzama, Navarra',
    coordinates: '42°59\'20"N 1°40\'50"W',
    year: '2025',
    area: '1.420 m²',
    volume: '5.800 m³',
    status: 'Premiado FAD',
    image: '/src/assets/images/hero_brutalist_elevation_1791057054443.jpg',
    blueprintId: 'plan-clt',
    drawingScheme: 'Planta de distribución estructural modular y pórticos de madera laminada',
    client: 'Instituto Pirenaico de Ecología Forestal',
    leadConsultant: 'Arq. Helena Berasategui',
    certification: 'Passivhaus Premium & Huella de Carbono Negativa (-180 t CO₂)',
    overview: 'Centro de investigación y vivero experimental construido con madera local certificada PEFC procedente de gestión forestal sostenible a menos de 40 km de la parcela. Secuestra más carbono del emitido en su ciclo de vida.',
    architecturalConcept: 'La cubierta parabólica hiperbólica recoge la escorrentía pluvial hacia un humedal interior depurador mientras las chimeneas solares de tapial regulan la humedad ambiental de forma higroscópica pasiva.',
    energyMetrics: {
      thermalDemand: '6.2 kWh/m²·año',
      embodiedCarbon: '-128 kg CO₂e/m² (Balance Neto Negativo)',
      renewableShare: '100% geotermia y biomasa local',
      uValueEnvelope: '0.09 W/m²K'
    },
    technicalSpecs: {
      foundation: 'Zapatas corridas de hormigón con árido reciclado y losa flotante de grava de vidrio celular aislante (Misapor) de 30 cm que evita puentes térmicos en solera.',
      structure: 'Paneles de madera contralaminada CLT de 5 capas (160 mm) de abeto y vigas bi-articuladas de madera microlaminada LVL.',
      facade: 'Muros de tapial de tierra estabilizada in situ de 50 cm de espesor combinados con fachada ventilada de alerce carbonizado tradicional (técnica Shou Sugi Ban).',
      hvac: 'Pozo canadiense-provenzal de aire geotérmico entubado a 2,5 m de profundidad acoplado a caldera de biomasa de astilla forestal.',
      acoustics: 'Paneles de viruta de madera ligada con magnesita Celenit y techos fonoabsorbentes.',
      roofing: 'Cubierta verde silvestre con sustrato de 25 cm y especies de prado pirenaico con cero mantenimiento.'
    },
    materialPalette: [
      { name: 'Madera Contralaminada CLT', specs: 'Paneles certificados PEFC de pino radiata con adhesivo poliuretánico libre de formaldehído', provenance: 'Egoin, País Vasco' },
      { name: 'Tierra Cruda Estabilizada', specs: 'Mezcla de arcillas del desmonte del terreno con 4% de cal aérea grasa', provenance: 'In Situ, Parcela' },
      { name: 'Vidrio Celular Aislante', specs: 'Grava de vidrio 100% reciclado con conductividad 0.08 W/mK y alta capacidad drenante', provenance: 'Misapor' }
    ],
    keyChallenges: [
      'Modelado higrotérmico dinámico en WUFI para evitar condensaciones intersticiales en CLT.',
      'Uniones sismorresistentes con conectores metálicos ocultos auto-taladrantes.',
      'Hermeticidad al paso del aire en juntas de panel con cintas expansivas SIGA.'
    ]
  }
];
