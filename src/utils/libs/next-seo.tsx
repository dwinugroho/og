import { FC } from 'react';
import { NextSeo, DefaultSeo, NextSeoProps, DefaultSeoProps } from 'next-seo';

export const useNextSeoConfig = (
  props: NextSeoProps | DefaultSeoProps
): NextSeoProps | DefaultSeoProps => ({
  title: 'NextJs Boilerplate by DwiNugroho',
  description: 'This example uses more of the available config options.',
  titleTemplate: '%s | DwiNugroho',
  ...props
});

export const UseNextSeo: FC<NextSeoProps> = (props) => (
  <NextSeo {...useNextSeoConfig(props)} />
);

export const UseDefaultSeo: FC<DefaultSeoProps> = (props) => (
  <DefaultSeo {...useNextSeoConfig(props)} />
);
