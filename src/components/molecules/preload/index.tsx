import { FC } from 'react';

export const Component: FC<{}> = () => (
  <div className="fixed inset-0 bg-neutral-900 flex items-center justify-center">
    <div className="w-[48px] h-[48px]">
      <span className="loader"></span>
    </div>
  </div>
);

export default Component;
