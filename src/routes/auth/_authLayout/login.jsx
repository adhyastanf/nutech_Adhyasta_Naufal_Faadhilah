import CustomForm from '@/components/reusable-component/custom-form'
import { schemaLogin } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import Logo from '@/assets/Logo.png'
import { clearMessage, loginUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const Route = createFileRoute('/auth/_authLayout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({from:'/auth/login'})
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const fieldList = [
    {
      name: 'email',
      placeholder: 'masukkan email anda',
      type: 'email',
    },
    {
      name: 'password',
      placeholder: 'masukkan password anda',
      type: 'password',
    },
  ]

  const form = useForm({
    resolver: zodResolver(schemaLogin),
  })

  const onSubmit = (data) => {
    const { email, password } = data;
    const body = { email, password };
    dispatch(loginUser(body));
  }

  useEffect(() => {
    if (loading) {
      toast({ title: 'Login Sedang Diproses', description: 'Mohon tunggu...' });
    }
    if (message) {
      toast({ title: 'Login Berhasil', description: message });
      navigate({ to: '/' });
      dispatch(clearMessage());
    }
    if (error) {
      toast({ title: 'Login Gagal', description: error, variant: 'destructive' });
      dispatch(clearMessage());
    }
  }, [loading, message, error, navigate, dispatch, toast]);

  return (
    <div>
      <div className="flex gap-2 justify-center mb-6">
        <img src={Logo} alt="Logo SIMS PPOB" />
        <h2 className="text-xl font-bold">SIMS PPOB</h2>
      </div>

      <h2 className="text-xl font-bold text-center mb-6">
        Masuk atau buat akun <br /> untuk memulai
      </h2>

      <CustomForm form={form} onSubmit={onSubmit} fields={fieldList} loading={loading} />

      <p className="text-xs text-center mt-6">
        sudah punya akun? registrasi{' '}
        <Link to={'/auth/register'} className="font-medium text-red-600">
          di sini
        </Link>
      </p>
    </div>
  )
}
