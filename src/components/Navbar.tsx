import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, Compass } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'planos-interactivos', label: 'Planos Interactivos' },
    { id: 'galeria-proyectos', label: 'Proyectos Destacados' },
    { id: 'servicios-consultoria', label: 'Servicios Técnicos' },
    { id: 'calculadora-viabilidad', label: 'Calculadora Viabilidad' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f4f3ee]/95 backdrop-blur-md border-b border-[#161616]/15 transition-all">
      {/* Top micro-ruler with corner crosshairs */}
      <div className="relative border-b border-[#161616]/10 h-5 px-4 flex items-center justify-between font-mono text-[9px] text-[#161616]/60 select-none overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="text-[#ff4400] font-bold">+</span>
          <span className="hidden sm:inline">VÉRTICE CONSULTING · SISTEMA DE INGENIERÍA Y PLANIMETRÍA V.26</span>
          <span className="sm:hidden">VÉRTICE · CONSULTORÍA</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">DATUM WGS84 · 41°23'19"N 2°09'48"E</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#ff4400] rounded-none inline-block"></span>
            <span>OFICINA TÉCNICA ACTIVA</span>
          </span>
          <span className="text-[#ff4400] font-bold">+</span>
        </div>
      </div>

      {/* Main 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('inicio');
          }}
          className="flex items-center gap-2 group text-inherit no-underline"
        >
          <div className="w-7 h-7 bg-[#161616] text-[#f4f3ee] flex items-center justify-center font-mono font-bold text-xs tracking-tighter group-hover:bg-[#ff4400] transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#161616]">
            VÉRTICE
          </span>
        </a>

        {/* Zone 2: 4-6 text links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#161616]/80">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors relative py-1 text-left ${
                  isActive
                    ? 'text-[#ff4400] font-semibold'
                    : 'text-[#161616]/75 hover:text-[#161616]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff4400]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleLinkClick('contacto')}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff4400] text-white font-mono text-xs font-medium tracking-wide uppercase hover:bg-[#e03b00] active:scale-[0.99] transition-all whitespace-nowrap shadow-sm"
          >
            <span>Consultoría Técnica</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleLinkClick('contacto')}
            className="px-2.5 py-1.5 bg-[#ff4400] text-white font-mono text-[11px] font-medium tracking-wide uppercase"
          >
            Contacto
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-[#161616]/20 text-[#161616] hover:bg-[#161616]/5"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#161616]/15 bg-[#f4f3ee] px-4 pt-3 pb-5 space-y-3 font-mono text-xs uppercase">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left py-2 px-2 border-l-2 border-transparent hover:border-[#ff4400] hover:text-[#ff4400] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('contacto')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#ff4400] text-white font-medium tracking-wider"
            >
              <span>Solicitar Dictamen Técnico</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
