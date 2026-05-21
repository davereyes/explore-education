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
}
