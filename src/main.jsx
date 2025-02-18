import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { routeTree } from './routeTree.gen';
import { store } from './store/configureStore';
import { Toaster } from "@/components/ui/toaster"

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    store,
  },
});

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  // {/* </StrictMode> */}
);
