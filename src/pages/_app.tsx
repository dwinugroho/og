import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/assets/css/tailwind.css';
import { UseDefaultSeo } from '@/utils/libs/next-seo';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps<{}>) {
  return (
    <section className={inter.className}>
      <UseDefaultSeo />
      <Component {...pageProps} />
    </section>
  );
}
