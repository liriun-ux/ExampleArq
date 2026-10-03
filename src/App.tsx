/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveBlueprintViewer } from './components/InteractiveBlueprintViewer';
import { ProjectsGallery } from './components/ProjectsGallery';
import { FeasibilityCalculator } from './components/FeasibilityCalculator';
import { ServicesSection } from './components/ServicesSection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('plan-cultural');
  const [selectedProjectIdForModal, setSelectedProjectIdForModal] = useState<string | null>(null);
  const [consultationPreFill, setConsultationPreFill] = useState<{
    typology?: string;
    area?: number;
    structure?: string;
    targetCert?: string;
    serviceTitle?: string;
  } | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBlueprint = (blueprintId: string) => {
    setSelectedBlueprintId(blueprintId);
    handleNavigate('planos-interactivos');
  };

  const handleSelectProjectFromBlueprint = (projectId: string) => {
    setSelectedProjectIdForModal(projectId);
    handleNavigate('galeria-proyectos');
  };

  const handlePreFillFromCalculator = (data: {
    typology: string;
    area: number;
    structure: string;
    targetCert: string;
  }) => {
    setConsultationPreFill(data);
    handleNavigate('contacto');
  };

  const handleRequestService = (serviceTitle?: string) => {
    setConsultationPreFill({ serviceTitle });
    handleNavigate('contacto');
  };

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-[#161616] flex flex-col font-body selection:bg-[#ff4400] selection:text-white">
      {/* 3-Zone Strict Top Bar Contract */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      <main className="flex-grow">
        {/* Hero Section with Brutalist Typography & Interactive Elevation Blueprint */}
        <HeroSection
          onExploreBlueprints={() => handleNavigate('planos-interactivos')}
          onExploreProjects={() => handleNavigate('galeria-proyectos')}
          onOpenConsultation={() => handleNavigate('contacto')}
        />

        {/* Centerpiece: Interactive Blueprint Viewer with Vector CAD Layers, Hotspots & Measuring Tool */}
        <InteractiveBlueprintViewer
          selectedBlueprintId={selectedBlueprintId}
          onSelectProject={handleSelectProjectFromBlueprint}
        />

        {/* Featured Projects Gallery with Detailed Technical Dossiers */}
        <ProjectsGallery
          onOpenBlueprint={handleOpenBlueprint}
          selectedProjectId={selectedProjectIdForModal}
          onClearSelectedProject={() => setSelectedProjectIdForModal(null)}
        />

        {/* Structural & Carbon Feasibility Calculator */}
        <FeasibilityCalculator
          onPreFillConsultation={handlePreFillFromCalculator}
        />

        {/* Specialised Architectural Engineering & Consulting Services */}
        <ServicesSection
          onRequestConsultation={handleRequestService}
        />

        {/* Official Technical Consultation & Review Form */}
        <ConsultationForm
          initialData={consultationPreFill}
        />
      </main>

      {/* Clean Technical Colophon Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
