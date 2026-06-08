import { useState } from 'react';
import Modal from '../Modal/Modal';
import ReactHookForm from '../ReactHookForm/ReactHookForm';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import type { ActiveFormType } from '../../types/form';


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

        <Modal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
          {activeForm === 'react-hook-form' && <ReactHookForm />}
          {activeForm === 'uncontrolled' && <UncontrolledForm />}
        </Modal>
      </main>
    </>
  );
};

export default App;
