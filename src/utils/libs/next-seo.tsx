import { FC } from 'react';
import { NextSeo, DefaultSeo, NextSeoProps, DefaultSeoProps } from 'next-seo';

const origin = process.env.NEXT_PUBLIC_ORIGIN;

export const seo = {
  title: 'Open Graph Image Generator by krafan',
  description:
    'Website dengan tujuan memudahkan kamu membuat gambar Open Graph yang menarik dengan mudah.',
  titleTemplate: '%s | KRAFAN'
};

export const ogImage = `${origin}/api?${new URLSearchParams({
  title: seo.title,
  description: seo.description,
  image: origin + '/img/krafanid-400x400.jpg'
})}`;

export const useNextSeoConfig = (
  props: NextSeoProps | DefaultSeoProps
): NextSeoProps | DefaultSeoProps => ({
  ...seo,
  openGraph: {
    type: 'website',
    url: origin,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: seo.title
      }
    ]
  },
  twitter: {
    cardType: 'summary_large_image'
  },
  ...props
});

export const UseNextSeo: FC<NextSeoProps> = (props) => (
  <NextSeo {...useNextSeoConfig(props)} />
);

export const UseDefaultSeo: FC<DefaultSeoProps> = (props) => (
  <DefaultSeo {...useNextSeoConfig(props)} />
);
