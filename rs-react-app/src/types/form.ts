export type FormType = 'uncontrolled' | 'react-hook-form';

export type ActiveFormType = FormType | null;

export type Gender = 'male' | 'female' | 'other';

export interface UserSubmission {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: Gender;
  termsAccepted: boolean;

  image: string;
  password: string;
  confirmPassword: string;
  country: string;

  formType: FormType;
  createdAt: string;
}

export type ZodTreeifyError = {
  errors: string[];
  properties?: Record<string, ZodTreeifyError>;
  items?: (ZodTreeifyError | undefined)[];
};
