import { FC } from 'react';
import { NextSeo, DefaultSeo, NextSeoProps, DefaultSeoProps } from 'next-seo';

export const seo = {
  title: 'Open Graph Generator by krafan',
  description:
    'Website dengan tujuan utama memudahkan anda dalam membuat gambar Open Graph yang menarik dan sesuai dengan situs web anda.',
  titleTemplate: '%s | KRAFAN'
};

export const useNextSeoConfig = (
  props: NextSeoProps | DefaultSeoProps
): NextSeoProps | DefaultSeoProps => ({
  ...seo,
  ...props
});

export const UseNextSeo: FC<NextSeoProps> = (props) => (
  <NextSeo {...useNextSeoConfig(props)} />
);

export const UseDefaultSeo: FC<DefaultSeoProps> = (props) => (
  <DefaultSeo {...useNextSeoConfig(props)} />
);
