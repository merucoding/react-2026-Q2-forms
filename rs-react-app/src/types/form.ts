export type Gender = 'male' | 'female' | 'other';

export interface UserSubmission {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: Gender;
  termsAccepted: boolean;

  // image: string;
  // password: string;
  // confirmPassword: string;
  // country: string;

  formType: 'uncontrolled' | 'react-hook-form';
  createdAt: string;
}
