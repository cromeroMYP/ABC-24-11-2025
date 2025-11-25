
import React, { useState } from 'react';
import { EducationSection } from './components/EducationSection';
import { PlannerView } from './components/PlannerView';
import { TechniquesSection } from './components/TechniquesSection';
import { AssessmentView } from './components/AssessmentView';
import { TeacherQuizView } from './components/TeacherQuizView';
import { BookOpen, PenTool, Layout, ClipboardCheck, GraduationCap } from 'lucide-react';

type View = 'learn' | 'create' | 'techniques' | 'assessment' | 'quiz';

function App() {
  const [currentView, setCurrentView] = useState<View>('learn');

  const navItems = [
    { id: 'learn', label: 'Aprender', icon: BookOpen },
    { id: 'techniques', label: 'Técnicas', icon: Layout },
    { id: 'assessment', label: 'Evaluación', icon: ClipboardCheck },
    { id: 'quiz', label: 'Práctica Docente', icon: GraduationCap },
    { id: 'create', label: 'Diseñador IA', icon: PenTool },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-20 items-center py-3 sm:py-0 gap-4 sm:gap-0">
            
            {/* Brand / Logo Section */}
            <div className="flex items-center gap-4 self-start sm:self-auto cursor-pointer group" onClick={() => setCurrentView('learn')}>
              <div className="bg-white p-1 rounded-lg shadow-lg shadow-white/5 transform group-hover:scale-105 transition-transform h-12 w-auto flex-shrink-0 overflow-hidden">
                <img 
                  src="https://dschile.cl/wp-content/uploads/2021/04/LOGOS-_5-sur-e1634306416963.jpg" 
                  alt="Logo Instituto Alemán de Puerto Montt" 
                  className="h-full w-auto object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base text-slate-100 leading-tight">
                  Instituto Alemán de Puerto Montt
                </span>
                <span className="text-[10px] sm:text-xs text-indigo-400 font-medium tracking-wide">
                  Programa de los Años Intermedios (PAI)
                </span>
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className="flex space-x-1 sm:space-x-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto mt-2 sm:mt-0">
              {navItems.map((item) => {
                 const Icon = item.icon;
                 const isActive = currentView === item.id;
                 return (
                   <button
                     key={item.id}
                     onClick={() => setCurrentView(item.id as View)}
                     className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                       isActive 
                         ? 'bg-slate-800 text-indigo-400 shadow-sm border border-slate-700' 
                         : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                     }`}
                   >
                     <Icon className="w-4 h-4" />
                     {item.label}
                   </button>
                 );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {currentView === 'learn' && (
            <div className="animate-fade-in space-y-12">
               <EducationSection />
               <div className="mt-16 text-center pb-8">
                 <button 
                   onClick={() => setCurrentView('create')}
                   className="group inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                 >
                   ¿Listo para aplicar lo aprendido? 
                   <span className="ml-2 group-hover:translate-x-1 transition-transform">Ir al Diseñador &rarr;</span>
                 </button>
               </div>
            </div>
          )}
          
          {currentView === 'techniques' && (
             <TechniquesSection />
          )}

          {currentView === 'assessment' && (
             <AssessmentView />
          )}

          {currentView === 'quiz' && (
             <TeacherQuizView />
          )}

          {currentView === 'create' && (
            <div className="animate-fade-in">
              <PlannerView />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Instituto Alemán de Puerto Montt.</p>
          <p className="mt-2">Herramienta educativa experimental basada en los trabajos de L. Erickson & L. Lanning y el IB.</p>
          <p className="mt-4 text-xs font-medium text-slate-600 uppercase tracking-widest">
            Developed by: Cristian Romero R. MYP Coordinator.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
