import { createFileRoute, Link, Outlet, redirect, useMatchRoute } from '@tanstack/react-router';
import Logo from '@/assets/Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchServices } from '@/store/services-slice';
import { store } from '@/store/configureStore';
import { fetchProfile } from '@/store/profile-slice';
import { formatImage, thousandSeparator } from '@/lib/format';
import LoadingBalance from '@/components/loading/loading-balance';
import CustomCard from '@/components/reusable-component/custom-card';
import { fetchBalance } from '@/store/balance-slice';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    const state = context.store.getState();
    if (!state.auth.isAuthenticated) {
      throw redirect({
        to: '/auth/login',
        search: { redirect: location.href },
      });
    }
  },
  loader: async () => {
    const response = await store.dispatch(fetchProfile()).unwrap();
    return response.data;
  },
});

function RouteComponent() {
  const [hide, setHide] = useState(true)
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { services } = useSelector((state) => state.services);
  const { balance, loading: loadingBalance } = useSelector((state) => state.balance);

  const isLoadingBalance = loadingBalance.fetchBalance;

  useEffect(() => {
    if (!balance) {
      dispatch(fetchBalance());
    }
  }, [balance, dispatch]);

  useEffect(() => {
    if (!services) {
      dispatch(fetchServices());
    }
  }, [services, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='px-40 py-6'>
        <div className='flex justify-between mb-10'>
          <div>
            <div className='w-16 h-16 overflow-hidden rounded-full mb-2'>
              <img src={formatImage(profile?.profile_image)} alt={profile?.first_name} className='w-full h-full object-cover object-top' />
            </div>
            <p className='text-black/40 text-2xl font-semibold'>Selamat datang,</p>
            <h2 className='text-3xl font-semibold'>{profile?.first_name.concat(` ${profile?.last_name}`)}</h2>
          </div>

          {isLoadingBalance ? (
            <LoadingBalance />
          ) : (
            <CustomCard className="w-[60%] bg-[url('/Background.png')] bg-cover bg-center" title={<p className='text-sm text-white font-light'>Saldo anda</p>} footer={<Button className='text-white text-sm p-0 hover:bg-transparent' variant='ghost' onClick={() => setHide(!hide)}>Lihat Saldo'</Button>}>
              <p className='font-semibold text-white text-2xl'>Rp

              {hide ? '.......' : thousandSeparator(balance?.balance)}</p>
            </CustomCard>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

function Navbar() {
  const matchRoute = useMatchRoute();

  const isActive = (path) => (matchRoute({ to: path }) ? 'text-red-500' : 'text-black');

  return (
    <nav className='flex items-center justify-between px-40 py-6 border'>
      <Link to={'/'}>
        <div className='flex items-center gap-2'>
          <img src={Logo} alt='Logo SIMS PPOB' />
          <p>SIMS PPOB</p>
        </div>
      </Link>
      <div className='flex items-center gap-10'>
         <Link to={'/top-up'} className={isActive('/top-up')}>Top Up</Link>
        <Link to={'/transaction'} className={isActive('/transaction')}>Transaction</Link>
        <Link to={'/profile'} className={isActive('/profile')}>Akun</Link>
      </div>
    </nav>
  );
}
