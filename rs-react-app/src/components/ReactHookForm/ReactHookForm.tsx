import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../Input/Input';
import GenderSelect from '../GenderSelect/GenderSelect';
import styles from './ReactHookForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  userSchema,
  VALID_IMAGE_TYPES,
  type UserFormInput,
} from '../../schemas/validationSchema';
import type { UserSubmission } from '../../types/form';
import { v4 as uuidv4 } from 'uuid';
import { addSubmission } from '../../store/form/formSlice';
import { useAppDispatch } from '../../store/hooks/redux';
import { fileToBase64 } from '../../utils/fileToBase64';

const ReactHookForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserFormInput>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    const imageBase64 = await fileToBase64(data.image);

    const formData: UserSubmission = {
      ...data,
      image: imageBase64,
      id: uuidv4(),
      formType: 'react-hook-form',
      createdAt: new Date().toISOString(),
    };
    dispatch(addSubmission(formData));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>React Hook Form</h2>
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
      <Input
        id="image"
        label="Add your avatar:"
        type="file"
        accept={VALID_IMAGE_TYPES.join(', ')}
        error={errors.image?.message}
        {...register('image')}
      />
      <Input
        id="password"
        label="Password:"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        id="confirmPassword"
        label="Confirm password:"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ReactHookForm;
