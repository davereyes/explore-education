import type { Organelle } from './Organelle';
import type { MicroscopeImage } from './MicroscopeImage';

export type CellClassification = 'eukaryotic' | 'prokaryotic';

export interface Occurrence {
  speciesEs: string[];
  speciesEn: string[];
  imageEmoji: string;
}

export interface ModelTransform {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

import type { QuizQuestion } from './Organelle';

export interface AmazingNumber {
  emoji: string;
  es: string;
  en: string;
}

export interface DiscoveryEvent {
  year: number;
  emoji: string;
  es: string;
  en: string;
}

export interface SpecializedCellType {
  emoji: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
}

export interface UniqueFeature {
  emoji: string;
  name: string;
  nameEn: string;
}

export interface Cell {
  id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  classification: CellClassification;
  modelPath?: string;
  modelTransform?: ModelTransform;
  modelCredit?: { author: string; source: string; license: string };
  enabled: boolean;
  organelles: Organelle[];
  microscope: MicroscopeImage[];
  occurrence: Occurrence;
  thumbnailEmoji: string;
  /** Cell-level "general" copy shown when no specific organelle is selected. */
  generalSummary: string;
  generalSummaryEn: string;
  generalFunFact?: string;
  generalFunFactEn?: string;

  // Enrichment fields (all optional, render-conditional)
  uniqueFeatures?: UniqueFeature[];
  amazingNumbers?: AmazingNumber[];
  discoveryTimeline?: DiscoveryEvent[];
  specializedCells?: SpecializedCellType[];
  tryAtHome?: string;
  tryAtHomeEn?: string;
  cellQuiz?: QuizQuestion;
}
