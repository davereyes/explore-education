import './CaToggle.css';

interface CaToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  id?: string;
}

export default function CaToggle({ checked, onChange, label, id }: CaToggleProps) {
  return (
    <label className="ca-toggle" htmlFor={id}>
      {label && <span className="ca-toggle__label">{label}</span>}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={`ca-toggle__track ${checked ? 'ca-toggle__track--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="ca-toggle__thumb" />
      </button>
    </label>
  );
}
