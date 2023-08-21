import type { PropsWithChildren, FC } from 'react';

import { Navbar } from '@/components/organisms';

export const Component: FC<PropsWithChildren<{}>> = ({ children }) => (
  <section className="min-h-screen">
    <Navbar />
    <main>{children}</main>
  </section>
);

export default Component;
