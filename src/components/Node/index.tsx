import { PropsWithChildren } from 'react';

interface Props {
  label: string;
}

const Node = ({ label, children }: PropsWithChildren<Props>) => {
  return (
    <section>
      <div>{label}</div>
      <div>{children}</div>
    </section>
  );
};

export default Node;
