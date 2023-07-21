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

  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Alt') {
        if (!isKeyPressed && !timeoutId) {
          const tid = setTimeout(
            () => {
              setIsKeyPressed(true);
              document.documentElement.classList.add('after:opacity-[.05]');
            }
          , 500);

          setTimeoutId(tid);
        } else {
          clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
          document.documentElement.classList.remove('after:opacity-[.05]');
          setTimeoutId(null);
          setIsKeyPressed(false);
        }
      }

      if (event.key === 'Escape') {
        setIsKeyPressed(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    };
  }, [timeoutId, isKeyPressed]);

  return (
    <article
      className={clsx(
        "flex flex-col gap-4",
        isKeyPressed && styles.focusedReading,
        isKeyPressed && "after:opacity-[.05]",
      )}
    >
      <MDXComponent components={{ ...components }} />
    </article>
  )
}