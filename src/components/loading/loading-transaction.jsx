import CustomCard from '../reusable-component/custom-card';
import { Skeleton } from '../ui/skeleton';

export default function LoadingTransaction() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <CustomCard key={index} contentClassName='p-4'>
          <div className='flex justify-between items-center'>
            <Skeleton className='h-6 w-32 rounded-md' />
            <Skeleton className='h-6 w-20 rounded-md' />
          </div>
          <Skeleton className='h-4 w-40 rounded-md mt-2' />
          <Skeleton className='h-3 w-24 rounded-md mt-1' />
        </CustomCard>
      ))}
    </>
  );
}
