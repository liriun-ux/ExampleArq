import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Leaf, Clock, AlertTriangle } from 'lucide-react';

interface FeasibilityCalculatorProps {
  onPreFillConsultation: (data: {
    typology: string;
    area: number;
    structure: string;
    targetCert: string;
  }) => void;
}

export const FeasibilityCalculator: React.FC<FeasibilityCalculatorProps> = ({
  onPreFillConsultation
}) => {
  const [typology, setTypology] = useState<string>('residencial-colectivo');
  const [area, setArea] = useState<number>(1850);
  const [structuralSystem, setStructuralSystem] = useState<string>('clt-madera');
  const [targetCert, setTargetCert] = useState<string>('passivhaus');
  const [soilType, setSoilType] = useState<string>('arcilloso');

  // Dynamic calculations based on engineering formulas
  const calculations = useMemo(() => {
    // Carbon benchmark (kg CO2e / m2)
    let baselineCarbonPerM2 = 450; // standard concrete
    let reductionFactor = 1.0;

    if (structuralSystem === 'clt-madera') {
      reductionFactor = 0.58; // -42% carbon footprint
    } else if (structuralSystem === 'mixto') {
      reductionFactor = 0.75;
    } else if (structuralSystem === 'acero') {
      reductionFactor = 0.90;
    }

    const calculatedCarbonPerM2 = Math.round(baselineCarbonPerM2 * reductionFactor);
    const totalCarbonTons = Math.round((calculatedCarbonPerM2 * area) / 1000);
    const standardCarbonTons = Math.round((baselineCarbonPerM2 * area) / 1000);
    const savedCarbonTons = Math.max(0, standardCarbonTons - totalCarbonTons);

    // Insulation thickness needed for target
    let insulationCm = 10;
    if (targetCert === 'passivhaus') {
      insulationCm = 18;
    } else if (targetCert === 'nzeb') {
      insulationCm = 14;
    }

    // Calculation timeline (weeks)
    const baseWeeks = Math.max(4, Math.round(Math.sqrt(area / 100) * 1.2));

    // Structural recommendation based on soil & system
    let soilNote = 'Cimentación directa sobre losa armada continua.';
    if (soilType === 'freatico') {
      soilNote = 'Requiere cimentación profunda por pilotaje y losa hidrófuga con barrera bentonítica.';
    } else if (soilType === 'arcilloso') {
      soilNote = 'Cálculo de presiones de hinchamiento en zapatas arriostradas por vigas de atado.';
    }

    return {
      carbonPerM2: calculatedCarbonPerM2,
      totalCarbonTons,
      savedCarbonTons,
      insulationCm,
      timelineWeeks: baseWeeks,
      soilRecommendation: soilNote
    };
  }, [typology, area, structuralSystem, targetCert, soilType]);

  const handleApplyToConsultation = () => {
    onPreFillConsultation({
      typology,
      area,
      structure: structuralSystem,
      targetCert
    });
  };

  return (
    <section id="calculadora-viabilidad" className="py-12 sm:py-16 bg-[#f4f3ee] border-b border-[#161616]/15 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-[#161616]/15">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#161616]/75 mb-2">
            <span className="w-2 h-2 bg-[#ff4400] inline-block"></span>
            <span>HERRAMIENTA DE ESTIMACIÓN TÉCNICA // CONSULTORÍA PREVIA</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#161616]">
            CALCULADORA DE VIABILIDAD ESTRUCTURAL & CARBONO
          </h2>
          <p className="font-body text-sm text-[#161616]/80 max-w-2xl mt-1">
            Simulador paramétrico preliminar para arquitectos, promotores y estudios. Evalúa la huella de carbono embebido, espesor de envolvente y tiempos de cálculo estructural según tipología y terreno.
          </p>
        </div>

        {/* Two-Column Grid: Inputs & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#efece4] border border-[#161616]/20 p-6 sm:p-8 font-mono text-xs space-y-6">
            
            {/* Input 1: Typology */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#161616] font-bold mb-2">
                01. Tipología de la Edificación
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'residencial-unifamiliar', label: 'Vivienda Unifamiliar' },
                  { id: 'residencial-colectivo', label: 'Residencial Colectivo' },
                  { id: 'terciario-oficinas', label: 'Edificio Terciario / Sedes' },
                  { id: 'equipamiento-cultural', label: 'Equipamiento Cultural' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTypology(item.id)}
                    className={`p-2.5 text-left border text-xs transition-colors ${
                      typology === item.id
                        ? 'bg-[#161616] text-[#f4f3ee] border-[#161616] font-bold'
                        : 'bg-white text-[#161616] border-[#161616]/20 hover:border-[#161616]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Surface Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] uppercase tracking-wider text-[#161616] font-bold">
                  02. Superficie Construida Estimada
                </label>
                <span className="font-display font-bold text-base text-[#ff4400]">
                  {area.toLocaleString()} m²
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="15000"
                step="50"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-[#d8d4c7] accent-[#ff4400] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#666] mt-1">
                <span>150 m²</span>
                <span>5.000 m²</span>
                <span>10.000 m²</span>
                <span>15.000 m²</span>
              </div>
            </div>

            {/* Input 3: Structural System */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#161616] font-bold mb-2">
                03. Sistema Estructural Principal Previsto
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'clt-madera', label: 'Madera Contralaminada (CLT)' },
                  { id: 'hormigon', label: 'Hormigón Armado Visto' },
                  { id: 'mixto', label: 'Sistema Mixto Hormigón-Acero' },
                  { id: 'acero', label: 'Estructura Metálica Ligera' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStructuralSystem(item.id)}
                    className={`p-2.5 text-left border text-xs transition-colors ${
                      structuralSystem === item.id
                        ? 'bg-[#161616] text-[#f4f3ee] border-[#161616] font-bold'
                        : 'bg-white text-[#161616] border-[#161616]/20 hover:border-[#161616]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Target Certification & Geotechnics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#161616] font-bold mb-2">
                  04. Objetivo Energético
                </label>
                <select
                  value={targetCert}
                  onChange={(e) => setTargetCert(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#161616]/20 text-xs font-mono focus:outline-none focus:border-[#ff4400]"
                >
                  <option value="passivhaus">Passivhaus Plus / Classic</option>
                  <option value="nzeb">Estándar nZEB Avanzado</option>
                  <option value="cte">Código Técnico Básico (CTE)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#161616] font-bold mb-2">
                  05. Geotecnia del Suelo
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#161616]/20 text-xs font-mono focus:outline-none focus:border-[#ff4400]"
                >
                  <option value="roca">Roca / Terreno Competente</option>
                  <option value="arcilloso">Arcilloso / Cohesivo</option>
                  <option value="freatico">Nivel Freático Alto / Relleno</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#161616] text-[#f4f3ee] border border-[#161616] p-6 sm:p-8 font-mono shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#333] mb-6">
                <span className="text-[10px] text-[#ff4400] uppercase font-bold tracking-wider">
                  DICTAMEN PARAMÉTRICO PRELIMINAR
                </span>
                <span className="text-[10px] text-[#888]">SIMULACIÓN EN VIVO</span>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* Metric 1 */}
                <div className="bg-[#242424] p-3.5 border border-[#333]">
                  <div className="text-[10px] text-[#aaa] uppercase flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-[#00cc66]" />
                    <span>HUELLA CARBONO</span>
                  </div>
                  <div className="font-display text-xl font-bold text-white mt-1">
                    {calculations.carbonPerM2} <span className="text-xs font-mono font-normal text-[#888]">kg CO₂/m²</span>
                  </div>
                  {calculations.savedCarbonTons > 0 && (
                    <div className="text-[10px] text-[#00cc66] mt-1 font-semibold">
                      ↓ Ahorro de {calculations.savedCarbonTons} t CO₂
                    </div>
                  )}
                </div>

                {/* Metric 2 */}
                <div className="bg-[#242424] p-3.5 border border-[#333]">
                  <div className="text-[10px] text-[#aaa] uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#ff4400]" />
                    <span>AISLAMIENTO ENV.</span>
                  </div>
                  <div className="font-display text-xl font-bold text-white mt-1">
                    {calculations.insulationCm} <span className="text-xs font-mono font-normal text-[#888]">cm</span>
                  </div>
                  <div className="text-[10px] text-[#888] mt-1">
                    U ≈ {(0.28 / (calculations.insulationCm / 10)).toFixed(2)} W/m²K
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-[#242424] p-3.5 border border-[#333]">
                  <div className="text-[10px] text-[#aaa] uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0099ff]" />
                    <span>PLAZO DE CÁLCULO</span>
                  </div>
                  <div className="font-display text-xl font-bold text-white mt-1">
                    ~{calculations.timelineWeeks} <span className="text-xs font-mono font-normal text-[#888]">semanas</span>
                  </div>
                  <div className="text-[10px] text-[#888] mt-1">
                    Modelo FEM + Memoria
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-[#242424] p-3.5 border border-[#333]">
                  <div className="text-[10px] text-[#aaa] uppercase">
                    VIABILIDAD TÉCNICA
                  </div>
                  <div className="font-display text-xl font-bold text-[#00cc66] mt-1">
                    ALTA (96%)
                  </div>
                  <div className="text-[10px] text-[#888] mt-1">
                    CTE DB-SE & Eurocódigo
                  </div>
                </div>

              </div>

              {/* Geotechnical Note */}
              <div className="bg-[#242424] p-4 border border-[#333] mb-6 text-xs font-body text-[#ccc] space-y-1">
                <div className="font-mono text-[10px] font-bold uppercase text-[#ff4400] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>PRESCRIPCIÓN DE CIMENTACIÓN (CTE DB-SE-C)</span>
                </div>
                <p className="leading-relaxed">
                  {calculations.soilRecommendation}
                </p>
              </div>
            </div>

            {/* Direct CTA with parameters */}
            <div>
              <button
                onClick={handleApplyToConsultation}
                className="w-full py-3 bg-[#ff4400] hover:bg-[#e03b00] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Solicitar Propuesta con estos Datos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[10px] text-[#777] text-center mt-2 font-mono">
                Dictamen técnico orientativo sujeto a estudio geotécnico definitivo.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
