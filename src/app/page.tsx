'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { IconCopy, IconCopyCheck } from '@tabler/icons-react'
import Image from 'next/image'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input, Textarea } from '@/components/atoms'
import { CrossOutUnderline } from '@/components/svgs'
import cn from '@/utils/libs/cn'
import ogImage from '@/utils/libs/og-image'

export type Form = {
  title: string
  description?: string
  image?: string
  information?: string
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>()

  const [image, setImage] = useState<string>(() => '')
  const [loading, setLoading] = useState(() => false)
  const [url, setUrl] = useState(() => '')
  const [copied, setCopied] = useState(() => false)

  const onCopyToClipboard = async () => {
    setCopied(true)

    await navigator.clipboard.writeText(url)

    setTimeout(() => {
      setCopied(false)
    }, 800)
  }

  const onSubmit: SubmitHandler<Form> = (data) => {
    const og = ogImage(data)

    setLoading(true)
    fetch(og)
      .then(async (res) => await res.blob())
      .then((blob) => {
        setImage(URL.createObjectURL(blob))
        setUrl(og)
      })
      .catch(() => {
        setImage('')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='w-full overflow-x-hidden'>
      <div className='mx-auto min-h-[calc(100vh_-_72px)] max-w-7xl space-y-16 px-8 py-24 pt-32 lg:pt-40'>
        <p className='text-center text-3xl font-extrabold text-primary lg:text-5xl'>
          Open Graph Image Generator 🚀 by{' '}
          <span className='relative'>
            Krafan
            <CrossOutUnderline className='absolute inset-x-0 -bottom-3 w-full' />
          </span>
        </p>
        <div
          className={cn(
            'flex flex-col-reverse items-center gap-8 rounded-xl p-8 lg:flex-row lg:gap-16 lg:py-16',
            'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600 via-indigo-600 to-fuchsia-800',
            'shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'
          )}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full space-y-8 lg:max-w-[400px]'
          >
            <div className='space-y-4'>
              <div className='w-full space-y-2'>
                <div className='flex items-center justify-between gap-4'>
                  <label htmlFor='title' className='text-md text-white'>
                    Title <span className=' text-orange-500'>*</span>
                  </label>
                  <p className='text-right text-xs font-bold text-rose-400'>
                    {errors.title?.type === 'required' ? 'required' : ''}
                  </p>
                </div>
                <Input
                  id='title'
                  placeholder='Give Your Thing a Catchy Title'
                  className='w-full invert dark:invert-0'
                  {...register('title', { required: 'required' })}
                />
              </div>
              <div className='w-full space-y-2'>
                <div className='flex items-start justify-between gap-4'>
                  <label htmlFor='title' className='text-md text-white'>
                    Description
                  </label>
                </div>
                <Textarea
                  id='description'
                  placeholder={'Craft a Captivating Story'}
                  className='w-full invert dark:invert-0'
                  {...register('description')}
                />
              </div>
              <div className='w-full space-y-2'>
                <div className='flex items-start justify-between gap-4'>
                  <label htmlFor='title' className='text-md text-white'>
                    Image Url
                  </label>
                  <p className='text-right text-xs font-bold text-rose-400'>
                    {errors.image?.type === 'pattern'
                      ? 'not valid image url'
                      : ''}
                  </p>
                </div>
                <Input
                  id='image'
                  placeholder={'Enter Image URL for Visual Magic'}
                  className='w-full invert dark:invert-0'
                  {...register('image', {
                    pattern:
                      /^(http(s):\/\/.)[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)$/
                  })}
                />
              </div>
              <div className='w-full space-y-2'>
                <div className='flex items-start justify-between gap-4'>
                  <label htmlFor='title' className='text-md text-white'>
                    Information
                  </label>
                </div>
                <Input
                  id='information'
                  placeholder={'Enter Additional Information'}
                  className='w-full invert dark:invert-0'
                  {...register('information')}
                />
              </div>
            </div>

            <Button type='submit' className='w-full invert dark:invert-0'>
              Generate Now !
            </Button>
          </form>
          <div className='-mt-16 w-full space-y-6 lg:mr-[-80px] lg:mt-0 lg:space-y-4 xl:mr-[-120px]'>
            <div className='relative w-full'>
              <div
                className={cn(
                  'absolute -bottom-8 -left-6 right-6 top-6 hidden rounded-[0_24px_0_24px] lg:block'
                )}
                style={{
                  border: '1px solid hsla(0,0%,100%,.2)',
                  maskImage:
                    'linear-gradient(40deg,#fff 16.35%,hsla(0,0%,100%,0) 39.66%)',
                  background: 'hsla(0,0%,100%,.1)'
                }}
              />
              <div
                className={cn(
                  'relative flex aspect-[41/20] w-full overflow-hidden rounded-lg',
                  {
                    'bg-background lg:bg-transparent': !loading,
                    'bg-background blur-md': loading
                  }
                )}
              >
                {image && (
                  <Image
                    src={image}
                    fill
                    className='relative'
                    alt='Open Graph Image'
                  />
                )}
              </div>
            </div>
            <div className='relative w-full lg:w-[calc(100%_-_80px)] xl:w-[calc(100%_-_120px)]'>
              <Input
                id='information'
                name='information'
                placeholder={"Here's Your Awesome Open Graph Image Link"}
                className='w-full pr-12 invert dark:invert-0'
                readOnly
                value={url}
              />
              {url && (
                <div className='absolute right-0 top-1/2 -translate-y-1/2'>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Button
                          variant='link'
                          size='icon'
                          onClick={onCopyToClipboard}
                        >
                          {copied ? (
                            <IconCopyCheck
                              width={20}
                              height={20}
                              className='text-neutral-800'
                            />
                          ) : (
                            <IconCopy
                              width={20}
                              height={20}
                              className='text-neutral-800'
                            />
                          )}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none text-neutral-900 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]'
                          sideOffset={5}
                        >
                          Copy to clipboard
                          <Tooltip.Arrow className='fill-white' />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
              )}
              {/* {url && (
                <Button
                  variant='link'
                  className='absolute right-0 top-1/2 -translate-y-1/2'
                  size='icon'
                  onClick={onCopyToClipboard}
                >
                  <IconCopy
                    width={20}
                    height={20}
                    className='text-neutral-800'
                  />
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
