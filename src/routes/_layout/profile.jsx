import CustomForm from '@/components/reusable-component/custom-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatImage } from '@/lib/format';
import { schemaImage, schemaProfile } from '@/lib/schema';
import { logoutUser } from '@/store/auth-slice';
import { clearProfileMessage, updateProfile, updateProfileImage } from '@/store/profile-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { AtSign, Loader2, Pencil, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export const Route = createFileRoute('/_layout/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { profile, loading, message, error } = useSelector((state) => state.profile);
  const [imagePreview, setImagePreview] = useState(formatImage(profile?.profile_image));
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(schemaProfile),
    defaultValues: {
      email: profile?.email || '',
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
    },
  });

  const fileForm = useForm({
    resolver: zodResolver(schemaImage),
  });

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    fileForm.setValue('file', file, { shouldValidate: true });

    const isValid = await fileForm.trigger('file');
    if (isValid) {
      setImagePreview(URL.createObjectURL(file));
      dispatch(updateProfileImage(file));
    }
  };

  useEffect(() => {
    if (loading?.updateProfile) {
      toast({
        title: 'Update profile Sedang Diproses',
        description: 'Mohon tunggu...',
      });
    }
    if (message?.updateProfile) {
      toast({
        title: 'Update profile Berhasil',
        description: message?.updateProfile,
      });
      dispatch(clearProfileMessage());
    }
    if (error?.updateProfile) {
      toast({
        title: 'Update profile Gagal',
        description: error,
        variant: 'destructive',
      });
      dispatch(clearProfileMessage());
    }
  }, [loading?.updateProfile, message?.updateProfile, error?.updateProfile, toast, dispatch]);

  const fields = [
    { name: 'email', label: 'Email', placeholder: 'masukkan email anda', type: 'email', icon: <AtSign className='text-black/50' size={16} /> },
    { name: 'first_name', label: 'First Name', placeholder: 'nama depan', type: 'text', icon: <UserRound className='text-black/50' size={16} /> },
    { name: 'last_name', label: 'Last Name', placeholder: 'nama belakang', type: 'text', icon: <UserRound className='text-black/50' size={16} /> },
  ];

  return (
    <div>
      <div className='text-center'>
        <div className='w-[100px] h-[100px] rounded-full mb-2 mx-auto relative'>
          <label htmlFor='fileInput'>
            <img src={formatImage(imagePreview)} alt={profile?.first_name} className='w-full h-full object-cover object-top cursor-pointer rounded-full' />
          </label>
          <div className='absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md'>
            <Pencil size={15} className='text-gray-700' />
          </div>
        </div>
        <input type='file' id='fileInput' accept='image/*' className='hidden' {...fileForm.register('file', { onChange: onImageChange })} />
        {fileForm.formState.errors.file && <p className='text-red-500'>{fileForm.formState.errors.file.message}</p>}
      </div>

      <CustomForm form={form} onSubmit={onSubmit} fields={fields} loading={loading?.updateProfile} hideSubmit={true} />

      {!isEditing && (
        <div className='space-y-6 mt-6'>
          <Button onClick={() => setIsEditing(true)} className='mt-2 w-full' variant='outline'>
            Edit Profile
          </Button>
          <Button onClick={() => dispatch(logoutUser())} className='mt-2 w-full bg-red-500 text-white'>
            Logout
          </Button>
        </div>
      )}

      {isEditing && (
        <div className='space-y-6 mt-6'>
          <Button type='submit' form='custom-form' className='w-full bg-red-500 text-white' disabled={loading?.updateProfile}>
            {loading?.updateProfile ? (
              <>
                <Loader2 className='animate-spin' />
                Sedang Diproses
              </>
            ) : (
              'Simpan'
            )}
          </Button>
          <Button onClick={() => setIsEditing(false)} className='w-full bg-red-500 text-white'>
            Batalkan
          </Button>
        </div>
      )}
    </div>
  );
}
