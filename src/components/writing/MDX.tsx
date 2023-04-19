import Image, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';

function CustomImage(props: ImageProps) {
  const { alt, ...rest } = props;
  return <Image alt={alt} {...rest} />;
}

const CustomLink = (props: {
  href: string;
  children: React.ReactNode;
}) => {
  const href = props.href as string;

  if (href.startsWith('/')) {
    return (
      <Link {...props} className="text-neutral-200 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400 transition-all duration-150 will-change-auto">
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" aria-label={props.href} {...props} className="text-neutral-200 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400 transition-all duration-150 will-change-auto" />;
};

const components = {
  Image: CustomImage,
  Link: CustomLink
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