
import React, { useState } from 'react';
import { generateAssessment } from '../services/geminiService';
import { AssessmentFormData, AssessmentResult } from '../types';
import { Button } from './Button';
import { Sparkles, FileDown, Eye, EyeOff, ClipboardList, CheckCircle2, HelpCircle } from 'lucide-react';

export const AssessmentView: React.FC = () => {
  const [formData, setFormData] = useState<AssessmentFormData>({
    age: '',
    subject: '',
    unit: '',
    multipleChoiceCount: 3,
    openEndedCount: 2
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.subject || !formData.unit) return;
    
    if (formData.multipleChoiceCount === 0 && formData.openEndedCount === 0) {
        setError("Debes solicitar al menos una pregunta.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowAnswers(false);

    try {
      const data = await generateAssessment(formData);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Error al generar la evaluación.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const downloadDoc = () => {
    if (!result) return;

    const questionsHtml = result.questions.map((q, i) => {
      let qContent = `<p style="margin-bottom: 5px;"><strong>${i + 1}. ${q.question}</strong> <span style="font-size: 9pt; color: #666;">[${q.conceptFocus.toUpperCase()}]</span></p>`;
      
      if (q.type === 'multiple-choice' && q.options) {
        qContent += `<ul style="list-style-type: none; margin-left: 20px;">${q.options.map((opt, idx) => `<li>${String.fromCharCode(97 + idx)}) ${opt}</li>`).join('')}</ul>`;
      } else {
        qContent += `<p style="margin-top: 10px;">__________________________________________________________________________________<br><br>__________________________________________________________________________________<br><br>__________________________________________________________________________________</p>`;
      }
      return `<div class="question">${qContent}</div>`;
    }).join('<br>');

    const answersHtml = result.questions.map((q, i) => {
      const answer = q.type === 'multiple-choice' && q.options && q.correctOptionIndex !== undefined
        ? `<strong>Opción Correcta:</strong> ${String.fromCharCode(97 + q.correctOptionIndex)}) <br><em>Explicación: ${q.answerKeyOrRubric}</em>`
        : `<strong>Criterios de Evaluación:</strong><br><em>${q.answerKeyOrRubric}</em>`;

      return `<div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;"><p><strong>Pregunta ${i + 1} (${q.type === 'multiple-choice' ? 'Selección Múltiple' : 'Abierta'})</strong></p>${answer}</div>`;
    }).join('');

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${result.title}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.5; color: #000; }
          h1 { color: #2E5984; font-size: 18pt; border-bottom: 2px solid #2E5984; margin-bottom: 10px; }
          h2 { background-color: #f0f8ff; padding: 5px; font-size: 14pt; margin-top: 20px; border-left: 4px solid #2E5984; }
          .question { margin-bottom: 20px; page-break-inside: avoid; }
        </style>
      </head>
      <body>
        <h1>${result.title}</h1>
        <p><strong>Asignatura:</strong> ${formData.subject}</p>
        <p><strong>Unidad:</strong> ${formData.unit}</p>
        <p><strong>Edad/Nivel:</strong> ${formData.age}</p>
        <hr>
        <p><em>${result.instructions}</em></p>
        <br>
        
        <h2>Cuestionario</h2>
        ${questionsHtml}
        
        <br style="page-break-before: always;"> 
        
        <h2>Pauta de Corrección Docente</h2>
        <p><em>Esta sección es para uso exclusivo del profesor.</em></p>
        ${answersHtml}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Evaluacion_${formData.unit.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-indigo-300 mb-4">
          Generador de Evaluaciones Formativas
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Crea instrumentos de evaluación alineados con el pensamiento conceptual del IB y Erickson/Lanning. Define la cantidad exacta de preguntas por tipo.
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Edad de los Estudiantes</label>
              <input 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                placeholder="Ej: 14-15 años"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Asignatura</label>
              <input 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                placeholder="Ej: Biología"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Unidad o Tema Central</label>
            <input 
              name="unit" 
              value={formData.unit} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              placeholder="Ej: Genética y Herencia"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="space-y-2">
               <label className="block text-sm font-medium text-teal-300 flex items-center gap-2">
                 <ClipboardList className="w-4 h-4" /> 
                 Preguntas de Selección Múltiple
               </label>
               <input 
                 type="number"
                 min="0"
                 max="20"
                 name="multipleChoiceCount" 
                 value={formData.multipleChoiceCount} 
                 onChange={handleChange} 
                 className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none"
               />
            </div>
            <div className="space-y-2">
               <label className="block text-sm font-medium text-indigo-300 flex items-center gap-2">
                 <HelpCircle className="w-4 h-4" />
                 Preguntas Abiertas (Desarrollo)
               </label>
               <input 
                 type="number"
                 min="0"
                 max="10"
                 name="openEndedCount" 
                 value={formData.openEndedCount} 
                 onChange={handleChange} 
                 className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
               />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button 
              type="submit" 
              isLoading={isLoading} 
              icon={<Sparkles className="w-5 h-5" />}
              className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500"
            >
              Generar Evaluación
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 text-red-300 rounded-lg border border-red-800 text-center animate-pulse">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 animate-fade-in">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{result.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{result.instructions}</p>
            </div>
            <Button onClick={downloadDoc} variant="secondary" icon={<FileDown className="w-4 h-4" />}>
              Descargar .doc
            </Button>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {result.questions.map((q, i) => (
              <div key={i} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start gap-4 mb-4">
                   <div className="flex gap-3">
                     <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-sm">
                       {i + 1}
                     </span>
                     <div>
                       <h4 className="text-lg font-medium text-slate-200">{q.question}</h4>
                       <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border ${
                         q.conceptFocus === 'factual' 
                           ? 'bg-blue-900/20 text-blue-300 border-blue-800' 
                           : 'bg-purple-900/20 text-purple-300 border-purple-800'
                       }`}>
                         Enfoque: {q.conceptFocus === 'factual' ? 'Fáctico' : 'Conceptual'}
                       </span>
                     </div>
                   </div>
                </div>

                {q.type === 'multiple-choice' && q.options && (
                  <div className="ml-11 space-y-2 mb-4">
                    {q.options.map((opt, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border text-sm ${
                        showAnswers && idx === q.correctOptionIndex
                          ? 'bg-green-900/20 border-green-700 text-green-200' 
                          : 'bg-slate-900/50 border-slate-700 text-slate-400'
                      }`}>
                        <span className="font-semibold mr-2">{String.fromCharCode(97 + idx)})</span> {opt}
                        {showAnswers && idx === q.correctOptionIndex && <CheckCircle2 className="inline w-4 h-4 ml-2 text-green-400"/>}
                      </div>
                    ))}
                  </div>
                )}

                {q.type === 'open-ended' && (
                  <div className="ml-11 p-4 bg-slate-900/30 rounded-lg border-2 border-dashed border-slate-700 h-24 mb-4"></div>
                )}

                {showAnswers && (
                  <div className="ml-11 p-4 bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                    <p className="text-indigo-200 text-sm">
                      <strong>{q.type === 'multiple-choice' ? 'Explicación:' : 'Rubrica / Criterios:'}</strong> {q.answerKeyOrRubric}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-center">
             <Button 
               variant="outline" 
               onClick={() => setShowAnswers(!showAnswers)}
               icon={showAnswers ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
             >
               {showAnswers ? 'Ocultar Respuestas' : 'Ver Pauta de Corrección'}
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};
