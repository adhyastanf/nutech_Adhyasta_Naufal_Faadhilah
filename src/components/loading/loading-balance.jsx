import CustomCard from '@/components/reusable-component/custom-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingBalance() {
  return (
    <CustomCard className="w-[60%] bg-[url('/Background.png')] bg-cover bg-center" title='Saldo Anda' footer={<Skeleton className='w-20 h-4' />}>
      <Skeleton className='w-32 h-6' />
    </CustomCard>
  );
}
