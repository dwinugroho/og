import { useState } from 'react';
import {
  Input,
  Textarea,
  Button,
  Image,
  Snippet,
  Text,
  Loading
} from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import NextImage from 'next/image';

export interface IForm {
  title: string;
  description?: string;
  image?: string;
  tag?: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>();

  const [imageUrl, setImageUrl] = useState(() => '');
  const [imageBlob, setImageBlob] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [isError, setIsError] = useState(() => false);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const queryparams = new URLSearchParams({
      ...data
    }).toString();

    const fullUrl = process.env.NEXT_PUBLIC_ORIGIN + '/api?' + queryparams;

    setIsLoading(true);
    setIsError(false);

    fetch(fullUrl)
      .then(async (res) => {
        if (res.ok) {
          return await res.blob();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((blob) => {
        setImageUrl(fullUrl);
        setImageBlob(URL.createObjectURL(blob));
      })
      .catch(() => {
        setImageUrl('');
        setImageBlob('');
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // setImageUrl(fullUrl);
  };

  return (
    <section className="w-full min-h-screen relative py-16 bg-black">
      <NextImage
        priority
        src="/img/background.svg"
        width={1600}
        height={900}
        alt="Krafan OG Image Generator"
        className="w-full h-full object-cover absolute inset-0 opacity-80"
      />
      <section className="container relative">
        <Text h1 b size={52} className="text-center">
          Open Graph Image Generator
        </Text>
        <Text h1 b size={52} className="text-center">
          by Krafan
        </Text>
      </section>
      <main className="container flex flex-col-reverse lg:flex-row items-center gap-16 py-16 relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-12"
          autoComplete="none"
          autoCorrect="none"
        >
          <section className="flex flex-col gap-2">
            <Input
              {...register('title', { required: true })}
              labelPlaceholder="Title"
              size="lg"
              width="100%"
            />
            {errors.title?.type === 'required' && (
              <p role="alert" className="text-sm text-red-900 ml-2">
                Title is required
              </p>
            )}
          </section>
          <Textarea
            {...register('description')}
            labelPlaceholder="Description"
            size="lg"
          />
          <section className="flex flex-col gap-2">
            <Input
              {...register('image', {
                pattern:
                  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
              })}
              labelPlaceholder="Image Url"
              size="lg"
              width="100%"
            />
            {errors.image?.type === 'pattern' && (
              <p role="alert" className="text-sm text-red-900 ml-2">
                Image must an url
              </p>
            )}
          </section>
          <Input
            {...register('tag')}
            labelPlaceholder="Tag"
            size="lg"
            width="100%"
          />
          <Button type="submit" className="bg-blue-600" size="lg">
            Generate
          </Button>
        </form>
        <section className="w-full flex flex-col gap-8 lg:min-w-[640px]">
          <div className="w-full aspect-[40/21] bg-gray-800 rounded-md border border-gray-600 overflow-hidden relative">
            {imageBlob && (
              <Image
                src={imageBlob}
                alt="Open Graph Image Generator by Krafan"
                objectFit="cover"
              />
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40">
                <Loading size="lg" />
              </div>
            )}
            {isError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40">
                <p className="text-xl">Failed to generate the image</p>
              </div>
            )}
          </div>
          {imageUrl && (
            <Snippet symbol="" tooltipColor="primary" className="bg-gray-900">
              {imageUrl}
            </Snippet>
          )}
        </section>
      </main>
    </section>
  );
}
