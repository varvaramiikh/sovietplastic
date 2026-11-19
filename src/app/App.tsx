import { routePath, isStaticDemo } from '../runtime/urls';
import DemoNotice from '../components/DemoNotice/DemoNotice.tsx';
import { Suspense } from 'react';
import { pageFor } from './App';
import NotFound from '../pages/NotFound/NotFound.tsx';
import './App.css';

export default function App() {
  const path = routePath(window.location.pathname);
  const Page = pageFor(path);
  if (!Page) return <NotFound />;
  return (
    <Suspense fallback={null}>
      {isStaticDemo && <DemoNotice />}
      <Page />
    </Suspense>
  );
}
