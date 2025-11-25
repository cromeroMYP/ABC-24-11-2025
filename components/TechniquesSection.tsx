import React from 'react';
import { Download, Grid, Search, Layers, LayoutTemplate, Share2, HelpCircle, Hexagon, Palette, Compass, Users } from 'lucide-react';
import { Button } from './Button';

interface Technique {
  title: string;
  description: string;
  icon: any;
  template: string;
}

// Function to handle the .doc download
const downloadTemplate = (title: string, contentHtml: string) => {
  const fullHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; }
        h1 { color: #2E5984; border-bottom: 2px solid #2E5984; padding-bottom: 10px; margin-bottom: 20px; }
        h2 { color: #1F4E79; margin-top: 20px; font-size: 16pt; }
        p { margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px; }
        td, th { border: 1px solid #000; padding: 12px; vertical-align: top; }
        th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
        .box { border: 1px solid #666; padding: 15px; margin: 15px 0; min-height: 80px; background-color: #fafafa; }
        .instructions { font-style: italic; color: #555; background-color: #eef; padding: 10px; border-radius: 5px; }
        .cut-line { border: 1px dashed #999; padding: 20px; margin: 10px; text-align: center; height: 100px; width: 30%; display: inline-block; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${contentHtml}
      <br><br>
      <p style="font-size: 9pt; color: #888; text-align: center; border-top: 1px solid #ddd; padding-top: 10px;">
        Recurso generado por Conceptos Clave App
      </p>
    </body>
    </html>
  `;
  
  const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Plantilla_${title.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const techniques: Technique[] = [
  {
    title: "Pensamiento Hexagonal",
    description: "Permite a los estudiantes conectar ideas de formas no lineales. Cada lado del hexágono representa una conexión potencial con otro concepto.",
    icon: Hexagon,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Recorta los hexágonos (o cuadros). Escribe un concepto, hecho, imagen o idea clave en cada uno. Luego, organízalos sobre una mesa de manera que cada lado que se toque tenga una conexión lógica. Explica por qué se tocan.
      </div>
      
      <h2>Términos para conectar:</h2>
      <p><em>(Escribe aquí la lista de conceptos o hechos que los estudiantes deben organizar)</em></p>
      <br>

      <h2>Fichas (Recortables)</h2>
      <table style="border: none;">
        <tr style="border: none;">
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 1<br><br>_____________</td>
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 2<br><br>_____________</td>
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 3<br><br>_____________</td>
        </tr>
        <tr style="border: none;">
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 4<br><br>_____________</td>
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 5<br><br>_____________</td>
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 6<br><br>_____________</td>
        </tr>
         <tr style="border: none;">
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 7<br><br>_____________</td>
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 8<br><br>_____________</td>
           <td width="33%" align="center" style="border: 1px dashed #333; height: 150px;">HEXÁGONO 9<br><br>_____________</td>
        </tr>
      </table>

      <div class="box">
        <strong>Reflexión sobre las conexiones:</strong><br>
        Elige un punto donde se toquen 3 hexágonos y explica la relación profunda entre ellos.<br><br><br>
      </div>
    `
  },
  {
    title: "Modelo Frayer",
    description: "Un organizador gráfico fundamental para definir conceptos con precisión. Ayuda a distinguir un concepto de lo que no es.",
    icon: Grid,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Escribe el concepto central en el medio. Completa cada cuadrante para profundizar tu comprensión.
      </div>
      <table style="height: 600px;">
        <tr>
          <td width="50%">
            <strong>DEFINICIÓN</strong><br>
            <em style="font-size:10pt">¿Qué es en tus propias palabras?</em>
            <br><br><br><br>
          </td>
          <td width="50%">
            <strong>CARACTERÍSTICAS</strong><br>
            <em style="font-size:10pt">¿Cuáles son sus atributos esenciales?</em>
            <br><br><br><br>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center" style="height: 80px; background-color: #e6f3ff; font-size: 18pt; font-weight: bold; vertical-align: middle;">
            CONCEPTO: __________________
          </td>
        </tr>
        <tr>
          <td width="50%">
            <strong>EJEMPLOS</strong><br>
            <em style="font-size:10pt">Casos concretos o ilustraciones.</em>
            <br><br><br><br>
          </td>
          <td width="50%">
            <strong>NO EJEMPLOS</strong><br>
            <em style="font-size:10pt">Lo que se parece pero no es.</em>
            <br><br><br><br>
          </td>
        </tr>
      </table>
    `
  },
  {
    title: "Color - Símbolo - Imagen (CSI)",
    description: "Rutina para capturar la esencia de un concepto de forma no verbal. Útil para sintetizar lecturas o discusiones complejas.",
    icon: Palette,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Piensa en el concepto estudiado. Elige un color, un símbolo y una imagen que representen la esencia de ese concepto.
      </div>
      <h2>Concepto: _______________________</h2>
      
      <table>
        <thead>
            <tr>
                <th width="33%">COLOR</th>
                <th width="33%">SÍMBOLO</th>
                <th width="33%">IMAGEN</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td height="200" align="center" valign="middle">
                    <em>(Colorea o pega una muestra aquí)</em>
                </td>
                <td height="200" align="center" valign="middle">
                     <em>(Dibuja un símbolo sencillo o metáfora visual)</em>
                </td>
                <td height="200" align="center" valign="middle">
                     <em>(Dibuja una escena o imagen compleja)</em>
                </td>
            </tr>
            <tr>
                <td valign="top">
                    <strong>¿Por qué este color?</strong><br><br><br>
                </td>
                <td valign="top">
                    <strong>¿Por qué este símbolo?</strong><br><br><br>
                </td>
                <td valign="top">
                    <strong>¿Por qué esta imagen?</strong><br><br><br>
                </td>
            </tr>
        </tbody>
      </table>
    `
  },
  {
    title: "Puntos de la Brújula",
    description: "Ayuda a explorar una idea o proposición desde cuatro direcciones: Necesidades, Entusiasmos, Preocupaciones y Sugerencias.",
    icon: Compass,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Analiza la propuesta o idea central desde los cuatro puntos cardinales.
      </div>
      <h2>Tema / Propuesta: _______________________</h2>

      <table border="1" cellpadding="10">
        <tr>
            <td width="50%" valign="top" style="height: 200px;">
                <strong style="font-size: 14pt;">N - Necesidades (Needs)</strong><br>
                <em>¿Qué más necesitamos saber o averiguar para avanzar?</em>
                <br><br>
            </td>
            <td width="50%" valign="top" style="height: 200px;">
                <strong style="font-size: 14pt;">E - Entusiasmo (Excitement)</strong><br>
                <em>¿Qué nos emociona de esta idea? ¿Cuál es el lado positivo?</em>
                <br><br>
            </td>
        </tr>
        <tr>
            <td width="50%" valign="top" style="height: 200px;">
                <strong style="font-size: 14pt;">O - Obstáculos/Preocupaciones (Worries)</strong><br>
                <em>¿Qué nos preocupa? ¿Cuál es el lado negativo o los riesgos?</em>
                <br><br>
            </td>
            <td width="50%" valign="top" style="height: 200px;">
                <strong style="font-size: 14pt;">S - Sugerencias (Stance/Steps)</strong><br>
                <em>¿Cuál es nuestra postura o próximos pasos?</em>
                <br><br>
            </td>
        </tr>
      </table>
    `
  },
  {
    title: "Círculo de Puntos de Vista",
    description: "Ideal para el concepto de Perspectiva. Ayuda a los estudiantes a ver un tema a través de los ojos de diferentes personajes o grupos.",
    icon: Users,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Identifica diferentes perspectivas sobre el tema. Elige una y explórala a fondo.
      </div>
      <h2>Tema: _______________________</h2>
      
      <div class="box">
        <strong>1. Estoy pensando en el tema desde el punto de vista de...</strong><br>
        <em>(Personaje, objeto, grupo, etc.)</em><br><br>
        _________________________________________________________
      </div>

      <div class="box">
        <strong>2. Desde este punto de vista, PUENSO que...</strong><br>
        <em>(Describe la opinión, creencia o pensamiento central)</em><br><br><br><br>
      </div>

      <div class="box">
        <strong>3. Una PREGUNTA que tengo desde este punto de vista es...</strong><br>
        <em>(¿Qué le inquieta o curiosidad a este personaje?)</em><br><br><br>
      </div>
      
      <hr>
      <p><strong>Otras perspectivas identificadas:</strong></p>
      <ul>
        <li>__________________________</li>
        <li>__________________________</li>
        <li>__________________________</li>
      </ul>
    `
  },
  {
    title: "Logro de Conceptos",
    description: "Estrategia inductiva. Los estudiantes deducen los atributos de un concepto comparando ejemplos positivos (SI) y negativos (NO).",
    icon: Search,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Analiza los ítems en la columna SI y compáralos con la columna NO. ¿Qué tienen en común todos los SI?
      </div>
      
      <table>
        <thead>
          <tr>
            <th width="50%">SI (Son ejemplos)</th>
            <th width="50%">NO (No son ejemplos)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td height="300">
              1.<br><br>2.<br><br>3.<br><br>4.<br><br>5.
            </td>
            <td height="300">
              1.<br><br>2.<br><br>3.<br><br>4.<br><br>5.
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="box">
        <strong>Hipótesis:</strong><br>
        ¿Cuáles crees que son las reglas o características obligatorias de este concepto?<br><br><br>
      </div>
      
      <div class="box">
        <strong>Nuestra Definición del Concepto:</strong><br><br><br>
      </div>
    `
  },
  {
    title: "3-2-1 Puente",
    description: "Rutina para conectar conocimientos previos con nuevos aprendizajes. Visualiza cómo cambia el pensamiento tras una lección.",
    icon: Layers,
    template: `
      <h2>Concepto: ____________________________</h2>
      
      <h3>PARTE 1: ANTES (Pensamiento Inicial)</h3>
      <table>
        <tr>
          <td><strong>3 PALABRAS</strong><br>Que asocias con el tema<br><br>1.<br>2.<br>3.</td>
          <td><strong>2 PREGUNTAS</strong><br>Que tienes ahora<br><br>1.<br>2.</td>
          <td><strong>1 METÁFORA</strong><br>Una imagen o comparación<br><br>1.</td>
        </tr>
      </table>
      
      <div style="padding: 20px; text-align: center; color: #888; border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; margin: 20px 0;">
        <em>--- REALIZAR LA EXPERIENCIA DE APRENDIZAJE AQUÍ ---</em>
      </div>
      
      <h3>PARTE 2: DESPUÉS (Nuevo Pensamiento)</h3>
      <table>
        <tr>
          <td><strong>3 PALABRAS</strong><br>Nuevas ideas<br><br>1.<br>2.<br>3.</td>
          <td><strong>2 PREGUNTAS</strong><br>Nuevas dudas<br><br>1.<br>2.</td>
          <td><strong>1 METÁFORA</strong><br>Nueva analogía<br><br>1.</td>
        </tr>
      </table>
      
      <h3>PARTE 3: EL PUENTE</h3>
      <div class="box">
        <strong>Reflexión:</strong> Describe cómo y por qué cambió tu pensamiento entre el antes y el después.<br><br><br>
      </div>
    `
  },
  {
    title: "Mapa de Relaciones",
    description: "Ayuda a visualizar conexiones entre múltiples conceptos. Es vital que los estudiantes etiqueten la naturaleza de la conexión.",
    icon: Share2,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Ubica los conceptos en los cuadros. Dibuja líneas entre ellos y escribe SOBRE la línea cómo se conectan (ej: "causa", "se opone a", "es parte de").
      </div>
      
      <div style="height: 500px; border: 1px dashed #999; padding: 20px;">
        <p align="center"><em>[Espacio para dibujar el mapa]</em></p>
        
        <table style="border: none; width: 80%; margin: 50px auto;">
          <tr style="border: none;">
             <td align="center" style="border: none;">
                <div style="border: 2px solid #333; padding: 10px; width: 120px;">Concepto A</div>
             </td>
             <td align="center" style="border: none;">
                ---------------------> <br> <em>(Escribe la conexión)</em>
             </td>
             <td align="center" style="border: none;">
                <div style="border: 2px solid #333; padding: 10px; width: 120px;">Concepto B</div>
             </td>
          </tr>
        </table>
        
        <br><br>
        
        <div class="box">
          <strong>Generalización:</strong><br>
          Escribe una oración completa que resuma la relación principal que encontraste en tu mapa.<br><br>
        </div>
      </div>
    `
  },
  {
    title: "Semáforo del Entendimiento",
    description: "Herramienta de autoevaluación rápida para que los estudiantes indiquen su nivel de comprensión de un concepto.",
    icon: HelpCircle,
    template: `
      <h2>Semáforo del Entendimiento</h2>
      <p><strong>Tema/Concepto:</strong> ___________________________________</p>
      
      <table style="text-align: left;">
        <tr>
          <td width="100" style="background-color: #ffcccc; text-align: center; font-weight: bold;">ROJO</td>
          <td>
            <strong>ALTO. Estoy confundido.</strong><br>
            Lo que no entiendo específicamente es:<br><br><br>
          </td>
        </tr>
        <tr>
          <td width="100" style="background-color: #ffffcc; text-align: center; font-weight: bold;">AMARILLO</td>
          <td>
            <strong>PRECAUCIÓN. Tengo algunas dudas.</strong><br>
            Creo que entiendo, pero tengo una pregunta sobre:<br><br><br>
          </td>
        </tr>
        <tr>
          <td width="100" style="background-color: #ccffcc; text-align: center; font-weight: bold;">VERDE</td>
          <td>
            <strong>SIGA. Lo entiendo bien.</strong><br>
            Podría explicárselo a un compañero de la siguiente manera:<br><br><br>
          </td>
        </tr>
      </table>
    `
  },
  {
    title: "Titulares (Headlines)",
    description: "Rutina para sintetizar. Pide a los estudiantes que capturen el corazón o la esencia del asunto que se está estudiando.",
    icon: LayoutTemplate,
    template: `
      <div class="instructions">
        <strong>Instrucciones:</strong> Si tuvieras que escribir un titular de periódico para este tema que capture el aspecto más importante, ¿qué diría?
      </div>
      
      <div style="border: 4px solid #333; padding: 30px; margin: 30px; text-align: center;">
        <p style="text-align: left; font-size: 10pt;">DIARIO EL PENSADOR - EDICIÓN ESPECIAL</p>
        <hr>
        <br>
        
        <h2>TU TITULAR AQUÍ:</h2>
        <div style="border-bottom: 2px solid #000; height: 50px; margin-bottom: 20px;"></div>
        
        <h3>Subtítulo (Opcional):</h3>
        <div style="border-bottom: 1px solid #000; height: 30px; width: 80%; margin: 0 auto 30px auto;"></div>
        
        <div style="border: 1px solid #ccc; height: 250px; width: 80%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <p style="color: #999;">(Dibuja una imagen o esquema que acompañe tu titular)</p>
        </div>
        
        <br>
      </div>
    `
  }
];

export const TechniquesSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <h2 className="relative text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-indigo-300 mb-6">
          Caja de Herramientas Conceptual
        </h2>
        <p className="relative text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Una colección de estrategias, rutinas y organizadores gráficos diseñados específicamente para mover el pensamiento de lo factual a lo conceptual. Descarga las plantillas y úsalas en tu próxima clase.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techniques.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div key={index} className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group">
              <div className="p-6 flex-grow space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-slate-800 rounded-lg text-teal-400 group-hover:bg-teal-950/30 group-hover:text-teal-300 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 border-t border-slate-800">
                <Button 
                  onClick={() => downloadTemplate(tech.title, tech.template)}
                  variant="outline"
                  className="w-full justify-center text-sm border-slate-700 hover:border-teal-500 hover:text-teal-400 group-hover:bg-slate-900"
                  icon={<Download className="w-4 h-4" />}
                >
                  Descargar Plantilla .doc
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div className="mt-12 p-6 bg-indigo-900/10 rounded-2xl border border-indigo-500/20 text-center">
        <p className="text-indigo-200/80 text-sm">
          <strong>Tip Pedagógico:</strong> No utilices estas herramientas solo como actividades de relleno. 
          Úsalas deliberadamente para ayudar a los estudiantes a procesar hechos y extraer generalizaciones.
        </p>
      </div>

    </div>
  );
};