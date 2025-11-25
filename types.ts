
export interface GuidingQuestions {
  factual: string[];
  conceptual: string[];
  debatable: string[];
}

export interface LearningActivity {
  phase: string;
  activity: string;
  purpose: string;
  time: string;
}

export interface LessonPlan {
  title: string;
  macroConcept: string;
  microConcepts: string[];
  generalization: string;
  guidingQuestions: GuidingQuestions;
  activities: LearningActivity[];
  assessmentIdea: string;
}

export interface PlannerFormData {
  age: string;
  subject: string;
  unit: string;
  duration: string;
}

// New interfaces for Assessment
export interface AssessmentQuestion {
  id: number;
  type: 'multiple-choice' | 'open-ended';
  question: string;
  options?: string[]; // Only for multiple-choice
  correctOptionIndex?: number; // Only for multiple-choice
  answerKeyOrRubric: string; // Explanation or what to look for
  conceptFocus: 'factual' | 'conceptual'; // To tag if it tests facts or understanding
}

export interface AssessmentResult {
  title: string;
  instructions: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentFormData {
  age: string;
  subject: string;
  unit: string;
  multipleChoiceCount: number;
  openEndedCount: number;
}

// New interfaces for Teacher Quiz
export interface TeacherQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  category: string;
}

export interface TeacherQuizResponse {
  questions: TeacherQuizQuestion[];
}
