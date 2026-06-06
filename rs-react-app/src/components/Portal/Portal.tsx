import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Portal = ({ children }: Props) => {
  return createPortal(children, document.body);
};

export default Portal;
