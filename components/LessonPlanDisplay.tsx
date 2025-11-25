import React from 'react';
import { LessonPlan } from '../types';
import { Lightbulb, Target, HelpCircle, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface Props {
  plan: LessonPlan;
  duration: string;
}

export const LessonPlanDisplay: React.FC<Props> = ({ plan, duration }) => {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 mt-8 animate-fade-in ring-1 ring-white/5">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 md:p-8 border-b border-indigo-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <h2 className="text-3xl font-bold text-white mb-2">{plan.title}</h2>
            <div className="flex items-center gap-1 bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm whitespace-nowrap self-start">
              <Clock className="w-4 h-4" />
              {duration} min
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-white/10 text-white rounded-full backdrop-blur-sm border border-white/10 text-sm font-medium">
              Macro-Concepto: <span className="text-indigo-300">{plan.macroConcept}</span>
            </span>
            {plan.microConcepts.map((mc, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full border border-slate-700 text-sm">
                {mc}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        {/* Generalization */}
        <section className="bg-amber-950/30 rounded-xl p-6 border-l-4 border-amber-500/50">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-900/30 rounded-lg text-amber-500">
               <Lightbulb className="w-6 h-6 flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-200 mb-2">Entendimiento Perdurable (Generalización)</h3>
              <p className="text-amber-100/80 text-lg italic leading-relaxed">"{plan.generalization}"</p>
            </div>
          </div>
        </section>

        {/* Guiding Questions */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-900/30 rounded-lg text-indigo-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-200">Preguntas Guía</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <h4 className="font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">Fácticas</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {plan.guidingQuestions.factual.map((q, i) => (
                   <li key={i} className="flex gap-2">
                     <span className="text-slate-600">•</span>
                     {q}
                   </li>
                ))}
              </ul>
            </div>
            <div className="bg-indigo-950/20 p-5 rounded-xl border border-indigo-900/50 hover:border-indigo-800/50 transition-colors">
              <h4 className="font-semibold text-indigo-300 mb-3 border-b border-indigo-900/50 pb-2">Conceptuales</h4>
              <ul className="space-y-2 text-indigo-200/70 text-sm">
                {plan.guidingQuestions.conceptual.map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-indigo-500/50">•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-teal-950/20 p-5 rounded-xl border border-teal-900/50 hover:border-teal-800/50 transition-colors">
              <h4 className="font-semibold text-teal-300 mb-3 border-b border-teal-900/50 pb-2">Debatibles</h4>
              <ul className="space-y-2 text-teal-200/70 text-sm">
                {plan.guidingQuestions.debatable.map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal-500/50">•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-teal-900/30 rounded-lg text-teal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-200">Secuencia de Aprendizaje</h3>
          </div>
          <div className="space-y-4 relative">
             {/* Vertical line connection visual */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-800 hidden md:block"></div>
            
            {plan.activities.map((act, i) => (
              <div key={i} className="relative flex flex-col md:flex-row gap-5 p-5 rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800 transition-colors group z-10">
                <div className="md:w-36 flex-shrink-0 flex flex-col gap-2">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-950/50 border border-teal-900 rounded-full text-center">
                    {act.phase}
                  </span>
                  <span className="flex items-center justify-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3 h-3" />
                    {act.time}
                  </span>
                </div>
                <div className="flex-grow">
                  <h5 className="font-semibold text-slate-200 mb-1 group-hover:text-teal-300 transition-colors">{act.activity}</h5>
                  <p className="text-slate-400 text-sm">{act.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assessment */}
        <section className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-900/20 rounded-lg text-green-400">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Evaluación Sugerida</h3>
              <p className="text-slate-400 leading-relaxed">{plan.assessmentIdea}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};