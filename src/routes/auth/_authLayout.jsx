import { createFileRoute, Outlet } from '@tanstack/react-router';
import Ilustrasi from '@/assets/Illustrasi-Login.png'

export const Route = createFileRoute('/auth/_authLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='h-screen flex flex-col md:flex-row'>

      <div className='flex-1 flex items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
          <Outlet />
        </div>
      </div>

      <div className='flex-1 hidden md:block'>
        <img src={Ilustrasi} alt='Auth Banner' className="object-cover w-full h-full" />
      </div>
    </div>
  );
}
