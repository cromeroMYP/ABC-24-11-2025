
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, PlannerFormData, AssessmentFormData, AssessmentResult, TeacherQuizResponse, TeacherQuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (data: PlannerFormData): Promise<LessonPlan> => {
  const prompt = `
    Actúa como un consultor pedagógico experto en Aprendizaje Basado en Conceptos (modelo de Lynn Erickson y Lois Lanning).
    Diseña una estructura de clase para una sesión de ${data.duration} minutos para estudiantes de ${data.age} años en la asignatura de ${data.subject} sobre el tema "${data.unit}".
    
    El objetivo es mover el pensamiento de lo factual a lo conceptual.
    
    Debes generar:
    1. Un Título Creativo.
    2. Un Macro-concepto (Concepto amplio, ej: Sistema, Cambio, Poder).
    3. Micro-conceptos (Conceptos disciplinares específicos).
    4. Una Generalización (La "Idea Grande" o Entendimiento Perdurable que conecta los conceptos).
    5. Preguntas Guía divididas en Fácticas, Conceptuales y Debatibles.
    6. Una secuencia de actividades basada en el ciclo de indagación (Enganchar, Enfocar, Investigar, Generalizar, Transferir), asegurando que la suma de los tiempos se ajuste a ${data.duration} minutos.
    7. Una idea de evaluación auténtica.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          macroConcept: { type: Type.STRING },
          microConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          generalization: { type: Type.STRING, description: "Declaración de generalización que conecta dos o más conceptos." },
          guidingQuestions: {
            type: Type.OBJECT,
            properties: {
              factual: { type: Type.ARRAY, items: { type: Type.STRING } },
              conceptual: { type: Type.ARRAY, items: { type: Type.STRING } },
              debatable: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["factual", "conceptual", "debatable"]
          },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING, description: "Ej: Enganche, Investigación, etc." },
                activity: { type: Type.STRING },
                purpose: { type: Type.STRING },
                time: { type: Type.STRING, description: "Duración estimada, ej: '10 min'" }
              },
              required: ["phase", "activity", "purpose", "time"]
            }
          },
          assessmentIdea: { type: Type.STRING }
        },
        required: ["title", "macroConcept", "microConcepts", "generalization", "guidingQuestions", "activities", "assessmentIdea"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se generó respuesta de la IA");

  try {
    return JSON.parse(text) as LessonPlan;
  } catch (e) {
    console.error("Error parsing JSON", e);
    throw new Error("Error al procesar el plan de clase generado.");
  }
};

export const generateAssessment = async (data: AssessmentFormData): Promise<AssessmentResult> => {
  const prompt = `
    Crea una Evaluación Formativa rigurosa basada en el Aprendizaje Basado en Conceptos (Erickson/Lanning/IB).
    
    CONTEXTO:
    - Estudiantes: ${data.age}
    - Asignatura: ${data.subject}
    - Unidad/Tema: ${data.unit}

    ESTRUCTURA DE LA EVALUACIÓN:
    Debes generar exactamente:
    - ${data.multipleChoiceCount} preguntas de Selección Múltiple (con 4 alternativas).
    - ${data.openEndedCount} preguntas Abiertas (Desarrollo breve o extenso).
    
    OBJETIVO PEDAGÓGICO:
    Evaluar la comprensión profunda y la transferencia, no solo la memoria.
    - Las preguntas deben requerir pensar, conectar conceptos y aplicar conocimiento, no solo recordar datos.
    - Para las preguntas de selección múltiple, los distractores deben ser plausibles.
    - Etiqueta cada pregunta según si evalúa principalmente conocimiento Fáctico (Hechos) o Comprensión Conceptual (Relaciones/Principios).
    - Provee una pauta de corrección clara o rúbrica resumida.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          instructions: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                type: { type: Type.STRING, enum: ['multiple-choice', 'open-ended'] },
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "Lista de opciones a, b, c, d. Requerido solo si type es multiple-choice" 
                },
                correctOptionIndex: { type: Type.INTEGER, description: "Index 0-3 del array options, solo si es multiple-choice" },
                answerKeyOrRubric: { type: Type.STRING, description: "Explicación de la respuesta correcta o criterios de evaluación para preguntas abiertas" },
                conceptFocus: { type: Type.STRING, enum: ['factual', 'conceptual'] }
              },
              required: ["id", "type", "question", "answerKeyOrRubric", "conceptFocus"]
            }
          }
        },
        required: ["title", "instructions", "questions"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se generó respuesta de la IA");

  try {
    return JSON.parse(text) as AssessmentResult;
  } catch (e) {
    console.error("Error parsing JSON", e);
    throw new Error("Error al procesar la evaluación generada.");
  }
};

export const generateTeacherQuiz = async (questionCount: number): Promise<TeacherQuizQuestion[]> => {
  const prompt = `
    Genera un cuestionario de opción múltiple con ${questionCount} preguntas diseñado para evaluar y entrenar a PROFESORES en el "Aprendizaje Basado en Conceptos" (Concept-Based Curriculum and Instruction) según Lynn Erickson, Lois Lanning y el IB PAI.
    
    Las preguntas deben ser desafiantes y variadas entre:
    1. Definiciones Clave: (Ej: Sinergia Intelectual, Macro vs Micro conceptos, Generalizaciones vs Datos).
    2. Escenarios de Aula: (Ej: "Un estudiante responde con un dato específico, ¿cuál es la mejor intervención conceptual del docente?").
    3. Diseño Curricular: (Ej: Cómo redactar una generalización fuerte).

    Para cada pregunta:
    - Provee 4 opciones.
    - Indica la correcta.
    - Provee una retroalimentación pedagógica detallada (Feedback) explicando por qué es la correcta basándose en la teoría.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                category: { type: Type.STRING, description: "Categoría de la pregunta ej: Escenario, Teoría" },
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "4 opciones de respuesta"
                },
                correctOptionIndex: { type: Type.INTEGER, description: "0-3 index" },
                explanation: { type: Type.STRING, description: "Explicación pedagógica detallada" }
              },
              required: ["id", "question", "options", "correctOptionIndex", "explanation", "category"]
            }
          }
        },
        required: ["questions"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se generó respuesta de la IA");

  try {
    const data = JSON.parse(text) as TeacherQuizResponse;
    return data.questions;
  } catch (e) {
    console.error("Error parsing JSON", e);
    throw new Error("Error al procesar el cuestionario docente.");
  }
};
