import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
// import type { UserSubmission } from '../../types/form';
import GenderSelect from '../GenderSelect/GenderSelect';
import styles from './ReactHookForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormData } from '../../schemas/validationSchema';

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
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
        {...register('age', { setValueAs: (value) => Number(value) })}
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
