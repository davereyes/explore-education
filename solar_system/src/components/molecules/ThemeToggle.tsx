import type { FC } from 'react';
import { useExplorerStore, type ThemeMode } from '../../store/useExplorerStore';

const OPTIONS: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Claro', icon: '☀️' },
  { value: 'dark', label: 'Oscuro', icon: '🌙' },
];

export const ThemeToggle: FC = () => {
  const theme = useExplorerStore((s) => s.theme);
  const setTheme = useExplorerStore((s) => s.setTheme);

  return (
    <section className="cosmos-theme-toggle">
      <div className="cosmos-theme-toggle__group" role="radiogroup" aria-label="Tema del fondo">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={theme === opt.value}
            onClick={() => setTheme(opt.value)}
            className={`cosmos-theme-toggle__btn${
              theme === opt.value ? ' cosmos-theme-toggle__btn--active' : ''
            }`}
          >
            <span className="cosmos-theme-toggle__icon" aria-hidden>
              {opt.icon}
            </span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
