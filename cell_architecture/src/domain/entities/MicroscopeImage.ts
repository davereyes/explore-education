export type MicroscopeType = 'light' | 'stained' | 'electron';

export interface MicroscopeImage {
  type: MicroscopeType;
  label: string;
  labelEn: string;
  /** Tailwind-like gradient string used as a placeholder until real images land. */
  swatch: string;
  credit?: string;
}
