import type { FC } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';

// components
import { DarkThemeToggle, Button, Tooltip, useTheme } from 'flowbite-react';
import { Icon } from '@iconify/react';

// assets
import { Krafan } from '@/components/svgs';
import { hubot, mona } from '@/utils/fonts';

export const Component: FC<{}> = () => {
  const { mode } = useTheme();

  return (
    <section className="w-full py-[16px] sticky top-0 bg-neutral-100 dark:bg-neutral-900 z-50">
      <nav className="container flex justify-between items-center">
        <NextLink href="/" className="flex items-center gap-[16px]">
          <Krafan
            width={40}
            height={40}
            className="w-[32px] sm:w-[40px] h-[32px] sm:h-[40px]"
          />
          <section className="hidden sm:block">
            <section className="flex flex-col items-start">
              <p
                className={clsx(
                  hubot.className,
                  'dark:text-blue-100 text-blue-950',
                  'font-extrabold text-xl'
                )}
              >
                OG Image Generator
              </p>
              <p
                className={clsx(
                  mona.className,
                  'dark:text-blue-400 text-blue-600',
                  'font-semibold text-xs'
                )}
              >
                By Krafan
              </p>
            </section>
          </section>
        </NextLink>
        <ul className="flex items-center justify-end gap-[8px]">
          <li>
            <Tooltip content="Twitter">
              <a
                href="https://twitter.com/krafanid"
                aria-label="krafan twitter"
              >
                <Button color="light" className="border-0 w-[40px]">
                  <Icon
                    icon="mdi:twitter"
                    width={20}
                    height={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </Button>
              </a>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="View on Github">
              <a
                href="https://github.com/DwiNugroho/og"
                aria-label="krafan github"
              >
                <Button color="light" className="border-0 w-[40px]">
                  <Icon
                    icon="mdi:github"
                    width={20}
                    height={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </Button>
              </a>
            </Tooltip>
          </li>
          <li>
            <Tooltip
              content={
                mode === 'dark' ? 'Set to Light Mode' : 'Set to Dark Mode'
              }
            >
              <DarkThemeToggle />
            </Tooltip>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Component;
