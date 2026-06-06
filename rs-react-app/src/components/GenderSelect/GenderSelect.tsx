import type { ComponentProps } from 'react';
import styles from './GenderSelect.module.css';

type Props = {
  id: string;
  label: string;
  error?: string;
};

const GenderSelect = ({
  id,
  label,
  error,
  ...props
}: Props & ComponentProps<'select'>) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>

        <select id={id} {...props}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default GenderSelect;
