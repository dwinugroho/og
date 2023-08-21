import { AppProps } from 'next/app';
import { Flowbite } from 'flowbite-react';

import { UseDefaultSeo } from '@/utils/libs/next-seo';
import { theme } from '@/utils/flowbite/theme';
import '@/assets/css/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps<{}>) {
  return (
    <Flowbite theme={{ dark: true, theme }}>
      <UseDefaultSeo />
      <Component {...pageProps} />
    </Flowbite>
  );
}
