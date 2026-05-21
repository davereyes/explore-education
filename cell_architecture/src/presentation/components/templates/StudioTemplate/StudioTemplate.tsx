import type { ReactNode } from 'react';
import AppHeader from '@/presentation/components/organisms/AppHeader/AppHeader';
import './StudioTemplate.css';

interface StudioTemplateProps {
  sidebar: ReactNode;
  viewer: ReactNode;
  details: ReactNode;
  bottomLeft: ReactNode;
  bottomCenter: ReactNode;
  bottomRight: ReactNode;
}

export default function StudioTemplate({
  sidebar,
  viewer,
  details,
  bottomLeft,
  bottomCenter,
  bottomRight,
}: StudioTemplateProps) {
  return (
    <div className="ca-studio">
      <AppHeader />
      <main className="ca-studio__grid">
        <aside className="ca-studio__col ca-studio__col--sidebar">{sidebar}</aside>
        <section className="ca-studio__col ca-studio__col--main">
          <div className="ca-studio__viewer">{viewer}</div>
          <div className="ca-studio__bottom">
            <div className="ca-studio__bottom-cell ca-studio__bottom-cell--wide">{bottomCenter}</div>
            <div className="ca-studio__bottom-cell">{bottomRight}</div>
          </div>
          <div className="ca-studio__bottom-left">{bottomLeft}</div>
        </section>
        <aside className="ca-studio__col ca-studio__col--details">{details}</aside>
      </main>
    </div>
  );
}
