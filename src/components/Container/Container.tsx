import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => (
  <div className="container vh-100 w-100 d-flex align-items-center justify-content-center flex-column">{children}</div>
);
