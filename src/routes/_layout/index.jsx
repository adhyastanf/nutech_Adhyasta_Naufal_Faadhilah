import LoadingBanner from '@/components/loading/loading-banner';
import LoadingServices from '@/components/loading/loading-services';
import CustomCard from '@/components/reusable-component/custom-card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { fetchBanners } from '@/store/banner-slice';
import { store } from '@/store/configureStore';
import { fetchProfile } from '@/store/profile-slice';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Route = createFileRoute('/_layout/')({
  loader: async () => {
    const response = await store.dispatch(fetchProfile()).unwrap();
    return response.data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();
  const { banners, loading: loadingBanner, error: errorBanner } = useSelector((state) => state.banner);
  const { services, loading: loadingServices, error: errorServices } = useSelector((state) => state.services);
  const { error: errorBalance } = useSelector((state) => state.balance);

  useEffect(() => {
    if (!banners) {
      dispatch(fetchBanners());
    }
  }, [banners, dispatch]);

  if (errorServices) return <p>Error: {errorServices}</p>;
  if (errorBanner) return <p>Error: {errorBanner}</p>;
  if (errorBalance.fetchBalance) return <p>Error: {errorBalance.fetchBalance}</p>;

  return (
    <div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full mb-10'
      >
        <CarouselContent className='p-0'>
          {loadingServices ? (
            <LoadingServices />
          ) : (
            services?.map((val, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/12'>
                <Link to={`/services/${val.service_code.toLowerCase()}`}>
                  <div className='p-1'>
                    <CustomCard contentClassName='p-0'>
                      <img src={val.service_icon} alt={val.service_name} className='w-full' />
                    </CustomCard>
                    <p className='text-center text-xs mt-2'>{val.service_name}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>

      <div>
        <h2 className='text-xl font-semibold mb-6'>Temukan promo menarik</h2>

        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full'
        >
          <CarouselContent className='p-0'>
            {loadingBanner ? (
              <LoadingBanner />
            ) : (
              banners?.map((val, index) => (
                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4'>
                  <div className='p-1'>
                    <CustomCard contentClassName='p-0'>
                      <img src={val.banner_image} alt={val.banner_name} className='w-full' />
                    </CustomCard>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
