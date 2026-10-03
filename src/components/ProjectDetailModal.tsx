import React, { useState } from 'react';
import { Project } from '../data/projectsData';
import { 
  X, 
  MapPin, 
  Calendar, 
  Maximize2, 
  FileCheck2, 
  Layers, 
  ShieldCheck, 
  Wind, 
  Sparkles, 
  Printer, 
  Check, 
  Compass, 
  ArrowRight
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenBlueprint: (blueprintId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenBlueprint
}) => {
  const [activeTab, setActiveTab] = useState<'memoria' | 'estructura' | 'envolvente' | 'sostenibilidad' | 'materiales'>('memoria');
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`${project.code} — ${project.title} (Vértice Consultoría)`);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-[#fcfbfa] max-w-5xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#161616] shadow-2xl relative font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="sticky top-0 z-30 bg-[#161616] text-[#f4f3ee] px-4 sm:px-6 py-3 border-b border-[#333] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#ff4400]"></span>
            <span className="font-bold text-xs uppercase tracking-wider text-[#ff4400]">
              EXPEDIENTE TÉCNICO: {project.code}
            </span>
            <span className="text-[#888] hidden sm:inline">·</span>
            <span className="text-[#bbb] hidden sm:inline">{project.status}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-[#262626] hover:bg-[#333] text-[11px] text-[#ddd] transition-colors"
              title="Copiar código de referencia"
            >
              {copiedNotification ? <Check className="w-3 h-3 text-[#00cc66]" /> : <FileCheck2 className="w-3 h-3" />}
              <span>{copiedNotification ? 'Copiado' : 'Ref. Colegial'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-[#ff4400] text-white hover:bg-[#e03b00] transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Banner with Project Title & Image */}
        <div className="relative border-b border-[#161616]/20 bg-[#efece3]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Image */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[260px] sm:min-h-[340px] overflow-hidden bg-[#e0ded6]">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Badge on image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[10px] text-[#ff4400] font-bold uppercase tracking-wider mb-0.5">
                  {project.categoryLabel}
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold leading-tight">
                  {project.title}
                </div>
                <div className="text-[11px] text-white/80 font-mono flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3 text-[#ff4400]" />
                  <span>{project.location} ({project.coordinates})</span>
                </div>
              </div>
            </div>

            {/* Quick Specs Panel */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-[#f8f6f0] border-t lg:border-t-0 lg:border-l border-[#161616]/20 flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase text-[#ff4400] font-bold mb-1">
                  FICHA TÉCNICA RESUMIDA
                </div>
                <p className="font-body text-xs text-[#161616]/80 leading-relaxed mb-4">
                  {project.tagline}
                </p>

                <div className="space-y-2 border-t border-[#161616]/15 pt-3">
                  <div className="flex justify-between py-1 border-b border-[#161616]/10">
                    <span className="text-[#666]">SUPERFICIE CONSTRUIDA:</span>
                    <span className="font-bold text-[#161616]">{project.area}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#161616]/10">
                    <span className="text-[#666]">VOLUMEN EDIFICADO:</span>
                    <span className="font-bold text-[#161616]">{project.volume}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#161616]/10">
                    <span className="text-[#666]">AÑO DE EJECUCIÓN:</span>
                    <span className="font-bold text-[#161616]">{project.year}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#161616]/10">
                    <span className="text-[#666]">CERTIFICACIÓN AMBIENTAL:</span>
                    <span className="font-bold text-[#008855]">{project.certification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#161616]/10">
                    <span className="text-[#666]">CONSULTOR PRINCIPAL:</span>
                    <span className="font-semibold text-[#161616] text-right truncate max-w-[200px]">{project.leadConsultant}</span>
                  </div>
                </div>
              </div>

              {/* Direct Link to Interactive Blueprint */}
              <div className="pt-4 mt-4 border-t border-[#161616]/15">
                <button
                  onClick={() => {
                    onOpenBlueprint(project.blueprintId);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-[#ff4400] text-white font-bold uppercase tracking-wider hover:bg-[#e03b00] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Layers className="w-4 h-4" />
                  <span>Inspeccionar Plano Interactivo (BIM)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Tabs Bar */}
        <div className="border-b border-[#161616]/20 bg-[#eae6dc] px-4 sm:px-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap py-2">
          {[
            { id: 'memoria', label: '01. Memoria Descriptiva' },
            { id: 'estructura', label: '02. Ingeniería Estructural' },
            { id: 'envolvente', label: '03. Envolvente & Fachada' },
            { id: 'sostenibilidad', label: '04. Análisis Bioclimático' },
            { id: 'materiales', label: '05. Despiece de Materiales' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-[#161616] text-[#f4f3ee]'
                    : 'text-[#161616]/70 hover:text-[#161616] hover:bg-[#dfdbd0]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="p-6 sm:p-8 bg-[#fcfbfa]">
          
          {/* TAB 1: MEMORIA DESCRIPTIVA */}
          {activeTab === 'memoria' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-lg font-bold text-[#161616] mb-2">
                  Memoria Descriptiva & Justificación Técnica
                </h4>
                <p className="font-body text-sm text-[#161616]/85 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              <div className="border-l-2 border-[#ff4400] pl-4 bg-[#f7f5ed] p-4">
                <div className="font-bold text-xs uppercase text-[#ff4400] mb-1">
                  CONCEPTO ARQUITECTÓNICO & TERMODINÁMICO
                </div>
                <p className="font-body text-sm text-[#161616]/85 leading-relaxed">
                  {project.architecturalConcept}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-xs uppercase text-[#161616] mb-3">
                  Desafíos Técnicos Singulares Resueltos en la Consultoría:
                </h5>
                <div className="space-y-2">
                  {project.keyChallenges.map((challenge, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-[#f4f3ee] p-3 border border-[#161616]/10 font-body text-xs">
                      <span className="font-mono text-[#ff4400] font-bold">0{idx + 1}.</span>
                      <span className="text-[#161616]">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INGENIERÍA ESTRUCTURAL */}
          {activeTab === 'estructura' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f7f5ed] p-4 border border-[#161616]/15">
                  <div className="font-bold text-xs uppercase text-[#ff4400] mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>SISTEMA DE CIMENTACIÓN</span>
                  </div>
                  <p className="font-body text-xs text-[#161616]/85 leading-relaxed">
                    {project.technicalSpecs.foundation}
                  </p>
                </div>

                <div className="bg-[#f7f5ed] p-4 border border-[#161616]/15">
                  <div className="font-bold text-xs uppercase text-[#ff4400] mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>ESTRUCTURA PORTANTE & FORJADOS</span>
                  </div>
                  <p className="font-body text-xs text-[#161616]/85 leading-relaxed">
                    {project.technicalSpecs.structure}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#161616] text-[#f4f3ee] space-y-2">
                <div className="text-[#ff4400] font-bold text-xs">
                  CÓDIGOS TÉCNICOS & NORMATIVAS VERIFICADAS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1 text-[#bbb]">
                  <div>· CTE DB-SE / DB-SE-AE (Acciones)</div>
                  <div>· Eurocódigo 2 (EN 1992-1-1 Hormigón)</div>
                  <div>· NCSE-02 (Cálculo Sismorresistente)</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENVOLVENTE & FACHADA */}
          {activeTab === 'envolvente' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#f7f5ed] p-4 border border-[#161616]/15">
                  <div className="text-[10px] font-bold uppercase text-[#ff4400] mb-1">FACHADA Y MURO CORTINA</div>
                  <p className="font-body text-xs text-[#161616]/85 leading-relaxed">
                    {project.technicalSpecs.facade}
                  </p>
                </div>

                <div className="bg-[#f7f5ed] p-4 border border-[#161616]/15">
                  <div className="text-[10px] font-bold uppercase text-[#ff4400] mb-1">CUBIERTA TÉCNICA</div>
                  <p className="font-body text-xs text-[#161616]/85 leading-relaxed">
                    {project.technicalSpecs.roofing}
                  </p>
                </div>

                <div className="bg-[#f7f5ed] p-4 border border-[#161616]/15">
                  <div className="text-[10px] font-bold uppercase text-[#ff4400] mb-1">ACÚSTICA & AISLAMIENTO</div>
                  <p className="font-body text-xs text-[#161616]/85 leading-relaxed">
                    {project.technicalSpecs.acoustics}
                  </p>
                </div>
              </div>

              <div className="border border-[#161616]/20 p-4 bg-[#efece4] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase text-[#666]">TRANSMITANCIA MEDIA ENVOLVENTE (U)</div>
                  <div className="font-display text-xl font-bold text-[#161616]">{project.energyMetrics.uValueEnvelope}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#666]">ESTANQUEIDAD AL AIRE (BLOWER DOOR)</div>
                  <div className="font-display text-xl font-bold text-[#ff4400]">n50 = 0.42 h⁻¹</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#666]">FACTOR SOLAR MEDIO (g)</div>
                  <div className="font-display text-xl font-bold text-[#161616]">g = 0.28</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SOSTENIBILIDAD & BIOCLIMÁTICA */}
          {activeTab === 'sostenibilidad' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#f4f3ee] border border-[#161616]/15">
                  <div className="text-[10px] text-[#666] uppercase">DEMANDA TÉRMICA ANUAL</div>
                  <div className="font-display text-lg font-bold text-[#161616] mt-1">{project.energyMetrics.thermalDemand}</div>
                  <div className="text-[10px] text-[#008855] mt-0.5">Estándar Passivhaus &lt; 15 kWh</div>
                </div>

                <div className="p-4 bg-[#f4f3ee] border border-[#161616]/15">
                  <div className="text-[10px] text-[#666] uppercase">HUELLA DE CARBONO</div>
                  <div className="font-display text-lg font-bold text-[#161616] mt-1">{project.energyMetrics.embodiedCarbon}</div>
                  <div className="text-[10px] text-[#008855] mt-0.5">Ahorro auditado vs. CTE</div>
                </div>

                <div className="p-4 bg-[#f4f3ee] border border-[#161616]/15">
                  <div className="text-[10px] text-[#666] uppercase">ENERGÍAS RENOVABLES</div>
                  <div className="font-display text-lg font-bold text-[#ff4400] mt-1">{project.energyMetrics.renewableShare}</div>
                  <div className="text-[10px] text-[#666] mt-0.5">Geotermia + Solar BIPV</div>
                </div>

                <div className="p-4 bg-[#f4f3ee] border border-[#161616]/15">
                  <div className="text-[10px] text-[#666] uppercase">CLIMATIZACIÓN HVAC</div>
                  <div className="font-body text-xs text-[#161616] mt-1 line-clamp-2">{project.technicalSpecs.hvac}</div>
                </div>
              </div>

              <div className="p-4 bg-[#e8f4ed] border border-[#008855]/30 text-[#006633] space-y-1 font-body text-xs">
                <div className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 text-[#008855]">
                  <Sparkles className="w-4 h-4" />
                  <span>CALIFICACIÓN AMBIENTAL {project.certification}</span>
                </div>
                <p>
                  El proyecto cuenta con auditoría de Análisis de Ciclo de Vida (ACV) desde la cuna a la tumba (A1-C4) con Declaración Ambiental de Producto (DAP) verificada por organismo independiente.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: MATERIALES */}
          {activeTab === 'materiales' && (
            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-[#161616]">
                Cuadro de Materiales y Trazabilidad de Proveedores
              </h4>
              <div className="border border-[#161616]/20 divide-y divide-[#161616]/15">
                {project.materialPalette.map((item, idx) => (
                  <div key={idx} className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#fcfbfa] hover:bg-[#f7f5ed] transition-colors">
                    <div>
                      <div className="font-bold text-xs text-[#161616]">{item.name}</div>
                      <div className="text-[10px] text-[#ff4400] mt-0.5">Procedencia: {item.provenance}</div>
                    </div>
                    <div className="sm:col-span-2 font-body text-xs text-[#555]">
                      {item.specs}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#eae7de] border-t border-[#161616]/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="text-[#666]">
            EXPEDIENTE CUSTODIADO EN SERVIDOR BIM SEGURO · VÉRTICE ARCHIVES
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-white border border-[#161616]/30 text-[#161616] hover:bg-[#f4f3ee] flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Ficha</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#161616] text-white hover:bg-[#333]"
            >
              Cerrar Expediente
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
