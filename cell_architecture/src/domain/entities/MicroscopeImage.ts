export type MicroscopeType = 'light' | 'stained' | 'electron';

export interface MicroscopeImage {
  type: MicroscopeType;
  label: string;
  labelEn: string;
  /** Remote image URL (typically a Wikimedia Commons thumb). */
  imageUrl?: string;
  /** Fallback gradient used when no image is available yet. */
  swatch?: string;
  credit?: {
    author: string;
    source: string;
    license: string;
  };
}
