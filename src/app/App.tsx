import { Suspense } from 'react';
import { pageFor } from './App';
import NotFound from '../pages/NotFound/NotFound.tsx';
import './App.css';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const Page = pageFor(path);
  if (!Page) return <NotFound />;
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
