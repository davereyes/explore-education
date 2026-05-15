import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  backTo?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ eyebrow, title, subtitle, backTo = '/' }) => {
  const navigate = useNavigate();
  return (
    <header className="cosmos-page-header">
      <Button variant="ghost" icon="←" onClick={() => navigate(backTo)}>
        Volver
      </Button>
      <div className="cosmos-page-header__main">
        {eyebrow && <div className="cosmos-page-header__eyebrow cosmos-mono">{eyebrow}</div>}
        <h1 className="cosmos-page-header__title">{title}</h1>
        {subtitle && <p className="cosmos-page-header__subtitle">{subtitle}</p>}
      </div>
    </header>
  );
};
