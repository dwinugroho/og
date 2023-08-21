import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import { verifyImage } from '@/utils/http/file';

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
      image: searchParams.get('image') ?? '',
      theme: (searchParams.get('theme') ?? 'dark').toLowerCase()
    };

    return new ImageResponse(
      (
        <div
          style={{ fontFamily: 'Hubot' }}
          tw={`flex flex-col justify-center w-full h-full relative p-20 ${
            bgclass[query.theme]
          }`}
        >
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
          <div
            style={{ zIndex: '999' }}
            tw="flex flex-col items-center justify-center h-full w-full relative"
          >
            <div tw="flex flex-col items-center text-center">
              <p
                style={{ fontFamily: 'Mona', lineHeight: '72px' }}
                tw={`m-0 text-5xl ${textclass[query.theme]}`}
              >
                {query.title}
              </p>
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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={query.image}
                alt={query.title}
                style={{
                  height: '400px',
                  objectFit: 'cover'
                }}
                tw="rounded-lg h-[400px] max-w-[1000px] -mb-[300px] mt-[72px]"
              />
            )}
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
