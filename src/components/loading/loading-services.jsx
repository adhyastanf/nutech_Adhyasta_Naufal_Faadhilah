import CustomCard from '@/components/reusable-component/custom-card';
import { CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingServices() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/12'>
          <div className='p-1'>
            <CustomCard contentClassName='p-0'>
              <Skeleton className='w-full h-24 rounded-lg' />
            </CustomCard>
            <Skeleton className='w-3/4 h-4 mt-2 mx-auto rounded' />
          </div>
        </CarouselItem>
      ))}
    </>
  );
}