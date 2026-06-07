import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import GenderSelect from '../GenderSelect/GenderSelect';
import styles from './ReactHookForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormData } from '../../schemas/validationSchema';
import type { UserSubmission } from '../../types/form';
import { v4 as uuidv4 } from 'uuid';
import { addSubmission } from '../../store/form/formSlice';
import { useAppDispatch } from '../../store/hooks/redux';

const ReactHookForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: UserFormData) => {
    const formData: UserSubmission = {
      ...data,
      id: uuidv4(),
      formType: 'react-hook-form',
      createdAt: new Date().toISOString(),
    };
    dispatch(addSubmission(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        id="name"
        label="Name:"
        error={errors.name?.message}
        type="text"
        placeholder="Enter your name"
        {...register('name')}
      />
      <Input
        id="email"
        label="E-mail:"
        error={errors.email?.message}
        type="text"
        placeholder="Enter your e-mail"
        {...register('email')}
      />
      <GenderSelect id="gender" label="Gender:" {...register('gender')} />
      <Input
        id="age"
        label="Age:"
        error={errors.age?.message}
        type="number"
        {...register('age', {
          setValueAs: (value) => (value ? Number(value) : undefined),
        })}
      />
      <Input
        id="terms"
        label="Accept Terms & Conditions"
        error={errors.termsAccepted?.message}
        type="checkbox"
        {...register('termsAccepted')}
      />
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ReactHookForm;
