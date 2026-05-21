import { useState } from 'react';
import './ControlsHint.css';

const STORAGE_KEY = 'ca:hint-dismissed';

export default function ControlsHint({ tip }: { tip: string }) {
  const [dismissed, setDismissed] = useState(
    () => typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === '1',
  );
  if (dismissed) return null;
  return (
    <div className="ca-hint" role="note">
      <p className="ca-hint__text">{tip}</p>
      <button
        type="button"
        className="ca-hint__close"
        aria-label="Dismiss"
        onClick={() => {
          window.localStorage.setItem(STORAGE_KEY, '1');
          setDismissed(true);
        }}
      >
        ×
      </button>
    </div>
  );
}
