import type { Organelle } from './Organelle';
import type { MicroscopeImage } from './MicroscopeImage';

export type CellClassification = 'eukaryotic' | 'prokaryotic';

export interface Occurrence {
  speciesEs: string[];
  speciesEn: string[];
  imageEmoji: string;
}

export interface Cell {
  id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  classification: CellClassification;
  modelPath?: string;
  enabled: boolean;
  organelles: Organelle[];
  microscope: MicroscopeImage[];
  occurrence: Occurrence;
  thumbnailEmoji: string;
}
