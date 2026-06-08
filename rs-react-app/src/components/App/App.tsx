import { useState } from 'react';
import Modal from '../Modal/Modal';
import ReactHookForm from '../ReactHookForm/ReactHookForm';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import type { ActiveFormType } from '../../types/form';
import SubmissionList from '../SubmissonList/SubmissonList';

const App = () => {
  const [activeForm, setActiveForm] = useState<ActiveFormType>(null);

  return (
    <>
      <header>React Forms</header>
      <main>
        <button onClick={() => setActiveForm('react-hook-form')}>
          Open React Hook Form
        </button>
        <button onClick={() => setActiveForm('uncontrolled')}>
          Open Uncontrolled Form
        </button>

        <SubmissionList />

        <Modal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
          {activeForm === 'react-hook-form' && (
            <ReactHookForm onSuccess={() => setActiveForm(null)} />
          )}

          {activeForm === 'uncontrolled' && (
            <UncontrolledForm onSuccess={() => setActiveForm(null)} />
          )}
        </Modal>
      </main>
    </>
  );
};

export default App;
