import type { CustomFlowbiteTheme } from 'flowbite-react';
import clsx from 'clsx';

export const theme: CustomFlowbiteTheme = {
  textInput: {
    field: {
      input: {
        colors: {
          gray: clsx(
            'bg-neutral-50 dark:bg-neutral-950',
            'border-gray-300 dark:border-gray-700',
            'focus:border-cyan-500 focus:ring-cyan-500 dark:focus:border-cyan-900 dark:focus:ring-cyan-500',
            'dark:placeholder-gray-400',
            'text-gray-900 dark:text-white'
          )
        }
      }
    }
  },
  textarea: {
    colors: {
      gray: clsx(
        'bg-neutral-50 dark:bg-neutral-950',
        'border-gray-300 dark:border-gray-700',
        'focus:border-cyan-500 focus:ring-cyan-500 dark:focus:border-cyan-900 dark:focus:ring-cyan-500',
        'dark:placeholder-gray-400',
        'text-gray-900 dark:text-white text-sm'
      )
    }
  }
};

export default theme;
