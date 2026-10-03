import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, FileText, Phone, Mail, MapPin, Building2, ShieldAlert } from 'lucide-react';

interface ConsultationFormProps {
  initialData?: {
    typology?: string;
    area?: number;
    structure?: string;
    targetCert?: string;
    serviceTitle?: string;
  } | null;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    typology: 'Residencial Colectivo',
    area: '1850',
    location: '',
    projectStage: 'Proyecto Básico',
    consultingServices: ['Cálculo Estructural y FEM'],
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  // Sync initialData if provided from calculator or service buttons
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        typology: initialData.typology ? initialData.typology.replace('-', ' ') : prev.typology,
        area: initialData.area ? String(initialData.area) : prev.area,
        message: initialData.serviceTitle
          ? `Solicitud de consultoría específica para: ${initialData.serviceTitle}.`
          : initialData.structure
          ? `Parámetros pre-calculados: Estructura ${initialData.structure}, Certificación ${initialData.targetCert}, Superficie ${initialData.area} m².`
          : prev.message
      }));
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo no válido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono de contacto requerido';
    if (!formData.location.trim()) newErrors.location = 'Indique la ubicación del proyecto';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `VR-DICTAMEN-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedReference(generatedRef);
      setIsSubmitting(false);
    }, 700);
  };

  const toggleService = (srv: string) => {
    setFormData(prev => {
      const exists = prev.consultingServices.includes(srv);
      return {
        ...prev,
        consultingServices: exists
          ? prev.consultingServices.filter(s => s !== srv)
          : [...prev.consultingServices, srv]
      };
    });
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 bg-[#efece4] border-b border-[#161616]/15 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#161616]/15">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#161616]/75 mb-2">
            <span className="w-2 h-2 bg-[#ff4400] inline-block"></span>
            <span>OFICINA TÉCNICA CENTRAL & ASESORAMIENTO</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#161616]">
            SOLICITUD DE CONSULTORÍA & DICTAMEN TÉCNICO
          </h2>
          <p className="font-body text-sm text-[#161616]/80 max-w-2xl mt-1">
            Si su estudio o promotora requiere asistencia técnica en cálculo de estructuras singulares, optimización de fachada o certificación Passivhaus, remítanos los datos clave de la obra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Column (8 cols) */}
          <div className="lg:col-span-8 bg-[#fcfbfa] border border-[#161616]/20 p-6 sm:p-8 font-mono text-xs shadow-sm">
            
            {submittedReference ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-[#008855] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-mono text-xs text-[#008855] font-bold uppercase tracking-wider">
                  SOLICITUD REGISTRADA EN EL LIBRO TÉCNICO
                </div>
                <h3 className="font-display text-2xl font-bold text-[#161616]">
                  Expediente {submittedReference}
                </h3>
                <p className="font-body text-sm text-[#161616]/80 max-w-lg mx-auto leading-relaxed">
                  Hemos generado el pre-expediente para su proyecto en <strong>{formData.location}</strong> ({formData.area} m²). Nuestro equipo técnico de cálculo revisará la documentación preliminar y se pondrá en contacto en un plazo inferior a 24 horas laborables.
                </p>

                <div className="pt-4 border-t border-[#161616]/10 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedReference(null);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        typology: 'Residencial Colectivo',
                        area: '1850',
                        location: '',
                        projectStage: 'Proyecto Básico',
                        consultingServices: ['Cálculo Estructural y FEM'],
                        message: ''
                      });
                    }}
                    className="px-4 py-2 bg-[#161616] text-[#f4f3ee] text-xs uppercase font-semibold hover:bg-[#ff4400] transition-colors"
                  >
                    Registrar Otra Consulta Técnica
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Contact Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Arq. Ferran Mas"
                      className={`w-full p-2.5 bg-[#f5f4ef] border text-xs font-mono focus:outline-none ${
                        errors.name ? 'border-[#ff4400]' : 'border-[#161616]/20 focus:border-[#ff4400]'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-[#ff4400] mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                      Estudio / Promotora / Entidad
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Atelier Mas Arquitectes SL"
                      className="w-full p-2.5 bg-[#f5f4ef] border border-[#161616]/20 text-xs font-mono focus:outline-none focus:border-[#ff4400]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                      Correo Electrónico Corporativo *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="fmas@atelier-arquitectura.com"
                      className={`w-full p-2.5 bg-[#f5f4ef] border text-xs font-mono focus:outline-none ${
                        errors.email ? 'border-[#ff4400]' : 'border-[#161616]/20 focus:border-[#ff4400]'
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-[#ff4400] mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                      Teléfono de Contacto Técnico *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+34 612 34 56 78"
                      className={`w-full p-2.5 bg-[#f5f4ef] border text-xs font-mono focus:outline-none ${
                        errors.phone ? 'border-[#ff4400]' : 'border-[#161616]/20 focus:border-[#ff4400]'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-[#ff4400] mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                {/* Project Characteristics */}
                <div className="border-t border-[#161616]/10 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                      Ubicación de la Parcela *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Valencia / Begur / Madrid..."
                      className={`w-full p-2.5 bg-[#f5f4ef] border text-xs font-mono focus:outline-none ${
                        errors.location ? 'border-[#ff4400]' : 'border-[#161616]/20 focus:border-[#ff4400]'
                      }`}
                    />
                    {errors.location && <span className="text-[10px] text-[#ff4400] mt-1 block">{errors.location}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                      Superficie Estimada (m²)
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="1850"
                      className="w-full p-2.5 bg-[#f5f4ef] border border-[#161616]/20 text-xs font-mono focus:outline-none focus:border-[#ff4400]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                      Fase Actual de Desarrollo
                    </label>
                    <select
                      value={formData.projectStage}
                      onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                      className="w-full p-2.5 bg-[#f5f4ef] border border-[#161616]/20 text-xs font-mono focus:outline-none focus:border-[#ff4400]"
                    >
                      <option value="Concurso">Fase de Concurso</option>
                      <option value="Anteproyecto">Anteproyecto</option>
                      <option value="Proyecto Básico">Proyecto Básico</option>
                      <option value="Proyecto Ejecutivo">Proyecto Ejecutivo / Licitación</option>
                      <option value="En Ejecución de Obra">En Ejecución de Obra</option>
                      <option value="Peritaje / Patología">Edificio Construido (Patología)</option>
                    </select>
                  </div>
                </div>

                {/* Consulting Needs Checkboxes */}
                <div className="border-t border-[#161616]/10 pt-4">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-2">
                    Servicios Técnicos Requeridos
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      'Cálculo Estructural y FEM',
                      'Ingeniería de Envolvente y Muro Cortina',
                      'Modelado Energético y Passivhaus',
                      'Coordinación BIM LOD 400/500',
                      'Dictamen de Patología o Peritaje Judicial',
                      'Optimización de Costes y Mediciones'
                    ].map((srv) => {
                      const isChecked = formData.consultingServices.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`p-2 border text-left flex items-center gap-2 transition-colors ${
                            isChecked
                              ? 'bg-[#161616] text-white border-[#161616]'
                              : 'bg-white text-[#161616] border-[#161616]/20 hover:border-[#161616]/50'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[10px] ${
                            isChecked ? 'border-[#ff4400] bg-[#ff4400] text-white font-bold' : 'border-[#999]'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                          <span className="truncate">{srv}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message / Technical Scope */}
                <div className="border-t border-[#161616]/10 pt-4">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#161616] mb-1">
                    Descripción Técnica de la Intervención
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describa brevemente la complejidad estructural, luces libres, tipología de suelo o plazos requeridos..."
                    className="w-full p-2.5 bg-[#f5f4ef] border border-[#161616]/20 text-xs font-mono focus:outline-none focus:border-[#ff4400]"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#ff4400] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#e03b00] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Generando Expediente...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Remitir Datos a la Oficina de Proyectos</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Contact Details & Office Locations (4 cols) */}
          <div className="lg:col-span-4 space-y-6 font-mono text-xs">
            
            {/* Headquarters Card */}
            <div className="bg-[#161616] text-[#f4f3ee] border border-[#161616] p-6 shadow-sm">
              <div className="text-[10px] text-[#ff4400] uppercase font-bold tracking-wider mb-2">
                SEDE CENTRAL DE INGENIERÍA
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-4">
                VÉRTICE ARQUITECTURA
              </h3>
              
              <div className="space-y-3 text-[#ccc] font-body text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#ff4400] shrink-0 mt-0.5" />
                  <span>Paseo de la Castellana 140, Planta 12, 28046 Madrid, España</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#ff4400] shrink-0" />
                  <span>+34 91 840 22 10</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#ff4400] shrink-0" />
                  <span>consultoria@vertice-arq.es</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#333] text-[10px] text-[#888] font-mono">
                HORARIO DE REGISTRO TÉCNICO: LUN-VIE 08:30 - 19:30 CET
              </div>
            </div>

            {/* Delegation Offices */}
            <div className="bg-[#fcfbfa] border border-[#161616]/20 p-5 space-y-4">
              <div className="font-bold text-[11px] uppercase text-[#161616]">
                DELEGACIONES TÉCNICAS
              </div>
              
              <div className="border-b border-[#161616]/10 pb-2">
                <div className="font-bold text-[#161616]">Barcelona — Atelier de Envolventes</div>
                <div className="text-[#666] font-body">Carrer de Mallorca 248 · bcn@vertice-arq.es</div>
              </div>

              <div className="border-b border-[#161616]/10 pb-2">
                <div className="font-bold text-[#161616]">Valencia — Laboratorio Bioclimático</div>
                <div className="text-[#666] font-body">Avinguda de França 14 · vlc@vertice-arq.es</div>
              </div>

              <div>
                <div className="font-bold text-[#161616]">Santiago de Chile — Oficina Cono Sur</div>
                <div className="text-[#666] font-body">Av. Vitacura 2939, Las Condes · stgo@vertice-arq.com</div>
              </div>
            </div>

            {/* Quality Statement */}
            <div className="p-4 bg-[#f8f6f0] border border-[#161616]/15 text-[11px] text-[#161616]/80 font-body">
              <span className="font-mono font-bold text-[#ff4400]">GARANTÍA PROFESIONAL:</span> Toda propuesta técnica y dictamen pericial emitido por VÉRTICE cuenta con seguro de responsabilidad civil profesional decenal hasta 10.000.000 € y visado colegial obligatorio.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
