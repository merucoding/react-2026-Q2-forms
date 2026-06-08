import { z } from 'zod';

export const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2;

export const userSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required.')
      .refine(
        (value) => value.length > 0 && value[0] === value[0].toUpperCase(),
        {
          message: 'First letter must be uppercase.',
        }
      ),

    age: z
      .number({
        error: 'Age is required.',
      })
      .min(0, 'Age cannot be negative.'),

    email: z.email('Please enter a valid email.'),

    gender: z.enum(['male', 'female', 'other'], {
      message: 'Please select gender.',
    }),

    termsAccepted: z.literal(true, {
      message: 'You must accept the Terms & Conditions.',
    }),

    image: z.preprocess(
      (value) => (value instanceof FileList ? value.item(0) : value),
      z
        .instanceof(File)
        .refine((file) => file.size > 0, 'Image is required')
        .refine(
          (file) => VALID_IMAGE_TYPES.includes(file.type),
          'Only PNG or JPEG'
        )
        .refine((file) => file.size <= MAX_IMAGE_SIZE, 'Max size 2MB')
    ),

    password: z
      .string()
      .min(8, 'Minimum 8 characters')
      .refine((value) => /\d/.test(value), {
        message: 'Must contain a number',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Must contain uppercase letter',
      })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Must contain lowercase letter',
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: 'Must contain special character',
      }),

    confirmPassword: z.string().min(8, 'Minimum 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserFormInput = z.input<typeof userSchema>;
