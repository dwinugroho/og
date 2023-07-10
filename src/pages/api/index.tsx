import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

export const hubot400 = fetch(
  new URL(
    '@/assets/fonts/hubot-sans/TTF/Hubot-Sans-Regular.ttf',
    import.meta.url
  )
).then((res) => res.arrayBuffer());

const bgclass: any = {
  light: 'bg-blue-50',
  dark: 'bg-[#202532]'
};

const textclass: any = {
  light: 'text-black',
  dark: 'text-white'
};

const descriptionclass: any = {
  light: 'text-gray-700',
  dark: 'text-slate-300'
};

export const mona700 = fetch(
  new URL('@/assets/fonts/mona-sans/TTF/Mona-Sans-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

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
      theme: searchParams.get('theme') ?? 'dark'
    };

    if (query.image) {
      const res: any = await fetch(query.image, { method: 'HEAD' });
      if (!res.headers.get('Content-Type').startsWith('image')) {
        return new Response(`Failed to generate the image`, {
          status: 500
        });
      }
    }

    return new ImageResponse(
      (
        <div
          style={{ fontFamily: 'Hubot' }}
          tw={`flex flex-col justify-center w-full h-full relative p-20 ${
            bgclass[query.theme]
          }`}
        >
          <div
            style={{ zIndex: '999' }}
            tw="flex items-center h-full w-full relative"
          >
            <div tw="flex flex-col items-start w-[0%] grow">
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
            {query.image && (
              <div tw="flex items-center justify-center h-[400px] w-[400px] ml-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={query.image}
                  alt={query.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  tw="rounded-lg"
                />
              </div>
            )}
          </div>
          <div tw="flex absolute bottom-0 right-0">
            <svg
              width="822"
              height="328"
              viewBox="0 0 822 328"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_2_1424)">
                <path
                  d="M283.696 316.909C112.66 355.226 152.642 458.089 160.184 486.188L906.814 503.215L910.465 158.118C892.442 145.326 846.627 139.958 807.549 220.827C758.701 321.913 497.49 269.012 283.696 316.909Z"
                  fill="url(#paint0_linear_2_1424)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_2_1424"
                  x="0.778717"
                  y="0.700623"
                  width="1059.69"
                  height="652.514"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="75"
                    result="effect1_foregroundBlur_2_1424"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_2_1424"
                  x1="851.6"
                  y1="170.876"
                  x2="180"
                  y2="425"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0385781" stop-color="#0A51A5" />
                  <stop offset="1" stop-color="#C54FC8" />
                  <stop offset="1" stop-color="#821A84" />
                </linearGradient>
              </defs>
            </svg>
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
