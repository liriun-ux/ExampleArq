import React, { useState, useMemo } from 'react';
import { PROJECTS, Project } from '../data/projectsData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Search, SlidersHorizontal, ArrowUpRight, Layers, FileText, MapPin } from 'lucide-react';

interface ProjectsGalleryProps {
  onOpenBlueprint: (blueprintId: string) => void;
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  onOpenBlueprint,
  selectedProjectId,
  onClearSelectedProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // If a selectedProjectId is passed, open its modal
  React.useEffect(() => {
    if (selectedProjectId) {
      const match = PROJECTS.find(p => p.id === selectedProjectId);
      if (match) {
        setActiveModalProject(match);
      }
    }
  }, [selectedProjectId]);

  const categories = [
    { id: 'todos', label: 'Todos los Proyectos' },
    { id: 'cultural', label: 'Equipamiento Cultural' },
    { id: 'residencial', label: 'Residencial Vanguardista' },
    { id: 'corporativo', label: 'Torres Corporativas' },
    { id: 'sostenible', label: 'Bioclimática & Madera CLT' }
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory = selectedCategory === 'todos' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        proj.title.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.overview.toLowerCase().includes(q) ||
        proj.leadConsultant.toLowerCase().includes(q) ||
        proj.certification.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="galeria-proyectos" className="py-12 sm:py-16 bg-[#efece4] border-b border-[#161616]/15 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-[#161616]/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#161616]/75 mb-2">
              <span className="w-2 h-2 bg-[#ff4400] inline-block"></span>
              <span>CATÁLOGO DE OBRAS & INTERVENCIONES ESTRUCTURALES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#161616]">
              GALERÍA DE PROYECTOS DESTACADOS
            </h2>
            <p className="font-body text-sm text-[#161616]/80 max-w-2xl mt-2">
              Selección de intervenciones complejas donde nuestra consultoría técnica aportó soluciones de cálculo estructural, análisis bioclimático y optimización de envolventes.
            </p>
          </div>

          <div className="font-mono text-xs text-[#161616]/70">
            TOTAL PROYECTOS MONOGRAFIADOS: <span className="font-bold text-[#161616]">{PROJECTS.length} EXPEDIENTES</span>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-stretch md:items-center">
          
          {/* Category Tabs (Segmented control button elements with active states) */}
          <div className="flex items-center gap-1 p-1 bg-[#e4e0d4] border border-[#161616]/15 overflow-x-auto whitespace-nowrap">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                    isActive
                      ? 'bg-[#161616] text-[#f4f3ee] shadow-sm'
                      : 'text-[#161616]/70 hover:text-[#161616]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#161616]/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por material, ciudad, cálculo..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#161616]/20 font-mono text-xs text-[#161616] placeholder-[#161616]/40 focus:outline-none focus:border-[#ff4400]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#161616]/50 hover:text-[#161616] text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#fcfbfa] border border-[#161616]/20 hover:border-[#161616] transition-all group flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#e0ded6] border-b border-[#161616]/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                    {/* Top Technical Code Badge */}
                    <div className="absolute top-3 left-3 bg-[#161616]/90 text-[#f4f3ee] px-2.5 py-1 font-mono text-[10px] tracking-wider font-semibold border border-[#333]">
                      {project.code}
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 text-[#161616] px-2 py-0.5 font-mono text-[10px] font-bold">
                      {project.status}
                    </div>

                    {/* Location on image */}
                    <div className="absolute bottom-3 left-3 text-white font-mono text-xs flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ff4400]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Unboxed Metadata Line (complies with Zero-Pill rule) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#161616]/65 mb-2">
                      <span className="text-[#ff4400] font-semibold">{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.area}</span>
                      <span aria-hidden="true">·</span>
                      <span>Año {project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-[#161616] mb-2 leading-tight group-hover:text-[#ff4400] transition-colors">
                      {project.title}
                    </h3>

                    {/* Tagline / Summary */}
                    <p className="font-body text-xs text-[#161616]/80 leading-relaxed mb-4 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Technical Specs Checklist */}
                    <div className="border-t border-[#161616]/10 pt-3 space-y-1.5 font-mono text-xs text-[#161616]/80">
                      <div className="flex justify-between">
                        <span className="text-[#666]">ESTRUCTURA:</span>
                        <span className="font-medium text-[#161616] truncate max-w-[220px] text-right">
                          {project.technicalSpecs.structure.slice(0, 38)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666]">CERTIFICACIÓN:</span>
                        <span className="font-semibold text-[#008855]">
                          {project.certification}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666]">DEMANDA TÉRMICA:</span>
                        <span className="font-mono text-[#ff4400]">
                          {project.energyMetrics.thermalDemand}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 border-t border-[#161616]/10 mt-2 grid grid-cols-2 gap-2 font-mono text-xs">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="py-2.5 px-3 bg-[#161616] text-[#f4f3ee] hover:bg-[#ff4400] transition-colors flex items-center justify-center gap-1.5 font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Memoria Técnica</span>
                  </button>

                  <button
                    onClick={() => onOpenBlueprint(project.blueprintId)}
                    className="py-2.5 px-3 border border-[#161616] bg-transparent text-[#161616] hover:bg-[#161616] hover:text-white transition-colors flex items-center justify-center gap-1.5 font-medium"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#ff4400]" />
                    <span>Plano Interactivo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-[#161616]/20 font-mono text-xs">
            <p className="text-[#666] mb-3">No se encontraron proyectos con el criterio de búsqueda "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="px-4 py-2 bg-[#161616] text-white hover:bg-[#ff4400]"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>

      {/* Modal for full technical dossier */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => {
            setActiveModalProject(null);
            if (onClearSelectedProject) onClearSelectedProject();
          }}
          onOpenBlueprint={onOpenBlueprint}
        />
      )}
    </section>
  );
};
