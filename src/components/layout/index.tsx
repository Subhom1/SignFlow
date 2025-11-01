import { lazy, Suspense } from 'react';
import Header from '@/components/layout/Header';
import FallBackLoader from '@/components/common/FallBackLoader';

const MainContent = lazy(() => import('@/components/layout/MainContent'));

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="SignFlow" />
      <Suspense fallback={<FallBackLoader />}>
        <MainContent />
      </Suspense>
    </div>
  );
}
