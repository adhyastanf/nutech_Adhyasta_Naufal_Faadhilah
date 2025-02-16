import { z } from 'zod';

export const schemaLogin = z.object({
  email: z.string().email({ message: 'Invalid email format.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character.' }),
});

export const schemaRegister = z
  .object({
    email: z.string().email({ message: 'Email tidak valid.' }),
    first_name: z.string().min(2, { message: 'Nama depan minimal 2 karakter.' }),
    last_name: z.string().min(2, { message: 'Nama belakang minimal 2 karakter.' }),
    password: z
      .string()
      .min(8, { message: 'Password minimal 8 karakter.' })
      .regex(/[A-Z]/, { message: 'Password harus memiliki huruf besar.' })
      .regex(/[a-z]/, { message: 'Password harus memiliki huruf kecil.' })
      .regex(/[0-9]/, { message: 'Password harus memiliki angka.' })
      .regex(/[\W_]/, { message: 'Password harus memiliki karakter spesial.' }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Konfirmasi password tidak cocok.',
    path: ['confirm_password'],
  });

export const schemaTopup = z.object({
  topup: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: 'Topup harus berupa angka',
    })
    .transform((val) => Number(val))
    .refine((num) => num >= 10000, {
      message: 'Minimal topup adalah Rp10.000',
    })
    .refine((num) => num <= 1000000, {
      message: 'Maksimal topup adalah Rp1.000.000',
    }),
});

export const schemaProfile = z.object({
  email: z.string().email({ message: 'Email tidak valid.' }),
  first_name: z.string().min(1, 'Nama depan tidak boleh kosong').max(50, 'Nama depan tidak boleh lebih dari 50 karakter'),
  last_name: z.string().min(1, 'Nama belakang tidak boleh kosong').max(50, 'Nama belakang tidak boleh lebih dari 50 karakter'),
});

export const schemaImage = z.object({
    file: z
    .custom((file) => file instanceof File, "Harus berupa file")
    .refine((file) => file?.size <= 100 * 1024, "Maksimal ukuran file 100kb")
    .refine((file) => ["image/jpeg", "image/png"].includes(file?.type), "Hanya menerima file JPG atau PNG"),
});