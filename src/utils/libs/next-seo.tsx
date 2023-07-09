import { FC } from 'react';
import { NextSeo, DefaultSeo, NextSeoProps, DefaultSeoProps } from 'next-seo';

const origin = process.env.ORIGIN || 'http://127.0.0.1:3000';

export const seo = {
  title: 'Open Graph Generator by krafan',
  description:
    'Website dengan tujuan utama memudahkan anda dalam membuat gambar Open Graph yang menarik dan sesuai dengan situs web anda.',
  titleTemplate: '%s | KRAFAN'
};

export const ogImage = `${origin}/api?${new URLSearchParams({
  title: seo.title,
  description: seo.description,
  tag: 'Open Graph Image Generator',
  image: origin + '/img/krafan-400x400.jpg'
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
  ...props
});

export const UseNextSeo: FC<NextSeoProps> = (props) => (
  <NextSeo {...useNextSeoConfig(props)} />
);

export const UseDefaultSeo: FC<DefaultSeoProps> = (props) => (
  <DefaultSeo {...useNextSeoConfig(props)} />
);
