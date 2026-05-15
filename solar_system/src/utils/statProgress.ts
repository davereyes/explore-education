import type { PlanetStat } from '../types/planet';

export type StatTone = 'teal' | 'coral' | 'muted';

export interface StatProgress {
  filled: number;
  total: number;
  tone: StatTone;
}

const TOTAL = 10;

/**
 * Heurística para mostrar una barra de progreso por stat.
 * No es estricta científicamente: solo busca visualizar la magnitud relativa
 * y resaltar valores extremos (coral) o despreciables (muted).
 */
export function computeStatProgress(stat: PlanetStat): StatProgress {
  const raw = stat.value;
  const num = Number(raw.replace(/[^\d.−\-]/g, '').replace('−', '-'));
  const label = stat.label.toLowerCase();

  const clamp = (n: number) => Math.max(0, Math.min(TOTAL, Math.round(n)));

  if (label.includes('gravedad')) {
    return {
      filled: clamp((num / 30) * TOTAL),
      total: TOTAL,
      tone: num > 15 ? 'coral' : 'teal',
    };
  }
  if (label.includes('atmósfera') || label.includes('composición')) {
    if (/traza|ninguna/i.test(raw)) return { filled: 0, total: TOTAL, tone: 'muted' };
    const pct = parseFloat(raw);
    if (!Number.isNaN(pct)) return { filled: clamp(pct / 10), total: TOTAL, tone: 'teal' };
    return { filled: 5, total: TOTAL, tone: 'teal' };
  }
  if (label.includes('temperatura') || label.includes('superficie')) {
    // Mappea |T| en una escala que tenga sentido visual: temperaturas terrestres
    // muestran 1-2 dashes, extremas (>100°C) saturan rápido y se vuelven coral.
    const abs = Math.abs(num);
    return {
      filled: clamp((abs / 300) * TOTAL),
      total: TOTAL,
      tone: abs > 100 ? 'coral' : 'teal',
    };
  }
  if (label.includes('día') || label.includes('rotación')) {
    return { filled: clamp((num / 250) * TOTAL), total: TOTAL, tone: 'teal' };
  }
  if (label.includes('año') || label.includes('edad')) {
    // Normalize to days for consistent magnitude across inner planets (días)
    // and outer planets (años).
    const isYears = /años?/i.test(raw);
    const days = isYears ? num * 365 : num;
    // log10(days+1)*2 → Mercury (88d)≈4, Earth (365)≈5, Neptune (60K d)≈10
    return { filled: clamp(Math.log10(days + 1) * 2), total: TOTAL, tone: 'teal' };
  }
  if (label.includes('distancia') || label.includes('tierra')) {
    // Log scale so Mercury (closest) shows ~4 and Neptune (farthest) ~9
    return {
      filled: clamp(Math.log10(num + 1) * 2.5),
      total: TOTAL,
      tone: 'muted',
    };
  }
  if (label.includes('lunas')) {
    if (num === 0) return { filled: 0, total: TOTAL, tone: 'muted' };
    // 1 luna = 1 dash, hasta 10+ lunas = 10 dashes.
    return { filled: clamp(num), total: TOTAL, tone: 'teal' };
  }
  if (label.includes('magnético')) {
    if (/muy d[ée]bil|inducido/i.test(raw)) return { filled: 1, total: TOTAL, tone: 'muted' };
    if (/d[ée]bil|inclinado/i.test(raw)) return { filled: 2, total: TOTAL, tone: 'muted' };
    if (/muy fuerte|enorme/i.test(raw)) return { filled: 10, total: TOTAL, tone: 'teal' };
    if (/fuerte/i.test(raw)) return { filled: 7, total: TOTAL, tone: 'teal' };
    return { filled: 5, total: TOTAL, tone: 'teal' };
  }
  if (label.includes('planetas')) {
    return { filled: clamp(num), total: TOTAL, tone: 'teal' };
  }
  return { filled: 5, total: TOTAL, tone: 'teal' };
}
