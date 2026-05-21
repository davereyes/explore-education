import './CaDot.css';

export default function CaDot({ colorVar, size = 10 }: { colorVar: string; size?: number }) {
  return (
    <span
      className="ca-dot"
      style={{
        width: size,
        height: size,
        backgroundColor: `var(${colorVar})`,
      }}
    />
  );
}
