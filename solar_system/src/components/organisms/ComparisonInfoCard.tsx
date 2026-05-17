import type { FC } from 'react';
import { PLANETS } from '../../data/planets';
import { useExplorerStore } from '../../store/useExplorerStore';
import type { Planet, PlanetId } from '../../types/planet';
import { compareRows, COMPARABLE_IDS, getPairMetaphor, getPlanetTip } from '../../utils/comparison';

interface Props {
  a: Planet;
  b: Planet;
}

/**
 * Card del panel derecho en modo Comparar:
 * - 2 selectores (cambiar A o B)
 * - Tabla comparativa de stats clave (diámetro, gravedad, día, año, lunas...)
 * - Tip kid-friendly por planeta + metáfora de pareja
 */
export const ComparisonInfoCard: FC<Props> = ({ a, b }) => {
  const setComparisonPair = useExplorerStore((s) => s.setComparisonPair);
  const rows = compareRows(a, b);
  const metaphor = getPairMetaphor(a.id, b.id);

  // Acción atómica: cambia el planeta A y mantiene a B + viewMode='compare'
  // en un solo paso (antes había un requestAnimationFrame workaround porque
  // setSelectedPlanet reseteaba viewMode a 'explore').
  const handleA = (id: PlanetId) => setComparisonPair(id, b.id);
  const handleB = (id: PlanetId) => setComparisonPair(a.id, id);

  return (
    <section className="cosmos-details__section">
      <header className="cosmos-details__header">
        <h2 className="cosmos-details__title">COMPARAR PLANETAS</h2>
      </header>

      <div className="cosmos-compareinfo__selectors">
        <PlanetSelect
          label="A"
          value={a.id}
          exclude={b.id}
          onChange={handleA}
          accent={a.titleColor ?? a.color}
        />
        <span className="cosmos-compareinfo__vs">vs</span>
        <PlanetSelect
          label="B"
          value={b.id}
          exclude={a.id}
          onChange={handleB}
          accent={b.titleColor ?? b.color}
        />
      </div>

      <div className="cosmos-compareinfo__table" role="table">
        <div className="cosmos-compareinfo__th" role="row" aria-hidden>
          <span />
          <span>{a.name}</span>
          <span>{b.name}</span>
        </div>
        {rows.map((row) => (
          <div key={row.label} className="cosmos-compareinfo__row" role="row">
            <span className="cosmos-compareinfo__label">
              <span aria-hidden>{row.icon}</span> {row.label}
            </span>
            <span className="cosmos-compareinfo__val cosmos-mono">{row.a}</span>
            <span className="cosmos-compareinfo__val cosmos-mono">{row.b}</span>
          </div>
        ))}
      </div>

      <div className="cosmos-compareinfo__tips">
        <Tip planet={a} />
        <Tip planet={b} />
      </div>

      <div className="cosmos-compareinfo__metaphor">
        <span className="cosmos-compareinfo__metaphor-emoji" aria-hidden>
          🧠
        </span>
        <p>{metaphor}</p>
      </div>
    </section>
  );
};

interface PlanetSelectProps {
  label: string;
  value: PlanetId;
  exclude: PlanetId;
  accent: string;
  onChange: (id: PlanetId) => void;
}

const PlanetSelect: FC<PlanetSelectProps> = ({ label, value, exclude, accent, onChange }) => (
  <label className="cosmos-compareinfo__select">
    <span className="cosmos-compareinfo__select-label">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as PlanetId)}
      style={{ color: accent }}
    >
      {COMPARABLE_IDS.filter((id) => id !== exclude).map((id) => (
        <option key={id} value={id}>
          {PLANETS[id].name}
        </option>
      ))}
    </select>
  </label>
);

const Tip: FC<{ planet: Planet }> = ({ planet }) => (
  <div className="cosmos-compareinfo__tip">
    <span
      className="cosmos-compareinfo__tip-dot"
      style={{ background: planet.titleColor ?? planet.color }}
      aria-hidden
    />
    <div className="cosmos-compareinfo__tip-body">
      <div className="cosmos-compareinfo__tip-name">{planet.name}</div>
      <p className="cosmos-compareinfo__tip-text">{getPlanetTip(planet)}</p>
    </div>
  </div>
);
