import { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import '@/assets/css/tailwind.css';
import { UseDefaultSeo } from '@/utils/libs/next-seo';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    // colors: {...}, // optional
  }
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    // colors: {...}, // optional
  }
});

export default function MyApp({ Component, pageProps }: AppProps<{}>) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <UseDefaultSeo />
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}
