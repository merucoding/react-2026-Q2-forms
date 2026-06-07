import { z } from 'zod';

export const userSchema = z.object({
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
});

export type UserFormData = z.infer<typeof userSchema>;
