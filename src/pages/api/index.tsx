import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import clsx from 'clsx';

export const config = {
  runtime: 'edge'
};

// fonts
export const hubot400 = fetch(
  new URL(
    '@/assets/fonts/hubot-sans/TTF/Hubot-Sans-Regular.ttf',
    import.meta.url
  )
).then((res) => res.arrayBuffer());
export const mona700 = fetch(
  new URL('@/assets/fonts/mona-sans/TTF/Mona-Sans-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// classes
const bgclass: any = {
  light: 'bg-blue-50',
  dark: 'bg-neutral-900'
};
const textclass: any = {
  light: 'text-black',
  dark: 'text-white'
};
const descriptionclass: any = {
  light: 'text-gray-700',
  dark: 'text-slate-300'
};

export default async function handler(req: NextRequest) {
  try {
    const hubotRegular = await hubot400;
    const monaBold = await mona700;

    const { searchParams } = new URL(req.url);

    const query = {
      title: searchParams.get('title') ?? 'Default Title',
      description: searchParams.get('description') ?? '',
      tag: searchParams.get('tag') ?? '',
      image: searchParams.get('image') ?? '',
      theme:
        (searchParams.get('theme') || '').toLowerCase() === 'light'
          ? 'light'
          : 'dark'
    };

    return new ImageResponse(
      (
        <div
          style={{ fontFamily: 'Hubot' }}
          tw={clsx(
            'flex flex-row-reverse justify-center',
            'w-full h-full relative',
            bgclass[query.theme]
          )}
        >
          {query.image && (
            <div tw={clsx('flex flex-1 h-full')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={query.image}
                alt={query.title}
                style={{
                  width: '600px',
                  height: '630px',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          <div tw={clsx('flex flex-1 h-full relative')}>
            <div
              style={{ transform: 'skewX(-16deg)' }}
              tw={clsx(
                'flex',
                'absolute top-0 left-1 bottom-0 -right-25',
                'bg-neutral-500'
              )}
            ></div>
            <div
              style={{ transform: 'skewX(-16deg)' }}
              tw={clsx(
                'flex',
                'absolute top-0 left-0 bottom-0 -right-24',
                bgclass[query.theme]
              )}
            ></div>
            <div
              tw={clsx(
                'flex flex-col items-start justify-center w-full h-full p-16'
              )}
            >
              {query.tag && (
                <span
                  style={{ fontFamily: 'Mona' }}
                  tw="mb-4 bg-violet-200 text-violet-800 px-2 py-1 border border-violet-600 rounded-md text-xl"
                >
                  {query.tag}
                </span>
              )}
              <h1
                style={{ fontFamily: 'Mona', lineHeight: '72px' }}
                tw={`m-0 ${query.image ? 'text-4xl' : 'text-5xl'} ${
                  textclass[query.theme]
                }`}
              >
                {query.title}
              </h1>
              {query.description && (
                <p
                  style={{ lineHeight: '48px' }}
                  tw={`m-0 mt-3 text-2xl ${descriptionclass[query.theme]}`}
                >
                  {query.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Hubot',
            data: hubotRegular,
            weight: 400
          },
          {
            name: 'Mona',
            data: monaBold,
            weight: 700
          }
        ]
      }
    );
  } catch (error: any) {
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
}
