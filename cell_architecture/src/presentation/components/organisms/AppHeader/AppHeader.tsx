import { useLanguage } from '@/presentation/context/LanguageContext';
import './AppHeader.css';

const NAV_ITEMS = [
  { icon: '▦', es: 'Galería', en: 'Gallery', active: true },
  { icon: '❘❘', es: 'Biblioteca', en: 'Library', active: false },
  { icon: '⌹', es: 'Cuadernos', en: 'Notebooks', active: false },
  { icon: '⚙', es: 'Ajustes', en: 'Settings', active: false },
];

export default function AppHeader() {
  const { t, language, toggle } = useLanguage();

  return (
    <header className="ca-header">
      <nav className="ca-header__nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.en}
            className={`ca-header__nav-item ${item.active ? 'ca-header__nav-item--active' : ''}`}
            disabled={!item.active}
            title={!item.active ? t('Próximamente', 'Coming soon') : undefined}
          >
            <span className="ca-header__nav-icon">{item.icon}</span>
            <span className="ca-header__nav-label">{t(item.es, item.en)}</span>
          </button>
        ))}
        <button
          className="ca-header__lang"
          onClick={toggle}
          title={t('Cambiar idioma', 'Switch language')}
        >
          {language.toUpperCase()}
        </button>
        <div className="ca-header__avatar" aria-hidden="true">
          <span>🦠</span>
        </div>
      </nav>
    </header>
  );
}
