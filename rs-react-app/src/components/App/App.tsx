import { useState } from 'react';
import Modal from '../Modal/Modal';
// import ReactHookForm from '../ReactHookForm/ReactHookForm';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header>React Forms</header>
      <main>
        <button onClick={() => setIsModalOpen(true)}>Open form</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/* <ReactHookForm /> */}
          <UncontrolledForm />
        </Modal>
      </main>
    </>
  );
};

export default App;
