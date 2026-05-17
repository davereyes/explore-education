import { useEffect, useRef, type FC } from 'react';
import { PLANET_ORDER, PLANETS } from '../../data/planets';
import { useExplorerStore } from '../../store/useExplorerStore';

/**
 * Tira horizontal de los 8 planetas a ESCALA REAL proporcional, usando los
 * thumbnails PNG. El Sol queda fuera por su tamaño desproporcionado.
 *
 * UX: scroll horizontal nativo (con scrollbar siempre visible al fondo).
 * El zoom global (cameraZoom) escala el factor px/km, y al cambiar de zoom
 * volvemos al inicio (Mercurio).
 */

// 1 px = 600 km. Con esto Júpiter ~238px y Mercurio ~8px — los pequeños se
// ven como puntos pero el column (min-width 140) garantiza que tengan su
// label visible. El conjunto siempre supera el ancho visible → scroll real.
const BASE_KM_PER_PX = 600;

/** Expuesto para que el Hero pueda mostrar el "1 px = X km" sobre el strip. */
export const getStripKmPerPx = (zoom: number): number => BASE_KM_PER_PX / zoom;

export const ScaleStrip: FC = () => {
  const zoom = useExplorerStore((s) => s.cameraZoom);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const kmPerPx = BASE_KM_PER_PX / zoom;

  // Al cambiar el zoom (incluido el mount inicial) volver al inicio para que
  // siempre se vean los primeros planetas antes de scrollear hacia los últimos.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [zoom]);

  return (
    <div className="cosmos-strip">
      <div ref={scrollRef} className="cosmos-strip__scroll">
        <div className="cosmos-strip__inner">
          <div className="cosmos-strip__baseline" />
          {PLANET_ORDER.map((id) => {
            const planet = PLANETS[id];
            const sizePx = Math.max(6, planet.diameterKm / kmPerPx);
            const isSquare = planet.thumbnailShape === 'square';
            const containerW = isSquare ? sizePx * 2.3 : sizePx;
            return (
              <div key={id} className="cosmos-strip__item">
                <div
                  className={`cosmos-strip__planet${isSquare ? ' cosmos-strip__planet--square' : ''}`}
                  style={{ width: containerW, height: sizePx }}
                >
                  {planet.thumbnailUrl ? (
                    <img src={planet.thumbnailUrl} alt={planet.name} draggable={false} />
                  ) : (
                    <div
                      className="cosmos-strip__planet-fallback"
                      style={{
                        background: `radial-gradient(circle at 30% 28%, ${planet.color}, ${planet.colorAccent})`,
                      }}
                    />
                  )}
                </div>
                <div className="cosmos-strip__meta">
                  <div className="cosmos-strip__name">{planet.name}</div>
                  <div className="cosmos-strip__dia cosmos-mono">
                    {planet.diameterKm.toLocaleString('es-MX')} km
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
