'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/styles/MDXClientSide.module.css';

function CustomImage(props: ImageProps) {
  const { alt, ...rest } = props;
  return <Image alt={alt} {...rest} />;
}

function CustomVideo(props: any) {
  return (
    <video autoPlay muted playsInline loop className="rounded-md contrast-[1.075] w-full border border-neutral-800" poster={`/videos/lab/${props.slug}/placeholder.webp`} width={props.resolution.width} height={props.resolution.height}>
      <source src={`/videos/lab/${props.slug}/optimized.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
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
  Link: CustomLink,
  Video: CustomVideo,
};

interface MDXProps {
  code: string;
}

export default function MDX({ code }: MDXProps) {
  const MDXComponent = useMDXComponent(code);

  const [focusedReading, setFocusedReading] = useState(false);

  useEffect(() => {
    let start = 0;
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (start === 0 && event.altKey) {
        start = Date.now();

        timeout = setTimeout(
          () => {
            if (Date.now() - start > 500 && start !== 0) {
              setFocusedReading(!focusedReading);
            }

            start = 0;
            clearTimeout(timeout);
          }
        , 500);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (start === 0 && event.altKey) {
        start = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      clearTimeout(timeout);
    }
  }, [focusedReading]);

  return (
    <article
      className={clsx(
        "flex flex-col gap-4",
        focusedReading && styles.focusedReading,
        focusedReading && "after:opacity-[.05]",
      )}
    >
      <MDXComponent components={{ ...components }} />
    </article>
  )
}