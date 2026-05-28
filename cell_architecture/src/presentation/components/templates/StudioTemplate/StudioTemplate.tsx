import type { ReactNode } from 'react';
import AppHeader from '@/presentation/components/organisms/AppHeader/AppHeader';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import './StudioTemplate.css';

interface StudioTemplateProps {
  sidebar: ReactNode;
  viewer: ReactNode;
  details: ReactNode;
}

export default function StudioTemplate({ sidebar, viewer, details }: StudioTemplateProps) {
  const collapsed = useStudioStore((s) => s.sidebarCollapsed);
  return (
    <div className={`ca-studio ${collapsed ? 'ca-studio--sb-collapsed' : ''}`}>
      <AppHeader />
      <main className="ca-studio__grid">
        <aside className="ca-studio__col ca-studio__col--sidebar">{sidebar}</aside>
        <section className="ca-studio__col ca-studio__col--main">
          <div className="ca-studio__viewer">{viewer}</div>
        </section>
        <aside className="ca-studio__col ca-studio__col--details">{details}</aside>
      </main>
    </div>
  );
}
