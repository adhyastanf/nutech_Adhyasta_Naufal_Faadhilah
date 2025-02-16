import CustomCard from '@/components/reusable-component/custom-card';
import { CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingBanner() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4'>
          <div className='p-1'>
            <CustomCard contentClassName='p-0'>
              <Skeleton className='w-full h-40 rounded-lg' />
            </CustomCard>
          </div>
        </CarouselItem>
      ))}
    </>
  );
}