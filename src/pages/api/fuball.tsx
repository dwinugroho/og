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
  new URL('@/assets/fonts/mona-sans/TTF/Mona-Sans-Black.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// classes
const bgclass: any = {
  light: 'bg-blue-50',
  dark: 'bg-black'
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
      date: searchParams.get('date') ?? '',
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
                'absolute top-0 left-1 bottom-0 -right-24',
                'bg-[#A3E437]'
              )}
            ></div>
            <div
              style={{ transform: 'skewX(-16deg)' }}
              tw={clsx(
                'flex',
                'absolute top-0 left-0 bottom-0 -right-22',
                bgclass[query.theme]
              )}
            ></div>
            <div tw={clsx('flex flex-col justify-between w-full h-full p-16')}>
              <div tw={clsx('flex flex-col items-start')}>
                {query.tag && (
                  <span
                    style={{ fontFamily: 'Mona' }}
                    tw="mb-4 bg-green-200 text-green-800 px-2 py-1 border border-green-600 rounded-md text-xl"
                  >
                    {query.tag}
                  </span>
                )}
                <h1
                  style={{ fontFamily: 'Mona', lineHeight: '80px' }}
                  tw={clsx(
                    'm-0',
                    textclass[query.theme],
                    query.image ? 'text-5xl' : 'text-6xl'
                  )}
                >
                  {query.title}
                </h1>
              </div>
              <div tw={clsx('flex items-center')}>
                <div tw={clsx('flex mr-4')}>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_309_2)">
                      <path
                        d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
                        fill="#A3E437"
                      />
                      <path
                        d="M42.1754 11.9418L42.1755 11.9418L42.1686 11.9387C39.4226 10.6905 36.2203 10.7878 33.5646 12.3411L15.1013 23.0877C15.1007 23.088 15.1002 23.0884 15.0996 23.0887C12.6439 24.4927 11.0436 26.8982 10.5942 29.6443C10.1437 32.3976 10.9456 35.152 12.7948 37.2519C14.354 39.0473 16.1968 41.2209 18.2761 43.7728C21.0256 47.1604 25.0528 48.9768 29.2238 48.9768C31.2364 48.9768 33.2989 48.5354 35.2156 47.6025C39.1909 45.7568 42.4668 44.1902 44.8934 42.9056C48.4461 41.0534 50.398 37.1489 49.7475 33.1954C49.7475 33.1954 49.7475 33.1953 49.7475 33.1953L47.3798 18.8001L47.3796 18.799C46.8788 15.7939 44.9259 13.242 42.1754 11.9418ZM16.4996 25.5645L16.501 25.5637L35.0122 14.7695C35.0128 14.7691 35.0134 14.7688 35.014 14.7684C36.868 13.7097 39.0145 13.5828 40.9414 14.5025L40.9414 14.5025L40.9459 14.5046C42.8323 15.382 44.1474 17.0898 44.4991 19.2002L46.8664 33.5929C46.8664 33.5933 46.8665 33.5936 46.8665 33.594C47.3058 36.3202 45.9875 38.9949 43.5312 40.2669L43.5272 40.269C41.1235 41.5416 37.9127 43.0999 33.984 44.946C29.3147 47.1216 23.7844 45.8528 20.5195 41.8628C18.4356 39.3053 16.5826 37.0721 14.9644 35.2634L14.9622 35.261C13.6917 33.8591 13.1208 31.9289 13.4279 30.0421C13.7358 28.1509 14.8326 26.5297 16.4996 25.5645Z"
                        fill="black"
                        stroke="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_309_2">
                        <rect width="60" height="60" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div tw={clsx('flex flex-col')}>
                  <h1
                    style={{ fontFamily: 'Mona' }}
                    tw={clsx('m-0 text-2xl mb-2', textclass[query.theme])}
                  >
                    Fuball.id
                  </h1>
                  {query.date && (
                    <p tw={clsx('m-0 text-2xl', descriptionclass[query.theme])}>
                      {query.date}
                    </p>
                  )}
                </div>
              </div>
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
