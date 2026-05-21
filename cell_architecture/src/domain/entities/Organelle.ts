export interface Organelle {
  id: string;
  meshName: string;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  colorVar: string;
  size: string;
  sizeEn: string;
  location: string;
  locationEn: string;
  visibleInLightMicroscope: 'yes' | 'barely' | 'no';
  notes: string;
  notesEn: string;
  funFact: string;
  funFactEn: string;
  /** Optional 1-question multiple-choice quiz for this organelle. */
  quiz?: QuizQuestion;
}

export interface QuizQuestion {
  prompt: string;
  promptEn: string;
  options: Array<{ es: string; en: string }>;
  correctIndex: number;
  explanation?: string;
  explanationEn?: string;
}
