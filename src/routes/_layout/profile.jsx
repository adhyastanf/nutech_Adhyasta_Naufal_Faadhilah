import CustomForm from '@/components/reusable-component/custom-form';
import { schemaImage, schemaProfile } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePhoto from '@/assets/ProfilePhoto.png';
import { Button } from '@/components/ui/button';
import { updateProfile, updateProfileImage } from '@/store/profile-slice';
import { logoutUser } from '@/store/auth-slice';
import { formatImage } from '@/lib/format';

export const Route = createFileRoute('/_layout/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { profile, loading } = useSelector((state) => state.profile);
  const [imagePreview, setImagePreview] = useState(formatImage(profile?.profile_image));
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div>
      <div className='text-center'>
        <div className='w-[100px] h-[100px] overflow-hidden rounded-full mb-2 mx-auto'>
          <label htmlFor='fileInput'>
            <img src={formatImage(imagePreview)} alt={profile?.first_name} className='w-full h-full object-cover object-top' />
          </label>
        </div>
        <input type='file' id='fileInput' accept='image/*' className='hidden' {...fileForm.register('file', { onChange: onImageChange })} />
        {fileForm.formState.errors.file && <p className='text-red-500'>{fileForm.formState.errors.file.message}</p>}
      </div>

      <CustomForm
        form={form}
        onSubmit={onSubmit}
        fields={[
          { name: 'email', placeholder: 'masukkan email anda', type: 'email' },
          { name: 'first_name', placeholder: 'nama depan', type: 'text' },
          { name: 'last_name', placeholder: 'nama belakang', type: 'text' },
        ]}
        loading={loading.updateProfile}
        hideSubmit={true}
      />

      {!isEditing ? (
        <>
          <Button onClick={() => setIsEditing(true)} className='mt-2 w-full'>
            Edit Profile
          </Button>
          <Button onClick={() => dispatch(logoutUser())} className='mt-2 w-full'>
            Logout
          </Button>
        </>
      ) : (
        <div className='space-y-2 mt-2'>
          <Button type='submit' form='custom-form' className='w-full'>
            Simpan
          </Button>
          <Button onClick={() => setIsEditing(false)} className='w-full'>
            Batalkan
          </Button>
        </div>
      )}
    </div>
  );
}
