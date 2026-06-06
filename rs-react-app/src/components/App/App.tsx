import { useState } from 'react';
import Modal from '../Modal/Modal';
import ReactHookForm from '../ReactHookForm/ReactHookForm';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header>React Forms</header>
      <main>
        <button onClick={() => setIsModalOpen(true)}>Open form</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ReactHookForm />
        </Modal>
      </main>
    </>
  );
};

export default App;
