import LoadingTransaction from '@/components/loading/loading-transaction';
import CustomCard from '@/components/reusable-component/custom-card';
import { Button } from '@/components/ui/button';
import { formatDate, thousandSeparator } from '@/lib/format';
import { fetchTransactionHistory } from '@/store/transaction-slice';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Route = createFileRoute('/_layout/transaction')({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);
  const limit = 5;

  const { transactions, loading, hasMore } = useSelector((state) => state.transaction);

  const isEmpty = transactions.length === 0;
  useEffect(() => {
    dispatch(fetchTransactionHistory({ offset, limit }));
  }, [dispatch, offset]);

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div>
      <h3 className='font-semibold text-xl mb-4'>Semua Transaksi</h3>

      <TransactionItem data={transactions} loading={loading} isEmpty={isEmpty} />

      {hasMore && !loading && !isEmpty && (
        <Button variant='ghost' className='mt-4 font-bold text-red-500 text-center mx-auto block' onClick={handleShowMore}>
          Show More
        </Button>
      )}
    </div>
  );
}

function TransactionItem({ data, loading, isEmpty }) {
  if (loading && isEmpty) {
    return <LoadingTransaction />;
  }

  if (isEmpty) {
    return <IsEmpty message='Maaf tidak ada histori transaksi saat ini' />;
  }

  return (
    <div className='space-y-4'>
      {data?.map((transaction, index) => (
        <CustomCard key={index} contentClassName='p-4'>
          <HeaderCard type={transaction.transaction_type} amount={transaction.total_amount} description={transaction.description} />
          <p className='text-black/30 text-xs mt-1'>{formatDate(transaction.created_on)}</p>
        </CustomCard>
      ))}
    </div>
  );
}

function HeaderCard({ type, amount, description }) {
  const paymentType = (types, amounts) => {
    if (types === 'TOPUP') {
      return <p className='text-[#a4c0b7] text-xl font-semibold'>+ Rp.{thousandSeparator(amounts)}</p>;
    }
    return <p className='text-red-500 text-xl font-semibold'>- Rp.{thousandSeparator(amounts)}</p>;
  };

  return (
    <div className='flex justify-between items-center'>
      {paymentType(type, amount)}
      <p className='mt-2 text-sm'>{description}</p>
    </div>
  );
}

function IsEmpty({ message }) {
  return (
    <div className='flex flex-col items-center justify-center text-center py-10'>
      <p className='text-black/30 text-lg font-semibold'>{message}</p>
    </div>
  );
}
