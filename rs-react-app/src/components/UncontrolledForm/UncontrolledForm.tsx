import { useState, type SubmitEvent } from 'react';
import { useAppDispatch } from '../../store/hooks/redux';
import { v4 as uuidv4 } from 'uuid';
import styles from './UncontrolledForm.module.css';
import Input from '../Input/Input';
import GenderSelect from '../GenderSelect/GenderSelect';
import { userSchema, VALID_IMAGE_TYPES } from '../../schemas/validationSchema';
import { z } from 'zod';
import type { UserSubmission, ZodTreeifyError } from '../../types/form';
import { addSubmission } from '../../store/form/formSlice';
import { fileToBase64 } from '../../utils/fileToBase64';

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Record<string, ZodTreeifyError> | null>(
    null
  );

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const ageValue = formData.get('age');

    const data = {
      name: formData.get('name'),
      age: ageValue ? Number(ageValue) : undefined,
      email: formData.get('email'),
      gender: formData.get('gender'),
      termsAccepted: formData.has('termsAccepted'),
      image: formData.get('image'),
    };

    const result = userSchema.safeParse(data);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree.properties ?? null);
      return;
    }

    setErrors(null);

    const imageBase64 = await fileToBase64(data.image);

    const sendData: UserSubmission = {
      ...result.data,
      image: imageBase64,
      id: uuidv4(),
      formType: 'uncontrolled',
      createdAt: new Date().toISOString(),
    };

    dispatch(addSubmission(sendData));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        id="name"
        label="Name:"
        error={errors?.name?.errors?.[0]}
        type="text"
        name="name"
        placeholder="Enter your name"
      />
      <Input
        id="email"
        label="E-mail:"
        error={errors?.email?.errors?.[0]}
        type="text"
        name="email"
        placeholder="Enter your e-mail"
      />
      <GenderSelect
        id="gender"
        label="Gender:"
        name="gender"
        error={errors?.gender?.errors?.[0]}
      />
      <Input
        id="age"
        label="Age:"
        error={errors?.age?.errors?.[0]}
        type="number"
        name="age"
      />
      <Input
        id="terms"
        label="Accept Terms & Conditions"
        error={errors?.termsAccepted?.errors?.[0]}
        type="checkbox"
        name="termsAccepted"
      />
      <Input
        id="image"
        label="Add your avatar:"
        type="file"
        accept={VALID_IMAGE_TYPES.join(', ')}
        error={errors?.image?.errors?.[0]}
        name="image"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
