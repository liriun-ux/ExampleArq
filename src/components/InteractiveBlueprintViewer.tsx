import React, { useState, useRef, useEffect } from 'react';
import { 
  BLUEPRINTS, 
  BlueprintPlan, 
  Hotspot 
} from '../data/blueprintsData';
import { 
  Eye, 
  EyeOff, 
  Ruler, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Maximize2, 
  Check, 
  FileCheck, 
  Compass, 
  Info,
  X,
  Printer
} from 'lucide-react';

interface InteractiveBlueprintViewerProps {
  selectedBlueprintId?: string;
  onSelectProject?: (projectId: string) => void;
}

export const InteractiveBlueprintViewer: React.FC<InteractiveBlueprintViewerProps> = ({
  selectedBlueprintId,
  onSelectProject
}) => {
  const [currentPlanId, setCurrentPlanId] = useState<string>(selectedBlueprintId || BLUEPRINTS[0].id);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isMeasuringMode, setIsMeasuringMode] = useState<boolean>(false);
  const [measurePointA, setMeasurePointA] = useState<{ x: number; y: number } | null>(null);
  const [measurePointB, setMeasurePointB] = useState<{ x: number; y: number } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Layer visibility state
  const [layers, setLayers] = useState({
    structure: true,
    mep: true,
    dimensions: true,
    bioclimatic: true,
    zones: true
  });

  const blueprintContainerRef = useRef<HTMLDivElement>(null);

  // Update if prop changes
  useEffect(() => {
    if (selectedBlueprintId) {
      setCurrentPlanId(selectedBlueprintId);
      setActiveHotspot(null);
    }
  }, [selectedBlueprintId]);

  const currentPlan: BlueprintPlan = 
    BLUEPRINTS.find(p => p.id === currentPlanId) || BLUEPRINTS[0];

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(0.75, Number((prev + delta).toFixed(2))), 2.25));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setMeasurePointA(null);
    setMeasurePointB(null);
    setIsMeasuringMode(false);
  };

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Canvas click handler for measuring tool
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMeasuringMode || !blueprintContainerRef.current) return;

    const rect = blueprintContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (!measurePointA) {
      setMeasurePointA({ x, y });
      setMeasurePointB(null);
    } else if (!measurePointB) {
      setMeasurePointB({ x, y });
    } else {
      // Third click restarts measurement
      setMeasurePointA({ x, y });
      setMeasurePointB(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMeasuringMode || !blueprintContainerRef.current) return;
    const rect = blueprintContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Calculate distance between two points in meters
  const calculateDistanceInMeters = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distancePercent = Math.sqrt(dx * dx + dy * dy);
    const meters = distancePercent * currentPlan.scaleRatioMetersPerPercent;
    return meters.toFixed(2);
  };

  const currentDistanceMeters = measurePointA && measurePointB
    ? calculateDistanceInMeters(measurePointA, measurePointB)
    : measurePointA && mousePos
    ? calculateDistanceInMeters(measurePointA, mousePos)
    : null;

  return (
    <section id="planos-interactivos" className="py-12 sm:py-16 bg-[#f4f3ee] border-b border-[#161616]/15 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#161616]/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#161616]/75 mb-2">
              <span className="w-2 h-2 bg-[#ff4400] inline-block"></span>
              <span>VISOR TÉCNICO VECTORIAL BIM // LOD 400</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#161616]">
              PLANOS INTERACTIVOS & DESPIECE CONSTRUCTIVO
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#161616]/60">CONTROL DE CAPAS:</span>
            <span className="bg-[#161616] text-[#f4f3ee] px-2 py-0.5 text-[11px] font-semibold">
              DIN EN ISO 13567
            </span>
          </div>
        </div>

        {/* Blueprint Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {BLUEPRINTS.map((plan) => {
            const isSelected = plan.id === currentPlanId;
            return (
              <button
                key={plan.id}
                onClick={() => {
                  setCurrentPlanId(plan.id);
                  setActiveHotspot(null);
                  setMeasurePointA(null);
                  setMeasurePointB(null);
                }}
                className={`text-left p-3 border transition-all relative ${
                  isSelected
                    ? 'border-[#ff4400] bg-white shadow-sm'
                    : 'border-[#161616]/20 bg-[#ece9e0] hover:bg-[#e6e2d7] text-[#161616]/80'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ff4400]"></div>
                )}
                <div className="font-mono text-[10px] text-[#ff4400] font-bold">
                  {plan.code} · {plan.level}
                </div>
                <div className="font-display text-xs sm:text-sm font-bold text-[#161616] truncate mt-1">
                  {plan.title}
                </div>
                <div className="font-mono text-[10px] text-[#161616]/60 mt-0.5 truncate">
                  {plan.scaleText}
                </div>
              </button>
            );
          })}
        </div>

        {/* Blueprint Workspace Container */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Main Blueprint Canvas Area (8 or 9 cols) */}
          <div className="xl:col-span-8 2xl:col-span-9 bg-[#efece3] border border-[#161616]/25 shadow-sm">
            
            {/* Top Toolbar: Controls, Layers, Scale, Tools */}
            <div className="bg-[#e7e3d6] border-b border-[#161616]/20 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              {/* Plan Metadata */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#161616]">{currentPlan.title}</span>
                <span className="text-[#161616]/50">|</span>
                <span className="text-[#161616]/80">{currentPlan.scaleText}</span>
                <span className="hidden sm:inline text-[#161616]/50">|</span>
                <span className="hidden sm:inline text-[#ff4400] font-semibold">{currentPlan.elevation}</span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Measuring Tool Toggle */}
                <button
                  onClick={() => {
                    setIsMeasuringMode(!isMeasuringMode);
                    setMeasurePointA(null);
                    setMeasurePointB(null);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold border transition-all ${
                    isMeasuringMode
                      ? 'bg-[#ff4400] text-white border-[#ff4400]'
                      : 'bg-white border-[#161616]/25 text-[#161616] hover:bg-[#f4f3ee]'
                  }`}
                  title="Activar herramienta de medición de distancias reales"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{isMeasuringMode ? 'Midiendo (Activo)' : 'Regla de Cotas'}</span>
                </button>

                {/* Zoom Controls */}
                <div className="flex items-center border border-[#161616]/25 bg-white divide-x divide-[#161616]/20">
                  <button
                    onClick={() => handleZoom(-0.15)}
                    className="p-1 hover:bg-[#f4f3ee] text-[#161616]"
                    title="Alejar plano"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 py-0.5 text-[11px] text-[#161616] font-medium min-w-[42px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => handleZoom(0.15)}
                    className="p-1 hover:bg-[#f4f3ee] text-[#161616]"
                    title="Acercar plano"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetView}
                    className="p-1 hover:bg-[#f4f3ee] text-[#161616]"
                    title="Restablecer escala 100%"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Print / Titleblock modal */}
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-white border border-[#161616]/25 text-[#161616] hover:bg-[#f4f3ee]"
                  title="Ver lámina técnica con cartela de visado"
                >
                  <Printer className="w-3.5 h-3.5 text-[#ff4400]" />
                  <span>Cartela Lámina</span>
                </button>
              </div>
            </div>

            {/* Layer Visibility Toggles Strip */}
            <div className="bg-[#ded9cb] border-b border-[#161616]/15 px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono gap-2">
              <span className="text-[#161616]/60 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span>CAPAS CAD:</span>
              </span>

              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <button
                  onClick={() => toggleLayer('structure')}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-none border text-[10px] ${
                    layers.structure
                      ? 'bg-[#161616] text-[#f4f3ee] border-[#161616]'
                      : 'bg-transparent text-[#161616]/60 border-[#161616]/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-black inline-block border border-white"></span>
                  <span>Estructura & Muros</span>
                </button>

                <button
                  onClick={() => toggleLayer('mep')}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-none border text-[10px] ${
                    layers.mep
                      ? 'bg-[#0066cc] text-white border-[#0066cc]'
                      : 'bg-transparent text-[#161616]/60 border-[#161616]/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-[#0099ff] inline-block"></span>
                  <span>Instalaciones MEP</span>
                </button>

                <button
                  onClick={() => toggleLayer('dimensions')}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-none border text-[10px] ${
                    layers.dimensions
                      ? 'bg-[#161616] text-[#f4f3ee] border-[#161616]'
                      : 'bg-transparent text-[#161616]/60 border-[#161616]/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-[#888] inline-block"></span>
                  <span>Cotas & Ejes</span>
                </button>

                <button
                  onClick={() => toggleLayer('bioclimatic')}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-none border text-[10px] ${
                    layers.bioclimatic
                      ? 'bg-[#008855] text-white border-[#008855]'
                      : 'bg-transparent text-[#161616]/60 border-[#161616]/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-[#22cc77] inline-block"></span>
                  <span>Flujos Bioclimáticos</span>
                </button>
              </div>
            </div>

            {/* Measuring Mode Banner (if active) */}
            {isMeasuringMode && (
              <div className="bg-[#ff4400] text-white px-4 py-1.5 font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  <span>
                    {!measurePointA
                      ? 'Haga clic en el plano para colocar el PUNTO DE INICIO'
                      : !measurePointB
                      ? 'Mueva el cursor y haga clic para fijar el PUNTO FINAL'
                      : 'Medición completada. Haga clic de nuevo para reiniciar'}
                  </span>
                </div>
                {currentDistanceMeters && (
                  <div className="font-bold bg-black/30 px-2 py-0.5">
                    DISTANCIA: {currentDistanceMeters} METROS REALES
                  </div>
                )}
              </div>
            )}

            {/* Blueprint Canvas Frame */}
            <div className="relative overflow-auto p-4 sm:p-6 bg-[#fcfbfa] flex items-center justify-center min-h-[480px] max-h-[640px] select-none">
              
              {/* Scalable Container */}
              <div
                ref={blueprintContainerRef}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.15s ease-out'
                }}
                className={`relative w-full aspect-[4/3] max-w-[820px] bg-[#faf8f4] border-2 border-[#161616] p-4 shadow-sm ${
                  isMeasuringMode ? 'cursor-crosshair' : 'cursor-default'
                }`}
              >
                {/* Blueprint Technical Grid Pattern */}
                <div className="absolute inset-0 bg-blueprint-grid opacity-70 pointer-events-none"></div>

                {/* SVG Blueprint Vector Representation */}
                <svg
                  className="w-full h-full pointer-events-none"
                  viewBox="0 0 1000 750"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* LAYER: Structural Grid Axes (A, B, C, D / 1, 2, 3, 4) */}
                  {layers.dimensions && (
                    <g opacity="0.4" stroke="#777" strokeWidth="0.8" strokeDasharray="6 4">
                      {/* X grid lines */}
                      {currentPlan.gridAxes.xAxes.map((axis, i) => (
                        <g key={`axis-x-${i}`}>
                          <line x1={axis.x * 10} y1="30" x2={axis.x * 10} y2="720" />
                          <circle cx={axis.x * 10} cy="20" r="12" fill="#faf8f4" stroke="#333" strokeWidth="1" />
                          <text x={axis.x * 10} y="24" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="#111" fontWeight="bold">
                            {axis.label}
                          </text>
                        </g>
                      ))}

                      {/* Y grid lines */}
                      {currentPlan.gridAxes.yAxes.map((axis, i) => (
                        <g key={`axis-y-${i}`}>
                          <line x1="30" y1={axis.y * 7.5} x2="970" y2={axis.y * 7.5} />
                          <circle cx="20" cy={axis.y * 7.5} r="12" fill="#faf8f4" stroke="#333" strokeWidth="1" />
                          <text x="20" y={axis.y * 7.5 + 4} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="#111" fontWeight="bold">
                            {axis.label}
                          </text>
                        </g>
                      ))}
                    </g>
                  )}

                  {/* LAYER: Zones and Room Labels */}
                  {layers.zones && (
                    <g>
                      {currentPlan.zones.map((zone, i) => (
                        <g key={`zone-${i}`}>
                          <rect
                            x={zone.x * 10}
                            y={zone.y * 7.5}
                            width={zone.width * 10}
                            height={zone.height * 7.5}
                            fill="#f0ece1"
                            fillOpacity="0.45"
                            stroke="#161616"
                            strokeWidth="1.2"
                            strokeDasharray="4 2"
                          />
                          <text
                            x={zone.x * 10 + (zone.width * 10) / 2}
                            y={zone.y * 7.5 + (zone.height * 7.5) / 2 - 4}
                            textAnchor="middle"
                            fontSize="12"
                            fontFamily="Space Grotesk"
                            fontWeight="600"
                            fill="#161616"
                          >
                            {zone.name}
                          </text>
                          <text
                            x={zone.x * 10 + (zone.width * 10) / 2}
                            y={zone.y * 7.5 + (zone.height * 7.5) / 2 + 14}
                            textAnchor="middle"
                            fontSize="10"
                            fontFamily="JetBrains Mono"
                            fill="#666"
                          >
                            SUP. {zone.area}
                          </text>
                        </g>
                      ))}
                    </g>
                  )}

                  {/* LAYER: Structural Walls, Columns, & Cantilevers */}
                  {layers.structure && (
                    <g>
                      {/* Heavy Outer Structural Shell */}
                      <rect
                        x="140"
                        y="140"
                        width="760"
                        height="490"
                        fill="none"
                        stroke="#161616"
                        strokeWidth="5"
                      />

                      {/* Internal Bearing Walls */}
                      <line x1="500" y1="140" x2="500" y2="440" stroke="#161616" strokeWidth="4" />
                      <line x1="140" y1="440" x2="760" y2="440" stroke="#161616" strokeWidth="4" />
                      <line x1="740" y1="440" x2="740" y2="630" stroke="#161616" strokeWidth="4" />

                      {/* Cantilever Highlight Frame (Right Wing) */}
                      <path
                        d="M 760 140 L 900 140 L 900 440 L 760 440"
                        fill="#ff4400"
                        fillOpacity="0.06"
                        stroke="#ff4400"
                        strokeWidth="2.5"
                        strokeDasharray="6 3"
                      />
                      <text x="830" y="290" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="#ff4400" fontWeight="bold">
                        VOLADIZO POSTENSADO 14.2M
                      </text>

                      {/* Structural Concrete Columns (Reinforced Pillars) */}
                      {[
                        [140, 140], [340, 140], [540, 140], [740, 140],
                        [140, 280], [340, 280], [540, 280], [740, 280],
                        [140, 440], [340, 440], [540, 440], [740, 440],
                        [140, 630], [340, 630], [540, 630], [740, 630]
                      ].map(([cx, cy], idx) => (
                        <g key={`col-${idx}`}>
                          <rect
                            x={cx - 8}
                            y={cy - 8}
                            width="16"
                            height="16"
                            fill="#161616"
                            stroke="#ffffff"
                            strokeWidth="1"
                          />
                          <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} stroke="#ffffff" strokeWidth="0.8" />
                          <line x1={cx - 6} y1={cy + 6} x2={cx + 6} y2={cy - 6} stroke="#ffffff" strokeWidth="0.8" />
                        </g>
                      ))}
                    </g>
                  )}

                  {/* LAYER: MEP Systems (HVAC conduits, Geothermal loops, Radiant circuits) */}
                  {layers.mep && (
                    <g>
                      {/* Primary Geothermal Circuit Trunk (Blue) */}
                      <path
                        d="M 320 510 L 320 280 L 720 280 L 720 380"
                        fill="none"
                        stroke="#0066cc"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                      />
                      {/* Radiant loops serpentine */}
                      <path
                        d="M 200 200 H 300 V 220 H 200 V 240 H 300"
                        fill="none"
                        stroke="#0088ff"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                      <text x="325" y="270" fontSize="9" fontFamily="JetBrains Mono" fill="#0066cc" fontWeight="bold">
                        COLLECTOR GEOTERMIA DN63
                      </text>
                    </g>
                  )}

                  {/* LAYER: Bioclimatic Vectors & Passive Airflow */}
                  {layers.bioclimatic && (
                    <g>
                      {/* Natural Cross-Ventilation Wind Flow Arrows */}
                      <path
                        d="M 100 300 Q 300 260 500 320 T 890 310"
                        fill="none"
                        stroke="#00aa66"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                      />
                      <polygon points="890,310 878,304 878,316" fill="#00aa66" />
                      
                      {/* Sun path angle indicator */}
                      <circle cx="850" cy="180" r="22" fill="#ffaa00" fillOpacity="0.15" stroke="#ffaa00" strokeWidth="1.5" />
                      <line x1="850" y1="150" x2="850" y2="210" stroke="#ffaa00" strokeWidth="1" />
                      <line x1="820" y1="180" x2="880" y2="180" stroke="#ffaa00" strokeWidth="1" />
                      <text x="850" y="215" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#b37400">
                        SOLSTICIO 68°
                      </text>

                      {/* Evaporative Water Surface Hatch */}
                      <rect x="770" y="450" width="130" height="170" fill="#0099ff" fillOpacity="0.12" stroke="#0099ff" strokeWidth="1" />
                      <text x="835" y="540" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="#0077cc">
                        ENFRIAMIENTO EVAPORATIVO
                      </text>
                    </g>
                  )}

                  {/* LAYER: Dimension Strings */}
                  {layers.dimensions && (
                    <g stroke="#333" strokeWidth="1">
                      {/* Overall Top Dimension */}
                      <line x1="140" y1="90" x2="900" y2="90" />
                      <line x1="140" y1="80" x2="140" y2="100" />
                      <line x1="900" y1="80" x2="900" y2="100" />
                      <text x="520" y="82" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="#111" fontWeight="bold">
                        LONGITUD TOTAL: 38.00 m
                      </text>

                      {/* Left Height Dimension */}
                      <line x1="90" y1="140" x2="90" y2="630" />
                      <line x1="80" y1="140" x2="100" y2="140" />
                      <line x1="80" y1="630" x2="100" y2="630" />
                      <text x="75" y="390" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="#111" transform="rotate(-90 75 390)">
                        CRUJÍA: 24.50 m
                      </text>
                    </g>
                  )}

                  {/* Measuring Tool Active Interactive SVG Line */}
                  {isMeasuringMode && measurePointA && (
                    <g>
                      {/* Point A */}
                      <circle
                        cx={measurePointA.x * 10}
                        cy={measurePointA.y * 7.5}
                        r="6"
                        fill="#ff4400"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      {/* Active or final line to Point B */}
                      {measurePointB ? (
                        <>
                          <line
                            x1={measurePointA.x * 10}
                            y1={measurePointA.y * 7.5}
                            x2={measurePointB.x * 10}
                            y2={measurePointB.y * 7.5}
                            stroke="#ff4400"
                            strokeWidth="2.5"
                            strokeDasharray="4 2"
                          />
                          <circle
                            cx={measurePointB.x * 10}
                            cy={measurePointB.y * 7.5}
                            r="6"
                            fill="#ff4400"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                        </>
                      ) : mousePos ? (
                        <line
                          x1={measurePointA.x * 10}
                          y1={measurePointA.y * 7.5}
                          x2={mousePos.x * 10}
                          y2={mousePos.y * 7.5}
                          stroke="#ff4400"
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />
                      ) : null}
                    </g>
                  )}
                </svg>

                {/* Hotspots: Interactive Clickable Markers */}
                {currentPlan.hotspots.map((hotspot) => {
                  const isSelected = activeHotspot?.id === hotspot.id;
                  return (
                    <div
                      key={hotspot.id}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(isSelected ? null : hotspot);
                        }}
                        className={`group relative flex items-center justify-center p-1 transition-all duration-200 ${
                          isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                        }`}
                        title={`${hotspot.code}: ${hotspot.title}`}
                      >
                        {/* Pulsing ring */}
                        <span className="absolute inset-0 bg-[#ff4400]/40 animate-hotspot"></span>
                        
                        {/* Sharp brutalist badge */}
                        <span className={`relative px-1.5 py-0.5 font-mono text-[9px] font-bold shadow-md transition-colors ${
                          isSelected
                            ? 'bg-[#161616] text-[#ff4400] ring-2 ring-[#ff4400]'
                            : 'bg-[#ff4400] text-white group-hover:bg-[#161616]'
                        }`}>
                          {hotspot.code}
                        </span>
                      </button>
                    </div>
                  );
                })}

                {/* Architectural Scale Bar & North Arrow Legend */}
                <div className="absolute bottom-3 left-3 bg-[#faf8f4]/95 border border-[#161616]/30 px-3 py-2 font-mono text-[10px] text-[#161616] flex items-center gap-4">
                  {/* North Compass Arrow */}
                  <div className="flex flex-col items-center">
                    <Compass className="w-4 h-4 text-[#ff4400]" />
                    <span className="text-[8px] font-bold">N</span>
                  </div>
                  <div className="border-l border-[#161616]/20 pl-3">
                    <div className="flex items-center gap-1 font-bold">
                      <span>ESCALA GRÁFICA</span>
                      <span className="text-[#ff4400]">1:100</span>
                    </div>
                    {/* Graphic meter bar */}
                    <div className="flex items-center mt-1">
                      <span className="w-8 h-2 bg-[#161616] inline-block"></span>
                      <span className="w-8 h-2 bg-white border border-[#161616] inline-block"></span>
                      <span className="w-8 h-2 bg-[#161616] inline-block"></span>
                      <span className="ml-2 text-[9px] text-[#666]">0 — 2m — 5m</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Right Cartouche stamp */}
                <div className="absolute bottom-3 right-3 hidden sm:block bg-[#faf8f4]/95 border border-[#161616]/30 p-2 font-mono text-[9px] text-right">
                  <div className="font-bold text-[#161616]">VÉRTICE CONSULTORA ARQ.</div>
                  <div className="text-[#666]">{currentPlan.code} · VISADO 2026</div>
                </div>
              </div>
            </div>

            {/* Bottom Info Status bar */}
            <div className="bg-[#e7e3d6] border-t border-[#161616]/20 px-4 py-2 flex flex-wrap items-center justify-between font-mono text-[11px] text-[#161616]/75">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>
                  Haga clic en las etiquetas rojas ({currentPlan.hotspots.length} detalles disponibles) para abrir el dictamen constructivo.
                </span>
              </div>
              <div>
                <span>COTA REFERENCIA: {currentPlan.elevation}</span>
              </div>
            </div>

          </div>

          {/* Technical Detail Inspector Panel (4 or 3 cols) */}
          <div className="xl:col-span-4 2xl:col-span-3 border border-[#161616]/25 bg-white shadow-sm">
            <div className="p-4 bg-[#161616] text-[#f4f3ee] flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff4400]"></span>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
                  INSPECTOR DE DETALLE
                </h3>
              </div>
              {activeHotspot && (
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-white/60 hover:text-white p-1"
                  aria-label="Cerrar detalle"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {activeHotspot ? (
              <div className="p-5 font-mono text-xs space-y-4">
                {/* Header of Detail */}
                <div className="border-b border-[#161616]/15 pb-3">
                  <div className="flex items-center justify-between text-[10px] text-[#ff4400] font-bold mb-1">
                    <span>{activeHotspot.code}</span>
                    <span className="text-[#161616]/60">{activeHotspot.categoryLabel}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-[#161616] leading-snug">
                    {activeHotspot.title}
                  </h4>
                </div>

                {/* Technical Description */}
                <div>
                  <div className="text-[10px] uppercase text-[#161616]/50 mb-1">MEMORIA CONSTRUCTIVA</div>
                  <p className="font-body text-xs text-[#161616]/85 leading-relaxed bg-[#f8f7f3] p-3 border border-[#161616]/10">
                    {activeHotspot.detail}
                  </p>
                </div>

                {/* Material Composition */}
                <div>
                  <div className="text-[10px] uppercase text-[#161616]/50 mb-1">MATERIAL & DOSIFICACIÓN</div>
                  <div className="font-body text-xs text-[#161616] font-medium p-2 bg-[#f4f3ee] border-l-2 border-[#ff4400]">
                    {activeHotspot.material}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div>
                  <div className="text-[10px] uppercase text-[#161616]/50 mb-1">PARÁMETROS DE CÁLCULO & TOLERANCIAS</div>
                  <p className="font-body text-xs text-[#161616]/80 leading-relaxed">
                    {activeHotspot.specification}
                  </p>
                </div>

                {/* Normative Reference */}
                <div className="pt-2 border-t border-[#161616]/15">
                  <div className="text-[10px] uppercase text-[#161616]/50 mb-1">NORMATIVA APLICABLE</div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-[#ff4400] font-semibold">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{activeHotspot.normative}</span>
                  </div>
                </div>

                {/* Related Project link */}
                {onSelectProject && (
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectProject(currentPlan.projectId)}
                      className="w-full py-2 bg-[#161616] text-[#f4f3ee] text-xs font-semibold uppercase tracking-wider hover:bg-[#ff4400] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Ver Proyecto Completo</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center font-mono text-xs text-[#161616]/60 space-y-3">
                <div className="w-10 h-10 border-2 border-dashed border-[#161616]/30 mx-auto flex items-center justify-center text-[#ff4400]">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="font-display font-semibold text-[#161616] text-sm">
                  Ningún punto seleccionado
                </div>
                <p className="font-body text-xs leading-relaxed text-[#161616]/70">
                  Haga clic sobre cualquiera de los marcadores ({currentPlan.hotspots.map(h => h.code).join(', ')}) en el plano para visualizar el despiece estructural, materiales y normativa aplicable.
                </p>
                <div className="pt-4 border-t border-[#161616]/10 text-[11px] text-left space-y-1.5">
                  <div className="font-bold text-[#161616]">Detalles disponibles en este plano:</div>
                  {currentPlan.hotspots.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h)}
                      className="w-full text-left p-1.5 hover:bg-[#f4f3ee] border border-transparent hover:border-[#161616]/15 flex items-center justify-between"
                    >
                      <span className="font-bold text-[#ff4400]">{h.code}</span>
                      <span className="truncate ml-2 text-[#161616]">{h.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Cartela Técnica / Printable Drawing Sheet Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fcfbfa] max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-[#161616] p-6 sm:p-8 font-mono shadow-2xl relative">
            
            {/* Modal close */}
            <button
              onClick={() => setShowPrintModal(false)}
              className="absolute top-4 right-4 p-2 bg-[#161616] text-white hover:bg-[#ff4400] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Perimeter sheet border with tick marks */}
            <div className="border-2 border-[#161616] p-4 sm:p-6 relative">
              <div className="text-[10px] text-[#ff4400] font-bold mb-2">
                CARTELA DE VISADO COLEGIAL — LÁMINA TÉCNICA OFICIAL
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-[10px] uppercase text-[#666]">CONSULTORA DE INGENIERÍA</div>
                  <div className="font-display text-lg font-bold text-[#161616]">VÉRTICE ESTRUCTURAS</div>
                  <div className="text-xs text-[#555] font-body mt-1">Colegio Oficial de Arquitectos · Visado Digital 2026-V88</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#666]">PROYECTO & PLANO</div>
                  <div className="font-bold text-sm text-[#161616]">{currentPlan.title}</div>
                  <div className="text-xs text-[#555]">{currentPlan.subtitle}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#666]">PARÁMETROS TÉCNICOS</div>
                  <div className="text-xs text-[#161616] font-semibold">{currentPlan.scaleText} · {currentPlan.level}</div>
                  <div className="text-xs text-[#ff4400] font-bold">{currentPlan.elevation}</div>
                </div>
              </div>

              {/* Table of Technical Hotspots */}
              <div className="border border-[#161616] mb-6">
                <div className="bg-[#161616] text-white px-3 py-1.5 text-xs font-bold uppercase">
                  CUADRO DE ELEMENTOS SINGULARES Y PRESCRIPCIONES CTE / EUROCÓDIGO
                </div>
                <div className="divide-y divide-[#161616]/20">
                  {currentPlan.hotspots.map((hs) => (
                    <div key={hs.id} className="p-3 text-xs grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <div className="font-bold text-[#ff4400]">{hs.code} — {hs.title}</div>
                      <div className="sm:col-span-2 text-[#444] font-body">{hs.detail}</div>
                      <div className="text-[11px] text-[#161616] font-semibold">{hs.normative}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal stamp signature area */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] border-t border-[#161616]/20 pt-4">
                <div>
                  <span className="text-[#666]">FECHA DE REVISIÓN:</span>
                  <div className="font-bold text-[#161616]">OCTUBRE 2026</div>
                </div>
                <div>
                  <span className="text-[#666]">SISTEMA DE COORDENADAS:</span>
                  <div className="font-bold text-[#161616]">ETRS89 FUSO 30</div>
                </div>
                <div>
                  <span className="text-[#666]">CONTROL DE CALIDAD:</span>
                  <div className="font-bold text-[#008855]">APROBADO ISO 9001</div>
                </div>
                <div className="text-right">
                  <span className="text-[#666]">REF. DE REGISTRO:</span>
                  <div className="font-bold text-[#ff4400]">DOC-{currentPlan.code}-VER4</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#ff4400] text-white hover:bg-[#e03b00] font-semibold"
              >
                Imprimir Lámina Técnica (PDF)
              </button>
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 bg-[#161616] text-white hover:bg-[#333]"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
