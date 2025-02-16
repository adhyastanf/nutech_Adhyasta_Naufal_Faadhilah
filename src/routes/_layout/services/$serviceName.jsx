import CustomCard from '@/components/reusable-component/custom-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { thousandSeparator } from '@/lib/format';
import { postTransactions } from '@/store/balance-slice';
import { createFileRoute } from '@tanstack/react-router';
import { Banknote, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const Route = createFileRoute('/_layout/services/$serviceName')({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();
  const { serviceName } = Route.useParams();
  const { services, loading: loadingServices, error: errorServices } = useSelector((state) => state.services);
  const { loading: loadingBalance, error: errorBalance } = useSelector((state) => state.balance);
  const service = services?.find((s) => s.service_code.toLowerCase() === serviceName);
  const navigate = Route.useNavigate();

  const onSubmit = async () => {
    Swal.fire({
      text: `Beli ${service?.service_name} senilai ${thousandSeparator(service?.service_tariff)}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Lanjutkan Bayar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batalkan',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await dispatch(postTransactions(service?.service_code)).unwrap();
          return Swal.fire({
            title: 'Berhasil!',
            text: 'Pembayaran berhasil dilakukan.',
            confirmButtonText: 'Kembali ke Beranda',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          }).then(() => navigate({ to: '/' }));
        } catch (error) {
          return Swal.fire({
            title: `Top Up sebesar ${thousandSeparator(service?.service_tariff)}`,
            text: error,
            icon: 'error',
            confirmButtonText: 'Kembali ke Beranda',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          }).then(() => navigate({ to: '/' }));
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div>
      <div>
        <p className='text-black/50 font-semibold text-2xl mb-4'>PemBayaran</p>
        {loadingServices ? (
          <ServiceSkeleton />
        ) : (
          <div className='flex items-center gap-1 mb-10'>
            <img src={service?.service_icon} alt={service?.service_name} className='w-12 h-12' />
            <p className='text-sm font-semibold'>{service?.service_name}</p>
          </div>
        )}
      </div>

      <CustomCard className='p-0 rounded-sm' contentClassName='p-4'>
        {loadingServices ? (
          <PriceSkeleton />
        ) : (
          <p className='flex items-center gap-2'>
            <Banknote />
            {thousandSeparator(service?.service_tariff)}
          </p>
        )}
      </CustomCard>

      <Button className='w-full mt-6' onClick={onSubmit} disabled={loadingBalance?.postTransaction}>
        {loadingBalance?.postTransaction ? (
          <>
            <Loader2 className='animate-spin' />
            Sedang Diproses
          </>
        ) : (
          'Bayar'
        )}
      </Button>
    </div>
  );
}

function ServiceSkeleton() {
  return (
    <div className='flex items-center gap-1'>
      <Skeleton className='w-12 h-12 rounded-full' />
      <Skeleton className='h-6 w-32' />
    </div>
  );
}

function PriceSkeleton() {
  return <Skeleton className='h-6 w-24' />;
}
