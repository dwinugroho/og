/* eslint-disable react/no-unknown-property */

import { ImageResponse } from 'next/og'
import { type NextRequest, NextResponse } from 'next/server'

import site from '@/utils/config/site'
import cn from '@/utils/libs/cn'

export const runtime = 'edge'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const information = searchParams.get('information')
    const image = searchParams.get('image')

    if (!title) {
      return NextResponse.json(
        {
          error: 'Missing title'
        },
        {
          status: 400
        }
      )
    }

    const MonaSans = await fetch(
      new URL(
        '../../../public/fonts/mona-sans/TTF/Mona-Sans-ExtraBold.ttf',
        import.meta.url
      )
    ).then((res) => res.arrayBuffer())
    const HubotSans = await fetch(
      new URL(
        '../../../public/fonts/hubot-sans/TTF/Hubot-Sans-Medium.ttf',
        import.meta.url
      )
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      (
        <div
          tw={cn(
            'w-full h-full relative',
            'flex flex-row-reverse justify-center'
          )}
        >
          {image && (
            <div tw={cn('flex flex-1 h-full')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          <div tw={cn('flex flex-1 h-full relative')}>
            <div
              style={{
                transform: 'skewX(-16deg)',
                backgroundImage: `url(${site.url}/images/og-background.png)`
              }}
              tw={cn('flex', '-right-24 absolute inset-y-0 -left-26')}
            />
            <div
              tw={cn(
                'flex h-full w-full flex-col items-start justify-center text-white/80',
                {
                  'text-center items-center p-24': !image,
                  'p-12': image
                }
              )}
              style={{ fontFamily: 'Hubot' }}
            >
              <h1
                tw={cn('mb-0 text-white', {
                  'text-6xl': !image,
                  'text-5xl': image
                })}
                style={{ fontFamily: 'Mona', lineHeight: 1.6 }}
              >
                {title}
              </h1>
              {description && (
                <p tw={'m-0 mt-4 text-2xl mb-0'}>{description}</p>
              )}
              {information && (
                <p
                  tw={cn('m-0 text-2xl mb-0 absolute bottom-12 left-12')}
                  style={{ fontFamily: 'Mona' }}
                >
                  {information}
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
            data: HubotSans,
            weight: 400
          },
          {
            name: 'Mona',
            data: MonaSans,
            weight: 700
          }
        ]
      }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Failed to generate image'
      },
      {
        status: 500
      }
    )
  }
}
