import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRouteWithContext()({
  component: RootComponent,
  meta: {
    title: 'SIMS PPOB-ADHYASTA NAUFAL FAADHILAH',
  },
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
}
