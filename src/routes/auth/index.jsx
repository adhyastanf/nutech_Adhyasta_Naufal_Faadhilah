import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
});

function RouteComponent() {
 
  return (
    <div className='h-screen flex items-center justify-center'>
      <h1 className='text-2xl font-bold text-red-500'>404 - Page Not Found</h1>
    </div>
  );
}
