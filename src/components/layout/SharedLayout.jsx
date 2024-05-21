import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { AppBar } from '../appBar/AppBar.jsx';

export const Layout = () => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 8px' }}>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
