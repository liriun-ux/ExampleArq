import React from 'react';
import { Compass, ArrowUp, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121316] text-[#e8e6e1] font-mono text-xs border-t-2 border-[#ff4400]">
      {/* Top perimeter tick line */}
      <div className="border-b border-[#28292d] px-4 sm:px-8 py-2.5 flex items-center justify-between text-[10px] text-[#888] select-none">
        <div className="flex items-center gap-3">
          <span className="text-[#ff4400] font-bold">+</span>
          <span>VÉRTICE CONSULTORÍA DE ARQUITECTURA & INGENIERÍA ESTRUCTURAL S.L.P.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">REG. COLEGIAL COAM 14.892 / COAC 48.201</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#ff4400] hover:text-white transition-colors uppercase font-bold"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#ff4400] text-white flex items-center justify-center font-bold text-xs">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                VÉRTICE
              </span>
            </div>

            <p className="font-body text-xs text-[#a0a0a0] leading-relaxed max-w-sm">
              Consultora integral especializada en cálculo por elementos finitos, ingeniería de fachadas complejas, certificación energética Passivhaus y gestión BIM LOD 500 para estudios de arquitectura y promotoras.
            </p>

            <div className="text-[11px] text-[#777] space-y-1">
              <div>MADRID · BARCELONA · VALENCIA · SANTIAGO</div>
              <div>COORDENADAS CENTRAL: 40°28'48"N 3°41'22"W</div>
            </div>
          </div>

          {/* Nav Links Mirror */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase text-white tracking-wider border-b border-[#333] pb-1">
              Planimetría & Obras
            </div>
            <ul className="space-y-2 text-[#999]">
              <li>
                <button
                  onClick={() => onNavigate('planos-interactivos')}
                  className="hover:text-[#ff4400] transition-colors text-left"
                >
                  Planos Interactivos CAD
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('galeria-proyectos')}
                  className="hover:text-[#ff4400] transition-colors text-left"
                >
                  Galería de Proyectos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculadora-viabilidad')}
                  className="hover:text-[#ff4400] transition-colors text-left"
                >
                  Calculadora de Huella & FEM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('servicios-consultoria')}
                  className="hover:text-[#ff4400] transition-colors text-left"
                >
                  Competencias & Ensayos
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Disciplines */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase text-white tracking-wider border-b border-[#333] pb-1">
              Especialidades
            </div>
            <ul className="space-y-2 text-[#999] text-[11px]">
              <li>Cálculo Sismorresistente (NCSE-02)</li>
              <li>Hormigón Postensado & Vuelos</li>
              <li>Madera Contralaminada CLT (EC5)</li>
              <li>Auditorías Térmicas Passivhaus</li>
              <li>Muros Cortina & Doble Piel</li>
            </ul>
          </div>

          {/* Accreditations */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase text-white tracking-wider border-b border-[#333] pb-1">
              Homologaciones
            </div>
            <div className="space-y-2 text-[#aaa] text-[11px]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>CSCAE Colegiados</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>Passivhaus Institut</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>USGBC Member</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>buildingSMART Certified</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#252528] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666] gap-4">
          <div>
            © {new Date().getFullYear()} VÉRTICE Consultora de Arquitectura & Ingeniería S.L.P. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[#888]">
            <a href="#aviso-legal" className="hover:text-white transition-colors">Aviso Legal</a>
            <span>·</span>
            <a href="#privacidad" className="hover:text-white transition-colors">Política de Privacidad</a>
            <span>·</span>
            <a href="#colegio" className="hover:text-white transition-colors">Visado Colegial</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
