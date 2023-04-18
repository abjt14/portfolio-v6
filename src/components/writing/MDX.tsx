import Image, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

function CustomImage(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
}

const components = {
  Image: CustomImage,
};

interface MDXProps {
  code: string;
}

export default function MDX({ code }: MDXProps) {
  const MDXComponent = useMDXComponent(code);

  return (
    <article className="flex flex-col gap-4">
      <MDXComponent components={{ ...components }} />
    </article>
  )
}