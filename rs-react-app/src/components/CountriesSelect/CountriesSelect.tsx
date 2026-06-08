import type { ComponentProps } from 'react';
import styles from './CountriesSelect.module.css';
import type { Country } from '../../constants/countries';

type Props = {
  id: string;
  label: string;
  error?: string;
  countries: Country[];
};

const CountriesSelect = ({
  id,
  label,
  error,
  countries,
  ...props
}: Props & ComponentProps<'input'>) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>

        <input id={id} list="countries" {...props} />

        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default CountriesSelect;
