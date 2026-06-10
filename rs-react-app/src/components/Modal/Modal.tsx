import { useEffect, useRef, type ReactNode } from 'react';
import Portal from '../Portal/Portal';
import { X as CloseIcon } from 'lucide-react';
import styles from './Modal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const first = dialog.querySelector('[data-focus-first]');
      const last = dialog.querySelector('[data-focus-last]');

      if (e.shiftKey) {
        if (e.target === first) {
          e.preventDefault();
          (last as HTMLElement)?.focus();
        }
      } else {
        if (e.target === last) {
          e.preventDefault();
          (first as HTMLElement)?.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);

    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (!dialogRef.current) return;

    const rect = dialogRef.current.getBoundingClientRect();

    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      onClose();
    }
  };

  return (
    <Portal>
      <dialog
        ref={dialogRef}
        onClose={onClose}
        onCancel={onClose}
        onClick={handleClickOutside}
        className={styles.dialog}
      >
        {children}
        <button
          data-testid="close-modal"
          className={styles.closeButton}
          data-focus-last
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </dialog>
    </Portal>
  );
};

export default Modal;
