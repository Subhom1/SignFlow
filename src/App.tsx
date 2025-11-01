import { lazy, Suspense } from 'react';
import './App.css';
import FallBackLoader from '@/components/common/FallBackLoader';
const Layout = lazy(() => import('./components/layout'));

function App() {
  return (
    <Suspense fallback={<FallBackLoader />}>
      <Layout />
    </Suspense>
  );
}

export default App;
