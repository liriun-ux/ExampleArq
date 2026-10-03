import React, { useState } from 'react';
import { ArrowDown, Layers, Maximize2, FileText, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreBlueprints: () => void;
  onExploreProjects: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreBlueprints,
  onExploreProjects,
  onOpenConsultation
}) => {
  const [activeHeroMarker, setActiveHeroMarker] = useState<number | null>(null);

  const heroElevationMarkers = [
    {
      id: 1,
      x: 35,
      y: 68,
      title: 'Muro Ciclópeo & Cimentación Aislada',
      spec: 'H-35 con árido cuarcítico y barrera de radón continua. Cota -1.20m.'
    },
    {
      id: 2,
      x: 62,
      y: 70,
      title: 'Contrafuerte de Hormigón Visto',
      spec: 'Textura encofrada con tabla cepillada vertical de 8cm. Desencofrante vegetal.'
    },
    {
      id: 3,
      x: 50,
      y: 45,
      title: 'Losa Volada Postensada',
      spec: 'Vuelo de 4.80m con tendones monocordón no adherentes. Flecha L/800.'
    },
    {
      id: 4,
      x: 52,
      y: 26,
      title: 'Hueco de Iluminación Cenital Norte',
      spec: 'Triple vidrio bajo emisivo con control solar. Transmitancia U = 0.75 W/m²K.'
    }
  ];

  return (
    <section id="inicio" className="relative border-b border-[#161616]/15 bg-[#f4f3ee] overflow-hidden">
      {/* Perimeter architectural coordinate and tick borders */}
      <div className="border-b border-[#161616]/15 flex items-center justify-between px-4 sm:px-8 py-2 text-[10px] font-mono text-[#161616]/70 uppercase tracking-widest bg-[#f7f6f2]">
        <div className="flex items-center gap-3">
          <span className="text-[#ff4400] font-bold text-xs">+</span>
          <span className="hidden sm:inline">FIG. 00-A // ALZADO PRINCIPAL NORTE — CONSULTORÍA TÉCNICA</span>
          <span className="sm:hidden">FIG. 00-A // ALZADO NORTE</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">CÁLCULO POR ELEMENTOS FINITOS (FEM)</span>
          <span>ESTADO: PROYECTO EJECUTIVO VISADO</span>
          <span className="text-[#ff4400] font-bold text-xs">+</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-14 sm:pb-16">
        {/* Main Brutalist Typography Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-[11px] uppercase tracking-wider text-[#161616]/80">
              <span className="w-2 h-2 bg-[#ff4400] inline-block"></span>
              <span>ATELIER DE INGENIERÍA ESTRUCTURAL & CONSULTORÍA DE EDIFICACIÓN</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161616] leading-[1.08] text-balance">
              ARQUITECTURA DE PRECISIÓN, PLANIMETRÍA VIVA Y RIGOR TÉCNICO.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pt-3">
            <div className="border-l-2 border-[#161616]/20 pl-4 sm:pl-6 space-y-4">
              <p className="text-sm sm:text-base text-[#161616]/80 leading-relaxed font-body">
                Resolvemos los desafíos estructurales, de envolvente y sostenibilidad más exigentes. Transformamos conceptos arquitectónicos audaces en obras seguras, certificadas y energéticamente eficientes.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  onClick={onExploreBlueprints}
                  className="inline-flex items-center justify-between gap-3 px-4 py-2.5 bg-[#161616] text-[#f4f3ee] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#ff4400] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#ff4400]" />
                    Inspeccionar Planos Interactivos
                  </span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center justify-between gap-3 px-4 py-2.5 border border-[#161616] bg-transparent text-[#161616] font-mono text-xs font-medium uppercase tracking-wider hover:bg-[#161616] hover:text-white transition-colors"
                >
                  <span>Solicitar Dictamen de Obra</span>
                  <FileText className="w-4 h-4 text-[#ff4400]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Architectural Drawing Canvas (Drawing Elevation with interactive hotspots) */}
        <div className="relative border border-[#161616]/20 bg-[#efece4] shadow-sm overflow-hidden">
          {/* Top ruler of the drawing canvas */}
          <div className="h-6 border-b border-[#161616]/15 flex items-center justify-between px-3 font-mono text-[9px] text-[#161616]/60 select-none bg-[#eae6dc]">
            <div className="flex items-center gap-2">
              <span className="text-[#ff4400] font-bold">+</span>
              <span>ALZADO AXONOMETRÍA MONOGRÁFICA // COTA REF. 0.00m</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>CANTO DE FORJADO: 30 CM</span>
              <span>LUCES MÁXIMAS: 14.20 M</span>
              <span>DETALLES ACTIVOS: 4/4</span>
            </div>
            <span className="text-[#ff4400] font-bold">+</span>
          </div>

          {/* Main Visual Image Frame */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-h-[520px] bg-[#e8e4d8] overflow-hidden flex items-center justify-center">
            <img
              src="/src/assets/images/hero_brutalist_elevation_1791057054443.jpg"
              alt="Alzado arquitectónico de hormigón visto y vegetación estacional"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.02]"
            />

            {/* Subtle grid and measuring guidelines overlay */}
            <div className="absolute inset-0 bg-blueprint-grid pointer-events-none opacity-40"></div>

            {/* Interactive Hotspots over the elevation drawing */}
            {heroElevationMarkers.map((marker) => {
              const isSelected = activeHeroMarker === marker.id;
              return (
                <div
                  key={marker.id}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHeroMarker(isSelected ? null : marker.id)}
                    aria-label={`Ver detalle ${marker.title}`}
                    className={`relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-all duration-200 group ${
                      isSelected ? 'scale-125' : 'hover:scale-110'
                    }`}
                  >
                    {/* Pulsing ring */}
                    <span className="absolute inset-0 bg-[#ff4400]/30 animate-hotspot"></span>
                    {/* Sharp brutalist square marker (matching the orange square dot in reference images) */}
                    <span className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#ff4400] text-white flex items-center justify-center font-mono text-[9px] font-bold shadow-md">
                      {marker.id}
                    </span>
                  </button>

                  {/* Callout popover */}
                  {isSelected && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 sm:w-72 bg-[#161616] text-[#f4f3ee] p-3.5 shadow-xl border border-[#ff4400]/40 z-30 font-mono text-left animate-in fade-in duration-150">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#333]">
                        <span className="text-[10px] text-[#ff4400] uppercase font-bold tracking-wider">
                          DETALLE CONSTRUCTIVO #{marker.id}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHeroMarker(null);
                          }}
                          className="text-[#999] hover:text-white text-xs px-1"
                        >
                          ✕
                        </button>
                      </div>
                      <h4 className="font-display text-sm font-semibold text-white mb-1">
                        {marker.title}
                      </h4>
                      <p className="text-xs text-[#bbb] font-body leading-snug">
                        {marker.spec}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom floating legend stamp */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-[#f4f3ee]/90 backdrop-blur-sm border border-[#161616]/30 px-3 py-1.5 font-mono text-[10px] text-[#161616] flex items-center gap-3">
              <span className="w-2 h-2 bg-[#ff4400]"></span>
              <span className="font-semibold">HAGA CLIC EN LOS PUNTOS ROJOS PARA DESPLEGAR DETALLES TÉCNICOS</span>
            </div>

            <button
              onClick={onExploreBlueprints}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 hidden sm:flex items-center gap-2 bg-[#161616] text-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider hover:bg-[#ff4400] transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Planimetría Interactiva Completa</span>
            </button>
          </div>

          {/* Sub-strip with architectural specs and quantitative verification */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#161616]/15 border-t border-[#161616]/15 bg-[#eae7de] font-mono text-xs text-[#161616]">
            <div className="p-3.5 sm:p-4">
              <div className="text-[10px] uppercase text-[#161616]/60 mb-0.5">ESPECIALIDAD TÉCNICA</div>
              <div className="font-bold text-sm tracking-tight">Hormigón & Madera CLT</div>
              <div className="text-[10px] text-[#161616]/75 mt-0.5">Eurocódigo 2, 5 & CTE DB-SE</div>
            </div>
            
            <div className="p-3.5 sm:p-4">
              <div className="text-[10px] uppercase text-[#161616]/60 mb-0.5">DESEMPEÑO TÉRMICO</div>
              <div className="font-bold text-sm tracking-tight">Passivhaus & nZEB</div>
              <div className="text-[10px] text-[#161616]/75 mt-0.5">Hermeticidad n50 &lt; 0.60 h⁻¹</div>
            </div>

            <div className="p-3.5 sm:p-4">
              <div className="text-[10px] uppercase text-[#161616]/60 mb-0.5">METODOLOGÍA DIGITAL</div>
              <div className="font-bold text-sm tracking-tight">BIM LOD 400 / 500</div>
              <div className="text-[10px] text-[#161616]/75 mt-0.5">IFC 4.3 & Detección de Colisiones</div>
            </div>

            <div className="p-3.5 sm:p-4 bg-[#f0ede3]">
              <div className="text-[10px] uppercase text-[#ff4400] font-bold mb-0.5">COMPROMISO CLIMÁTICO</div>
              <div className="font-bold text-sm tracking-tight">-42% Huella de Carbono</div>
              <div className="text-[10px] text-[#161616]/75 mt-0.5">Análisis de Ciclo de Vida (ACV)</div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Strip */}
        <div className="mt-8 pt-6 border-t border-[#161616]/15 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#161616]/75">
          <div className="flex items-center gap-6">
            <span className="text-[#161616] font-semibold">HOMOLOGACIONES & MEMBRESÍAS:</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" /> CSCAE Colegiados</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" /> Passivhaus Institut</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" /> USGBC LEED AP</span>
            <span className="flex items-center gap-1.5 hidden lg:inline-flex"><CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" /> buildingSMART Spanish Chapter</span>
          </div>

          <button
            onClick={onExploreProjects}
            className="text-xs font-mono text-[#ff4400] hover:text-[#161616] transition-colors flex items-center gap-1 uppercase font-semibold"
          >
            <span>Ver dossier de obras visadas</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
