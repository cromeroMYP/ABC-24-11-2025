
import React, { useState } from 'react';
import { generateTeacherQuiz } from '../services/geminiService';
import { TeacherQuizQuestion } from '../types';
import { Button } from './Button';
import { Sparkles, Brain, CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';

export const TeacherQuizView: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'quiz' | 'results'>('setup');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState<TeacherQuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const qs = await generateTeacherQuiz(questionCount);
      setQuestions(qs);
      setStep('quiz');
      setCurrentQIndex(0);
      setScore(0);
      resetQuestionState();
    } catch (err: any) {
      setError(err.message || "Error al generar las preguntas");
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQIndex].correctOptionIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      setStep('results');
    }
  };

  const restart = () => {
    setStep('setup');
    setQuestions([]);
    setScore(0);
  };

  // Setup View
  if (step === 'setup') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-6 ring-1 ring-indigo-500/30">
            <Brain className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-teal-200 mb-4">
            Entrenamiento Docente
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Pon a prueba y profundiza tus conocimientos sobre el Aprendizaje Basado en Conceptos. 
            Recibirás preguntas basadas en escenarios reales y teoría fundamental.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-slate-800 text-center">
          <label className="block text-slate-300 font-medium mb-4">¿Cuántas preguntas deseas responder?</label>
          <div className="flex justify-center items-center gap-4 mb-8">
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={questionCount} 
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="w-full max-w-xs h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-2xl font-bold text-white w-12">{questionCount}</span>
          </div>

          <Button 
            onClick={startQuiz} 
            isLoading={isLoading} 
            icon={<Sparkles className="w-5 h-5" />}
            className="w-full sm:w-auto px-10 py-3 text-lg"
          >
            Comenzar Entrenamiento
          </Button>

          {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>
      </div>
    );
  }

  // Results View
  if (step === 'results') {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="bg-slate-900/80 p-10 rounded-3xl border border-slate-800 shadow-2xl">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">¡Entrenamiento Completado!</h2>
          <p className="text-slate-400 mb-8">Has completado tu sesión de práctica conceptual.</p>
          
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300 mb-8">
            {score} / {questions.length}
          </div>
          
          <p className="text-lg text-slate-300 mb-10">
            {score === questions.length ? "¡Excelente! Dominas el paradigma conceptual." : 
             score > questions.length / 2 ? "Buen trabajo. Sigue conectando los puntos." : 
             "Sigue practicando para mover tu pensamiento de lo factual a lo conceptual."}
          </p>

          <Button onClick={restart} variant="outline" icon={<RefreshCw className="w-5 h-5"/>}>
            Intentar de Nuevo
          </Button>
        </div>
      </div>
    );
  }

  // Quiz View
  const currentQ = questions[currentQIndex];
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6 px-2">
        <span className="text-slate-500 text-sm font-medium tracking-widest uppercase">
          Pregunta {currentQIndex + 1} de {questions.length}
        </span>
        <span className="text-indigo-400 text-xs font-bold px-2 py-1 bg-indigo-900/30 rounded border border-indigo-500/30">
          {currentQ.category}
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-8 leading-snug">
          {currentQ.question}
        </h3>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative ";
            
            if (isAnswered) {
              if (idx === currentQ.correctOptionIndex) {
                btnClass += "bg-green-900/20 border-green-500 text-green-100";
              } else if (idx === selectedOption) {
                btnClass += "bg-red-900/20 border-red-500 text-red-100";
              } else {
                btnClass += "bg-slate-800/50 border-slate-700 text-slate-500 opacity-50";
              }
            } else {
              btnClass += "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500 hover:bg-slate-800/80";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-950/50 flex items-center justify-center text-sm font-bold border border-white/10">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                  {isAnswered && idx === currentQ.correctOptionIndex && (
                    <CheckCircle className="w-5 h-5 text-green-500 absolute right-4" />
                  )}
                   {isAnswered && idx === selectedOption && idx !== currentQ.correctOptionIndex && (
                    <XCircle className="w-5 h-5 text-red-500 absolute right-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 pt-6 border-t border-slate-800 animate-fade-in">
            <div className={`p-4 rounded-xl mb-6 ${
              selectedOption === currentQ.correctOptionIndex 
              ? 'bg-green-900/10 border border-green-500/20' 
              : 'bg-indigo-900/10 border border-indigo-500/20'
            }`}>
              <h4 className="font-bold mb-2 flex items-center gap-2">
                {selectedOption === currentQ.correctOptionIndex 
                  ? <span className="text-green-400">¡Correcto!</span> 
                  : <span className="text-indigo-400">Feedback Pedagógico</span>}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={nextQuestion} icon={<Brain className="w-4 h-4"/>}>
                {currentQIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
