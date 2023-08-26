import { useState } from 'react';
import { AppProps } from 'next/app';
import { Flowbite } from 'flowbite-react';

import { UseDefaultSeo } from '@/utils/libs/next-seo';
import { theme } from '@/utils/flowbite/theme';

import { Preload } from '@/components/molecules';

import '@/assets/css/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps<{}>) {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1200);

  return (
    <Flowbite theme={{ dark: true, theme }}>
      <UseDefaultSeo />
      {loading ? <Preload /> : <Component {...pageProps} />}
    </Flowbite>
  );
}
