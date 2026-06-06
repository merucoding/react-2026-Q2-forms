import type { ComponentProps } from 'react';
import styles from './Input.module.css';

type Props = {
  id: string;
  label: string;
  error?: string;
};

const Input = ({
  id,
  label,
  error,
  ...props
}: Props & ComponentProps<'input'>) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <label htmlFor={id}>{label}</label>
        <input id={id} className={styles.input} {...props} />
      </div>

      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default Input;
