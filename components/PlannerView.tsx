import React, { useState } from 'react';
import { generateLessonPlan } from '../services/geminiService';
import { LessonPlan, PlannerFormData } from '../types';
import { LessonPlanDisplay } from './LessonPlanDisplay';
import { Button } from './Button';
import { Sparkles, ArrowRight, FileDown } from 'lucide-react';

export const PlannerView: React.FC = () => {
  const [formData, setFormData] = useState<PlannerFormData>({
    age: '',
    subject: '',
    unit: '',
    duration: '45'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.subject || !formData.unit) return;

    setIsLoading(true);
    setError(null);
    setLessonPlan(null);

    try {
      const plan = await generateLessonPlan(formData);
      setLessonPlan(plan);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al generar la clase. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadDoc = () => {
    if (!lessonPlan) return;

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${lessonPlan.title}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.5; }
          h1 { color: #2E5984; font-size: 24pt; border-bottom: 2px solid #2E5984; padding-bottom: 10px; }
          h2 { color: #2E5984; font-size: 18pt; margin-top: 20px; }
          h3 { color: #1F4E79; font-size: 14pt; margin-top: 15px; }
          .highlight { background-color: #E7F3FF; padding: 10px; border-radius: 5px; }
          .generalization { font-style: italic; color: #9C6500; font-size: 14pt; }
          .activity { margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          .phase { font-weight: bold; color: #008080; }
        </style>
      </head>
      <body>
        <h1>${lessonPlan.title}</h1>
        <p><strong>Asignatura:</strong> ${formData.subject}</p>
        <p><strong>Edad:</strong> ${formData.age}</p>
        <p><strong>Unidad:</strong> ${formData.unit}</p>
        <p><strong>Duración:</strong> ${formData.duration} minutos</p>
        
        <h2>Estructura Conceptual</h2>
        <p><strong>Macro-Concepto:</strong> ${lessonPlan.macroConcept}</p>
        <p><strong>Micro-Conceptos:</strong> ${lessonPlan.microConcepts.join(', ')}</p>
        
        <div class="highlight">
          <h3>Entendimiento Perdurable (Generalización)</h3>
          <p class="generalization">"${lessonPlan.generalization}"</p>
        </div>

        <h2>Preguntas Guía</h2>
        <h3>Fácticas</h3>
        <ul>${lessonPlan.guidingQuestions.factual.map(q => `<li>${q}</li>`).join('')}</ul>
        <h3>Conceptuales</h3>
        <ul>${lessonPlan.guidingQuestions.conceptual.map(q => `<li>${q}</li>`).join('')}</ul>
        <h3>Debatibles</h3>
        <ul>${lessonPlan.guidingQuestions.debatable.map(q => `<li>${q}</li>`).join('')}</ul>

        <h2>Secuencia de Aprendizaje</h2>
        ${lessonPlan.activities.map(act => `
          <div class="activity">
            <p><span class="phase">[${act.phase} - ${act.time}]</span> <strong>${act.activity}</strong></p>
            <p><em>Propósito: ${act.purpose}</em></p>
          </div>
        `).join('')}

        <h2>Evaluación Sugerida</h2>
        <p>${lessonPlan.assessmentIdea}</p>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Plan_Clase_${lessonPlan.title.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-indigo-300 mb-4">
          Diseñador de Clases IA
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Ingresa los detalles de tu unidad y deja que nuestra IA estructure una planificación conceptual profunda para ti.
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl shadow-black/20 border border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-slate-300">Edad de los Estudiantes</label>
              <input
                id="age"
                name="age"
                type="text"
                placeholder="Ej: 10-12 años, Secundaria..."
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-slate-300">Asignatura</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Ej: Historia, Ciencias, Arte..."
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="unit" className="block text-sm font-medium text-slate-300">Tema o Unidad</label>
              <input
                id="unit"
                name="unit"
                type="text"
                placeholder="Ej: Ecosistemas, Revolución Industrial..."
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-medium text-slate-300">Duración de la Clase</label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="45">45 Minutos</option>
                <option value="90">90 Minutos</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              type="submit" 
              isLoading={isLoading} 
              icon={<Sparkles className="w-5 h-5" />}
              className="w-full md:w-auto text-lg px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400"
            >
              Generar Planificación
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mt-8 p-4 bg-red-900/20 text-red-300 rounded-lg border border-red-800 text-center">
          {error}
        </div>
      )}

      {lessonPlan && (
        <div id="results">
           <LessonPlanDisplay plan={lessonPlan} duration={formData.duration} />
           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
             <Button variant="outline" onClick={() => window.print()} icon={<ArrowRight className="w-4 h-4"/>}>
               Imprimir / PDF
             </Button>
             <Button variant="secondary" onClick={handleDownloadDoc} icon={<FileDown className="w-4 h-4"/>}>
               Descargar .doc
             </Button>
           </div>
        </div>
      )}
    </div>
  );
};