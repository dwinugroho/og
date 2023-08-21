import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Radio,
  Spinner,
  Tooltip
} from 'flowbite-react';
import { MainLayout } from '@/components/templates';
import { Icon } from '@iconify/react';

export interface IForm {
  title: string;
  description?: string;
  image?: string;
  tag?: string;
  theme?: string;
}

export default function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>();

  const [imageUrl, setImageUrl] = useState(() => '');
  const [imageBlob, setImageBlob] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [isError, setIsError] = useState(() => false);
  const [theme, setTheme] = useState(() => 'dark');

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const object: any = {
      ...data,
      theme
    };

    for (const prop in object) {
      if (!object[prop]) delete object[prop];
    }

    const queryparams = new URLSearchParams({
      ...object
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
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(imageUrl);
  };

  return (
    <MainLayout>
      <section className="container flex flex-col-reverse lg:flex-row items-center gap-16 py-16 relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
          autoComplete="none"
          autoCorrect="none"
        >
          <div>
            <div className="mb-2 block">
              <Label color="default" htmlFor="title" value="Title" />
            </div>
            <TextInput
              {...register('title', { required: true })}
              id="title"
              placeholder="Give Your Thing a Catchy Title"
              type="text"
              required
              color={errors.title ? 'failure' : 'gray'}
              helperText={
                errors.title?.type === 'required' && (
                  <>
                    <span className="font-medium">Hey there!</span> You forgot
                    to give your thing a catchy title.
                  </>
                )
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                color="default"
                htmlFor="description"
                value="Description"
              />
            </div>
            <Textarea
              {...register('description')}
              id="description"
              placeholder="Tell Us What's Cooking in a Few Words"
              rows={4}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label color="default" htmlFor="image" value="Image Url" />
            </div>
            <TextInput
              {...register('image', {
                pattern:
                  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
              })}
              id="image"
              placeholder="Give Your Thing a Catchy Title"
              type="text"
              color={errors.image ? 'failure' : 'gray'}
              helperText={
                errors.image?.type === 'pattern' && (
                  <>
                    <span className="font-medium">Hold up!</span> Make sure the
                    URL you drop is a valid image URL.
                  </>
                )
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label color="default" htmlFor="tag" value="Tag" />
            </div>
            <TextInput
              {...register('tag')}
              id="tag"
              placeholder="Give Your Thing a Catchy Title"
              type="text"
              color="gray"
            />
          </div>
          <fieldset className="flex max-w-md flex-col gap-4" id="radio">
            <Label>Choose your favorite theme</Label>
            <div className="flex gap-4">
              {['dark', 'light'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Radio
                    id={item}
                    name={item}
                    value={item}
                    checked={item === theme}
                    onChange={(event) => setTheme(event.target.value)}
                  />
                  <Label htmlFor={item} className="capitalize">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </fieldset>
          <Button type="submit" className="mt-4">
            Generate
          </Button>
        </form>
        <section className="w-full flex flex-col gap-8 lg:min-w-[640px]">
          <div className="w-full aspect-[120/63]  bg-neutral-700 rounded-md relative overflow-hidden border border-neutral-400 dark:border-neutral-500">
            {imageBlob && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageBlob}
                alt="Open Graph Image Generator by Krafan"
                className="w-full h-full object-cover"
              />
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40">
                <Spinner aria-label="krafan load image" />
              </div>
            )}
            {isError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40">
                <p className="text-xl">Failed to generate the image</p>
              </div>
            )}
          </div>
          <section className="relative">
            <TextInput
              id="imageUrl"
              type="text"
              value={imageUrl}
              placeholder="Here's Your Awesome Open Graph Image Link"
              readOnly
              disabled={!imageUrl}
            />
            {imageUrl && (
              <Button
                color="dark"
                className="border-0 w-[40px] absolute right-[1px] top-[1px] z-20"
                onClick={() => copyToClipboard()}
              >
                <Icon icon="ph:copy" width={20} height={20} />
              </Button>
            )}
          </section>
        </section>
      </section>
    </MainLayout>
  );
}
