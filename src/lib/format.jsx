import dayjs from 'dayjs';
import 'dayjs/locale/id';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ProfilePhoto from '@/assets/ProfilePhoto.png';

dayjs.extend(utc);
dayjs.extend(timezone);

export function thousandSeparator(value, isCurrency = false) {
  const currencyFormat = {
    currency: 'IDR',
    maximumFractionDigits: 5,
    minimumFractionDigits: 0,
    roundingPriority: 'morePrecision',
    style: 'currency',
  };
  const nf = new Intl.NumberFormat('id-ID', isCurrency && currencyFormat);
  if (value === 0) {
    return nf.format(0);
  }
  return value ? nf.format(value) : '-';
}

export function formatDate(dateString){
  return dayjs(dateString).tz('Asia/Jakarta').locale('id').format('DD MMMM YYYY HH:mm') + ' WIB';
};

export function formatImage(image){
    return image.endsWith('/null') ? ProfilePhoto : image || ProfilePhoto
}