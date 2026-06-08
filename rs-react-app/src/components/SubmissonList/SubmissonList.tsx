import { useAppSelector } from '../../store/hooks/redux';
import { selectSubmissionList } from '../../store/form/formSelector';
import { isNewForm } from '../../utils/isNewForm';
import styles from './SubmissonList.module.css';

const SubmissionList = () => {
  const submissions = useAppSelector(selectSubmissionList);

  if (!submissions.length) {
    return <p>No submissions yet</p>;
  }

  return (
    <section className={styles.container}>
      <h2>Submitted Forms</h2>

      {submissions.map((item) => (
        <article
          key={item.id}
          className={isNewForm(item.createdAt) ? styles.newItem : styles.item}
        >
          <img
            src={item.image}
            alt={`${item.name} avatar`}
            className={styles.avatar}
          />

          <div className={styles.info}>
            <p>
              <strong>Name:</strong> {item.name}
            </p>

            <p>
              <strong>Email:</strong> {item.email}
            </p>

            <p>
              <strong>Gender:</strong> {item.gender}
            </p>

            <p>
              <strong>Age:</strong> {item.age || '—'}
            </p>

            <p>
              <strong>Country:</strong> {item.country}
            </p>

            <p>
              <strong>Terms Accepted: </strong>
              {item.termsAccepted ? 'Yes' : 'No'}
            </p>

            <p>
              <strong>Form Type: </strong> {item.formType}
            </p>

            <p>
              <strong>Created: </strong>
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default SubmissionList;
