import React from 'react';
import { ArrowUpRight, Compass, Shield, Wind, Box, FileText } from 'lucide-react';

interface ServicesSectionProps {
  onRequestConsultation: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onRequestConsultation
}) => {
  const services = [
    {
      index: '01',
      title: 'Consultoría Estructural & Optimización Paramétrica',
      summary: 'Dimensionamiento y cálculo analítico por elementos finitos (FEM) para geometrías complejas, grandes luces y estructuras singulares.',
      deliverables: [
        'Modelado tridimensional en CYPE y SAP2000',
        'Cálculo de voladizos postensados y losas aligeradas',
        'Estructuras híbridas en madera contralaminada (CLT) y acero',
        'Memoria de cálculo visada conforme a Eurocódigos y CTE DB-SE'
      ],
      icon: Compass
    },
    {
      index: '02',
      title: 'Ingeniería de Fachadas & Envolventes Complejas',
      summary: 'Diseño técnico de cerramientos de alto rendimiento térmico, estanqueidad y resolución de encuentros constructivos críticos.',
      deliverables: [
        'Cálculo de muros cortina suspendidos y costillas de vidrio',
        'Modelado higrotérmico dinámico en 2D/3D (Software THERM & WUFI)',
        'Erradicación milimétrica de puentes térmicos lineales',
        'Ensayos de resistencia a carga de viento y estanqueidad al agua'
      ],
      icon: Shield
    },
    {
      index: '03',
      title: 'Simulación Bioclimática & Certificación Passivhaus',
      summary: 'Modelado termodinámico dinámico para alcanzar balances de consumo casi nulo (nZEB) y máxima calificación de confort ambiental.',
      deliverables: [
        'Cálculo de balance energético PHPP (Passivhaus Planning Package)',
        'Simulación de dinámica de fluidos (CFD) para ventilación natural',
        'Dirección y auditoría de ensayos de hermeticidad Blower Door (n50)',
        'Consultoría para obtención de sellos LEED Platinum, BREEAM y WELL'
      ],
      icon: Wind
    },
    {
      index: '04',
      title: 'BIM Management LOD 400/500 & Coordinación OpenBIM',
      summary: 'Integración rigurosa de modelos de arquitectura, cálculo de estructuras y redes MEP para prefabricación e industrialización sin errores.',
      deliverables: [
        'Planes de Ejecución BIM (BEP) y federación de modelos IFC',
        'Detección anticipada de interferencias y colisiones espaciales (Clash Detection)',
        'Extracción automatizada de mediciones y presupuesto en formato BC3',
        'Modelado As-Built para gemelo digital y mantenimiento de activos'
      ],
      icon: Box
    },
    {
      index: '05',
      title: 'Peritajes Estructurales & Patología de la Edificación',
      summary: 'Diagnóstico forense ante fallos estructurales, asientos diferenciales, fisuras en hormigón armado o patologías de humedad.',
      deliverables: [
        'Inspección in situ con ensayos no destructivos (esclerometría, ultrasonidos)',
        'Monitoreo de movimientos de grietas mediante testigos ópticos y sensores',
        'Proyectos técnicos de consolidación y refuerzo estructural con fibra de carbono',
        'Dictámenes periciales judiciales ratificados por arquitectos colegiados'
      ],
      icon: FileText
    }
  ];

  return (
    <section id="servicios-consultoria" className="py-12 sm:py-16 bg-[#f4f3ee] border-b border-[#161616]/15 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#161616]/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#161616]/75 mb-2">
              <span className="w-2 h-2 bg-[#ff4400] inline-block"></span>
              <span>COMPETENCIAS TÉCNICAS DISPONIBLES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#161616]">
              SERVICIOS DE CONSULTORÍA ESPECIALIZADA
            </h2>
          </div>

          <div className="font-mono text-xs text-[#161616]/70">
            AMBITO: INTERVENCIONES NACIONALES E INTERNACIONALES
          </div>
        </div>

        {/* Numbered Editorial Services List */}
        <div className="border border-[#161616]/20 divide-y divide-[#161616]/20 bg-[#fcfbfa]">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.index}
                className="p-6 sm:p-8 hover:bg-[#f9f8f4] transition-colors group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Service Number & Icon (2 cols) */}
                  <div className="lg:col-span-2 flex items-center lg:flex-col lg:items-start justify-between gap-4 font-mono">
                    <span className="text-2xl sm:text-3xl font-bold text-[#ff4400]">
                      {service.index}.
                    </span>
                    <div className="w-10 h-10 bg-[#f4f3ee] border border-[#161616]/20 flex items-center justify-center text-[#161616] group-hover:bg-[#ff4400] group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Summary (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#161616] leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm text-[#161616]/80 leading-relaxed">
                      {service.summary}
                    </p>

                    <div>
                      <button
                        onClick={() => onRequestConsultation(service.title)}
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#ff4400] font-semibold uppercase hover:text-[#161616] transition-colors mt-2"
                      >
                        <span>Contratar este servicio</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Deliverables Checklist (5 cols) */}
                  <div className="lg:col-span-5 bg-[#f5f3ec] p-4 sm:p-5 border border-[#161616]/10 space-y-2.5 font-mono text-xs">
                    <div className="text-[10px] uppercase font-bold text-[#161616]/60 tracking-wider">
                      ENTREGABLES & DOCUMENTACIÓN TÉCNICA:
                    </div>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#161616]/85 font-body">
                          <span className="text-[#ff4400] font-mono font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
