import React, { useState } from 'react';
import { Brain, Layers, Globe, Compass, ChevronDown, ChevronUp, Key, Lightbulb } from 'lucide-react';

const conceptsList = [
  { name: "Estética", desc: "La apreciación de la belleza y la expresión artística." },
  { name: "Cambio", desc: "La transformación de personas, objetos o entornos a través del tiempo." },
  { name: "Comunicación", desc: "El intercambio de información, pensamientos y sentimientos." },
  { name: "Comunidades", desc: "Grupos de personas unidas por proximidad, intereses o valores." },
  { name: "Conexiones", desc: "Vínculos entre personas, objetos, ideas y sistemas." },
  { name: "Creatividad", desc: "La capacidad de generar nuevas ideas y formas de expresión." },
  { name: "Cultura", desc: "Patrones de creencias, valores y comportamientos compartidos." },
  { name: "Desarrollo", desc: "El proceso de crecimiento, progreso y mejora." },
  { name: "Forma", desc: "La estructura y organización de un objeto o idea." },
  { name: "Interacciones", desc: "Las conexiones y efectos recíprocos entre entidades globales." },
  { name: "Identidad", desc: "Características que definen a una persona o grupo." },
  { name: "Lógica", desc: "El razonamiento y principios que rigen el pensamiento válido." },
  { name: "Perspectiva", desc: "La posición desde la cual se observa o interpreta algo." },
  { name: "Relaciones", desc: "Conexiones y asociaciones entre propiedades, objetos o personas." },
  { name: "Sistemas", desc: "Conjuntos de partes interdependientes que funcionan como un todo." },
  { name: "Tiempo, lugar y espacio", desc: "Las dimensiones físicas y temporales donde ocurren los eventos." },
];

const ConceptCard = ({ title, icon: Icon, children }: { title: string, icon: any, children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 shadow-lg shadow-black/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-800 rounded-lg text-indigo-400 ring-1 ring-white/10">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      <div 
        className={`px-6 text-slate-400 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pt-4 border-t border-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export const EducationSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      
      {/* Intro */}
      <div className="text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full"></div>
        <h2 className="relative text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-teal-200 mb-6">
          Aprendizaje Basado en Conceptos
        </h2>
        <p className="relative text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Descubre cómo transformar la educación moviendo el pensamiento de lo factual a lo conceptual, creando conexiones profundas y transferibles.
        </p>
      </div>

      {/* 16 Key Concepts Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 justify-center mb-8">
          <Key className="w-6 h-6 text-teal-400" />
          <h3 className="text-2xl font-bold text-slate-200">Los 16 Conceptos Clave (PAI)</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {conceptsList.map((c, i) => (
            <div key={i} className="group relative bg-slate-800/50 hover:bg-slate-800 p-4 rounded-xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/0 group-hover:to-teal-500/5 rounded-xl transition-all"></div>
              <h4 className="font-bold text-slate-200 mb-2 text-sm group-hover:text-teal-300 transition-colors">{c.name}</h4>
              <p className="text-xs text-slate-500 leading-snug">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Accordions */}
      <section className="space-y-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-200 mb-2">Fundamentos del Modelo</h3>
          <p className="text-slate-500">Estructura del conocimiento de Lynn Erickson y Lois Lanning</p>
        </div>

        <ConceptCard title="Estructura del Conocimiento" icon={Layers}>
          <p className="mb-3 leading-relaxed">
            El modelo distingue entre <strong className="text-indigo-300">Conocimiento</strong> (hechos y temas específicos) y <strong className="text-teal-300">Entendimiento</strong> (conceptos y generalizaciones). 
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm mt-4">
            <li><strong className="text-slate-300">Hechos:</strong> Datos específicos, intransferibles.</li>
            <li><strong className="text-slate-300">Temas:</strong> Categorías organizadoras de hechos.</li>
            <li><strong className="text-slate-300">Conceptos:</strong> Ideas mentales atemporales, universales y abstractas (ej: Cambio, Sistema).</li>
            <li><strong className="text-slate-300">Generalizaciones:</strong> Enunciados que expresan una relación profunda entre dos o más conceptos.</li>
          </ul>
        </ConceptCard>

        <ConceptCard title="Sinergia Intelectual" icon={Brain}>
          <p className="leading-relaxed">
            El aprendizaje profundo ocurre cuando el pensamiento factual (nivel bajo) y el pensamiento conceptual (nivel alto) interactúan. Los hechos proveen la base para construir conceptos, y los conceptos proveen el significado para retener los hechos.
          </p>
        </ConceptCard>

        <ConceptCard title="Transferencia" icon={Globe}>
          <p className="leading-relaxed">
            El objetivo final es la <strong className="text-teal-300">transferencia</strong>. Cuando un estudiante comprende un concepto (ej: "El poder corrompe"), puede aplicar ese entendimiento a nuevas situaciones, tiempos o lugares que nunca ha estudiado antes.
          </p>
        </ConceptCard>

        <ConceptCard title="Indagación por Conceptos" icon={Compass}>
          <p className="mb-4 text-slate-400">Las preguntas guía son clave para dirigir el pensamiento:</p>
          <div className="grid gap-3">
            <div className="bg-slate-950/50 p-3 rounded border-l-2 border-slate-500">
              <span className="font-semibold text-slate-300 block mb-1">Fácticas</span>
              <span className="text-sm">Piden hechos. (¿Qué es...?)</span>
            </div>
            <div className="bg-slate-950/50 p-3 rounded border-l-2 border-indigo-500">
              <span className="font-semibold text-indigo-300 block mb-1">Conceptuales</span>
              <span className="text-sm">Exploran relaciones e ideas amplias. (¿Cómo influye el poder en...?)</span>
            </div>
            <div className="bg-slate-950/50 p-3 rounded border-l-2 border-teal-500">
              <span className="font-semibold text-teal-300 block mb-1">Debatibles</span>
              <span className="text-sm">Promueven perspectivas y juicio crítico. (¿Es el poder siempre corruptor?)</span>
            </div>
          </div>
        </ConceptCard>
      </section>
    </div>
  );
};