import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import * as React from 'react';
import { useEffect } from 'react';

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});


function RootComponent() {
  useEffect(() => {
    document.title = 'SIMS PPOB-ADHYASTA NAUFAL FAADHILAH';
  }, []);
  
  return (
    <React.Fragment>
      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
}
