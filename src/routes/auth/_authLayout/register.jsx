import Logo from '@/assets/Logo.png';
import CustomForm from '@/components/reusable-component/custom-form';
import { useToast } from '@/hooks/use-toast';
import { schemaRegister } from '@/lib/schema';
import { clearMessage, registerUser } from '@/store/auth-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Route = createFileRoute('/auth/_authLayout/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.auth);
  const {toast} = useToast();
  const navigate = useNavigate({from:'/auth/register'})

  const fieldList = [
    {
      name: 'email',
      placeholder: 'masukkan email anda',
      type: 'email',
    },
    {
      name: 'first_name',
      placeholder: 'nama depan',
      type: 'text',
    },
    {
      name: 'last_name',
      placeholder: 'nama belakang',
      type: 'text',
    },
    {
      name: 'password',
      placeholder: 'masukkan password',
      type: 'password',
    },
    {
      name: 'confirm_password',
      placeholder: 'konfirmasi password',
      type: 'password',
    },
  ];

  const form = useForm({
    resolver: zodResolver(schemaRegister),
  });

  useEffect(() => {
    if (loading) {
      toast({
        title: 'Registrasi Sedang Diproses',
        description: 'Mohon tunggu...',
      });
    }
    if (message) {
      toast({
        title: 'Registrasi Berhasil',
        description: message,
      });
      navigate({ to: '/auth/login' });
      dispatch(clearMessage());
    }
    if (error) {
      toast({
        title: 'Registrasi Gagal',
        description: error,
        variant: 'destructive',
      });
      dispatch(clearMessage());
    }
  }, [loading, message, error, toast, navigate, dispatch]);

  const onSubmit = async (data) => {
    const { email, password, first_name, last_name } = data;
    const body = { email, password, first_name, last_name };
    dispatch(registerUser(body));
  };

  return (
    <div>
      <div className='flex gap-2 justify-center mb-6'>
        <img src={Logo} alt='Logo SIMS PPOB' />
        <h2 className='text-xl font-bold'>SIMS PPOB</h2>
      </div>

      <h2 className='text-xl font-bold text-center mb-6'>
        Lengkapi data untuk <br /> membuat akun
      </h2>
      <CustomForm form={form} onSubmit={onSubmit} fields={fieldList} loading={loading} />
      <p className='text-xs text-center mt-6'>
        sudah punya akun? login{' '}
        <Link to={'/auth/login'} className='font-medium text-red-600'>
          di sini
        </Link>
      </p>
    </div>
  );
}
