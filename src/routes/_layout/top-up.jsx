import CustomForm from '@/components/reusable-component/custom-form';
import { schemaTopup } from '@/lib/schema';
import { createFileRoute } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomCard from '@/components/reusable-component/custom-card';
import { thousandSeparator } from '@/lib/format';
import CustomPriceForm from '@/components/reusable-component/custom-price-form';
import { useDispatch, useSelector } from 'react-redux';
import { topUpBalance } from '@/store/balance-slice';

export const Route = createFileRoute('/_layout/top-up')({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch()
  const {loading, message, error} = useSelector((state) => state.balance)
  const fieldList = [
    {
      name: 'topup',
      placeholder: 'masukkan nominal Top Up',
      type: 'text',
      useThousandSeparator: true,
    },
  ];

  const priceTopUp = [10000, 20000, 50000, 100000, 250000, 500000];

  const form = useForm({
    resolver: zodResolver(schemaTopup),
  });

  const handleSelectPrice = (price) => {
    form.setValue("topup", price.toString(), { shouldValidate: true });
  };

  const onSubmit = (data) => {
    dispatch(topUpBalance(data.topup))
  }

  return (
    <div className='p-4'>
      <p>Silahkan masukan</p>
      <h2 className='text-lg font-semibold'>Nominal Top Up</h2>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:flex-[2] w-full'>
          <CustomPriceForm form={form} onSubmit={onSubmit} fields={fieldList} loading={loading.topUpBalance} />
        </div>

        <div className='lg:flex-1 w-full grid grid-cols-3 gap-2'>
          {priceTopUp.map((price, idx) => (
            <CustomCard key={idx} className='p-0 rounded-sm' contentClassName='p-3 text-center' onClick={() => handleSelectPrice(price)}>
              <p className='text-sm font-medium'>Rp{thousandSeparator(price)}</p>
            </CustomCard>
          ))}
        </div>
      </div>
    </div>
  );
}
